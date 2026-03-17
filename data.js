/* ============================================================
   data.js  —  YOUR CONTENT LIVES HERE
   ============================================================
   This is the only file you need to edit to update your
   portfolio content. No HTML or JS knowledge required.

   SECTIONS:
     PERSONAL    — name, tagline, location, status
     MARQUEE     — scrolling ticker words
     TILES       — homepage quick-nav grid
     EXPERIENCE  — work & education cards
     PROJECTS    — project rows + case studies
     SKILLS      — proficiency bars, pills, soft skills
     CERTS       — certification cards
     CONTACT     — email, LinkedIn, GitHub links
   ============================================================ */

/* ── PERSONAL INFO ─────────────────────────────────────── */
const PERSONAL = {
  name:       'Sathiya Shree',
  nameGold:   'Shree',            // which part renders in gold
  role:       'Full-Stack Developer',
  location:   'Coimbatore, IN',
  year:       '2025',
  tagline:    'Building systems that are technically precise\nand a pleasure to experience.',
  email:      'sathiyashree03@gmail.com',
  github:     'https://github.com/sathiya-shree',
  linkedin:   'https://linkedin.com/in/sathiya-shree-s',
  resumeUrl:  '#',                // replace with your actual resume PDF URL
  photoUrl:   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  available:  true,
};

/* ── MARQUEE TICKER ─────────────────────────────────────── */
const MARQUEE = [
  'Python','React.js','Full-Stack','MySQL','Flutter',
  'JavaScript','XAI Research','Open to Work',
  'Coimbatore','Firebase','PostgreSQL','Figma',
];

/* ── HOMEPAGE TILES ─────────────────────────────────────── */
// pid: which page to navigate to ('projects','skills','certs')
// pid: null → scrolls to contact section
const TILES = [
  { pid:'projects', num:'01', name:'Projects',        sub:'4 builds · AI to Full-Stack' },
  { pid:'skills',   num:'02', name:'Skills',           sub:'Languages · Frameworks · Tools' },
  { pid:'certs',    num:'03', name:'Certifications',   sub:'5 badges · AWS · Google · Meta' },
  { pid:null,       num:'04', name:'Research',         sub:'XAI Paper · International' },
  { pid:null,       num:'05', name:'Experience',       sub:'Internship · Currently Studying' },
  { pid:null,       num:'06', name:'Contact',          sub:'Open to work · Within 24h' },
];

/* ── EXPERIENCE ─────────────────────────────────────────── */
const EXPERIENCE = [
  {
    badge:   'Internship',
    role:    'Web Development Intern',
    org:     'Internet Society Chennai Chapter',
    period:  'Jan – Mar 2024',
    desc:    'Developed and maintained web interfaces. Implemented responsive designs, contributed to agile sprint cycles, and collaborated cross-functionally.',
  },
  {
    badge:   'Education',
    role:    'M.Sc Information Technology',
    org:     'Currently Pursuing',
    period:  '2023 – Present',
    desc:    'Deepening expertise in full-stack development, algorithms, software engineering, database design, and applied AI/ML.',
  },
];

/* ── PROJECTS ───────────────────────────────────────────── */
// Each project has a case study with problem/approach/outcome + 3 metrics.
const PROJECTS = [
  {
    num:   '01',
    cat:   'AI Application',
    title: 'Serenity – Mental Health Support',
    imp:   'Flutter · Firebase · Gemini AI · 4 core features',
    desc:  'Cross-platform mental wellness app (Flutter + Firebase) featuring mood tracking, habit tracking, psychological assessments, and AI-assisted journaling via the Gemini API.',
    tags:  ['Flutter', 'Dart', 'Firebase', 'Gemini API'],
    github: 'https://github.com/sathiya-shree/Serenity-mental-health-app',
    demo:   '',
    study: {
      problem:  'Mental health apps lacked personalisation and felt clinical. Users needed a warm, private companion that could adapt to their emotional patterns.',
      approach: 'Built a Flutter app with Firebase Realtime Database for instant sync. Integrated Gemini API for contextual journaling prompts. Designed a calm, low-contrast UI to reduce cognitive load.',
      outcome:  'Delivered 4 core modules: mood tracking with trend visualisation, daily habit streaks, GAD-7/PHQ-9 assessments, and AI-powered journal entries.',
      metrics:  [
        { n:'4',    l:'Core Modules' },
        { n:'2',    l:'Platforms' },
        { n:'100%', l:'Offline-first' },
      ],
    },
    accentColor: '#c9903a',
  },
  {
    num:   '02',
    cat:   'AI & NLP Tool',
    title: 'CareerLens AI – Resume Analyzer',
    imp:   'Python · spaCy NLP · Gemini · Skill extraction',
    desc:  'AI-powered resume analysis using Python, Streamlit, spaCy & Gemini API to extract skills, evaluate quality, and generate actionable improvement recommendations.',
    tags:  ['Python', 'Streamlit', 'spaCy', 'Gemini API'],
    github: 'https://github.com/sathiya-shree/careerlens-ai',
    demo:   '',
    study: {
      problem:  'Job seekers spend hours reformatting resumes without knowing what recruiters actually look for. Generic feedback tools miss nuance.',
      approach: 'Used spaCy for named-entity extraction to identify skills, roles, and years of experience. Gemini API generates contextual, role-specific improvement suggestions. Streamlit front-end makes it accessible without installation.',
      outcome:  'Extracts 15+ skill categories, scores resume quality on 5 dimensions, and generates a prioritised action list in under 3 seconds.',
      metrics:  [
        { n:'15+', l:'Skill Categories' },
        { n:'<3s', l:'Analysis Time' },
        { n:'5',   l:'Quality Dimensions' },
      ],
    },
    accentColor: '#36b89a',
  },
  {
    num:   '03',
    cat:   'Full-Stack Platform',
    title: 'PlaceIT – Campus Placement System',
    imp:   '3 user roles · Live on Render · Admin analytics',
    desc:  'Full-stack placement platform supporting students, recruiters & coordinators with job postings, eligibility filters, real-time tracking and admin analytics dashboard.',
    tags:  ['Python', 'Flask', 'PostgreSQL', 'HTML/CSS/JS'],
    github: 'https://github.com/sathiya-shree/placement-cell',
    demo:   'https://placement-cell-6b63.onrender.com/',
    study: {
      problem:  'College placement cells relied on Excel sheets and WhatsApp groups. Students missed deadlines; recruiters had no visibility into applicant pipelines.',
      approach: 'Built a Flask/PostgreSQL platform with 3 distinct user roles (student, recruiter, coordinator). Implemented real-time status tracking, eligibility filters by CGPA and branch, and a coordinator analytics dashboard.',
      outcome:  'Deployed live on Render. Supports entire placement lifecycle from job posting to final offer letter, with email notifications at each stage.',
      metrics:  [
        { n:'3',    l:'User Roles' },
        { n:'Live', l:'On Render' },
        { n:'∞',    l:'Scalable' },
      ],
    },
    accentColor: '#e0a84a',
  },
  {
    num:   '04',
    cat:   'Web Development',
    title: 'Portfolio Website',
    imp:   'React.js · Multi-page · Animated · Deployed',
    desc:  'Multi-page React portfolio with slide transitions, tilt cards, glitch text effects, magnetic buttons and interactive particle canvas.',
    tags:  ['React.js', 'CSS', 'JavaScript'],
    github: 'https://github.com/sathiya-shree/sathiya-shree-portfolio',
    demo:   '',
    study: {
      problem:  "Most developer portfolios are template-based, forgettable, and don't reflect the designer's technical depth.",
      approach: "Built from scratch with custom CSS animation system, Three.js 3D backgrounds, procedural canvas art for placeholders, and a multi-state cursor. Every interaction is intentional.",
      outcome:  'A portfolio that stands out. Features 5-state cursor system, particle canvas, 3D WebGL backgrounds, case study expand panels, and glitch typography.',
      metrics:  [
        { n:'5', l:'Cursor States' },
        { n:'4', l:'3D Scenes' },
        { n:'0', l:'Templates' },
      ],
    },
    accentColor: '#c9903a',
  },
];

/* ── SKILLS ─────────────────────────────────────────────── */
// p = bar fill width (0–100). The number is NOT shown — only affects bar length.
const SKILLS_PROF = [
  { name:'Python',     p:88, group:'Languages' },
  { name:'JavaScript', p:80, group:'Languages' },
  { name:'HTML/CSS',   p:92, group:'Languages' },
  { name:'Dart',       p:74, group:'Languages' },
  { name:'SQL',        p:85, group:'Languages' },
  { name:'React.js',   p:82, group:'Frameworks' },
  { name:'Flutter',    p:74, group:'Frameworks' },
  { name:'Flask',      p:78, group:'Frameworks' },
  { name:'Streamlit',  p:76, group:'Frameworks' },
  { name:'VS Code',    p:95, group:'Tools' },
  { name:'GitHub',     p:80, group:'Tools' },
  { name:'Figma',      p:72, group:'Tools' },
  { name:'Postman',    p:70, group:'Tools' },
  { name:'Git',        p:78, group:'Tools' },
];

const SKILLS_LANGS = [
  { icon:'🐍', name:'Python',     sub:'Primary Language' },
  { icon:'📜', name:'JavaScript', sub:'ES6+' },
  { icon:'🎯', name:'Dart',       sub:'Flutter Apps' },
  { icon:'🗄️', name:'SQL',        sub:'MySQL · PostgreSQL' },
  { icon:'🌐', name:'HTML/CSS',   sub:'Web Standards' },
  { icon:'📊', name:'Markdown',   sub:'Docs & Notes' },
];

const SKILLS_FRAMEWORKS = [
  { icon:'⚛️', name:'React.js',   sub:'Frontend Library' },
  { icon:'📱', name:'Flutter',    sub:'Cross-Platform' },
  { icon:'🌶️', name:'Flask',      sub:'Python Backend' },
  { icon:'📈', name:'Streamlit',  sub:'Data Apps' },
  { icon:'🔥', name:'Firebase',   sub:'BaaS' },
  { icon:'🐘', name:'PostgreSQL', sub:'Supabase' },
  { icon:'🍃', name:'Jinja2',     sub:'Templating' },
  { icon:'🤖', name:'Gemini API', sub:'Google AI' },
  { icon:'🔬', name:'spaCy',      sub:'NLP' },
];

const SKILLS_TOOLS = [
  { icon:'💻', name:'VS Code',       sub:'Primary IDE' },
  { icon:'🐙', name:'GitHub',        sub:'Version Control' },
  { icon:'🎨', name:'Figma',         sub:'UI Design' },
  { icon:'📮', name:'Postman',       sub:'API Testing' },
  { icon:'☁️', name:'Render',        sub:'Deployment' },
  { icon:'🗃️', name:'Supabase',      sub:'Database' },
  { icon:'📦', name:'Git',           sub:'Source Control' },
  { icon:'🔍', name:'Tesseract OCR', sub:'Image Text' },
];

// p = bar fill (0–100). Not shown numerically.
const SKILLS_SOFT = [
  { icon:'🧩', name:'Problem Solving',      p:90 },
  { icon:'💬', name:'Communication',        p:88 },
  { icon:'🤝', name:'Team Work',            p:85 },
  { icon:'📐', name:'Attention to Detail',  p:92 },
  { icon:'🚀', name:'Fast Learner',         p:94 },
  { icon:'🎯', name:'Goal Oriented',        p:88 },
];

/* ── CERTIFICATIONS ─────────────────────────────────────── */
// featured:true → shown in the large 2-col grid at top
// accent → brand colour used for the procedural placeholder art
const CERTS = [
  {
    num:      '01',
    name:     'AWS Certified Solutions Architect',
    issuer:   'Amazon Web Services',
    year:     '2024',
    link:     'https://www.credly.com',
    featured: true,
    accent:   '#FF9900',
  },
  {
    num:      '02',
    name:     'Professional Scrum Master I',
    issuer:   'Scrum.org',
    year:     '2023',
    link:     'https://www.credly.com',
    featured: true,
    accent:   '#009FDA',
  },
  {
    num:      '03',
    name:     'Google UX Design Certificate',
    issuer:   'Google / Coursera',
    year:     '2023',
    link:     'https://www.coursera.org',
    featured: false,
    accent:   '#4285F4',
  },
  {
    num:      '04',
    name:     'Meta Front-End Developer',
    issuer:   'Meta / Coursera',
    year:     '2022',
    link:     'https://www.coursera.org',
    featured: false,
    accent:   '#0866FF',
  },
  {
    num:      '05',
    name:     'MongoDB Associate Developer',
    issuer:   'MongoDB University',
    year:     '2022',
    link:     'https://www.mongodb.com/university',
    featured: false,
    accent:   '#00ED64',
  },
];

/* ── CONTACT LINKS ──────────────────────────────────────── */
const CONTACT_LINKS = [
  {
    icon:    '✉',
    label:   'Email',
    value:   'sathiyashree03@gmail.com',
    href:    'mailto:sathiyashree03@gmail.com',
    copyEmail: true,
  },
  {
    icon:    'in',
    label:   'LinkedIn',
    value:   'linkedin.com/in/sathiya-shree-s',
    href:    'https://linkedin.com/in/sathiya-shree-s',
    copyEmail: false,
  },
  {
    icon:    '<>',
    label:   'GitHub',
    value:   'github.com/sathiya-shree',
    href:    'https://github.com/sathiya-shree',
    copyEmail: false,
  },
];
