"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';


const isBrowser = typeof window !== 'undefined';
const getStorageItem = (key, defaultValue = null) => {
  if (!isBrowser) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStorageItem = (key, value) => {
  if (!isBrowser) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

const removeStorageItem = (key) => {
  if (!isBrowser) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

// ==========================================
// CONTEXT CREATION
// ==========================================

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// ==========================================
// PROVIDER COMPONENT
// ==========================================

export function AppProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);

  // ==========================================
  // INICIALIZACIÓN - Cargar datos de localStorage
  // ==========================================
  
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (!isBrowser) {
      setIsInitialized(true);
      return;
    }

    try {
      // Cargar datos con valores por defecto
      const storedUser = getStorageItem('gaia-current-user', null);
      const storedUsers = getStorageItem('gaia-users', []);
      const storedCart = getStorageItem('gaia-cart', []);

      // Validar que los datos tengan el formato correcto
      if (storedUser && typeof storedUser === 'object') {
        setCurrentUser(storedUser);
      }

      if (Array.isArray(storedUsers)) {
        setUsers(storedUsers);
      }

      if (Array.isArray(storedCart)) {
        setCart(storedCart);
      }

      console.log('✅ Datos cargados desde localStorage');
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      // En caso de error, usar valores por defecto
      setCurrentUser(null);
      setUsers([]);
      setCart([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // ==========================================
  // PERSISTENCIA - Guardar en localStorage
  // ==========================================
  
  // Guardar usuario actual
  useEffect(() => {
    if (!isInitialized) return;
    
    if (currentUser) {
      setStorageItem('gaia-current-user', currentUser);
    } else {
      removeStorageItem('gaia-current-user');
    }
  }, [currentUser, isInitialized]);

  // Guardar lista de usuarios
  useEffect(() => {
    if (!isInitialized) return;
    setStorageItem('gaia-users', users);
  }, [users, isInitialized]);

  // Guardar carrito
  useEffect(() => {
    if (!isInitialized) return;
    setStorageItem('gaia-cart', cart);
  }, [cart, isInitialized]);

  // ==========================================
  // AUTH ACTIONS
  // ==========================================
  
  const login = useCallback((email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return { success: true };
    }
    return { success: false, error: 'Credenciales incorrectas' };
  }, [users]);

  const register = useCallback((userData) => {
    const emailExists = users.some(u => u.email === userData.email);
    if (emailExists) {
      return { success: false, error: 'El email ya está registrado' };
    }

    const newUser = { 
      ...userData, 
      id: Date.now(),
      orders: [],
      createdAt: new Date().toISOString()
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    removeStorageItem('gaia-current-user');
  }, []);

  const updateUserOrders = useCallback((orderId, orderData) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      orders: [...(currentUser.orders || []), { id: orderId, ...orderData }]
    };

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  }, [currentUser]);

  // ==========================================
  // CART ACTIONS
  // ==========================================
  
  const addToCart = useCallback((product, size) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && item.size === size
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...product, size, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId, size) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback((productId, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId, size);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId && item.size === size
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    removeStorageItem('gaia-cart');
  }, []);

  const clearAllStorage = useCallback(() => {
    removeStorageItem('gaia-current-user');
    removeStorageItem('gaia-users');
    removeStorageItem('gaia-cart');
    setCurrentUser(null);
    setUsers([]);
    setCart([]);
  }, []);

  // ==========================================
  // COMPUTED VALUES
  // ==========================================
  
  const cartTotal = cart.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  );
  
  const cartItemsCount = cart.reduce((total, item) => 
    total + item.quantity, 0
  );

  // ==========================================
  // LOADING STATE
  // ==========================================
  
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-light text-gray-600">GAIA SIX</div>
        </div>
      </div>
    );
  }

  // ==========================================
  // CONTEXT VALUE
  // ==========================================
  
  const value = {
    // State
    currentUser,
    cart,
    isInitialized,
    
    // Auth
    login,
    register,
    logout,
    updateUserOrders,
    
    // Cart
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemsCount,

    // Utils
    clearAllStorage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}