import { ChangeEvent } from 'react';

interface EmailFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function EmailField({ value, error, onChange, disabled }: EmailFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label 
        htmlFor="email" 
        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
      >
        Email *
      </label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={handleChange}
        className={`w-full bg-white border px-4 py-3 transition-colors outline-none ${
          error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-300 focus:border-black'
        }`}
        placeholder="email@ejemplo.com"
        disabled={disabled}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
}