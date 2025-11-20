'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const { isInitialized } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Efecto para manejar transiciones de página
  useEffect(() => {
    // Simular carga inicial
    if (isInitialized) {
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  // Efecto para resetear scroll al cambiar de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Mostrar loading mientras la app se inicializa
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-light text-gray-600">GAIA SIX</div>
          <div className="text-sm text-gray-500 mt-2">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Aquí puedes agregar elementos que necesiten 'use client' */}
    
      
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}