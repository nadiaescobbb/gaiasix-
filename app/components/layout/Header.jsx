"use client";

import { useState } from 'react';
import { ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import Image from 'next/image';
import { useAppContext } from '../../context/AppContext'; 

export default function Header({ 
  currentUser, 
  cartItemsCount, 
  onNavigate, 
  onCartToggle, 
  onLogout,
  currentPage = 'home' 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { wishlistItemsCount } = useAppContext();
  const isActive = (page) => currentPage === page;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="transition-opacity hover:opacity-80"
            aria-label="Ir al inicio"
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

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => onNavigate('shop')} 
              className={`text-sm uppercase tracking-wide transition ${
                isActive('shop') 
                  ? 'text-black font-medium' 
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Tienda
            </button>
            
            <button 
              onClick={() => onNavigate('about')} 
              className={`text-sm uppercase tracking-wide transition ${
                isActive('about') 
                  ? 'text-black font-medium' 
                  : 'text-gray-700 hover:text-black'
              }`}
            >
              Nosotros
            </button>
            
            <button 
              onClick={() => onNavigate('about')} 
              className="text-sm uppercase tracking-wide text-gray-700 hover:text-black transition"
            >
              Contacto
            </button>
          </nav>

          {/* Iconos de Wishlist, Usuario y Carrito */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button 
              onClick={() => onNavigate('wishlist')} 
              className={`hidden md:block transition relative ${
                isActive('wishlist') ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
              }`}
              aria-label="Mis favoritos"
            >
              <Heart size={20} />
              {wishlistItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlistItemsCount > 9 ? '9+' : wishlistItemsCount}
                </span>
              )}
            </button>
            
            {/* Usuario Desktop */}
            {currentUser ? (
              <button 
                onClick={() => onNavigate('profile')} 
                className={`hidden md:block transition ${
                  isActive('profile') ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
                aria-label="Mi perfil"
              >
                <User size={20} />
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('auth')} 
                className={`hidden md:block transition ${
                  isActive('auth') ? 'text-black' : 'text-gray-600 hover:text-black'
                }`}
                aria-label="Iniciar sesión"
              >
                <User size={20} />
              </button>
            )}
            
            {/* Carrito */}
            <button 
              onClick={onCartToggle} 
              className="relative text-gray-600 hover:text-black transition"
              aria-label={`Carrito de compras, ${cartItemsCount} ${cartItemsCount === 1 ? 'item' : 'items'}`}
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </button>

            {/* Botón de menú móvil */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="md:hidden text-gray-600 hover:text-black transition"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 space-y-1" role="navigation">
            <button 
              onClick={() => { 
                onNavigate('shop'); 
                setMenuOpen(false); 
              }} 
              className={`block w-full text-left py-3 px-4 text-sm uppercase tracking-wide transition rounded ${
                isActive('shop')
                  ? 'bg-gray-100 text-black font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tienda
            </button>
            
            <button 
              onClick={() => { 
                onNavigate('about'); 
                setMenuOpen(false); 
              }} 
              className={`block w-full text-left py-3 px-4 text-sm uppercase tracking-wide transition rounded ${
                isActive('about')
                  ? 'bg-gray-100 text-black font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Nosotros
            </button>

            <button 
              onClick={() => { 
                onNavigate('about'); 
                setMenuOpen(false); 
              }} 
              className="block w-full text-left py-3 px-4 text-sm uppercase tracking-wide text-gray-700 hover:bg-gray-50 transition rounded"
            >
              Contacto
            </button>

            {/* Separador */}
            <div className="border-t border-gray-200 my-2"></div>

            {/* Wishlist Mobile */}
            <button 
              onClick={() => { 
                onNavigate('wishlist'); 
                setMenuOpen(false); 
              }} 
              className={`block w-full text-left py-3 px-4 text-sm transition rounded ${
                isActive('wishlist')
                  ? 'bg-gray-100 text-red-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart size={16} />
                <span>Favoritos</span>
                {wishlistItemsCount > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItemsCount}
                  </span>
                )}
              </div>
            </button>

            {/* Usuario Mobile */}
            {currentUser ? (
              <>
                <button 
                  onClick={() => { 
                    onNavigate('profile'); 
                    setMenuOpen(false); 
                  }} 
                  className={`block w-full text-left py-3 px-4 text-sm transition rounded ${
                    isActive('profile')
                      ? 'bg-gray-100 text-black font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Mi Perfil</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => { 
                    onLogout(); 
                    setMenuOpen(false); 
                  }} 
                  className="block w-full text-left py-3 px-4 text-sm text-gray-700 hover:bg-gray-50 transition rounded"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button 
                onClick={() => { 
                  onNavigate('auth'); 
                  setMenuOpen(false); 
                }} 
                className={`block w-full text-left py-3 px-4 text-sm transition rounded ${
                  isActive('auth')
                    ? 'bg-gray-100 text-black font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>Ingresar</span>
                </div>
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}