import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer({ currentUser, onNavigate }) {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">GAIA SIX</h3>
            <p className="font-body text-gray-400 text-sm">
              Tu estilo, tu libertad, tu momento.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold mb-4">Navegación</h4>
            <ul className="font-body text-gray-400 space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition">
                  Colección
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  Sobre Nosotras
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition">
                  Contacto
                </button>
              </li>
              {currentUser && (
                <li>
                  <button onClick={() => onNavigate('account')} className="hover:text-white transition">
                    Mi Cuenta
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold mb-4">Información</h4>
            <ul className="font-body text-gray-400 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Guía de Talles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold mb-4">Seguinos</h4>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/gaiasix" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-700 transition"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://wa.me/5491112345678" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-700 transition"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center font-body text-gray-400 text-sm">
          <p>© 2025 Gaia Six. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}