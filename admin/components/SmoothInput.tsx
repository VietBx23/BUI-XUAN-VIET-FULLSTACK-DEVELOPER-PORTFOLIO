import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LucideIcon } from 'lucide-react';

interface SmoothInputProps {
  label: string;
  icon?: LucideIcon;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

const SmoothInput: React.FC<SmoothInputProps> = ({
  label,
  icon: Icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  rows,
  className = ''
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const isTextarea = type === 'textarea';
  const InputComponent = isTextarea ? 'textarea' : 'input';

  // Sync external changes only when not focused
  useEffect(() => {
    if (!isFocused && value !== internalValue) {
      setInternalValue(value);
    }
  }, [value, isFocused, internalValue]);

  // Immediate internal state update for smooth typing
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    // No debounce - immediate callback for parent state
    onChange(newValue);
  }, [onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Ensure sync on blur
    if (internalValue !== value) {
      onChange(internalValue);
    }
  }, [internalValue, value, onChange]);

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && !isTextarea && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
        )}
        <InputComponent
          ref={inputRef as any}
          type={isTextarea ? undefined : type}
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          rows={isTextarea ? rows : undefined}
          autoComplete="off"
          spellCheck="false"
          className={`w-full ${Icon && !isTextarea ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-800 transition-colors duration-200 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${isTextarea ? 'resize-none' : ''}`}
        />
      </div>
    </div>
  );
};

export default SmoothInput;