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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home' as Page, label: 'Inicio' },
    { id: 'shop' as Page, label: 'Prendas' },
    { id: 'about' as Page, label: 'Esencia' },
    { id: 'contact' as Page, label: 'Contacto' }
  ];

  return (
    <>
      {/* HEADER */}
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
          : 'bg-white py-6'
        }
      `}>
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between">
            
            {/* LOGO CON IMAGEN */}
         {/* LOGO CON IMAGEN */}
          <div className="flex-1 md:flex-none">
            <button 
              onClick={() => onNavigate('home')}
              className="hover:opacity-80 transition-opacity flex items-center"
            >
              <img 
                src="/logo.avif" 
                alt="Gaia Six"
                className={`transition-all duration-500 object-contain ${
                  isScrolled ? 'h-10 md:h-12' : 'h-14 md:h-16'
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.avif";
                }}
              />
            </button>
          </div>

            {/* NAVEGACIÓN CENTRAL */}
            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    text-xs uppercase tracking-[0.25em] transition-all duration-300 font-light
                    ${currentPage === item.id 
                      ? 'text-red-500' 
                      : 'text-neutral-600 hover:text-black'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* ICONOS */}
            <div className="flex items-center gap-4 flex-1 justify-end">
              
              {/* Buscador */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:text-red-500 transition-colors group"
                aria-label="Buscar"
              >
                <Search size={18} className="text-neutral-500 group-hover:text-red-500 transition-colors" />
              </button>

              {/* Cuenta */}
              <button 
                onClick={() => onNavigate(currentUser ? 'profile' : 'auth')}
                className="hidden md:block p-2 hover:text-red-500 transition-colors group"
                aria-label="Cuenta"
              >
                <User size={18} className="text-neutral-500 group-hover:text-red-500 transition-colors" />
              </button>

              {/* Favoritos */}
              <button 
                onClick={() => onNavigate('wishlist')}
                className="hidden md:block p-2 hover:text-red-500 transition-colors group relative"
                aria-label="Favoritos"
              >
                <Heart size={18} className="text-neutral-500 group-hover:text-red-500 transition-colors" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlistItemsCount}
                  </span>
                )}
              </button>

              {/* Carrito */}
              <button 
                onClick={onCartToggle}
                className="p-2 hover:text-red-500 transition-colors group relative"
                aria-label="Carrito"
              >
                <ShoppingBag size={18} className="text-neutral-500 group-hover:text-red-500 transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Menú Mobile */}
              <button 
                className="md:hidden p-2 hover:text-red-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menú"
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-red-500" />
                ) : (
                  <Menu size={20} className="text-neutral-500" />
                )}
              </button>
            </div>
          </div>

          {/* BUSCADOR EXPANDIBLE */}
          {isSearchOpen && (
            <div className="mt-6 animate-fade-in">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Buscar prendas, estilos, colecciones..."
                  className="w-full bg-transparent border-0 border-b border-neutral-200 py-3 px-0 text-black placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors text-sm"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MENÚ MÓVIL */}
      <div className={`
        fixed inset-0 z-40 bg-white transform transition-transform duration-500 ease-out md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="pt-24 pb-8 px-8 h-full flex flex-col">
          
          {/* Navegación móvil */}
          <nav className="flex-1">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    block w-full text-left py-4 text-xl font-light tracking-tight transition-colors
                    ${currentPage === item.id 
                      ? 'text-red-500' 
                      : 'text-black hover:text-red-500'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Sección de usuario móvil */}
              <div className="pt-8 mt-8 border-t border-neutral-200 space-y-4">
                <button 
                  onClick={() => {
                    onNavigate(currentUser ? 'profile' : 'auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-neutral-600 hover:text-red-500 transition-colors"
                >
                  <User size={18} />
                  <span className="text-sm uppercase tracking-widest">
                    {currentUser ? 'Mi Cuenta' : 'Ingresar'}
                  </span>
                </button>
                
                <button 
                  onClick={() => {
                    onNavigate('wishlist');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full text-neutral-600 hover:text-red-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Heart size={18} />
                    <span className="text-sm uppercase tracking-widest">Favoritos</span>
                  </div>
                  {wishlistItemsCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {wishlistItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Footer móvil */}
          <div className="pt-8 border-t border-neutral-200">
            <div className="text-xs text-neutral-500 space-y-2">
              <p>gaiashowroom@gmail.com</p>
              <p>+54 9 2964 479923</p>
              <p className="uppercase tracking-widest">@gaiasix</p>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SPACER para compensar el header fixed */}
      <div className={isScrolled ? 'h-16' : 'h-20'}></div>
    </>
  );
}