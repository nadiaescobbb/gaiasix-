/**
 * Formatea un número como precio en pesos argentinos
 * @param {number} price - El precio a formatear
 * @returns {string} - El precio formateado (ej: "$1.234")
 */
export function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0';
  }
  
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formatea una fecha en formato legible
 * @param {string|Date} date - La fecha a formatear
 * @returns {string} - La fecha formateada
 */
export function formatDate(date) {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Formatea una fecha y hora
 * @param {string|Date} date - La fecha a formatear
 * @returns {string} - La fecha y hora formateada
 */
export function formatDateTime(date) {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Trunca un texto a un número máximo de caracteres
 * @param {string} text - El texto a truncar
 * @param {number} maxLength - La longitud máxima
 * @returns {string} - El texto truncado
 */
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Capitaliza la primera letra de un texto
 * @param {string} text - El texto a capitalizar
 * @returns {string} - El texto capitalizado
 */
export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}