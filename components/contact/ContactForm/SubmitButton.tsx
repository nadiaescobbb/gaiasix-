import { Send } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-4 px-8 text-sm uppercase tracking-widest hover:bg-[#AF161F] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        * Campos obligatorios. Tus datos están protegidos y no serán compartidos.
      </p>
    </>
  );
}