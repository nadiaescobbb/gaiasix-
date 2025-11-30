import { ReactNode } from 'react';

// ==========================================
// TIPOS PRINCIPALES
// ==========================================

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  stock: number;
  sizes?: string[];
  description?: string;
  featured?: boolean;
  isNew?: boolean;  
  color?: string;
  material?: string;
  care?: string;
  slug: string;
  active?: boolean;
  images?: string[]; 
  colors?: string[]; 
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  stock: number;
}

export interface WishlistItem extends Product {
  addedAt: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress?: Address;
  trackingNumber?: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  phone?: string;
  orders?: Order[];
  createdAt: string;
  updatedAt?: string;
  wishlist?: number[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

// ==========================================
// TIPOS DE AUTH
// ==========================================

export type AuthError = 
  | 'INVALID_EMAIL'
  | 'WEAK_PASSWORD' 
  | 'EMAIL_EXISTS'
  | 'USER_NOT_FOUND'
  | 'INVALID_PASSWORD'
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR';

export interface LoginResult {
  success: boolean;
  error?: AuthError | string;
  user?: User;
  message?: string;
}

export interface RegisterResult {
  success: boolean;
  error?: AuthError | string;
  user?: User;
  message?: string;
}

export interface PasswordValidationResult {
  valid: boolean;
  error?: string;
  suggestions?: string[];
}

// ==========================================
// TIPOS DE CONTEXT
// ==========================================

export interface AppContextType {
  // State
  currentUser: User | null;
  cart: CartItem[];
  wishlist: WishlistItem[];
  isInitialized: boolean;
  
  // Auth
  login: (email: string, password: string) => Promise<LoginResult>;
  register: (userData: RegisterUserData) => Promise<RegisterResult>;
  logout: () => void;
  updateUserOrders: (orderData: Omit<Order, 'id'>) => void;
  
  // Cart
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateQuantity: (productId: number, size: string, newQuantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;

  // Wishlist
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  moveToCart: (productId: number, size: string) => void;
  clearWishlist: () => void;
  wishlistItemsCount: number;

  // Utils
  clearAllStorage: () => void;
}

export interface RegisterUserData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

// ==========================================
// TIPOS DE FORMULARIOS
// ==========================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface CheckoutFormData {
  email: string;
  name: string;
  address: Address;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

// ==========================================
// TIPOS DE COMPONENTES
// ==========================================

export type Page = 'home' | 'shop' | 'wishlist' | 'product' | 'about' | 'auth' | 'profile' | 'cart' | 'contact';
export type AuthMode = 'login' | 'register';

export interface AuthPageProps {
  mode: AuthMode;
  onLogin: (email: string, password: string) => Promise<LoginResult>;
  onRegister: (userData: RegisterUserData) => Promise<RegisterResult>;
  onToggleMode: () => void;
  error?: string;
}

export interface AppProviderProps {
  children: React.ReactNode;
}

// ==========================================
// ENUMS
// ==========================================

export enum ProductCategory {
  DRESSES = 'vestidos',
  TOPS = 'tops',
  BOTTOMS = 'bottoms',
  SETS = 'sets', 
  SKIRTS = 'faldas', 
  SHORTS = 'short',
  ACCESSORIES = 'accesorios',
  ALL = 'all'
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

// ==========================================
// UTILITY TYPES
// ==========================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ==========================================
// API TYPES
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==========================================
// TOAST TYPES
// ==========================================

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface ToastContextType {
  success: (message: string, duration?: number) => number;
  error: (message: string, duration?: number) => number;
  warning: (message: string, duration?: number) => number;
  info: (message: string, duration?: number) => number;
  addToast: (message: string, type?: ToastType, duration?: number) => number;
  removeToast: (id: number) => void;
  toasts: Toast[];
}

export interface ToastProviderProps {
  children: ReactNode;
}