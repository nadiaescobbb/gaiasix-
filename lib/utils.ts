// lib/utils.ts

/**
 * Genera un ID numérico único
 * Nota: En una aplicación real, esto vendría del backend
 * Por ahora usamos un timestamp + random para simular unicidad
 */
export const generateId = (): number => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return timestamp + random;
};

/**
 * Formatea un precio numérico a formato de moneda
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida formato de teléfono (básico)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitiza input de usuario para prevenir XSS básico
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Trunca texto a una longitud específica y agrega ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitaliza la primera letra de un string
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitaliza cada palabra de un string
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Calcula el total de un array de items con precio y cantidad
 */
export const calculateTotal = <T extends { price: number; quantity: number }>(
  items: T[]
): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Calcula el número total de items en el carrito
 */
export const calculateTotalItems = <T extends { quantity: number }>(
  items: T[]
): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Filtra array removiendo valores null/undefined
 */
export const filterFalsy = <T>(array: (T | null | undefined)[]): T[] => {
  return array.filter((item): item is T => item != null);
};

/**
 * Ordena array por propiedad
 */
export const sortByProperty = <T, K extends keyof T>(
  array: T[],
  property: K,
  ascending: boolean = true
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[property];
    const bValue = b[property];
    
    if (aValue === bValue) return 0;
    
    let result = 0;
    if (aValue < bValue) result = -1;
    if (aValue > bValue) result = 1;
    
    return ascending ? result : -result;
  });
};

/**
 * Debounce function para optimizar llamadas frecuentes
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Throttle function para limitar la frecuencia de ejecución
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Genera un color hexadecimal aleatorio
 */
export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

/**
 * Convierte un string a slug URL-friendly
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

/**
 * Formatea una fecha a formato legible
 */
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('es-ES', options || defaultOptions);
};

/**
 * Calcula la diferencia entre dos fechas
 */
export const getDateDifference = (date1: Date, date2: Date = new Date()) => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Valida si un valor es un objeto plano
 */
export const isPlainObject = (value: any): value is Record<string, any> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

/**
 * Clona profundamente un objeto/array - VERSIÓN CORREGIDA
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (Array.isArray(obj)) return obj.map(item => deepClone(item)) as unknown as T;
  
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key as keyof T] = deepClone(obj[key as keyof T]);
    }
  }
  return cloned;
};

/**
 * Merge de objetos de forma profunda - VERSIÓN SIMPLIFICADA Y CORREGIDA
 */
export const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  const output = { ...target };
  
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      
      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
        // Para objetos, hacer merge recursivo
        output[key] = deepMerge(targetValue, sourceValue as any);
      } else {
        // Para otros valores, usar el source si existe
        output[key] = sourceValue !== undefined ? sourceValue : targetValue;
      }
    }
  }
  
  return output;
};

/**
 * Merge simple de objetos (sin recursión profunda)
 */
export const merge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  return { ...target, ...source };
};

/**
 * Genera un array de números para paginación
 */
export const generatePagination = (currentPage: number, totalPages: number): number[] => {
  const delta = 2;
  const range: number[] = [];
  const rangeWithDots: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  let prev = 0;
  for (const i of range) {
    if (prev) {
      if (i - prev === 2) {
        rangeWithDots.push(prev + 1);
      } else if (i - prev !== 1) {
        rangeWithDots.push(-1); // -1 representa los puntos "..."
      }
    }
    rangeWithDots.push(i);
    prev = i;
  }

  return rangeWithDots;
};

/**
 * Convierte bytes a formato legible (KB, MB, GB)
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Extrae errores de un objeto de error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Ocurrió un error inesperado';
};

/**
 * Retrasa la ejecución (sleep function)
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Valida si una cadena es un JSON válido
 */
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Obtiene valores únicos de un array - VERSIÓN CORREGIDA
 */
export const getUniqueValues = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Obtiene valores únicos por propiedad de un array de objetos - VERSIÓN CORREGIDA
 */
export const getUniqueByProperty = <T, K extends keyof T>(array: T[], property: K): T[K][] => {
  const values = array.map(item => item[property]);
  return Array.from(new Set(values));
};

/**
 * Convierte un string a camelCase
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
};

/**
 * Convierte un string a PascalCase
 */
export const toPascalCase = (str: string): string => {
  return str.replace(/(^\w|[-_\s]+\w)/g, (match) => 
    match.replace(/[-_\s]+/, '').toUpperCase()
  );
};

/**
 * Convierte un string a kebab-case
 */
export const toKebabCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[-_\s]+/g, '-')
    .toLowerCase();
};

// Exportar todas las utilidades como un objeto por defecto también
const utils = {
  generateId,
  formatPrice,
  isValidEmail,
  isValidPhone,
  sanitizeInput,
  truncateText,
  capitalizeFirst,
  capitalizeWords,
  calculateTotal,
  calculateTotalItems,
  filterFalsy,
  sortByProperty,
  debounce,
  throttle,
  generateRandomColor,
  slugify,
  formatDate,
  getDateDifference,
  isPlainObject,
  deepClone,
  deepMerge,
  merge,
  generatePagination,
  formatBytes,
  getErrorMessage,
  delay,
  isValidJSON,
  getUniqueValues,
  getUniqueByProperty,
  toCamelCase,
  toPascalCase,
  toKebabCase,
};

export default utils;