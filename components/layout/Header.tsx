"use client";

import { useState, useEffect } from "react";
import { type Page } from '../../lib/types'; // Ajusta la ruta según tu estructura

// Define las props que recibirá el Header
interface HeaderProps {
  currentUser?: any; // O el tipo específico de User que tengas
  cartItemsCount: number;
  wishlistItemsCount: number;
  onNavigate: (page: Page) => void;
  onCartToggle: () => void;
  onLogout: () => void;
  currentPage: Page;
}

export default function Header({ 
  cartItemsCount = 0, 
  wishlistItemsCount = 0,
  onNavigate,
  onCartToggle,
  onLogout,
  currentPage,
  currentUser 
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Usa las props en lugar de los estados hardcodeados
  const cartCount = cartItemsCount;
  const wishlistCount = wishlistItemsCount;
  const isLoggedIn = !!currentUser;

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú mobile al cambiar tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para navegación mejorada
  const handleNavigation = (page: Page) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md' 
            : 'bg-white'
        } border-b border-gray-200`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* ========== LOGO ========== */}
            <button 
              onClick={() => onNavigate('home')}
              className="transition-opacity hover:opacity-70 flex items-center group"
              aria-label="Ir al inicio"
            >
              <img
                src="/gaialogo-header.png"
                alt="GAIA SIX"
                className="w-auto h-16 md:h-24 object-contain"
              />
            </button>

            {/* ========== NAV DESKTOP ========== */}
            <nav className="hidden md:flex items-center space-x-10 text-sm">
              {[
                { label: "Prendas", page: "shop" as Page },
                { label: "La Marca", page: "about" as Page },
                { label: "Contacto", page: "contact" as Page },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`relative uppercase tracking-wider transition-colors duration-300 group ${
                    currentPage === item.page 
                      ? 'text-black font-medium' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#AF161F] transition-all duration-300 ${
                    currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </nav>

            {/* ========== ICONOS ========== */}
            <div className="flex items-center space-x-4 md:space-x-5">
              
              {/* Wishlist */}
              <button
                onClick={() => onNavigate('wishlist')}
                className="relative group transition-transform hover:scale-110 duration-300"
                aria-label="Tus favoritos"
              >
                <svg 
                  className="w-6 h-6 text-gray-700 group-hover:text-[#AF161F] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#AF161F] text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 animate-pulse">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </button>

              {/* Usuario */}
              <button
                onClick={() => onNavigate(currentUser ? 'profile' : 'auth')}
                className="transition-transform hover:scale-110 duration-300 group"
                aria-label="Mi cuenta"
              >
                <svg 
                  className="w-6 h-6 text-gray-700 group-hover:text-[#AF161F] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </button>

              {/* Carrito */}
              <button
                onClick={onCartToggle}
                className="relative group transition-transform hover:scale-110 duration-300"
                aria-label="Bolsa de compras"
              >
                <svg 
                  className="w-6 h-6 text-gray-800 group-hover:text-[#AF161F] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* Toggle menú mobile */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-gray-700 hover:text-[#AF161F] transition-colors"
                aria-label="Menú"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ========== MENU MOBILE ========== */}
          {menuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200 space-y-1 animate-fade-in">
              {[
                { label: "Prendas", page: "shop" as Page },
                { label: "La Marca", page: "about" as Page },
                { label: "Contacto", page: "contact" as Page },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className={`block w-full text-left py-3 px-4 text-sm uppercase tracking-wider rounded transition-all ${
                    currentPage === item.page
                      ? 'bg-gray-50 text-black font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* WISHLIST MOBILE */}
              <button
                onClick={() => handleNavigation('wishlist')}
                className="flex items-center gap-3 py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-black rounded transition-all w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Tus Favoritos
                {wishlistCount > 0 && (
                  <span className="ml-auto bg-[#AF161F] text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* USUARIO MOBILE */}
              <button
                onClick={() => handleNavigation(currentUser ? 'profile' : 'auth')}
                className="flex items-center gap-3 py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-black rounded transition-all w-full text-left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {currentUser ? "Mi Cuenta" : "Iniciar Sesión"}
              </button>

              {/* Cerrar sesión */}
              {currentUser && (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left flex items-center gap-3 py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 hover:text-black rounded transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar Sesión
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Spacer para que el contenido no quede detrás del header fixed */}
      <div className="h-20"></div>
    </>
  );
}