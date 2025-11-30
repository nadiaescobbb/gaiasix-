"use client";

import { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gaia-black mb-2 font-body">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full appearance-none
              border border-gaia-border bg-gaia-white
              px-4 py-3 pr-10
              focus:border-gaia-black focus:ring-1 focus:ring-gaia-black
              transition-all duration-300
              text-gaia-black
              focus:outline-none
              ${error ? 'border-gaia-crimson focus:border-gaia-crimson focus:ring-gaia-crimson' : ''}
              ${className}
              font-body
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            size={16} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gaia-silver pointer-events-none" 
          />
        </div>
        {error && (
          <p className="text-xs text-gaia-crimson mt-2 font-body">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;