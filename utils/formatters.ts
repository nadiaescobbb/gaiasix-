/**
 * Formatea un número como precio en pesos argentinos
 * @param price - El precio a formatear
 * @returns El precio formateado (ej: "$1.234")
 */

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('es-AR')}`;
}

/**
 * Formatea una fecha en formato legible
 * @param date - La fecha a formatear
 * @returns La fecha formateada
 */
export function formatDate(date: string | Date): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Validar que la fecha sea válida
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Formatea una fecha y hora
 * @param date - La fecha a formatear
 * @returns La fecha y hora formateada
 */
export function formatDateTime(date: string | Date): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Validar que la fecha sea válida
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
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
 * @param text - El texto a truncar
 * @param maxLength - La longitud máxima
 * @returns El texto truncado
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Capitaliza la primera letra de un texto
 * @param text - El texto a capitalizar
 * @returns El texto capitalizado
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Formatea un número con separadores de miles
 * @param number - El número a formatear
 * @returns El número formateado (ej: "1.234")
 */
export function formatNumber(number: number): string {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0';
  }
  
  return new Intl.NumberFormat('es-AR').format(number);
}

/**
 * Formatea un tamaño de archivo en bytes a formato legible
 * @param bytes - El tamaño en bytes
 * @param decimals - Número de decimales
 * @returns El tamaño formateado (ej: "1.2 MB")
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Formatea un número de teléfono argentino
 * @param phone - El número de teléfono
 * @returns El teléfono formateado (ej: "+54 11 1234-5678")
 */
export function formatPhone(phone: string): string {
  if (!phone) return '';
  
  // Remover todos los caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Formatear según la longitud
  if (cleaned.length === 10) {
    return `+54 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    return `+54 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
  } else if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Si no coincide con ningún formato conocido, devolver el original
  return phone;
}

/**
 * Convierte un string a slug para URLs
 * @param text - El texto a convertir
 * @returns El slug (ej: "mi-producto-especial")
 */
export function toSlug(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9 -]/g, '') // Remover caracteres inválidos
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Consolidar guiones múltiples
    .trim();
}

/**
 * Formatea un porcentaje
 * @param value - El valor del porcentaje (ej: 0.15 para 15%)
 * @param decimals - Número de decimales
 * @returns El porcentaje formateado (ej: "15%")
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }
  
  const percentage = value * 100;
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

