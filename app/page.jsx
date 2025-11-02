"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, Menu, X, Instagram, Mail, Phone, MapPin } from 'lucide-react';


// ===== DATA =====
const PRODUCTS = [
  {
    id: 1,
    name: 'top adara',
    category: 'tops',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
    sizes: ['S', 'M'],
  },
  {
    id: 2,
    name: 'mini adara',
    category: 'faldas',
    price: 12300,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    sizes: ['S', 'M'],
  },
  {
    id: 3,
    name: 'blusa albany',
    category: 'blusas',
    price: 20550,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 4,
    name: 'set total black',
    category: 'set',
    price: 15670,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    sizes: ['S', 'M'],
  },
  {
    id: 5,
    name: 'top borgo',
    category: 'tops',
    price: 12450,
    image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 6,
    name: 'vestido slip negro',
    category: 'vestidos',
    price: 28500,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    sizes: ['S', 'M', 'L'],
  },
];

const CATEGORIES = [
  { id: 'all', name: 'Todo' },
  { id: 'vestidos', name: 'Vestidos' },
  { id: 'blusas', name: 'Blusas' },
  { id: 'pantalones', name: 'Pantalones' },
  { id: 'faldas', name: 'Faldas' },
  { id: 'set', name: 'Set' },
  { id: 'tops', name: 'Tops' },
];

// ===== UTILS =====
const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const countCartItems = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// ===== HOOKS =====
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, error: 'Credenciales incorrectas' };
  };

  const register = (userData) => {
    const newUser = { 
      ...userData, 
      id: Date.now(),
      orders: []
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return { currentUser, login, register, logout };
};

const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
    } else {
      setCart(cart.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const clearCart = () => setCart([]);

  return {
    cart,
    cartTotal: calculateCartTotal(cart),
    cartItemsCount: countCartItems(cart),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};

// ===== COMPONENTS =====
const Header = ({ currentUser, cartItemsCount, onNavigate, onCartToggle, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => onNavigate('home')}
            className="transition-opacity hover:opacity-80"
          >
            <div className="text-2xl font-bold tracking-wider">GAIA SIX</div>
          </button>

          <nav className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => onNavigate('shop')} 
              className="text-sm uppercase tracking-wide hover:text-red-800 transition"
            >
              Tienda
            </button>
            <button 
              onClick={() => onNavigate('about')} 
              className="text-sm uppercase tracking-wide hover:text-red-800 transition"
            >
              Nosotros
            </button>
          </nav>

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

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 space-y-3">
            <button onClick={() => { onNavigate('shop'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Tienda</button>
            <button onClick={() => { onNavigate('about'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Nosotros</button>
            {currentUser ? (
              <>
                <button onClick={() => { onNavigate('profile'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Mi Perfil</button>
                <button onClick={() => { onLogout(); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Cerrar Sesión</button>
              </>
            ) : (
              <button onClick={() => { onNavigate('auth'); setMenuOpen(false); }} className="block w-full text-left py-2 text-sm">Ingresar</button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

const CartSidebar = ({ isOpen, onClose, cart, cartTotal, onUpdateQuantity, onRemoveItem, onCheckout, currentUser }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 z-50" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-light">Carrito</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-12">Vacío</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm uppercase tracking-wide mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">Talla {item.size}</p>
                    <p className="text-sm mb-2">{formatPrice(item.price)}</p>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-black transition"
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:border-black transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id, item.size)}
                        className="ml-auto text-xs text-gray-500 hover:text-black transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between mb-6">
              <span className="text-sm uppercase tracking-wide">Total</span>
              <span className="text-lg">{formatPrice(cartTotal)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              {currentUser ? 'Finalizar Compra' : 'Ingresar para Comprar'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const HomePage = ({ onNavigate, onCategorySelect }) => (
  <div className="min-h-screen">
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      
      <div className="relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-6xl md:text-8xl font-light text-black tracking-tight">
            Tu <span className="text-red-800">estilo</span>
          </h1>
          
          <button 
            onClick={() => onNavigate('shop')}
            className="border border-red-800 text-red-800 px-12 py-4 text-sm uppercase tracking-widest hover:bg-red-800 hover:text-white transition-all duration-300"
          >
            Ver looks
          </button>
          
          <div className="flex justify-center gap-16 pt-12 text-xs uppercase tracking-widest text-gray-600">
            <div className="text-center">
              <p className="text-2xl font-light text-black">3</p>
              <p className="mt-1">Cuotas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-light text-black">24hs</p>
              <p className="mt-1">Envío</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-light text-black">+500</p>
              <p className="mt-1">Clientas felices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map(product => (
            <div key={product.id} className="group cursor-pointer" onClick={() => onNavigate('shop')}>
              <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm uppercase tracking-wide">{product.name}</h3>
                <span className="text-sm">{formatPrice(product.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const ShopPage = ({ selectedCategory, onSelectCategory, onAddToCart }) => {
  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === cat.id 
                  ? 'border-b-2 border-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => onAddToCart(product, size)}
                        className="bg-white px-4 py-2 text-xs uppercase tracking-wide hover:bg-red-800 hover:text-white transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <h3 className="uppercase tracking-wide">{product.name}</h3>
                <span>{formatPrice(product.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="min-h-screen bg-white">
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="text-5xl font-light mb-12">Gaia Six</h1>
      
      <div className="space-y-8 text-gray-700 leading-relaxed">
        <p className="text-xl">
          Tres hermanas. Ropa que acompaña tu día a día.
        </p>
        
        <p>
          Sin reglas. Sin poses. Solo prendas que se sienten bien.
        </p>
        
        <p>
          Creemos en la elegancia sin pretensiones, en la comodidad sin sacrificar el estilo.
        </p>
      </div>
    </div>
  </div>
);

const AuthPage = ({ mode, onLogin, onRegister, onToggleMode }) => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      const result = onLogin(formData.email, formData.password);
      if (!result.success) {
        alert(result.error);
      }
    } else {
      onRegister(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-light text-center mb-12">
          {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                required
              />
            </>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
            required
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full px-0 py-3 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
            required
          />
          
          <button
            type="submit"
            className="w-full border border-black py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 mt-8"
          >
            {mode === 'login' ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button
            onClick={onToggleMode}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            {mode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ user, onLogout, orders }) => (
  <div className="min-h-screen bg-white py-12 px-6">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12 pb-6 border-b border-gray-200">
        <h2 className="text-3xl font-light">Mi cuenta</h2>
        <button
          onClick={onLogout}
          className="text-sm uppercase tracking-wide hover:text-red-800 transition-colors"
        >
          Salir
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Nombre</p>
            <p className="text-lg">{user.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Teléfono</p>
            <p className="text-lg">{user.phone}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-light mb-8">Pedidos</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-12">Sin pedidos</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-4">
                  <span className="text-xs uppercase tracking-wide text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span className="text-xs uppercase tracking-wide">Pendiente</span>
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm mb-2">
                    <span>{item.name} ({item.size}) x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold mt-4">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <h3 className="text-sm font-light mb-4">GAIA SIX</h3>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <Mail size={14} />
          gaiashowrrom@gmail.com
        </p>
        <p className="flex items-center gap-2">
          <Phone size={14} />
          +54 9 2964479923
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={14} />
          Tierra del Fuego
        </p>
      </div>
      
      <div>
        <a href="https://instagram.com/gaiasix" target="_blank" rel="noopener noreferrer" className="inline-block">
          <Instagram size={20} className="hover:text-red-800 transition-colors" />
        </a>
      </div>
    </div>
  </footer>
);

// ===== MAIN APP =====
export default function GaiaSix() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [orders, setOrders] = useState([]);
  
  const { currentUser, login, register, logout } = useAuth();
  const { 
    cart, 
    cartTotal, 
    cartItemsCount, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  const handleCheckout = () => {
    if (!currentUser) {
      setCurrentPage('auth');
      setAuthMode('login');
      setCartOpen(false);
      return;
    }
    
    const order = {
      id: Date.now(),
      userId: currentUser.id,
      items: cart,
      total: cartTotal,
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    setOrders(prev => [...prev, order]);
    clearCart();
    setCartOpen(false);
    alert('¡Pedido realizado! Te contactaremos pronto.');
  };

  const handleLogin = (email, password) => {
    const result = login(email, password);
    if (result.success) {
      setCurrentPage('home');
    }
    return result;
  };

  const handleRegister = (userData) => {
    register(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onCategorySelect={setSelectedCategory} />;
      case 'shop':
        return <ShopPage 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={(product, size) => {
            addToCart(product, size);
            setCartOpen(true);
          }}
        />;
      case 'about':
        return <AboutPage />;
      case 'auth':
        return <AuthPage 
          mode={authMode}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onToggleMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
        />;
      case 'profile':
        return currentUser ? (
          <ProfilePage 
            user={currentUser}
            onLogout={handleLogout}
            orders={orders.filter(o => o.userId === currentUser.id)}
          />
        ) : (
          <AuthPage 
            mode="login"
            onLogin={handleLogin}
            onRegister={handleRegister}
            onToggleMode={() => setAuthMode(mode => mode === 'login' ? 'register' : 'login')}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} onCategorySelect={setSelectedCategory} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header 
        currentUser={currentUser}
        cartItemsCount={cartItemsCount}
        onNavigate={setCurrentPage}
        onCartToggle={() => setCartOpen(true)}
        onLogout={handleLogout}
      />
      
      {renderPage()}
      
      <CartSidebar 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        currentUser={currentUser}
      />
      
      <Footer />
    </div>
  );
}