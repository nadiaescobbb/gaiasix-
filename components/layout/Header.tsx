'use client'

import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { type Page } from '../../lib/types';

interface HeaderProps {
  currentUser: any | null;
  cartItemsCount: number;
  wishlistItemsCount: number;
  onNavigate: (page: Page) => void;
  onCartToggle: () => void;
  onLogout: () => void;
  currentPage: Page;
}

export default function Header({
  currentUser,
  cartItemsCount,
  wishlistItemsCount,
  onNavigate,
  onCartToggle,
  currentPage,
  onLogout
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Trigger más rápido
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home' as Page, label: 'Inicio' },
    { id: 'shop' as Page, label: 'Prendas' },
    { id: 'about' as Page, label: 'Nosotras' },
    { id: 'contact' as Page, label: 'Contacto' }
  ];

  return (
    <>
      {/* HEADER FIJO CON BANNER */}
      <div className="fixed top-0 left-0 right-0 z-50">
        
        {/* BANNER SUPERIOR — Más suave, menos agresivo */}
        <div className="bg-gaia-black-soft text-gaia-bone py-1.5 overflow-hidden">
          <div className="container-gaia">
            <div className="flex items-center justify-center whitespace-nowrap">
              <div className="flex space-x-6 animate-marquee">
                {[...Array(3)].map((_, blockIndex) => (
                  <div key={blockIndex} className="flex items-center font-body">
                    <span className="text-[10px] font-medium uppercase tracking-wider">
                      15% OFF x TRANSFERENCIA
                    </span>
                    <span className="mx-6 text-gaia-ash">•</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">
                      ENVÍO GRATIS +$150.000
                    </span>
                    <span className="mx-6 text-gaia-ash">•</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">
                      3 & 6 CUOTAS SIN INTERÉS
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HEADER PRINCIPAL — Compacto y elegante */}
        <header className={`
          transition-all duration-300 bg-gaia-bone border-b
          ${isScrolled 
            ? 'bg-gaia-bone/95 backdrop-blur-lg shadow-sm py-2 border-gaia-border' 
            : 'bg-gaia-bone py-4 border-transparent'
          }
        `}>
          <div className="container-gaia">
            <div className="flex items-center justify-between">
              
              {/* LOGO — Tamaño reducido y proporcional */}
              <div className="flex-1 md:flex-none">
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:opacity-80 transition-opacity duration-300 flex items-center"
                >
                  <img 
                    src="/gaialogo-header.png" 
                    alt="Gaia Six"
                    className={`transition-all duration-300 object-contain ${
                      isScrolled ? 'h-12 md:h-14' : 'h-16 md:h-18'
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/logo.avif";
                    }}
                  />
                </button>
              </div>

              {/* NAVEGACIÓN CENTRAL */}
              <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
                {navItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`
                      font-body text-[10px] uppercase tracking-[0.25em] transition-colors duration-300
                      ${currentPage === item.id 
                        ? 'text-gaia-crimson font-medium' 
                        : 'text-gaia-ash hover:text-gaia-black-soft font-light'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* ICONOS — Más espaciados y elegantes */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                
                {/* Buscador */}
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:text-gaia-crimson transition-colors duration-300 group"
                  aria-label="Buscar"
                >
                  <Search size={16} className="text-gaia-concrete group-hover:text-gaia-crimson transition-colors" />
                </button>

                {/* Cuenta */}
                <button 
                  onClick={() => onNavigate(currentUser ? 'profile' : 'auth')}
                  className="hidden md:block p-2 hover:text-gaia-crimson transition-colors duration-300 group"
                  aria-label="Cuenta"
                >
                  <User size={16} className="text-gaia-concrete group-hover:text-gaia-crimson transition-colors" />
                </button>

                {/* Favoritos */}
                <button 
                  onClick={() => onNavigate('wishlist')}
                  className="hidden md:block p-2 hover:text-gaia-crimson transition-colors duration-300 group relative"
                  aria-label="Favoritos"
                >
                  <Heart size={16} className="text-gaia-concrete group-hover:text-gaia-crimson transition-colors" />
                  {wishlistItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gaia-crimson text-gaia-bone text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body font-medium">
                      {wishlistItemsCount}
                    </span>
                  )}
                </button>

                {/* Carrito */}
                <button 
                  onClick={onCartToggle}
                  className="p-2 hover:text-gaia-crimson transition-colors duration-300 group relative"
                  aria-label="Carrito"
                >
                  <ShoppingBag size={16} className="text-gaia-concrete group-hover:text-gaia-crimson transition-colors" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gaia-crimson text-gaia-bone text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body font-medium">
                      {cartItemsCount}
                    </span>
                  )}
                </button>

                {/* Menú Mobile */}
                <button 
                  className="md:hidden p-2 hover:text-gaia-crimson transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Menú"
                >
                  {isMobileMenuOpen ? (
                    <X size={18} className="text-gaia-crimson" />
                  ) : (
                    <Menu size={18} className="text-gaia-concrete" />
                  )}
                </button>
              </div>
            </div>

            {/* BUSCADOR EXPANDIBLE */}
            {isSearchOpen && (
              <div className="mt-4 animate-fade-in">
                <div className="relative max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Buscar prendas, estilos, colecciones..."
                    className="w-full bg-transparent border-0 border-b border-gaia-border-solid py-2 px-0 text-gaia-black-soft placeholder-gaia-silver focus:outline-none focus:border-gaia-crimson transition-colors duration-300 text-sm font-body font-light"
                    autoFocus
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gaia-concrete hover:text-gaia-crimson transition-colors duration-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* MENÚ MÓVIL — Más suave y coherente */}
      <div className={`
        fixed inset-0 z-40 bg-gaia-bone transform transition-transform duration-300 ease-out md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="pt-20 pb-8 px-6 h-full flex flex-col">
          
          {/* Navegación móvil */}
          <nav className="flex-1">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    block w-full text-left py-3 font-display text-2xl tracking-tight transition-colors duration-300
                    ${currentPage === item.id 
                      ? 'text-gaia-crimson' 
                      : 'text-gaia-black-soft hover:text-gaia-crimson'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Sección de usuario móvil */}
              <div className="pt-6 mt-6 border-t border-gaia-border space-y-3">
                <button 
                  onClick={() => {
                    onNavigate(currentUser ? 'profile' : 'auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-gaia-ash hover:text-gaia-crimson transition-colors duration-300"
                >
                  <User size={16} />
                  <span className="font-body text-xs uppercase tracking-[0.2em]">
                    {currentUser ? 'Mi Cuenta' : 'Ingresar'}
                  </span>
                </button>
                
                <button 
                  onClick={() => {
                    onNavigate('wishlist');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full text-gaia-ash hover:text-gaia-crimson transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={16} />
                    <span className="font-body text-xs uppercase tracking-[0.2em]">Favoritos</span>
                  </div>
                  {wishlistItemsCount > 0 && (
                    <span className="bg-gaia-crimson text-gaia-bone text-[9px] px-2 py-0.5 rounded-full font-body font-medium">
                      {wishlistItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Footer móvil */}
          <div className="pt-6 border-t border-gaia-border">
            <div className="font-body text-[10px] text-gaia-ash space-y-1.5">
              <p>gaiashowroom@gmail.com</p>
              <p>+54 9 2964 479923</p>
              <p className="uppercase tracking-[0.2em]">@gaiasix</p>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gaia-black-soft/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SPACER */}
      <div className={isScrolled ? 'h-[68px]' : 'h-[88px]'}></div>
    </>
  );
}