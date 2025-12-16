import { LucideIcon } from 'lucide-react';

export interface LinkData {
  label: string;
  url: string;
  type: 'github' | 'live' | 'android' | 'ios' | 'doc';
}

export interface ProjectData {
  title: string;
  period: string;
  tech: string[];
  description: string;
  links: LinkData[];
  highlights?: string[];
  images?: string[]; // Changed from single string to array
}

export interface ExperienceData {
  company: string;
  role: string;
  period: string;
  description: string[];
  tech?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

export interface EducationData {
  school: string;
  major: string;
  gpa: string;
  period: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
}