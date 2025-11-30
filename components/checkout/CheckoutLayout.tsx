import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface CheckoutLayoutProps {
  children: ReactNode;
}

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header y Navegación */}
        <div className="mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalizar Compra</h1>
        </div>

        {children}
      </div>
    </div>
  );
}