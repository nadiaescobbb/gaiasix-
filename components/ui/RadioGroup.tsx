"use client";

import { forwardRef, InputHTMLAttributes } from 'react';

interface RadioGroupProps {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ label, error, options, name, value, onChange, ...props }, ref) => {
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gaia-black mb-3 font-body">
            {label}
          </label>
        )}
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className={`
                    appearance-none w-5 h-5
                    border border-gaia-border rounded-full
                    checked:bg-gaia-black checked:border-gaia-black
                    focus:outline-none focus:ring-2 focus:ring-gaia-black focus:ring-offset-2
                    transition-all duration-200
                    ${error ? 'border-gaia-crimson' : ''}
                  `}
                  {...props}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gaia-white rounded-full pointer-events-none opacity-0 checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm text-gaia-black font-body group-hover:text-gaia-crimson transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {error && (
          <p className="text-xs text-gaia-crimson mt-2 font-body">{error}</p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;