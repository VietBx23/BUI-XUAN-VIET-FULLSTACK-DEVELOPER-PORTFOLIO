import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Progress Bar */}
      {/* <div className="fixed top-0 left-0 w-full h-1 bg-slate-200/50 dark:bg-slate-800/50 z-50 backdrop-blur-sm">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 transition-all duration-300 ease-out shadow-lg shadow-emerald-500/20"
          style={{ width: `${scrollProgress}%` }}
        />
      </div> */}

      {/* Circular Progress Indicator - Hidden to avoid conflict with scroll to top button */}
      {/* 
      <div className="fixed bottom-8 left-8 z-40">
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-200 dark:text-slate-700"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-500"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${scrollProgress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round(scrollProgress)}
              </span>
            </div>
          </div>
        </div>
      </div>
      */}
    </>
  );
};

export default ScrollProgress;