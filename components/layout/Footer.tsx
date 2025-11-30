// components/layout/Footer.tsx - SECCIÓN CORREGIDA
"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image';
import { Instagram, Mail, Phone, MapPin, Package, CreditCard, Repeat, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const handleNavigation = (path: string): void => {
    if (isNavigating) return;
    setIsNavigating(true);
    router.push(path);
    setTimeout(() => setIsNavigating(false), 1000);
  };

  return (
    <footer className="bg-gaia-white border-t border-gaia-border py-16 px-6">
      <div className="container-gaia">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Columna 1: Marca y Esencia */}
          <div className="lg:col-span-1">
            <button 
              onClick={() => handleNavigation('/')}
              className="transition-opacity hover:opacity-80 flex items-center mb-4"
              aria-label="Ir al inicio"
              disabled={isNavigating}
            >
              <div className="logo-gaia text-2xl tracking-tight">
                GAIA<span className="text-gaia-crimson">SIX</span>
              </div>
            </button>
            <p className="text-sm text-gaia-silver leading-relaxed font-body max-w-xs">
              Elegancia nocturna. Siluetas que definen momentos. Minimalismo con actitud.
            </p>
          </div>

          {/* Columna 2: Contacto Editorial */}
          <div>
            <h3 className="label-gaia text-gaia-black mb-6">CONEXIÓN</h3>
            <div className="space-y-4 text-sm text-gaia-silver font-body">
              <a 
                href="mailto:gaiashowroom@gmail.com"
                className="flex items-center gap-3 hover:text-gaia-crimson transition-colors duration-300 group"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span className="break-all">gaiashowroom@gmail.com</span>
                <ExternalLink size={12} className="text-gaia-silver opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a 
                href="https://wa.me/5492964479923"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-gaia-crimson transition-colors duration-300 group"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>+54 9 2964 479923</span>
                <ExternalLink size={12} className="text-gaia-silver opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <div className="flex items-center gap-3 opacity-80">
                <MapPin size={16} className="flex-shrink-0" />
                <span>Tierra del Fuego, Argentina</span>
              </div>

              <a 
                href="https://instagram.com/gaiasix" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-gaia-crimson transition-colors duration-300 group"
              >
                <Instagram size={16} className="flex-shrink-0" />
                <span>@gaiasix</span>
                <ExternalLink size={12} className="text-gaia-silver opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Columna 3: Experiencia Gaia */}
          <div>
            <h3 className="label-gaia text-gaia-black mb-6">EXPERIENCIA</h3>
            <div className="space-y-4 text-sm text-gaia-silver font-body">
              <div className="flex items-start gap-3">
                <Package size={16} className="flex-shrink-0 mt-0.5 text-gaia-crimson" />
                <div>
                  <p className="font-medium text-gaia-black">Envíos Exclusivos</p>
                  <p className="text-xs mt-1">Entrega prioritaria 24-48hs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CreditCard size={16} className="flex-shrink-0 mt-0.5 text-gaia-crimson" />
                <div>
                  <p className="font-medium text-gaia-black">Plan Sixer</p>
                  <p className="text-xs mt-1">6 cuotas sin interés</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Repeat size={16} className="flex-shrink-0 mt-0.5 text-gaia-crimson" />
                <div>
                  <p className="font-medium text-gaia-black">Cambios Premium</p>
                  <p className="text-xs mt-1">Devoluciones en 7 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Navegación Minimal */}
          <div>
            <h3 className="label-gaia text-gaia-black mb-6">EXPLORAR</h3>
            <div className="space-y-3 text-sm font-body">
              <button 
                onClick={() => handleNavigation('/shop')}
                className="block text-gaia-silver hover:text-gaia-crimson transition-colors duration-300 text-left disabled:opacity-50 w-full"
                disabled={isNavigating}
                aria-label="Explorar colección"
              >
                Colección
              </button>
              <button 
                onClick={() => handleNavigation('/collections')}
                className="block text-gaia-silver hover:text-gaia-crimson transition-colors duration-300 text-left disabled:opacity-50 w-full"
                disabled={isNavigating}
                aria-label="Ver colecciones"
              >
                Ediciones
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="block text-gaia-silver hover:text-gaia-crimson transition-colors duration-300 text-left disabled:opacity-50 w-full"
                disabled={isNavigating}
                aria-label="Conocer nuestra esencia"
              >
                Esencia
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                className="block text-gaia-silver hover:text-gaia-crimson transition-colors duration-300 text-left disabled:opacity-50 w-full"
                disabled={isNavigating}
                aria-label="Contactar"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>

        {/* Separador Elegante */}
        <div className="divider-gaia"></div>

        {/* Footer Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gaia-silver font-body">
          <div className="text-center md:text-left">
            <p className="text-xs tracking-wide">
              © {new Date().getFullYear()} GAIA SIX — ELEGANCIA NOCTURNA
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-xs">
            <button 
              onClick={() => handleNavigation('/privacy')}
              className="hover:text-gaia-black transition-colors duration-300 disabled:opacity-50"
              disabled={isNavigating}
            >
              Privacidad
            </button>
            <span className="text-gaia-border">•</span>
            <button 
              onClick={() => handleNavigation('/terms')}
              className="hover:text-gaia-black transition-colors duration-300 disabled:opacity-50"
              disabled={isNavigating}
            >
              Términos
            </button>
            <span className="text-gaia-border">•</span>
            <button 
              onClick={() => handleNavigation('/shipping')}
              className="hover:text-gaia-black transition-colors duration-300 disabled:opacity-50"
              disabled={isNavigating}
            >
              Envíos
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}