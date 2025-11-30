import { ChangeEvent } from 'react';

interface SubjectFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SubjectField({ value, onChange, disabled }: SubjectFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label 
        htmlFor="subject" 
        className="block text-xs uppercase tracking-wider text-gray-600 mb-2"
      >
        Asunto (opcional)
      </label>
      <select
        id="subject"
        value={value}
        onChange={handleChange}
        className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3 transition-colors outline-none"
        disabled={disabled}
      >
        <option value="">Seleccionar...</option>
        <option value="consulta">Consulta general</option>
        <option value="pedido">Consulta sobre pedido</option>
        <option value="producto">Consulta sobre producto</option>
        <option value="envio">Consulta sobre envío</option>
        <option value="colaboracion">Colaboración</option>
        <option value="otro">Otro</option>
      </select>
    </div>
  );
}