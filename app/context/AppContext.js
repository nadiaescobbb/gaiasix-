"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { hashPassword, verifyPassword, validatePasswordStrength, migrateUserPassword } from '../lib/auth';

const isBrowser = typeof window !== 'undefined';

// ==========================================
// STORAGE HELPERS CON DEBOUNCE
// ==========================================

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

// Crear instancias de debounce para cada key
const createDebouncedSave = () => {
  return useDebouncedCallback((key, value) => {
    if (!isBrowser) return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`💾 Guardado debounced: ${key}`);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, 1000); // ⏱️ 1 segundo de debounce
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
// PROVIDER COMPONENT - CON DEBOUNCE OPTIMIZADO
// ==========================================

export function AppProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [cart, setCart] = useState([]);

  // ==========================================
  // DEBOUNCED SAVE FUNCTIONS
  // ==========================================
  
  // Debounced saves para cada tipo de dato
  const debouncedSaveUser = useDebouncedCallback((user) => {
    if (!isBrowser) return;
    
    try {
      if (user) {
        localStorage.setItem('gaia-current-user', JSON.stringify(user));
        console.log('💾 Usuario guardado (debounced)');
      } else {
        localStorage.removeItem('gaia-current-user');
        console.log('💾 Usuario removido (debounced)');
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }, 800); // 800ms debounce

  const debouncedSaveUsers = useDebouncedCallback((usersList) => {
    if (!isBrowser) return;
    
    try {
      localStorage.setItem('gaia-users', JSON.stringify(usersList));
      console.log('💾 Lista de usuarios guardada (debounced)');
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
    }
  }, 1000); // 1 segundo debounce

  const debouncedSaveCart = useDebouncedCallback((cartItems) => {
    if (!isBrowser) return;
    
    try {
      localStorage.setItem('gaia-cart', JSON.stringify(cartItems));
      console.log('💾 Carrito guardado (debounced)');
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, 500); 
  
 // ==========================================
// INICIALIZACIÓN - Cargar y validar datos de localStorage
// ==========================================

useEffect(() => {
  if (!isBrowser) {
    setIsInitialized(true);
    return;
  }

  const initializeData = async () => {
    try {
      // Cargar datos crudos
      const storedUser = getStorageItem('gaia-current-user', null);
      const storedUsers = getStorageItem('gaia-users', []);
      const storedCart = getStorageItem('gaia-cart', []);

      console.log('🔄 Iniciando validación de datos...');

      // ✅ VALIDACIÓN ROBUSTA DE USUARIO ACTUAL
      if (storedUser && 
          typeof storedUser === 'object' && 
          storedUser.id && 
          storedUser.email &&
          typeof storedUser.email === 'string' &&
          storedUser.password) {
        
        console.log('✅ Usuario actual válido:', storedUser.email);
        setCurrentUser(storedUser);
      } else {
        console.log('⚠️ Usuario actual inválido, limpiando...');
        removeStorageItem('gaia-current-user');
        setCurrentUser(null);
      }

      // ✅ VALIDACIÓN ROBUSTA DE LISTA DE USUARIOS
      if (Array.isArray(storedUsers)) {
        const validUsers = storedUsers.filter(user => 
          user && 
          typeof user === 'object' &&
          user.id && 
          user.email &&
          typeof user.email === 'string' &&
          user.password &&
          typeof user.password === 'string'
        );

        console.log(`📊 Usuarios: ${storedUsers.length} total, ${validUsers.length} válidos`);

        if (validUsers.length > 0) {
          const migratedUsers = await Promise.all(
            validUsers.map(user => migrateUserPassword(user))
          );
          setUsers(migratedUsers);
          console.log('✅ Usuarios migrados y validados');
        } else {
          setUsers([]);
        }
      } else {
        console.log('⚠️ Lista de usuarios inválida, resetando...');
        setUsers([]);
      }

      // ✅ VALIDACIÓN ROBUSTA DE CARRITO
      if (Array.isArray(storedCart)) {
        const validCart = storedCart.filter(item => 
          item &&
          typeof item === 'object' &&
          item.id &&
          typeof item.id === 'number' &&
          item.name &&
          typeof item.name === 'string' &&
          typeof item.price === 'number' &&
          item.price > 0 &&
          typeof item.quantity === 'number' &&
          item.quantity > 0 &&
          item.quantity <= 99 && // Límite razonable
          item.size &&
          typeof item.size === 'string'
        );

        console.log(`🛒 Carrito: ${storedCart.length} items, ${validCart.length} válidos`);

        // Limpiar items inválidos
        const invalidItems = storedCart.length - validCart.length;
        if (invalidItems > 0) {
          console.log(`🗑️ Eliminando ${invalidItems} items inválidos del carrito`);
        }

        setCart(validCart);
      } else {
        console.log('⚠️ Carrito inválido, resetando...');
        setCart([]);
      }

      console.log('🎉 Validación de datos completada exitosamente');

    } catch (error) {
      console.error('❌ Error crítico en validación de datos:', error);
      
      // 📦 LIMPIEZA DE SEGURIDAD - Resetear todo en caso de error
      console.log('🛡️ Ejecutando limpieza de seguridad...');
      
      removeStorageItem('gaia-current-user');
      removeStorageItem('gaia-users');
      removeStorageItem('gaia-cart');
      
      setCurrentUser(null);
      setUsers([]);
      setCart([]);
      
      console.log('✅ Limpieza de seguridad completada');
    } finally {
      setIsInitialized(true);
      console.log('🚀 Aplicación inicializada y lista');
    }
  };

  initializeData();
}, []);

// ==========================================
  // PERSISTENCIA CON DEBOUNCE - NUEVA VERSIÓN
  // ==========================================
  
  // Guardar usuario actual con debounce
  useEffect(() => {
    if (!isInitialized) return;
    debouncedSaveUser(currentUser);
  }, [currentUser, isInitialized, debouncedSaveUser]);

  // Guardar lista de usuarios con debounce
  useEffect(() => {
    if (!isInitialized) return;
    debouncedSaveUsers(users);
  }, [users, isInitialized, debouncedSaveUsers]);

  // Guardar carrito con debounce (más rápido para mejor UX)
  useEffect(() => {
    if (!isInitialized) return;
    debouncedSaveCart(cart);
  }, [cart, isInitialized, debouncedSaveCart]);

  // ==========================================
  // AUTH ACTIONS - VERSIÓN SEGURA
  // ==========================================
  
  const login = useCallback(async (email, password) => {
    try {
      if (!email || !password) {
        return { success: false, error: 'Email y contraseña requeridos' };
      }

      const user = users.find(u => u.email === email);
      
      if (!user) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      const isPasswordValid = await verifyPassword(password, user.password);
      
      if (isPasswordValid) {
        if (user.password && !user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
          const migratedUser = await migrateUserPassword(user);
          setUsers(prev => prev.map(u => u.id === user.id ? migratedUser : u));
          setCurrentUser(migratedUser);
        } else {
          setCurrentUser(user);
        }
        return { success: true };
      } else {
        return { success: false, error: 'Contraseña incorrecta' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error interno del sistema' };
    }
  }, [users]);

  const register = useCallback(async (userData) => {
    try {
      if (!userData.email || !userData.password) {
        return { success: false, error: 'Email y contraseña requeridos' };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return { success: false, error: 'Email no válido' };
      }

      const passwordValidation = validatePasswordStrength(userData.password);
      if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.error };
      }

      const emailExists = users.some(u => u.email === userData.email);
      if (emailExists) {
        return { success: false, error: 'El email ya está registrado' };
      }

      const hashedPassword = await hashPassword(userData.password);

      const newUser = { 
        ...userData,
        id: Date.now(),
        password: hashedPassword,
        orders: [],
        createdAt: new Date().toISOString()
      };
      
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      return { success: true };
      
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error al crear la cuenta' };
    }
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
  // CART ACTIONS - VERSIÓN CON VALIDACIÓN DE STOCK
  // ==========================================
  
  const addToCart = useCallback((product, size) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && item.size === size
      );
      
      if (existingItem) {
        // ✅ VALIDAR STOCK ANTES DE INCREMENTAR
        if (existingItem.quantity >= product.stock) {
          return prevCart; // No modificar si no hay stock
        }
        
        return prevCart.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // ✅ VERIFICAR STOCK PARA NUEVO ITEM
      if (product.stock > 0) {
        return [...prevCart, { 
          // ✅ SOLO DATOS NECESARIOS
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: 1,
          stock: product.stock // Mantener stock actual
        }];
      }
      
      return prevCart; // No agregar si no hay stock
    });
  }, []);

  const removeFromCart = useCallback((productId, size) => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback((productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
    } else {
      setCart(prevCart =>
        prevCart.map(item => {
          if (item.id === productId && item.size === size) {
            // ✅ LIMITAR POR STOCK DISPONIBLE
            const maxQuantity = item.stock || 99;
            return { 
              ...item, 
              quantity: Math.min(newQuantity, maxQuantity) 
            };
          }
          return item;
        })
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
  // COMPUTED VALUES - OPTIMIZADOS CON useMemo
  // ==========================================
  
  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0), 
    [cart]
  );
  
  const cartItemsCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0), 
    [cart]
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
          <div className="text-sm text-gray-500 mt-2">Cargando...</div>
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