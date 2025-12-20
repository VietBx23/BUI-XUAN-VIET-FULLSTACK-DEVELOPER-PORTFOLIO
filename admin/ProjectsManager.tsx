import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Folder, Calendar, ExternalLink, Github, Smartphone, Monitor } from 'lucide-react';
import { PROJECTS } from '../constants';
import { ProjectData, LinkData } from '../types';

interface ProjectsManagerProps {
  onDataChange: (hasChanges: boolean) => void;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ onDataChange }) => {
  const [projects, setProjects] = useState<ProjectData[]>([...PROJECTS]);
  const [originalProjects, setOriginalProjects] = useState<ProjectData[]>([...PROJECTS]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const emptyProject: ProjectData = {
    title: '',
    period: '',
    tech: [],
    description: '',
    links: [],
    images: [],
    iframeUrl: ''
  };

  const [newProject, setNewProject] = useState<ProjectData>(emptyProject);

  useEffect(() => {
    const hasChanges = JSON.stringify(projects) !== JSON.stringify(originalProjects);
    onDataChange(hasChanges);
  }, [projects, originalProjects, onDataChange]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('portfolio_projects_data', JSON.stringify(projects));
      
      // Trigger update event for real-time sync
      window.dispatchEvent(new CustomEvent('portfolioDataUpdate'));
      
      setOriginalProjects([...projects]);
      setSaveMessage('Projects data saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewProject(emptyProject);
  };

  const handleSaveNew = () => {
    if (newProject.title && newProject.description && newProject.period) {
      setProjects([newProject, ...projects]);
      setIsAddingNew(false);
      setNewProject(emptyProject);
    }
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    setNewProject(emptyProject);
  };

  const handleEdit = (index: number) => {
    setEditingId(index);
  };

  const handleSaveEdit = (index: number, updatedProject: ProjectData) => {
    const updated = [...projects];
    updated[index] = updatedProject;
    setProjects(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter((_, i) => i !== index);
      setProjects(updated);
    }
  };

  const getLinkIcon = (type: LinkData['type']) => {
    switch (type) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'android': return <Smartphone className="w-4 h-4" />;
      case 'ios': return <Smartphone className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const ProjectForm: React.FC<{
    project: ProjectData;
    onChange: (project: ProjectData) => void;
    onSave: () => void;
    onCancel: () => void;
    isNew?: boolean;
  }> = ({ project, onChange, onSave, onCancel, isNew = false }) => {
    const handleTechChange = (value: string) => {
      const techArray = value.split(',').map(tech => tech.trim()).filter(tech => tech);
      onChange({ ...project, tech: techArray });
    };

    const handleLinkChange = (index: number, field: keyof LinkData, value: string) => {
      const newLinks = [...project.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      onChange({ ...project, links: newLinks });
    };

    const addLink = () => {
      onChange({ 
        ...project, 
        links: [...project.links, { label: '', url: '', type: 'live' as LinkData['type'] }] 
      });
    };

    const removeLink = (index: number) => {
      const newLinks = project.links.filter((_, i) => i !== index);
      onChange({ ...project, links: newLinks });
    };

    const handleImageChange = (value: string) => {
      const imageArray = value.split('\n').map(img => img.trim()).filter(img => img);
      onChange({ ...project, images: imageArray });
    };

    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 border-2 border-emerald-500/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Project Title
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => onChange({ ...project, title: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
              placeholder="Project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Period
            </label>
            <input
              type="text"
              value={project.period}
              onChange={(e) => onChange({ ...project, period: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
              placeholder="e.g., 2023 - 2024"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Description
          </label>
          <textarea
            value={project.description}
            onChange={(e) => onChange({ ...project, description: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 resize-none"
            rows={4}
            placeholder="Describe your project"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={project.tech.join(', ')}
            onChange={(e) => handleTechChange(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
            placeholder="React, TypeScript, Node.js"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Links
          </label>
          <div className="space-y-3">
            {project.links.map((link, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => handleLinkChange(index, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="Link label"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
                  placeholder="URL"
                />
                <select
                  value={link.type}
                  onChange={(e) => handleLinkChange(index, 'type', e.target.value)}
                  className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
                >
                  <option value="live">Live</option>
                  <option value="github">GitHub</option>
                  <option value="android">Android</option>
                  <option value="ios">iOS</option>
                  <option value="doc">Documentation</option>
                </select>
                <button
                  onClick={() => removeLink(index)}
                  className="px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addLink}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add link
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Project Images (one URL per line)
          </label>
          <textarea
            value={project.images?.join('\n') || ''}
            onChange={(e) => handleImageChange(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 resize-none"
            rows={4}
            placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Live Preview URL (optional)
          </label>
          <input
            type="url"
            value={project.iframeUrl || ''}
            onChange={(e) => onChange({ ...project, iframeUrl: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500"
            placeholder="https://example.com - Will show live preview instead of images"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            If provided, this will display an interactive iframe instead of image carousel
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {isNew ? 'Add Project' : 'Save Changes'}
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h2>
          <p className="text-slate-600 dark:text-slate-400">Manage your project portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNew}
            disabled={isAddingNew}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
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

      {/* Add New Project Form */}
      {isAddingNew && (
        <ProjectForm
          project={newProject}
          onChange={setNewProject}
          onSave={handleSaveNew}
          onCancel={handleCancelNew}
          isNew={true}
        />
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            {editingId === index ? (
              <ProjectForm
                project={project}
                onChange={(updated) => {
                  const newProjects = [...projects];
                  newProjects[index] = updated;
                  setProjects(newProjects);
                }}
                onSave={() => handleSaveEdit(index, project)}
                onCancel={handleCancelEdit}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                      <Folder className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {project.period}
                      </div>
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

                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg hover:bg-emerald-500/20 transition-colors"
                      >
                        {getLinkIcon(link.type)}
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManager;