export const profile = {
  name: "Rishabh Pandey",
  firstName: "Rishabh",
  lastName: "Pandey",
  initials: "RP",
  role: "Software Developer / Cloud Engineer",
  tagline:
    "I build automation solutions, AI-integrated applications, and cloud-native systems that turn ambitious ideas into shipped, scalable products.",
  location: "Delhi, India",
  email: "pandeyrishabh889@gmail.com",
  phone: "+91 79826 26292",
  available: true,
  bio: [
    "I'm a B.Tech Information Technology student and a software developer focused on cloud engineering and automation solutions. My foundation is in Data Structures & Algorithms with Java, and I spend most of my time at the intersection of scalable backend systems, cloud infrastructure, and applied AI.",
    "From architecting Virtus — an AI career-coaching platform powered by the Google Gemini API — to engineering AI Sentinel, a real-time OpenCV surveillance and attendance system, I care about the full lifecycle: clean architecture, reliable automation, and shipping to real users.",
    "Currently open to SDE Intern roles where I can apply strong problem-solving, cloud, and automation skills to meaningful problems.",
  ],
  stats: [
    { label: "LeetCode Problems", value: 70, suffix: "+" },
    { label: "Projects Shipped", value: 3, suffix: "" },
    { label: "Certifications", value: 4, suffix: "" },
    { label: "Years Coding", value: 4, suffix: "+" },
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/rishabhpandey081?tab=repositories",
      handle: "@rishabhpandey081",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rishabh-pandey-515989300/",
      handle: "rishabh-pandey",
    },
    {
      label: "LeetCode",
      href: "https://leetcode.com/u/Rishabhpandey9086/",
      handle: "70 solved",
    },
    { label: "Email", href: "mailto:pandeyrishabh889@gmail.com", handle: "Say hi" },
  ],
};

export const skillGroups = [
  {
    category: "Languages",
    items: ["Java", "Python", "C", "JavaScript (ES6+)", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React.js", "React Router", "React Hooks", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js", "Express.js", "REST APIs", "Gemini API", "Web Speech API", "WebRTC"],
  },
  {
    category: "Database & Tools",
    items: ["MySQL", "Git", "GitHub", "npm", "dotenv", "VS Code"],
  },
  {
    category: "AI & Computer Vision",
    items: ["OpenCV", "Haar Cascades", "LBPH", "Prompt Engineering", "NLP Fundamentals"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS EC2", "AWS S3", "Docker", "CORS", "JSON"],
  },
];

export const coreStrengths = [
  "Problem Solving",
  "Logical Thinking",
  "Analytical Thinking",
  "Debugging",
  "Attention to Detail",
  "Teamwork",
  "Time Management",
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  stack: string[];
  image: string;
  accent: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "virtus",
    title: "Virtus — AI Interview Coach",
    subtitle: "Full-stack interview simulation platform",
    description:
      "An interactive full-stack interview simulation platform delivering real-time, adaptive technical interview evaluation and feedback. Combines a prompt-driven resume builder, mock interview simulator, and job-description evaluator in a single responsive app.",
    highlights: [
      "Architected with Node.js, Express, and Google Gemini API (gemini-2.5-flash) for adaptive technical interview evaluation.",
      "Integrated browser-native Web Speech and Camera APIs for hands-free voice input, audio feedback, and video simulation.",
      "Built a clean modular client dashboard in React.js with React Router, Tailwind CSS, secure API interactions, and structured state management.",
      "Added client-side state synchronization for instant preview updates and direct browser-to-PDF export.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "Gemini API", "Tailwind CSS", "Web Speech API"],
    image: "/images/project-virtus.png",
    accent: "from-rose-500/20 to-orange-500/10",
    repo: "https://github.com/rishabhpandey081",
    featured: true,
  },
  {
    slug: "ai-sentinel",
    title: "AI Sentinel — Smart Security",
    subtitle: "Real-time face recognition & attendance system",
    description:
      "A real-time computer vision system that detects human presence, recognizes faces, and automates attendance logging — eliminating manual registers entirely.",
    highlights: [
      "Built a real-time face detection pipeline using Haar Cascades for fast object recognition.",
      "Implemented the LBPH algorithm for robust, accurate face recognition across varied conditions.",
      "Developed live video processing with OpenCV and integrated MySQL for automated attendance logging.",
      "Fully automated the attendance marking workflow, removing manual registers.",
    ],
    stack: ["Python", "OpenCV", "Haar Cascades", "LBPH", "MySQL"],
    image: "/images/project-sentinel.png",
    accent: "from-pink-500/20 to-rose-500/10",
    repo: "https://github.com/rishabhpandey081",
    featured: true,
  },
  {
    slug: "portfolio",
    title: "Portfolio Website",
    subtitle: "This very site — 3D & motion-driven",
    description:
      "A personal portfolio designed and engineered from the ground up to showcase projects, skills, and profile links — built with React Three Fiber, real WebGL, and a focus on craft over templates.",
    highlights: [
      "Designed and deployed a personal portfolio site to showcase projects, skills, and profile links.",
      "Real-time 3D hero scene with React Three Fiber, postprocessing bloom, and scroll-driven motion.",
      "Custom cursor, magnetic interactions, and film-grain art direction.",
    ],
    stack: ["Next.js", "React Three Fiber", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/images/project-portfolio.png",
    accent: "from-rose-500/20 to-red-500/10",
    repo: "https://github.com/rishabhpandey081",
  },
];

export type ExperienceItem = {
  period: string;
  title: string;
  org: string;
  type: "education" | "achievement" | "coursework";
  description: string;
  details?: string[];
};

export const timeline: ExperienceItem[] = [
  {
    period: "Aug 2023 — Jul 2027",
    title: "B.Tech, Information Technology",
    org: "Inderprastha Engineering College · AKTU, Delhi",
    type: "education",
    description:
      "Currently in 3rd Year (6th Semester). Building a strong foundation in core CS and applied software engineering.",
    details: [
      "Relevant coursework: Data Structures, Algorithms, DBMS, Computer Networks, Operating Systems, OOP.",
      "10th: 80% (2019) · 12th: 72% (2021).",
    ],
  },
  {
    period: "Ongoing",
    title: "DSA with Java",
    org: "Data Structures & Algorithms",
    type: "coursework",
    description:
      "Deepening algorithmic problem-solving — 70+ problems solved on LeetCode and counting.",
  },
  {
    period: "Qualifier",
    title: "Startup Competition — Round 2",
    org: "Entrepreneurial pitch event",
    type: "achievement",
    description:
      "Advanced to Round 2 in a competitive startup pitch event, demonstrating entrepreneurial thinking and innovation.",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  category: string;
};

export const certifications: Certification[] = [
  {
    title: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    category: "Cloud Computing",
  },
  {
    title: "Data Analysis & Forensic Technology",
    issuer: "Deloitte",
    category: "Data Analytics",
  },
  {
    title: "Java Foundation Course",
    issuer: "Oracle",
    category: "Core Java Programming",
  },
  {
    title: "Oracle Java Foundations",
    issuer: "Oracle",
    category: "Core Java Programming",
  },
];

export const languages = [
  { name: "English", level: 5 },
  { name: "Hindi", level: 5 },
  { name: "German", level: 3 },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];
