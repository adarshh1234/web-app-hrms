import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-slate-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full text-xs font-semibold rounded-lg border bg-white px-3 py-2 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#0473b8] focus:ring-1 focus:ring-[#0473b8] ${
            icon ? 'pl-9' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-300'} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-[11px] text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
