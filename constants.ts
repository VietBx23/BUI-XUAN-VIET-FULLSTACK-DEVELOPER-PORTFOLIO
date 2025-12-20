import { 
  Code2, 
  Server, 
  Smartphone, 
  Database, 
  Wrench, 
  Layers 
} from 'lucide-react';
import { ContactInfo, ExperienceData, ProjectData, SkillCategory, EducationData } from './types';

export const PERSONAL_INFO: ContactInfo = {
  email: "vietbx23@gmail.com",
  phone: "+84 932 718 625",
  location: "Ho Chi Minh City, Vietnam",
  github: "https://github.com/VietBx23"
};

export const SUMMARY = "I’m Bui Xuan Viet, a Fullstack Developer experienced in building scalable backend systems, modern frontend applications, and mobile solutions. I work with .NET, Java, Node.js, PHP, React, Angular, and React Native, and have strong experience with WordPress, multiple CMS platforms, and custom-built CMS systems. I focus on performance, clean architecture, and real-world deployment.";

export const CAREER_GOALS = {
  shortTerm: "Master backend development with Java, C#, and Node.js while improving frontend skills with React, Angular, and Next.js through real-world projects.",
  longTerm: "Become a versatile full-stack developer capable of designing complex systems and contributing to open-source communities."
};

export const SKILLS: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Java", "C#", "PHP", "Python", "JavaScript", "TypeScript", "C"],
    icon: Code2
  },
  {
    title: "Backend Frameworks",
    skills: ["Spring Boot", ".NET Core", "ASP.NET", "Node.js", "Express", "Hibernate", "RESTful APIs", "WebSocket", "SignalR", "Spring Security"],
    icon: Server
  },
  {
    title: "Frontend & Mobile",
    skills: ["ReactJS", "React Native", "AngularJS", "Bootstrap", "Thymeleaf", "JSP/Servlet", "XXF Themes"],
    icon: Smartphone
  },
  {
    title: "Databases",
    skills: ["SQL Server", "MySQL", "Firebase"],
    icon: Database
  },
  {
    title: "Testing & Tools",
    skills: ["JUnit", "TestNG", "Selenium", "Postman", "Swagger", "SEO Tools"],
    icon: Wrench
  },
  {
    title: "DevOps & CMS",
    skills: ["WordPress", "Baota Server", "VPS", "SEO Optimization", "GitHub", "Agile", "Scrum", "CMS Development"],
    icon: Layers
  }
];

export const EXPERIENCE: ExperienceData[] = [
  {
    company: "THIEN CO TRI LIEN CO., LTD",
    role: "Fullstack Developer",
    period: "2025 – Present",
    description: [
      "Deployed and managed websites on VPS using Baota server.",
      "Built websites rapidly using multiple CMS platforms, including WordPress.",
      "Developed and customized CMS themes (WordPress, XXF, and similar frameworks) with a focus on performance and SEO.",
      "Created automated CMS generation systems using Node.js and PHP to speed up website deployment.",
      "Built SEO automation and support tools using Python and Node.js.",
      "Developed websites and systems using PHP, Node.js, and Java.",
      "Designed and maintained backend systems and RESTful APIs.",
      "Optimized website performance, databases, and technical SEO."
    ]
  },
  {
    company: "Solar EV Company",
    role: "IT Engineer",
    period: "06/2024 – 06/2025",
    description: [
      "Developed and maintained corporate websites (solarev.vn, focussolar.vn).",
      "Designed and implemented an EV Charging Station Management Platform using C#, .NET Core, SQL Server.",
      "System supports 10,000+ users, 50+ EV chargers, 20+ charging stations, and 20+ investors.",
      "Built backend APIs in Java to connect web platforms with mobile applications.",
      "Implemented real-time monitoring using WebSocket / SignalR.",
      "Provided IT helpdesk support, PC setup, charger configuration, and firmware updates."
    ]
  },
  {
    company: "FPT Company",
    role: "Intern Backend Developer",
    period: "09/2023 – 12/2023",
    description: [
      "Built a secure payment website application.",
      "Implemented authentication, authorization, and role-based access.",
      "Developed customer and admin dashboards.",
      "Built shopping cart, order management, and cash-on-delivery payment.",
      "Integrated cryptocurrency wallets."
    ]
  }
];

export const MAIN_PROJECTS: ProjectData[] = [
  {
    title: "EV Charging Station Management Platform",
    period: "06/2024 – 10/2024",
    tech: ["C#", ".NET Core", "SQL Server", "EF Core", "SignalR", "RESTful APIs", "WebSocket", "Blazor", "Bootstrap", "LINQ"],
    description: "A large-scale management platform for electric vehicle charging stations. The system enables real-time monitoring, user management, multi-payment support, charger control, performance analytics, and detailed reports. Deployed on VPS and designed for scalability and reliability.",
    links: [],
    images: [
        "/Images/platfrom-ev.png",
        "/Images/platfrom-ev2.png",
        "/Images/platfrom-ev3.png",
        "/Images/platfrom-ev4.png"
    ]
  },
  {
    title: "SolarEV Mobile Application",
    period: "02/2025 – Present",
    tech: ["React Native", "TypeScript", "Expo", "Google Maps API", "VNPay", "Axios", "Firebase", "QR Scanner", "React Navigation"],
    description: "Cross-platform mobile app enabling EV users to scan QR codes to start charging, top up wallets via VNPay, apply vouchers, book charging slots, view charging history, and locate nearby stations in real time.",
    links: [
      { label: "Android", url: "https://play.google.com/store/search?q=solarev&c=apps", type: "android" },
      { label: "iOS", url: "https://apps.apple.com/vn/app/solarev-tr%E1%BA%A1m-s%E1%BA%A1c-xe-%C4%91i%E1%BB%87n/id6470471363", type: "ios" },
      { label: "GitHub", url: "https://github.com/VietBx23/APP-SOLAREV", type: "github" }
    ],
    images: [
        "/Images/appsolarev.png",
        "/Images/appsolarev2.png",
        "/Images/appsolarev3.png",
        "/Images/appsolarev4.png"
    ]
  },
  {
    title: "SolarEV & Focus Solar Corporate Websites",
    period: "08/2024 – 10/2024",
    tech: ["WordPress", "PHP", "HTML/CSS", "JavaScript", "Elementor", "WooCommerce", "Yoast SEO", "MySQL", "Google Analytics"],
    description: "Developed and maintained responsive corporate websites with SEO optimization, e-commerce integration, performance tuning, and security enhancements.",
    links: [
      { label: "SolarEV.vn", url: "https://solarev.vn/", type: "live" },
      { label: "FocusSolar.vn", url: "https://focussolar.vn/", type: "live" }
    ],
    images: [
        "/Images/websolarev1.png",
        "/Images/websolarev2.png",
        "/Images/websolarev3.png"
    ]
  },
  {
    title: "Sneaker E-commerce Website",
    period: "08/2023 – 12/2023",
    tech: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "AngularJS", "SQL Server", "Thymeleaf", "Bootstrap"],
    description: "Full-featured e-commerce system with customer purchasing flow, vouchers, reviews, admin management, warehouse control, revenue statistics, and authorization management.",
    links: [
      { label: "GitHub", url: "https://github.com/VietBx23/WebsiteSneaker", type: "github" }
    ],
    images: [
        "/Images/sneaker.png",
        "/Images/sneaker2.png",
        "/Images/sneaker3.png",
        "/Images/sneaker4.png",
        "/Images/sneaker5.png"
    ]
  },
  {
    title: "Shoe Management Desktop Application",
    period: "Academic Project",
    tech: ["Java", "Java Swing", "SQL Server", "QR Code", "Pagination"],
    description: "Desktop application for shoe store management including QR login, product scanning, multi-payment options, invoice management, employee and customer management, and sales analytics.",
    links: [
      { label: "GitHub", url: "https://github.com/VietBx23/ShoeManagementApp", type: "github" }
    ],
    images: [
        "/Images/sneaker.png",
        "/Images/sneaker2.png",
        "/Images/sneaker3.png",
        "/Images/sneaker4.png"
    ]
  }
];

export const TOOLS_AND_WEBSITES: ProjectData[] = [
  {
    title: "Article Creator Tool",
    period: "2024 – Present",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "AI Integration", "SEO"],
    description: "AI-powered tool for quickly generating high-quality articles with SEO optimization, automated content structure, and publishing workflows.",
    links: [
      { label: "Live Demo", url: "https://quickly-create-articles.vercel.app/", type: "live" }
    ],
    images: [
        "/Images/websolarev1.png",
        "/Images/websolarev2.png"
    ],
    iframeUrl: "https://quickly-create-articles.vercel.app/"
  },
  {
    title: "Google Sites Content Creator",
    period: "2024 – Present",
    tech: ["Next.js", "React", "TypeScript", "Google Sites API", "Content Generation"],
    description: "Specialized tool for creating optimized content specifically for Google Sites with templates, formatting, and direct integration capabilities.",
    links: [
      { label: "Live Demo", url: "https://create-content-google-site.vercel.app/", type: "live" }
    ],
    images: [
        "/Images/websolarev1.png",
        "/Images/websolarev2.png"
    ],
    iframeUrl: "https://create-content-google-site.vercel.app/"
  },
  {
    title: "Content Creation Tool",
    period: "2024 – Present",
    tech: ["Next.js", "React", "TypeScript", "AI Content Generation", "Templates"],
    description: "Versatile content creation platform with multiple templates, AI assistance, and export options for various content formats and platforms.",
    links: [
      { label: "Live Demo", url: "https://tool-create-content.vercel.app/", type: "live" }
    ],
    images: [
        "/Images/websolarev1.png",
        "/Images/websolarev2.png"
    ],
    iframeUrl: "https://tool-create-content.vercel.app/"
  },
  {
    title: "Site Article Creator",
    period: "2024 – Present",
    tech: ["Next.js", "React", "TypeScript", "Article Templates", "SEO Tools"],
    description: "Focused tool for creating website articles with built-in SEO optimization, readability analysis, and multiple export formats.",
    links: [
      { label: "Live Demo", url: "https://create-google-site-article.vercel.app/", type: "live" }
    ],
    images: [
        "/Images/websolarev1.png",
        "/Images/websolarev2.png"
    ],
    iframeUrl: "https://create-google-site-article.vercel.app/"
  },
  {
    title: "Green Architecture Website",
    period: "2024 – Present", 
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive Design"],
    description: "Modern responsive website for green architecture and landscape design company featuring portfolio showcases, service presentations, and eco-friendly design principles.",
    links: [
      { label: "Live Website", url: "https://canh-quan-kien-truc-xanh.vercel.app/", type: "live" }
    ],
    images: [
        "/Images/websolarev1.png",
        "/Images/websolarev2.png"
    ],
    iframeUrl: "https://canh-quan-kien-truc-xanh.vercel.app/"
  },
  {
    title: "ANT Construction Website",
    period: "2024 – Present", 
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Modern UI/UX"],
    description: "Professional construction company website with project galleries, service details, team information, and client testimonials with optimized performance.",
    links: [
      { label: "Live Website", url: "https://ant-construction.vercel.app/", type: "live" }
    ],
    images: [
        "/Images/websolarev1.png",
        "/Images/websolarev2.png"
    ],
    iframeUrl: "https://ant-construction.vercel.app/"
  }
];

// For backward compatibility
export const PROJECTS: ProjectData[] = [...MAIN_PROJECTS, ...TOOLS_AND_WEBSITES];


export const EDUCATION: EducationData = {
  school: "FPT Polytechnic Ho Chi Minh",
  major: "Software Applications",
  gpa: "8.9 / 10 (Excellent)",
  period: "09/2021 – 01/2024"
};