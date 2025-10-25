/**
 * Formatear precio en pesos argentinos
 */
export const formatPrice = (price) => {
  return `$${price.toLocaleString('es-AR')}`;
};

/**
 * Formatear fecha en español
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('es-AR', defaultOptions);
};

/**
 * Formatear fecha corta
 */
export const formatShortDate = (dateString) => {
  return formatDate(dateString, { month: 'short', year: 'numeric' });
};

/**
 * Calcular total del carrito
 */
export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * Contar items en el carrito
 */
export const countCartItems = (cart) => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Validar email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar teléfono argentino
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Truncar texto
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generar ID único
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};