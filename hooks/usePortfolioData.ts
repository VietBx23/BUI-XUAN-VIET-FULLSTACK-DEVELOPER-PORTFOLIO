import { useState, useEffect } from 'react';
import { PERSONAL_INFO, SUMMARY, CAREER_GOALS, EXPERIENCE, PROJECTS, SKILLS, EDUCATION } from '../constants';
import { ContactInfo, ExperienceData, ProjectData, SkillCategory, EducationData } from '../types';

interface PortfolioData {
  personalInfo: ContactInfo;
  summary: string;
  careerGoals: typeof CAREER_GOALS;
  experience: ExperienceData[];
  projects: ProjectData[];
  skills: SkillCategory[];
  education: EducationData;
}

const DEFAULT_DATA: PortfolioData = {
  personalInfo: PERSONAL_INFO,
  summary: SUMMARY,
  careerGoals: CAREER_GOALS,
  experience: EXPERIENCE,
  projects: PROJECTS,
  skills: SKILLS,
  education: EDUCATION
};

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);

  useEffect(() => {
    // Load data from localStorage on mount
    loadDataFromStorage();

    // Listen for storage changes (when admin updates data)
    const handleStorageChange = () => {
      loadDataFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('portfolioDataUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolioDataUpdate', handleStorageChange);
    };
  }, []);

  const loadDataFromStorage = () => {
    try {
      const personalData = localStorage.getItem('portfolio_personal_data');
      const experienceData = localStorage.getItem('portfolio_experience_data');
      const projectsData = localStorage.getItem('portfolio_projects_data');
      const skillsData = localStorage.getItem('portfolio_skills_data');
      const educationData = localStorage.getItem('portfolio_education_data');

      setData(prevData => ({
        personalInfo: personalData ? JSON.parse(personalData).personalInfo : DEFAULT_DATA.personalInfo,
        summary: personalData ? JSON.parse(personalData).summary : DEFAULT_DATA.summary,
        careerGoals: personalData ? JSON.parse(personalData).careerGoals : DEFAULT_DATA.careerGoals,
        experience: experienceData ? JSON.parse(experienceData) : DEFAULT_DATA.experience,
        projects: projectsData ? JSON.parse(projectsData) : DEFAULT_DATA.projects,
        skills: skillsData ? JSON.parse(skillsData) : DEFAULT_DATA.skills,
        education: educationData ? JSON.parse(educationData) : DEFAULT_DATA.education
      }));
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      setData(DEFAULT_DATA);
    }
  };

  const updateData = (section: keyof PortfolioData, newData: any) => {
    setData(prev => ({
      ...prev,
      [section]: newData
    }));

    // Trigger custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('portfolioDataUpdate'));
  };

  return {
    ...data,
    updateData,
    refreshData: loadDataFromStorage
  };
};