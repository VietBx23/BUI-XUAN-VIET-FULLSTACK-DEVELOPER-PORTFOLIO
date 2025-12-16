import React from 'react';
import { ExternalLink, Eye } from 'lucide-react';

const LivePreview: React.FC = () => {
  const openPortfolio = () => {
    window.open('/', '_blank');
  };

  const openPortfolioInSameTab = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-3">
        {/* Live Preview Button */}
        <button
          onClick={openPortfolio}
          className="group flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          title="Open Portfolio in New Tab"
        >
          <Eye className="w-5 h-5" />
          <span className="font-medium">Live Preview</span>
          <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Back to Portfolio Button */}
        <button
          onClick={openPortfolioInSameTab}
          className="group flex items-center gap-2 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          title="Back to Portfolio"
        >
          <span className="font-medium">Back to Site</span>
        </button>
      </div>
    </div>
  );
};

export default LivePreview;