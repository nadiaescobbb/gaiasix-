"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// ✅ IMPORTACIONES 
import { hashPassword, verifyPassword, validatePasswordStrength, migrateUserPassword } from '../lib/auth';
import { logger, logSection, logErrorWithContext } from '../lib/logger';
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

// ✅ HOOK EXPORTADO CORRECTAMENTE
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// ==========================================
// PROVIDER COMPONENT
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
  // INICIALIZACIÓN 
  // ==========================================
  
  useEffect(() => {
    if (!isBrowser) {
      setIsInitialized(true);
      return;
    }

    const initializeData = async () => {
      try {
        logSection('INICIALIZACIÓN DE DATOS');

        const storedUser = getStorageItem<User | null>('gaia-current-user', null);
        const storedUsers = getStorageItem<User[]>('gaia-users', []);
        const storedCart = getStorageItem<CartItem[]>('gaia-cart', []);
        const storedWishlist = getStorageItem<WishlistItem[]>('gaia-wishlist', []);

        logger.log('Validando datos de localStorage...');

        // Validar usuario actual
        if (storedUser && 
            typeof storedUser === 'object' && 
            storedUser.id && 
            storedUser.email &&
            typeof storedUser.email === 'string' &&
            storedUser.password) {
          setCurrentUser(storedUser);
          logger.success(`Usuario encontrado: ${storedUser.email}`);
        } else {
          removeStorageItem('gaia-current-user');
          setCurrentUser(null);
          logger.info('No hay usuario activo');
        }

        // Validar lista de usuarios
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

          if (validUsers.length > 0) {
            logger.log(`Migrando ${validUsers.length} usuarios...`);
            const migratedUsers = await Promise.all(
              validUsers.map(user => migrateUserPassword(user))
            );
            setUsers(migratedUsers);
            logger.success(`✓ ${migratedUsers.length} usuarios migrados`);
          } else {
            setUsers([]);
          }
        } else {
          setUsers([]);
        }

        // Validar carrito
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
            item.quantity <= 99 &&
            item.size &&
            typeof item.size === 'string'
          );
          setCart(validCart);
          logger.log(`🛒 Carrito: ${storedCart.length} items, ${validCart.length} válidos`);
        } else {
          setCart([]);
        }

        // Validar wishlist
        if (Array.isArray(storedWishlist)) {
          const validWishlist = storedWishlist.filter(item => 
            item &&
            typeof item === 'object' &&
            item.id &&
            typeof item.id === 'number' &&
            item.name &&
            typeof item.name === 'string' &&
            typeof item.price === 'number' &&
            item.price > 0 &&
            item.image &&
            typeof item.image === 'string'
          );
          setWishlist(validWishlist);
          logger.log(`❤️ Wishlist: ${storedWishlist.length} items, ${validWishlist.length} válidos`);
        } else {
          setWishlist([]);
        }

        logger.success('Validación de datos completada exitosamente');

      } catch (error) {
        logErrorWithContext(error, {
          function: 'initializeData',
          timestamp: new Date().toISOString()
        });
        
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
        logger.info('🚀 Aplicación inicializada');
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
        logger.warn(`Intento de login fallido: usuario no encontrado (${email})`);
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
        logger.success(`Login exitoso: ${email}`);
        return { success: true };
      } else {
        logger.warn(`Intento de login fallido: contraseña incorrecta (${email})`);
        return { success: false, error: 'Contraseña incorrecta' };
      }
    } catch (error) {
      logErrorWithContext(error, {
        function: 'login',
        email,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: 'Error interno del sistema' };
    }
  }, [users]);

  const register = useCallback(async (userData: RegisterUserData): Promise<RegisterResult> => {
    try {
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
        logger.warn(`Intento de registro con email duplicado: ${userData.email}`);
        return { success: false, error: 'El email ya está registrado' };
      }

      const hashedPassword = await hashPassword(userData.password);

      const newUser: User = { 
        ...userData,
        id: Date.now(),
        password: hashedPassword,
        orders: [],
        createdAt: new Date().toISOString()
      } as User;
      
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      logger.success(`Registro exitoso: ${userData.email}`);
      return { success: true };
      
    } catch (error) {
      logErrorWithContext(error, {
        function: 'register',
        email: userData.email,
        timestamp: new Date().toISOString()
      });
      return { success: false, error: 'Error al crear la cuenta' };
    }
  }, [users]);

  const logout = useCallback((): void => {
    logger.info(`Logout: ${currentUser?.email || 'usuario'}`);
    setCurrentUser(null);
    removeStorageItem('gaia-current-user');
  }, [currentUser]);

  const updateUserOrders = useCallback((orderId: number, orderData: Partial<Order>): void => {
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      orders: [...(currentUser.orders || []), { id: orderId, ...orderData } as Order]
    };

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    logger.success(`Orden #${orderId} agregada al usuario ${currentUser.email}`);
  }, [currentUser]);

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
          if (existingItem.quantity >= product.stock) {
            logger.warn(`Stock máximo alcanzado para ${product.name} (${size})`);
            return prevCart;
          }
          
          logger.log(`Cantidad actualizada: ${product.name} (${size}) → ${existingItem.quantity + 1}`);
          return prevCart.map(item =>
            item.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        
        if (product.stock > 0) {
          logger.success(`Producto agregado al carrito: ${product.name} (${size})`);
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
        
        logger.warn(`Sin stock disponible: ${product.name}`);
        return prevCart;
      });
    } catch (error) {
      logErrorWithContext(error, { function: 'addToCart', product, size });
    }
  }, []);

  const removeFromCart = useCallback((productId: number, size: string): void => {
    try {
      setCart(prevCart => {
        const item = prevCart.find(i => i.id === productId && i.size === size);
        if (item) {
          logger.log(`Producto removido del carrito: ${item.name} (${size})`);
        }
        return prevCart.filter(item => !(item.id === productId && item.size === size));
      });
    } catch (error) {
      logErrorWithContext(error, { function: 'removeFromCart', productId, size });
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
              const maxQuantity = item.stock || 99;
              const finalQuantity = Math.min(newQuantity, maxQuantity);
              logger.debug(`Cantidad actualizada: ${item.name} → ${finalQuantity}`);
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
      logErrorWithContext(error, { function: 'updateQuantity', productId, size, newQuantity });
    }
  }, [removeFromCart]);

  const clearCart = useCallback((): void => {
    logger.info('Carrito vaciado');
    setCart([]);
    removeStorageItem('gaia-cart');
  }, []);

  // ==========================================
  // WISHLIST ACTIONS
  // ==========================================
  
  const addToWishlist = useCallback((product: Product): void => {
    try {
      setWishlist(prevWishlist => {
        const exists = prevWishlist.some(item => item.id === product.id);
        if (exists) {
          logger.warn(`El producto ya está en favoritos: ${product.name}`);
          return prevWishlist;
        }
        
        const wishlistItem: WishlistItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          stock: product.stock,
          sizes: product.sizes,
          slug: product.slug,
          addedAt: new Date().toISOString(),
          description: product.description,
          featured: product.featured,
          color: product.color,
          material: product.material,
          care: product.care,
          active: product.active,
        };
        
        logger.success(`Agregado a favoritos: ${product.name}`);
        return [...prevWishlist, wishlistItem];
      });
    } catch (error) {
      logErrorWithContext(error, { function: 'addToWishlist', product });
    }
  }, []);

  const removeFromWishlist = useCallback((productId: number): void => {
    try {
      setWishlist(prevWishlist => {
        const item = prevWishlist.find(i => i.id === productId);
        if (item) {
          logger.log(`Removido de favoritos: ${item.name}`);
        }
        return prevWishlist.filter(item => item.id !== productId);
      });
    } catch (error) {
      logErrorWithContext(error, { function: 'removeFromWishlist', productId });
    }
  }, []);

  const isInWishlist = useCallback((productId: number): boolean => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const moveToCart = useCallback((productId: number, size: string): void => {
    try {
      const wishlistItem = wishlist.find(item => item.id === productId);
      if (wishlistItem && size) {
        const product: Product = {
          id: wishlistItem.id,
          name: wishlistItem.name,
          price: wishlistItem.price,
          image: wishlistItem.image,
          category: wishlistItem.category,
          stock: wishlistItem.stock,
          sizes: wishlistItem.sizes,
          slug: wishlistItem.slug,
          description: wishlistItem.description,
          featured: wishlistItem.featured,
          color: wishlistItem.color,
          material: wishlistItem.material,
          care: wishlistItem.care,
          active: wishlistItem.active,
        };
        addToCart(product, size);
        removeFromWishlist(productId);
        logger.success(`Movido al carrito: ${wishlistItem.name}`);
      }
    } catch (error) {
      logErrorWithContext(error, { function: 'moveToCart', productId, size });
    }
  }, [wishlist, addToCart, removeFromWishlist]);

  const clearWishlist = useCallback((): void => {
    logger.info('Wishlist vaciada');
    setWishlist([]);
    removeStorageItem('gaia-wishlist');
  }, []);

  // ==========================================
  // COMPUTED VALUES
  // ==========================================
  
  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0), 
    [cart]
  );
  
  const cartItemsCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0), 
    [cart]
  );

  const wishlistItemsCount = useMemo(() => 
    wishlist.length, 
    [wishlist]
  );

  // ==========================================
  // UTILS
  // ==========================================
  
  const clearAllStorage = useCallback((): void => {
    logger.warn('⚠️ Limpiando todo el almacenamiento local');
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