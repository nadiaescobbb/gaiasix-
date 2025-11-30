// components/layout/Header.tsx - VERSIÓN MEJORADA
'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { type User as UserType, type Page } from '../../lib/types';

interface HeaderProps {
  currentUser: UserType | null;
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
  onLogout,
  currentPage
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    closeMobileMenu();
  };

  const navItems = [
    { id: 'shop', label: 'Colección' },
    { id: 'collections', label: 'Ediciones' },
    { id: 'about', label: 'Esencia' }
  ] as const;

  return (
    <>
      {/* HEADER GAIA SIX - ESTILO EDITORIAL */}
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-gaia-white/95 backdrop-blur-md border-b border-gaia-border py-3 shadow-sm' 
          : 'bg-gaia-white py-5'
        }
      `}>
        <div className="container-gaia">
          <div className="flex items-center justify-between">
            
            {/* LOGO - CENTRALIZADO EN MOBILE */}
            <div className="flex-1 md:flex-none">
              <Link 
                href="/" 
                className="logo-gaia text-xl md:text-2xl tracking-tight hover:opacity-70 transition-opacity inline-block"
                onClick={() => handleNavClick('home')}
              >
                GAIA<span className="text-gaia-crimson font-light">SIX</span>
              </Link>
            </div>

            {/* NAVEGACIÓN CENTRAL - ESTILO EDITORIAL */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 transform -translate-x-1/2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id as Page)}
                  className={`
                    nav-link-gaia text-xs uppercase tracking-[0.2em] transition-all duration-300
                    ${currentPage === item.id 
                      ? 'text-gaia-crimson font-medium' 
                      : 'text-gaia-black hover:text-gaia-crimson font-light'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* ICONOS DERECHA - MINIMALISTAS */}
            <div className="flex items-center gap-3 md:gap-4 flex-1 justify-end">
              
              {/* Buscador Elegante */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:text-gaia-crimson transition-colors group relative"
                aria-label="Buscar"
              >
                <Search size={18} className="text-gaia-silver group-hover:text-gaia-crimson transition-colors" />
              </button>

              {/* Cuenta - Icono Sutil */}
              <button 
                onClick={() => handleNavClick(currentUser ? 'profile' : 'auth')}
                className="p-2 hover:text-gaia-crimson transition-colors group"
                aria-label={currentUser ? 'Mi cuenta' : 'Iniciar sesión'}
              >
                <User size={18} className="text-gaia-silver group-hover:text-gaia-crimson transition-colors" />
              </button>

              {/* Favoritos - Con Badge Sutil */}
              <button 
                onClick={() => handleNavClick('wishlist')}
                className="p-2 hover:text-gaia-crimson transition-colors group relative"
                aria-label="Favoritos"
              >
                <Heart size={18} className="text-gaia-silver group-hover:text-gaia-crimson transition-colors" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gaia-crimson text-gaia-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlistItemsCount}
                  </span>
                )}
              </button>

              {/* Carrito - Con Badge Elegante */}
              <button 
                onClick={onCartToggle}
                className="p-2 hover:text-gaia-crimson transition-colors group relative"
                aria-label="Carrito"
              >
                <ShoppingBag size={18} className="text-gaia-silver group-hover:text-gaia-crimson transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gaia-crimson text-gaia-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Menú Mobile - Icono Minimal */}
              <button 
                className="md:hidden p-2 hover:text-gaia-crimson transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menú"
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-gaia-crimson" />
                ) : (
                  <Menu size={20} className="text-gaia-silver" />
                )}
              </button>
            </div>
          </div>

          {/* BUSCADOR EXPANDIBLE - ESTILO EDITORIAL */}
          {isSearchOpen && (
            <div className="mt-4 animate-fade-in-gaia">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar siluetas, texturas, momentos..."
                  className="w-full bg-transparent border-0 border-b border-gaia-border py-2 px-0 text-gaia-black placeholder-gaia-silver focus:outline-none focus:border-gaia-crimson transition-colors text-sm font-light"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gaia-silver hover:text-gaia-crimson transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* MENÚ MÓVIL - ESTILO GALERÍA EDITORIAL */}
      <div className={`
        fixed inset-0 z-40 bg-gaia-white transform transition-transform duration-500 ease-out md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="pt-20 pb-8 px-6 h-full flex flex-col">
          
          {/* Header móvil minimalista */}
          <div className="flex items-center justify-between mb-12">
            <div className="logo-gaia text-xl">
              GAIA<span className="text-gaia-crimson">SIX</span>
            </div>
            <button 
              onClick={closeMobileMenu}
              className="p-2 text-gaia-silver hover:text-gaia-crimson transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navegación móvil - Tipografía elegante */}
          <nav className="flex-1">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id as Page)}
                  className={`
                    block w-full text-left py-4 border-b border-gaia-border transition-all duration-300
                    ${currentPage === item.id 
                      ? 'text-gaia-crimson font-medium' 
                      : 'text-gaia-black hover:text-gaia-crimson font-light'
                    }
                  `}
                >
                  <span className="text-lg tracking-wide">{item.label}</span>
                </button>
              ))}
              
              {/* Acciones de usuario en móvil */}
              <div className="pt-6 space-y-4">
                <button 
                  onClick={() => handleNavClick(currentUser ? 'profile' : 'auth')}
                  className="block w-full text-left py-3 text-gaia-silver hover:text-gaia-crimson transition-colors text-sm uppercase tracking-widest"
                >
                  {currentUser ? 'Mi Cuenta' : 'Ingresar'}
                </button>
                
                <button 
                  onClick={() => handleNavClick('wishlist')}
                  className="flex items-center justify-between w-full text-left py-3 text-gaia-silver hover:text-gaia-crimson transition-colors text-sm uppercase tracking-widest"
                >
                  <span>Favoritos</span>
                  {wishlistItemsCount > 0 && (
                    <span className="bg-gaia-crimson text-gaia-white text-xs px-2 py-1 rounded-full">
                      {wishlistItemsCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </nav>

          {/* Información de contacto móvil - Estilo minimal */}
          {currentUser && (
            <div className="pt-6 border-t border-gaia-border">
              <div className="text-xs text-gaia-silver mb-3">
                Conectado como <span className="text-gaia-black">{currentUser.email}</span>
              </div>
              <button 
                onClick={() => {
                  onLogout();
                  closeMobileMenu();
                }}
                className="text-xs text-gaia-crimson hover:underline uppercase tracking-widest"
              >
                Cerrar sesión
              </button>
            </div>
          )}

          {/* Footer móvil - Texto sutil */}
          <div className="pt-8 border-t border-gaia-border">
            <div className="text-xs text-gaia-silver space-y-2 font-light">
              <p>gaiashowroom@gmail.com</p>
              <p>+54 9 2964 479923</p>
              <p className="uppercase tracking-widest">@gaiasix</p>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY PARA MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gaia-black/20 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}