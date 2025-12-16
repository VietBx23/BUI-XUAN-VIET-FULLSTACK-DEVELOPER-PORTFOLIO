import React, { useState, useEffect, useCallback } from 'react';
import { Save, User, Mail, Phone, MapPin, Github, RefreshCw, Target } from 'lucide-react';
import { PERSONAL_INFO, SUMMARY, CAREER_GOALS } from '../constants';
import SmoothInput from './components/SmoothInput';
import ActionButton from './components/ActionButton';
import Card from './components/Card';
import Notification from './components/Notification';
import FloatingSaveButton from './components/FloatingSaveButton';

interface PersonalInfoManagerProps {
  onDataChange: (hasChanges: boolean) => void;
}

interface PersonalData {
  personalInfo: typeof PERSONAL_INFO;
  summary: string;
  careerGoals: typeof CAREER_GOALS;
}

const PersonalInfoManagerSmooth: React.FC<PersonalInfoManagerProps> = ({ onDataChange }) => {
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
  const [hasChanges, setHasChanges] = useState(false);

  // Stable change detection without debounce
  useEffect(() => {
    const changes = JSON.stringify(data) !== JSON.stringify(originalData);
    setHasChanges(changes);
    onDataChange(changes);
  }, [data, originalData, onDataChange]);

  // Optimized input handlers with useCallback
  const handlePersonalInfoChange = useCallback((field: string, value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const handleSummaryChange = useCallback((value: string) => {
    setData(prev => ({
      ...prev,
      summary: value
    }));
  }, []);

  const handleCareerGoalChange = useCallback((field: string, value: string) => {
    setData(prev => ({
      ...prev,
      careerGoals: {
        ...prev.careerGoals,
        [field]: value
      }
    }));
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('portfolio_personal_data', JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('portfolioDataUpdate'));
      
      setOriginalData({ ...data });
      setSaveMessage('Personal information saved successfully!');
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [data]);

  const handleReset = useCallback(() => {
    if (confirm('Are you sure you want to reset all changes?')) {
      setData({ ...originalData });
    }
  }, [originalData]);

  return (
    <div className="space-y-8">
      {/* Fixed Header */}
      <div className="sticky top-0 z-20 bg-slate-50/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 p-4 -mx-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Personal Information</h2>
            <p className="text-slate-600 dark:text-slate-400">Manage your personal details and career information</p>
          </div>
          <div className="flex items-center gap-3">
            <ActionButton
              onClick={handleReset}
              icon={RefreshCw}
              variant="secondary"
              size="sm"
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
          hover={false}
        >
          <div className="space-y-6">
            <SmoothInput
              label="Email Address"
              icon={Mail}
              type="email"
              value={data.personalInfo.email}
              onChange={(value) => handlePersonalInfoChange('email', value)}
              placeholder="your.email@example.com"
              required
            />

            <SmoothInput
              label="Phone Number"
              icon={Phone}
              type="tel"
              value={data.personalInfo.phone}
              onChange={(value) => handlePersonalInfoChange('phone', value)}
              placeholder="+84 123 456 789"
              required
            />

            <SmoothInput
              label="Location"
              icon={MapPin}
              value={data.personalInfo.location}
              onChange={(value) => handlePersonalInfoChange('location', value)}
              placeholder="City, Country"
              required
            />

            <SmoothInput
              label="GitHub URL"
              icon={Github}
              type="url"
              value={data.personalInfo.github}
              onChange={(value) => handlePersonalInfoChange('github', value)}
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
          hover={false}
        >
          <div className="space-y-6">
            <SmoothInput
              label="About Me"
              type="textarea"
              value={data.summary}
              onChange={handleSummaryChange}
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
        hover={false}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SmoothInput
            label="Short Term Goals"
            type="textarea"
            value={data.careerGoals.shortTerm}
            onChange={(value) => handleCareerGoalChange('shortTerm', value)}
            placeholder="Your short-term career objectives..."
            rows={4}
            required
          />

          <SmoothInput
            label="Long Term Goals"
            type="textarea"
            value={data.careerGoals.longTerm}
            onChange={(value) => handleCareerGoalChange('longTerm', value)}
            placeholder="Your long-term career vision..."
            rows={4}
            required
          />
        </div>
      </Card>

      {/* Floating Save Button */}
      <FloatingSaveButton
        onSave={handleSave}
        hasChanges={hasChanges}
        isSaving={isSaving}
      />
    </div>
  );
};

export default PersonalInfoManagerSmooth;