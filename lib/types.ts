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
  slug: string;
  active?: boolean;
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

export interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
  message?: string;
}

export interface RegisterResult {
  success: boolean;
  error?: string;
  user?: User;
  message?: string;
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
  confirmPassword?: string;
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
  toasts: Toast[];
}

// ==========================================
// TIPOS DE COMPONENTES
// ==========================================

export type Page = 'home' | 'shop' | 'wishlist' | 'product' | 'about' | 'auth' | 'profile' | 'cart'| 'contact';
export type AuthMode = 'login' | 'register';

export interface PageProps {
  onNavigate?: (page: Page) => void;
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
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  onAddToCart?: (product: Product, size: string) => void;
  onProductSelect?: (product: Product) => void;
}

export interface WishlistPageProps {
  onNavigate?: (page: Page) => void;
  onAddToCart?: (product: Product, size: string) => void;
}

export interface AuthPageProps {
  mode: AuthMode;
  onLogin: (email: string, password: string) => Promise<LoginResult>;
  onRegister: (userData: RegisterUserData) => Promise<RegisterResult>;
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

export interface WishlistButtonProps {
  product: Product;
  variant?: 'icon' | 'text' | 'both';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
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
// TIPOS DE CATEGORÍAS
// ==========================================

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
}

// ==========================================
// TIPOS DE COMPONENTES UI
// ==========================================

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
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

// ==========================================
// TIPOS DE PÁGINAS Y RUTAS
// ==========================================

export interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export interface AboutPageProps {
  onNavigate?: (page: Page) => void;
}

export interface ContactPageProps {
  onNavigate?: (page: Page) => void;
}

// ==========================================
// TIPOS DE PRODUCT CARD
// ==========================================

export interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  onAddToCart?: (product: Product, size: string) => void;
  onProductSelect?: (product: Product) => void;
  className?: string;
}

// ==========================================
// TIPOS DE FILTROS
// ==========================================

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  inStock: boolean;
  sortBy: string;
}

// ==========================================
// TIPOS DE PAGINACIÓN
// ==========================================

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

// ==========================================
// TIPOS DE BREADCRUMB
// ==========================================

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

// ==========================================
// TIPOS DE LOADING STATES
// ==========================================

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// ==========================================
// TIPOS DE ERROR STATES
// ==========================================

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: number;
}

// ==========================================
// TIPOS DE SEARCH
// ==========================================

export interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
}

// ==========================================
// TIPOS DE RATING
// ==========================================

export interface Rating {
  average: number;
  count: number;
}

export interface Review {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

// ==========================================
// TIPOS DE IMAGE GALLERY
// ==========================================

export interface ImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

// ==========================================
// TIPOS DE SIZE SELECTOR
// ==========================================

export interface SizeSelectorProps {
  sizes: string[];
  selectedSize?: string;
  onSizeSelect: (size: string) => void;
  availableSizes?: { [size: string]: number };
  className?: string;
}

// ==========================================
// TIPOS DE QUANTITY SELECTOR
// ==========================================

export interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity?: number;
  minQuantity?: number;
  className?: string;
}

// ==========================================
// TIPOS DE ACCORDION
// ==========================================

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

// ==========================================
// TIPOS DE TAB
// ==========================================

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

// ==========================================
// TIPOS DE BADGE
// ==========================================

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// ==========================================
// TIPOS DE ALERT
// ==========================================

export interface AlertProps {
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  className?: string;
}

// ==========================================
// TIPOS DE SKELETON
// ==========================================

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
}

// ==========================================
// TIPOS DE PROGRESS
// ==========================================

export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

// ==========================================
// TIPOS DE TOOLTIP
// ==========================================

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

// ==========================================
// TIPOS DE POPOVER
// ==========================================

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

// ==========================================
// TIPOS DE DROPDOWN
// ==========================================

export interface DropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
  }[];
  className?: string;
}

// ==========================================
// TIPOS DE NOTIFICATION
// ==========================================

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}