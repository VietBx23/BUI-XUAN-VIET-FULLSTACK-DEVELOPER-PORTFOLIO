import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color = 'emerald',
  trend,
  description
}) => {
  const getColorClasses = (colorName: string) => {
    const colors = {
      emerald: {
        bg: 'from-emerald-500 to-teal-600',
        shadow: 'shadow-emerald-500/25',
        text: 'text-emerald-600 dark:text-emerald-400',
        gradient: 'from-emerald-500/5 to-teal-500/5'
      },
      blue: {
        bg: 'from-blue-500 to-blue-600',
        shadow: 'shadow-blue-500/25',
        text: 'text-blue-600 dark:text-blue-400',
        gradient: 'from-blue-500/5 to-blue-500/5'
      },
      purple: {
        bg: 'from-purple-500 to-purple-600',
        shadow: 'shadow-purple-500/25',
        text: 'text-purple-600 dark:text-purple-400',
        gradient: 'from-purple-500/5 to-purple-500/5'
      },
      orange: {
        bg: 'from-orange-500 to-orange-600',
        shadow: 'shadow-orange-500/25',
        text: 'text-orange-600 dark:text-orange-400',
        gradient: 'from-orange-500/5 to-orange-500/5'
      }
    };
    return colors[colorName as keyof typeof colors] || colors.emerald;
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses.bg} rounded-xl flex items-center justify-center shadow-lg ${colorClasses.shadow} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm font-semibold ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </h3>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {value}
          </div>
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;