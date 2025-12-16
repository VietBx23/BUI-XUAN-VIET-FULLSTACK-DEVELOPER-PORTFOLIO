import React, { useState, useEffect } from 'react';
import { Save, User, Mail, Phone, MapPin, Github, RefreshCw, Target } from 'lucide-react';
import { PERSONAL_INFO, SUMMARY, CAREER_GOALS } from '../constants';
import FormInput from './components/FormInput';
import ActionButton from './components/ActionButton';
import Card from './components/Card';
import Notification from './components/Notification';

interface PersonalInfoManagerProps {
  onDataChange: (hasChanges: boolean) => void;
}

interface PersonalData {
  personalInfo: typeof PERSONAL_INFO;
  summary: string;
  careerGoals: typeof CAREER_GOALS;
}

const PersonalInfoManager: React.FC<PersonalInfoManagerProps> = ({ onDataChange }) => {
  const [data, setData] = useState<PersonalData>({
    personalInfo: { ...PERSONAL_INFO },
    summary: SUMMARY,
    careerGoals: { ...CAREER_GOALS }
  });
  const [originalData, setOriginalData] = useState<PersonalData>({
    personalInfo: { ...PERSONAL_INFO },
    summary: SUMMARY,
    careerGoals: { ...CAREER_GOALS }
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Check for changes
    const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);
    onDataChange(hasChanges);
  }, [data, originalData, onDataChange]);

  const handleInputChange = React.useCallback((field: string, value: string, section?: string) => {
    setData(prev => {
      if (section) {
        const sectionData = prev[section as keyof PersonalData];
        if (typeof sectionData === 'object' && sectionData !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionData,
              [field]: value
            }
          };
        }
      }
      return {
        ...prev,
        [field]: value
      };
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would update the constants file or send to API
      // For now, we'll just update localStorage for demo
      localStorage.setItem('portfolio_personal_data', JSON.stringify(data));
      
      // Trigger update event for real-time sync
      window.dispatchEvent(new CustomEvent('portfolioDataUpdate'));
      
      setOriginalData({ ...data });
      setSaveMessage('Personal information saved successfully!');
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      setData({ ...originalData });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ActionButton
            onClick={handleReset}
            icon={RefreshCw}
            variant="secondary"
          >
            Reset
          </ActionButton>
          <ActionButton
            onClick={handleSave}
            icon={Save}
            loading={isSaving}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </ActionButton>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <Notification
          type={saveMessage.includes('Error') ? 'error' : 'success'}
          message={saveMessage}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card
          title="Contact Details"
          description="Manage your contact information"
          icon={User}
          iconColor="emerald"
        >
          <div className="space-y-6">
            <FormInput
              label="Email Address"
              icon={Mail}
              type="email"
              value={data.personalInfo.email}
              onChange={(value) => handleInputChange('email', value, 'personalInfo')}
              placeholder="your.email@example.com"
              required
            />

            <FormInput
              label="Phone Number"
              icon={Phone}
              type="tel"
              value={data.personalInfo.phone}
              onChange={(value) => handleInputChange('phone', value, 'personalInfo')}
              placeholder="+84 123 456 789"
              required
            />

            <FormInput
              label="Location"
              icon={MapPin}
              value={data.personalInfo.location}
              onChange={(value) => handleInputChange('location', value, 'personalInfo')}
              placeholder="City, Country"
              required
            />

            <FormInput
              label="GitHub URL"
              icon={Github}
              type="url"
              value={data.personalInfo.github}
              onChange={(value) => handleInputChange('github', value, 'personalInfo')}
              placeholder="https://github.com/username"
              required
            />
          </div>
        </Card>

        {/* Professional Summary */}
        <Card
          title="Professional Summary"
          description="Your professional story"
          icon={User}
          iconColor="purple"
        >
          <div className="space-y-6">
            <FormInput
              label="About Me"
              type="textarea"
              value={data.summary}
              onChange={(value) => handleInputChange('summary', value)}
              placeholder="Write a brief summary about yourself..."
              rows={6}
              required
            />
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Character count: {data.summary.length}</span>
              <span className={data.summary.length > 500 ? 'text-amber-500' : data.summary.length > 300 ? 'text-blue-500' : 'text-emerald-500'}>
                {data.summary.length > 500 ? 'Long' : data.summary.length > 300 ? 'Good' : 'Short'}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Career Goals */}
      <Card
        title="Career Goals"
        description="Your professional aspirations"
        icon={Target}
        iconColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Short Term Goals"
            type="textarea"
            value={data.careerGoals.shortTerm}
            onChange={(value) => handleInputChange('shortTerm', value, 'careerGoals')}
            placeholder="Your short-term career objectives..."
            rows={4}
            required
          />

          <FormInput
            label="Long Term Goals"
            type="textarea"
            value={data.careerGoals.longTerm}
            onChange={(value) => handleInputChange('longTerm', value, 'careerGoals')}
            placeholder="Your long-term career vision..."
            rows={4}
            required
          />
        </div>
      </Card>
    </div>
  );
};

export default PersonalInfoManager;