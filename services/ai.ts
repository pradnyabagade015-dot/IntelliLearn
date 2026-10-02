import { TopicNotes, businessModelSubject } from '@/constants/chapters';

export interface TopicContext {
  subjectName: string;
  courseCode: string;
  moduleName: string;
  topicNumber: string;
  topicTitle: string;
  notes: TopicNotes;
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
    emoji: '💡',
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
      `### 💡 ${topicTitle} (Topic ${topicNumber})\n\n` +
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
      `This illustrates how **${topicTitle}** functions in commercial venture building under **${moduleName}**.`
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
      `**Course:** Business Model Development (${courseCode}) • Semester IV\n` +
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
      `• Draw a structured diagram / flowchart for full 5 marks.`
    );
  }

  // 5. "Give a 10-mark answer"
  if (
    cleanQ.includes('10-mark') ||
    cleanQ.includes('10 mark')
  ) {
    return (
      `### 📑 10-Mark Comprehensive University Model Answer\n\n` +
      `**Course:** Business Model Development (${courseCode}) • Semester IV\n` +
      `**Unit:** ${moduleName} • **Topic ${topicNumber}:** ${topicTitle}\n\n` +
      `---\n\n` +
      `**1. Introduction & Standard Definition (2 Marks):**\n` +
      `${notes.simpleDefinition}\n\n` +
      `**2. Comprehensive Business & Technical Details (4 Marks):**\n` +
      `${notes.detailedExplanation}\n\n` +
      `**3. Core Principles & Key Structural Points (2 Marks):**\n` +
      notes.importantPoints.map((p) => `• ${p}`).join('\n') +
      `\n\n**4. Practical Case Study & Industrial Application (1.5 Marks):**\n` +
      `${notes.simpleRealWorldExample}\n\n` +
      `**5. Exam-Oriented Concluding Summary (0.5 Mark):**\n` +
      `${notes.examOrientedPoints[0] || 'Ensure clear presentation with headings and bullet points.'}`
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
      `• **Key Point 1:** ${notes.importantPoints[0] || 'Core business & engineering mechanism.'}\n` +
      `• **Key Point 2:** ${notes.importantPoints[1] || 'Strategic value creation.'}\n` +
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
    const primaryQ = notes.possibleExamQuestions[0] || `Explain the significance of ${topicTitle} in Business Model Development.`;
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
    `### 🤖 IntelliLearn Business Model AI Tutor: ${topicTitle}\n\n` +
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
    `👋 Hello! I am your **IntelliLearn AI Tutor** for **${context.subjectName}** (${context.courseCode}, Semester IV).\n\n` +
    `We are studying **${context.moduleName}** → **Topic ${context.topicNumber}: ${context.topicTitle}**.\n\n` +
    `Ask me anything about this topic or choose one of the suggested prompts below to get started!`
  );
}

/**
 * Business Model Development AI Doubt Solver.
 * Formats every answer with:
 * 1. Direct Answer
 * 2. Explanation
 * 3. Simple Example
 * 4. Important Exam Point
 */
export async function solveDoubt(
  question: string,
  _imageUri?: string,
  _subject?: string
): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const q = question.trim().toLowerCase();

  // 1. What is entrepreneurship?
  if (q.includes('what is entrepreneurship') || q === 'entrepreneurship' || q.includes('definition of entrepreneurship')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `Entrepreneurship is the process of identifying market opportunities, assembling resources, taking calculated financial risks, and building a new venture to create economic value and earn profit.\n\n` +
      `**2. Explanation:**\n` +
      `An entrepreneur acts as an innovator and risk-bearer who combines the four factors of production (land, labor, capital, and enterprise). In technology sectors, engineering entrepreneurship commercializes technical inventions into scalable commercial products through structured business planning.\n\n` +
      `**3. Simple Example:**\n` +
      `Bhavish Aggarwal and Ankit Bhati identifying the unorganized cab market in India and launching Ola Cabs.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Remember Joseph Schumpeter's concept of "Creative Destruction" where innovative startups displace obsolete legacy businesses.`
    );
  }

  // 2. What is an entrepreneurial mindset?
  if (q.includes('entrepreneurial mindset') || q.includes('mindset')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `An entrepreneurial mindset is a cognitive framework characterized by resilience, opportunity alertness, calculated risk tolerance, problem-solving agility, and continuous learning from failure.\n\n` +
      `**2. Explanation:**\n` +
      `It enables founders to operate effectively in high ambiguity. Key psychological traits include an internal locus of control (believing your actions shape outcomes), growth mindset (viewing abilities as improvable), and effectuation (starting with existing resources and co-creating with partners).\n\n` +
      `**3. Simple Example:**\n` +
      `Thomas Edison testing thousands of materials before perfecting the incandescent bulb filament, treating failures as learning iterations.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Differentiate between Internal Locus of Control vs External Locus of Control and Fixed vs Growth Mindset in university exam answers.`
    );
  }

  // 3. What is MSME?
  if (q.includes('msme') || q.includes('micro small and medium') || q.includes('udyam')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `MSME stands for Micro, Small and Medium Enterprises, classified under India's MSMED Act based on composite investment in plant/machinery and annual turnover.\n\n` +
      `**2. Explanation:**\n` +
      `Under the revised 2020 composite criteria (Atmanirbhar Bharat):\n` +
      `• **Micro:** Investment <= ₹1 Crore AND Turnover <= ₹5 Crore\n` +
      `• **Small:** Investment <= ₹10 Crore AND Turnover <= ₹50 Crore\n` +
      `• **Medium:** Investment <= ₹50 Crore AND Turnover <= ₹250 Crore\n` +
      `MSMEs generate ~30% of India's GDP, 45% of exports, and over 110 million jobs.\n\n` +
      `**3. Simple Example:**\n` +
      `An automotive electronic PCB assembly unit with ₹4 Crore machinery investment and ₹18 Crore annual sales is classified as a Small Enterprise.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Always state the exact 2020 investment and turnover thresholds in tabular format for full marks.`
    );
  }

  // 4. What is an angel investor?
  if (q.includes('angel investor') || q.includes('angel funding') || q.includes('angel network')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `An Angel Investor is a high-net-worth individual (HNI) who provides early-stage seed capital to startups out of their personal wealth in exchange for equity ownership or convertible debt.\n\n` +
      `**2. Explanation:**\n` +
      `Angel investors typically invest in idea, prototype, or pre-revenue stages when banks and venture capital funds consider the risk too high. Beyond capital (checks typically between ₹10 Lakhs and ₹2 Crores), angels provide crucial mentorship, strategic guidance, and industry connections.\n\n` +
      `**3. Simple Example:**\n` +
      `Ratan Tata investing personal angel capital into early-stage Indian tech startups like Paytm, Ola, and Urban Company.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Differentiate between Angel Investors (personal funds, seed stage) and Venture Capitalists (pooled institutional funds, Series A+ growth stages).`
    );
  }

  // 5. What is venture capital?
  if (q.includes('venture capital') || q.includes('vc fund') || q.includes('venture capitalist')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `Venture Capital (VC) is professional institutional investment capital pooled from institutional investors to invest in high-growth, scalable startups in exchange for significant equity stakes.\n\n` +
      `**2. Explanation:**\n` +
      `VC firms are run by General Partners (GPs) who manage funds raised from Limited Partners (LPs). They invest in Series A, B, C+ rounds for companies with proven product-market fit, seeking 10x–100x financial returns through IPOs or strategic acquisitions (M&A).\n\n` +
      `**3. Simple Example:**\n` +
      `Peak XV Partners (formerly Sequoia India) investing in growth rounds of Swiggy and Zomato.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Memorize key clauses in a VC Term Sheet: Pre-money vs Post-money Valuation, Liquidation Preference, and Anti-dilution rights.`
    );
  }

  // 6. What is crowdfunding?
  if (q.includes('crowdfunding') || q.includes('crowd funding') || q.includes('kickstarter')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `Crowdfunding is the practice of funding a project or venture by raising small monetary contributions from a large number of people, typically via online platforms.\n\n` +
      `**2. Explanation:**\n` +
      `The 4 primary models of crowdfunding are:\n` +
      `1. **Reward-based:** Backers receive early product perks/merchandise (e.g. Kickstarter, Indiegogo).\n` +
      `2. **Donation-based:** Philanthropic contributions without financial returns (e.g. Ketto, Milaap).\n` +
      `3. **Equity-based:** Backers receive equity shares in the startup.\n` +
      `4. **Debt/P2P Lending:** Micro-lending with interest returns.\n\n` +
      `**3. Simple Example:**\n` +
      `Oculus Rift raising $2.4 million from 9,500 individual backers on Kickstarter for its VR headset prototype.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Crowdfunding acts as both a financing tool and a market validation tool to prove consumer demand before tooling.`
    );
  }

  // 7. What is a patent?
  if (q.includes('patent') || q.includes('patents') || q.includes('patentability')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `A Patent is an exclusive statutory monopoly right granted by the government for an invention (product or process) for 20 years, excluding others from making, using, or selling it.\n\n` +
      `**2. Explanation:**\n` +
      `Under the Indian Patents Act 1970, an invention must satisfy 3 mandatory criteria to be patentable:\n` +
      `1. **Novelty:** Must not be disclosed anywhere globally in prior art.\n` +
      `2. **Inventive Step (Non-Obviousness):** Must not be obvious to a person skilled in the art.\n` +
      `3. **Industrial Applicability:** Must possess practical commercial utility.\n` +
      `Section 3 excludes mathematical algorithms, software per se, and business methods from patenting.\n\n` +
      `**3. Simple Example:**\n` +
      `ARM patenting energy-efficient RISC microprocessor instruction set architectures licensed to smartphone chipmakers.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Term of a patent is strictly 20 years from the date of filing in India.`
    );
  }

  // 8. What is a trademark?
  if (q.includes('trademark') || q.includes('trade mark') || q.includes('brand mark')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `A Trademark is a distinctive visual sign, logo, brand name, word, slogan, or sound that uniquely identifies and distinguishes the goods/services of one enterprise from those of competitors.\n\n` +
      `**2. Explanation:**\n` +
      `Governed under the Trade Marks Act 1999, trademarks protect brand identity, customer trust, and goodwill. Unlike patents, trademarks can be renewed indefinitely every 10 years upon payment of renewal fees. The ™ symbol denotes an unregistered claim, while ® denotes an officially registered trademark.\n\n` +
      `**3. Simple Example:**\n` +
      `Apple's bitten apple logo, Nike's "Swoosh" logo, and the slogan "Just Do It".\n\n` +
      `**4. Important Exam Point:**\n` +
      `Differentiate between Trademark Infringement (for registered marks) and Passing Off (common law remedy for unregistered marks).`
    );
  }

  // 9. What is copyright?
  if (q.includes('copyright') || q.includes('copy right') || q.includes('fair use')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `A Copyright is an exclusive legal right granted to creators of original literary, dramatic, musical, artistic works, cinematographic films, and computer software source code.\n\n` +
      `**2. Explanation:**\n` +
      `Under the Indian Copyright Act 1957, copyright protects the expression of an idea, not the idea itself (Idea-Expression Dichotomy). Protection lasts for the Author's Lifetime + 60 Years. The Doctrine of Fair Use permits limited use for educational, research, and review purposes without infringement.\n\n` +
      `**3. Simple Example:**\n` +
      `Microsoft holding copyright over the source code and software documentation of Windows OS and Office Suite.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Remember that software source code is protected as a Literary Work under the Indian Copyright Act.`
    );
  }

  // 10. What is a value proposition?
  if (q.includes('value proposition') || q.includes('value prop') || q.includes('value map')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `A Value Proposition is the unique bundle of products, services, and benefits an enterprise offers that solves customer pain points or delivers superior gains over competitors.\n\n` +
      `**2. Explanation:**\n` +
      `According to Alexander Osterwalder's Value Proposition Canvas, it maps Customer Profile (Jobs-to-be-done, Pains, Gains) to the Company's Value Map (Products & Services, Pain Relievers, Gain Creators) to achieve Problem-Solution Fit.\n\n` +
      `**3. Simple Example:**\n` +
      `Uber's value proposition: "Tap a button, get a ride—reliable urban transportation with upfront pricing and cashless payments."\n\n` +
      `**4. Important Exam Point:**\n` +
      `Draw the Value Proposition Canvas (Customer Profile circle vs Value Map square) in 5-mark university exam questions.`
    );
  }

  // 11. What are customer segments?
  if (q.includes('customer segment') || q.includes('customer segments') || q.includes('market segment')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `Customer Segments are the distinct groups of people or organizations an enterprise aims to reach and serve based on shared needs, behaviors, or characteristics.\n\n` +
      `**2. Explanation:**\n` +
      `Key types of customer segments in the Business Model Canvas include:\n` +
      `• **Mass Market:** Broad consumer base (e.g. consumer electronics).\n` +
      `• **Niche Market:** Specialized technical requirements (e.g. avionics).\n` +
      `• **Segmented Market:** Slightly varied requirements (e.g. enterprise vs retail banking).\n` +
      `• **Multi-Sided Platforms:** Interdependent user groups (e.g. riders and drivers in Uber).\n\n` +
      `**3. Simple Example:**\n` +
      `Tesla initially targeting high-income luxury tech enthusiasts with the Roadster before expanding into mass-market segments with Model 3.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Define "Beachhead Market"—the narrow initial customer segment a startup targets for dominance before expanding.`
    );
  }

  // 12. What is an MVP?
  if (q.includes('mvp') || q.includes('minimum viable product') || q.includes('lean startup')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `A Minimum Viable Product (MVP) is the version of a new product which allows a team to collect the maximum amount of validated customer learning with the least effort and investment.\n\n` +
      `**2. Explanation:**\n` +
      `Popularized by Eric Ries in "The Lean Startup", an MVP is a functional product with only core features necessary to solve the primary problem for early adopters. It prevents building products nobody wants and initiates the Build-Measure-Learn feedback loop.\n\n` +
      `**3. Simple Example:**\n` +
      `Dropbox founder Drew Houston releasing a simple 3-minute screen recording video demonstrating file sync to validate demand before building the cloud back-end.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Differentiate between Proof of Concept (PoC - technical feasibility), Prototype (design feasibility), and MVP (commercial validation).`
    );
  }

  // 13. What is a subscription business model?
  if (q.includes('subscription model') || q.includes('subscription business') || q.includes('mrr') || q.includes('arr')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `A Subscription Business Model is a recurring monetization strategy where customers pay a periodic recurring fee (monthly/annually) to maintain continuous access to a product or service.\n\n` +
      `**2. Explanation:**\n` +
      `It shifts revenue from one-off transactional sales to predictable recurring cash flows measured by Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR). It lowers initial customer adoption barrier but requires active retention to reduce Churn Rate.\n\n` +
      `**3. Simple Example:**\n` +
      `Netflix, Spotify, and Microsoft 365 charging monthly subscriptions instead of selling boxed physical media.\n\n` +
      `**4. Important Exam Point:**\n` +
      `State key SaaS metrics: MRR, ARR, Churn Rate, Customer Lifetime Value (LTV), and Customer Acquisition Cost (CAC).`
    );
  }

  // 14. What is a freemium model?
  if (q.includes('freemium') || q.includes('free tier') || q.includes('freemium model')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `A Freemium Model is a pricing strategy where proprietary basic features are provided free of charge to all users, while advanced/premium functionality requires a paid subscription.\n\n` +
      `**2. Explanation:**\n` +
      `The free tier serves as a zero-cost customer acquisition engine. The business model is supported by converting a small fraction (typically 2% to 5%) of active free users into paying premium subscribers via feature gating, capacity gating, or support gating.\n\n` +
      `**3. Simple Example:**\n` +
      `Canva offering free graphic design tools while charging for premium stock photos, brand kits, and background removers.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Explain why near-zero marginal cost per user is mandatory to sustain a freemium model without cash burn.`
    );
  }

  // 15. What is SEO?
  if (q.includes('seo') || q.includes('search engine optimization') || q.includes('organic search')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `Search Engine Optimization (SEO) is the process of optimizing website content, technical architecture, and authority to achieve higher organic (unpaid) ranking on search engine results pages (SERPs).\n\n` +
      `**2. Explanation:**\n` +
      `SEO encompasses three pillars:\n` +
      `1. **On-Page SEO:** High-quality content, keywords, title tags, meta descriptions, and URL structure.\n` +
      `2. **Off-Page SEO:** High-authority backlinks and brand authority.\n` +
      `3. **Technical SEO:** Fast page loading speed, mobile responsiveness, XML sitemaps, and HTTPS security.\n\n` +
      `**3. Simple Example:**\n` +
      `An electronics component distributor ranking #1 on Google for "STM32 development board Mumbai" by publishing detailed technical datasheets and guides.\n\n` +
      `**4. Important Exam Point:**\n` +
      `Compare SEO (compounding organic traffic, slow start, zero per-click cost) with SEM (instant paid traffic, ongoing ad cost).`
    );
  }

  // 16. What is SEM?
  if (q.includes('sem') || q.includes('search engine marketing') || q.includes('pay per click') || q.includes('google ads')) {
    return (
      `### 💼 Business Model Development Solution\n\n` +
      `**1. Direct Answer:**\n` +
      `Search Engine Marketing (SEM) is the practice of marketing a business using paid advertisements that appear on search engine results pages (SERPs) based on targeted keyword search queries.\n\n` +
      `**2. Explanation:**\n` +
      `SEM primarily operates on a Pay-Per-Click (PPC) auction model through platforms like Google Ads. Ad positioning is determined by Ad Rank, computed as:\n` +
      `$$\\text{Ad Rank} = \\text{Maximum CPC Bid} \\times \\text{Quality Score}$$\n` +
      `Quality score is evaluated on expected Click-Through Rate (CTR), ad relevance, and landing page user experience.\n\n` +
      `**3. Simple Example:**\n` +
      `A cloud hosting startup bidding on Google Ads for the search keyword "deploy IoT server", paying ₹40 per click to drive engineers to its signup page.\n\n` +
      `**4. Important Exam Point:**\n` +
      `State the formula for Ad Rank and define Quality Score components in university exams.`
    );
  }

  // Check matching in businessModelSubject modules
  for (const mod of businessModelSubject.modules) {
    for (const t of mod.topics) {
      const titleLower = t.title.toLowerCase();
      const words = titleLower.split(/[\s—,/-]+/).filter((w) => w.length > 3);
      const matchCount = words.filter((w) => q.includes(w)).length;
      if (matchCount >= 2 || (words.length === 1 && q.includes(words[0])) || q.includes(titleLower)) {
        return (
          `### 💼 Business Model Development Solution: ${t.title}\n\n` +
          `**1. Direct Answer:**\n` +
          `${t.notes.simpleDefinition}\n\n` +
          `**2. Explanation:**\n` +
          `${t.notes.detailedExplanation}\n\n` +
          `**3. Simple Example:**\n` +
          `${t.notes.simpleRealWorldExample}\n\n` +
          `**4. Important Exam Point:**\n` +
          `${t.notes.examOrientedPoints[0] || 'Understand definitions, key principles, and prepare 5-mark answer structures.'}`
        );
      }
    }
  }

  // Fallback for queries outside Business Model Development
  return (
    `I can currently help you with **Business Model Development** topics covered in the IntelliLearn syllabus.\n\n` +
    `You can ask me questions about any of your official syllabus units:\n` +
    `• **Unit I – Introduction to Entrepreneurship** (mindset, women entrepreneurs, economic role)\n` +
    `• **Unit II – Entrepreneurship Development** (Proprietorship, Pvt Ltd, Public Ltd, MSME 2020)\n` +
    `• **Unit III – Start-up Financing** (Angel Investors, Venture Capital, Crowdfunding, SISFS)\n` +
    `• **Unit IV – Intellectual Property Rights** (Patents, Trademarks, Copyrights, FTO Search)\n` +
    `• **Unit V – Business Model Development** (Value Proposition, Customer Segments, Channels, MVP)\n` +
    `• **Unit VI – Digital Business Management** (Subscription, Freemium, SEO, SEM, Airbnb Disruption)`
  );
}
