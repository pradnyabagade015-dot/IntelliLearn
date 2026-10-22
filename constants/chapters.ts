export interface TopicNotes {
  simpleDefinition: string;
  detailedExplanation: string;
  importantPoints: string[];
  simpleRealWorldExample: string;
  examOrientedPoints: string[];
  possibleExamQuestions: string[];
  diagram?: string;
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
  email?: string;
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
            "simpleDefinition": "Entrepreneurship is the process of identifying market opportunities, assembling resources, taking calculated risks, and building a new enterprise to create value and earn profit.",
            "detailedExplanation": "An entrepreneur identifies an unsolved problem and turns an innovative idea into a commercial venture. Instead of taking a regular job, they coordinate capital, labor, and technology to launch a scalable business. They manage risks strategically to deliver new products or services to customers.",
            "importantPoints": [
              "Focuses on innovation, risk management, and commercial value creation.",
              "Bridges technical engineering knowledge with real market demand.",
              "Provides autonomy and wealth generation compared to traditional employment.",
              "Reinvests earnings to achieve long-term venture growth."
            ],
            "simpleRealWorldExample": "Bhavish Aggarwal and Ankit Bhati identified erratic cab services in India and founded Ola Cabs.",
            "examOrientedPoints": [
              "Remember Joseph Schumpeter's concept of 'Creative Destruction', where innovative startups replace outdated legacy businesses."
            ],
            "possibleExamQuestions": [
              "Define entrepreneurship and explain its core characteristics with an example."
            ]
          }
        },
        {
          "id": "top-1-2",
          "topicNumber": "1.2",
          "title": "Role of entrepreneurship in economic development",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "The contribution of new businesses toward generating national wealth, creating employment, building infrastructure, and accelerating economic growth.",
            "detailedExplanation": "Entrepreneurs stimulate the economy by investing capital and producing valuable goods and services. They generate direct and indirect jobs for engineers, skilled labor, and service workers. By establishing businesses in tier-2 and tier-3 cities, they promote balanced regional development and drive national exports.",
            "importantPoints": [
              "Creates mass employment opportunities across technical and non-technical fields.",
              "Mobilizes public and private savings into productive capital formation.",
              "Reduces regional disparities through industrial expansion beyond metro cities.",
              "Increases national GDP and promotes export earnings."
            ],
            "simpleRealWorldExample": "The rise of IT and tech startups in Bengaluru transformed the city into an economic hub, creating millions of direct and indirect jobs.",
            "examOrientedPoints": [
              "Highlight the multiplier effect of startups on employment generation, export growth, and balanced regional development."
            ],
            "possibleExamQuestions": [
              "Explain the role of entrepreneurship in driving the economic development of India."
            ]
          }
        },
        {
          "id": "top-1-3",
          "topicNumber": "1.3",
          "title": "Entrepreneurial process",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "The step-by-step journey of discovering an opportunity, creating a solution, gathering resources, and launching and scaling a business.",
            "detailedExplanation": "The process begins with recognizing a real customer pain point through environmental scanning. Founders then conduct market feasibility studies and prepare a viable business plan. Finally, they acquire capital, assemble a team, launch operations, and focus on sustainable scaling.",
            "importantPoints": [
              "Phase 1: Opportunity identification and environmental scanning.",
              "Phase 2: Feasibility study and business plan preparation.",
              "Phase 3: Resource mobilization (capital, technology, and team).",
              "Phase 4: Commercial venture launch, management, and growth."
            ],
            "simpleRealWorldExample": "Zomato started by scanning physical restaurant menus, built a digital discovery website, raised funding, and scaled into food delivery.",
            "examOrientedPoints": [
              "Draw the 4-phase sequential flowchart (Opportunity Discovery -> Feasibility & Plan -> Resourcing -> Launch & Growth) for full marks."
            ],
            "possibleExamQuestions": [
              "Describe the key stages involved in the entrepreneurial process with a diagram."
            ]
          }
        },
        {
          "id": "top-1-4",
          "topicNumber": "1.4",
          "title": "Women entrepreneurs",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "Women or groups of women who initiate, organize, and operate an enterprise while holding at least 51 percent financial equity.",
            "detailedExplanation": "Women entrepreneurs bring diverse leadership, innovation, and social impact to industrial sectors. Specialized initiatives offer collateral-free loans, training, and incubation support to boost female venture creation. Overcoming access-to-capital challenges empowers women financially and strengthens the national workforce.",
            "importantPoints": [
              "Officially defined in India as an enterprise with minimum 51% female equity and management.",
              "Key government support includes Stand-Up India, Mudra Yojana, and TREAD schemes.",
              "Common hurdles include credit access barriers, restricted mobility, and social biases.",
              "Significantly improves family welfare, community education, and gender equality."
            ],
            "simpleRealWorldExample": "Falguni Nayar founded Nykaa, building a multi-billion dollar omnichannel beauty and wellness marketplace in India.",
            "examOrientedPoints": [
              "State the official 51% female ownership criteria and name government schemes like Stand-Up India and Mudra Yojana."
            ],
            "possibleExamQuestions": [
              "Discuss the challenges faced by women entrepreneurs in India and state supportive government schemes."
            ]
          }
        },
        {
          "id": "top-1-5",
          "topicNumber": "1.5",
          "title": "Corporate entrepreneurship",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "Also known as intrapreneurship, it refers to developing new business ventures, products, or innovations within an established corporation.",
            "detailedExplanation": "Large organizations encourage intrapreneurship to stay competitive and prevent disruption from agile startups. Employees act like entrepreneurs, building new products using the company's existing capital, brand, and distribution network. This allows mature firms to innovate without risking their core business stability.",
            "importantPoints": [
              "Employees innovate internally without risking their personal wealth.",
              "Protects mature corporations against technological obsolescence.",
              "Leverages the parent company's existing R&D, distribution, and funding.",
              "Requires a supportive corporate culture that rewards creative risk-taking."
            ],
            "simpleRealWorldExample": "3M allowed engineers to spend 15% of their work hours on passion projects, which led to the creation of Post-it Notes.",
            "examOrientedPoints": [
              "Clearly differentiate between an Entrepreneur (bears personal financial risk) and an Intrapreneur (operates within a corporate framework)."
            ],
            "possibleExamQuestions": [
              "Define intrapreneurship and compare the traits of an entrepreneur with an intrapreneur."
            ]
          }
        },
        {
          "id": "top-1-6",
          "topicNumber": "1.6",
          "title": "Entrepreneurial mindset",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "A way of thinking characterized by resilience, opportunity alertness, calculated risk tolerance, and a proactive drive to solve problems.",
            "detailedExplanation": "An entrepreneurial mindset helps founders navigate market uncertainty and bounce back from setbacks. It relies on an internal locus of control—the belief that personal effort shapes outcomes rather than luck. Founders view failures as learning opportunities and continuously adapt to customer feedback.",
            "importantPoints": [
              "Opportunity alertness: Actively spotting unmet customer needs in daily life.",
              "Growth mindset: Treating failure as constructive feedback rather than defeat.",
              "Calculated risk: Assessing potential downside while pursuing strategic rewards.",
              "Internal locus of control: Taking personal responsibility for business results."
            ],
            "simpleRealWorldExample": "Thomas Edison tested thousands of filament materials before inventing the incandescent light bulb, viewing each failure as learning.",
            "examOrientedPoints": [
              "Highlight the distinction between Fixed Mindset vs Growth Mindset and Internal vs External Locus of Control."
            ],
            "possibleExamQuestions": [
              "What is an entrepreneurial mindset? Explain the key psychological traits of successful founders."
            ]
          }
        },
        {
          "id": "top-1-7",
          "topicNumber": "1.7",
          "title": "Self-learning: Case studies of Henry Ford and The Tatas",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "Benchmark historical studies demonstrating mass manufacturing efficiency, assembly-line scale, and nation-building ethical entrepreneurship.",
            "detailedExplanation": "Henry Ford transformed manufacturing by introducing the moving assembly line, making cars affordable for the general public. Jamsetji Tata pioneered core industries in India, establishing steel, power, and educational institutions with ethical values. Both case studies showcase how visionary leadership creates enduring economic and societal value.",
            "importantPoints": [
              "Henry Ford: Pioneered the moving assembly line and standardized mass production (Model T).",
              "Jamsetji Tata: Founded foundational national industries including Tata Steel and hydroelectric power.",
              "Ford emphasized process innovation, lower unit costs, and high worker wages.",
              "The Tatas established ethical capitalism, employee welfare, and industrial self-reliance."
            ],
            "simpleRealWorldExample": "Ford's Model T assembly line reduced production time from 12 hours to 93 minutes per vehicle, democratizing car ownership.",
            "examOrientedPoints": [
              "Cite Henry Ford for 'Assembly-Line Process Innovation' and the Tata Group for 'Ethical Nation-Building Entrepreneurship'."
            ],
            "possibleExamQuestions": [
              "Analyze the entrepreneurial contributions of Henry Ford and Jamsetji Tata to modern industrial management."
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
            "simpleDefinition": "The legal structures available for establishing and running a business, defining liability, taxation, and management rights.",
            "detailedExplanation": "Selecting an ownership format dictates owner liability, compliance obligations, and capital-raising options. Structures range from sole proprietorships to corporate entities and cooperatives. Founders choose a structure based on scale, investment plans, and personal risk preference.",
            "importantPoints": [
              "Primary structures: Sole Proprietorship, Partnership, LLP, Private Limited, and Public Limited.",
              "Determines personal financial liability (unlimited vs limited liability).",
              "Defines regulatory compliance under the Companies Act 2013.",
              "Affects ability to raise equity funding from outside investors."
            ],
            "simpleRealWorldExample": "A local retail shop operates as a Sole Proprietorship, while an expanding tech startup registers as a Private Limited company.",
            "examOrientedPoints": [
              "Compare ownership forms based on: Liability, Registration requirement, Tax status, and Capital raising ability."
            ],
            "possibleExamQuestions": [
              "Classify and compare the major forms of business ownership with their pros and cons."
            ]
          }
        },
        {
          "id": "top-2-2",
          "topicNumber": "2.2",
          "title": "Proprietorship",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "An unincorporated business owned, managed, and controlled by a single individual with no legal distinction between owner and firm.",
            "detailedExplanation": "Sole proprietorship is the simplest business structure to establish, requiring minimal legal formalities. The proprietor retains all profits and maintains total control over daily decisions. However, the owner faces unlimited liability, meaning personal assets can be used to pay off business debts.",
            "importantPoints": [
              "Simplest and least expensive business structure to start and close.",
              "Complete operational privacy and immediate decision-making authority.",
              "Unlimited personal liability for all commercial debts and legal obligations.",
              "No perpetual succession: Ends upon the owner's death or permanent disability."
            ],
            "simpleRealWorldExample": "A neighborhood medical dispensary or freelance software consultancy run entirely by one individual.",
            "examOrientedPoints": [
              "Emphasize 'Unlimited Personal Liability' and 'Lack of Perpetual Succession' as the primary structural limitations."
            ],
            "possibleExamQuestions": [
              "Discuss the merits and limitations of a Sole Proprietorship form of business organization."
            ]
          }
        },
        {
          "id": "top-2-3",
          "topicNumber": "2.3",
          "title": "Public companies",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "A corporate entity whose shares can be freely bought and sold by the general public on recognized stock exchanges.",
            "detailedExplanation": "Public limited companies raise substantial capital by offering shares, bonds, and debentures to retail and institutional investors. They require at least 7 shareholders and 3 directors, with no limit on maximum members. Because public money is involved, they follow strict disclosure and auditing norms governed by SEBI.",
            "importantPoints": [
              "Requires minimum 7 members, 3 directors, and no upper limit on shareholders.",
              "Shares are freely transferable on stock exchanges like NSE and BSE.",
              "Strict compliance requirements, including mandatory quarterly financial disclosures.",
              "Provides limited liability and perpetual legal succession for all shareholders."
            ],
            "simpleRealWorldExample": "Tata Consultancy Services (TCS) and Infosys trading shares publicly on the stock exchange.",
            "examOrientedPoints": [
              "State statutory requirements: Minimum 7 members, 3 directors, mandatory public filings, and name ending with 'Limited'."
            ],
            "possibleExamQuestions": [
              "Explain the characteristics, advantages, and statutory compliance requirements of a Public Limited Company."
            ]
          }
        },
        {
          "id": "top-2-4",
          "topicNumber": "2.4",
          "title": "Private companies",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "A closely held corporate entity that restricts share transfers to the public and caps its total membership at 200 persons.",
            "detailedExplanation": "Private limited companies offer limited liability protection and corporate legal status while keeping ownership confidential. They require a minimum of 2 members and 2 directors, and their name ends in 'Private Limited'. Because they cannot solicit public deposits, they are the preferred structure for venture capital and angel funding.",
            "importantPoints": [
              "Requires minimum 2 members and maximum 200 members (excluding employees).",
              "Prohibited from publicly advertising or selling shares on open stock exchanges.",
              "Limited liability shields founders' personal assets from company losses.",
              "The standard legal structure mandated by venture capital and angel investors."
            ],
            "simpleRealWorldExample": "Swiggy and Zepto operated as Private Limited entities while raising venture funding before going public.",
            "examOrientedPoints": [
              "Tabulate Private Ltd vs Public Ltd: Member limits (2-200 vs 7-unlimited), Share transferability, and Prospectus issuance."
            ],
            "possibleExamQuestions": [
              "Differentiate between a Private Limited Company and a Public Limited Company under the Companies Act 2013."
            ]
          }
        },
        {
          "id": "top-2-5",
          "topicNumber": "2.5",
          "title": "Co-operative businesses",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "A voluntary association of individuals joined together on the basis of equality and mutual aid to promote common economic interests.",
            "detailedExplanation": "Cooperatives operate on democratic governance under the rule of 'one member, one vote', regardless of capital invested. They eliminate commercial middlemen, buying directly from producers and passing profits back to members as dividends. Registered under the Cooperative Societies Act, they primarily serve dairy, agriculture, and credit sectors.",
            "importantPoints": [
              "Democratic management: 'One member, one vote' regardless of capital contribution.",
              "Primary objective is mutual welfare and service rather than aggressive profit.",
              "Eliminates intermediaries to deliver fair prices to both producers and consumers.",
              "Separate legal identity and perpetual succession upon official registration."
            ],
            "simpleRealWorldExample": "Amul (GCMMF), uniting 3.6 million dairy farmers across Gujarat with shared profits and democratic voting.",
            "examOrientedPoints": [
              "Remember the core democratic principle: 'One Member, One Vote' (not one share one vote) and service motive over profit exploitation."
            ],
            "possibleExamQuestions": [
              "Explain the cooperative form of business organization and highlight the success model of Amul in India."
            ]
          }
        },
        {
          "id": "top-2-6",
          "topicNumber": "2.6",
          "title": "Micro, Small and Medium Enterprises (MSME)",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "Enterprises classified under India's MSMED Act based on composite criteria of capital investment in plant/machinery and annual turnover.",
            "detailedExplanation": "MSMEs form the backbone of Indian manufacturing and commerce, generating roughly 30% of national GDP. In 2020, the government introduced revised composite criteria removing the barrier between manufacturing and service units. Entrepreneurs register online via the Udyam portal to access low-interest loans, tax relief, and subsidies.",
            "importantPoints": [
              "Micro: Investment up to ₹1 Crore and Turnover up to ₹5 Crore.",
              "Small: Investment up to ₹10 Crore and Turnover up to ₹50 Crore.",
              "Medium: Investment up to ₹50 Crore and Turnover up to ₹250 Crore.",
              "Composite criteria: Both investment and turnover thresholds must be satisfied."
            ],
            "simpleRealWorldExample": "A Pune-based precision electronics PCB assembly unit with ₹4 Crore machinery investment and ₹18 Crore annual sales classified as a Small Enterprise.",
            "examOrientedPoints": [
              "Memorize the 2020 composite thresholds in a table: Micro (1/5 Cr), Small (10/50 Cr), and Medium (50/250 Cr)."
            ],
            "possibleExamQuestions": [
              "State the revised 2020 composite definition and classification criteria for Micro, Small, and Medium Enterprises in India."
            ]
          }
        },
        {
          "id": "top-2-7",
          "topicNumber": "2.7",
          "title": "Definition and role of MSMEs in economic development",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "The strategic contribution of the MSME sector toward employment generation, regional industrialization, innovation, and national export earnings.",
            "detailedExplanation": "MSMEs provide extensive employment opportunities with lower capital investment per worker compared to large corporations. They serve as specialized ancillary suppliers, manufacturing components for automotive, defense, and electronics giants. By operating across semi-urban and rural regions, they support balanced industrial growth and curb migration.",
            "importantPoints": [
              "Employs over 110 million people across rural and semi-urban India.",
              "Accounts for nearly 45% of total Indian manufacturing exports.",
              "Acts as specialized ancillary component suppliers for large engineering corporations.",
              "Encourages grassroots innovation with lower startup capital requirements."
            ],
            "simpleRealWorldExample": "Auto-component MSME clusters in Rajkot and Aurangabad supplying precision gears and castings to major automotive manufacturers.",
            "examOrientedPoints": [
              "State key macroeconomic statistics: ~30% of Indian GDP, ~45% of total exports, and second-largest employer after agriculture."
            ],
            "possibleExamQuestions": [
              "Discuss the socio-economic significance and challenges faced by MSMEs in the Indian economy."
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
            "simpleDefinition": "The financial structure that outlines all operating expenses alongside predictable income streams to achieve business profitability.",
            "detailedExplanation": "A cost model categorizes fixed overheads (rent, salaries) and variable costs (raw materials, cloud usage). The revenue model explains how the startup monetizes value through direct sales, subscriptions, or commissions. Calculating the Break-Even Point (BEP) determines the minimum sales volume required to cover all costs.",
            "importantPoints": [
              "Fixed costs remain constant regardless of production; variable costs scale with sales volume.",
              "Contribution Margin = Selling Price per unit minus Variable Cost per unit.",
              "Break-Even Point (Units) = Total Fixed Costs / Contribution Margin per unit.",
              "Positive unit economics (LTV > 3x CAC) are required for sustainable venture scaling."
            ],
            "simpleRealWorldExample": "A hardware startup selling an IoT device for ₹2,000 (variable cost ₹1,200) with monthly fixed overhead of ₹40,000 breaks even at 50 units monthly.",
            "examOrientedPoints": [
              "State the Break-Even Point formula: BEP = Fixed Costs / (Price - Variable Cost) and define Contribution Margin."
            ],
            "possibleExamQuestions": [
              "Explain cost and revenue models in startup financing. Define Break-Even Analysis with a suitable formula and diagram."
            ]
          }
        },
        {
          "id": "top-3-2",
          "topicNumber": "3.2",
          "title": "Angel investors",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "High-net-worth individuals who invest personal wealth into early-stage startups in exchange for equity ownership or convertible debt.",
            "detailedExplanation": "Angel investors fund ventures at the idea or prototype stage when traditional commercial banks and venture capital firms view risk as too high. Individual checks typically range from ₹15 Lakhs to ₹2 Crores, often pooled via angel syndicates. In addition to capital, angels provide valuable industry connections, strategic guidance, and mentoring.",
            "importantPoints": [
              "Invests personal wealth at pre-seed and seed stages of startup development.",
              "Accepts high early-stage risk in pursuit of substantial equity returns.",
              "Provides smart capital: Mentorship, industry network access, and governance.",
              "Angel syndicates pool small capital tickets from multiple investors into one term sheet."
            ],
            "simpleRealWorldExample": "Ratan Tata investing personal angel funds into early-stage Indian tech startups like Paytm, Ola, and Urban Company.",
            "examOrientedPoints": [
              "Differentiate between Angel Investors (personal funds, seed/prototype stage) and Venture Capitalists (institutional pooled funds, Series A+ stage)."
            ],
            "possibleExamQuestions": [
              "Who is an angel investor? Explain the role of angel networks in supporting early-stage technology startups."
            ]
          }
        },
        {
          "id": "top-3-3",
          "topicNumber": "3.3",
          "title": "Venture capitalists",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "Professional investment firms that pool institutional funds to invest in high-growth, scalable startups in exchange for significant equity.",
            "detailedExplanation": "Venture capital (VC) firms manage funds raised from institutional limited partners (pension funds, endowments, corporations). They invest in Series A, B, and C rounds for companies with proven product-market fit seeking rapid expansion. VCs target 10x to 100x returns, realizing profits through startup acquisitions or initial public offerings (IPOs).",
            "importantPoints": [
              "Deploys institutional pooled capital rather than personal funds.",
              "Focuses on Series A and growth rounds for ventures with demonstrated traction.",
              "Takes board of directors seats to guide strategy, governance, and executive hiring.",
              "Exits investments via Initial Public Offerings (IPOs) or strategic acquisitions."
            ],
            "simpleRealWorldExample": "Peak XV Partners (formerly Sequoia India) investing growth rounds in companies like Swiggy, Zomato, and CRED.",
            "examOrientedPoints": [
              "Memorize standard VC Term Sheet terms: Pre-money vs Post-money Valuation, Liquidation Preference, and Anti-dilution rights."
            ],
            "possibleExamQuestions": [
              "Explain the venture capital investment cycle from deal sourcing to exit strategy."
            ]
          }
        },
        {
          "id": "top-3-4",
          "topicNumber": "3.4",
          "title": "Crowdfunding",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "Raising small amounts of funding from a large number of people, typically via online platforms and digital campaigns.",
            "detailedExplanation": "Crowdfunding democratizes fundraising by pitching directly to the public rather than pitching traditional financial gatekeepers. It serves both as a financing method and as a market validation tool to prove consumer demand before production starts. Campaigns operate under reward, equity, donation, or debt lending models.",
            "importantPoints": [
              "4 Primary Models: Reward-based (Kickstarter), Equity-based, Donation-based (Ketto), and Debt/P2P lending.",
              "Validates consumer demand and secures pre-orders before commercial manufacturing.",
              "Builds an organic community of early brand advocates and loyal customers.",
              "Requires engaging video pitches, transparent project milestones, and digital marketing."
            ],
            "simpleRealWorldExample": "Oculus Rift raising $2.4 million from 9,500 individual backers on Kickstarter to build its virtual reality developer headsets.",
            "examOrientedPoints": [
              "Classify and describe the 4 models of crowdfunding: Reward, Equity, Donation, and Debt/P2P Lending."
            ],
            "possibleExamQuestions": [
              "Define crowdfunding. Discuss its four major models and explain how it aids startup market validation."
            ]
          }
        },
        {
          "id": "top-3-5",
          "topicNumber": "3.5",
          "title": "Government schemes for start-up funding",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "Public financial grants, subsidized loans, and incubation incentives designed by the government to support innovative startups.",
            "detailedExplanation": "Government initiatives de-risk innovative ventures by offering non-dilutive seed grants, low-interest loans, and tax holidays. In India, programs like Startup India, SISFS, and Mudra Yojana support entrepreneurs from prototype testing to market commercialization. These schemes lower capital barriers for engineering founders and foster indigenous technology development.",
            "importantPoints": [
              "Startup India Seed Fund Scheme (SISFS): Financial grants up to ₹50 Lakhs for prototype validation.",
              "Credit Guarantee Scheme for Startups (CGSS): Provides collateral-free bank loans.",
              "Pradhan Mantri Mudra Yojana: Shishu (up to ₹50k), Kishore (up to ₹5L), and Tarun (up to ₹10L).",
              "Section 80-IAC: Offers a 3-year consecutive income tax holiday for eligible registered startups."
            ],
            "simpleRealWorldExample": "An engineering hardware startup receiving a ₹30 Lakh prototype development grant under SISFS through an approved university incubator.",
            "examOrientedPoints": [
              "Cite specific Indian schemes: SISFS (seed grant), Mudra Yojana (collateral-free credit), and Section 80-IAC (tax exemption)."
            ],
            "possibleExamQuestions": [
              "Describe the major government schemes and financial assistance programs available for Indian tech startups."
            ]
          }
        },
        {
          "id": "top-3-6",
          "topicNumber": "3.6",
          "title": "Self-learning: Successful business pitching",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "A concise, structured presentation delivered to prospective investors to secure early-stage seed or venture capital funding.",
            "detailedExplanation": "A pitch deck communicates the problem, solution, market size, business model, and competitive advantage within 10 to 12 slides. Founders must clearly show early customer traction, unit economics, and team execution ability. It concludes with a clear 'Ask' stating the exact funding amount needed and planned milestone allocations.",
            "importantPoints": [
              "Follows Guy Kawasaki's 10/20/30 Rule: 10 slides, 20 minutes, 30-point minimum font size.",
              "Key slides: Problem, Solution, Market Size (TAM/SAM/SOM), Business Model, Traction, Team, and The Ask.",
              "Communicates unit economics, customer acquisition cost, and revenue growth clearly.",
              "Outlines fund utilization milestones over a 12 to 18-month operating runway."
            ],
            "simpleRealWorldExample": "Airbnb's original 10-slide seed deck that highlighted hotel pricing friction, market volume, and a clear 10% commission business model.",
            "examOrientedPoints": [
              "Explain Guy Kawasaki's 10/20/30 Pitch Rule and list the mandatory slides of an investor pitch deck."
            ],
            "possibleExamQuestions": [
              "Outline the essential components of an investor pitch deck and explain Guy Kawasaki's 10/20/30 rule."
            ]
          }
        }
      ]
    },
    {
      "id": "unit-4",
      "moduleNumber": 4,
      "title": "Unit IV – Intellectual Property Rights",
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
            "simpleDefinition": "Legal monopoly rights granted over human intellectual creations, preventing unauthorized copying and commercial exploitation by others.",
            "detailedExplanation": "IPR protects inventors by granting exclusive commercial rights for a set duration in exchange for public disclosure of the creation. It turns intangible innovations into tangible business assets that can be licensed, assigned, or sold. The major categories include Patents, Trademarks, Copyrights, Industrial Designs, and Trade Secrets.",
            "importantPoints": [
              "Protects intangible human intellectual creations and technological innovations.",
              "Creates competitive legal moats and protects proprietary pricing power.",
              "Governed internationally by WIPO and TRIPS, and domestically by Indian statutory acts.",
              "Can be monetized through licensing agreements, royalty contracts, or venture sales."
            ],
            "simpleRealWorldExample": "Qualcomm generating billions in recurring global licensing royalties from its cellular telecommunications patents.",
            "examOrientedPoints": [
              "List and define the 5 primary forms of IPR: Patents (inventions), Trademarks (brand identity), Copyrights (expressions), Designs (appearance), and Trade Secrets."
            ],
            "possibleExamQuestions": [
              "What are Intellectual Property Rights? Explain their strategic importance for technology startups."
            ]
          }
        },
        {
          "id": "top-4-2",
          "topicNumber": "4.2",
          "title": "Patents",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "An exclusive statutory monopoly granted by the government for an invention for 20 years, excluding others from making, using, or selling it.",
            "detailedExplanation": "Under the Indian Patents Act 1970, a patent is granted in exchange for full technical disclosure of an invention. To qualify, an invention must satisfy three criteria: Novelty, Inventive Step (non-obviousness), and Industrial Applicability. Section 3 excludes abstract mathematical algorithms, business methods, and software per se from patentability.",
            "importantPoints": [
              "Statutory protection term is strictly 20 years from the official filing date.",
              "3 Mandatory Criteria: Novelty (global prior art), Inventive Step (non-obvious), and Utility.",
              "Territorial right: Enforceable only within countries where patent applications are granted.",
              "Section 3 of Indian Patents Act bars software per se, mathematical formulas, and scientific discoveries."
            ],
            "simpleRealWorldExample": "ARM patenting energy-efficient RISC processor architectures licensed globally to smartphone chipmakers.",
            "examOrientedPoints": [
              "Name the 3 statutory criteria (Novelty, Inventive Step, Industrial Applicability) and state the 20-year non-extendable patent term."
            ],
            "possibleExamQuestions": [
              "State the criteria for patentability under the Indian Patents Act 1970 and discuss non-patentable subject matter under Section 3."
            ]
          }
        },
        {
          "id": "top-4-3",
          "topicNumber": "4.3",
          "title": "Trademarks",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "A distinctive visual sign, logo, brand name, word, or slogan that uniquely identifies and distinguishes one firm's goods from competitors.",
            "detailedExplanation": "Trademarks protect consumer goodwill, brand identity, and commercial trust under the Trade Marks Act 1999. Unlike patents, trademarks can be renewed indefinitely every 10 years upon paying statutory renewal fees. The ™ symbol indicates an unregistered common law claim, whereas the ® symbol confirms an officially registered trademark.",
            "importantPoints": [
              "Protects brand names, logos, slogans, distinctive shapes, and visual packaging.",
              "Can be renewed indefinitely every 10 years upon payment of renewal fees.",
              "Prevents customer confusion, market counterfeiting, and brand dilution.",
              "Provides legal remedies: Infringement lawsuits for registered marks; Passing Off for unregistered marks."
            ],
            "simpleRealWorldExample": "Apple's bitten apple logo, Nike's 'Swoosh' symbol, and the tagline 'Just Do It' protected against unauthorized commercial copycats.",
            "examOrientedPoints": [
              "Distinguish between the ™ symbol (unregistered claim) and ® symbol (officially registered) and note indefinite 10-year renewal."
            ],
            "possibleExamQuestions": [
              "Define a trademark. Differentiate between trademark infringement and passing off under the Trade Marks Act 1999."
            ]
          }
        },
        {
          "id": "top-4-4",
          "topicNumber": "4.4",
          "title": "Copyrights",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "An exclusive legal right granted to creators of original literary, dramatic, musical, artistic works, and computer software code.",
            "detailedExplanation": "Governed by the Indian Copyright Act 1957, copyright protects the expression of an idea, not the idea itself (the Idea-Expression Dichotomy). In India, protection lasts for the author's lifetime plus 60 calendar years after death. The Fair Use doctrine permits limited unauthorized copying for non-profit educational, research, and review purposes.",
            "importantPoints": [
              "Protects the original expression of ideas, not the underlying idea itself.",
              "Computer software source code and documentation are protected as Literary Works.",
              "Protection duration in India: Lifetime of the author plus 60 calendar years.",
              "Fair Use doctrine permits limited educational, research, and critique usage without infringement."
            ],
            "simpleRealWorldExample": "Microsoft holding copyright protection over the source code, user manuals, and visual interface of Windows OS and Office software.",
            "examOrientedPoints": [
              "Remember: 'Idea-Expression Dichotomy', term of 'Lifetime + 60 Years', and software source code protected as a 'Literary Work'."
            ],
            "possibleExamQuestions": [
              "Explain the scope of copyright protection under Indian law. What is meant by the Idea-Expression dichotomy and Fair Use?"
            ]
          }
        },
        {
          "id": "top-4-5",
          "topicNumber": "4.5",
          "title": "Patent search and analysis",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "The systematic search of global patent databases and prior art to confirm novelty and avoid patent infringement prior to manufacturing.",
            "detailedExplanation": "Conducting patent searches prevents expensive infringement lawsuits and verifies that a technical invention is genuinely novel before investing R&D capital. A Freedom-to-Operate (FTO) search confirms that manufacturing and selling the product will not infringe active third-party patents. Common databases include Google Patents, USPTO, Espacenet, and India's InPASS.",
            "importantPoints": [
              "Freedom-to-Operate (FTO) Search: Ensures commercialization won't violate active competitor patents.",
              "Patentability Search: Verifies an invention is unique against published global prior art.",
              "Invalidity Search: Conducted to find prior art that invalidates a competitor's patent claims.",
              "Major global databases: InPASS (India), Espacenet (EPO), USPTO (USA), and Google Patents."
            ],
            "simpleRealWorldExample": "An EV battery startup conducting an InPASS and USPTO search on fast-charging thermal management before building production tooling.",
            "examOrientedPoints": [
              "Define 'Freedom-to-Operate (FTO) Search' and explain how it prevents costly patent infringement litigation."
            ],
            "possibleExamQuestions": [
              "What is a Freedom to Operate (FTO) search? Explain the methodology and significance of patent search before product launch."
            ]
          }
        },
        {
          "id": "top-4-6",
          "topicNumber": "4.6",
          "title": "Strategies for IPR protection",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "A strategic roadmap for identifying, registering, commercializing, and legally defending intellectual property assets to protect market advantage.",
            "detailedExplanation": "A comprehensive IP strategy aligns patent, trademark, and trade secret filings with product release schedules. Startups use provisional patent filings to lock in an early priority date while refining their commercial prototypes over 12 months. Enforcing non-disclosure agreements (NDAs) and confidentiality policies safeguards trade secrets before market launch.",
            "importantPoints": [
              "Provisional patent filing secures an early priority date with a 12-month window for complete specifications.",
              "Combine patents for core hardware with trade secrets for proprietary manufacturing recipes.",
              "Enforce strict confidentiality with Non-Disclosure Agreements (NDAs) for all employees and partners.",
              "Utilize the Patent Cooperation Treaty (PCT) framework for streamlined international filings."
            ],
            "simpleRealWorldExample": "Coca-Cola protecting its beverage formula as a permanent Trade Secret rather than patenting it and revealing the ingredients for a 20-year limit.",
            "examOrientedPoints": [
              "Contrast Patent Strategy (20-year public monopoly) with Trade Secret Strategy (indefinite secrecy with zero public disclosure)."
            ],
            "possibleExamQuestions": [
              "Discuss the key strategies a tech startup should adopt for protecting its intellectual property portfolio."
            ]
          }
        },
        {
          "id": "top-4-7",
          "topicNumber": "4.7",
          "title": "Ethics in technology and innovation",
          "isCompleted": true,
          "notes": {
            "simpleDefinition": "The moral principles and social guidelines governing the responsible development, deployment, and commercialization of new technologies.",
            "detailedExplanation": "Engineering ethics requires balancing commercial profit with public safety, consumer privacy, algorithmic fairness, and ecological sustainability. Responsible innovation opposes patent trolling—holding patents purely to extract legal settlements without building real products. Founders must respect user consent, protect personal data, and adopt green manufacturing practices.",
            "importantPoints": [
              "Respect consumer data privacy, informed consent, and robust cybersecurity standards.",
              "Avoid patent trolling (abusive litigation without manufacturing genuine products).",
              "Prevent algorithmic bias and discriminatory AI outputs in software solutions.",
              "Ensure environmental lifecycle sustainability and safe electronic waste disposal."
            ],
            "simpleRealWorldExample": "The Volkswagen emissions scandal ('Dieselgate'), where software manipulated emissions testing, resulting in billions in fines and loss of trust.",
            "examOrientedPoints": [
              "Discuss 'Patent Trolling' and 'Consumer Data Privacy Violations' as key ethical challenges in modern technology entrepreneurship."
            ],
            "possibleExamQuestions": [
              "Explain the ethical issues and corporate responsibilities associated with modern technological innovations and AI deployment."
            ]
          }
        }
      ]
    },
    {
      "id": "unit-5",
      "moduleNumber": 5,
      "title": "Unit V – Business Model Development",
      "hours": "8",
      "loMapping": "CO5",
      "isCompleted": false,
      "topics": [
        {
          "id": "top-5-1",
          "topicNumber": "5.1",
          "title": "Types of business models",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The fundamental frameworks an enterprise uses to create, deliver, and capture economic value from its customers.",
            "detailedExplanation": "A business model defines how a business operates profitably by coordinating customer segments, distribution channels, and revenue mechanics. Common types include Direct Sales, Marketplaces, Subscriptions, Freemium, and Razor-and-Blade models. Founders test these models to ensure recurring, predictable cash flows.",
            "importantPoints": [
              "Marketplace/Platform: Connects buyers and sellers without holding inventory (Uber, Airbnb).",
              "Razor-and-Blade: Sells the core product at low cost and charges high margins on consumables.",
              "Direct-to-Consumer (D2C): Sells directly online, bypassing wholesale and retail intermediaries.",
              "Software-as-a-Service (SaaS): Delivers hosted cloud software access via recurring periodic fees."
            ],
            "simpleRealWorldExample": "HP selling printers at or below cost while making high recurring margins on proprietary replacement ink cartridges.",
            "examOrientedPoints": [
              "Identify and illustrate at least 4 classic business models: Marketplace, D2C, Subscription, and Razor-and-Blade."
            ],
            "possibleExamQuestions": [
              "What is a business model? Compare the Platform business model with the traditional Direct Sales model."
            ]
          }
        },
        {
          "id": "top-5-2",
          "topicNumber": "5.2",
          "title": "Value proposition",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The bundle of products, services, and benefits that solves customer pain points or delivers compelling gains over competitor solutions.",
            "detailedExplanation": "A value proposition clearly explains why a customer should purchase from your enterprise over competitors. Using Osterwalder's Value Proposition Canvas, it maps customer jobs, pains, and gains to specific pain relievers and gain creators. Achieving Problem-Solution Fit ensures the offering directly addresses verified customer needs.",
            "importantPoints": [
              "Directly addresses verified customer friction points and essential jobs-to-be-done.",
              "Differentiates the venture through better performance, lower cost, design, or convenience.",
              "Must be clearly communicated, testable, and verified through customer feedback.",
              "Forms the central anchor block connecting both halves of the Business Model Canvas."
            ],
            "simpleRealWorldExample": "Uber's value proposition: 'Tap a button, get a ride—reliable urban transportation with upfront pricing and cashless payments.'",
            "examOrientedPoints": [
              "Draw the Value Proposition Canvas (Customer Profile circle vs Value Map square) to demonstrate Problem-Solution Fit."
            ],
            "possibleExamQuestions": [
              "Define Value Proposition. Explain how to design a compelling value proposition using Osterwalder's Value Proposition Canvas."
            ]
          }
        },
        {
          "id": "top-5-3",
          "topicNumber": "5.3",
          "title": "Customer segments",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The distinct, homogenous groups of people or organizations an enterprise aims to serve based on shared needs and behaviors.",
            "detailedExplanation": "Segmenting customers prevents building a generic product that pleases no one, saving valuable marketing capital. Segments are divided into Mass Market, Niche Market, Segmented, Diversified, or Multi-Sided Platforms. Startups focus on an initial 'Beachhead Market' to achieve dominance before expanding.",
            "importantPoints": [
              "Mass Market: Broad customer base with similar general needs (e.g., consumer electronics).",
              "Niche Market: Specialized technical needs (e.g., aerospace avionics components).",
              "Multi-Sided Platform: Interdependent customer groups (e.g., drivers and passengers in Uber).",
              "Beachhead Strategy: Winning a narrow, focused initial segment before expanding outward."
            ],
            "simpleRealWorldExample": "Tesla initially targeted high-income sports car enthusiasts with the Roadster before expanding into mass-market sedans like the Model 3.",
            "examOrientedPoints": [
              "Define 'Multi-Sided Market' (e.g., buyers and sellers) and 'Beachhead Market' in university answers."
            ],
            "possibleExamQuestions": [
              "Explain the different types of customer segments in the Business Model Canvas with relevant industry examples."
            ]
          }
        },
        {
          "id": "top-5-4",
          "topicNumber": "5.4",
          "title": "Customer relationships",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The specific types of interaction and engagement an enterprise establishes and maintains with each customer segment.",
            "detailedExplanation": "Customer relationships support three commercial stages: Customer Acquisition, Customer Retention, and Upselling (growing revenue per user). Relationships range from high-touch personal assistance to automated digital self-service and user communities. Retaining existing customers is typically 5 to 7 times less expensive than acquiring new ones.",
            "importantPoints": [
              "3 Primary Goals: Customer Acquisition (get), Customer Retention (keep), and Upselling (grow).",
              "Personal Assistance: Dedicated relationship managers handling individual accounts.",
              "Automated Self-Service: Low-touch digital portals managing transactions end-to-end.",
              "Co-creation: Engaging users in reviews, feedback, and collaborative content creation."
            ],
            "simpleRealWorldExample": "Amazon combining automated online self-service ordering with Prime membership loyalty perks to maximize customer retention.",
            "examOrientedPoints": [
              "Detail the Get-Keep-Grow customer lifecycle and contrast Automated Self-Service with Dedicated Personal Assistance."
            ],
            "possibleExamQuestions": [
              "Discuss the various types of customer relationships in business modeling and explain the Get-Keep-Grow framework."
            ]
          }
        },
        {
          "id": "top-5-5",
          "topicNumber": "5.5",
          "title": "Channels",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The communication, distribution, and sales touchpoints through which a company delivers its value proposition to customers.",
            "detailedExplanation": "Channels guide customers through 5 distinct phases: Awareness, Evaluation, Purchase, Delivery, and After-Sales Support. Companies combine direct channels (owned website, company stores) with indirect channels (wholesalers, third-party marketplaces). An effective channel mix lowers Customer Acquisition Cost (CAC) while ensuring fast customer delivery.",
            "importantPoints": [
              "5 Channel Phases: Awareness, Evaluation, Purchase, Delivery, and After-Sales.",
              "Direct Channels: Owned websites, apps, and flagship retail outlets (higher profit margins).",
              "Indirect Channels: Wholesalers, retail distributors, and e-commerce partners (wider market reach).",
              "Balances Customer Acquisition Cost (CAC) against speed and scale of distribution."
            ],
            "simpleRealWorldExample": "Apple utilizing Direct Channels (Apple Store, apple.com) alongside Indirect Channels (Amazon, authorized electronics retailers).",
            "examOrientedPoints": [
              "List and explain the 5 sequential channel phases: Awareness -> Evaluation -> Purchase -> Delivery -> After-Sales."
            ],
            "possibleExamQuestions": [
              "What are channels in the Business Model Canvas? Describe the five distinct channel phases with examples."
            ]
          }
        },
        {
          "id": "top-5-6",
          "topicNumber": "5.6",
          "title": "Key partners",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The network of suppliers, joint ventures, and strategic alliances that help make the business model operate successfully.",
            "detailedExplanation": "Enterprises form partnerships to optimize operations, achieve economies of scale, and acquire external technical capabilities. Strategic alliances lower venture risk and allow startups to focus resources on their core competencies. Types include non-competitor alliances, joint ventures, and buyer-supplier agreements.",
            "importantPoints": [
              "Strategic Alliances: Non-competitor collaborations to share technology and reach.",
              "Co-opetition: Strategic collaboration between direct competitors to build industry standards.",
              "Joint Ventures: Creating an independent entity to pursue a shared commercial opportunity.",
              "Buyer-Supplier Relationships: Long-term contracts securing reliable component supply chains."
            ],
            "simpleRealWorldExample": "Smartphone manufacturers partnering with Google for Android OS licenses and TSMC for advanced semiconductor chip fabrication.",
            "examOrientedPoints": [
              "Cite the 3 primary motives for partnerships: Optimization & economies of scale, Reduction of risk, and Acquisition of resources."
            ],
            "possibleExamQuestions": [
              "Why do businesses form key partnerships? Explain the four types of partnerships with examples."
            ]
          }
        },
        {
          "id": "top-5-7",
          "topicNumber": "5.7",
          "title": "Key activities",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The most important operational actions and processes a company must execute continuously to operate its business model.",
            "detailedExplanation": "Key activities represent the operational engine required to create value, maintain channels, and earn revenue. Depending on the business, activities are grouped into Production (manufacturing products), Problem Solving (custom engineering, consulting), or Platform/Network Management. Executing these activities effectively directly impacts customer satisfaction and profit margins.",
            "importantPoints": [
              "Production: Designing, manufacturing, and delivering physical products at commercial scale.",
              "Problem Solving: Delivering customized engineering, healthcare, or advisory solutions.",
              "Platform Management: Maintaining server uptime, recommendation algorithms, and data security.",
              "Directly determines the operational cost structure of the business model canvas."
            ],
            "simpleRealWorldExample": "Microsoft continuously developing, maintaining, and securing Azure cloud infrastructure as its primary platform key activity.",
            "examOrientedPoints": [
              "Classify key activities into: Production, Problem Solving, and Platform/Network Management."
            ],
            "possibleExamQuestions": [
              "Explain the Key Activities building block of the Business Model Canvas with relevant case studies."
            ]
          }
        },
        {
          "id": "top-5-8",
          "topicNumber": "5.8",
          "title": "Key resources",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The most critical physical, intellectual, human, and financial assets required to create value and operate the business model.",
            "detailedExplanation": "Key resources represent the vital assets an enterprise must own, lease, or acquire to deliver its value proposition. These include physical infrastructure (factories, servers), intellectual property (patents, proprietary code), talent (engineers, scientists), and financial assets (cash, credit lines). The choice of resources directly dictates early startup capital expenditure.",
            "importantPoints": [
              "Physical: Factories, retail buildings, server hardware, and logistics infrastructure.",
              "Intellectual: Patents, trademarks, proprietary datasets, and trade secrets.",
              "Human: Specialized software engineers, domain researchers, and sales personnel.",
              "Financial: Cash reserves, venture investment, and working capital credit facilities."
            ],
            "simpleRealWorldExample": "Google's key resources include proprietary search algorithms, global data center infrastructure, and top engineering talent.",
            "examOrientedPoints": [
              "State and describe the 4 categories of Key Resources: Physical, Intellectual, Human, and Financial."
            ],
            "possibleExamQuestions": [
              "Describe the four main categories of Key Resources in the Business Model Canvas."
            ]
          }
        },
        {
          "id": "top-5-9",
          "topicNumber": "5.9",
          "title": "Prototyping",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "Building an early, preliminary physical or digital mock-up of an invention to test feasibility, ergonomics, and functionality.",
            "detailedExplanation": "Prototyping transforms abstract ideas into tangible models that founders, engineers, and users can test. Iterating from low-fidelity mockups (paper wireframes, 3D foam) to high-fidelity working prototypes uncovers design and engineering flaws early. This iterative testing reduces overall development costs before committing to full manufacturing tooling.",
            "importantPoints": [
              "Low-Fidelity: Sketches and basic paper wireframes used for rapid concept alignment.",
              "High-Fidelity: Fully functional, 3D-printed or coded prototypes matching final product specs.",
              "Validates technical feasibility, ergonomics, and component integration.",
              "Prevents expensive manufacturing redesigns prior to full-scale commercial tooling."
            ],
            "simpleRealWorldExample": "James Dyson building 5,127 cardboard and plastic cyclone prototypes over five years before launching his bagless vacuum cleaner.",
            "examOrientedPoints": [
              "Differentiate between a Proof of Concept (feasibility check), Prototype (functional/design test), and MVP (commercial market validation)."
            ],
            "possibleExamQuestions": [
              "What is prototyping? Discuss its stages from low-fidelity to high-fidelity in product development."
            ]
          }
        },
        {
          "id": "top-5-10",
          "topicNumber": "5.10",
          "title": "Minimum Viable Product (MVP)",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The version of a new product that includes only the core features needed to deploy to early adopters and gather maximum validated customer learning.",
            "detailedExplanation": "Popularized by Eric Ries in 'The Lean Startup', an MVP avoids spending money on features customers do not want. It launches the iterative Build-Measure-Learn feedback loop using minimal time and capital. Real customer usage data then guides whether the startup should persevere with current features or execute a strategic pivot.",
            "importantPoints": [
              "Contains only essential core features needed to solve the user's primary problem.",
              "Initiates the Lean Startup Build-Measure-Learn feedback loop with real user data.",
              "Prevents wasting capital and engineering hours building unwanted features.",
              "Guides critical business decisions: Whether to persevere, iterate, or pivot."
            ],
            "simpleRealWorldExample": "Dropbox founder Drew Houston releasing a simple 3-minute screen recording video demonstrating file sync to validate demand before coding the backend.",
            "examOrientedPoints": [
              "Draw and explain the Lean Startup 'Build-Measure-Learn' cycle and define the commercial purpose of an MVP."
            ],
            "possibleExamQuestions": [
              "Define a Minimum Viable Product (MVP). How does it prevent startup failure during early validation?"
            ]
          }
        },
        {
          "id": "top-5-11",
          "topicNumber": "5.11",
          "title": "Self-learning: The Art of the Start 2.0 by Guy Kawasaki",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "A tactical startup guide providing practical methodologies for launching, pitching, bootstrapping, and scaling modern ventures.",
            "detailedExplanation": "Guy Kawasaki advises entrepreneurs to focus on 'making meaning'—solving real human problems—rather than just making money. He introduces the 10/20/30 pitch rule, advocates rapid market prototyping, and champions bootstrapping to conserve equity. The book offers a practical roadmap for transforming raw ideas into durable commercial enterprises.",
            "importantPoints": [
              "Focus on 'making meaning': Solve genuine customer problems and profitability will follow.",
              "The 10/20/30 Pitch Rule: 10 slides, 20 minutes, 30-point minimum font size.",
              "Bootstrapping philosophy: Conserve founder equity and prioritize early cash flow.",
              "Launch an MVP quickly to gather customer feedback rather than delaying for perfection."
            ],
            "simpleRealWorldExample": "Canva using simple, democratized graphic design tools and bootstrapping principles advocated by Guy Kawasaki to scale globally.",
            "examOrientedPoints": [
              "Memorize Guy Kawasaki's core tenets: 'Make Meaning', '10/20/30 Rule', and 'Bootstrapping discipline'."
            ],
            "possibleExamQuestions": [
              "Summarize the key entrepreneurial lessons and pitching strategies from Guy Kawasaki's 'The Art of the Start 2.0'."
            ]
          }
        }
      ]
    },
    {
      "id": "unit-6",
      "moduleNumber": 6,
      "title": "Unit VI – Digital Business Management",
      "hours": "8",
      "loMapping": "CO6",
      "isCompleted": false,
      "topics": [
        {
          "id": "top-6-1",
          "topicNumber": "6.1",
          "title": "Digital business models",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "Business models that leverage the internet, digital connectivity, and software infrastructure to create value, reach customers, and generate revenue.",
            "detailedExplanation": "Digital businesses operate with near-zero marginal distribution costs, enabling them to scale globally much faster than physical brick-and-mortar firms. They capture real-time user data to personalize customer experiences and improve product features. Major digital archetypes include Marketplaces, SaaS, E-commerce, and On-Demand aggregators.",
            "importantPoints": [
              "Near-zero marginal cost for distributing software and digital content to additional users.",
              "Strong network effects: The platform becomes more valuable as more users join.",
              "Global market reach and 24/7 automated transactional availability.",
              "Data-driven decision making and rapid algorithmic A/B testing."
            ],
            "simpleRealWorldExample": "Netflix transitioning from physical DVD mailings to global cloud streaming, radically lowering marginal distribution costs per viewer.",
            "examOrientedPoints": [
              "Explain 'Near-Zero Marginal Cost' and 'Network Effects' as the two primary scaling drivers of digital businesses."
            ],
            "possibleExamQuestions": [
              "What are digital business models? Explain their core characteristics and scaling advantages over traditional businesses."
            ]
          }
        },
        {
          "id": "top-6-2",
          "topicNumber": "6.2",
          "title": "Subscription model",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "A recurring monetization model where customers pay a periodic fee (monthly/annually) for continuous access to a product or service.",
            "detailedExplanation": "The subscription model converts one-time purchases into predictable, recurring cash flows. Key health metrics include Monthly Recurring Revenue (MRR), Annual Recurring Revenue (ARR), and Churn Rate. Retaining subscribers through regular software updates and customer support is vital for maximizing Customer Lifetime Value (LTV).",
            "importantPoints": [
              "Generates predictable and stable recurring revenue (MRR and ARR).",
              "Lowers initial adoption barriers by replacing large upfront purchases with small periodic fees.",
              "Churn Rate (percentage of subscribers who cancel) is the primary risk to profitability.",
              "Requires continuous product improvements and high cloud platform uptime."
            ],
            "simpleRealWorldExample": "Spotify and Microsoft 365 charging monthly subscriptions instead of selling boxed physical media licenses.",
            "examOrientedPoints": [
              "Define key SaaS subscription metrics: MRR (Monthly Recurring Revenue), ARR, Churn Rate, and LTV (Lifetime Value)."
            ],
            "possibleExamQuestions": [
              "Explain the Subscription Business Model. Discuss key performance indicators like MRR, ARR, and Churn Rate."
            ]
          }
        },
        {
          "id": "top-6-3",
          "topicNumber": "6.3",
          "title": "Freemium model",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "A pricing strategy where basic features are offered free of charge to all users, while advanced, premium capabilities require a paid subscription.",
            "detailedExplanation": "The free tier acts as a low-cost customer acquisition engine, driving rapid viral onboarding. The business sustains itself by converting a small fraction (typically 2% to 5%) of active free users into paying premium subscribers. Success requires near-zero marginal cost per free user to prevent excessive server and support expenses.",
            "importantPoints": [
              "Free tier drives rapid, low-friction organic customer acquisition.",
              "Conversion Rate: Typically 2% to 5% of active users upgrade to paid tiers.",
              "Gating strategies: Feature gating (advanced tools), capacity gating (storage), or ad removal.",
              "Mandatory requirement: Near-zero marginal serving cost per free user to prevent cash burn."
            ],
            "simpleRealWorldExample": "Canva offering free graphic design tools while charging for premium stock photos, brand kits, and background removal features.",
            "examOrientedPoints": [
              "Detail the 2-5% conversion rate benchmark and explain why near-zero marginal serving cost is necessary for freemium viability."
            ],
            "possibleExamQuestions": [
              "Define the Freemium business model. Discuss its conversion mechanics and gating strategies."
            ]
          }
        },
        {
          "id": "top-6-4",
          "topicNumber": "6.4",
          "title": "Digital marketing",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The promotion of brands, products, and services to targeted consumers using internet channels and digital technologies.",
            "detailedExplanation": "Unlike traditional mass media (print, TV, billboards), digital marketing allows precise audience targeting based on user intent and behavior. Marketers track real-time analytics to measure Return on Ad Spend (ROAS) and Cost Per Acquisition (CPA). Key components include Content Marketing, SEO, SEM, Email Marketing, and Social Media campaigns.",
            "importantPoints": [
              "Enables precise demographic, geographic, and behavioral audience targeting.",
              "Measurable real-time metrics: Impressions, Clicks, Conversions, CTR, and ROAS.",
              "Flexible budgeting with real-time bidding algorithms and performance optimization.",
              "Multi-channel approach combining organic search, paid advertising, and email."
            ],
            "simpleRealWorldExample": "Nike using targeted social media video ads and personalized running app recommendations to drive online footwear sales.",
            "examOrientedPoints": [
              "Compare Digital Marketing (precise targeting, measurable ROI, two-way interaction) with Traditional Marketing (broadcast reach, delayed feedback)."
            ],
            "possibleExamQuestions": [
              "Define digital marketing. Compare its advantages over traditional marketing methods."
            ]
          }
        },
        {
          "id": "top-6-5",
          "topicNumber": "6.5",
          "title": "Search Engine Optimization (SEO)",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The practice of optimizing website content, technical structure, and authority to achieve higher organic (unpaid) search engine rankings.",
            "detailedExplanation": "SEO generates long-term, zero-cost traffic by matching web pages to search engine ranking algorithms like Google's. It covers On-Page SEO (keywords, clear headings, meta tags), Off-Page SEO (backlinks and domain authority), and Technical SEO (mobile speed, HTTPS security, XML sitemaps). Unlike paid ads, organic rankings continue driving traffic long after content is published.",
            "importantPoints": [
              "On-Page SEO: Keyword optimization, title tags, internal linking, and readable content.",
              "Off-Page SEO: Building high-authority backlinks and credible brand citations.",
              "Technical SEO: Fast page load speed, mobile responsiveness, SSL security, and crawlability.",
              "Generates long-term, compounding organic traffic without ongoing pay-per-click fees."
            ],
            "simpleRealWorldExample": "An electronics component distributor ranking #1 on Google for 'STM32 microcontroller Mumbai' by publishing detailed technical datasheets.",
            "examOrientedPoints": [
              "List and explain the three pillars of SEO: On-Page SEO, Off-Page SEO, and Technical SEO."
            ],
            "possibleExamQuestions": [
              "What is Search Engine Optimization (SEO)? Explain the differences between On-Page, Off-Page, and Technical SEO."
            ]
          }
        },
        {
          "id": "top-6-6",
          "topicNumber": "6.6",
          "title": "Search Engine Marketing (SEM)",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "A paid digital advertising model where businesses pay search engines to display sponsored links prominently on search results pages.",
            "detailedExplanation": "SEM primarily operates on a Pay-Per-Click (PPC) auction model through platforms like Google Ads. When a user searches a targeted keyword, an instant auction evaluates bids and relevance to display sponsored ads. Ad positioning is determined by Ad Rank, calculated by multiplying Maximum CPC bid by Quality Score.",
            "importantPoints": [
              "Pay-Per-Click (PPC): Advertisers only pay when a user actually clicks on their ad.",
              "Ad Rank Formula: Ad Rank = Maximum CPC Bid * Quality Score.",
              "Quality Score factors: Expected Click-Through Rate (CTR), ad relevance, and landing page quality.",
              "Delivers immediate, high-intent traffic compared to the gradual timeline of organic SEO."
            ],
            "simpleRealWorldExample": "A cloud hosting startup bidding on Google Ads for 'deploy IoT server', paying ₹40 per click to drive engineers to its signup page.",
            "examOrientedPoints": [
              "State the Ad Rank formula: Ad Rank = Max CPC Bid * Quality Score and define Quality Score components."
            ],
            "possibleExamQuestions": [
              "Explain Search Engine Marketing (SEM) and Pay-Per-Click (PPC) advertising. How is Ad Rank calculated?"
            ]
          }
        },
        {
          "id": "top-6-7",
          "topicNumber": "6.7",
          "title": "Social media marketing",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "Using social media platforms to build brand awareness, engage customer communities, drive website traffic, and generate sales leads.",
            "detailedExplanation": "Social media marketing leverages platforms like Instagram, LinkedIn, YouTube, and X to reach users where they spend digital time. It combines organic content (posts, reels) with targeted paid advertising. Interactive features like comments, polls, and direct messaging foster direct two-way brand relationships.",
            "importantPoints": [
              "Platform selection aligns with audience: LinkedIn for B2B; Instagram and YouTube for B2C.",
              "Combines organic community engagement with algorithmic paid audience targeting.",
              "Facilitates real-time, two-way customer communication and brand feedback loops.",
              "Key metrics: Engagement Rate, Reach, Follower Growth, and Conversion Rate."
            ],
            "simpleRealWorldExample": "Boat Lifestyle building a leading consumer audio brand in India through viral Instagram campaigns and consumer community contests.",
            "examOrientedPoints": [
              "Differentiate between Organic Social Marketing (community building, viral reach) and Paid Social Ads (demographic micro-targeting)."
            ],
            "possibleExamQuestions": [
              "Discuss the role of Social Media Marketing in modern startup customer acquisition and brand building."
            ]
          }
        },
        {
          "id": "top-6-8",
          "topicNumber": "6.8",
          "title": "Influencer marketing",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "Partnering with trusted digital content creators who have dedicated social followings to promote products and drive sales.",
            "detailedExplanation": "Influencer marketing leverages the authentic trust and niche authority creators hold with their audiences. Campaigns range from Nano-influencers (1k–10k followers) with high engagement to Mega-influencers and celebrities for widespread reach. Compensation models include free product gifting, flat sponsorship fees, or performance affiliate commissions.",
            "importantPoints": [
              "Tiers: Nano (1k-10k), Micro (10k-100k), Macro (100k-1M), and Mega/Celebrity (1M+ followers).",
              "Micro and Nano influencers often yield significantly higher authentic engagement rates.",
              "Replaces corporate sales pitches with relatable, lifestyle peer recommendations.",
              "Tracked via customized discount coupon codes and affiliate referral links."
            ],
            "simpleRealWorldExample": "Tech YouTubers reviewing and unboxing new smartphones with custom affiliate purchase links in the video description.",
            "examOrientedPoints": [
              "Classify the 4 influencer tiers (Nano, Micro, Macro, Mega) and explain why Micro-influencers often deliver superior ROI."
            ],
            "possibleExamQuestions": [
              "Explain Influencer Marketing. Discuss the classification of influencers and metrics to measure campaign ROI."
            ]
          }
        },
        {
          "id": "top-6-9",
          "topicNumber": "6.9",
          "title": "Disruption in digital business",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "A market process where a simpler, cheaper, or more convenient technology solution displaces entrenched, market-leading legacy businesses.",
            "detailedExplanation": "Clayton Christensen's Theory of Disruptive Innovation explains how new entrants initially target overlooked, low-end segments with basic offerings. As digital technology improves, the entrant's product advances until it satisfies mainstream consumers, upending incumbents who ignored the threat. Digital business models accelerate disruption through zero marginal cost and cloud scale.",
            "importantPoints": [
              "Initially enters at the bottom of the market with simpler, lower-cost, or accessible offerings.",
              "Incumbent market leaders often ignore early entrants due to lower initial profit margins.",
              "Rapid technological improvement allows the entrant to eventually satisfy mainstream demand.",
              "Accelerates in digital markets due to rapid software iteration and cloud distribution."
            ],
            "simpleRealWorldExample": "Netflix disrupting Blockbuster video rentals by initially offering online DVD mailings without late fees, then scaling into instant streaming.",
            "examOrientedPoints": [
              "State Clayton Christensen's Disruptive Innovation model: Low-end market entry -> Technological improvement -> Mainstream market displacement."
            ],
            "possibleExamQuestions": [
              "Explain Clayton Christensen's Theory of Disruptive Innovation with a suitable corporate case study."
            ]
          }
        },
        {
          "id": "top-6-10",
          "topicNumber": "6.10",
          "title": "Innovation in digital business",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "The strategic application of novel digital technologies, processes, and business models to fundamentally improve customer value and operational efficiency.",
            "detailedExplanation": "Digital innovation extends beyond inventing new software—it encompasses product innovation, process automation, business model transformation, and user experience design. Companies leverage AI, cloud computing, APIs, and real-time data analytics to create personalized services. Continuous innovation allows enterprises to adapt quickly to evolving consumer demands.",
            "importantPoints": [
              "4 Innovation Dimensions: Product Innovation, Process Automation, Business Model, and UX.",
              "Leverages AI, cloud infrastructure, real-time analytics, and open API integrations.",
              "Shortens product development cycles through agile methodologies and rapid A/B testing.",
              "Essential for sustaining long-term competitive advantage in fast-moving digital markets."
            ],
            "simpleRealWorldExample": "UPI (Unified Payments Interface) in India innovating real-time interbank mobile payments, powering fintech apps like PhonePe and Google Pay.",
            "examOrientedPoints": [
              "Classify the 4 types of innovation: Incremental (small improvements), Radical (breakthrough tech), Architectural, and Disruptive."
            ],
            "possibleExamQuestions": [
              "Discuss the types and role of innovation in digital business management."
            ]
          }
        },
        {
          "id": "top-6-11",
          "topicNumber": "6.11",
          "title": "Self-learning: Airbnb case study",
          "isCompleted": false,
          "notes": {
            "simpleDefinition": "A benchmark digital platform case study illustrating multi-sided marketplace dynamics, disruption of the hospitality industry, and network effects.",
            "detailedExplanation": "Airbnb disrupted the global hospitality sector by creating a two-sided digital platform connecting property hosts with travelers without owning any real estate. It solved peer-to-peer trust barriers through identity verification, secure escrow payments, and two-way review systems. The model demonstrates how asset-light digital platforms achieve scale through compounding network effects.",
            "importantPoints": [
              "Asset-Light Business Model: Owns zero hotel real estate; scales through platform listing density.",
              "Two-Sided Platform: Connects accommodation hosts with travelers, capturing commission fees.",
              "Built mutual trust via digital identity verification, secure escrow payments, and two-way reviews.",
              "Powerful network effects: More hosts attract more travelers, which in turn attracts more hosts."
            ],
            "simpleRealWorldExample": "Brian Chesky and Joe Gebbia renting air mattresses in their apartment during a conference, which scaled into a global platform with millions of listings.",
            "examOrientedPoints": [
              "In exam answers on Platform Disruption, highlight: 'Asset-Light Model', 'Two-Sided Network Effects', and 'Digital Trust Infrastructure (Escrow + Reviews)'."
            ],
            "possibleExamQuestions": [
              "Analyze the Airbnb case study. How did its asset-light platform model disrupt the traditional hotel and hospitality industry?"
            ]
          }
        }
      ]
    }
  ]
};
import { microcontrollerSubject, mockMicrocontrollerQuizzes } from './microcontrollerData';
export { microcontrollerSubject, mockMicrocontrollerQuizzes };

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
  {
    id: 'micro-2304112',
    name: 'Microcontrollers',
    code: '2304112',
    semester: 'Semester IV',
    credits: 3,
    progress: 50,
    totalModules: 6,
    completedModules: 3,
    icon: '⚡',
    professor: 'Dept. of Electronics & Telecommunication',
    nextTopic: 'Unit III: 8051 Microcontroller & Assembly Language Programming',
  },
];

export const mockChapterQuizzes: Record<string, ChapterQuiz> = {
  ...mockMicrocontrollerQuizzes,
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

export const mockMicrocontrollerDailyQuiz: DailyQuiz = {
  id: 'daily-micro-quiz',
  title: 'Daily Microcontroller Practice Quiz',
  subject: 'Microcontrollers',
  subjectCode: '2304112',
  questionCount: 5,
  durationMinutes: 6,
  xpReward: 100,
  difficulty: 'Medium',
  topics: ['8051 Architecture', 'ARM7 Registers', 'Memory Interfacing', 'Timers & Interrupts'],
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
      id: 'd-micro-1',
      question: 'Explain the difference between Von Neumann and Harvard architecture in microcontrollers.',
      subject: 'Microcontrollers (2304112)',
      status: 'Resolved',
      timeAgo: '25 mins ago',
    },
    {
      id: 'd-2',
      question: 'Explain the 3 statutory patentability criteria under Indian Patent Law.',
      subject: 'Business Model Development (2994511)',
      status: 'Resolved',
      timeAgo: '2 hours ago',
    },
    {
      id: 'd-micro-2',
      question: 'How do you configure 8051 Timer 1 in Mode 2 for 9600 baud rate serial communication?',
      subject: 'Microcontrollers (2304112)',
      status: 'Resolved',
      timeAgo: '3 hours ago',
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
