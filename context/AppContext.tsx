"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// ✅ IMPORTACIONES 
import { hashPassword, verifyPassword, validatePasswordStrength, migrateUserPassword } from '../lib/auth';
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
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStorageItem = <T,>(key: string, value: T): boolean => {
  if (!isBrowser) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

const removeStorageItem = (key: string): boolean => {
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

const AppContext = createContext<AppContextType | null>(null);

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
        const storedUser = getStorageItem<User | null>('gaia-current-user', null);
        const storedUsers = getStorageItem<User[]>('gaia-users', []);
        const storedCart = getStorageItem<CartItem[]>('gaia-cart', []);
        const storedWishlist = getStorageItem<WishlistItem[]>('gaia-wishlist', []);

        console.log('🔄 Iniciando validación de datos...');

        // Validar usuario actual
        if (storedUser && 
            typeof storedUser === 'object' && 
            storedUser.id && 
            storedUser.email &&
            typeof storedUser.email === 'string' &&
            storedUser.password) {
          setCurrentUser(storedUser);
        } else {
          removeStorageItem('gaia-current-user');
          setCurrentUser(null);
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
            const migratedUsers = await Promise.all(
              validUsers.map(user => migrateUserPassword(user))
            );
            setUsers(migratedUsers);
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
          console.log(`❤️ Wishlist: ${storedWishlist.length} items, ${validWishlist.length} válidos`);
        } else {
          setWishlist([]);
        }

        console.log('🎉 Validación de datos completada exitosamente');

      } catch (error) {
        console.error('❌ Error crítico en validación de datos:', error);
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
        console.log('🚀 Aplicación inicializada y lista');
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
      return { success: true };
      
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Error al crear la cuenta' };
    }
  }, [users]);

  const logout = useCallback((): void => {
    setCurrentUser(null);
    removeStorageItem('gaia-current-user');
  }, []);

  const updateUserOrders = useCallback((orderId: number, orderData: Partial<Order>): void => {
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      orders: [...(currentUser.orders || []), { id: orderId, ...orderData } as Order]
    };

    setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    setCurrentUser(updatedUser);
  }, [currentUser]);

  // ==========================================
  // CART ACTIONS
  // ==========================================
  
  const addToCart = useCallback((product: Product, size: string): void => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && item.size === size
      );
      
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return prevCart;
        }
        
        return prevCart.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      if (product.stock > 0) {
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
      
      return prevCart;
    });
  }, []);

  const removeFromCart = useCallback((productId: number, size: string): void => {
    setCart(prevCart => 
      prevCart.filter(item => !(item.id === productId && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback((productId: number, size: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
    } else {
      setCart(prevCart =>
        prevCart.map(item => {
          if (item.id === productId && item.size === size) {
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

  const clearCart = useCallback((): void => {
    setCart([]);
    removeStorageItem('gaia-cart');
  }, []);

  // ==========================================
  // WISHLIST ACTIONS - ✅ CORREGIDO
  // ==========================================
  
  const addToWishlist = useCallback((product: Product): void => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(item => item.id === product.id);
      if (exists) {
        return prevWishlist;
      }
      
      // ✅ CÓDIGO COMPLETO Y CORREGIDO
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
      
      return [...prevWishlist, wishlistItem];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number): void => {
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    );
  }, []);

  const isInWishlist = useCallback((productId: number): boolean => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const moveToCart = useCallback((productId: number, size: string): void => {
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
    }
  }, [wishlist, addToCart, removeFromWishlist]);

  const clearWishlist = useCallback((): void => {
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
    removeStorageItem('gaia-current-user');
    removeStorageItem('gaia-users');
    removeStorageItem('gaia-cart');
    removeStorageItem('gaia-wishlist');
    setCurrentUser(null);
    setUsers([]);
    setCart([]);
    setWishlist([]);
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