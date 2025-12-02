"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { hashPassword, verifyPassword, validatePasswordStrength, migrateUserPassword } from '../lib/auth';
import { generateId } from '../lib/utils';
import { logger } from '../lib/logger';
import { 
  type User, 
  type CartItem, 
  type WishlistItem, 
  type Order, 
  type LoginResult, 
  type RegisterResult,
  type PasswordValidationResult,
  type Product,
  type AppContextType,
  type AppProviderProps,
  type RegisterUserData 
} from '../lib/types';

// ==========================================
// STORAGE HELPERS 
// ==========================================

const isBrowser = typeof window !== 'undefined';

const getStorageItem = <T,>(key: string, defaultValue: T): T => {
  if (!isBrowser) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    logger.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStorageItem = <T,>(key: string, value: T): boolean => {
  if (!isBrowser) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    logger.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

const removeStorageItem = (key: string): boolean => {
  if (!isBrowser) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    logger.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

// ==========================================
// CONTEXT CREATION
// ==========================================

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// ==========================================
// PROVIDER COMPONENT MEJORADO
// ==========================================

export function AppProvider({ children }: AppProviderProps) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // ==========================================
  // DEBOUNCED SAVE FUNCTIONS
  // ==========================================
  
  const debouncedSaveUser = useDebouncedCallback((user: User | null) => {
    if (user) {
      setStorageItem('gaia-current-user', user);
    } else {
      removeStorageItem('gaia-current-user');
    }
  }, 800);

  const debouncedSaveUsers = useDebouncedCallback((usersList: User[]) => {
    setStorageItem('gaia-users', usersList);
  }, 1000);

  const debouncedSaveCart = useDebouncedCallback((cartItems: CartItem[]) => {
    setStorageItem('gaia-cart', cartItems);
  }, 500);

  const debouncedSaveWishlist = useDebouncedCallback((wishlistItems: WishlistItem[]) => {
    setStorageItem('gaia-wishlist', wishlistItems);
  }, 600);

  // ==========================================
  // FUNCIONES DE VALIDACIÓN MEJORADAS
  // ==========================================

  const isValidUser = (user: any): user is User => {
    if (!user || typeof user !== 'object') return false;
    
    const required = {
      'id': 'number',
      'email': 'string',
      'password': 'string'
    };
    
    for (const [field, type] of Object.entries(required)) {
      if (!(field in user) || typeof user[field] !== type) return false;
    }
    
    return user.email.includes('@') && user.password.length > 0;
  };

  const isValidCartItem = (item: any): item is CartItem => {
    if (!item || typeof item !== 'object') return false;
    
    const required = {
      'id': 'number',
      'name': 'string',
      'price': 'number',
      'image': 'string',
      'size': 'string',
      'quantity': 'number',
      'stock': 'number'
    };
    
    for (const [field, type] of Object.entries(required)) {
      if (!(field in item) || typeof item[field] !== type) return false;
    }
    
    return item.price > 0 && item.quantity > 0 && item.quantity <= 99 && item.stock >= 0;
  };

  const isValidWishlistItem = (item: any): item is WishlistItem => {
    console.log('🔍 Validando item de wishlist:', item);
    
    // Verificación básica
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      console.log('❌ No es un objeto válido');
      return false;
    }
    
    // Campos obligatorios según Product
    const requiredFields = {
      'id': 'number',
      'name': 'string', 
      'price': 'number',
      'image': 'string',
      'slug': 'string',
      'stock': 'number'
    };
    
    // Verificar cada campo
    for (const [field, type] of Object.entries(requiredFields)) {
      if (!(field in item)) {
        console.log(`❌ Campo faltante: ${field}`);
        return false;
      }
      
      if (typeof item[field] !== type) {
        console.log(`❌ Tipo inválido para ${field}: esperado ${type}, obtenido ${typeof item[field]}`);
        return false;
      }
      
      // Validaciones específicas
      if (field === 'id' && (item.id <= 0 || !Number.isInteger(item.id))) {
        console.log(`❌ ID inválido: ${item.id}`);
        return false;
      }
      
      if (field === 'price' && item.price <= 0) {
        console.log(`❌ Precio inválido: ${item.price}`);
        return false;
      }
      
      if (field === 'stock' && item.stock < 0) {
        console.log(`❌ Stock inválido: ${item.stock}`);
        return false;
      }
      
      if ((field === 'name' || field === 'image' || field === 'slug') && 
          item[field].trim() === '') {
        console.log(`❌ Campo vacío: ${field}`);
        return false;
      }
    }
    
    // Campo específico de WishlistItem (opcional)
    if ('addedAt' in item && typeof item.addedAt !== 'string') {
      console.log('❌ Tipo inválido para addedAt');
      return false;
    }
    
    console.log('✅ Item de wishlist válido');
    return true;
  };

  // ==========================================
  // LIMPIAR DATOS CORRUPTOS
  // ==========================================
  
  const cleanCorruptedData = (): void => {
    if (!isBrowser) return;
    
    console.log('🧹 Limpiando datos potencialmente corruptos...');
    
    // Limpiar wishlist
    const storedWishlist = getStorageItem<any[]>('gaia-wishlist', []);
    console.log(`📦 Wishlist almacenada: ${storedWishlist.length} items`);
    
    const cleanedWishlist = storedWishlist.filter(isValidWishlistItem);
    console.log(`✅ Wishlist limpia: ${cleanedWishlist.length} items válidos`);
    
    if (cleanedWishlist.length !== storedWishlist.length) {
      console.log(`🧽 Removidos ${storedWishlist.length - cleanedWishlist.length} items corruptos de wishlist`);
      setStorageItem('gaia-wishlist', cleanedWishlist);
    }
    
    // Limpiar carrito
    const storedCart = getStorageItem<any[]>('gaia-cart', []);
    const cleanedCart = storedCart.filter(isValidCartItem);
    
    if (cleanedCart.length !== storedCart.length) {
      console.log(`🧽 Removidos ${storedCart.length - cleanedCart.length} items corruptos del carrito`);
      setStorageItem('gaia-cart', cleanedCart);
    }
    
    // Limpiar usuarios
    const storedUsers = getStorageItem<any[]>('gaia-users', []);
    const cleanedUsers = storedUsers.filter(isValidUser);
    
    if (cleanedUsers.length !== storedUsers.length) {
      console.log(`🧽 Removidos ${storedUsers.length - cleanedUsers.length} usuarios corruptos`);
      setStorageItem('gaia-users', cleanedUsers);
    }
  };

  // ==========================================
  // INICIALIZACIÓN MEJORADA
  // ==========================================
  
  useEffect(() => {
    if (!isBrowser) {
      setIsInitialized(true);
      return;
    }

    const initializeData = async () => {
      try {
        logger.info('🔧 Inicializando datos de la aplicación...');
        
        // PRIMERO LIMPIAR DATOS CORRUPTOS
        cleanCorruptedData();

        const storedUser = getStorageItem<User | null>('gaia-current-user', null);
        const storedUsers = getStorageItem<User[]>('gaia-users', []);
        const storedCart = getStorageItem<CartItem[]>('gaia-cart', []);
        const storedWishlist = getStorageItem<WishlistItem[]>('gaia-wishlist', []);

        console.log('📊 Datos cargados:', {
          wishlistItems: storedWishlist.length,
          cartItems: storedCart.length,
          users: storedUsers.length
        });

        // Validar usuario actual
        if (storedUser && isValidUser(storedUser)) {
          // Migrar contraseña si es necesario
          const migratedUser = await migrateUserPassword(storedUser);
          setCurrentUser(migratedUser);
          logger.success(`Usuario cargado: ${migratedUser.email}`);
        } else {
          removeStorageItem('gaia-current-user');
          setCurrentUser(null);
        }

        // Validar lista de usuarios
        if (Array.isArray(storedUsers)) {
          const validUsers = storedUsers.filter(isValidUser);
          if (validUsers.length > 0) {
            const migratedUsers = await Promise.all(
              validUsers.map(user => migrateUserPassword(user))
            );
            setUsers(migratedUsers);
            logger.info(`${migratedUsers.length} usuarios migrados`);
          } else {
            setUsers([]);
          }
        }

        // Validar carrito
        if (Array.isArray(storedCart)) {
          const validCart = storedCart.filter(isValidCartItem);
          setCart(validCart);
          logger.info(`Carrito: ${validCart.length} items válidos`);
        }

        // Validar wishlist CON DEBUG DETALLADO
        if (Array.isArray(storedWishlist)) {
          console.log('🔍 Filtrando wishlist...');
          const validWishlist = storedWishlist.filter(isValidWishlistItem);
          console.log(`✅ Wishlist después de filtrar: ${validWishlist.length} items`);
          
          // DEBUG: Mostrar IDs de los items en wishlist
          if (validWishlist.length > 0) {
            console.log('📋 IDs en wishlist:', validWishlist.map(item => item.id));
          }
          
          setWishlist(validWishlist);
          logger.info(`Wishlist: ${validWishlist.length} items válidos`);
        }

      } catch (error) {
        logger.error('Error en inicialización:', error);
        // Limpiar datos corruptos
        removeStorageItem('gaia-current-user');
        removeStorageItem('gaia-users');
        removeStorageItem('gaia-cart');
        removeStorageItem('gaia-wishlist');
        setCurrentUser(null);
        setUsers([]);
        setCart([]);
        setWishlist([]);
      } finally {
        setIsInitialized(true);
        logger.success('✅ Aplicación inicializada');
      }
    };

    initializeData();
  }, []);

  // ==========================================
  // PERSISTENCIA CON DEBOUNCE
  // ==========================================
  
  useEffect(() => {
    if (!isInitialized) return;
    debouncedSaveUser(currentUser);
  }, [currentUser, isInitialized, debouncedSaveUser]);

  useEffect(() => {
    if (!isInitialized) return;
    debouncedSaveUsers(users);
  }, [users, isInitialized, debouncedSaveUsers]);

  useEffect(() => {
    if (!isInitialized) return;
    debouncedSaveCart(cart);
  }, [cart, isInitialized, debouncedSaveCart]);

  useEffect(() => {
    if (!isInitialized) return;
    debouncedSaveWishlist(wishlist);
  }, [wishlist, isInitialized, debouncedSaveWishlist]);

  // ==========================================
  // AUTH ACTIONS 
  // ==========================================
  
  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    try {
      if (!email || !password) {
        return { success: false, error: 'Email y contraseña requeridos' };
      }

      const user = users.find(u => u.email === email);
      
      if (!user) {
        logger.warn(`Login fallido: usuario no encontrado - ${email}`);
        return { success: false, error: 'Usuario no encontrado' };
      }

      const isPasswordValid = await verifyPassword(password, user.password);
      
      if (isPasswordValid) {
        // Migrar contraseña si es necesario
        if (user.password && !user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
          const migratedUser = await migrateUserPassword(user);
          setUsers(prev => prev.map(u => u.id === user.id ? migratedUser : u));
          setCurrentUser(migratedUser);
        } else {
          setCurrentUser(user);
        }
        logger.success(`Login exitoso: ${email}`);
        return { success: true, user };
      } else {
        logger.warn(`Login fallido: contraseña incorrecta - ${email}`);
        return { success: false, error: 'Contraseña incorrecta' };
      }
    } catch (error) {
      logger.error('Error en login:', error);
      return { success: false, error: 'Error interno del sistema' };
    }
  }, [users]);

  const register = useCallback(async (userData: RegisterUserData): Promise<RegisterResult> => {
    try {
      // Validaciones
      if (!userData.email || !userData.password) {
        return { success: false, error: 'Email y contraseña requeridos' };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return { success: false, error: 'Email no válido' };
      }

      const passwordValidation: PasswordValidationResult = validatePasswordStrength(userData.password);
      if (!passwordValidation.valid) {
        return { success: false, error: passwordValidation.error };
      }

      const emailExists = users.some(u => u.email === userData.email);
      if (emailExists) {
        logger.warn(`Registro fallido: email duplicado - ${userData.email}`);
        return { success: false, error: 'El email ya está registrado' };
      }

      // Crear usuario
      const hashedPassword = await hashPassword(userData.password);
      const newUser: User = {
        ...userData,
        id: generateId(),
        password: hashedPassword,
        orders: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      
      logger.success(`Registro exitoso: ${userData.email}`);
      return { success: true, user: newUser };
      
    } catch (error) {
      logger.error('Error en registro:', error);
      return { success: false, error: 'Error al crear la cuenta' };
    }
  }, [users]);

  const logout = useCallback((): void => {
    logger.info(`Logout: ${currentUser?.email || 'usuario'}`);
    setCurrentUser(null);
    removeStorageItem('gaia-current-user');
  }, [currentUser]);

  const updateUserOrders = useCallback((orderData: Omit<Order, 'id'>): void => {
    if (!currentUser) return;

    const newOrder: Order = {
      ...orderData,
      id: generateId()
    };

    const updatedUser: User = {
      ...currentUser,
      orders: [...(currentUser.orders || []), newOrder],
      updatedAt: new Date().toISOString()
    };

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    
    // Persistir inmediatamente
    setStorageItem('gaia-current-user', updatedUser);
    setStorageItem('gaia-users', users.map(u => u.id === currentUser.id ? updatedUser : u));
    
    logger.success(`Orden #${newOrder.id} agregada a ${currentUser.email}`);
  }, [currentUser, users]);

  // ==========================================
  // CART ACTIONS 
  // ==========================================
  
  const addToCart = useCallback((product: Product, size: string): void => {
    try {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => 
          item.id === product.id && item.size === size
        );
        
        if (existingItem) {
          // Verificar stock disponible
          const availableStock = product.stock - existingItem.quantity;
          if (availableStock <= 0) {
            logger.warn(`Stock insuficiente: ${product.name} (${size})`);
            return prevCart;
          }
          
          const newQuantity = existingItem.quantity + 1;
          logger.info(`Carrito actualizado: ${product.name} (${size}) → ${newQuantity}`);
          return prevCart.map(item =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
        
        // Nuevo item
        if (product.stock > 0) {
          logger.success(`Producto agregado: ${product.name} (${size})`);
          return [...prevCart, { 
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            quantity: 1,
            stock: product.stock
          }];
        }
        
        logger.warn(`Sin stock: ${product.name}`);
        return prevCart;
      });
    } catch (error) {
      logger.error('Error agregando al carrito:', error);
    }
  }, []);

  const removeFromCart = useCallback((productId: number, size: string): void => {
    try {
      setCart(prevCart => {
        const item = prevCart.find(i => i.id === productId && i.size === size);
        if (item) {
          logger.info(`Producto removido: ${item.name} (${size})`);
        }
        return prevCart.filter(item => !(item.id === productId && item.size === size));
      });
    } catch (error) {
      logger.error('Error removiendo del carrito:', error);
    }
  }, []);

  const updateQuantity = useCallback((productId: number, size: string, newQuantity: number): void => {
    try {
      if (newQuantity <= 0) {
        removeFromCart(productId, size);
      } else {
        setCart(prevCart =>
          prevCart.map(item => {
            if (item.id === productId && item.size === size) {
              const maxQuantity = Math.min(item.stock, 99);
              const finalQuantity = Math.min(newQuantity, maxQuantity);
              
              if (finalQuantity !== item.quantity) {
                logger.debug(`Cantidad actualizada: ${item.name} → ${finalQuantity}`);
              }
              
              return { 
                ...item, 
                quantity: finalQuantity
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      logger.error('Error actualizando cantidad:', error);
    }
  }, [removeFromCart]);

  const clearCart = useCallback((): void => {
    logger.info('Carrito vaciado');
    setCart([]);
    removeStorageItem('gaia-cart');
  }, []);

  // ==========================================
  // WISHLIST ACTIONS MEJORADAS
  // ==========================================
  
  const addToWishlist = useCallback((product: Product): void => {
    try {
      setWishlist(prevWishlist => {
        const exists = prevWishlist.some(item => item.id === product.id);
        if (exists) {
          logger.warn(`Ya en favoritos: ${product.name}`);
          return prevWishlist;
        }
        
        const wishlistItem: WishlistItem = {
          ...product,
          addedAt: new Date().toISOString(),
        };
        
        logger.success(`Agregado a favoritos: ${product.name}`);
        console.log('➕ Wishlist después de agregar:', [...prevWishlist, wishlistItem].length);
        return [...prevWishlist, wishlistItem];
      });
    } catch (error) {
      logger.error('Error agregando a favoritos:', error);
    }
  }, []);

  const removeFromWishlist = useCallback((productId: number): void => {
    try {
      setWishlist(prevWishlist => {
        const item = prevWishlist.find(i => i.id === productId);
        if (item) {
          logger.info(`Removido de favoritos: ${item.name}`);
        }
        const newWishlist = prevWishlist.filter(item => item.id !== productId);
        console.log('➖ Wishlist después de remover:', newWishlist.length);
        return newWishlist;
      });
    } catch (error) {
      logger.error('Error removiendo de favoritos:', error);
    }
  }, []);

  const isInWishlist = useCallback((productId: number): boolean => {
    const result = wishlist.some(item => item.id === productId);
    console.log(`🔍 Producto ${productId} en wishlist: ${result}`);
    return result;
  }, [wishlist]);

  const moveToCart = useCallback((productId: number, size: string): void => {
    try {
      const wishlistItem = wishlist.find(item => item.id === productId);
      if (wishlistItem && size) {
        addToCart(wishlistItem, size);
        removeFromWishlist(productId);
        logger.success(`Movido al carrito: ${wishlistItem.name}`);
      }
    } catch (error) {
      logger.error('Error moviendo al carrito:', error);
    }
  }, [wishlist, addToCart, removeFromWishlist]);

  const clearWishlist = useCallback((): void => {
    logger.info('Wishlist vaciada');
    console.log('🗑️ Limpiando wishlist completa');
    setWishlist([]);
    removeStorageItem('gaia-wishlist');
  }, []);

  // ==========================================
  // COMPUTED VALUES CON DEBUG
  // ==========================================
  
  const cartTotal = useMemo(() => {
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    console.log('💰 Total carrito calculado:', total);
    return total;
  }, [cart]);
  
  const cartItemsCount = useMemo(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    console.log('🛒 Items en carrito:', count);
    return count;
  }, [cart]);

  const wishlistItemsCount = useMemo(() => {
    console.log('❤️ Wishlist actual:', wishlist);
    console.log('❤️ Contador de wishlist calculando:', wishlist.length);
    return wishlist.length;
  }, [wishlist]);

  // ==========================================
  // UTILS
  // ==========================================
  
  const clearAllStorage = useCallback((): void => {
    logger.warn('Limpiando almacenamiento local');
    removeStorageItem('gaia-current-user');
    removeStorageItem('gaia-users');
    removeStorageItem('gaia-cart');
    removeStorageItem('gaia-wishlist');
    setCurrentUser(null);
    setUsers([]);
    setCart([]);
    setWishlist([]);
    logger.success('Almacenamiento limpiado');
  }, []);

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
  
  const value: AppContextType = {
    // State
    currentUser,
    cart,
    wishlist,
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

    // Wishlist
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    moveToCart,
    clearWishlist,
    wishlistItemsCount,

    // Utils
    clearAllStorage,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}