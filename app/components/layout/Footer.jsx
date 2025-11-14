"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin, Package, CreditCard, Repeat } from 'lucide-react';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1: Marca y Descripción */}
          <div className="md:col-span-1">
            <button 
              onClick={() => router.push('/')}
              className="transition-opacity hover:opacity-80 mb-4 inline-block"
              aria-label="Ir al inicio"
            >
              <Image 
                src="/logo.avif"
                alt="GAIA SIX"
                width={120}
                height={40}
                priority
              />
            </button>
            <p className="text-sm text-gray-600 leading-relaxed">
              Looks de noche sin vueltas. Ropa pensada para que te sientas cómoda y hermosa 
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Contacto</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <a 
                href="mailto:gaiashowrrom@gmail.com"
                className="flex items-center gap-2 hover:text-red-800 transition-colors"
              >
                <Mail size={16} className="flex-shrink-0" />
                <span className="break-all">gaiashowrrom@gmail.com</span>
              </a>
              
              <a 
                href="https://wa.me/5492964479923"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-red-800 transition-colors"
              >
                <Phone size={16} className="flex-shrink-0" />
                <span>+54 9 2964 479923</span>
              </a>
              
              <div className="flex items-center gap-2">
                <MapPin size={16} className="flex-shrink-0" />
                <span>Tierra del Fuego, Argentina</span>
              </div>

              <a 
                href="https://instagram.com/gaiasix" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-red-800 transition-colors"
              >
                <Instagram size={16} className="flex-shrink-0" />
                <span>@gaiasix</span>
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
                  <p className="text-xs">Hasta 6 cuotas sin interés</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Repeat size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Cambios</p>
                  <p className="text-xs">Dentro de los 15 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Navegación rápida */}
          <div>
            <h3 className="text-sm uppercase tracking-wide font-medium mb-4">Enlaces</h3>
            <div className="space-y-2 text-sm">
              <button 
                onClick={() => router.push('/')}
                className="block text-gray-600 hover:text-red-800 transition-colors"
              >
                Inicio
              </button>
              <button 
                onClick={() => router.push('/')}
                className="block text-gray-600 hover:text-red-800 transition-colors"
              >
                Tienda
              </button>
              <button 
                onClick={() => router.push('/')}
                className="block text-gray-600 hover:text-red-800 transition-colors"
              >
                Nosotros
              </button>
              <button 
                onClick={() => router.push('/')}
                className="block text-gray-600 hover:text-red-800 transition-colors"
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
              <button className="hover:text-gray-800 transition-colors">
                Términos y Condiciones
              </button>
              <span>·</span>
              <button className="hover:text-gray-800 transition-colors">
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}