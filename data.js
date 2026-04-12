/* ═══════════════════════════════════════════════════════════════════════════ */
/* PORTFOLIO DATA */
/* ═══════════════════════════════════════════════════════════════════════════ */
const SKILLS_CONTENT = {
  technical: {
    title: 'Technical Skills',
    categories: [
      { 
        name: 'Languages', 
        items: ['Python', 'JavaScript', 'Dart', 'SQL', 'Java', 'C', 'HTML5', 'CSS3'] 
      },
      { 
        name: 'AI/ML/NLP', 
        items: ['spaCy', 'SHAP', 'LIME', 'Gemini API', 'Sentiment Analysis', 'Named Entity Recognition', 'OCR (Tesseract)', 'TF-IDF'] 
      },
      { 
        name: 'Frameworks', 
        items: ['React Native', 'Django', 'Flask', 'Flutter', 'Node.js', 'Streamlit', 'Expo', 'REST APIs'] 
      },
      { 
        name: 'Databases & Cloud', 
        items: ['PostgreSQL', 'Firebase', 'Supabase', 'Vercel', 'Render'] 
      },
      { 
        name: 'Tools', 
        items: ['Git', 'GitHub Actions', 'Visual Studio Code', 'CI/CD Pipelines'] 
      }
    ]
  },
  certifications: {
    title: 'Certifications & Training',
    items: [
      'Python Django Full Stack Development - Udemy',
      'Generative AI Fundamentals - Google Cloud',
      'Technology Job Simulation - Deloitte Australia (Forage)',
      'Data Mining - NPTEL',
      'Manage and Configure Git Repositories - Microsoft Learn',
      'Python Foundation - HCL GUVI & Infosys Springboard'
    ]
  },
  languages: {
    title: 'Languages',
    items: [
      { name: 'Tamil', proficiency: 'Native' },
      { name: 'English', proficiency: 'Professional Working Proficiency' }
    ]
  },
  education: {
    title: 'Education',
    items: [
      { 
        degree: 'PG Diploma in Advanced Computing', 
        institution: 'Sri Ramakrishna College of Arts and Science', 
        location: 'Coimbatore, Tamil Nadu', 
        year: '2025' 
      }
    ]
  }
};

const CERTS = [
  // Featured certs (displayed in main section)
  { feat: true, is: 'GCP AI', ac: '#e8c96a', label: 'Google Cloud AI Fundamentals' },
  { feat: true, is: 'DJANGO', ac: '#4a7fa5', label: 'Django Full Stack' },
  { feat: true, is: 'DELOITTE', ac: '#c9a84c', label: 'Tech Job Simulation' },
  
  // Other certs
  { feat: false, is: 'NPTEL', ac: '#e8c96a', label: 'Data Mining' },
  { feat: false, is: 'MSFT', ac: '#4a7fa5', label: 'Git Management' },
  { feat: false, is: 'GUVI', ac: '#c9a84c', label: 'Python Foundation' }
];

const SECTIONS = [
  {
    id: 'about',
    label: 'About',
    color: '#e8c96a',
    content: {
      eyebrow: 'ABOUT ME',
      title: 'I am a <em>full-stack developer</em> and <em>AI enthusiast</em>',
      tagline: 'Based in India, passionate about building elegant solutions to complex problems. Specializing in full-stack development, machine learning, and creating impactful user experiences.'
    }
  },
  {
    id: 'projects',
    label: 'Projects',
    color: '#4a7fa5',
    content: {
      eyebrow: 'RECENT WORK',
      title: 'Featured <em>Projects</em>',
      tagline: 'A selection of recent projects showcasing my work in web development, AI, and mobile applications.'
    }
  },
  {
    id: 'skills',
    label: 'Skills',
    color: '#c9a84c',
    content: {
      eyebrow: 'MY EXPERTISE',
      title: 'Technical <em>Skills</em>',
      tagline: 'Proficient in multiple languages, frameworks, and technologies for building scalable applications.'
    }
  },
  {
    id: 'contact',
    label: 'Contact',
    color: '#e8c96a',
    content: {
      eyebrow: 'GET IN TOUCH',
      title: 'Let\'s <em>Connect</em>',
      tagline: 'Feel free to reach out for collaborations or just a friendly hello. I\'m always open to new opportunities.'
    }
  }
];

const PROJECTS = [
  {
    id: 1,
    title: 'AI-Powered Analytics Dashboard',
    description: 'Real-time analytics dashboard with ML-powered insights',
    tech: ['React', 'Node.js', 'TensorFlow', 'Firebase'],
    link: '#'
  },
  {
    id: 2,
    title: 'Mobile Task Manager',
    description: 'Cross-platform mobile app with offline capabilities',
    tech: ['React Native', 'Firebase', 'Redux'],
    link: '#'
  },
  {
    id: 3,
    title: 'NLP Text Analyzer',
    description: 'Text analysis tool using spaCy and sentiment analysis',
    tech: ['Python', 'spaCy', 'Django', 'PostgreSQL'],
    link: '#'
  }
];

const EXPERIENCES = [
  {
    title: 'Full Stack Developer',
    company: 'Tech Company',
    period: '2024 - Present',
    description: 'Developing full-stack applications using modern web technologies'
  },
  {
    title: 'AI/ML Intern',
    company: 'Data Science Company',
    period: '2023 - 2024',
    description: 'Worked on machine learning models and data analysis projects'
  }
];
