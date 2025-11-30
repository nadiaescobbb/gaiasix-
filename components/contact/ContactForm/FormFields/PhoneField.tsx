import { ChangeEvent } from 'react';

interface PhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function PhoneField({ value, onChange, disabled }: PhoneFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label 
        htmlFor="phone" 
        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
      >
        Teléfono (opcional)
      </label>
      <input
        type="tel"
        id="phone"
        value={value}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3 transition-colors outline-none"
        placeholder="+54 11 1234-5678"
        disabled={disabled}
      />
    </div>
  );
}