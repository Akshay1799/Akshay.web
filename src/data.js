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
    startDate: 'July 2025',
    endDate: 'Dec 2025',
    location: 'Indore',
    description: [
      'Built RESTful APIs with Node.js and Express serving 50 k+ daily requests.',
      'Migrated legacy jQuery frontend to React 18, cutting bundle size by 40 %.',
      'Integrated Stripe payment gateway end-to-end.',
    ],
    tech: ['Node.js', 'MongoDB', 'Express', 'JWT', 'REST APIs'],
  },
  {
    id: 'exp-2',
    company: 'Teachnook',
    role: 'Frontend Developer Intern',
    startDate: 'March 2025',
    endDate: 'June 2025',
    location: 'Remote',
    description: [
      'Designed and shipped 3 client websites using React and Tailwind CSS.',
      'Achieved Lighthouse performance sres of 95+ for every project delivered.',
    ],
    tech: ['React', 'Tailwind CSS', 'Redux Toolkit', 'JavaScript', 'Axios'],
  },
];

export const projects = [
  {
    id: 'proj-1',
    title: 'Linkly - A URL Shortener App',
    description:
      'Linkly is a URL shortener that allows you to shorten long URLs and track their analytics. Built with React, Node.js, MongoDB, Express, and JWT.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'REST APIs', 'Axios'],
    image: '/projects/linkly.jpg',
    liveUrl:   'https://linkly.vercel.app',
    githubUrl: 'https://github.com/Akshay1799/linkly',
  },
  {
    id: 'proj-2',
    title: 'Notes Store App',
    description:
      'Notes Store is a note-taking app that allows you to store your notes and access them from anywhere. Built with React, Node.js, MongoDB, Express, and JWT.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'REST APIs', 'Axios'],
    image: '/projects/notestore.jpg',
    liveUrl:   'https://note-app-6u34.vercel.app/',
    githubUrl: 'https://github.com/Akshay1799/notestore',
  },
  
];

export const skills = [
  'JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3',
  'React', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion',
  'Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Socket.io',
  'MongoDB', 'PostgreSQL', 'Redis', 'Firebase',
  'Git', 'GitHub', 'Docker', 'Vercel', 'AWS S3',
  'Figma', 'Jest', 'Postman', 'Linux',
];
