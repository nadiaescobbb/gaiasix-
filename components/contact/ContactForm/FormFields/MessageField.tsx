import { ChangeEvent } from 'react';

interface MessageFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function MessageField({ value, error, onChange, disabled }: MessageFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label 
        htmlFor="message" 
        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
      >
        Mensaje *
      </label>
      <textarea
        id="message"
        rows={6}
        value={value}
        onChange={handleChange}
        className={`w-full bg-white border px-4 py-3 transition-colors outline-none resize-none ${
          error 
            ? 'border-red-500 focus:border-red-600' 
            : 'border-gray-300 focus:border-black'
        }`}
        placeholder="Contanos en qué podemos ayudarte..."
        disabled={disabled}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
}