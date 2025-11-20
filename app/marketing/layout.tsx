import { ReactNode } from 'react';

// ===================================================
// TYPES
// ===================================================

interface MarketingLayoutProps {
  children: ReactNode;
}

// ===================================================
// MARKETING LAYOUT COMPONENT
// ===================================================

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header específico para páginas de marketing */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-xl font-light font-title">
              GAIA SIX
            </div>
            
            {/* Navegación simple para marketing */}
            <nav className="flex items-center space-x-8 text-sm">
              <a 
                href="/" 
                className="text-gray-600 hover:text-black transition-colors"
              >
                Inicio
              </a>
              <a 
                href="/about" 
                className="text-gray-600 hover:text-black transition-colors"
              >
                La Marca
              </a>
              <a 
                href="/contact" 
                className="text-gray-600 hover:text-black transition-colors"
              >
                Contacto
              </a>
              <a 
                href="/shop" 
                className="bg-black text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Ver Tienda
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Contenido de las páginas de marketing */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer específico para marketing (más simple) */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <div className="text-2xl font-light font-title mb-2">GAIA SIX</div>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Looks de noche sin vueltas. Ropa pensada para destacar sin esfuerzo
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="/about" className="hover:text-black transition-colors">
              La Marca
            </a>
            <a href="/contact" className="hover:text-black transition-colors">
              Contacto
            </a>
            <a href="/terms" className="hover:text-black transition-colors">
              Términos
            </a>
            <a href="/privacy" className="hover:text-black transition-colors">
              Privacidad
            </a>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Gaia Six. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}