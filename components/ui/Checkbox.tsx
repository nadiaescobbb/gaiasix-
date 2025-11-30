"use client";

import { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    
    return (
      <div className="w-full">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              ref={ref}
              className={`
                appearance-none w-5 h-5
                border border-gaia-border
                checked:bg-gaia-black checked:border-gaia-black
                focus:outline-none focus:ring-2 focus:ring-gaia-black focus:ring-offset-2
                transition-all duration-200
                ${error ? 'border-gaia-crimson' : ''}
                ${className}
              `}
              {...props}
            />
            <Check 
              size={14} 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gaia-white pointer-events-none opacity-0 checked:opacity-100 transition-opacity" 
            />
          </div>
          {label && (
            <span className="text-sm text-gaia-black font-body group-hover:text-gaia-crimson transition-colors">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="text-xs text-gaia-crimson mt-2 font-body">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;