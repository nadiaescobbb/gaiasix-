"use client";

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'new' | 'sold' | 'sale' | 'featured';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: BadgeProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium uppercase tracking-widest font-body";
  
  const variants = {
    default: "bg-gaia-silver text-gaia-black",
    new: "bg-gaia-crimson text-gaia-white",
    sold: "bg-gaia-black text-gaia-white",
    sale: "bg-gaia-white text-gaia-crimson border border-gaia-crimson",
    featured: "bg-gaia-charcoal text-gaia-white"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-xs"
  };

  return (
    <span className={`
      ${baseClasses}
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {children}
    </span>
  );
}