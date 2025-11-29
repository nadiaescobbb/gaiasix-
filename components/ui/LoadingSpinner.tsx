interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ 
  message = "Cargando...", 
  size = "md" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4`}></div>
        <div className="text-xl font-light text-gray-600">GAIA SIX</div>
        <div className="text-sm text-gray-500 mt-2">{message}</div>
      </div>
    </div>
  );
}