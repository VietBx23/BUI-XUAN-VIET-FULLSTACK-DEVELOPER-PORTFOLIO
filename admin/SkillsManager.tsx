import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Code2, Server, Smartphone, Database, Wrench, Layers } from 'lucide-react';
import { SKILLS } from '../constants';
import { SkillCategory } from '../types';

interface SkillsManagerProps {
  onDataChange: (hasChanges: boolean) => void;
}

const SkillsManager: React.FC<SkillsManagerProps> = ({ onDataChange }) => {
  const [skills, setSkills] = useState<SkillCategory[]>([...SKILLS]);
  const [originalSkills, setOriginalSkills] = useState<SkillCategory[]>([...SKILLS]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const iconOptions = [
    { name: 'Code2', icon: Code2, label: 'Programming' },
    { name: 'Server', icon: Server, label: 'Backend' },
    { name: 'Smartphone', icon: Smartphone, label: 'Mobile' },
    { name: 'Database', icon: Database, label: 'Database' },
    { name: 'Wrench', icon: Wrench, label: 'Tools' },
    { name: 'Layers', icon: Layers, label: 'Frameworks' }
  ];

  const emptySkillCategory: SkillCategory = {
    title: '',
    skills: [],
    icon: Code2
  };

  const [newSkillCategory, setNewSkillCategory] = useState<SkillCategory>(emptySkillCategory);

  useEffect(() => {
    const hasChanges = JSON.stringify(skills) !== JSON.stringify(originalSkills);
    onDataChange(hasChanges);
  }, [skills, originalSkills, onDataChange]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('portfolio_skills_data', JSON.stringify(skills));
      
      // Trigger update event for real-time sync
      window.dispatchEvent(new CustomEvent('portfolioDataUpdate'));
      
      setOriginalSkills([...skills]);
      setSaveMessage('Skills data saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewSkillCategory(emptySkillCategory);
  };

  const handleSaveNew = () => {
    if (newSkillCategory.title && newSkillCategory.skills.length > 0) {
      setSkills([...skills, newSkillCategory]);
      setIsAddingNew(false);
      setNewSkillCategory(emptySkillCategory);
    }
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    setNewSkillCategory(emptySkillCategory);
  };

  const handleEdit = (index: number) => {
    setEditingId(index);
  };

  const handleSaveEdit = (index: number, updatedCategory: SkillCategory) => {
    const updated = [...skills];
    updated[index] = updatedCategory;
    setSkills(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this skill category?')) {
      const updated = skills.filter((_, i) => i !== index);
      setSkills(updated);
    }
  };

  const SkillCategoryForm: React.FC<{
    category: SkillCategory;
    onChange: (category: SkillCategory) => void;
    onSave: () => void;
    onCancel: () => void;
    isNew?: boolean;
  }> = ({ category, onChange, onSave, onCancel, isNew = false }) => {
    const handleSkillsChange = (value: string) => {
      const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
      onChange({ ...category, skills: skillsArray });
    };

    const handleIconChange = (iconName: string) => {
      const selectedIcon = iconOptions.find(opt => opt.name === iconName);
      if (selectedIcon) {
        onChange({ ...category, icon: selectedIcon.icon });
      }
    };

    const getCurrentIconName = () => {
      return iconOptions.find(opt => opt.icon === category.icon)?.name || 'Code2';
    };

    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border-2 border-emerald-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category Title
            </label>
            <input
              type="text"
              value={category.title}
              onChange={(e) => onChange({ ...category, title: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
              placeholder="e.g., Programming Languages"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Icon
            </label>
            <select
              value={getCurrentIconName()}
              onChange={(e) => handleIconChange(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
            >
              {iconOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Skills (comma-separated)
          </label>
          <textarea
            value={category.skills.join(', ')}
            onChange={(e) => handleSkillsChange(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 resize-none"
            rows={4}
            placeholder="JavaScript, TypeScript, React, Node.js"
          />
          <p className="text-xs text-slate-500 mt-1">
            {category.skills.length} skills
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {isNew ? 'Add Category' : 'Save Changes'}
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Skills & Technologies</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your technical skills by category</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNew}
            disabled={isAddingNew}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
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

      {/* Add New Category Form */}
      {isAddingNew && (
        <SkillCategoryForm
          category={newSkillCategory}
          onChange={setNewSkillCategory}
          onSave={handleSaveNew}
          onCancel={handleCancelNew}
          isNew={true}
        />
      )}

      {/* Skills Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              {editingId === index ? (
                <SkillCategoryForm
                  category={category}
                  onChange={(updated) => {
                    const newSkills = [...skills];
                    newSkills[index] = updated;
                    setSkills(newSkills);
                  }}
                  onSave={() => handleSaveEdit(index, category)}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{category.title}</h3>
                        <p className="text-sm text-slate-500">{category.skills.length} skills</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
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

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsManager;