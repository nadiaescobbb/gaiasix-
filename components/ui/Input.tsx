"use client";

import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'underline';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = 'default', className = '', ...props }, ref) => {
    
    const variants = {
      default: "border border-gaia-border bg-gaia-white px-4 py-3 focus:border-gaia-black focus:ring-1 focus:ring-gaia-black",
      underline: "border-0 border-b border-gaia-border bg-transparent px-0 py-3 focus:border-gaia-black focus:ring-0 rounded-none"
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gaia-black mb-2 font-body">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full transition-all duration-300
            text-gaia-black placeholder-gaia-silver
            focus:outline-none
            ${variants[variant]}
            ${error ? 'border-gaia-crimson focus:border-gaia-crimson focus:ring-gaia-crimson' : ''}
            ${className}
            font-body
          `}
          {...props}
        />
        {error && (
          <p className="text-xs text-gaia-crimson mt-2 font-body">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;