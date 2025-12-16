import React from 'react';
import { Save, Check } from 'lucide-react';

interface FloatingSaveButtonProps {
  onSave: () => void;
  hasChanges: boolean;
  isSaving: boolean;
  show?: boolean;
}

const FloatingSaveButton: React.FC<FloatingSaveButtonProps> = ({
  onSave,
  hasChanges,
  isSaving,
  show = true
}) => {
  if (!show || (!hasChanges && !isSaving)) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={onSave}
        disabled={isSaving || !hasChanges}
        className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed shadow-2xl ${
          isSaving 
            ? 'bg-amber-500 text-white' 
            : hasChanges 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40' 
              : 'bg-slate-300 text-slate-500'
        }`}
      >
        {/* Shimmer Effect */}
        {hasChanges && !isSaving && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
        )}
        
        {/* Pulse Animation for Changes */}
        {hasChanges && !isSaving && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 rounded-full animate-pulse border-2 border-white"></div>
        )}
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : hasChanges ? (
            <>
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Saved</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default FloatingSaveButton;