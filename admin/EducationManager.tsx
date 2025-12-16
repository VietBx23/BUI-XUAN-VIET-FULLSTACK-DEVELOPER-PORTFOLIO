import React, { useState, useEffect } from 'react';
import { Save, GraduationCap, Calendar, Award, RefreshCw } from 'lucide-react';
import { EDUCATION } from '../constants';
import { EducationData } from '../types';

interface EducationManagerProps {
  onDataChange: (hasChanges: boolean) => void;
}

const EducationManager: React.FC<EducationManagerProps> = ({ onDataChange }) => {
  const [education, setEducation] = useState<EducationData>({ ...EDUCATION });
  const [originalEducation, setOriginalEducation] = useState<EducationData>({ ...EDUCATION });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const hasChanges = JSON.stringify(education) !== JSON.stringify(originalEducation);
    onDataChange(hasChanges);
  }, [education, originalEducation, onDataChange]);

  const handleInputChange = (field: keyof EducationData, value: string) => {
    setEducation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would update the constants file or send to API
      localStorage.setItem('portfolio_education_data', JSON.stringify(education));
      
      // Trigger update event for real-time sync
      window.dispatchEvent(new CustomEvent('portfolioDataUpdate'));
      
      setOriginalEducation({ ...education });
      setSaveMessage('Education information saved successfully!');
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      setEducation({ ...originalEducation });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your educational background</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'}`}>
          {saveMessage}
        </div>
      )}

      {/* Education Form */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
        {/* Header with Icon */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
            <GraduationCap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Academic Information</h3>
            <p className="text-slate-600 dark:text-slate-400">Update your educational details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* School Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              <GraduationCap className="w-4 h-4 inline mr-2" />
              School/University Name
            </label>
            <input
              type="text"
              value={education.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all text-lg"
              placeholder="Enter your school or university name"
            />
          </div>

          {/* Major/Field of Study */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Major/Field of Study
            </label>
            <input
              type="text"
              value={education.major}
              onChange={(e) => handleInputChange('major', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="e.g., Computer Science, Software Engineering"
            />
          </div>

          {/* Period */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              <Calendar className="w-4 h-4 inline mr-2" />
              Study Period
            </label>
            <input
              type="text"
              value={education.period}
              onChange={(e) => handleInputChange('period', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="e.g., 2020 - 2024"
            />
          </div>

          {/* GPA */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              <Award className="w-4 h-4 inline mr-2" />
              GPA/Grade
            </label>
            <input
              type="text"
              value={education.gpa}
              onChange={(e) => handleInputChange('gpa', e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              placeholder="e.g., 3.8/4.0, 8.5/10, First Class Honours"
            />
          </div>
        </div>

        {/* Preview Card */}
        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Preview</h4>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                {education.school || 'School Name'}
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                {education.major || 'Major/Field of Study'}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Calendar className="w-3 h-3" />
                  {education.period || 'Study Period'}
                </span>
                
                <span className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-500 bg-yellow-500/5 px-3 py-1 rounded-lg border border-yellow-500/10">
                  <Award className="w-3 h-3" />
                  GPA: {education.gpa || 'Grade'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationManager;