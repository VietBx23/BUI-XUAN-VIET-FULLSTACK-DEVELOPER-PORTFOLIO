import React, { useState, useEffect } from 'react';
import { User, LogOut, BarChart3, Settings, Bell, Search, Moon, Sun, Zap, Activity, Briefcase, Eye, Home, Menu, X } from 'lucide-react';
import LoginForm from './LoginForm';
import PersonalInfoManagerSmooth from './PersonalInfoManagerSmooth';
import ExperienceManager from './ExperienceManager';
import ProjectsManager from './ProjectsManager';
import SkillsManager from './SkillsManager';
import EducationManager from './EducationManager';

import DashboardOverview from './DashboardOverview';
import AnalyticsManager from './AnalyticsManager';

interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<AdminUser>({ username: '', isAuthenticated: false });
  const [activeTab, setActiveTab] = useState('overview');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      if (authData.isAuthenticated && authData.timestamp > Date.now() - 24 * 60 * 60 * 1000) {
        setUser({ username: authData.username, isAuthenticated: true });
      } else {
        localStorage.removeItem('admin_auth');
      }
    }

    // Check theme preference
    const savedTheme = localStorage.getItem('admin_theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('admin_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleLogin = (username: string) => {
    const authData = {
      username,
      isAuthenticated: true,
      timestamp: Date.now()
    };
    localStorage.setItem('admin_auth', JSON.stringify(authData));
    setUser({ username, isAuthenticated: true });
  };

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      if (!confirm('You have unsaved changes. Are you sure you want to logout?')) {
        return;
      }
    }
    localStorage.removeItem('admin_auth');
    setUser({ username: '', isAuthenticated: false });
    setHasUnsavedChanges(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue', description: 'Dashboard & analytics' },
    { id: 'analytics', label: 'Analytics', icon: Activity, color: 'purple', description: 'Website statistics' },
    { id: 'personal', label: 'Personal Info', icon: User, color: 'emerald', description: 'Manage contact & bio' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'blue', description: 'Work history & roles' },
    { id: 'projects', label: 'Projects', icon: Zap, color: 'orange', description: 'Portfolio showcase' },
    { id: 'skills', label: 'Skills', icon: Settings, color: 'orange', description: 'Technical expertise' },
    { id: 'education', label: 'Education', icon: Eye, color: 'pink', description: 'Academic background' }
  ];

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      emerald: isActive ? 'bg-emerald-500 text-white shadow-emerald-500/25' : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10',
      blue: isActive ? 'bg-blue-500 text-white shadow-blue-500/25' : 'text-blue-600 dark:text-blue-400 hover:bg-blue-500/10',
      purple: isActive ? 'bg-purple-500 text-white shadow-purple-500/25' : 'text-purple-600 dark:text-purple-400 hover:bg-purple-500/10',
      orange: isActive ? 'bg-orange-500 text-white shadow-orange-500/25' : 'text-orange-600 dark:text-orange-400 hover:bg-orange-500/10',
      pink: isActive ? 'bg-pink-500 text-white shadow-pink-500/25' : 'text-pink-600 dark:text-pink-400 hover:bg-pink-500/10'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  if (!user.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] text-slate-900 dark:text-slate-200 transition-all duration-500 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 shadow-lg h-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 animate-pulse">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-bounce"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Portfolio Admin
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Welcome back, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user.username}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm w-64"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-300 group"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-500 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </button>

            {/* Notifications */}
            <button className="relative p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-300">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              {hasUnsavedChanges && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
              )}
            </button>

            {/* Unsaved Changes Indicator */}
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg animate-pulse">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  Unsaved changes
                </span>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300 group"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-80'} bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 transition-all duration-300 shadow-xl fixed left-0 top-20 z-40 overflow-hidden`} style={{height: 'calc(100vh - 80px)'}}>
          <div className="p-6 h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              {!sidebarCollapsed && (
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Dashboard Menu</h2>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {sidebarCollapsed ? (
                  <Menu className="w-5 h-5 transition-all duration-300" />
                ) : (
                  <X className="w-5 h-5 transition-all duration-300" />
                )}
              </button>
            </div>

            {/* Navigation - Scrollable with hidden scrollbar */}
            <nav className="space-y-3 flex-1 overflow-y-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <div key={tab.id} className="relative">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                        getTabColorClasses(tab.color, isActive)
                      } ${isActive ? 'shadow-lg transform scale-[1.02]' : 'hover:transform hover:scale-[1.01]'}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                    {/* Background Gradient */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20"></div>
                    )}
                    
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'} transition-all duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{tab.label}</div>
                        <div className={`text-xs opacity-70 truncate ${isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                          {tab.description}
                        </div>
                      </div>
                    )}

                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                      )}
                    </button>

                    {/* Tooltip for collapsed sidebar */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                        {tab.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 dark:bg-white rotate-45"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Back to Home - Fixed at bottom */}
            <div className="mt-4 flex-shrink-0">
              <a
                href="/"
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                  getTabColorClasses('emerald', false)
                } hover:transform hover:scale-[1.01] border-t border-slate-200 dark:border-slate-700 pt-4`}
              >
                <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition-all duration-300`}>
                  <Home className="w-5 h-5" />
                </div>
                
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">Back to Home</div>
                    <div className={`text-xs opacity-70 truncate text-slate-500 dark:text-slate-400`}>
                      Return to portfolio
                    </div>
                  </div>
                )}

                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                    Back to Home
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 dark:bg-white rotate-45"></div>
                  </div>
                )}
              </a>
            </div>


          </div>
        </aside>

        {/* Main Content with margin for fixed sidebar and header */}
        <main className={`flex-1 p-8 overflow-y-auto ${sidebarCollapsed ? 'ml-20' : 'ml-80'} transition-all duration-300`} style={{height: 'calc(100vh - 80px)', marginTop: '80px'}}>
          <div className="max-w-7xl mx-auto">
            {/* Content Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                {(() => {
                  const currentTab = tabs.find(tab => tab.id === activeTab);
                  const Icon = currentTab?.icon || User;
                  return (
                    <>
                      <div className={`p-3 rounded-xl ${getTabColorClasses(currentTab?.color || 'emerald', false)} bg-opacity-10`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                          {currentTab?.label}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                          {currentTab?.description}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Content Area with Animation */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'overview' && <DashboardOverview />}
              {activeTab === 'analytics' && <AnalyticsManager />}
              {activeTab === 'personal' && (
                <PersonalInfoManagerSmooth onDataChange={setHasUnsavedChanges} />
              )}
              {activeTab === 'experience' && (
                <ExperienceManager onDataChange={setHasUnsavedChanges} />
              )}
              {activeTab === 'projects' && (
                <ProjectsManager onDataChange={setHasUnsavedChanges} />
              )}
              {activeTab === 'skills' && (
                <SkillsManager onDataChange={setHasUnsavedChanges} />
              )}
              {activeTab === 'education' && (
                <EducationManager onDataChange={setHasUnsavedChanges} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;