import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
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

const FormInput: React.FC<FormInputProps> = ({
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
  const isTextarea = type === 'textarea';
  const InputComponent = isTextarea ? 'textarea' : 'input';

  // Prevent focus loss by using React.useCallback for stable reference
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        {Icon && !isTextarea && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300 pointer-events-none" />
        )}
        <InputComponent
          type={isTextarea ? undefined : type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={isTextarea ? rows : undefined}
          autoComplete="off"
          spellCheck="false"
          className={`w-full ${Icon && !isTextarea ? 'pl-12' : 'pl-4'} pr-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300 backdrop-blur-sm hover:border-slate-300 dark:hover:border-slate-600 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 ${isTextarea ? 'resize-none' : ''}`}
        />
        {/* Focus Ring Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default FormInput;