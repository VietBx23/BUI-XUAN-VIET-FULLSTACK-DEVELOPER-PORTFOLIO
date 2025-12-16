import React, { useState, useEffect } from 'react';
import { User, LogOut, BarChart3, Settings, Bell, Search, Moon, Sun, Zap, Activity, Briefcase } from 'lucide-react';
import LoginForm from './LoginForm';

interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

const AdminDashboardSimple: React.FC = () => {
  const [user, setUser] = useState<AdminUser>({ username: '', isAuthenticated: false });
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.isAuthenticated && authData.timestamp > Date.now() - 24 * 60 * 60 * 1000) {
          setUser({ username: authData.username, isAuthenticated: true });
        } else {
          localStorage.removeItem('admin_auth');
        }
      } catch (error) {
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
    localStorage.removeItem('admin_auth');
    setUser({ username: '', isAuthenticated: false });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue', description: 'Dashboard & analytics' },
    { id: 'personal', label: 'Personal Info', icon: User, color: 'emerald', description: 'Manage contact & bio' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'blue', description: 'Work history & roles' },
    { id: 'projects', label: 'Projects', icon: Zap, color: 'orange', description: 'Portfolio showcase' },
    { id: 'skills', label: 'Skills', icon: Settings, color: 'orange', description: 'Technical expertise' },
  ];

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      emerald: isActive ? 'bg-emerald-500 text-white shadow-emerald-500/25' : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10',
      blue: isActive ? 'bg-blue-500 text-white shadow-blue-500/25' : 'text-blue-600 dark:text-blue-400 hover:bg-blue-500/10',
      orange: isActive ? 'bg-orange-500 text-white shadow-orange-500/25' : 'text-orange-600 dark:text-orange-400 hover:bg-orange-500/10',
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  if (!user.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#1e293b] text-slate-900 dark:text-slate-200 transition-all duration-500">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4 shadow-lg">
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

      <div className="flex relative z-10">
        {/* Fixed Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-80'} bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-800/50 min-h-[calc(100vh-89px)] transition-all duration-300 shadow-xl fixed left-0 top-[89px] z-30`}>
          <div className="p-6">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-8">
              {!sidebarCollapsed && (
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Navigation</h2>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Settings className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="space-y-3">
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
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content with margin for fixed sidebar */}
        <main className={`flex-1 p-8 overflow-auto ${sidebarCollapsed ? 'ml-20' : 'ml-80'} transition-all duration-300`}>
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

            {/* Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'overview' && (
                <div className="text-center py-20">
                  <BarChart3 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Dashboard Overview</h2>
                  <p className="text-slate-600 dark:text-slate-400">Welcome to your portfolio admin dashboard!</p>
                </div>
              )}
              
              {activeTab === 'personal' && (
                <div className="text-center py-20">
                  <User className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Personal Information</h2>
                  <p className="text-slate-600 dark:text-slate-400">Manage your personal details and contact information.</p>
                </div>
              )}
              
              {activeTab === 'experience' && (
                <div className="text-center py-20">
                  <Briefcase className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Work Experience</h2>
                  <p className="text-slate-600 dark:text-slate-400">Add and edit your professional experience.</p>
                </div>
              )}
              
              {activeTab === 'projects' && (
                <div className="text-center py-20">
                  <Zap className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Projects</h2>
                  <p className="text-slate-600 dark:text-slate-400">Showcase your portfolio projects.</p>
                </div>
              )}
              
              {activeTab === 'skills' && (
                <div className="text-center py-20">
                  <Activity className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Skills & Technologies</h2>
                  <p className="text-slate-600 dark:text-slate-400">Manage your technical skills and expertise.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardSimple;