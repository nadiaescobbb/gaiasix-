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
    // El loading se limpia automáticamente cuando la navegación completa
    setTimeout(() => setIsNavigating(false), 1000);
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1: Marca y Descripción */}
          <div className="lg:col-span-1">
            <button 
              onClick={() => handleNavigation('/')}
              className="transition-opacity hover:opacity-80 mb-4 inline-block"
              aria-label="Ir al inicio"
              disabled={isNavigating}
            >
              <Image 
                src="/gaialogo-header.png" 
                alt="GAIA SIX"
                width={120}
                height={40}
                priority
                style={{ 
                  width: 'auto', 
                  height: 'auto' 
                }}
              />
            </button>
            <p className="text-sm text-gray-600 leading-relaxed">
              Looks de noche sin vueltas. Ropa pensada para destacar sin esfuerzo
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Contacto</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <a 
                href="mailto:gaiashowroom@gmail.com"
                className="flex items-center gap-2 hover:text-red-800 transition-colors group"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span className="break-all">gaiashowrrom@gmail.com</span>
                <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a 
                href="https://wa.me/5492964479923"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-red-800 transition-colors group"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>+54 9 2964 479923</span>
                <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <div className="flex items-center gap-2">
                <MapPin size={16} className="flex-shrink-0" />
                <span>Tierra del Fuego, Argentina</span>
              </div>

              <a 
                href="https://instagram.com/gaiasix" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-red-800 transition-colors group"
              >
                <Instagram size={16} className="flex-shrink-0" />
                <span>@gaiasix</span>
                <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Columna 3: Información */}
          <div>
            <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Info</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Package size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Envíos</p>
                  <p className="text-xs">A todo el país en 24-48hs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CreditCard size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Cuotas</p>
                  <p className="text-xs">Hasta 3 cuotas sin interés</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Repeat size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Cambios</p>
                  <p className="text-xs">Dentro de los 7 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Navegación rápida */}
          <div>
            <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Enlaces</h3>
            <div className="space-y-2 text-sm">
              <button 
                onClick={() => handleNavigation('/shop')}
                className="block text-gray-600 hover:text-red-800 transition-colors text-left disabled:opacity-50"
                disabled={isNavigating}
                aria-label="Ir a la tienda"
              >
                Tienda
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="block text-gray-600 hover:text-red-800 transition-colors text-left disabled:opacity-50"
                disabled={isNavigating}
                aria-label="Conocer sobre nosotros"
              >
                Nosotros
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="block text-gray-600 hover:text-red-800 transition-colors text-left disabled:opacity-50"
                disabled={isNavigating}
                aria-label="Contactarnos"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} Gaia Six. Todos los derechos reservados.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => handleNavigation('/terms')}
                className="hover:text-gray-800 transition-colors disabled:opacity-50"
                disabled={isNavigating}
              >
                Términos y Condiciones
              </button>
              <span>·</span>
              <button 
                onClick={() => handleNavigation('/privacy')}
                className="hover:text-gray-800 transition-colors disabled:opacity-50"
                disabled={isNavigating}
              >
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}