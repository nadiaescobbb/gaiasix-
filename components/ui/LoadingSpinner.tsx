"use client";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'white';
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}: LoadingSpinnerProps) {
  
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const variants = {
    default: 'border-gaia-silver border-t-gaia-black',
    primary: 'border-gaia-crimson/30 border-t-gaia-crimson',
    white: 'border-gaia-white/30 border-t-gaia-white'
  };

  return (
    <div 
      className={`
        ${sizes[size]}
        ${variants[variant]}
        rounded-full animate-spin
        ${className}
      `}
      aria-label="Cargando..."
      role="status"
    />
  );
}