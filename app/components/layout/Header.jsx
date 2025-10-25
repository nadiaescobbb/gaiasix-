import React from 'react';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';

export default function Header({ 
  currentUser, 
  cartItemsCount, 
  onNavigate, 
  onCartToggle, 
  onLogout 
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => handleNavigate('home')} 
          className="font-heading text-2xl font-bold tracking-wider hover:text-gray-300 transition"
        >
          GAIA SIX
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-body">
          <button onClick={() => handleNavigate('home')} className="hover:text-gray-300 transition">
            Inicio
          </button>
          <button onClick={() => handleNavigate('shop')} className="hover:text-gray-300 transition">
            Colección
          </button>
          <button onClick={() => handleNavigate('about')} className="hover:text-gray-300 transition">
            Sobre Nosotras
          </button>
          <button onClick={() => handleNavigate('contact')} className="hover:text-gray-300 transition">
            Contacto
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => handleNavigate('account')}
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                <User size={20} />
                <span className="text-sm">{currentUser.name}</span>
              </button>
              <button 
                onClick={onLogout}
                className="hover:text-gray-300 transition"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNavigate('auth')}
              className="hidden md:flex items-center gap-2 hover:text-gray-300 transition"
            >
              <User size={20} />
              <span className="text-sm">Ingresar</span>
            </button>
          )}
          
          <button 
            onClick={onCartToggle}
            className="relative hover:text-gray-300 transition"
          >
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden hover:text-gray-300 transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-900 px-4 py-4 space-y-3 font-body">
          <button onClick={() => handleNavigate('home')} className="block w-full text-left py-2 hover:text-gray-300 transition">
            Inicio
          </button>
          <button onClick={() => handleNavigate('shop')} className="block w-full text-left py-2 hover:text-gray-300 transition">
            Colección
          </button>
          <button onClick={() => handleNavigate('about')} className="block w-full text-left py-2 hover:text-gray-300 transition">
            Sobre Nosotras
          </button>
          <button onClick={() => handleNavigate('contact')} className="block w-full text-left py-2 hover:text-gray-300 transition">
            Contacto
          </button>
          {currentUser ? (
            <>
              <button onClick={() => handleNavigate('account')} className="block w-full text-left py-2 hover:text-gray-300 transition">
                Mi Cuenta
              </button>
              <button onClick={onLogout} className="block w-full text-left py-2 hover:text-gray-300 transition">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button onClick={() => handleNavigate('auth')} className="block w-full text-left py-2 hover:text-gray-300 transition">
              Ingresar / Registrarse
            </button>
          )}
        </nav>
      )}
    </header>
  );
}