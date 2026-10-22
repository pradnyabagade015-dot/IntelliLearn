require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI client helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Helper to detect temporary Gemini API unavailable/503 errors
function isTemporaryUnavailableError(error) {
  if (!error) return false;

  const status = error.status || error.statusCode || error.code;
  if (status === 503 || status === 'UNAVAILABLE' || status === 429 || status === 'RESOURCE_EXHAUSTED') {
    return true;
  }

  const msg = (error.message || '').toLowerCase();
  // Ensure we do NOT treat authentication or invalid key errors as temporary
  if (
    msg.includes('api_key_invalid') ||
    msg.includes('api key not valid') ||
    msg.includes('permission_denied') ||
    msg.includes('unauthenticated') ||
    status === 400 ||
    status === 401 ||
    status === 403
  ) {
    return false;
  }

  return (
    msg.includes('503') ||
    msg.includes('unavailable') ||
    msg.includes('high demand') ||
    msg.includes('temporarily unavailable') ||
    msg.includes('overloaded') ||
    msg.includes('busy') ||
    msg.includes('econnreset') ||
    msg.includes('etimedout')
  );
}

// Retry wrapper with exponential backoff for temporary errors
async function generateWithRetry(generateFn, maxAttempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await generateFn();
    } catch (error) {
      lastError = error;
      const isRetryable = isTemporaryUnavailableError(error);

      if (!isRetryable || attempt === maxAttempts) {
        throw error;
      }

      const delayMs = attempt === 1 ? 1000 : 2000;
      console.warn(`[Gemini API] Temporary error on attempt ${attempt}/${maxAttempts} (${error.message || error}). Retrying in ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const apiKeyPresent = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'ok',
    service: 'IntelliLearn Gemini AI Backend',
    model: GEMINI_MODEL,
    hasApiKey: apiKeyPresent,
    timestamp: new Date().toISOString(),
  });
});

// AI Tutor Endpoint
app.post('/api/tutor', async (req, res) => {
  try {
    const { context, question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the backend server.',
      });
    }

    const topicTitle = context?.topicTitle || 'Business Model Development';
    const topicNumber = context?.topicNumber || '';
    const moduleName = context?.moduleName || 'Business Model Development';
    const courseCode = context?.courseCode || '2994511';
    const notes = context?.notes || {};

    const systemInstruction = `You are the IntelliLearn AI Tutor for EXTC engineering students studying "${context?.subjectName || (courseCode === '2304112' ? 'Microcontrollers' : 'Business Model Development')}" (Course Code: ${courseCode}, Semester IV).

Current Topic Context:
- Unit/Module: ${moduleName}
- Topic: ${topicNumber ? `Topic ${topicNumber}: ` : ''}${topicTitle}
${notes.simpleDefinition ? `- Topic Definition: ${notes.simpleDefinition}` : ''}
${notes.detailedExplanation ? `- Detailed Syllabus Concept: ${notes.detailedExplanation}` : ''}
${notes.importantPoints?.length ? `- Key Syllabus Points:\n${notes.importantPoints.map(p => `  * ${p}`).join('\n')}` : ''}
${notes.simpleRealWorldExample ? `- Real-World Industrial Example: ${notes.simpleRealWorldExample}` : ''}
${notes.examOrientedPoints?.length ? `- High-Yield University Exam Points:\n${notes.examOrientedPoints.map(p => `  * ${p}`).join('\n')}` : ''}
${notes.possibleExamQuestions?.length ? `- Potential University Questions:\n${notes.possibleExamQuestions.map(p => `  * ${p}`).join('\n')}` : ''}
${notes.diagram ? `- Concept / Architecture Diagram:\n\`\`\`text\n${notes.diagram}\n\`\`\`` : ''}

Instructions:
1. Provide accurate, clear, engaging, and syllabus-aligned explanations for university students.
2. Structure your answer using clean GitHub-flavored markdown with emojis, bold headers, and bullet points.
3. When asked for "simple words", "5-mark answer", "10-mark answer", "example", "diagram", or "revision", format specifically for that exam structure.
4. Keep the tone encouraging, professional, and academically rigorous.`;

    const response = await generateWithRetry(() =>
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      })
    );

    const replyText = response?.text || 'No response generated from Gemini AI.';
    return res.json({ text: replyText, model: GEMINI_MODEL });
  } catch (error) {
    console.error('Error in /api/tutor:', error);

    if (isTemporaryUnavailableError(error)) {
      return res.status(503).json({
        error: 'AI temporarily unavailable',
        message: 'Gemini is currently busy. Please try again in a moment.',
      });
    }

    return res.status(500).json({
      error: 'Failed to generate tutor response',
      message: error.message || 'Internal server error',
    });
  }
});

// AI Doubt Solver Endpoint
app.post('/api/doubt', async (req, res) => {
  try {
    const { question, subject = 'Business Model Development' } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the backend server.',
      });
    }

    const isMicro = subject && (subject.toLowerCase().includes('micro') || subject.includes('2304112'));
    const resolvedCourseCode = isMicro ? '2304112' : '2994511';
    const resolvedSubject = isMicro ? 'Microcontrollers' : subject;
    const headerTitle = isMicro ? '⚡ Microcontrollers (2304112) Solution' : `💼 ${resolvedSubject} Solution`;

    const systemInstruction = `You are the IntelliLearn AI Doubt Solver for "${resolvedSubject}" (Course Code: ${resolvedCourseCode}, Semester IV EXTC Engineering, University of Mumbai).

You MUST format EVERY doubt response strictly into the following 4 structured sections using clean markdown:

### ${headerTitle}: [Topic/Concept Name]

**1. Direct Answer:**
[Clear, precise, direct 1-3 sentence definition and answer to the question]

**2. Explanation:**
[Detailed, structured conceptual explanation covering underlying mechanisms, architecture, register operations, timing, memory mapping, laws, or frameworks]

**3. Simple Example:**
[A concrete real-world engineering or industrial application (e.g. microcontroller interfaced sensors, embedded devices, automotive ECUs, or startup business models)]

**4. Important Exam Point:**
[High-yield university exam tip, formulas/timings, key architectural distinctions, pin functions, or diagram tips for scoring full marks in university semester examinations]

Maintain high clarity, accurate technical & engineering terminology, and academic precision.`;

    const response = await generateWithRetry(() =>
      ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: question,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      })
    );

    const replyText = response?.text || 'No response generated from Gemini AI.';
    return res.json({ text: replyText, model: GEMINI_MODEL });
  } catch (error) {
    console.error('Error in /api/doubt:', error);

    if (isTemporaryUnavailableError(error)) {
      return res.status(503).json({
        error: 'AI temporarily unavailable',
        message: 'Gemini is currently busy. Please try again in a moment.',
      });
    }

    return res.status(500).json({
      error: 'Failed to solve doubt',
      message: error.message || 'Internal server error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 IntelliLearn Gemini AI Backend running on http://localhost:${PORT}`);
  console.log(`📦 Model: ${GEMINI_MODEL}`);
  console.log(`🔑 API Key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
});

