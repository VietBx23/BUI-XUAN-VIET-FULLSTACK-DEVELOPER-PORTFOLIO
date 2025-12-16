import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  show?: boolean;
  loading?: boolean;
  badge?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon: Icon,
  label,
  variant = 'primary',
  show = true,
  loading = false,
  badge = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40';
      case 'secondary':
        return 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl';
      case 'danger':
        return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40';
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={onClick}
        disabled={loading}
        className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${getVariantClasses()}`}
      >
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
        
        {/* Badge */}
        {badge && !loading && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
        )}
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          {loading ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Icon className="w-5 h-5" />
          )}
          <span className="whitespace-nowrap">{loading ? 'Saving...' : label}</span>
        </div>
      </button>
    </div>
  );
};

export default FloatingActionButton;