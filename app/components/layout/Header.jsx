"use client";

import { useState } from 'react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import Image from "next/image";

export default function Header({ 
  currentUser, 
  cartItemsCount, 
  onNavigate, 
  onCartToggle, 
  onLogout 
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
    {/* Logo */}
    <button 
      onClick={() => onNavigate('home')}
      className="transition-opacity hover:opacity-80"
      >
      <Image 
          src="/logo.avif"
          alt="GAIA SIX"
          width={120}
          height={40}
          priority     
          />
    </button>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => onNavigate('shop')} 
              className="text-sm uppercase tracking-wide hover:text-red-800 transition"
            >
              Prendas
            </button>
            <button 
              onClick={() => onNavigate('shop')} 
              className="text-sm uppercase tracking-wide hover:text-red-800 transition"
            >
              Looks
            </button>
            <button 
              onClick={() => onNavigate('about')} 
              className="text-sm uppercase tracking-wide hover:text-red-800 transition"
            >
              Contacto
            </button>
          </nav>

          {/* Iconos de Usuario y Carrito */}
          <div className="flex items-center space-x-6">
            {currentUser ? (
              <button onClick={() => onNavigate('profile')} className="hidden md:block">
                <User size={20} className="hover:text-red-800 transition" />
              </button>
            ) : (
              <button onClick={() => onNavigate('auth')} className="hidden md:block">
                <User size={20} className="hover:text-red-800 transition" />
              </button>
            )}
            
            <button onClick={onCartToggle} className="relative">
              <ShoppingBag size={20} className="hover:text-red-800 transition" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Botón de menú móvil */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 space-y-3">
            <button 
              onClick={() => { onNavigate('shop'); setMenuOpen(false); }} 
              className="block w-full text-left py-2 text-sm"
            >
              Tienda
            </button>
            <button 
              onClick={() => { onNavigate('about'); setMenuOpen(false); }} 
              className="block w-full text-left py-2 text-sm"
            >
              Nosotros
            </button>
            {currentUser ? (
              <>
                <button 
                  onClick={() => { onNavigate('profile'); setMenuOpen(false); }} 
                  className="block w-full text-left py-2 text-sm"
                >
                  Mi Perfil
                </button>
                <button 
                  onClick={() => { onLogout(); setMenuOpen(false); }} 
                  className="block w-full text-left py-2 text-sm"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button 
                onClick={() => { onNavigate('auth'); setMenuOpen(false); }} 
                className="block w-full text-left py-2 text-sm"
              >
                Ingresar
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}