import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = 'emerald',
  children,
  className = '',
  hover = false
}) => {
  const getIconColorClasses = (color: string) => {
    const colors = {
      emerald: 'from-emerald-500 to-teal-600 shadow-emerald-500/25',
      blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
      purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
      orange: 'from-orange-500 to-orange-600 shadow-orange-500/25',
      pink: 'from-pink-500 to-pink-600 shadow-pink-500/25',
      red: 'from-red-500 to-red-600 shadow-red-500/25'
    };
    return colors[color as keyof typeof colors] || colors.emerald;
  };

  const getGradientClasses = (color: string) => {
    const gradients = {
      emerald: 'from-emerald-500/5 via-transparent to-teal-500/5',
      blue: 'from-blue-500/5 via-transparent to-blue-500/5',
      purple: 'from-purple-500/5 via-transparent to-purple-500/5',
      orange: 'from-orange-500/5 via-transparent to-orange-500/5',
      pink: 'from-pink-500/5 via-transparent to-pink-500/5',
      red: 'from-red-500/5 via-transparent to-red-500/5'
    };
    return gradients[color as keyof typeof gradients] || gradients.emerald;
  };

  return (
    <div className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-8 shadow-xl ${hover ? 'hover:shadow-2xl hover:scale-[1.01]' : ''} transition-all duration-300 group relative overflow-hidden ${className}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClasses(iconColor)} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Header */}
      {(title || Icon) && (
        <div className="flex items-center gap-4 mb-8 relative z-10">
          {Icon && (
            <div className={`w-12 h-12 bg-gradient-to-br ${getIconColorClasses(iconColor)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
          {title && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
              {description && (
                <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;