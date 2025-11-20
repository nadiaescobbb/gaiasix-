// ===================================================
// CONFIGURACIÓN DE ENVÍOS Y ENTREGAS
// ===================================================

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
  freeThreshold?: number; // Precio mínimo para envío gratis
  available: boolean;
  icon: string;
}

export interface ShippingZone {
  id: string;
  name: string;
  provinces: string[];
  methods: string[]; // IDs de métodos disponibles
}

export interface ShippingConfig {
  defaultMethod: string;
  freeShippingThreshold: number;
  availableMethods: ShippingMethod[];
  shippingZones: ShippingZone[];
  processingTime: string;
  returnPolicy: {
    days: number;
    conditions: string[];
  };
}

// ===================================================
// MÉTODOS DE ENVÍO DISPONIBLES
// ===================================================

export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Envío Estándar',
    description: 'Entrega en 3-5 días hábiles',
    price: 2500,
    deliveryTime: '3-5 días hábiles',
    freeThreshold: 50000,
    available: true,
    icon: '🚚'
  },
  {
    id: 'express',
    name: 'Envío Express',
    description: 'Entrega en 24-48 horas',
    price: 4500,
    deliveryTime: '24-48 horas',
    freeThreshold: 80000,
    available: true,
    icon: '⚡'
  },
  {
    id: 'pickup',
    name: 'Retiro en Showroom',
    description: 'Retirá gratis en nuestro showroom',
    price: 0,
    deliveryTime: 'Coordinado por WhatsApp',
    available: true,
    icon: '🏪'
  },
  {
    id: 'international',
    name: 'Envío Internacional',
    description: 'América Latina - Consultar costos',
    price: 15000,
    deliveryTime: '7-15 días hábiles',
    available: false, // Temporalmente no disponible
    icon: '🌎'
  }
];

// ===================================================
// ZONAS DE ENVÍO
// ===================================================

export const shippingZones: ShippingZone[] = [
  {
    id: 'tierra-del-fuego',
    name: 'Tierra del Fuego',
    provinces: ['Tierra del Fuego'],
    methods: ['standard', 'express', 'pickup']
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    provinces: ['Santa Cruz', 'Chubut', 'Río Negro', 'Neuquén'],
    methods: ['standard', 'express']
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    provinces: ['Buenos Aires'],
    methods: ['standard', 'express']
  },
  {
    id: 'centro',
    name: 'Región Centro',
    provinces: ['Córdoba', 'Santa Fe', 'Entre Ríos', 'La Pampa'],
    methods: ['standard', 'express']
  },
  {
    id: 'norte',
    name: 'Región Norte',
    provinces: ['Jujuy', 'Salta', 'Formosa', 'Chaco', 'Santiago del Estero', 'Tucumán', 'Catamarca', 'La Rioja', 'Misiones', 'Corrientes'],
    methods: ['standard']
  },
  {
    id: 'cuyo',
    name: 'Región Cuyo',
    provinces: ['Mendoza', 'San Juan', 'San Luis'],
    methods: ['standard', 'express']
  }
];

// ===================================================
// CONFIGURACIÓN PRINCIPAL
// ===================================================

export const shippingConfig: ShippingConfig = {
  defaultMethod: 'standard',
  freeShippingThreshold: 50000, // $50.000 para envío gratis
  availableMethods: shippingMethods.filter(method => method.available),
  shippingZones,
  processingTime: '24-48 horas hábiles',
  returnPolicy: {
    days: 7,
    conditions: [
      'El producto debe estar en perfecto estado',
      'Debe conservar todas las etiquetas',
      'No debe haber sido usado',
      'Presentar ticket de compra',
      'El costo de envío de devolución corre por cuenta del cliente'
    ]
  }
};

// ===================================================
// FUNCIONES UTILITARIAS
// ===================================================

/**
 * Calcula el costo de envío basado en el total del carrito
 */
export function calculateShipping(cartTotal: number, methodId: string = 'standard'): number {
  const method = shippingMethods.find(m => m.id === methodId);
  
  if (!method || !method.available) {
    return 0;
  }

  // Envío gratis si supera el threshold
  if (method.freeThreshold && cartTotal >= method.freeThreshold) {
    return 0;
  }

  return method.price;
}

/**
 * Obtiene métodos de envío disponibles para una provincia
 */
export function getAvailableMethodsForProvince(province: string): ShippingMethod[] {
  const zone = shippingZones.find(z => 
    z.provinces.some(p => p.toLowerCase() === province.toLowerCase())
  );
  
  if (!zone) {
    return shippingMethods.filter(m => m.available && m.id === 'standard');
  }

  return shippingMethods.filter(method => 
    method.available && zone.methods.includes(method.id)
  );
}

/**
 * Verifica si una provincia tiene envío gratis disponible
 */
export function hasFreeShipping(province: string, cartTotal: number): boolean {
  const methods = getAvailableMethodsForProvince(province);
  return methods.some(method => 
    method.freeThreshold && cartTotal >= method.freeThreshold
  );
}

/**
 * Obtiene el tiempo de entrega estimado
 */
export function getEstimatedDelivery(methodId: string): string {
  const method = shippingMethods.find(m => m.id === methodId);
  return method?.deliveryTime || '3-5 días hábiles';
}

/**
 * Obtiene el método de envío por defecto para una provincia
 */
export function getDefaultMethodForProvince(province: string): string {
  const availableMethods = getAvailableMethodsForProvince(province);
  const standardMethod = availableMethods.find(m => m.id === 'standard');
  
  if (standardMethod && standardMethod.available) {
    return 'standard';
  }
  
  return availableMethods[0]?.id || 'standard';
}

/**
 * Valida si una provincia está dentro de las zonas de envío
 */
export function isValidProvince(province: string): boolean {
  return shippingZones.some(zone => 
    zone.provinces.some(p => p.toLowerCase() === province.toLowerCase())
  );
}

/**
 * Obtiene todas las provincias disponibles para envío
 */
export function getAllProvinces(): string[] {
  return shippingZones.flatMap(zone => zone.provinces).sort();
}

// ===================================================
// DATOS PARA FORMULARIOS
// ===================================================

export const argentinianProvinces = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán'
];

// ===================================================
// VALIDACIÓN DE CONFIGURACIÓN
// ===================================================

export function validateShippingConfig(): boolean {
  const errors: string[] = [];

  // Validar que exista el método por defecto
  const defaultMethod = shippingMethods.find(m => m.id === shippingConfig.defaultMethod);
  if (!defaultMethod) {
    errors.push('❌ Método de envío por defecto no encontrado');
  }

  // Validar que todos los métodos en zonas existan
  shippingZones.forEach(zone => {
    zone.methods.forEach(methodId => {
      const methodExists = shippingMethods.some(m => m.id === methodId);
      if (!methodExists) {
        errors.push(`❌ Método "${methodId}" no existe en zona "${zone.name}"`);
      }
    });
  });

  // Validar provincias duplicadas
  const allProvinces = shippingZones.flatMap(zone => zone.provinces);
  const duplicateProvinces = allProvinces.filter((province, index) => 
    allProvinces.indexOf(province) !== index
  );
  
  if (duplicateProvinces.length > 0) {
    errors.push(`❌ Provincias duplicadas: ${duplicateProvinces.join(', ')}`);
  }

  if (errors.length > 0) {
    console.error('🔴 ERRORES EN CONFIGURACIÓN DE ENVÍOS:');
    errors.forEach(error => console.error(error));
    return false;
  }

  console.log('✅ Configuración de envíos validada correctamente');
  return true;
}

// Validar en desarrollo
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  validateShippingConfig();
}