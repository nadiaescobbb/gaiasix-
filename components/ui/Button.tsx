// components/ui/Button.tsx - BOTONES GAIA SIX
"use client";

import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-body";
  
  const variants = {
    primary: "bg-gaia-black text-gaia-white hover:bg-gaia-crimson border border-gaia-black focus:ring-gaia-crimson",
    secondary: "bg-transparent text-gaia-black border border-gaia-silver hover:border-gaia-black hover:bg-gaia-black hover:text-gaia-white focus:ring-gaia-black",
    ghost: "bg-transparent text-gaia-black hover:bg-gaia-charcoal/5 border border-transparent hover:border-gaia-border focus:ring-gaia-silver",
    danger: "bg-gaia-crimson text-gaia-white hover:bg-gaia-crimson/90 border border-gaia-crimson focus:ring-gaia-crimson"
  };

  const sizes = {
    sm: "px-3 py-2 text-xs uppercase tracking-widest",
    md: "px-6 py-3 text-sm uppercase tracking-widest",
    lg: "px-8 py-4 text-base uppercase tracking-widest"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
        ${loading ? 'cursor-wait' : ''}
      `}
    >
      {loading && (
        <div className="spinner-gaia w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </button>
  );
}