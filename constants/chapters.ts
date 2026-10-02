export interface TopicNotes {
  simpleDefinition: string;
  detailedExplanation: string;
  importantPoints: string[];
  simpleRealWorldExample: string;
  examOrientedPoints: string[];
  possibleExamQuestions: string[];
}

export interface Topic {
  id: string;
  topicNumber: string;
  title: string;
  isCompleted?: boolean;
  notes: TopicNotes;
}

export interface Module {
  id: string;
  moduleNumber: number;
  title: string;
  hours: string;
  loMapping: string;
  isCompleted?: boolean;
  topics: Topic[];
}

export interface SubjectDetailed {
  id: string;
  code: string;
  name: string;
  semester: string;
  credits: number;
  vertical: string;
  prerequisite: string;
  labObjectives: string[];
  textbooks: string[];
  modules: Module[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester: string;
  credits: number;
  progress: number;
  totalModules: number;
  completedModules: number;
  icon: string;
  professor: string;
  nextTopic?: string;
}

export interface ChapterQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChapterQuiz {
  id: string;
  chapterId: string;
  chapterTitle: string;
  subjectTitle: string;
  questions: ChapterQuizQuestion[];
}

export interface DailyQuiz {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  questionCount: number;
  durationMinutes: number;
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  rollNo: string;
  semester: string;
  department: string;
  avatarUrl?: string;
  totalXp: number;
  streakDays: number;
  quizzesTaken: number;
  doubtsResolved: number;
  studyHoursThisWeek: number;
  semesterProgress: number;
}

export interface ProgressSummary {
  overallPercentage: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  weeklyCompletedHours: number;
  weeklyTargetHours: number;
  accuracyRate: number;
  streakCount: number;
}

export interface DoubtSolverPreview {
  recentDoubts: {
    id: string;
    question: string;
    subject: string;
    status: 'Resolved' | 'Pending';
    timeAgo: string;
  }[];
}

export const businessModelSubject: SubjectDetailed = {
  id: 'bmd-2994511',
  code: '2994511',
  name: 'Business Model Development',
  semester: 'Semester IV',
  credits: 2,
  vertical: 'Entrepreneurship & Management (EXTC Sem IV)',
  prerequisite: 'Basic engineering concepts, analytical problem solving, and technological innovation awareness.',
  labObjectives: [
    'Understand the fundamental concepts, mindset, and economic role of technology entrepreneurship.',
    'Analyze various legal business ownership structures and the strategic significance of MSMEs in national growth.',
    'Evaluate diverse startup financing mechanisms including angel investment, venture capital, and government grant schemes.',
    'Acquire comprehensive knowledge of Intellectual Property Rights (IPR), patents, trademarks, copyrights, and ethical innovation.',
    'Master Business Model Canvas development, customer segmentation, value propositions, and Minimum Viable Product (MVP) testing.',
    'Understand modern digital business strategies, subscription/freemium mechanics, search engine marketing (SEO/SEM), and digital market disruption.'
  ],
  textbooks: [
    'Business Model Generation by Alexander Osterwalder and Yves Pigneur',
    'The Lean Startup by Eric Ries',
    'The Art of the Start 2.0 by Guy Kawasaki',
    'Entrepreneurship Development by S. S. Khanka',
    'Intellectual Property Rights in India by V. K. Ahuja'
  ],
  modules: [
  {
    "id": "unit-1",
    "moduleNumber": 1,
    "title": "Unit I – Introduction to Entrepreneurship",
    "hours": "6",
    "loMapping": "CO1",
    "isCompleted": true,
    "topics": [
      {
        "id": "top-1-1",
        "topicNumber": "1.1",
        "title": "Definition of entrepreneurship",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Entrepreneurship is the process of identifying business opportunities, assembling necessary resources, taking calculated financial risks, and creating a new venture to provide value and earn profit.",
          "detailedExplanation": "Entrepreneurship involves transforming an innovative idea into a viable commercial product or service. An entrepreneur acts as an innovator, risk-bearer, and coordinator of production factors (land, labor, capital). In engineering, technical entrepreneurship leverages technological innovations to solve real-world problems through scalable ventures.",
          "importantPoints": [
            "Core components: Innovation, Risk-taking, Value creation, and Resource mobilization.",
            "Differs from traditional wage employment through autonomy, direct accountability, and wealth creation.",
            "Requires commercialization capability—bridging engineering R&D with market demand.",
            "Calculated risk management rather than blind gambling."
          ],
          "simpleRealWorldExample": "Bhavish Aggarwal and Ankit Bhati (engineering graduates) identified unreliable cab hailing in India and founded Ola Cabs, transforming local urban transportation.",
          "examOrientedPoints": [
            "State Joseph Schumpeter's theory of \"Creative Destruction\" in entrepreneurship.",
            "Differentiate between an Entrepreneur, Intrapreneur, and Manager.",
            "Explain the 4 factors of production mobilized by entrepreneurs."
          ],
          "possibleExamQuestions": [
            "Define entrepreneurship. Discuss the key characteristics and skills required for a successful technology entrepreneur.",
            "Differentiate between an entrepreneur and a traditional business manager with relevant examples.",
            "Explain Joseph Schumpeter's concept of innovation and creative destruction in entrepreneurship."
          ]
        }
      },
      {
        "id": "top-1-2",
        "topicNumber": "1.2",
        "title": "Role of entrepreneurship in economic development",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The contribution of new enterprise creation towards national wealth generation, employment creation, infrastructure growth, and balanced regional development.",
          "detailedExplanation": "Entrepreneurs drive macroeconomic progress by converting dormant resources into productive assets. They generate direct and indirect jobs, stimulate capital formation by mobilizing public savings, increase GDP through manufacturing and services, boost export earnings, and foster backward and forward economic linkages.",
          "importantPoints": [
            "Direct and indirect employment generation for skilled engineers and unskilled labor.",
            "Wealth creation and distribution across diverse socio-economic sectors.",
            "Reduction of regional disparities by establishing ventures in tier-2 and tier-3 industrial hubs.",
            "Fosters export potential and domestic import substitution."
          ],
          "simpleRealWorldExample": "The growth of Indian IT and engineering services start-ups in Bengaluru and Pune generated millions of tech jobs, spurring real estate, infrastructure, and national foreign exchange reserves.",
          "examOrientedPoints": [
            "List 5 macroeconomic contributions of entrepreneurship to GDP.",
            "Explain how startups reduce regional economic disparities.",
            "Describe the multiplier effect of startup ecosystems on local supply chains."
          ],
          "possibleExamQuestions": [
            "Analyze the role and significance of entrepreneurship in driving the economic development of a developing nation like India.",
            "Explain how technology startups contribute to capital formation and employment generation.",
            "Discuss the impact of entrepreneurship on balanced regional development."
          ]
        }
      },
      {
        "id": "top-1-3",
        "topicNumber": "1.3",
        "title": "Entrepreneurial process",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The systematic multi-stage journey an entrepreneur follows from opportunity discovery and validation to business planning, resource acquisition, launch, and scaling.",
          "detailedExplanation": "The entrepreneurial process begins with Opportunity Identification (spotting market gaps), followed by Feasibility Analysis & Business Planning (technical, operational, and financial feasibility), Resource Mobilization (raising capital, hiring core team), Venture Launch (prototype to MVP rollout), and Venture Growth/Harvesting (scaling operations, customer acquisition, or exit).",
          "importantPoints": [
            "Stage 1: Idea generation and opportunity identification.",
            "Stage 2: Feasibility analysis and business plan formulation.",
            "Stage 3: Resourcing (financing, talent, physical/intellectual assets).",
            "Stage 4: Implementation and market launch.",
            "Stage 5: Scaling, growth management, and exit strategy."
          ],
          "simpleRealWorldExample": "Flipkart began with spotting the lack of organized online book delivery in India (1), validating with a basic website (2), self-funding and sourcing books locally (3), launching nationwide courier cash-on-delivery (4), and scaling into e-commerce marketplace (5).",
          "examOrientedPoints": [
            "Draw and explain the sequential flowchart of the Entrepreneurial Process.",
            "Highlight the role of feasibility testing before committing capital.",
            "Explain the transition from startup phase to scale-up phase."
          ],
          "possibleExamQuestions": [
            "Illustrate and explain the various sequential stages involved in the entrepreneurial process with a neat block diagram.",
            "What is feasibility analysis? Explain its technical, financial, and market dimensions in the entrepreneurial journey.",
            "Describe how resource mobilization and team building determine the survival of an early-stage startup."
          ]
        }
      },
      {
        "id": "top-1-4",
        "topicNumber": "1.4",
        "title": "Women entrepreneurs",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Enterprises initiated, owned, and managed by women holding at least 51% financial interest and employing a majority of workforce.",
          "detailedExplanation": "Women entrepreneurship is an essential catalyst for gender equality, social upliftment, and holistic GDP growth. Women entrepreneurs bring diverse problem-solving perspectives, empathetic leadership, and community-centric innovation, though they often face socio-cultural barriers, limited access to formal venture finance, and restricted networking opportunities.",
          "importantPoints": [
            "Government support: Stand-Up India, Mudra Yojana, Bharatiya Mahila Bank, TREAD scheme.",
            "Challenges: Access to collateral-free credit, gender bias in venture capital, work-life balance.",
            "Sectors: EdTech, HealthTech, D2C retail, FinTech, and Bio-Engineering.",
            "Promotes socio-economic empowerment and higher household reinvestment rates."
          ],
          "simpleRealWorldExample": "Falguni Nayar founded Nykaa at age 50, building a multi-billion dollar beauty and wellness e-commerce platform that successfully went public (IPO) on NSE/BSE.",
          "examOrientedPoints": [
            "Definition and criteria for women-led enterprises as per MSME guidelines.",
            "Key government incentive schemes for women entrepreneurs in India.",
            "Socio-economic challenges and institutional solutions."
          ],
          "possibleExamQuestions": [
            "Discuss the role and growth of women entrepreneurs in India. What are the key institutional support mechanisms available to them?",
            "Analyze the specific financial and societal challenges faced by women entrepreneurs and suggest remedies.",
            "Explain the Stand-Up India scheme with respect to promoting women and SC/ST entrepreneurship."
          ]
        }
      },
      {
        "id": "top-1-5",
        "topicNumber": "1.5",
        "title": "Corporate entrepreneurship",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Entrepreneurial activities and innovative initiatives practiced within the boundary of an established corporation (also known as intrapreneurship).",
          "detailedExplanation": "Corporate entrepreneurship fosters internal innovation, new product development, and internal startup incubators inside mature corporations. It allows employees (intrapreneurs) to experiment, develop disruptive products, and launch new business divisions using corporate resources while mitigating personal financial risk.",
          "importantPoints": [
            "Forms: Corporate Venturing, Strategic Renewal, Intrapreneurship, and Corporate Incubators/Accelerators.",
            "Provides corporate funding, established brand trust, distribution networks, and patent portfolios.",
            "Overcomes corporate inertia and prevents disruption from nimble outside startups.",
            "Requires a culture that tolerates calculated failure and rewards breakthrough innovation."
          ],
          "simpleRealWorldExample": "Sony engineer Ken Kutaragi developed the PlayStation as an internal side-project within Sony, creating one of Sony's most profitable corporate gaming divisions.",
          "examOrientedPoints": [
            "Differentiate between Entrepreneurship and Intrapreneurship.",
            "Explain corporate venture capital (CVC) and internal incubator models.",
            "Key factors necessary to build an intrapreneurial corporate culture."
          ],
          "possibleExamQuestions": [
            "What is corporate entrepreneurship (intrapreneurship)? Explain how large corporations foster innovation internally.",
            "Compare and contrast an entrepreneur and an intrapreneur with respect to risk, autonomy, and resource access.",
            "Describe how corporate venture capital and innovation labs help companies survive market disruption."
          ]
        }
      },
      {
        "id": "top-1-6",
        "topicNumber": "1.6",
        "title": "Entrepreneurial mindset",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "A cognitive framework characterized by resilience, opportunity alertness, critical thinking, calculated risk tolerance, and continuous learning from failure.",
          "detailedExplanation": "An entrepreneurial mindset enables engineers and founders to navigate ambiguity, overcome cognitive biases, and pivot quickly based on market feedback. It emphasizes problem-solution fit, resourcefulness (doing more with less/bootstrapping), and proactive self-efficacy rather than waiting for instructions.",
          "importantPoints": [
            "Key pillars: Growth mindset, Tolerance for ambiguity, Grit/Resilience, High internal locus of control.",
            "Viewing failure as iterative feedback rather than fatal defeat (Lean startup philosophy).",
            "Effectuation vs. Causation: starting with available means and co-creating with committed partners.",
            "Critical for engineering students transitioning from technical problem solvers to business creators."
          ],
          "simpleRealWorldExample": "Thomas Edison tested thousands of materials before perfecting the incandescent bulb filament, exemplifying the experimental resilience of an entrepreneurial mindset.",
          "examOrientedPoints": [
            "Define Growth Mindset vs Fixed Mindset in entrepreneurship.",
            "Explain the concept of \"Internal Locus of Control\".",
            "Discuss the role of emotional resilience and pivoting in startup survival."
          ],
          "possibleExamQuestions": [
            "Define an entrepreneurial mindset. What psychological and behavioural attributes distinguish successful founders?",
            "Explain how an internal locus of control and tolerance for ambiguity assist engineering entrepreneurs during startup crises.",
            "Discuss the concept of \"Failing Fast and Iterating\" in the context of modern tech startups."
          ]
        }
      },
      {
        "id": "top-1-7",
        "topicNumber": "1.7",
        "title": "Self-learning: Case studies of Henry Ford and The Tatas",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Analysis of pioneering industrial entrepreneurship through Henry Ford's mass production model and Jamsetji Tata's nation-building industrial conglomerate.",
          "detailedExplanation": "Henry Ford revolutionized automobile manufacturing through the moving assembly line, standardization of interchangeable parts, and the $5-a-day wage, making cars affordable to the masses. Jamsetji Tata and the Tata Group built India's industrial foundation through ethical capitalism, creating Tata Steel (Jamshedpur), Tata Power, Taj Hotels, and premier institutions like IISc, focusing on self-reliance and social welfare.",
          "importantPoints": [
            "Henry Ford: Moving assembly line, vertical integration, Model T affordability, supply chain optimization.",
            "Tata Group: Nation-building vision, ethical governance, employee welfare (8-hour workday pioneered before western laws).",
            "Key takeaway for engineers: Innovation in manufacturing process is as vital as product innovation.",
            "Long-term sustainable enterprise value creation vs short-term speculative profits."
          ],
          "simpleRealWorldExample": "Tata Motors developing the Tata Indica (India's first indigenous passenger car) and Tata Ace (pioneering micro-truck category) based on Indian grassroots transport needs.",
          "examOrientedPoints": [
            "Key industrial contributions of Henry Ford to manufacturing and assembly lines.",
            "Core principles of Jamsetji Tata's ethical entrepreneurship and nation building.",
            "Comparative analysis of Western mass manufacturing vs Indian value-driven conglomerate building."
          ],
          "possibleExamQuestions": [
            "Analyze the entrepreneurial journey and manufacturing innovations introduced by Henry Ford in the automotive industry.",
            "Discuss the contribution of the Tata Group towards Indian industrialization, ethical business practices, and social welfare.",
            "Extract key lessons for modern engineering startups from the case studies of Ford and Tata."
          ]
        }
      }
    ]
  },
  {
    "id": "unit-2",
    "moduleNumber": 2,
    "title": "Unit II – Entrepreneurship Development",
    "hours": "6",
    "loMapping": "CO2",
    "isCompleted": true,
    "topics": [
      {
        "id": "top-2-1",
        "topicNumber": "2.1",
        "title": "Types of business ownership",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The legal structure chosen to operate a business enterprise, defining ownership rights, liability, taxation, and compliance requirements.",
          "detailedExplanation": "Choosing the correct business structure impacts liability risk, tax burden, capital-raising ability, and regulatory compliance. The main forms include Sole Proprietorship, Partnership Firm, Limited Liability Partnership (LLP), Private Limited Company, Public Limited Company, and Co-operative Societies.",
          "importantPoints": [
            "Factors influencing choice: Capital requirement, degree of risk/liability, continuity, and compliance cost.",
            "Unincorporated entities (Sole proprietorship, general partnership) have unlimited personal liability.",
            "Incorporated entities (Pvt Ltd, LLP, Public Ltd) have separate legal entity and limited liability.",
            "Startups seeking venture capital almost exclusively register as Private Limited companies."
          ],
          "simpleRealWorldExample": "A freelance software developer starts as a Sole Proprietorship, forms an LLP with a co-founder for consulting, and converts to a Private Limited company when raising VC funding.",
          "examOrientedPoints": [
            "Comparative matrix of business ownership structures (Liability, Registration, Tax, Funding).",
            "Explain the concept of \"Separate Legal Entity\" (Salomon v Salomon principle).",
            "Why venture capitalists require startups to be Private Limited companies."
          ],
          "possibleExamQuestions": [
            "Classify and compare the various forms of business ownership structures based on liability, capital formation, and legal compliance.",
            "Explain why a Private Limited Company structure is preferred by technology startups seeking equity investment.",
            "Discuss the criteria an entrepreneur should evaluate before selecting a legal business structure."
          ]
        }
      },
      {
        "id": "top-2-2",
        "topicNumber": "2.2",
        "title": "Proprietorship",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "A business owned, managed, and controlled by a single individual who receives all profits and bears unlimited financial liability.",
          "detailedExplanation": "Sole proprietorship is the simplest, quickest, and most common form of business organization. There is no legal distinction between the owner and the business entity. The proprietor enjoys complete autonomy, total profit retention, and minimal statutory compliance, but suffers from unlimited liability, limited borrowing capacity, and lack of perpetual succession.",
          "importantPoints": [
            "Formation: Minimal formalities (Shop Act license, GST registration, MSME Udyam).",
            "Liability: Unlimited—personal assets can be attached to settle business debts.",
            "Decision making: 100% swift and unilateral control.",
            "Limitation: Business dissolves upon demise or incapacitation of the owner."
          ],
          "simpleRealWorldExample": "A local electronics repair shop or freelance UI/UX design studio operated by a single engineer registered under local Municipal Corporation Shop & Establishment Act.",
          "examOrientedPoints": [
            "Advantages and Disadvantages of Sole Proprietorship.",
            "Concept of Unlimited Liability with legal implications.",
            "Suitability for micro and localized business operations."
          ],
          "possibleExamQuestions": [
            "Define a Sole Proprietorship. Explain its key features, advantages, and limitations.",
            "Explain the concept of unlimited liability in a proprietorship firm with an illustrative scenario.",
            "Under what market circumstances is a sole proprietorship form of organization most appropriate?"
          ]
        }
      },
      {
        "id": "top-2-3",
        "topicNumber": "2.3",
        "title": "Public companies",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "A corporate entity whose shares can be publicly traded on stock exchanges, requiring a minimum of 7 members and offering limited liability.",
          "detailedExplanation": "A Public Limited Company is governed by the Companies Act, 2013, and SEBI regulations. It can raise enormous capital from the general public via Initial Public Offerings (IPO) and debt instruments. It features perpetual succession, free transferability of shares, democratic board governance, but requires extensive regulatory compliance and mandatory quarterly disclosures.",
          "importantPoints": [
            "Requirements: Minimum 7 members, no maximum limit, minimum 3 directors.",
            "Capital: Can invite public subscription through prospectus and stock exchange listing.",
            "Transparency: High disclosure norms, mandatory independent directors, quarterly audits.",
            "Transferability: Shares freely bought/sold on stock exchanges without firm permission."
          ],
          "simpleRealWorldExample": "Tata Motors Limited, Reliance Industries Limited, and Infosys Limited are Public Limited companies listed on the Bombay Stock Exchange (BSE) and National Stock Exchange (NSE).",
          "examOrientedPoints": [
            "Distinguish between Private Limited and Public Limited companies in a comparison table.",
            "Explain the process and significance of an Initial Public Offering (IPO).",
            "Role of SEBI and statutory audit disclosures in public company governance."
          ],
          "possibleExamQuestions": [
            "Explain the characteristics, advantages, and governance structure of a Public Limited Company.",
            "Compare a Private Limited Company with a Public Limited Company on minimum members, capital raising, share transfer, and regulatory scrutiny.",
            "What is an Initial Public Offering (IPO)? Discuss how public listing changes a company's capital structure and accountability."
          ]
        }
      },
      {
        "id": "top-2-4",
        "topicNumber": "2.4",
        "title": "Private companies",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "A privately held corporate entity with limited liability, restricted share transferability, and a membership capped between 2 and 200 members.",
          "detailedExplanation": "A Private Limited Company (Pvt. Ltd.) offers separate legal entity status and limited liability protection to its founders and investors. It cannot invite public deposits or publicly trade shares on stock exchanges. It is the gold standard for tech startups because it allows issuing ESOPs (Employee Stock Option Plans) and multiple classes of equity shares (Preferred vs Common stock).",
          "importantPoints": [
            "Requirements: Minimum 2 members, maximum 200 members; minimum 2 directors.",
            "Liability: Limited strictly to the unpaid face value of shares held.",
            "Confidentiality: Greater operational secrecy compared to listed public firms.",
            "Investor suitability: Angel investors and Venture Capitalists require Pvt Ltd structure."
          ],
          "simpleRealWorldExample": "Swiggy (Bundl Technologies Pvt. Ltd.) and Zomato (during early growth stages) operated as Private Limited companies to raise venture capital from global funds.",
          "examOrientedPoints": [
            "Key characteristics of Private Limited Company under Companies Act 2013.",
            "Why Private Limited structure is required for ESOPs and Venture Capital funding.",
            "Restrictions on share transfer and public fundraising."
          ],
          "possibleExamQuestions": [
            "Describe the formation, legal privileges, and key features of a Private Limited Company.",
            "Why is a Private Limited Company structure considered ideal for early-stage venture-backed technology startups?",
            "Explain the concepts of Limited Liability and Perpetual Succession with respect to private companies."
          ]
        }
      },
      {
        "id": "top-2-5",
        "topicNumber": "2.5",
        "title": "Co-operative businesses",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "A voluntary association of individuals united to meet common economic, social, and cultural needs through a democratically controlled enterprise.",
          "detailedExplanation": "Co-operatives operate on the principle of mutual help and democratic governance (\"One Member, One Vote\", regardless of shares held). The primary objective is service to members rather than maximizing individual capital profits. Profits are distributed as patronage dividends based on transaction volume rather than equity ownership percentage.",
          "importantPoints": [
            "Governing principle: \"Each for all and all for each\"; democratic member control.",
            "Types: Producer co-operatives, Consumer co-operatives, Credit societies, Housing societies.",
            "Surplus distribution: Divided based on member participation/patronage dividend.",
            "Government support: Tax incentives, subsidized loans, and preferential state quotas."
          ],
          "simpleRealWorldExample": "Amul (Gujarat Co-operative Milk Marketing Federation - GCMMF) empowered millions of small dairy farmers to build India's largest food products organization.",
          "examOrientedPoints": [
            "Core principles of Co-operative movement (Rochdale principles).",
            "Explain the \"One Member One Vote\" democratic control principle.",
            "Case study of Amul / Lijjat Papad as successful Indian co-operatives."
          ],
          "possibleExamQuestions": [
            "Explain the philosophy, structure, and operational characteristics of a Co-operative business enterprise.",
            "Discuss the role of co-operative societies in grassroots economic empowerment with the case study of Amul.",
            "Differentiate between a Joint Stock Company and a Co-operative Society regarding profit motive and voting rights."
          ]
        }
      },
      {
        "id": "top-2-6",
        "topicNumber": "2.6",
        "title": "Micro, Small and Medium Enterprises (MSME)",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Enterprises classified based on composite investment in plant & machinery/equipment and annual turnover criteria under the MSMED Act.",
          "detailedExplanation": "The Indian Government updated the MSME definition in 2020 under the Atmanirbhar Bharat initiative into a composite criterion of Investment and Turnover: Micro (Investment <= 1 Cr, Turnover <= 5 Cr), Small (Investment <= 10 Cr, Turnover <= 50 Cr), and Medium (Investment <= 50 Cr, Turnover <= 250 Cr).",
          "importantPoints": [
            "Micro: Investment <= ₹1 Crore AND Annual Turnover <= ₹5 Crore.",
            "Small: Investment <= ₹10 Crore AND Annual Turnover <= ₹50 Crore.",
            "Medium: Investment <= ₹50 Crore AND Annual Turnover <= ₹250 Crore.",
            "Registration portal: Udyam Registration (single-window digital paperless process)."
          ],
          "simpleRealWorldExample": "A Pune-based precision CNC machining workshop with ₹3 Crore machinery investment and ₹12 Crore annual revenue is classified as a Small Enterprise.",
          "examOrientedPoints": [
            "Memorize the revised 2020 MSME classification table (Investment & Turnover).",
            "Explain the Udyam Registration portal benefits.",
            "Highlight the removal of distinction between manufacturing and service sectors."
          ],
          "possibleExamQuestions": [
            "State the revised composite criteria (2020) for classifying Micro, Small, and Medium Enterprises (MSMEs) in India.",
            "Explain the procedure and statutory benefits of obtaining Udyam MSME registration for an engineering venture.",
            "Compare the legacy MSMED Act 2006 classification with the revised 2020 composite definition."
          ]
        }
      },
      {
        "id": "top-2-7",
        "topicNumber": "2.7",
        "title": "Definition and role of MSMEs in economic development",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The vital contribution of the MSME sector as the growth engine of the Indian economy, generating ~30% of GDP and 45% of total exports.",
          "detailedExplanation": "MSMEs act as nurseries for grassroots entrepreneurship, providing second-highest employment after agriculture at lower capital costs. They foster manufacturing decentralization, supply specialized OEM components to large engineering industries, promote rural industrialization, and drive exports.",
          "importantPoints": [
            "Generates over 110 million jobs across India with low capital intensity.",
            "Contributes ~30% to India's Gross Domestic Product (GDP) and ~45% to national exports.",
            "Provides ancillary support and supply chain components to automotive, aerospace, and electronics sectors.",
            "Government support: Collateral-free loans (CGTMSE), delayed payment protection (MSME Samadhaan), public procurement preference."
          ],
          "simpleRealWorldExample": "Ancillary MSME electronic PCB fabrication units in Navi Mumbai and Ambattur supplying wire harnesses and controllers to defense and automobile manufacturers.",
          "examOrientedPoints": [
            "Statistical contribution of MSMEs to Indian GDP, Employment, and Exports.",
            "Key government schemes: CGTMSE, CLCSS, MSME Samadhaan.",
            "Role of MSMEs in feeding industrial supply chains."
          ],
          "possibleExamQuestions": [
            "Evaluate the strategic role and economic contribution of the MSME sector in India's GDP, export earnings, and industrial growth.",
            "Discuss the major challenges faced by MSMEs (delayed payments, working capital credit) and government remedial schemes.",
            "Explain how MSMEs foster grassroots entrepreneurship and supply chain resilience for large-scale engineering industries."
          ]
        }
      }
    ]
  },
  {
    "id": "unit-3",
    "moduleNumber": 3,
    "title": "Unit III – Start-up Financing",
    "hours": "6",
    "loMapping": "CO3",
    "isCompleted": true,
    "topics": [
      {
        "id": "top-3-1",
        "topicNumber": "3.1",
        "title": "Cost and revenue models",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The financial structure detailing all fixed and variable operational costs alongside the monetization mechanisms used to generate venture revenue.",
          "detailedExplanation": "Cost models categorize expenses into Fixed Costs (rent, salaries, equipment depreciation) and Variable Costs (raw materials, cloud server bandwidth, transaction fees). Revenue models define how the startup charges customers (e.g., direct sales, usage fees, subscription, licensing, marketplace commission, freemium). Calculating the Break-Even Point (BEP) determines the sales volume required to cover total costs.",
          "importantPoints": [
            "Fixed Costs: Invariant with production volume (CAPEX, base salaries).",
            "Variable Costs: Directly proportional to production/sales volume (OPEX, delivery costs).",
            "Break-Even Point formula: BEP (units) = Fixed Costs / (Selling Price per Unit - Variable Cost per Unit).",
            "Gross Margin = (Revenue - COGS) / Revenue * 100."
          ],
          "simpleRealWorldExample": "A SaaS engineering simulation platform incurs fixed server/development costs of ₹5 Lakhs/month and variable compute cost of ₹200/simulation, charging users ₹1,000/simulation to break even at 625 simulations/month.",
          "examOrientedPoints": [
            "Differentiate between Fixed Costs, Variable Costs, and Sunk Costs.",
            "Write and calculate the Break-Even Analysis (BEP) formula with a numerical problem.",
            "Classify standard revenue models: Subscription, Transactional, Advertising, Licensing."
          ],
          "possibleExamQuestions": [
            "Explain the components of cost models (Fixed vs Variable) and how startups compute their Break-Even Point (BEP).",
            "Discuss five different revenue models adopted by technology startups with appropriate industry examples.",
            "A startup has fixed costs of ₹10,00,000 per year, variable cost of ₹50 per product, and sells at ₹150 per product. Calculate its Break-Even Point in units."
          ]
        }
      },
      {
        "id": "top-3-2",
        "topicNumber": "3.2",
        "title": "Angel investors",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "High-net-worth individuals (HNIs) who provide early-stage seed capital to startups in exchange for equity ownership or convertible debt.",
          "detailedExplanation": "Angel investors typically invest their personal funds at the seed or pre-seed stage when the risk of failure is highest and traditional bank loans or VC funds are unavailable. Beyond capital, angels provide valuable industry mentorship, governance advice, customer introductions, and credibility.",
          "importantPoints": [
            "Investment stage: Idea stage, Prototype, Seed stage (typical checks: ₹10 Lakhs to ₹2 Crores).",
            "Source of capital: Personal wealth of accredited high-net-worth individuals.",
            "Key networks in India: Indian Angel Network (IAN), Mumbai Angels, Lead Angels, LetsVenture.",
            "Instruments: Equity shares, Compulsorily Convertible Preference Shares (CCPS), Convertible Notes."
          ],
          "simpleRealWorldExample": "Ratan Tata and Kunal Shah investing early personal angel capital into emerging Indian tech startups like Ola, Paytm, and CRED.",
          "examOrientedPoints": [
            "Characteristics and role of Angel Investors in startup ecosystem.",
            "Differentiate between Angel Investors and Venture Capitalists in a comparison table.",
            "Explain Angel Networks and syndicates in India."
          ],
          "possibleExamQuestions": [
            "Define an Angel Investor. Discuss their role, motivations, and contribution to early-stage technology startup funding.",
            "Compare Angel Investors and Venture Capitalists regarding investment stage, fund source, ticket size, and risk appetite.",
            "What is an Angel Syndicate and how does platform like LetsVenture facilitate seed-stage financing?"
          ]
        }
      },
      {
        "id": "top-3-3",
        "topicNumber": "3.3",
        "title": "Venture capitalists",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Professional institutional investment funds that deploy pooled institutional capital into high-growth, scalable startups in exchange for significant equity stakes.",
          "detailedExplanation": "Venture Capital (VC) firms raise funds from Limited Partners (LPs - pension funds, university endowments, sovereign wealth funds) and deploy them via General Partners (GPs). VCs invest in Series A, B, C+ funding rounds for startups with proven product-market fit, seeking 10x-100x returns to offset the high mortality rate of early portfolio startups, targeting exit through IPO or M&A acquisition.",
          "importantPoints": [
            "Structure: General Partners (fund managers) manage institutional funds raised from Limited Partners.",
            "Funding rounds: Series A (Product-Market Fit), Series B (Scaling), Series C/D (Market Expansion/Acquisitions).",
            "Due diligence: Thorough technical, legal, financial, and IP audit before investment.",
            "Exit mechanisms: Initial Public Offering (IPO), Strategic Acquisition (M&A), Secondary Sale."
          ],
          "simpleRealWorldExample": "Sequoia Capital (Peak XV Partners) and Accel Partners investing in early growth rounds of Flipkart, Swiggy, and Freshworks.",
          "examOrientedPoints": [
            "The VC funding lifecycle: Pre-seed -> Seed -> Series A/B/C -> Growth -> Exit.",
            "Terms in a VC Term Sheet: Pre-money vs Post-money valuation, Liquidation Preference, Anti-dilution.",
            "How VCs achieve financial exits."
          ],
          "possibleExamQuestions": [
            "Explain the structure and operation of a Venture Capital fund. How do VCs evaluate startup investment proposals?",
            "Detail the various sequential funding rounds of a startup from Seed stage to Initial Public Offering (IPO).",
            "Explain key clauses in a Venture Capital Term Sheet including Valuation, Board Seats, and Liquidation Preference."
          ]
        }
      },
      {
        "id": "top-3-4",
        "topicNumber": "3.4",
        "title": "Crowdfunding",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The practice of funding a project or venture by raising small monetary contributions from a large number of people, typically via online platforms.",
          "detailedExplanation": "Crowdfunding democratizes fundraising by bypassing traditional gatekeepers. The four primary models are: Reward-based (backers receive early product perks/merchandise), Donation-based (philanthropic funding without financial returns), Equity-based (investors receive small equity shares, regulated by securities laws), and Debt/P2P lending (peer-to-peer micro-lending with interest).",
          "importantPoints": [
            "Reward-based: Kickstarter, Indiegogo (pre-orders, discounted prototypes).",
            "Donation-based: Ketto, Milaap, GoFundMe (medical, social causes).",
            "Equity-based: Backers receive fractional equity ownership (strict SEBI compliance in India).",
            "Acts as market validation—proves consumer demand before initiating mass manufacturing."
          ],
          "simpleRealWorldExample": "Oculus Rift raised $2.4 million from 9,500 backers on Kickstarter for its VR headset prototype before being acquired by Meta for $2 billion.",
          "examOrientedPoints": [
            "List and explain the 4 major types of Crowdfunding.",
            "How crowdfunding serves as both a financing tool and a market validation engine.",
            "Regulatory status and SEBI framework for equity crowdfunding in India."
          ],
          "possibleExamQuestions": [
            "Define Crowdfunding. Explain its four primary models with real-world platform examples.",
            "Discuss how reward-based crowdfunding helps hardware engineering startups validate product-market demand.",
            "What are the advantages and risks associated with crowdfunding for an early-stage entrepreneur?"
          ]
        }
      },
      {
        "id": "top-3-5",
        "topicNumber": "3.5",
        "title": "Government schemes for start-up funding",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Policy initiatives and non-dilutive financial grant schemes established by Central and State governments to support innovation, R&D, and startup incubation.",
          "detailedExplanation": "The Government of India has instituted extensive support mechanisms under the Startup India initiative. Key schemes include Startup India Seed Fund Scheme (SISFS - up to ₹50 Lakhs for POC and prototype), Credit Guarantee Scheme for Startups (CGSS), BIRAC (Biotechnology grants), TIDE 2.0 (MeitY tech incubation), and ASPIRE for rural innovation.",
          "importantPoints": [
            "Startup India Seed Fund Scheme (SISFS): Financial assistance for Proof of Concept, Prototype development, and trial runs.",
            "Tax exemptions: Section 80-IAC (100% tax holiday for 3 consecutive years), Section 56(2)(viib) Angel Tax exemption.",
            "Public Procurement: Exemption from prior turnover and experience criteria in Government e-Marketplace (GeM).",
            "Atal Innovation Mission (AIM): Establishing Atal Incubation Centres (AICs) in technical universities."
          ],
          "simpleRealWorldExample": "A university robotics team receiving ₹20 Lakhs grant under MeitY TIDE 2.0 through their college incubation cell to develop an automated sewer inspection robot.",
          "examOrientedPoints": [
            "Key provisions of Startup India Seed Fund Scheme (SISFS).",
            "Tax benefits under DPIIT startup recognition (Section 80-IAC).",
            "Role of Atal Incubation Centres (AICs) in engineering colleges."
          ],
          "possibleExamQuestions": [
            "Discuss the key government initiatives and financial funding schemes available for technology startups in India.",
            "Explain the features and eligibility criteria of the Startup India Seed Fund Scheme (SISFS).",
            "How do DPIIT recognition and government incubation centers foster engineering innovation and intellectual property?"
          ]
        }
      },
      {
        "id": "top-3-6",
        "topicNumber": "3.6",
        "title": "Self-learning: Successful business pitching",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The art and methodology of delivering a concise, compelling presentation (Pitch Deck) to investors, partners, or customers to secure funding and buy-in.",
          "detailedExplanation": "A successful investor pitch deck typically consists of 10–12 structured slides: Problem statement, Solution/Value proposition, Product demo/Architecture, Market size (TAM, SAM, SOM), Business/Monetization model, Go-To-Market strategy, Competitive advantages/Moat, Financial projections, Team credentials, and The \"Ask\" (funding required and fund allocation).",
          "importantPoints": [
            "Structure: Problem -> Solution -> Market Size (TAM/SAM/SOM) -> Business Model -> Competition -> Team -> The Ask.",
            "Elevator Pitch: 30-to-60 second concise summary answering Who, What, Why, and Traction.",
            "Avoid technical jargon overkill; emphasize customer ROI, scalable unit economics, and execution capability.",
            "Guy Kawasaki's 10/20/30 Rule: 10 slides, 20 minutes presentation, minimum 30-point font size."
          ],
          "simpleRealWorldExample": "Airbnb's legendary 2008 pitch deck of 10 slides that raised their initial $600,000 seed round by clearly defining \"Book rooms with locals, rather than hotels\".",
          "examOrientedPoints": [
            "List the essential 10 slides of a standard startup investor pitch deck.",
            "Explain Guy Kawasaki's 10/20/30 Rule of pitching.",
            "Define TAM, SAM, and SOM in market sizing."
          ],
          "possibleExamQuestions": [
            "Outline the standard structure of an investor Pitch Deck. Explain the significance of each slide in securing venture capital.",
            "What is an Elevator Pitch? Draft a 60-second elevator pitch for an innovative EXTC IoT-based smart energy monitoring startup.",
            "Explain Guy Kawasaki's 10/20/30 pitching framework and why brevity is crucial when presenting to venture investors."
          ]
        }
      }
    ]
  },
  {
    "id": "unit-4",
    "moduleNumber": 4,
    "title": "Unit IV – Intellectual Property Rights (IPR)",
    "hours": "6",
    "loMapping": "CO4",
    "isCompleted": true,
    "topics": [
      {
        "id": "top-4-1",
        "topicNumber": "4.1",
        "title": "Intellectual Property Rights",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "Legal rights granted to creators and inventors to protect their intangible intellectual creations from unauthorized commercial use, copying, or exploitation.",
          "detailedExplanation": "IPR provides monopoly rights for a limited statutory duration to encourage R&D, artistic creation, and industrial innovation. Intellectual Property is broadly classified into Industrial Property (Patents, Trademarks, Industrial Designs, Trade Secrets, Geographical Indications) and Copyrights (literary, musical, artistic, software source code).",
          "importantPoints": [
            "Governed globally by WIPO (World Intellectual Property Organization) and TRIPS Agreement (WTO).",
            "Provides competitive advantage, valuation enhancement, and licensing revenue opportunities.",
            "IP acts as intangible commercial assets that can be sold, assigned, or licensed for royalties.",
            "Protects technological innovation from direct imitation by well-funded market incumbents."
          ],
          "simpleRealWorldExample": "Qualcomm generates billions of dollars in royalty revenue annually by licensing its patented 4G/5G wireless communication technology to smartphone manufacturers.",
          "examOrientedPoints": [
            "Definition and classification of Intellectual Property Rights.",
            "Role of WIPO and TRIPS agreement in global IPR harmonization.",
            "Explain how IPR builds a \"Competitive Moat\" for tech startups."
          ],
          "possibleExamQuestions": [
            "Define Intellectual Property Rights (IPR). Classify and explain the major forms of IP protection with examples.",
            "Discuss the role and significance of IPR in fostering engineering innovation and attracting venture investment.",
            "Explain the functions of WIPO and the TRIPS agreement in protecting cross-border intellectual property."
          ]
        }
      },
      {
        "id": "top-4-2",
        "topicNumber": "4.2",
        "title": "Patents",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "An exclusive monopoly right granted by the government for an invention (product or process) for 20 years, excluding others from making, using, or selling it.",
          "detailedExplanation": "Under the Indian Patents Act 1970, an invention must satisfy three mandatory statutory criteria to be patentable: Novelty (must not be published anywhere globally in prior art), Inventive Step / Non-Obviousness (must not be obvious to a person skilled in the art), and Industrial Applicability (must possess practical commercial utility).",
          "importantPoints": [
            "Statutory duration: 20 years from the date of filing (subject to annual renewal fees).",
            "3 Patentability Criteria: 1. Novelty, 2. Inventive Step (Non-obviousness), 3. Industrial Applicability.",
            "Section 3 exclusions (Indian Patent Act): Mathematical algorithms, business methods, software per se are not patentable unless integrated with hardware.",
            "Patent documents are published publicly in exchange for the 20-year monopoly grant."
          ],
          "simpleRealWorldExample": "ARM holds patents for energy-efficient RISC processor micro-architectures used in virtually all modern smartphones.",
          "examOrientedPoints": [
            "The 3 statutory criteria for patentability (Novelty, Inventive Step, Utility).",
            "Term of a patent (20 years) and rights conferred to the patentee.",
            "What is NOT patentable under Section 3 of Indian Patents Act 1970."
          ],
          "possibleExamQuestions": [
            "Define a Patent. Explain the three mandatory statutory criteria for an invention to be patentable with examples.",
            "Describe the patent registration process in India from provisional specification filing to patent grant.",
            "Explain what inventions are non-patentable under Section 3 of the Indian Patents Act, 1970."
          ]
        }
      },
      {
        "id": "top-4-3",
        "topicNumber": "4.3",
        "title": "Trademarks",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "A distinctive sign, design, symbol, logo, word, or slogan that uniquely identifies and distinguishes the goods/services of one enterprise from those of competitors.",
          "detailedExplanation": "Trademarks protect brand identity and consumer trust under the Trade Marks Act, 1999. Unlike patents, trademarks can be renewed indefinitely every 10 years upon payment of renewal fees. The symbols used are ™ (unregistered trademark claim) and ® (officially registered trademark granted by the Registry).",
          "importantPoints": [
            "Protects: Brand names, logos, slogans, sound marks (e.g., Intel chime), shape of goods.",
            "Duration: 10 years, renewable indefinitely every 10 years.",
            "Functions: Origin identification, quality guarantee, brand advertising, prevention of consumer confusion.",
            "Infringement vs Passing Off: Legal protection against counterfeit and deceptive imitation."
          ],
          "simpleRealWorldExample": "Apple's bitten apple logo, Nike's \"Swoosh\" logo and slogan \"Just Do It\", and Intel's \"Intel Inside\" audio mark.",
          "examOrientedPoints": [
            "Difference between ™ and ® symbols.",
            "Duration and renewal terms of Trademarks (10 years renewable).",
            "Distinguish between Trademark Infringement and Passing Off."
          ],
          "possibleExamQuestions": [
            "What is a Trademark? Discuss its functions, types (word, logo, sound, shape), and importance in building brand equity.",
            "Explain the procedure for trademark registration in India and differentiate between Trademark Infringement and Passing Off.",
            "Compare Patents, Trademarks, and Copyrights on the basis of protected matter, validity duration, and governing acts."
          ]
        }
      },
      {
        "id": "top-4-4",
        "topicNumber": "4.4",
        "title": "Copyrights",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "An exclusive legal right granted to creators of original literary, dramatic, musical, artistic works, cinematographic films, and computer software code.",
          "detailedExplanation": "Under the Indian Copyright Act 1957, copyright protection arises automatically upon creation of the work in fixed tangible form (registration is optional but provides strong evidentiary value in court). Copyright protects the original expression of an idea, not the idea itself (Idea-Expression Dichotomy). For literary/software works, protection lasts for the Author's Lifetime + 60 Years.",
          "importantPoints": [
            "Protects: Software source code, user manuals, books, music, artistic illustrations, architectural designs.",
            "Duration: Lifetime of the author + 60 years after their demise.",
            "Idea-Expression Dichotomy: Ideas, algorithms, and concepts cannot be copyrighted; only the specific written code/text expression is protected.",
            "Doctrine of Fair Use: Allows limited use of copyrighted material for educational, review, or news reporting purposes without infringement."
          ],
          "simpleRealWorldExample": "Microsoft holding copyright over the source code and documentation of Windows OS and Office Suite.",
          "examOrientedPoints": [
            "Explain the Idea-Expression Dichotomy with an example.",
            "Duration of Copyright protection (Life of author + 60 years).",
            "Doctrine of Fair Use and protection of software source code under Indian Copyright Act."
          ],
          "possibleExamQuestions": [
            "Explain the nature and scope of Copyright protection. How does copyright protect computer software and source code in India?",
            "Discuss the Idea-Expression Dichotomy and the Doctrine of Fair Use in copyright law with examples.",
            "What rights are granted to a copyright holder? Differentiate between economic rights and moral rights."
          ]
        }
      },
      {
        "id": "top-4-5",
        "topicNumber": "4.5",
        "title": "Patent search and analysis",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The systematic exploration of global patent databases to evaluate the novelty of an invention, analyze competitors' IP, and ensure Freedom to Operate (FTO).",
          "detailedExplanation": "Before filing a patent or launching a technical product, engineers perform Prior Art Searches using databases such as Google Patents, Espacenet, USPTO, and Indian Patent Office (InPASS). Patent analysis reveals technological trends, whitespace analysis (unclaimed technical areas), and prevents expensive patent infringement litigation through Freedom to Operate (FTO) clearance.",
          "importantPoints": [
            "Key Databases: Google Patents, Espacenet (EPO), USPTO, WIPO Patentscope, Indian Patent Office InPASS.",
            "Prior Art: Any evidence (papers, patents, products, presentations) that the invention is already known publicly.",
            "Freedom to Operate (FTO) Search: Verifies whether commercializing your product will infringe active third-party patents.",
            "Patent Landscape Analysis: Identifies market leaders, emerging tech trajectories, and collaboration opportunities."
          ],
          "simpleRealWorldExample": "An IoT startup conducting an InPASS and Google Patents search before filing a patent for an automated smart water meter to verify no identical circuit design exists.",
          "examOrientedPoints": [
            "Define Prior Art and Freedom to Operate (FTO).",
            "Name 4 major public patent search databases.",
            "Explain how patent landscaping helps R&D teams identify technology white spaces."
          ],
          "possibleExamQuestions": [
            "What is a Prior Art search? Explain the step-by-step methodology for conducting a patent search before product development.",
            "Explain the concept and significance of Freedom to Operate (FTO) analysis for engineering startups.",
            "How does Patent Landscape Analysis guide strategic R&D and prevent intellectual property disputes?"
          ]
        }
      },
      {
        "id": "top-4-6",
        "topicNumber": "4.6",
        "title": "Strategies for IPR protection",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "A strategic roadmap adopted by a business to create, secure, commercialize, enforce, and defend its intellectual property assets to maximize enterprise value.",
          "detailedExplanation": "Startups must employ a multi-layered IP strategy: Filing Provisional Patent Applications early (to secure priority filing date), utilizing Non-Disclosure Agreements (NDAs) with vendors, choosing between Patents vs Trade Secrets (e.g., Coca-Cola formula kept as secret to avoid 20-year expiry), managing IP assignment agreements with employees, and licensing IP for recurring royalty cashflows.",
          "importantPoints": [
            "Provisional vs Complete Specification: Filing provisional specification gives 12 months to develop prototype while securing priority date.",
            "Trade Secrets vs Patents: Patents require public disclosure and expire in 20 years; trade secrets last forever if kept confidential.",
            "Employee IP Assignment: Ensuring all code/inventions created by employees belong legally to the startup entity.",
            "Defensive Publishing: Publishing non-core technical innovations publicly to prevent competitors from patenting them."
          ],
          "simpleRealWorldExample": "Tesla maintaining proprietary battery chemistry algorithms as Trade Secrets while filing patents on mechanical hardware, and later open-sourcing certain patents to accelerate EV ecosystem growth.",
          "examOrientedPoints": [
            "Differentiate between Patents and Trade Secrets.",
            "Importance of Provisional Patent filing and 12-month complete specification window.",
            "Role of Non-Disclosure Agreements (NDAs) and IP Assignment agreements."
          ],
          "possibleExamQuestions": [
            "Formulate an effective IPR protection strategy for an early-stage technology startup with limited financial resources.",
            "Compare Patents and Trade Secrets as alternative strategies for protecting technical innovation with real-world examples.",
            "Explain the utility of Provisional Patent applications and Non-Disclosure Agreements (NDAs) in startup R&D."
          ]
        }
      },
      {
        "id": "top-4-7",
        "topicNumber": "4.7",
        "title": "Ethics in technology and innovation",
        "isCompleted": true,
        "notes": {
          "simpleDefinition": "The moral principles and professional standards guiding the responsible creation, deployment, and commercialization of technological innovations without harming society.",
          "detailedExplanation": "Engineers and entrepreneurs face ethical challenges regarding user data privacy (GDPR/DPDP Act), algorithmic bias in AI/ML, environmental sustainability (e-waste/energy consumption), patent trolling (holding patents solely to litigate), and planned obsolescence. Ethical innovation balances shareholder profit with social welfare, transparency, and safety.",
          "importantPoints": [
            "Data Privacy & Surveillance: Responsible collection and handling of consumer biometric and behavioral data.",
            "Algorithmic Fairness: Preventing gender, racial, and socio-economic biases in AI-driven decision models.",
            "Patent Trolling & Monopolistic Abuse: Unethical hoarding of patents to extort litigation settlements.",
            "Sustainable Tech Design: Designing for recyclability, energy efficiency, and preventing planned obsolescence."
          ],
          "simpleRealWorldExample": "The Cambridge Analytica scandal demonstrated the catastrophic legal and ethical consequences of harvesting user data without explicit consent.",
          "examOrientedPoints": [
            "Define Patent Trolling and its negative impact on innovation.",
            "Ethical implications of AI algorithms and big data privacy.",
            "Responsibilities of engineering entrepreneurs under India's Digital Personal Data Protection (DPDP) Act 2023."
          ],
          "possibleExamQuestions": [
            "Discuss the ethical dilemmas faced by technology entrepreneurs in the era of Artificial Intelligence and Big Data.",
            "What is Patent Trolling? Explain how unethical IPR litigation hampers startup innovation.",
            "Explain the principles of responsible innovation and data ethics for engineering graduates developing commercial software."
          ]
        }
      }
    ]
  },
  {
    "id": "unit-5",
    "moduleNumber": 5,
    "title": "Unit V – Business Model Development",
    "hours": "6",
    "loMapping": "CO5",
    "isCompleted": false,
    "topics": [
      {
        "id": "top-5-1",
        "topicNumber": "5.1",
        "title": "Types of business models",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "A conceptual framework explaining how an enterprise creates, delivers, and captures economic value for its target customers.",
          "detailedExplanation": "A business model defines how an organization generates revenue and sustains profitability. Key traditional and modern models include: Manufacturer model, Distributor/Retail model, Franchise model, Razor-and-Blade model (cheap hardware, high-margin consumables), Direct-to-Consumer (D2C), Marketplace aggregator model, and Platform ecosystems.",
          "importantPoints": [
            "Core question: Who is the customer, what value is delivered, and how is revenue generated sustainably?",
            "Razor-and-Blade Model: Selling primary product at breakeven/loss, earning on continuous consumables (e.g., Gillette, HP Printers).",
            "Marketplace Aggregator Model: Connecting fragmented buyers and sellers without owning inventory (e.g., Uber, Airbnb, Zomato).",
            "Platform Model: Multi-sided platforms creating network effects (e.g., Android, Apple App Store)."
          ],
          "simpleRealWorldExample": "HP sells inkjet printers at very low profit margins, generating massive recurring profits from high-margin ink cartridge replacements (Razor-and-Blade model).",
          "examOrientedPoints": [
            "Define a Business Model and list 5 major types.",
            "Explain the Razor-and-Blade business model with examples.",
            "Discuss two-sided marketplace models and network effects."
          ],
          "possibleExamQuestions": [
            "What is a Business Model? Explain the various traditional and modern business models adopted by enterprises.",
            "Analyze the Razor-and-Blade business model with suitable engineering and consumer industry examples.",
            "Explain the multi-sided platform business model and how network effects create defensible market moats."
          ]
        }
      },
      {
        "id": "top-5-2",
        "topicNumber": "5.2",
        "title": "Value proposition",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The unique bundle of products, services, and benefits an enterprise offers that solves customer pain points or delivers superior gains over competitors.",
          "detailedExplanation": "The Value Proposition Canvas (Alexander Osterwalder) matches the Customer Profile (Jobs-to-be-done, Pains, Gains) with the Company's Value Map (Products & Services, Pain Relievers, Gain Creators). It defines why a customer should choose your solution instead of existing market alternatives (convenience, price, speed, customization, performance, or prestige).",
          "importantPoints": [
            "Components: Customer Jobs, Customer Pains, Customer Gains, Pain Relievers, Gain Creators.",
            "Problem-Solution Fit: Validating that your value proposition directly addresses high-priority customer pains.",
            "Types of value: Functional value, Economic value (cost savings), Emotional value, Social value.",
            "Must be clear, compelling, and differentiated from existing alternatives."
          ],
          "simpleRealWorldExample": "Slack's value proposition: \"Be more productive with less effort—transform team communication by replacing messy email chains with organized searchable channels.\"",
          "examOrientedPoints": [
            "Draw and explain the Value Proposition Canvas (Customer Profile vs Value Map).",
            "Differentiate between Pain Relievers and Gain Creators.",
            "Define Problem-Solution Fit in startup validation."
          ],
          "possibleExamQuestions": [
            "Illustrate and explain the Value Proposition Canvas with a neat diagram. How does it align product features with customer needs?",
            "What is a Value Proposition? Discuss the factors that make a value proposition compelling for B2B engineering clients.",
            "Explain the concept of Customer Jobs-to-be-done (JTBD) and how identifying underserved pains leads to breakout startup ideas."
          ]
        }
      },
      {
        "id": "top-5-3",
        "topicNumber": "5.3",
        "title": "Customer segments",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The distinct groups of people or organizations an enterprise aims to reach and serve based on common needs, behaviors, or attributes.",
          "detailedExplanation": "Customer segmentation divides a broad market into actionable subgroups. Common types include: Mass Market (broad consumer base, e.g., consumer electronics), Niche Market (specialized technical requirements, e.g., aerospace fasteners), Segmented Market (slightly different needs, e.g., enterprise vs SMB banking), Diversified Market (unrelated segments, e.g., Amazon serving e-commerce shoppers and AWS cloud developers), and Multi-sided Platforms (serving two interdependent groups, e.g., Uber riders and drivers).",
          "importantPoints": [
            "Segmentation criteria: Demographic, Geographic, Behavioral, Psychographic, and Firmographic (B2B).",
            "Mass Market vs Niche Market vs Multi-sided Market.",
            "Early Adopters (Beachhead Market): The specific sub-segment that desperately needs the solution first.",
            "Buyer Persona: A detailed semi-fictional representation of your ideal target customer."
          ],
          "simpleRealWorldExample": "Tesla initially targeted wealthy tech enthusiasts with the high-priced Roadster before expanding into mass-market segments with the Model 3 and Model Y.",
          "examOrientedPoints": [
            "Classify the 5 types of Customer Segments (Mass, Niche, Segmented, Diversified, Multi-sided).",
            "Explain the concept of Beachhead Market for early-stage startups.",
            "Importance of creating a detailed Buyer Persona."
          ],
          "possibleExamQuestions": [
            "Explain the Customer Segments building block of the Business Model Canvas with relevant market examples.",
            "Differentiate between Mass Market, Niche Market, and Multi-sided Customer Segments.",
            "What is a Beachhead Market? How should an engineering startup select its initial target customer segment?"
          ]
        }
      },
      {
        "id": "top-5-4",
        "topicNumber": "5.4",
        "title": "Customer relationships",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The types of interactions and relationships an enterprise establishes with specific customer segments throughout the customer lifecycle.",
          "detailedExplanation": "Customer relationships are driven by three motivations: Customer Acquisition, Customer Retention, and Upselling/Growing sales. Models range from Personal Assistance (dedicated account managers in B2B enterprise software) to Self-Service (automated portals), Automated Services (AI chatbots and personalized recommendations), Communities (developer forums), and Co-creation (users creating content/reviews like YouTube).",
          "importantPoints": [
            "Categories: Personal assistance, Dedicated personal assistance, Self-service, Automated services, Communities, Co-creation.",
            "Customer Acquisition Cost (CAC): Total marketing & sales cost divided by new customers acquired.",
            "Customer Lifetime Value (LTV): Total revenue/profit generated by a customer over their entire relationship.",
            "Rule of Thumb: Healthy SaaS businesses require LTV > 3x CAC."
          ],
          "simpleRealWorldExample": "AWS provides automated self-service portals for individual developers while assigning dedicated enterprise account managers and technical architects for Fortune 500 corporations.",
          "examOrientedPoints": [
            "Types of Customer Relationships in Business Model Canvas.",
            "Define CAC (Customer Acquisition Cost) and LTV (Lifetime Value) with formulas.",
            "Strategies for customer retention and reducing churn rate."
          ],
          "possibleExamQuestions": [
            "Discuss the various types of Customer Relationships an enterprise can establish with its customer segments.",
            "Explain the relationship between Customer Acquisition Cost (CAC) and Lifetime Value (LTV) in evaluating business model sustainability.",
            "What is Customer Churn? Describe automated service and community-driven strategies to improve customer retention."
          ]
        }
      },
      {
        "id": "top-5-5",
        "topicNumber": "5.5",
        "title": "Channels",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The touchpoints and conduits through which an enterprise communicates with and delivers its value proposition to customer segments.",
          "detailedExplanation": "Channels serve 5 distinct phases: 1. Awareness (helping customers discover the product), 2. Evaluation (helping them assess the value proposition), 3. Purchase (facilitating buying transaction), 4. Delivery (delivering the product/service), and 5. After-Sales (providing ongoing customer support). Channels can be Direct (in-house sales team, website) or Indirect (retail stores, wholesale distributors, partner marketplaces).",
          "importantPoints": [
            "5 Channel Phases: Awareness -> Evaluation -> Purchase -> Delivery -> After-sales.",
            "Direct Channels: Higher margins and direct customer relationship (e.g., company website, direct B2B sales force).",
            "Indirect Channels: Broader reach but lower margins (e.g., retail distributors, third-party e-commerce platforms).",
            "Omnichannel Strategy: Seamless integration of physical and digital channel experiences."
          ],
          "simpleRealWorldExample": "Apple uses Direct Channels (Apple Store physical retail and Apple.com) alongside Indirect Channels (Authorized resellers like Amazon, Croma, mobile telecom operators).",
          "examOrientedPoints": [
            "Explain the 5 sequential phases of Channel integration.",
            "Compare Direct vs Indirect Channels in terms of margin, control, and reach.",
            "Role of digital distribution channels in reducing marginal delivery costs to zero."
          ],
          "possibleExamQuestions": [
            "Explain the Channels building block of the Business Model Canvas. Detail the five phases of channel interaction.",
            "Compare Direct and Indirect distribution channels with their respective advantages, trade-offs, and cost structures.",
            "How have digital channels transformed software and service delivery for technology startups?"
          ]
        }
      },
      {
        "id": "top-5-6",
        "topicNumber": "5.6",
        "title": "Key partners",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The network of suppliers, service providers, and strategic alliances that help make the business model work effectively.",
          "detailedExplanation": "Enterprises forge partnerships to optimize their business models, achieve economies of scale, reduce operational risk, or acquire specialized resources/technologies. Four main types include: Strategic alliances between non-competitors, \"Coopetition\" (strategic partnerships between competitors), Joint ventures to develop new businesses, and Buyer-Supplier relationships to ensure reliable supply chains.",
          "importantPoints": [
            "Motivations: Optimization and economies of scale, Reduction of risk and uncertainty, Acquisition of particular resources and activities.",
            "Types of Partnerships: Strategic alliances, Coopetition, Joint ventures, Key supplier contracts.",
            "Enables startups to focus exclusively on their core competence while outsourcing non-core functions.",
            "Reduces capital expenditure (CAPEX) requirements by leveraging partners' established infrastructure."
          ],
          "simpleRealWorldExample": "Apple partners with TSMC (Taiwan Semiconductor Manufacturing Co.) as a key manufacturing partner to fabricate its proprietary M-series and A-series silicon chips.",
          "examOrientedPoints": [
            "The 3 core motivations for establishing Key Partnerships.",
            "Define \"Coopetition\" with a real-world tech industry example.",
            "Explain the difference between a Joint Venture and a Strategic Alliance."
          ],
          "possibleExamQuestions": [
            "Explain the Key Partners block in the Business Model Canvas and discuss the strategic motivations behind forming business alliances.",
            "What is \"Coopetition\"? Discuss how competing technology firms collaborate on standard setting and shared infrastructure.",
            "Discuss how outsourcing non-core activities to key partners enables engineering startups to scale rapidly with lean capital."
          ]
        }
      },
      {
        "id": "top-5-7",
        "topicNumber": "5.7",
        "title": "Key activities",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The most important operational actions an enterprise must execute continuously to make its business model operate successfully.",
          "detailedExplanation": "Key activities represent the core operational engines required to create value propositions, reach markets, maintain customer relationships, and earn revenues. They are categorized into: Production (designing, making, and delivering products in quantity/quality), Problem Solving (providing customized consulting, engineering services, or healthcare), and Platform/Network management (maintaining software platforms, data centers, networks, and payment gateways).",
          "importantPoints": [
            "Production Activities: Hardware manufacturing, quality testing, assembly line optimization.",
            "Problem Solving Activities: Custom software development, IT consulting, systems integration.",
            "Platform/Network Activities: Cloud server uptime maintenance, cybersecurity, algorithm optimization, UX updates.",
            "Must directly support the value proposition and competitive advantage."
          ],
          "simpleRealWorldExample": "For Microsoft, key activities include software development, cybersecurity patching, cloud data center operations (Azure), and developer ecosystem evangelism.",
          "examOrientedPoints": [
            "Classify Key Activities into Production, Problem Solving, and Platform Management.",
            "How key activities differ across hardware, software, and marketplace companies.",
            "Aligning key activities with core competencies to build market moats."
          ],
          "possibleExamQuestions": [
            "Describe the Key Activities building block of the Business Model Canvas. Classify the main categories of operational activities.",
            "Compare the key activities of a hardware electronics manufacturer with those of a cloud-based SaaS software company.",
            "Explain how operational excellence in key activities creates barriers to entry for competitors."
          ]
        }
      },
      {
        "id": "top-5-8",
        "topicNumber": "5.8",
        "title": "Key resources",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The most critical physical, financial, intellectual, and human assets required to make a business model function and deliver value.",
          "detailedExplanation": "Key resources can be owned, leased by the company, or acquired from key partners. They are categorized into: Physical Resources (manufacturing facilities, lab equipment, IT hardware), Intellectual Resources (patents, proprietary algorithms, copyrights, brand trademarks, customer databases), Human Resources (software architects, R&D engineers, specialized sales talent), and Financial Resources (cash lines of credit, venture capital reserves, stock option pools).",
          "importantPoints": [
            "Physical: Buildings, vehicles, precision machines, testing laboratories, data servers.",
            "Intellectual: Patents, proprietary code, brand equity, customer datasets, proprietary domain expertise.",
            "Human: Key engineering talent, domain scientists, skilled leadership.",
            "Financial: Cash balances, lines of credit, working capital, ESOP reserves."
          ],
          "simpleRealWorldExample": "For OpenAI, key resources are massive GPU computing clusters (physical), proprietary LLM weights/algorithms (intellectual), AI research scientists (human), and multi-billion dollar compute credits (financial).",
          "examOrientedPoints": [
            "Explain the 4 categories of Key Resources (Physical, Intellectual, Human, Financial).",
            "Why intellectual and human resources are the most valuable assets in technology startups.",
            "Resource-Based View (RBV) and VRIO framework for sustainable competitive advantage."
          ],
          "possibleExamQuestions": [
            "Explain the Key Resources building block of the Business Model Canvas with clear engineering examples.",
            "Differentiate between physical, intellectual, human, and financial resources in a technology startup.",
            "Explain the VRIO framework (Value, Rarity, Inimitability, Organization) for assessing competitive advantage of key resources."
          ]
        }
      },
      {
        "id": "top-5-9",
        "topicNumber": "5.9",
        "title": "Prototyping",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The creation of an early preliminary working model or mock-up of a product to test concepts, validate engineering feasibility, and gather user feedback.",
          "detailedExplanation": "Prototyping allows engineering entrepreneurs to fail early and cheaply before committing expensive capital to mass tooling or full-scale software builds. Prototyping spans multiple fidelity levels: Low-Fidelity (paper sketches, wireframes, 3D foam models for ergonomics), Medium-Fidelity (interactive Figma mockups, breadboard electronics), and High-Fidelity (3D-printed functional prototypes, pre-production engineering samples).",
          "importantPoints": [
            "Fidelity spectrum: Low-fidelity (rapid/cheap) -> Medium-fidelity (interactive) -> High-fidelity (functional pre-production).",
            "Purpose: Concept validation, technical feasibility testing, ergonomic evaluation, investor demonstrations.",
            "Rapid Prototyping tools: 3D printing (additive manufacturing), CNC milling, Arduino/Raspberry Pi boards, Figma.",
            "Iterative feedback loop: Build -> Test -> Learn -> Refine."
          ],
          "simpleRealWorldExample": "Jeff Hawkins carried a wooden block carved to size with a paper notepad in his pocket for months to test the form-factor and user habits before engineering the PalmPilot PDA.",
          "examOrientedPoints": [
            "Differentiate between Low-Fidelity and High-Fidelity prototypes.",
            "Explain the role of Rapid Prototyping in reducing product development cycles.",
            "Describe the iterative \"Build-Measure-Learn\" prototyping loop."
          ],
          "possibleExamQuestions": [
            "What is Prototyping? Explain the different levels of prototype fidelity with examples from engineering design.",
            "Discuss the role of Rapid Prototyping (3D printing, embedded dev boards) in accelerating hardware startup validation.",
            "Explain how prototyping mitigates both technical engineering risk and market adoption risk."
          ]
        }
      },
      {
        "id": "top-5-10",
        "topicNumber": "5.10",
        "title": "Minimum Viable Product (MVP)",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The version of a new product which allows a team to collect the maximum amount of validated customer learning with the least effort and investment.",
          "detailedExplanation": "Coined by Frank Robinson and popularized by Eric Ries in \"The Lean Startup\", an MVP is NOT a buggy, half-finished product; it is a functional product containing ONLY the core features necessary to solve the primary problem for early adopters. It tests fundamental business hypotheses (Value hypothesis and Growth hypothesis) and guides iterative pivoting.",
          "importantPoints": [
            "Core goal: Maximize validated learning per dollar spent while minimizing development waste.",
            "Types of MVPs: Wizard of Oz (manual backend masquerading as automated), Concierge (hands-on manual service), Landing Page/Smoke test, Single-Feature MVP.",
            "Avoids feature bloat and building products nobody wants.",
            "The Build-Measure-Learn Feedback Loop drives the iterative evolution from MVP to scale."
          ],
          "simpleRealWorldExample": "Dropbox founder Drew Houston created a simple 3-minute demo video demonstrating file syncing as an MVP, generating 75,000 beta signups overnight before writing complex cloud infrastructure code.",
          "examOrientedPoints": [
            "Define Minimum Viable Product (MVP) according to Eric Ries' Lean Startup framework.",
            "Explain 3 common types of MVPs (Landing page, Wizard of Oz, Concierge MVP).",
            "Differentiate between a Prototype and an MVP."
          ],
          "possibleExamQuestions": [
            "Define Minimum Viable Product (MVP). Explain its role in the Lean Startup methodology with real-world examples.",
            "Differentiate between a Proof of Concept (PoC), a Prototype, and a Minimum Viable Product (MVP).",
            "Explain the \"Wizard of Oz\" and \"Concierge\" MVP techniques and how they help founders test market hypotheses without code."
          ]
        }
      },
      {
        "id": "top-5-11",
        "topicNumber": "5.11",
        "title": "Self-learning: The Art of the Start 2.0 by Guy Kawasaki",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "A definitive operational handbook for entrepreneurs covering venture conception, launching, pitching, bootstrapping, positioning, and evangelism.",
          "detailedExplanation": "In \"The Art of the Start 2.0\", Silicon Valley veteran Guy Kawasaki outlines foundational startup principles: \"Make Meaning\" (create products that improve the world rather than just making money), \"Make Mantra\" (a 3-4 word rallying cry instead of long mission statements), \"MATT\" (Milestones, Assumptions, Tasks, Targets), the 10/20/30 Pitching Rule, and Building a \"Soul\" in your company culture.",
          "importantPoints": [
            "Make Meaning: Solve a real pain point, right a wrong, or prevent the end of something good.",
            "Make Mantra: Short 3-word essence (e.g., Nike: \"Authentic athletic performance\", FedEx: \"Peace of mind\").",
            "The 10/20/30 Rule: 10 pitch slides, 20 minutes duration, 30pt minimum font.",
            "Bootstrapping philosophy: Conserve cash, focus on cash flow over paper profits, sweat equity."
          ],
          "simpleRealWorldExample": "Guy Kawasaki's concept of \"Mantra\": Wendy's mission statement is 50 words long, but its mantra is simply \"Healthy fast food\".",
          "examOrientedPoints": [
            "Explain Guy Kawasaki's concept of \"Make Meaning\" vs \"Make Money\".",
            "Difference between a Corporate Mission Statement and an Entrepreneurial Mantra.",
            "The MATT framework (Milestones, Assumptions, Tasks, Targets)."
          ],
          "possibleExamQuestions": [
            "Analyze the core principles of entrepreneurship outlined in Guy Kawasaki's \"The Art of the Start 2.0\".",
            "Explain the concept of an organizational \"Mantra\" and why it is superior to traditional lengthy mission statements for startups.",
            "Discuss Guy Kawasaki's bootstrapping strategies and how early-stage ventures survive without external venture capital."
          ]
        }
      }
    ]
  },
  {
    "id": "unit-6",
    "moduleNumber": 6,
    "title": "Unit VI – Digital Business Management",
    "hours": "6",
    "loMapping": "CO6",
    "isCompleted": false,
    "topics": [
      {
        "id": "top-6-1",
        "topicNumber": "6.1",
        "title": "Digital business models",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "Business models that leverage digital technologies, data, internet connectivity, and software algorithms to deliver unique customer value and capture revenue.",
          "detailedExplanation": "Digital business models possess near-zero marginal cost of distribution, global scalability, and rich real-time data feedback loops. Prominent digital architectures include: Subscription-as-a-Service (SaaS), On-Demand Aggregators, Peer-to-Peer (P2P) Marketplaces, Free-to-Play/In-app purchase models, and API-first platform businesses.",
          "importantPoints": [
            "Key traits: Near-zero marginal cost of digital replication, rapid scalability, network effects, real-time telemetry.",
            "Shift from asset-heavy ownership to asset-light access and shared economy.",
            "Data as a core asset: continuous optimization using predictive AI/ML algorithms.",
            "Disintermediation: Removing middlemen by connecting producers directly with end consumers."
          ],
          "simpleRealWorldExample": "Netflix transitioned from a physical DVD-by-mail business model to a digital streaming subscription platform, achieving global scale without physical disc logistics.",
          "examOrientedPoints": [
            "Key characteristics of Digital Business Models vs Traditional Brick-and-Mortar models.",
            "Explain the concept of \"Near-Zero Marginal Cost\" in software distribution.",
            "Role of network effects and disintermediation in digital businesses."
          ],
          "possibleExamQuestions": [
            "Define a Digital Business Model. Discuss how digital transformation has disrupted traditional asset-heavy industries.",
            "Explain the economic concepts of Near-Zero Marginal Cost and Network Effects in digital software enterprises.",
            "Classify and compare modern digital business models (SaaS, Marketplace, On-demand, API economy) with examples."
          ]
        }
      },
      {
        "id": "top-6-2",
        "topicNumber": "6.2",
        "title": "Subscription model",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "A recurring revenue model where customers pay a periodic recurring fee (monthly/annually) to maintain continuous access to a product or service.",
          "detailedExplanation": "The subscription model shifts business focus from one-off transactional sales to long-term recurring relationships (Annual Recurring Revenue - ARR and Monthly Recurring Revenue - MRR). It provides predictable cash flow, higher enterprise valuations, and deep ongoing customer engagement, but requires continuous product updates and proactive churn management.",
          "importantPoints": [
            "Key Metrics: MRR (Monthly Recurring Revenue), ARR (Annual Recurring Revenue), Churn Rate, LTV, CAC.",
            "Benefits: Predictable cash flows, higher customer lifetime value, lower barrier to initial customer adoption.",
            "Challenges: Churn management (voluntary and involuntary credit card failure), ongoing server/support costs.",
            "Tiers: Usage-based, Flat-rate, Per-user/seat pricing, Tiered feature pricing."
          ],
          "simpleRealWorldExample": "Microsoft Office transitioned from one-off $300 boxed CD-ROM purchases to Microsoft 365 at ₹489/month recurring subscription, creating stable recurring revenue.",
          "examOrientedPoints": [
            "Explain MRR (Monthly Recurring Revenue) and ARR (Annual Recurring Revenue).",
            "Define Churn Rate and explain strategies to reduce customer churn.",
            "Compare perpetual licensing with software subscription models."
          ],
          "possibleExamQuestions": [
            "Explain the working and economic advantages of the Subscription Business Model for cloud software ventures.",
            "Define Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), and Churn Rate with mathematical formulas.",
            "Why have traditional software companies migrated from perpetual one-time licenses to cloud-based subscription models?"
          ]
        }
      },
      {
        "id": "top-6-3",
        "topicNumber": "6.3",
        "title": "Freemium model",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "A pricing strategy where basic features are provided free of charge to all users, while advanced/premium functionality requires a paid subscription.",
          "detailedExplanation": "The Freemium model combines \"Free\" and \"Premium\". The free tier serves as a powerful zero-cost customer acquisition engine, creating massive top-of-funnel adoption. The business monetizes by converting a small percentage (typically 2% to 5%) of active free users into paying premium subscribers who desire advanced analytics, extra storage, or team collaboration features.",
          "importantPoints": [
            "Structure: 95-98% free users (viral acquisition) supported by 2-5% paying power users (revenue drivers).",
            "Value Gateways: Feature gating (advanced tools), Capacity gating (storage limits), Support gating (priority support).",
            "Danger: If free tier is too generous, conversion rate collapses; if too restrictive, viral adoption stalls.",
            "Zero marginal cost per user is mandatory for freemium sustainability."
          ],
          "simpleRealWorldExample": "Spotify allows free listening with audio advertisements and shuffle mode, while charging Premium subscribers for ad-free listening, offline downloads, and high-fidelity audio.",
          "examOrientedPoints": [
            "Define the Freemium business model and typical conversion rate benchmarks (2-5%).",
            "Explain the different value gating mechanisms (feature, usage/capacity, support gating).",
            "Key risks of Freemium model: Server cost overruns without sufficient conversion."
          ],
          "possibleExamQuestions": [
            "What is the Freemium Business Model? Explain how tech startups balance free features and premium paywalls to maximize conversion.",
            "Discuss the key metrics for a freemium platform including Free-to-Paid Conversion Rate and Cost of Serving Free Users.",
            "Analyze the success of Spotify, GitHub, or Canva using the Freemium monetization framework."
          ]
        }
      },
      {
        "id": "top-6-4",
        "topicNumber": "6.4",
        "title": "Digital marketing",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The promotion of products, brands, and services through digital channels such as search engines, social media, email, and mobile apps.",
          "detailedExplanation": "Unlike traditional broadcast advertising (TV, billboards, print), digital marketing offers granular audience targeting, real-time performance tracking, bidirectional customer interaction, and precise Return on Ad Spend (ROAS) calculation. Key channels include Organic Search (SEO), Paid Search (SEM/PPC), Social Media, Content Marketing, and Email Automation.",
          "importantPoints": [
            "Core metrics: Impressions, Clicks, Click-Through Rate (CTR), Cost Per Click (CPC), Conversion Rate (CVR), ROAS.",
            "Inbound Marketing (pulling customers with valuable content) vs Outbound Marketing (pushing ads).",
            "Marketing Funnel: TOFU (Top of Funnel - Awareness) -> MOFU (Consideration) -> BOFU (Conversion).",
            "A/B Testing: Comparing two ad/landing page variants to optimize conversion performance."
          ],
          "simpleRealWorldExample": "An engineering ed-tech startup running targeted LinkedIn video ads for 4th-semester engineering students, tracking exact cost per lead and webinar signup conversions.",
          "examOrientedPoints": [
            "Differentiate between Inbound and Outbound digital marketing.",
            "Explain the Digital Marketing Funnel (TOFU, MOFU, BOFU).",
            "Define key digital metrics: CTR, CPC, CPA, ROAS."
          ],
          "possibleExamQuestions": [
            "Explain the scope and components of Digital Marketing. How does digital marketing provide superior ROI compared to traditional advertising?",
            "Describe the digital marketing sales funnel (Awareness, Consideration, Decision) and strategies deployed at each stage.",
            "Define the following digital marketing metrics with formulas: Click-Through Rate (CTR), Cost Per Acquisition (CPA), and Return on Ad Spend (ROAS)."
          ]
        }
      },
      {
        "id": "top-6-5",
        "topicNumber": "6.5",
        "title": "Search Engine Optimization (SEO)",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The process of optimizing website content, technical architecture, and authority to improve organic (unpaid) ranking on search engine results pages (SERPs).",
          "detailedExplanation": "SEO drives high-intent organic web traffic. The three pillars of SEO are: 1. On-Page SEO (keyword research, high-quality content, title tags, meta descriptions, header hierarchy, internal linking), 2. Off-Page SEO (building high-authority backlinks, brand mentions), and 3. Technical SEO (page load speed, mobile responsiveness, XML sitemaps, SSL encryption, Core Web Vitals).",
          "importantPoints": [
            "On-Page SEO: Strategic keyword placement, search intent matching, structured data, schema markup.",
            "Off-Page SEO: Domain Authority (DA), natural backlink acquisition, guest publishing.",
            "Technical SEO: Fast site speed, mobile-first indexing, crawlability, HTTPS security.",
            "Provides compounding long-term traffic without ongoing pay-per-click ad expenditures."
          ],
          "simpleRealWorldExample": "An electronics component distributor ranking #1 on Google for \"embedded microcontroller boards Mumbai\" by publishing comprehensive technical datasheets and tutorials.",
          "examOrientedPoints": [
            "Explain the 3 pillars of SEO: On-Page, Off-Page, and Technical SEO.",
            "Role of Backlinks and Domain Authority in search rankings.",
            "Difference between Organic Search (SEO) and Paid Search (SEM)."
          ],
          "possibleExamQuestions": [
            "Define Search Engine Optimization (SEO). Detail the techniques involved in On-Page and Off-Page SEO.",
            "Explain the technical SEO factors (Core Web Vitals, mobile responsiveness, sitemaps) that influence search engine rankings.",
            "Compare the long-term cost, sustainability, and conversion efficacy of SEO versus paid SEM advertising."
          ]
        }
      },
      {
        "id": "top-6-6",
        "topicNumber": "6.6",
        "title": "Search Engine Marketing (SEM)",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The practice of marketing a business using paid advertisements that appear on search engine results pages (SERPs) based on targeted search queries.",
          "detailedExplanation": "SEM primarily operates on a Pay-Per-Click (PPC) model through platforms like Google Ads. Advertisers bid on specific commercial keywords in real-time auctions. Ad positioning on the search page is determined by Ad Rank, which is a function of Maximum Bid Amount and Quality Score (ad relevance, landing page experience, and expected CTR).",
          "importantPoints": [
            "PPC (Pay-Per-Click): Advertisers only pay when a user actually clicks their search ad.",
            "Ad Rank formula: Ad Rank = Maximum CPC Bid * Quality Score * Ad Extensions Impact.",
            "Quality Score components: Expected Click-Through Rate, Ad Relevance, Landing Page Experience.",
            "Provides instantaneous traffic and lead generation, ideal for testing new product demand."
          ],
          "simpleRealWorldExample": "A cloud hosting startup bidding on Google Ads for the keyword \"deploy React Native backend server\", paying ₹45 per click to drive engineers to its signup page.",
          "examOrientedPoints": [
            "Explain the Pay-Per-Click (PPC) advertising model.",
            "Write and explain the Google Ad Rank and Quality Score formulas.",
            "Differentiate between SEO and SEM in a comparative matrix."
          ],
          "possibleExamQuestions": [
            "Define Search Engine Marketing (SEM). Explain how the Pay-Per-Click (PPC) auction model functions in Google Ads.",
            "What is Quality Score in SEM? Discuss the factors that determine ad placement rank and cost per click.",
            "Compare SEO and SEM on parameters of cost, implementation speed, traffic longevity, and trust."
          ]
        }
      },
      {
        "id": "top-6-7",
        "topicNumber": "6.7",
        "title": "Social media marketing",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The use of social media platforms (LinkedIn, Instagram, YouTube, X/Twitter) to build a brand, engage communities, drive website traffic, and generate sales.",
          "detailedExplanation": "Social Media Marketing (SMM) encompasses both Organic Social (community building, viral content creation, thought leadership, customer support) and Paid Social Ads (hyper-targeted advertising leveraging demographic and interest graph data). Different platforms serve distinct audiences: LinkedIn for B2B engineering and enterprise sales; Instagram/YouTube for D2C consumer products.",
          "importantPoints": [
            "B2B Social Marketing: LinkedIn thought leadership, technical whitepapers, case study carousels.",
            "B2C/D2C Social Marketing: Instagram reels, visual storytelling, user-generated content (UGC).",
            "Engagement metrics: Reach, Impressions, Shares, Comments, Save rate, Viral coefficient.",
            "Social Listening: Monitoring brand sentiment and customer grievances in real-time."
          ],
          "simpleRealWorldExample": "Canva utilizing design tutorials and short-form tips on Instagram and LinkedIn to organically onboard millions of non-technical design users.",
          "examOrientedPoints": [
            "Differentiate between B2B and B2C social media marketing strategies.",
            "Key social engagement metrics and the Viral Coefficient.",
            "Role of Social Listening and online brand reputation management."
          ],
          "possibleExamQuestions": [
            "Discuss the strategies and execution of Social Media Marketing (SMM) for a B2B engineering technology startup.",
            "Compare the utility and audience dynamics of LinkedIn, Instagram, and YouTube for commercial marketing.",
            "Explain how startups leverage user-generated content (UGC) and viral loops to reduce customer acquisition costs."
          ]
        }
      },
      {
        "id": "top-6-8",
        "topicNumber": "6.8",
        "title": "Influencer marketing",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "A form of social media marketing involving endorsements and product placements from individuals who possess dedicated social followings and niche authority.",
          "detailedExplanation": "Influencer marketing leverages the trust and authenticity that content creators have built with their audiences. Influencers are categorized by follower tier: Nano (1k-10k followers, high engagement), Micro (10k-100k, niche domain authority), Macro (100k-1M), and Mega/Celebrity (1M+ followers). In tech and engineering, technical micro-influencers (coding YouTubers, tech podcasters) deliver high conversion rates due to deep credibility.",
          "importantPoints": [
            "Tiers: Nano-influencers (1k-10k), Micro-influencers (10k-100k), Macro (100k-1M), Mega/Celebrity (1M+).",
            "Benefits: High trust factor, authentic product demonstrations, bypassed ad-blockers, niche demographic alignment.",
            "Compensation models: Free product gifting, Fixed fee per post/video, Affiliate commission per sale.",
            "Regulatory compliance: Mandatory disclosure tags (#Ad, #Sponsored) as per ASCI (Advertising Standards Council of India) guidelines."
          ],
          "simpleRealWorldExample": "Tech YouTuber Marques Brownlee (MKBHD) or engineering coding channels demonstrating a new developer IDE or developer gadget, resulting in instant pre-orders.",
          "examOrientedPoints": [
            "Classification of Influencer tiers (Nano, Micro, Macro, Mega).",
            "Why Micro-influencers often deliver higher ROI than celebrity endorsements.",
            "ASCI disclosure regulations for sponsored influencer content in India."
          ],
          "possibleExamQuestions": [
            "What is Influencer Marketing? Explain the different tiers of influencers and their respective strategic advantages.",
            "Why do technology and engineering startups prefer partnering with niche micro-influencers over celebrity brand ambassadors?",
            "Discuss the metrics used to measure the success of an influencer marketing campaign (Engagement rate, Affiliate sales, Brand lift)."
          ]
        }
      },
      {
        "id": "top-6-9",
        "topicNumber": "6.9",
        "title": "Disruption in digital business",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The process whereby a smaller company with fewer resources successfully challenges established incumbent businesses by introducing simpler, cheaper, or more accessible digital alternatives.",
          "detailedExplanation": "Formulated by Harvard Professor Clayton Christensen (Theory of Disruptive Innovation), disruption occurs when incumbents focus on sustaining innovations for their most profitable, demanding customers, overshooting the needs of the mainstream market. Disruptive entrants enter at the bottom of the market with a low-cost or highly accessible digital solution, rapidly iterate, and eventually capture the mainstream market, displacing legacy giants.",
          "importantPoints": [
            "Disruptive Innovation (Clayton Christensen) vs Sustaining Innovation.",
            "Low-End Disruption: Serving over-served customers with a cheaper, simpler product.",
            "New-Market Disruption: Creating a market where none existed by turning non-consumers into consumers.",
            "Examples of Displaced Incumbents: Kodak (digital photography), Blockbuster (streaming), Nokia (smartphones)."
          ],
          "simpleRealWorldExample": "Netflix disrupting Blockbuster video rental stores by eliminating late fees and physical stores through postal DVD and subsequent online streaming.",
          "examOrientedPoints": [
            "Explain Clayton Christensen's Theory of Disruptive Innovation.",
            "Differentiate between Disruptive Innovation and Sustaining Innovation.",
            "Analyze the failure of Kodak or Blockbuster in responding to digital disruption."
          ],
          "possibleExamQuestions": [
            "Explain Clayton Christensen's Theory of Disruptive Innovation. How do digital startups unseat entrenched industry incumbents?",
            "Compare Disruptive Innovation with Sustaining Innovation using appropriate technology sector case studies.",
            "Analyze why legacy market leaders like Kodak or Nokia failed to adapt to disruptive digital transitions."
          ]
        }
      },
      {
        "id": "top-6-10",
        "topicNumber": "6.10",
        "title": "Innovation in digital business",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "The intentional application of novel ideas, technologies, and digital workflows to create improved customer value, new revenue streams, and operational efficiencies.",
          "detailedExplanation": "Digital innovation extends beyond new product features into Business Model Innovation (e.g., Uber without cars), Process Innovation (e.g., automated CI/CD software pipelines, RPA), Channel Innovation (e.g., direct livestream shopping), and Ecosystem Innovation (e.g., Apple iOS app store economy). It leverages AI, IoT, Cloud, and Blockchain to reinvent how value is generated.",
          "importantPoints": [
            "4 Types of Innovation: Incremental (small improvements), Architectural, Radical, and Disruptive.",
            "Ten Types of Innovation (Doblin framework): Profit Model, Network, Structure, Process, Product Performance, Product System, Service, Channel, Brand, Customer Engagement.",
            "Agile and DevOps methodologies accelerate the pace of digital experimentation.",
            "Continuous digital innovation prevents enterprise stagnation."
          ],
          "simpleRealWorldExample": "Amazon combining cloud infrastructure (AWS), logistics algorithms, automated robotics fulfillment centers, and Prime membership to continuously innovate across multiple digital layers.",
          "examOrientedPoints": [
            "Classification of Innovation: Incremental, Architectural, Radical, Disruptive.",
            "Doblin's 10 Types of Innovation framework.",
            "Role of Continuous Experimentation and Agile methods in digital business."
          ],
          "possibleExamQuestions": [
            "Discuss the various dimensions of Innovation in digital businesses beyond mere product feature upgrades.",
            "Explain Doblin's Ten Types of Innovation framework and how tech companies innovate across Configuration, Offering, and Experience.",
            "Differentiate between Incremental Innovation and Radical/Breakthrough Innovation with industry examples."
          ]
        }
      },
      {
        "id": "top-6-11",
        "topicNumber": "6.11",
        "title": "Self-learning: Airbnb case study",
        "isCompleted": false,
        "notes": {
          "simpleDefinition": "Analysis of how Airbnb disrupted the global hospitality industry through an asset-light digital marketplace model, peer-to-peer trust architecture, and rapid iterative design.",
          "detailedExplanation": "Founded in 2008 by Brian Chesky, Joe Gebbia, and Nathan Blecharczyk, Airbnb began by renting air mattresses in their living room to conference attendees. The founders overcame severe chicken-and-egg marketplace dynamics through creative growth hacking (Craigslist cross-posting), professional photography of listings to boost booking trust, two-sided review systems, and secure escrow payments, building a multi-billion dollar platform without owning real estate.",
          "importantPoints": [
            "Asset-Light Platform Model: Largest accommodation provider in the world without owning any real estate properties.",
            "Two-Sided Network Effects: More hosts attract more travelers; more travelers incentivize more hosts to list properties.",
            "Trust Architecture: Verified guest/host profiles, bidirectional reviews, $1M host guarantee insurance, secure digital escrow payments.",
            "Growth Hacking: Craigslist integration, high-resolution photography initiative to solve low conversion rates."
          ],
          "simpleRealWorldExample": "Airbnb founders personally visited New York hosts with a rented camera to take professional photos of listings, which doubled weekly revenues and proved that \"doing things that don't scale\" is vital in early startup validation.",
          "examOrientedPoints": [
            "Key elements of Airbnb's Two-Sided Marketplace Business Model.",
            "How Airbnb built digital trust in a peer-to-peer sharing economy.",
            "Paul Graham's startup advice: \"Do things that don't scale\" in Airbnb's growth."
          ],
          "possibleExamQuestions": [
            "Analyze the Airbnb case study. Explain how its asset-light platform model disrupted traditional hotel chains worldwide.",
            "Discuss the trust architecture (reviews, escrow, host insurance) implemented by Airbnb to overcome safety concerns in peer-to-peer accommodation.",
            "What growth hacking techniques and early validation experiments did the Airbnb founders use to solve the two-sided marketplace cold-start problem?"
          ]
        }
      }
    ]
  }
]
};



export const mockSubjects: Subject[] = [
  {
    id: 'bmd-2994511',
    name: 'Business Model Development',
    code: '2994511',
    semester: 'Semester IV',
    credits: 2,
    progress: 68,
    totalModules: 6,
    completedModules: 4,
    icon: '💼',
    professor: 'Dept. of EXTC / Management Studies',
    nextTopic: 'Unit V: Minimum Viable Product (MVP) & Prototyping',
  },
];

export const mockChapterQuizzes: Record<string, ChapterQuiz> = {
  'bmd-2994511': {
    id: 'quiz-bmd-master',
    chapterId: 'bmd-2994511',
    chapterTitle: 'Business Model Development Comprehensive University Mock Quiz',
    subjectTitle: 'Business Model Development (2994511)',
    questions: [
      {
        id: 'q1',
        question: 'What is the statutory validity duration of a granted Patent under the Indian Patents Act, 1970?',
        options: [
          '10 years from filing',
          '20 years from filing date',
          'Lifetime of the inventor + 60 years',
          '50 years non-renewable'
        ],
        correctAnswer: 1,
        explanation: 'Under the Indian Patents Act 1970, a patent is granted for a term of 20 years from the date of filing the application, subject to payment of statutory renewal fees.'
      },
      {
        id: 'q2',
        question: 'According to the revised 2020 MSME classification criteria in India, what defines a "Micro Enterprise"?',
        options: [
          'Investment <= ₹10 Cr and Turnover <= ₹50 Cr',
          'Investment <= ₹1 Cr and Turnover <= ₹5 Cr',
          'Investment <= ₹50 Lakhs and Turnover <= ₹2 Cr',
          'Investment <= ₹5 Cr and Turnover <= ₹25 Cr'
        ],
        correctAnswer: 1,
        explanation: 'Under the revised composite 2020 MSME criteria, a Micro Enterprise has Investment in Plant & Machinery <= ₹1 Crore AND Annual Turnover <= ₹5 Crore.'
      },
      {
        id: 'q3',
        question: 'In the Lean Startup methodology by Eric Ries, what is the primary purpose of a Minimum Viable Product (MVP)?',
        options: [
          'To generate maximum profit on the first product launch',
          'To maximize validated customer learning with the least effort and investment',
          'To file a complete patent application before competitors copy it',
          'To build every possible advanced feature before showing users'
        ],
        correctAnswer: 1,
        explanation: 'An MVP is designed to test core business and value hypotheses with early adopters to maximize validated learning with minimum development expenditure.'
      },
      {
        id: 'q4',
        question: 'What term defines angel investors or venture capitalists providing early-stage capital in exchange for equity shares?',
        options: [
          'Commercial bank term loan',
          'Equity financing / Seed capital',
          'Public bond issue',
          'Government debt debenture'
        ],
        correctAnswer: 1,
        explanation: 'Angel investors and VCs provide risk equity capital in exchange for equity ownership stakes (such as CCPS or common stock) rather than charging debt interest.'
      },
      {
        id: 'q5',
        question: 'In Search Engine Marketing (SEM), how is Google Ad Rank primarily determined during real-time auctions?',
        options: [
          'Solely by the highest monetary bid',
          'Maximum CPC Bid multiplied by Quality Score',
          'Total age of the company website',
          'Number of followers on company social media pages'
        ],
        correctAnswer: 1,
        explanation: 'Ad Rank in Google Ads auction is determined by multiplying the Maximum CPC Bid by the Quality Score (ad relevance, expected CTR, and landing page experience).'
      }
    ]
  },
  'daily-bmd-quiz': {
    id: 'daily-bmd-quiz',
    chapterId: 'bmd-2994511',
    chapterTitle: 'Daily Entrepreneurship & Business Model Challenge',
    subjectTitle: 'Business Model Development (2994511)',
    questions: [
      {
        id: 'dq1',
        question: 'Which of the following is NOT patentable under Section 3 of the Indian Patents Act, 1970?',
        options: [
          'A novel pharmaceutical molecule with therapeutic efficacy',
          'A new mechanical robotic actuator design',
          'A mathematical method or computer program per se / algorithm',
          'An innovative solar cell semiconductor composition'
        ],
        correctAnswer: 2,
        explanation: 'Section 3(k) of the Indian Patents Act explicitly states that mathematical methods, business methods, or computer programs per se / algorithms are not patentable.'
      },
      {
        id: 'dq2',
        question: 'What does the "Freemium" business model rely on for economic sustainability?',
        options: [
          'Charging 100% of users a monthly fee',
          'Offering basic features free to attract large user base while monetizing 2-5% power users on premium tier',
          'Selling user hardware at high profit margins',
          'Relying entirely on government subsidies without revenue'
        ],
        correctAnswer: 1,
        explanation: 'Freemium leverages a free tier for viral zero-marginal-cost customer acquisition and converts a top 2-5% fraction into paying premium subscribers.'
      },
      {
        id: 'dq3',
        question: 'What is the Break-Even Point (BEP) in startup unit economics?',
        options: [
          'The point where total revenue equals total costs (zero profit, zero loss)',
          'The day a company goes public on the stock exchange (IPO)',
          'The valuation when raising Series A funding',
          'The point where variable costs exceed fixed costs'
        ],
        correctAnswer: 0,
        explanation: 'Break-Even Point (BEP) is the sales volume where Total Revenue exactly equals Total Costs (Fixed Costs + Variable Costs), resulting in net zero operational loss.'
      },
      {
        id: 'dq4',
        question: 'What is Guy Kawasaki\'s 10/20/30 rule of startup pitching?',
        options: [
          '10 team members, 20 prototypes, 30 days to launch',
          '10 slides, 20 minutes presentation duration, 30-point minimum font size',
          '10 angel investors, $20k funding, 30% equity',
          '10 customer interviews, 20 test sales, 30 days refund'
        ],
        correctAnswer: 1,
        explanation: 'Guy Kawasaki\'s 10/20/30 rule recommends that an investor pitch deck should have no more than 10 slides, last no longer than 20 minutes, and use at least 30-point font.'
      },
      {
        id: 'dq5',
        question: 'Which component of the Business Model Canvas defines the delivery and communication channels to reach customer segments?',
        options: [
          'Key Resources',
          'Channels',
          'Cost Structure',
          'Revenue Streams'
        ],
        correctAnswer: 1,
        explanation: 'The Channels building block describes how a company communicates with and reaches its Customer Segments to deliver its Value Proposition across 5 phases.'
      }
    ]
  }
};

export const mockDailyQuiz: DailyQuiz = {
  id: 'daily-bmd-quiz',
  title: 'Daily Business Model & Startup Quiz',
  subject: 'Business Model Development',
  subjectCode: '2994511',
  questionCount: 5,
  durationMinutes: 6,
  xpReward: 100,
  difficulty: 'Medium',
  topics: ['IPR & Patents', 'MSME 2020 Definition', 'Freemium Models', 'MVP & Pitching'],
};

export const mockStudent: StudentProfile = {
  id: 'stud-extc-042',
  name: 'Alex Sharma',
  rollNo: '22EXTC042',
  semester: 'Semester IV',
  department: 'EXTC Engineering',
  totalXp: 1950,
  streakDays: 7,
  quizzesTaken: 19,
  doubtsResolved: 38,
  studyHoursThisWeek: 19.5,
  semesterProgress: 68,
};

export const mockProgressSummary: ProgressSummary = {
  overallPercentage: 68,
  completedTopicsCount: 33,
  totalTopicsCount: 49,
  weeklyCompletedHours: 19.5,
  weeklyTargetHours: 20.0,
  accuracyRate: 94,
  streakCount: 7,
};

export const mockDoubtSolver: DoubtSolverPreview = {
  recentDoubts: [
    {
      id: 'd-1',
      question: 'What is the difference between an Angel Investor and a Venture Capitalist?',
      subject: 'Business Model Development (2994511)',
      status: 'Resolved',
      timeAgo: '15 mins ago',
    },
    {
      id: 'd-2',
      question: 'Explain the 3 statutory patentability criteria under Indian Patent Law.',
      subject: 'Business Model Development (2994511)',
      status: 'Resolved',
      timeAgo: '2 hours ago',
    },
    {
      id: 'd-3',
      question: 'What is a Minimum Viable Product (MVP) and how does it prevent startup failure?',
      subject: 'Business Model Development (2994511)',
      status: 'Resolved',
      timeAgo: 'Yesterday',
    },
  ],
};
