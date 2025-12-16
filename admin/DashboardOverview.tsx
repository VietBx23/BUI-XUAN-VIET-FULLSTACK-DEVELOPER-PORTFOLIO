import React, { useState, useEffect } from 'react';
import { User, Briefcase, Zap, Activity, Eye, Calendar, TrendingUp, Clock } from 'lucide-react';
import StatsCard from './components/StatsCard';
import Card from './components/Card';
import { analytics, AnalyticsStats } from '../utils/analytics';

const DashboardOverview: React.FC = () => {
  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats | null>(null);
  
  // Static portfolio data
  const portfolioStats = {
    totalProjects: 5,
    totalExperience: 3,
    totalSkills: 25,
    completionRate: 85
  };

  useEffect(() => {
    const loadStats = () => {
      try {
        const stats = analytics.getStats();
        setAnalyticsStats(stats);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      }
    };

    loadStats();

    // Listen for analytics updates
    const handleAnalyticsUpdate = () => {
      loadStats();
    };

    window.addEventListener('analyticsUpdate', handleAnalyticsUpdate);
    return () => window.removeEventListener('analyticsUpdate', handleAnalyticsUpdate);
  }, []);

  const recentActivity = [
    { action: 'Updated project "SolarEV Mobile App"', time: '2 hours ago', type: 'project' },
    { action: 'Added new skill "React Native"', time: '1 day ago', type: 'skill' },
    { action: 'Modified work experience at Solar EV', time: '3 days ago', type: 'experience' },
    { action: 'Updated contact information', time: '1 week ago', type: 'personal' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return Zap;
      case 'skill': return Activity;
      case 'experience': return Briefcase;
      case 'personal': return User;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'project': return 'text-purple-600 dark:text-purple-400';
      case 'skill': return 'text-orange-600 dark:text-orange-400';
      case 'experience': return 'text-blue-600 dark:text-blue-400';
      case 'personal': return 'text-emerald-600 dark:text-emerald-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Manage your portfolio content, track your progress, and keep everything up to date.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={portfolioStats.totalProjects}
          icon={Zap}
          color="purple"
          trend={{ value: 25, isPositive: true }}
          description="Active portfolio projects"
        />
        
        <StatsCard
          title="Work Experience"
          value={`${portfolioStats.totalExperience} Years`}
          icon={Briefcase}
          color="blue"
          description="Professional experience"
        />
        
        <StatsCard
          title="Technical Skills"
          value={portfolioStats.totalSkills}
          icon={Activity}
          color="orange"
          trend={{ value: 12, isPositive: true }}
          description="Technologies & frameworks"
        />
        
        <StatsCard
          title="Total Visits"
          value={analyticsStats?.totalVisits.toLocaleString() || '0'}
          icon={Eye}
          color="emerald"
          trend={analyticsStats?.todayVisits ? { value: analyticsStats.todayVisits, isPositive: true } : undefined}
          description="Website visits"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card
          title="Recent Activity"
          description="Your latest portfolio updates"
          icon={Clock}
          iconColor="blue"
        >
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors">
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-900 ${getActivityColor(activity.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card
          title="Quick Actions"
          description="Common tasks and shortcuts"
          icon={TrendingUp}
          iconColor="emerald"
        >
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Add Project</span>
              </div>
            </button>

            <button className="p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Add Experience</span>
              </div>
            </button>

            <button className="p-4 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/30 transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">Add Skills</span>
              </div>
            </button>

            <button className="p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <User className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Edit Profile</span>
              </div>
            </button>
          </div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card
        title="Portfolio Completion"
        description="Track your portfolio completeness"
        icon={TrendingUp}
        iconColor="emerald"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Progress</span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{portfolioStats.completionRate}%</span>
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{ width: `${portfolioStats.completionRate}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full animate-shimmer"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
              <div className="text-lg font-bold text-slate-900 dark:text-white">✓</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Personal Info</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
              <div className="text-lg font-bold text-slate-900 dark:text-white">✓</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Experience</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
              <div className="text-lg font-bold text-slate-900 dark:text-white">✓</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Projects</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">✓</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400">Analytics</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;