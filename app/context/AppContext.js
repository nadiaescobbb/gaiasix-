"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

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
    try {
      const storedUser = localStorage.getItem('gaia-current-user');
      const storedUsers = localStorage.getItem('gaia-users');
      const storedCart = localStorage.getItem('gaia-cart');

      if (storedUser) setCurrentUser(JSON.parse(storedUser));
      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedCart) setCart(JSON.parse(storedCart));
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // ==========================================
  // PERSISTENCIA - Guardar en localStorage
  // ==========================================
  
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem('gaia-current-user', JSON.stringify(currentUser));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }, [currentUser, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem('gaia-users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  }, [users, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      localStorage.setItem('gaia-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
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
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-light mb-4">GAIA SIX</div>
          <div className="animate-pulse">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}