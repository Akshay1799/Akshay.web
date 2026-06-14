export const personalInfo = {
  name: 'Akshay Ladne',
  avatar: '/blackshirt.jpg',          
  taglines: [
    'Full-Stack Developer',
    'MERN Stack Developer',
    'React Enthusiast',
    'Backend Developer',
    'Problem Solver',
  ],
  resumeUrl: 'https://drive.google.com/file/d/1KTH2g4AYF4ZdVa9dt7M_xJqsoLvsv3rm/view?usp=sharing://drive.google.com/your-resume-link',
  social: {
    github:   'https://github.com/Akshay1799',
    linkedin: 'https://www.linkedin.com/in/akshay-ladne/',
    twitter:  'https://x.com/akshay_ladne',
  },
};

export const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Experience', href: '#experience'  },
  { label: 'Projects',   href: '#projects'    },
  { label: 'Skills',     href: '#skills'      },
  { label: 'Contact',    href: '#contact'     },
];

export const experience = [
  {
    id: 'exp-1',
    company: 'Codes for Tomorrow',
    role: 'Backend Developer Intern',
    startDate: 'Oct 2025',
    endDate: 'Dec 2025',
    location: 'Indore',
    description: [
      'Planned and built production-ready REST API endpoints for core application features using Node.js and Express.js.',
      'Applied JWT-based authentication with HTTP-only cookies and session management, securing all protected routes via middleware.',
      'Designed MongoDB schemas using Mongoose with proper field validation and data modeling for scalable data storage.',
      'Tested and debugged API endpoints using Postman and Thunder Client, ensuring correct request/response cycles across all routes.',
      'Collaborated with the team using Git and GitHub, following branch-based workflows for feature development.',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'REST APIs'],
  },
  {
    id: 'exp-2',
    company: 'Teachnook',
    role: 'Frontend Developer Intern',
    startDate: 'March 2025',
    endDate: 'May 2025',
    location: 'Remote',
    description: [
      'Built responsive web pages using React.js, HTML5, CSS3, and Tailwind CSS.',
      'Identified and resolved 20+ UI bugs across the codebase and refactored 10+ components for reusability.',
      'Improved component render performance using React best practices, improving page load experience.',
      'Participated in code reviews and incorporated feedback from senior developers to maintain code quality.',
    ],
    tech: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
  },
];

export const projects = [
  {
    id: 'proj-1',
    title: 'Linkly - URL Shortener',
    description:
      'Built a full-stack URL shortener with secure JWT authentication using 2 token types, HTTP-only cookies, and token rotation. Created 10+ REST APIs following MVC architecture with pagination, input validation via Zod, and MongoDB indexing. Deployed on Render.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Tailwind CSS', 'REST APIs', 'Zod'],
    image: '/projects/linkly.jpg',
    liveUrl:   'https://linkly.vercel.app',
    githubUrl: 'https://github.com/Akshay1799/linkly',
  },
  {
    id: 'proj-2',
    title: 'Notes Store Web Application',
    description:
      'Built complete CRUD functionality with JWT-based authentication and Express.js middleware chains. Enhanced REST APIs following MVC architecture with Mongoose schema validation, centralized error handling, and full-text search.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Tailwind CSS', 'REST APIs'],
    image: '/projects/notestore.jpg',
    liveUrl:   'https://note-app-6u34.vercel.app/',
    githubUrl: 'https://github.com/Akshay1799/notestore',
  },
];

export const skills = [
  'React.js', 'JavaScript (ES6+)', 'Redux Toolkit', 'Tailwind CSS', 'HTML5', 'CSS3',
  'Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Zod', 'Axios',
  'MongoDB', 'Mongoose ODM', 'Schema Design',
  'Git', 'GitHub', 'Postman', 'Vercel', 'Render',
];
