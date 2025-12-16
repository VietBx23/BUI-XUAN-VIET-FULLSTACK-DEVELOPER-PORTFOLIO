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

export const PROJECTS: ProjectData[] = [
  {
    title: "EV Charging Station Management Platform",
    period: "06/2024 – 10/2024",
    tech: ["C#", ".NET Core", "SQL Server", "EF Core", "SignalR", "RESTful APIs", "WebSocket", "Blazor", "Bootstrap", "LINQ"],
    description: "A large-scale management platform for electric vehicle charging stations. The system enables real-time monitoring, user management, multi-payment support, charger control, performance analytics, and detailed reports. Deployed on VPS and designed for scalability and reliability.",
    links: [],
    images: [
        "https://images.unsplash.com/photo-1669476022830-580a5522513a?q=80&w=1600&auto=format&fit=crop", // EV Charging
        "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1600&auto=format&fit=crop", // EV Station
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop", // Analytics Dashboard
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop" // Server/Tech
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
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop", // Mobile App UI
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1600&auto=format&fit=crop", // App Dashboard
        "https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=1600&auto=format&fit=crop", // Map/Navigation
        "https://images.unsplash.com/photo-1596742578443-7682ef5251cd?q=80&w=1600&auto=format&fit=crop" // QR Code / Payment
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
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1600&auto=format&fit=crop", // Modern Office/Web
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600&auto=format&fit=crop", // Solar Panels
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop", // Website Dashboard
        "https://images.unsplash.com/photo-1486406140526-918346dca647?q=80&w=1600&auto=format&fit=crop" // Corporate Building
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
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1600&auto=format&fit=crop", // Sneakers
        "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1600&auto=format&fit=crop", // E-commerce Payment
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1600&auto=format&fit=crop", // Shoes Collection
        "https://images.unsplash.com/photo-1472851294608-4155f2118c03?q=80&w=1600&auto=format&fit=crop" // Shopping
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
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1600&auto=format&fit=crop", // Software/Dashboard
        "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=1600&auto=format&fit=crop", // Desktop Work
        "https://images.unsplash.com/photo-1566576912906-254d7943f670?q=80&w=1600&auto=format&fit=crop", // Warehouse
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop" // Analytics
    ]
  }
];

export const EDUCATION: EducationData = {
  school: "FPT Polytechnic Ho Chi Minh",
  major: "Software Applications",
  gpa: "8.9 / 10 (Excellent)",
  period: "09/2021 – 01/2024"
};