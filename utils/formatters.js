/**
 * Formatear precio en pesos argentinos
 * @param {number} price - Precio a formatear
 * @returns {string} - Precio formateado
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

/**
 * Formatear fecha en español
 * @param {string} dateString - Fecha ISO string
 * @param {object} options - Opciones de formato
 * @returns {string} - Fecha formateada
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
 * @param {string} dateString - Fecha ISO string
 * @returns {string} - Fecha corta
 */
export const formatShortDate = (dateString) => {
  return formatDate(dateString, { month: 'short', year: 'numeric' });
};

/**
 * Calcular total del carrito
 * @param {array} cart - Array de items del carrito
 * @returns {number} - Total
 */
export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * Contar items del carrito
 * @param {array} cart - Array de items del carrito
 * @returns {number} - Cantidad total de items
 */
export const countCartItems = (cart) => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Validar email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Truncar texto
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string}
 */
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generar ID único
 * @returns {string}
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};