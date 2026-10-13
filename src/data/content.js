// Single source of truth for everything the site says.
// Edit this file to update copy, links, roles and projects.

import qmulLogo from '../assets/logos/qmul.jpeg';
import arkLogo from '../assets/logos/arkacton.png';
import gdscLogo from '../assets/logos/GDSC.jpeg';
import diamondLogo from '../assets/logos/DiamondBuildersLogo.jpeg';
import amwLogo from '../assets/logos/amwelfare.png';
import differentiaLogo from '../assets/logos/differentia_consulting.png';

export const profile = {
  name: 'Ihsanullah Sadiq',
  first: 'Ihsanullah',
  last: 'Sadiq',
  role: 'Software Engineer',
  company: 'Differentia Consulting',
  location: 'London, UK',
  coords: '51.5246° N, 0.0398° W',
  timezone: 'Europe/London',
  email: 'isadiq715@gmail.com',
  // Drop a PDF into /public and set this to e.g. '/resume.pdf' to show the résumé link.
  resume: null,
};

export const socials = [
  { label: 'GitHub', handle: '@1hsanullah', url: 'https://github.com/1hsanullah' },
  { label: 'LinkedIn', handle: 'in/ihsanullah-sadiq', url: 'https://www.linkedin.com/in/ihsanullah-sadiq-624a5b201/' },
  { label: 'Email', handle: 'isadiq715@gmail.com', url: 'mailto:isadiq715@gmail.com' },
];

export const about = {
  lead:
    "I'm a software engineer at Differentia Consulting in London. I graduated from Queen Mary with First Class Honours in Computer Science, and I like working across the whole stack, from training neural networks to shipping the interface people actually touch.",
  body: [
    'My path into software started with a curiosity for how things work, and grew into a focus on building applications that are efficient, scalable and pleasant to use.',
    "Outside of client work I'm usually exploring emerging tech, optimising systems, or sharpening my craft through hands-on side projects. I believe in continuous learning, and in leaving every codebase a little better than I found it.",
  ],
  traits: ['Problem solving', 'Team collaboration', 'Innovation', 'Continuous learning'],
};

export const stats = [
  { text: '1st', label: 'Class honours', note: 'BSc Computer Science, QMUL' },
  { value: 15, suffix: '+', label: 'Projects built', note: 'Products, client sites, tools' },
  { value: 2, suffix: '+', label: 'Years building', note: 'Software development' },
  { value: 1, label: 'npm package', note: 'TutorLoop, open source' },
];

// Featured work. `visibility: 'public'` rows link out; private rows show details only.
// `tree` and `commits` feed the little terminal that appears when you hover a row.
export const projects = [
  {
    id: 'clinical-sim',
    title: 'Clinical Simulation',
    kind: 'AI · Healthcare',
    year: '2026',
    visibility: 'private',
    description:
      "An AI-run emergency simulation that sits beside a medical school's manikin. A TV becomes a live bedside monitor, the patient talks back through a speaker, a tutor runs the scenario from a tablet, and a structured debrief follows. Built around adult sepsis and tested with a doctor.",
    stack: ['Next.js', 'TypeScript', 'WebSockets', 'OpenAI Realtime'],
    tree: ['app/', 'engine/', 'server/', 'voice/', 'harness/', 'docs/'],
    commits: 91,
  },
  {
    id: 'tutorloop',
    title: 'TutorLoop',
    kind: 'Open source · MCP',
    year: '2026',
    visibility: 'public',
    url: 'https://github.com/1hsanullah/tutorloop',
    links: [{ label: 'npm', url: 'https://www.npmjs.com/package/tutorloop' }],
    description:
      'An MCP server that drops graded coding exercises into a chat. The assistant writes the lesson and hidden tests, Python, JavaScript, TypeScript and SQL run in the browser, and a failed attempt goes back to the tutor with your exact code and error.',
    stack: ['TypeScript', 'MCP SDK', 'Pyodide', 'SQLite'],
    tree: ['src/', 'widget/', 'test/', 'scripts/', 'SPEC.md'],
    commits: 19,
    run: ['npx -y tutorloop', 'tutorloop MCP server running on stdio'],
  },
  {
    id: 'viseon',
    title: 'VISEON Schema Library',
    kind: 'Org · VISEON',
    year: '2025',
    visibility: 'public',
    url: 'https://github.com/VISEONIO/templates',
    description:
      "Schema.org JSON-LD templates for VISEON, Differentia's AI-discoverability platform: 23 industry starters that teams fill in, embed and validate. Alongside it I work through VISEON audit findings, fixing structured data across a multi-site WordPress install.",
    stack: ['JSON-LD', 'Schema.org', 'PHP', 'WordPress'],
    tree: ['Automotive.json', 'Ecommerce.json', 'Finance.json', 'Healthcare.json', '… 19 more'],
    commits: 8,
  },
  {
    id: 'ignite',
    title: 'Ignite Grant Tool',
    kind: 'AI tool',
    year: '2026',
    visibility: 'public',
    url: 'https://github.com/1hsanullah/ignite-grant-tool',
    links: [{ label: 'Live demo', url: 'https://ignite-grant-tool-nmska4bk2vyqfgrzgjxt66.streamlit.app' }],
    description:
      'A drafting assistant for German R&D tax-credit applications. It runs an eligibility pre-check, does the cost maths deterministically, has an LLM write the prose, and returns a submission-ready .docx in under 45 seconds.',
    stack: ['Python', 'Streamlit', 'LLM APIs', 'pytest'],
    tree: ['src/', 'tests/', 'examples/', 'app.py'],
    commits: 9,
    run: ['pytest -q', '81 passed'],
  },
  {
    id: 'medicineqb',
    title: 'MedicineQB',
    kind: 'Platform MVP',
    year: '2026',
    visibility: 'private',
    description:
      'An MVP for an Australian medical question bank: a NestJS API with versioned, audited question authoring and CSV imports, a Next.js practice app for students, and Terraform for AWS. The API is shaped for a native iOS client next.',
    stack: ['NestJS', 'Prisma', 'Next.js', 'Turborepo', 'Terraform'],
    tree: ['apps/api/', 'apps/web/', 'packages/', 'infra/', 'docs/'],
    commits: 7,
  },
  {
    id: 'calorietest',
    title: 'CalorieTest',
    kind: 'Web product',
    year: '2025',
    visibility: 'public',
    url: 'https://github.com/1hsanullah/calorie-calculator',
    description:
      'Fourteen health calculators (calorie, TDEE, BMR, macros, body fat and more) with articles, built to be found: structured data on every page, a generated sitemap and analytics.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Radix UI'],
    tree: ['app/', 'components/', 'content/', 'lib/', 'public/'],
    commits: 59,
  },
  {
    id: 'trading',
    title: 'Algo Trading Research',
    kind: 'Quant · Personal',
    year: '2025',
    visibility: 'private',
    description:
      'Turning discretionary trading strategies into strict rules and testing them: a Python backtesting engine, an MQL5 Expert Advisor with a Pine Script port for TradingView, and a dashboard for comparing backtest runs.',
    stack: ['Python', 'pandas', 'MQL5', 'Pine Script'],
    tree: ['backtester/', 'mt5/', 'Scripts/', 'Reports/'],
    commits: 24,
  },
];

// Smaller and older work, shown as a compact list.
export const archive = [
  { title: 'EchoVision', year: '2024', what: 'Hands-free computer control: eye-tracked cursor, wink to click, voice typing', stack: 'Python · OpenCV · MediaPipe', url: 'https://github.com/1hsanullah/EchoVision' },
  { title: 'PetFeed', year: '2025', what: 'Mobile app for households sharing pet feeding schedules', stack: 'React Native · Expo' },
  { title: 'Lead Craftsmen', year: '2025', what: 'Client site for a metal manufacturer in Oman', stack: 'React · Tailwind · Framer Motion' },
  { title: 'Sultana', year: '2026', what: 'Storefront for a London baklava brand, with a gift-box builder', stack: 'Next.js · Framer Motion' },
  { title: 'Lost', year: '2025', what: 'Top-down survival game prototype', stack: 'Unity · C#' },
  { title: 'Last Hope', year: 'Uni', what: '3D survival game, university group project', stack: 'Unity · C#', url: 'https://github.com/SapezB/Survival-Craft-Game' },
  { title: 'CIFAR-10 Classifier', year: 'Uni', what: 'Convolutional network for image classification, coursework', stack: 'Python · PyTorch' },
  { title: 'EC Tracker', year: 'Uni', what: 'Issue and extenuating-circumstances tracker for QMUL, group project', stack: 'Flask · SQLite', url: 'https://github.com/1hsanullah/EC-Ticket-App' },
];

export const experience = [
  {
    role: 'Software Engineer',
    org: 'Differentia Consulting',
    logo: differentiaLogo,
    period: 'Present',
    location: 'London, UK',
    type: 'Full-time',
    ref: 'HEAD -> main',
    summary: 'Full-time engineer at a data and AI consultancy, working on its VISEON platform and client sites.',
    points: [
      'Built the Schema.org JSON-LD template library for VISEON, covering 23 industries',
      "Fix structured data across the company's multi-site WordPress install, working from VISEON audit findings",
      'Build web applications and internal tools with cross-functional client teams',
      'Contribute to code reviews and technical documentation',
    ],
  },
  {
    role: 'Assistant',
    org: 'Google Developer Student Club',
    logo: gdscLogo,
    period: 'Sep 2023 - Jul 2024',
    location: 'Hybrid, London',
    type: 'Part-time',
    summary: 'Supporting the student tech community at QMUL.',
    points: [
      'Organised and facilitated tech workshops and events for students',
      'Provided technical troubleshooting across a range of programming challenges',
      'Gained hands-on experience with PostgreSQL and collaborative development',
      'Helped build an inclusive learning environment for aspiring developers',
    ],
  },
  {
    role: 'Lab Demonstrator, Algorithms & Data Structures',
    org: 'Queen Mary University of London',
    logo: qmulLogo,
    period: 'Dec 2023 - Apr 2024',
    location: 'On-site, London',
    type: 'Part-time',
    ref: 'teaching',
    summary: 'Teaching assistant in the Computer Science department.',
    points: [
      'Gave one-to-one help to students on algorithms and data structures',
      'Worked with the module lead to align lab activities with lectures',
      'Developed and demonstrated problem-solving techniques in Python',
      'Sharpened teaching and communication skills through student support',
    ],
  },
  {
    role: 'Project Management Intern',
    org: 'Diamond Builders Services',
    logo: diamondLogo,
    period: 'Sep 2020 - Aug 2021',
    location: 'On-site, London',
    type: 'Internship',
    summary: 'Construction project management internship.',
    points: [
      'Assisted with project planning, execution and quality assurance',
      'Helped keep projects on schedule and to specification',
      'Gained practical experience in project management and team coordination',
      'Built skills in documentation and progress tracking',
    ],
  },
  {
    role: 'Community Volunteer & Facilities Assistant',
    org: 'AM Welfare Association',
    logo: amwLogo,
    period: 'Sep 2019 - Present',
    location: 'On-site, London',
    type: 'Volunteer',
    ref: 'origin/community',
    summary: 'Long-running community service role.',
    points: [
      'Help plan and run 5+ community events a year to boost local engagement',
      'Support logistics and outreach so events run smoothly',
      'Contribute to stronger relationships across the community',
      'Developed leadership and organisational skills through event management',
    ],
  },
];

export const education = [
  {
    degree: 'BSc Computer Science',
    school: 'Queen Mary University of London',
    logo: qmulLogo,
    years: ['2021', '2024'],
    grade: 'First Class Honours',
    items: [
      'Neural Networks & Deep Learning',
      'Web Programming',
      'Object-Oriented Programming',
      'Algorithms & Data Structures',
      'Software Engineering',
      'Database Systems',
    ],
  },
  {
    degree: 'A-Levels',
    school: 'Ark Acton Sixth Form',
    logo: arkLogo,
    years: ['2019', '2021'],
    grade: 'A · A · B',
    items: ['Further Mathematics: A', 'Mathematics: A', 'Chemistry: B'],
  },
];

// What I reach for day to day. Kept short on purpose.
export const skills = {
  languages: ['TypeScript', 'Python', 'SQL'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Postgres / Prisma'],
  tools: ['OpenAI APIs', 'MCP', 'Schema.org / JSON-LD', 'Git', 'Vercel'],
  alsoUsed: ['Java', 'C#', 'Unity', 'PyTorch', 'Flask'],
};

export const certifications = [
  {
    name: 'Developer Virtual Experience',
    issuer: 'Accenture',
    url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20UK/3xnZEj9kfpoQKW885_Accenture%20UK_cefozgk9sY5jiTDAE_1681709145127_completion_certificate.pdf',
  },
  {
    name: 'Software Engineering Virtual Experience',
    issuer: 'J.P. Morgan',
    url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/R5iK7HMxJGBgaSbvk_J.P.%20Morgan_cefozgk9sY5jiTDAE_1720808127103_completion_certificate.pdf',
  },
];

export const marquee = [
  'TypeScript', 'Python', 'React', 'Next.js', 'Node.js', 'Postgres', 'OpenAI', 'MCP', 'JSON-LD',
];

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'shell', label: 'Shell' },
  { id: 'contact', label: 'Contact' },
];
