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
  color?: string;
  material?: string;
  care?: string;
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

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  stock: number;
  sizes?: string[];
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
  wishlist?: number[]; // IDs de productos en wishlist
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

export interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
}

export interface RegisterResult {
  success: boolean;
  error?: string;
  user?: User;
}

export interface PasswordValidationResult {
  valid: boolean;
  error?: string;
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
  updateUserOrders: (orderId: number, orderData: Partial<Order>) => void;
  
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
// TIPOS DE TOAST
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
}

// ==========================================
// TIPOS DE COMPONENTES
// ==========================================

export type Page = 'home' | 'shop' | 'wishlist' | 'product' | 'about' | 'auth' | 'profile' | 'cart';
export type AuthMode = 'login' | 'register';

export interface PageProps {
  onNavigate: (page: Page) => void;
  onAddToCart?: (product: Product, size: string) => void;
  onProductSelect?: (product: Product) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export interface ProductPageProps {
  product: Product | null;
  onAddToCart: (product: Product, size: string) => void;
  onBack: () => void;
}

export interface ShopPageProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product, size: string) => void;
  onProductSelect: (product: Product) => void;
}

export interface WishlistPageProps {
  onNavigate: (page: Page) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export interface AuthPageProps {
  mode: AuthMode;
  onLogin: (email: string, password: string) => LoginResult;
  onRegister: (userData: RegisterUserData) => RegisterResult;
  onToggleMode: () => void;
}

export interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

export interface HeaderProps {
  currentUser: User | null;
  cartItemsCount: number;
  onNavigate: (page: Page) => void;
  onCartToggle: () => void;
  onLogout: () => void;
  currentPage: Page;
}

export interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  cartTotal: number;
  onUpdateQuantity: (productId: number, size: string, newQuantity: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
  onCheckout: () => void;
  currentUser: User | null;
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
// TIPOS DE FILTROS Y BÚSQUEDA
// ==========================================

export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  sizes?: string[];
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchState {
  query: string;
  results: Product[];
  isSearching: boolean;
}

// ==========================================
// TIPOS DE API/RESPUESTAS
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
// UTILITY TYPES
// ==========================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ==========================================
// ENUMS
// ==========================================

export enum ProductCategory {
  DRESSES = 'vestidos',
  TOPS = 'tops',
  BOTTOMS = 'bottoms',
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
// PROPS DE PROVIDERS
// ==========================================

export interface AppProviderProps {
  children: React.ReactNode;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}