import { TopicNoteSection, environmentalScienceSubject } from '@/constants/chapters';

export interface TopicContext {
  subjectName: string;
  courseCode: string;
  moduleName: string;
  topicNumber: string;
  topicTitle: string;
  notes: TopicNoteSection;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  emoji: string;
  promptText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'simple_words',
    label: 'Explain in simple words',
    emoji: '🌿',
    promptText: 'Explain in simple words',
  },
  {
    id: 'example',
    label: 'Explain with example',
    emoji: '🏢',
    promptText: 'Explain with example',
  },
  {
    id: 'exam_points',
    label: 'Important exam points',
    emoji: '🎯',
    promptText: 'Important exam points',
  },
  {
    id: 'five_mark',
    label: 'Give a 5-mark answer',
    emoji: '📝',
    promptText: 'Give a 5-mark answer',
  },
  {
    id: 'ten_mark',
    label: 'Give a 10-mark answer',
    emoji: '📑',
    promptText: 'Give a 10-mark answer',
  },
  {
    id: 'short_revision',
    label: '60-second revision',
    emoji: '⚡',
    promptText: '60-second revision',
  },
  {
    id: 'test_me',
    label: 'Test me',
    emoji: '❓',
    promptText: 'Test me',
  },
];

export async function generateTutorResponse(
  context: TopicContext,
  question: string
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const cleanQ = question.trim().toLowerCase();
  const { topicNumber, topicTitle, moduleName, courseCode, notes } = context;

  // 1. "Explain in simple words"
  if (
    cleanQ.includes('simple word') ||
    cleanQ.includes('simple terms') ||
    cleanQ.includes('in simple words') ||
    cleanQ.includes('define') ||
    cleanQ.includes('what is')
  ) {
    return (
      `### 🌿 ${topicTitle} (Topic ${topicNumber})\n\n` +
      `**Direct Definition:**\n${notes.simpleDefinition}\n\n` +
      `**Key Understanding for EXTC Students:**\n${notes.importantPoints.slice(0, 3).map((p) => `• ${p}`).join('\n')}\n\n` +
      `*Feel free to tap "Explain with example" or "Give a 5-mark answer" for structured exam notes!*`
    );
  }

  // 2. "Explain with example"
  if (
    cleanQ.includes('example') ||
    cleanQ.includes('case study') ||
    cleanQ.includes('real world') ||
    cleanQ.includes('real-world')
  ) {
    return (
      `### 🏢 Real-World Example: ${topicTitle}\n\n` +
      `**Real-World Case:**\n${notes.simpleRealWorldExample}\n\n` +
      `**Why it Matters:**\n` +
      `This illustrates how the scientific principles of **${topicTitle}** directly impact ecological balance and environmental protection under **${moduleName}**.`
    );
  }

  // 3. "Important exam points"
  if (
    cleanQ.includes('exam point') ||
    cleanQ.includes('important point') ||
    cleanQ.includes('high yield')
  ) {
    return (
      `### 🎯 High-Yield Exam Points for Topic ${topicNumber}\n\n` +
      `**Must-Know Points for University Exams (${courseCode}):**\n` +
      notes.examOrientedPoints.map((pt, i) => `${i + 1}. ${pt}`).join('\n\n') +
      `\n\n**Probable University Questions:**\n` +
      notes.possibleExamQuestions.map((q, i) => `• **Q${i + 1}:** ${q}`).join('\n')
    );
  }

  // 4. "Give a 5-mark answer"
  if (
    cleanQ.includes('5-mark') ||
    cleanQ.includes('5 mark')
  ) {
    return (
      `### 📝 5-Mark University Model Answer\n\n` +
      `**Course:** Environmental Science (${courseCode})\n` +
      `**Unit:** ${moduleName} • **Topic ${topicNumber}:** ${topicTitle}\n\n` +
      `---\n\n` +
      `**1. Definition (1 Mark):**\n` +
      `${notes.simpleDefinition}\n\n` +
      `**2. Detailed Explanation (2.5 Marks):**\n` +
      `${notes.detailedExplanation.split('\n')[0]}\n\n` +
      `**Key Highlights to Write:**\n` +
      notes.importantPoints.slice(0, 3).map((p) => `• ${p}`).join('\n') +
      `\n\n**3. Real-World Illustration (1 Mark):**\n` +
      `${notes.simpleRealWorldExample}\n\n` +
      `**4. Concluding Note / Exam Tip (0.5 Mark):**\n` +
      `• Draw a neat schematic/diagram to achieve full 5 marks.`
    );
  }

  // 5. "Give a 10-mark answer"
  if (
    cleanQ.includes('10-mark') ||
    cleanQ.includes('10 mark')
  ) {
    return (
      `### 📑 10-Mark Comprehensive University Model Answer\n\n` +
      `**Course:** Environmental Science (${courseCode})\n` +
      `**Unit:** ${moduleName} • **Topic ${topicNumber}:** ${topicTitle}\n\n` +
      `---\n\n` +
      `**1. Introduction & Standard Definition (2 Marks):**\n` +
      `${notes.simpleDefinition}\n\n` +
      `**2. Comprehensive Scientific & Engineering Details (4 Marks):**\n` +
      `${notes.detailedExplanation}\n\n` +
      `**3. Core Principles & Key Structural Points (2 Marks):**\n` +
      notes.importantPoints.map((p) => `• ${p}`).join('\n') +
      `\n\n**4. Practical Case Study & Engineering Application (1.5 Marks):**\n` +
      `${notes.simpleRealWorldExample}\n\n` +
      `**5. Exam-Oriented Concluding Summary (0.5 Mark):**\n` +
      `${notes.examOrientedPoints[0] || 'Ensure neat presentation with headings and bullet points.'}`
    );
  }

  // 6. "60-second revision"
  if (
    cleanQ.includes('revision') ||
    cleanQ.includes('summary') ||
    cleanQ.includes('recap') ||
    cleanQ.includes('60-second') ||
    cleanQ.includes('60 sec')
  ) {
    return (
      `### ⚡ 60-Second Flash Revision: ${topicTitle}\n\n` +
      `• **Concept:** ${notes.simpleDefinition}\n` +
      `• **Key Point 1:** ${notes.importantPoints[0] || 'Core ecological and resource mechanisms.'}\n` +
      `• **Key Point 2:** ${notes.importantPoints[1] || 'Conservation and mitigation practices.'}\n` +
      `• **Example to Remember:** ${notes.simpleRealWorldExample.slice(0, 110)}...\n` +
      `• **Exam Keyword:** ${notes.examOrientedPoints[0] || 'Understand definitions and university questions.'}\n\n` +
      `*Ready for a practice test? Tap "Test me"!*`
    );
  }

  // 7. "Test me"
  if (
    cleanQ.includes('test me') ||
    cleanQ.includes('quiz') ||
    cleanQ.includes('test') ||
    cleanQ.includes('question')
  ) {
    const primaryQ = notes.possibleExamQuestions[0] || `Explain the significance of ${topicTitle} in Environmental Science.`;
    const secondaryQ = notes.possibleExamQuestions[1] || '';

    return (
      `### ❓ Practice Exam Question: Topic ${topicNumber}\n\n` +
      `**University Exam Question:**\n` +
      `👉 *"${primaryQ}"* (5/10 Marks)\n\n` +
      (secondaryQ ? `**Alternative Question:**\n👉 *"${secondaryQ}"*\n\n` : '') +
      `**How to structure your answer:**\n` +
      `1. Start with the formal definition.\n` +
      `2. Explain the mechanism in 3–4 bullet points.\n` +
      `3. Give the real-world example.\n\n` +
      `*Type your key points or summary below, and I will review it for you!*`
    );
  }

  // Default topic-specific response
  return (
    `### 🤖 IntelliLearn Environmental AI Tutor: ${topicTitle}\n\n` +
    `Regarding **${topicTitle}** (${moduleName}):\n\n` +
    `${notes.detailedExplanation}\n\n` +
    `**Key Takeaways:**\n` +
    notes.importantPoints.map((p) => `• ${p}`).join('\n') +
    `\n\n**Real-World Example:**\n` +
    `${notes.simpleRealWorldExample}\n\n` +
    `*Need more? Ask for a 5-mark answer, 10-mark answer, or a 60-second revision!*`
  );
}

export function getInitialTutorGreeting(context: TopicContext): string {
  return (
    `👋 Hello! I am your **IntelliLearn Environmental AI Tutor** for **${context.subjectName}** (${context.courseCode}).\n\n` +
    `We are studying **${context.moduleName}** → **Topic ${context.topicNumber}: ${context.topicTitle}**.\n\n` +
    `Ask me anything about this topic or choose one of the suggested prompts below to get started!`
  );
}

/**
 * Environmental Science specific AI Doubt Solver.
 * Formats every answer with:
 * - Direct Answer
 * - Explanation
 * - Example
 * - Important Exam Point
 */
export async function solveDoubt(
  question: string,
  _imageUri?: string,
  _subject?: string
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const q = question.trim().toLowerCase();

  // Scan through all official syllabus topics to find the best matching topic
  let matchedTopic: { unit: string; topicNumber: string; title: string; notes: TopicNoteSection } | null = null;

  for (const mod of environmentalScienceSubject.modules) {
    for (const t of mod.topics) {
      const titleLower = t.title.toLowerCase();
      // Check for direct topic title match or key phrase match
      const words = titleLower.split(/[\s—,/-]+/).filter((w) => w.length > 3);
      const matchCount = words.filter((w) => q.includes(w)).length;
      if (matchCount >= 2 || (words.length === 1 && q.includes(words[0])) || q.includes(titleLower)) {
        matchedTopic = { unit: mod.title, topicNumber: t.topicNumber, title: t.title, notes: t.notes };
        break;
      }
    }
    if (matchedTopic) break;
  }

  // 1. Global Warming query
  if (q.includes('global warming') || (q.includes('greenhouse') && q.includes('effect'))) {
    return (
      `### 🌿 Environmental Science Solution\n\n` +
      `**Direct Answer:**\n` +
      `Global warming is the gradual, long-term increase in the average temperature of the Earth's atmosphere and oceans caused by the enhanced greenhouse effect trapping outgoing infrared thermal radiation.\n\n` +
      `**Explanation:**\n` +
      `Human activities such as fossil fuel combustion, deforestation, and industrial agriculture release greenhouse gases ($CO_2, CH_4, N_2O, SF_6$). These gases allow incoming shortwave solar radiation to pass through but absorb and re-emit outgoing longwave infrared radiation, warming the troposphere. The global warming potential (GWP) of methane is ~28 times and nitrous oxide ~265 times that of $CO_2$.\n\n` +
      `**Example:**\n` +
      `The accelerated retreat of Himalayan glaciers (e.g. Gangotri) and the increasing frequency of intense heatwaves across Western India.\n\n` +
      `**Important Exam Point:**\n` +
      `In university exams, always draw a neat radiation balance sketch showing shortwave solar penetration and trapped longwave infrared radiation. State the Paris Climate Agreement goal of limiting warming to $1.5^\\circ\\text{C}$.`
    );
  }

  // 2. Biodiversity query
  if (q.includes('biodiversity') || q.includes('mega-diversity') || q.includes('species diversity')) {
    return (
      `### 🌿 Environmental Science Solution\n\n` +
      `**Direct Answer:**\n` +
      `Biodiversity (biological diversity) is the totality of genes, species, and ecosystems present within a given geographic region or across the entire biosphere.\n\n` +
      `**Explanation:**\n` +
      `Biodiversity operates across three hierarchical levels: 1. Genetic Diversity (variation of genes within a species), 2. Species Diversity (richness and evenness of species in a community), and 3. Ecosystem Diversity (variety of habitats and ecological biomes). It provides direct consumptive and productive values (food, timber, medicines) and indirect ecological services (pollination, carbon sequestration, soil conservation).\n\n` +
      `**Example:**\n` +
      `India is one of the 17 Mega-Diversity Nations, housing 7-8% of all recorded global species on only 2.4% of world land area, with 4 Global Biodiversity Hotspots (Western Ghats, Himalayas, Indo-Burma, Sundaland).\n\n` +
      `**Important Exam Point:**\n` +
      `Remember the 6 values of biodiversity: Consumptive, Productive, Social, Ethical, Aesthetic, and Option values.`
    );
  }

  // 3. Rainwater Harvesting query
  if (q.includes('rainwater') || q.includes('rain water') || q.includes('rwh')) {
    return (
      `### 🌿 Environmental Science Solution\n\n` +
      `**Direct Answer:**\n` +
      `Rainwater Harvesting (RWH) is the engineered technique of collecting, filtering, and storing rainfall runoff from rooftops, paved grounds, or land catchments for immediate domestic use or for recharging groundwater aquifers.\n\n` +
      `**Explanation:**\n` +
      `A typical Rooftop Rainwater Harvesting system consists of 5 main components: 1. Catchment (roof surface), 2. Conveyance (gutters and downpipes), 3. First Flush Valve (discards initial dirty rain containing dust and debris), 4. Multi-layer Filter Chamber (coarse sand, gravel, charcoal), and 5. Storage Sump or Groundwater Recharge Well. RWH arrests declining water tables, prevents urban street flooding, and reduces municipal water demands.\n\n` +
      `**Example:**\n` +
      `Mandatory rooftop rainwater harvesting systems installed across residential apartment complexes and universities in Mumbai to recharge surrounding borewells.\n\n` +
      `**Important Exam Point:**\n` +
      `Always draw a neat schematic diagram showing the Catchment -> First Flush -> Sand-Gravel Filter -> Storage Tank / Percolation Well.`
    );
  }

  // 4. Acid Rain query
  if (q.includes('acid rain') || q.includes('taj mahal') || q.includes('so2') || q.includes('nox')) {
    return (
      `### 🌿 Environmental Science Solution\n\n` +
      `**Direct Answer:**\n` +
      `Acid rain is precipitation (rain, snow, fog) having a pH value below 5.6, caused by atmospheric emissions of sulfur dioxide ($SO_2$) and nitrogen oxides ($NO_x$) reacting with water vapor.\n\n` +
      `**Explanation:**\n` +
      `Chemical reactions in the atmosphere:\n• $2SO_2 + O_2 \\rightarrow 2SO_3$; $SO_3 + H_2O \\rightarrow H_2SO_4$ (Sulfuric Acid)\n• $4NO_2 + 2H_2O + O_2 \\rightarrow 4HNO_3$ (Nitric Acid)\nAcid rain leaches vital nutrients from forest soils, releases toxic aluminum ions into lakes killing fish, and causes 'Stone Leprosy' / marble corrosion ($CaCO_3 + H_2SO_4 \\rightarrow CaSO_4 + H_2O + CO_2$).\n\n` +
      `**Example:**\n` +
      `Yellowing of the white marble of the Taj Mahal due to acidic emissions from nearby industries, leading to the creation of the protected Taj Trapezium Zone (TTZ).\n\n` +
      `**Important Exam Point:**\n` +
      `Write both balanced chemical reactions for $H_2SO_4$ and $HNO_3$ formation, and mention the stone leprosy marble reaction.`
    );
  }

  // 5. Ozone Layer Depletion query
  if (q.includes('ozone') || q.includes('cfc') || q.includes('montreal protocol') || q.includes('uv')) {
    return (
      `### 🌿 Environmental Science Solution\n\n` +
      `**Direct Answer:**\n` +
      `Ozone layer depletion is the thinning of the protective stratospheric ozone ($O_3$) shield (15–35 km above Earth) caused by anthropogenic chlorine and bromine free radicals released from Chlorofluorocarbons (CFCs) and Halons.\n\n` +
      `**Explanation:**\n` +
      `Under solar UV radiation, CFCs break down and release active chlorine radicals ($\\dot{C}l$). The chlorine radical catalytically attacks ozone: $\\dot{C}l + O_3 \\rightarrow \\dot{C}lO + O_2$, followed by radical regeneration $\\dot{C}lO + O \\rightarrow \\dot{C}l + O_2$. A single chlorine radical can destroy over 100,000 ozone molecules. Thinning allows harmful UV-B radiation to reach the surface, causing skin cancer, cataracts, and crop damage.\n\n` +
      `**Example:**\n` +
      `The global phase-out of CFC refrigerants (R-12) and adoption of eco-friendly refrigerants (R-600a, R-32) under the landmark Montreal Protocol (1987).\n\n` +
      `**Important Exam Point:**\n` +
      `State that ozone is measured in Dobson Units (DU) and an Ozone Hole is defined when stratospheric levels drop below 220 DU.`
    );
  }

  // 6. Ecosystem / Food chain query
  if (q.includes('ecosystem') || q.includes('food chain') || q.includes('food web') || q.includes('trophic')) {
    return (
      `### 🌿 Environmental Science Solution\n\n` +
      `**Direct Answer:**\n` +
      `An ecosystem is a self-sustaining functional unit of nature where biotic communities (producers, consumers, decomposers) interact with their physical abiotic environment through energy flow and nutrient cycles.\n\n` +
      `**Explanation:**\n` +
      `Producers (autotrophic plants) capture solar energy via photosynthesis. Herbivores (primary consumers) eat plants, carnivores (secondary/tertiary consumers) eat herbivores, and decomposers (bacteria/fungi) break down dead organic matter to recycle minerals. Energy transfer follows Lindeman's 10% Law (90% lost as heat at each trophic step), which is why ecological pyramids of energy are always upright.\n\n` +
      `**Example:**\n` +
      `A forest ecosystem like Sanjay Gandhi National Park where grass and trees support spotted deer, which are preyed upon by leopards, with soil microbes recycling leaf litter.\n\n` +
      `**Important Exam Point:**\n` +
      `Differentiate between Food Chain (linear sequence of energy transfer) and Food Web (interconnected network of multiple food chains).`
    );
  }

  // 7. Environment Protection Act 1986 query
  if (q.includes('environment protection act') || q.includes('epa 1986') || q.includes('umbrella act')) {
    return (
      `### 🌿 Environmental Science Solution\n\n` +
      `**Direct Answer:**\n` +
      `The Environment (Protection) Act, 1986 (EPA 1986) is an overarching 'Umbrella Legislation' enacted by the Parliament of India under Article 253 of the Constitution following the 1984 Bhopal Gas Tragedy.\n\n` +
      `**Explanation:**\n` +
      `EPA 1986 coordinates all central and state pollution control activities, empowers the Central Government to set nationwide environmental quality standards, regulate hazardous substances, restrict industrial locations, and mandate Environmental Impact Assessments. Non-compliance carries penalties of up to 5 years imprisonment and/or ₹1 Lakh fine.\n\n` +
      `**Example:**\n` +
      `The Central Pollution Control Board (CPCB) issuing direct closure notices and penalty orders to polluting industrial chemical units under Section 5 of the EPA 1986.\n\n` +
      `**Important Exam Point:**\n` +
      `Explain why it is called an 'Umbrella Act' (it covers legislative gaps and coordinates the Water Act 1974 and Air Act 1981).`
    );
  }

  // 8. If matched to any other topic in our 6 Units
  if (matchedTopic) {
    return (
      `### 🌿 Environmental Science Solution: ${matchedTopic.title}\n\n` +
      `**Direct Answer:**\n` +
      `${matchedTopic.notes.simpleDefinition}\n\n` +
      `**Explanation:**\n` +
      `${matchedTopic.notes.detailedExplanation}\n\n` +
      `**Example:**\n` +
      `${matchedTopic.notes.simpleRealWorldExample}\n\n` +
      `**Important Exam Point:**\n` +
      `${matchedTopic.notes.examOrientedPoints[0] || 'Understand definitions, key principles, and prepare 5-mark answer structures.'}`
    );
  }

  // 9. Polite fallback for questions outside Environmental Science
  return (
    `### 🌿 Environmental Science Assistant\n\n` +
    `I can currently help you with **Environmental Science** topics covered in your IntelliLearn syllabus (Course Code: 2993512).\n\n` +
    `You can ask me questions on any of your official syllabus units:\n` +
    `• **Unit I:** Multidisciplinary Nature, IT in Environment & Health, Population\n` +
    `• **Unit II:** Renewable & Non-renewable Natural Resources (Forest, Water, Energy)\n` +
    `• **Unit III:** Ecosystems (Forest, Grassland, Desert, Aquatic, Ponds, Rivers, Oceans, Estuaries)\n` +
    `• **Unit IV:** Biodiversity (Genetic, Species, Ecosystem, Values, India as Mega-diversity)\n` +
    `• **Unit V:** Pollution (Air, Water, Soil, Solid Waste, Disasters, Carbon Credits)\n` +
    `• **Unit VI:** Social Issues (Sustainable Development, Rainwater Harvesting, EPA 1986, Climate Change)`
  );
}
