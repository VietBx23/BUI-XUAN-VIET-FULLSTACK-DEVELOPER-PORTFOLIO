import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
    }
  };

  const getClasses = () => {
    switch (type) {
      case 'success': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'error': return 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400';
      case 'warning': return 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400';
      case 'info': return 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400';
    }
  };

  const Icon = getIcon();

  return (
    <div className={`p-4 rounded-2xl border backdrop-blur-sm ${getClasses()} animate-in slide-in-from-top-2 duration-300 relative overflow-hidden`}>
      {/* Background Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full animate-shimmer"></div>
      
      <div className="flex items-center gap-3 relative z-10">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;