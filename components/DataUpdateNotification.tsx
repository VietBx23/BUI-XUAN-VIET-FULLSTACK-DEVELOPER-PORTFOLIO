import React, { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const DataUpdateNotification: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleDataUpdate = () => {
      setShowNotification(true);
      // Auto hide after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    };

    window.addEventListener('portfolioDataUpdate', handleDataUpdate);

    return () => {
      window.removeEventListener('portfolioDataUpdate', handleDataUpdate);
    };
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-top-2 duration-300">
      <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium">Portfolio Updated!</p>
          <p className="text-sm text-emerald-100">Changes have been applied successfully</p>
        </div>
        <button
          onClick={() => setShowNotification(false)}
          className="text-emerald-100 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DataUpdateNotification;