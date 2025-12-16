import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface OptimizedInputProps {
  label: string;
  icon?: LucideIcon;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  debounceMs?: number;
}

const OptimizedInput: React.FC<OptimizedInputProps> = ({
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  rows,
  className = '',
  debounceMs = 0
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<TimeoutId>();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const isTextarea = type === 'textarea';
  const InputComponent = isTextarea ? 'textarea' : 'input';

  // Sync external value changes
  useEffect(() => {
    if (!isFocused && value !== localValue) {
      setLocalValue(value);
    }
  }, [value, isFocused, localValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (debounceMs > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onChange(newValue);
      }, debounceMs);
    } else {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Ensure final value is synced on blur
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        {Icon && !isTextarea && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300 pointer-events-none z-10" />
        )}
        <InputComponent
          ref={inputRef as any}
          type={isTextarea ? undefined : type}
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          rows={isTextarea ? rows : undefined}
          autoComplete="off"
          spellCheck="false"
          className={`w-full ${Icon && !isTextarea ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 backdrop-blur-sm hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${isTextarea ? 'resize-none' : ''} ${isFocused ? 'ring-2 ring-emerald-500/20 border-emerald-500' : ''}`}
        />
        {/* Focus Ring Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 transition-opacity duration-300 pointer-events-none ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Focus indicator */}
        {isFocused && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default OptimizedInput;