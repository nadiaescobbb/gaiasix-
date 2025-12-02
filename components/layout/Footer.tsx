"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Footer() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (path: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    
    // Rutas existentes en tu app
    const existingPaths = ['/', '/shop', '/about', '/contact'];
    const targetPath = existingPaths.includes(path) ? path : '/';
    
    router.push(targetPath);
    setTimeout(() => setIsNavigating(false), 300);
  };

  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
          {/* Columna 1: Logo y descripción */}
          <div>
            <button 
              onClick={() => handleNavigation('/')}
              disabled={isNavigating}
              className="text-2xl font-light tracking-wider mb-3 hover:opacity-80 transition-opacity disabled:opacity-50 text-left"
            >
              GAIA<span className="italic font-serif text-red-500">SIX</span>
            </button>
            <p className="text-xs text-neutral-500 leading-relaxed">
              ropa para salir
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase font-light text-neutral-400 mb-4">
              contacto
            </h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <a 
                href="mailto:gaiashowroom@gmail.com"
                className="hover:text-white transition-colors cursor-pointer block hover:text-red-400"
              >
                gaiashowroom@gmail.com
              </a>
              <a 
                href="https://wa.me/5492964479923"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer block hover:text-red-400"
              >
                +54 9 2964 479923
              </a>
              <a 
                href="https://instagram.com/gaiasix"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer block hover:text-red-400"
              >
                @gaiasix
              </a>
            </div>
          </div>

          {/* Columna 3: Servicios */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase font-light text-neutral-400 mb-4">
              compras
            </h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <p className="hover:text-white transition-colors cursor-default">
                envíos gratis en compras superiores a $150.000
              </p>
              <p className="hover:text-white transition-colors cursor-default">
                6 cuotas sin interés
              </p>
              <p className="hover:text-white transition-colors cursor-default">
                cambios dentro de los 7 días
              </p>
            </div>
          </div>

          {/* Columna 4: Navegación */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase font-light text-neutral-400 mb-4">
              navegación
            </h4>
            <div className="space-y-2 text-sm text-neutral-400">
              <button 
                onClick={() => handleNavigation('/')}
                disabled={isNavigating}
                className="hover:text-white transition-colors cursor-pointer block text-left hover:text-red-400 disabled:opacity-50"
              >
                inicio
              </button>
              <button 
                onClick={() => handleNavigation('/shop')}
                disabled={isNavigating}
                className="hover:text-white transition-colors cursor-pointer block text-left hover:text-red-400 disabled:opacity-50"
              >
                prendas
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                disabled={isNavigating}
                className="hover:text-white transition-colors cursor-pointer block text-left hover:text-red-400 disabled:opacity-50"
              >
                nosotras
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                disabled={isNavigating}
                className="hover:text-white transition-colors cursor-pointer block text-left hover:text-red-400 disabled:opacity-50"
              >
                contacto
              </button>
            </div>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} GAIA SIX</p>
          <div className="flex gap-6">
            <button 
              onClick={() => window.open('/terms', '_blank')}
              className="hover:text-white transition-colors hover:text-red-400"
            >
              términos
            </button>
            <button 
              onClick={() => window.open('/privacy', '_blank')}
              className="hover:text-white transition-colors hover:text-red-400"
            >
              privacidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}