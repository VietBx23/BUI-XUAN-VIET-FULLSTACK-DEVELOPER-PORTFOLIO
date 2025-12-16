import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, TrendingUp, Globe, Smartphone, Monitor, Calendar, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { analytics, AnalyticsStats, VisitData } from '../utils/analytics';
import Card from './components/Card';
import StatsCard from './components/StatsCard';
import ActionButton from './components/ActionButton';

const AnalyticsManager: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [recentVisits, setRecentVisits] = useState<VisitData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalytics = () => {
    setIsLoading(true);
    try {
      const analyticsStats = analytics.getStats();
      const recent = analytics.getRecentVisits(20);
      setStats(analyticsStats);
      setRecentVisits(recent);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();

    // Listen for real-time updates
    const handleAnalyticsUpdate = () => {
      loadAnalytics();
    };

    window.addEventListener('analyticsUpdate', handleAnalyticsUpdate);
    return () => window.removeEventListener('analyticsUpdate', handleAnalyticsUpdate);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('vi-VN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return Smartphone;
      case 'tablet': return Monitor;
      default: return Monitor;
    }
  };

  const clearAnalytics = () => {
    if (confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
      analytics.clearData();
      loadAnalytics();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-20">
        <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Analytics Data</h3>
        <p className="text-slate-600 dark:text-slate-400">Start browsing your portfolio to see analytics data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Website Analytics</h2>
          <p className="text-slate-600 dark:text-slate-400">Track your portfolio performance and visitor insights</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton
            onClick={loadAnalytics}
            icon={RefreshCw}
            variant="secondary"
            size="sm"
          >
            Refresh
          </ActionButton>
          <ActionButton
            onClick={clearAnalytics}
            variant="danger"
            size="sm"
          >
            Clear Data
          </ActionButton>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Visits"
          value={stats.totalVisits.toLocaleString()}
          icon={Eye}
          color="emerald"
          description="All time visits"
        />
        
        <StatsCard
          title="Unique Visitors"
          value={stats.uniqueVisitors.toLocaleString()}
          icon={Users}
          color="blue"
          description="Unique sessions"
        />
        
        <StatsCard
          title="Today's Visits"
          value={stats.todayVisits}
          icon={Calendar}
          color="purple"
          trend={stats.todayVisits > 0 ? { value: 100, isPositive: true } : undefined}
          description="Visits today"
        />
        
        <StatsCard
          title="This Week"
          value={stats.weeklyVisits}
          icon={TrendingUp}
          color="orange"
          description="Weekly visits"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visit History Chart */}
        <Card
          title="Visit History"
          description="Daily visits over the last 30 days"
          icon={BarChart3}
          iconColor="blue"
        >
          <div className="space-y-4">
            <div className="h-48 flex items-end justify-between gap-1">
              {stats.visitHistory.map((day, index) => {
                const maxVisits = Math.max(...stats.visitHistory.map(d => d.visits));
                const height = maxVisits > 0 ? (day.visits / maxVisits) * 100 : 0;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-500 min-h-[2px]"
                      style={{ height: `${Math.max(height, 2)}%` }}
                      title={`${formatDate(day.date)}: ${day.visits} visits`}
                    ></div>
                    {index % 5 === 0 && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 rotate-45 origin-left">
                        {formatDate(day.date)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Device & Browser Stats */}
        <Card
          title="Device & Browser Stats"
          description="Visitor device and browser breakdown"
          icon={Monitor}
          iconColor="purple"
        >
          <div className="space-y-6">
            {/* Device Stats */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Device Types</h4>
              <div className="space-y-2">
                {Object.entries(stats.deviceStats).map(([device, count]) => {
                  const percentage = stats.totalVisits > 0 ? (count / stats.totalVisits) * 100 : 0;
                  const Icon = getDeviceIcon(device);
                  
                  return (
                    <div key={device} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span className="text-sm capitalize text-slate-700 dark:text-slate-300 w-16">
                        {device}
                      </span>
                      <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 w-12 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Browser Stats */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Top Browsers</h4>
              <div className="space-y-2">
                {Object.entries(stats.browserStats)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([browser, count]) => {
                    const percentage = stats.totalVisits > 0 ? (count / stats.totalVisits) * 100 : 0;
                    
                    return (
                      <div key={browser} className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-700 dark:text-slate-300 w-16">
                          {browser}
                        </span>
                        <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 w-12 text-right">
                          {count}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Card>

        {/* Top Pages */}
        <Card
          title="Top Pages"
          description="Most visited pages"
          icon={Eye}
          iconColor="emerald"
        >
          <div className="space-y-3">
            {stats.topPages.map((page, index) => {
              const percentage = stats.totalVisits > 0 ? (page.visits / stats.totalVisits) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {page.page === '/' ? 'Home' : page.page}
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {page.visits}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Visits */}
        <Card
          title="Recent Visits"
          description="Latest visitor activity"
          icon={Clock}
          iconColor="orange"
        >
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentVisits.map((visit, index) => {
              const DeviceIcon = getDeviceIcon(visit.device);
              
              return (
                <div key={visit.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-colors">
                  <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <DeviceIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {visit.page === '/' ? 'Home' : visit.page}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span>{formatTimestamp(visit.timestamp)}</span>
                      <span>•</span>
                      <span>{visit.browser}</span>
                      <span>•</span>
                      <span className="capitalize">{visit.device}</span>
                    </div>
                  </div>
                  {visit.referrer !== 'Direct' && (
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Referrers */}
      {stats.topReferrers.length > 0 && (
        <Card
          title="Top Referrers"
          description="Where your visitors come from"
          icon={ExternalLink}
          iconColor="blue"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.topReferrers.map((referrer, index) => {
              const percentage = stats.totalVisits > 0 ? (referrer.visits / stats.totalVisits) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {referrer.referrer}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {referrer.visits} visits ({percentage.toFixed(1)}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsManager;