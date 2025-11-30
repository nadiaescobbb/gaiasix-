export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Formatea números con separadores de miles
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('es-AR').format(number);
};

/**
 * Formatea fechas en español
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
 * Formatea fechas relativas (hace x tiempo)
 */
export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);
  
  const intervals = {
    año: 31536000,
    mes: 2592000,
    semana: 604800,
    día: 86400,
    hora: 3600,
    minuto: 60,
    segundo: 1
  };
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `hace ${interval} ${unit}${interval !== 1 ? 's' : ''}`;
    }
  }
  
  return 'ahora';
};

/**
 * Capitaliza la primera letra de cada palabra
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Convierte un string a slug URL-friendly
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

/**
 * Trunca texto y agrega ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Formatea bytes a formato legible
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
 * Formatea duración en minutos a formato horas:minutos
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} min`;
  }
  
  return `${hours}h ${mins}min`;
};

/**
 * Formatea número de teléfono argentino
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remover todos los caracteres no numéricos
  const cleaned = phone.replace(/\D/g, '');
  
  // Formato argentino: +54 11 1234-5678
  if (cleaned.length === 10) {
    return `+54 ${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

/**
 * Formatea un porcentaje
 */
export const formatPercent = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

/**
 * Extrae el dominio de una URL
 */
export const getDomainFromUrl = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return url;
  }
};

/**
 * Formatea un nombre para mostrar (Nombre Apellido)
 */
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${capitalizeWords(firstName)} ${capitalizeWords(lastName)}`.trim();
};

/**
 * Formatea un DNI argentino
 */
export const formatDNI = (dni: string): string => {
  const cleaned = dni.replace(/\D/g, '');
  return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Formatea un código postal argentino
 */
export const formatPostalCode = (code: string): string => {
  const cleaned = code.replace(/\D/g, '');
  if (cleaned.length === 4) {
    return cleaned;
  }
  return code;
};

export default {
  formatPrice,
  formatNumber,
  formatDate,
  formatRelativeTime,
  capitalizeWords,
  slugify,
  truncateText,
  formatBytes,
  formatDuration,
  formatPhoneNumber,
  formatPercent,
  getDomainFromUrl,
  formatFullName,
  formatDNI,
  formatPostalCode
};