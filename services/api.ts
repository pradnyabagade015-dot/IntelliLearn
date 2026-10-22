import { Platform } from 'react-native';
import { authService } from './auth';
import { progressService } from './progress';
import {
  mockSubjects,
  businessModelSubject,
  microcontrollerSubject,
  mockChapterQuizzes,
  mockDailyQuiz,
  mockMicrocontrollerDailyQuiz,
  mockDoubtSolver,
  mockProgressSummary,
  mockStudent,
  Subject,
  SubjectDetailed,
  ChapterQuiz,
  DailyQuiz,
  DoubtSolverPreview,
  ProgressSummary,
  StudentProfile,
} from '@/constants/chapters';

export interface AiApiResponse {
  text: string;
  model?: string;
  error?: string;
}

export const getApiBaseUrl = (): string => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000';
  }
  return 'http://localhost:5000';
};

export const apiService = {
  async getSubjects(): Promise<Subject[]> {
    await new Promise((r) => setTimeout(r, 80));
    return mockSubjects;
  },

  async getSubjectById(id: string): Promise<Subject | undefined> {
    await new Promise((r) => setTimeout(r, 40));
    return mockSubjects.find((s) => s.id === id || s.code === id) || mockSubjects[0];
  },

  async getDetailedSubject(id?: string): Promise<SubjectDetailed> {
    await new Promise((r) => setTimeout(r, 40));
    if (id === 'micro-2304112' || id === '2304112' || id?.toLowerCase().includes('micro')) {
      return microcontrollerSubject;
    }
    return businessModelSubject;
  },

  async getQuizByChapterId(chapterId: string): Promise<ChapterQuiz | undefined> {
    await new Promise((r) => setTimeout(r, 80));
    if (mockChapterQuizzes[chapterId]) {
      return mockChapterQuizzes[chapterId];
    }
    if (chapterId.toLowerCase().includes('micro') || chapterId === '2304112') {
      return mockChapterQuizzes['micro-2304112'] || mockChapterQuizzes['daily-micro-quiz'];
    }
    return mockChapterQuizzes['bmd-2994511'] || mockChapterQuizzes['daily-bmd-quiz'];
  },

  async getAllQuizzes(): Promise<DailyQuiz[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [
      mockDailyQuiz,
      mockMicrocontrollerDailyQuiz,
      {
        id: 'quiz-micro-unit3',
        title: '8051 Architecture & Programming Quiz',
        subject: 'Microcontrollers',
        subjectCode: '2304112',
        questionCount: 5,
        durationMinutes: 8,
        xpReward: 90,
        difficulty: 'Medium',
        topics: ['Register Banks', 'Addressing Modes', 'Machine Cycles', 'Instruction Set'],
      },
      {
        id: 'quiz-micro-unit4',
        title: '8051 Timers, Interrupts & Serial I/O Quiz',
        subject: 'Microcontrollers',
        subjectCode: '2304112',
        questionCount: 5,
        durationMinutes: 7,
        xpReward: 95,
        difficulty: 'Hard',
        topics: ['Timer Mode 2', 'TCON / TMOD', 'Baud Rate Gen', 'Interrupt Vectors'],
      },
      {
        id: 'quiz-micro-unit5',
        title: 'ARM7 32-bit Architecture & Core Quiz',
        subject: 'Microcontrollers',
        subjectCode: '2304112',
        questionCount: 5,
        durationMinutes: 8,
        xpReward: 90,
        difficulty: 'Medium',
        topics: ['37 Registers', '3-Stage Pipeline', 'CPSR & SPSR', 'ARM vs THUMB Mode'],
      },
      {
        id: 'quiz-bmd-unit3',
        title: 'Start-up Financing & Unit Economics Quiz',
        subject: 'Business Model Development',
        subjectCode: '2994511',
        questionCount: 5,
        durationMinutes: 8,
        xpReward: 80,
        difficulty: 'Medium',
        topics: ['Sources of Funding', 'Debt vs Equity', 'Angel Investors & VCs', 'Break-Even Analysis'],
      },
      {
        id: 'quiz-bmd-unit4',
        title: 'IPR, Patents & Trademark Law Quiz',
        subject: 'Business Model Development',
        subjectCode: '2994511',
        questionCount: 5,
        durationMinutes: 7,
        xpReward: 90,
        difficulty: 'Hard',
        topics: ['Patents Act 1970', 'Section 3 Non-Patentability', 'Copyrights & Trademarks', 'Trade Secrets'],
      },
      {
        id: 'quiz-bmd-unit5',
        title: 'Business Model Canvas & Lean Startup Quiz',
        subject: 'Business Model Development',
        subjectCode: '2994511',
        questionCount: 5,
        durationMinutes: 8,
        xpReward: 85,
        difficulty: 'Medium',
        topics: ['9 Building Blocks', 'MVP & Prototyping', 'Freemium & SaaS Models', 'Investor Pitching'],
      },
    ];
  },

  async getStudentProfile(): Promise<StudentProfile> {
    await new Promise((r) => setTimeout(r, 40));
    const current = await authService.getCurrentUser();
    if (current) {
      return current;
    }
    return authService.getGuestProfile();
  },

  async getProgressSummary(): Promise<ProgressSummary> {
    const data = await progressService.getUserLearningData();
    const micro = await progressService.getSubjectMetrics('micro-2304112');
    const bmd = await progressService.getSubjectMetrics('bmd-2994511');
    const totalTopics = micro.totalTopicsCount + bmd.totalTopicsCount;
    const completedTopics = micro.completedTopicsCount + bmd.completedTopicsCount;
    const overall = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
    const hours = Math.round((data.totalStudySeconds / 3600) * 10) / 10;
    return {
      overallPercentage: overall,
      completedTopicsCount: completedTopics,
      totalTopicsCount: totalTopics,
      weeklyCompletedHours: hours,
      weeklyTargetHours: 20,
      accuracyRate: micro.accuracyRate || bmd.accuracyRate || 0,
      streakCount: data.streakDays || 0,
    };
  },

  async getDoubtSolverData(): Promise<DoubtSolverPreview> {
    await new Promise((r) => setTimeout(r, 40));
    return mockDoubtSolver;
  },

  async submitQuizResult(
    _chapterId: string,
    score: number,
    total: number
  ): Promise<{ xpEarned: number }> {
    await new Promise((r) => setTimeout(r, 150));
    const xpEarned = Math.round((score / total) * 100);
    return { xpEarned };
  },

  async generateAiTutor(context: any, question: string): Promise<string> {
    const baseUrl = getApiBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(`${baseUrl}/api/tutor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context, question }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `API error (${res.status})`);
      }

      const data: AiApiResponse = await res.json();
      return data.text;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  },

  async solveAiDoubt(question: string, imageUri?: string, subject?: string): Promise<string> {
    const baseUrl = getApiBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(`${baseUrl}/api/doubt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          imageUri,
          subject: subject || 'Business Model Development',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `API error (${res.status})`);
      }

      const data: AiApiResponse = await res.json();
      return data.text;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  },

  async checkAiHealth(): Promise<{ status: string; hasApiKey: boolean; model?: string }> {
    const baseUrl = getApiBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
      const res = await fetch(`${baseUrl}/api/health`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return await res.json();
    } catch (err) {
      clearTimeout(timeoutId);
      return { status: 'offline', hasApiKey: false };
    }
  },
};
