import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Briefcase, Calendar } from 'lucide-react';
import { EXPERIENCE } from '../constants';
import { ExperienceData } from '../types';

interface ExperienceManagerProps {
  onDataChange: (hasChanges: boolean) => void;
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({ onDataChange }) => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([...EXPERIENCE]);
  const [originalExperiences, setOriginalExperiences] = useState<ExperienceData[]>([...EXPERIENCE]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const emptyExperience: ExperienceData = {
    company: '',
    role: '',
    period: '',
    description: ['']
  };

  const [newExperience, setNewExperience] = useState<ExperienceData>(emptyExperience);

  useEffect(() => {
    const hasChanges = JSON.stringify(experiences) !== JSON.stringify(originalExperiences);
    onDataChange(hasChanges);
  }, [experiences, originalExperiences, onDataChange]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('portfolio_experience_data', JSON.stringify(experiences));
      
      // Trigger update event for real-time sync
      window.dispatchEvent(new CustomEvent('portfolioDataUpdate'));
      
      setOriginalExperiences([...experiences]);
      setSaveMessage('Experience data saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewExperience(emptyExperience);
  };

  const handleSaveNew = () => {
    if (newExperience.company && newExperience.role && newExperience.period) {
      setExperiences([newExperience, ...experiences]);
      setIsAddingNew(false);
      setNewExperience(emptyExperience);
    }
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    setNewExperience(emptyExperience);
  };

  const handleEdit = (index: number) => {
    setEditingId(index);
  };

  const handleSaveEdit = (index: number, updatedExperience: ExperienceData) => {
    const updated = [...experiences];
    updated[index] = updatedExperience;
    setExperiences(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      const updated = experiences.filter((_, i) => i !== index);
      setExperiences(updated);
    }
  };

  const ExperienceForm: React.FC<{
    experience: ExperienceData;
    onChange: (experience: ExperienceData) => void;
    onSave: () => void;
    onCancel: () => void;
    isNew?: boolean;
  }> = ({ experience, onChange, onSave, onCancel, isNew = false }) => {
    const handleDescriptionChange = (index: number, value: string) => {
      const newDescription = [...experience.description];
      newDescription[index] = value;
      onChange({ ...experience, description: newDescription });
    };

    const addDescriptionItem = () => {
      onChange({ ...experience, description: [...experience.description, ''] });
    };

    const removeDescriptionItem = (index: number) => {
      if (experience.description.length > 1) {
        const newDescription = experience.description.filter((_, i) => i !== index);
        onChange({ ...experience, description: newDescription });
      }
    };

    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border-2 border-emerald-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={experience.company}
              onChange={(e) => onChange({ ...experience, company: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={experience.role}
              onChange={(e) => onChange({ ...experience, role: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
              placeholder="Job title"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Period
          </label>
          <input
            type="text"
            value={experience.period}
            onChange={(e) => onChange({ ...experience, period: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
            placeholder="e.g., 2023 - Present"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Job Description
          </label>
          <div className="space-y-2">
            {experience.description.map((desc, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 resize-none"
                  rows={2}
                  placeholder="Describe your responsibilities and achievements"
                />
                {experience.description.length > 1 && (
                  <button
                    onClick={() => removeDescriptionItem(index)}
                    className="px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addDescriptionItem}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add description point
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {isNew ? 'Add Experience' : 'Save Changes'}
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Work Experience</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your professional experience</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNew}
            disabled={isAddingNew}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${saveMessage.includes('Error') ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'}`}>
          {saveMessage}
        </div>
      )}

      {/* Add New Experience Form */}
      {isAddingNew && (
        <ExperienceForm
          experience={newExperience}
          onChange={setNewExperience}
          onSave={handleSaveNew}
          onCancel={handleCancelNew}
          isNew={true}
        />
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            {editingId === index ? (
              <ExperienceForm
                experience={exp}
                onChange={(updated) => {
                  const newExperiences = [...experiences];
                  newExperiences[index] = updated;
                  setExperiences(newExperiences);
                }}
                onSave={() => handleSaveEdit(index, exp)}
                onCancel={handleCancelEdit}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{exp.role}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {exp.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      <p className="text-sm leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;