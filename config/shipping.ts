// config/shipping.ts

// ===================================================
// CONFIGURACIÓN MEJORADA CON MÚLTIPLES TRANSPORTISTAS
// ===================================================

export interface ShippingCarrier {
  id: string;
  name: string;
  logo: string;
  apiEnabled: boolean;
  apiConfig?: {
    baseUrl: string;
    apiKey: string;
    calculatorEndpoint: string;
  };
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
  freeThreshold?: number;
  available: boolean;
  icon: string;
  carrier: string; // 'correo-argentino' | 'andreani' | 'pickup' | 'custom'
  serviceType: string; // Tipo de servicio específico del carrier
  requiresAddress: boolean;
  weightLimit?: number; // kg
  dimensionsLimit?: string; // "LxAxA cm"
  insurance?: number; // Valor del seguro incluido
  tracking: boolean;
  apiCalculated: boolean; // Si el precio se calcula via API
}

export interface ShippingZone {
  id: string;
  name: string;
  provinces: string[];
  carriers: string[]; // Carriers disponibles en esta zona
  methods: string[]; // IDs de métodos disponibles
  extraCost?: number; // Costo adicional por zona remota
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
// LISTA DE PROVINCIAS ARGENTINAS
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
// TRANSPORTISTAS DISPONIBLES
// ===================================================

export const shippingCarriers: ShippingCarrier[] = [
  {
    id: 'correo-argentino',
    name: 'Correo Argentino',
    logo: '📮',
    apiEnabled: true,
    apiConfig: {
      baseUrl: 'https://api.correoargentino.com.ar',
      apiKey: process.env.CORREO_ARGENTINO_API_KEY || '',
      calculatorEndpoint: '/shipping/calculate'
    }
  },
  {
    id: 'andreani',
    name: 'Andreani',
    logo: '🚛',
    apiEnabled: true,
    apiConfig: {
      baseUrl: 'https://api.andreani.com',
      apiKey: process.env.ANDREANI_API_KEY || '',
      calculatorEndpoint: '/v1/tarifas'
    }
  },
  {
    id: 'pickup',
    name: 'Retiro en Local',
    logo: '🏪',
    apiEnabled: false
  },
  {
    id: 'custom',
    name: 'Envío Propio',
    logo: '🚚',
    apiEnabled: false
  }
];

// ===================================================
// MÉTODOS DE ENVÍO EXPANDIDOS
// ===================================================

export const shippingMethods: ShippingMethod[] = [
  // CORREO ARGENTINO
  {
    id: 'correo-standard',
    name: 'Correo Argentino - Estandar',
    description: 'Envío económico a todo el país',
    price: 1800,
    deliveryTime: '5-8 días hábiles',
    freeThreshold: 45000,
    available: true,
    icon: '📮',
    carrier: 'correo-argentino',
    serviceType: 'standard',
    requiresAddress: true,
    weightLimit: 25,
    dimensionsLimit: '60x60x60',
    insurance: 10000,
    tracking: true,
    apiCalculated: true
  },
  {
    id: 'correo-express',
    name: 'Correo Argentino - Express',
    description: 'Entrega prioritaria',
    price: 3500,
    deliveryTime: '2-4 días hábiles',
    freeThreshold: 70000,
    available: true,
    icon: '📮⚡',
    carrier: 'correo-argentino',
    serviceType: 'express',
    requiresAddress: true,
    weightLimit: 15,
    tracking: true,
    apiCalculated: true
  },
  {
    id: 'correo-priority',
    name: 'Correo Argentino - Prioritario',
    description: 'Máxima velocidad de entrega',
    price: 5000,
    deliveryTime: '24-48 horas',
    freeThreshold: 90000,
    available: true,
    icon: '📮🚀',
    carrier: 'correo-argentino',
    serviceType: 'priority',
    requiresAddress: true,
    weightLimit: 10,
    tracking: true,
    apiCalculated: true
  },

  // ANDREANI
  {
    id: 'andreani-standard',
    name: 'Andreani - Estandar',
    description: 'Logística profesional a domicilio',
    price: 2200,
    deliveryTime: '3-6 días hábiles',
    freeThreshold: 50000,
    available: true,
    icon: '🚛',
    carrier: 'andreani',
    serviceType: 'standard',
    requiresAddress: true,
    weightLimit: 30,
    dimensionsLimit: '80x80x80',
    insurance: 20000,
    tracking: true,
    apiCalculated: true
  },
  {
    id: 'andreani-express',
    name: 'Andreani - Express',
    description: 'Entrega rápida con seguimiento',
    price: 4000,
    deliveryTime: '1-3 días hábiles',
    freeThreshold: 75000,
    available: true,
    icon: '🚛⚡',
    carrier: 'andreani',
    serviceType: 'express',
    requiresAddress: true,
    weightLimit: 20,
    tracking: true,
    apiCalculated: true
  },
  {
    id: 'andreani-urgent',
    name: 'Andreani - Urgente',
    description: 'Servicio premium de entrega',
    price: 6500,
    deliveryTime: '24 horas',
    freeThreshold: 100000,
    available: false, // Solo para CABA y GBA
    icon: '🚛🚨',
    carrier: 'andreani',
    serviceType: 'urgent',
    requiresAddress: true,
    weightLimit: 15,
    tracking: true,
    apiCalculated: true
  },

  // RETIRO EN LOCAL
  {
    id: 'pickup-showroom',
    name: 'Retiro en Showroom',
    description: 'Retirá gratis en nuestro showroom de Palermo',
    price: 0,
    deliveryTime: 'Coordinado por WhatsApp',
    available: true,
    icon: '🏪',
    carrier: 'pickup',
    serviceType: 'showroom',
    requiresAddress: false,
    tracking: false,
    apiCalculated: false
  },
  {
    id: 'pickup-point',
    name: 'Punto de Retiro',
    description: 'Retirá en nuestros puntos asociados',
    price: 0,
    deliveryTime: '2-3 días hábiles',
    available: true,
    icon: '📍',
    carrier: 'pickup',
    serviceType: 'pickup-point',
    requiresAddress: false,
    tracking: false,
    apiCalculated: false
  },

  // ENVÍO PROPIO (backup)
  {
    id: 'custom-standard',
    name: 'Envío Propio - Estandar',
    description: 'Nuestro servicio de envío',
    price: 2500,
    deliveryTime: '4-7 días hábiles',
    freeThreshold: 50000,
    available: true,
    icon: '🚚',
    carrier: 'custom',
    serviceType: 'standard',
    requiresAddress: true,
    tracking: true,
    apiCalculated: false
  }
];

// ===================================================
// ZONAS DE ENVÍO MEJORADAS
// ===================================================

export const shippingZones: ShippingZone[] = [
  {
    id: 'caba-gba',
    name: 'CABA y GBA',
    provinces: ['Buenos Aires'],
    carriers: ['correo-argentino', 'andreani', 'pickup', 'custom'],
    methods: [
      'correo-standard', 'correo-express', 'correo-priority',
      'andreani-standard', 'andreani-express', 'andreani-urgent',
      'pickup-showroom', 'pickup-point', 'custom-standard'
    ]
  },
  {
    id: 'centro',
    name: 'Región Centro',
    provinces: ['Córdoba', 'Santa Fe', 'Entre Ríos', 'La Pampa'],
    carriers: ['correo-argentino', 'andreani', 'custom'],
    methods: [
      'correo-standard', 'correo-express',
      'andreani-standard', 'andreani-express',
      'custom-standard'
    ]
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    provinces: ['Santa Cruz', 'Chubut', 'Río Negro', 'Neuquén'],
    carriers: ['correo-argentino', 'andreani'],
    methods: [
      'correo-standard', 'correo-express',
      'andreani-standard'
    ],
    extraCost: 800 // Costo adicional por zona remota
  },
  {
    id: 'norte',
    name: 'Región Norte',
    provinces: ['Jujuy', 'Salta', 'Formosa', 'Chaco', 'Santiago del Estero', 'Tucumán', 'Catamarca', 'La Rioja', 'Misiones', 'Corrientes'],
    carriers: ['correo-argentino'],
    methods: ['correo-standard', 'correo-express'],
    extraCost: 500
  },
  {
    id: 'cuyo',
    name: 'Región Cuyo',
    provinces: ['Mendoza', 'San Juan', 'San Luis'],
    carriers: ['correo-argentino', 'andreani'],
    methods: [
      'correo-standard', 'correo-express',
      'andreani-standard'
    ]
  },
  {
    id: 'tierra-del-fuego',
    name: 'Tierra del Fuego',
    provinces: ['Tierra del Fuego'],
    carriers: ['correo-argentino'],
    methods: ['correo-standard'],
    extraCost: 1500
  }
];

// ===================================================
// FUNCIONES UTILITARIAS MEJORADAS
// ===================================================

/**
 * Calcula envío considerando APIs de transportistas
 */
export async function calculateShipping(
  cartTotal: number, 
  methodId: string = 'correo-standard',
  destination?: {
    province: string;
    city: string;
    zipCode: string;
  },
  packageInfo?: {
    weight: number;
    dimensions: string;
  }
): Promise<number> {
  const method = shippingMethods.find(m => m.id === methodId);
  
  if (!method || !method.available) {
    return 0;
  }

  // Envío gratis si supera el threshold
  if (method.freeThreshold && cartTotal >= method.freeThreshold) {
    return 0;
  }

  // Si el método usa API, calcular precio real
  if (method.apiCalculated && destination) {
    try {
      const apiPrice = await calculateShippingViaAPI(method, destination, packageInfo);
      return apiPrice;
    } catch (error) {
      console.warn(`Error calculando envío via API, usando precio fijo: ${method.price}`);
      return method.price;
    }
  }

  // Aplicar costo adicional por zona
  const zone = shippingZones.find(z => 
    z.provinces.some(p => p.toLowerCase() === destination?.province.toLowerCase())
  );
  
  const basePrice = method.price;
  const extraCost = zone?.extraCost || 0;
  
  return basePrice + extraCost;
}

/**
 * Calcula envío via API del transportista
 */
async function calculateShippingViaAPI(
  method: ShippingMethod,
  destination: { province: string; city: string; zipCode: string },
  packageInfo?: { weight: number; dimensions: string }
): Promise<number> {
  const carrier = shippingCarriers.find(c => c.id === method.carrier);
  
  if (!carrier?.apiEnabled || !carrier.apiConfig) {
    throw new Error(`API no configurada para ${carrier?.name}`);
  }

  // Aquí integrarías con las APIs reales
  // Ejemplo para Correo Argentino:
  if (method.carrier === 'correo-argentino') {
    return await calculateCorreoArgentinoShipping(method, destination, packageInfo);
  }
  
  // Ejemplo para Andreani:
  if (method.carrier === 'andreani') {
    return await calculateAndreaniShipping(method, destination, packageInfo);
  }

  return method.price; // Fallback al precio fijo
}

/**
 * Simulación API Correo Argentino
 */
async function calculateCorreoArgentinoShipping(
  method: ShippingMethod,
  destination: { province: string; city: string; zipCode: string },
  packageInfo?: { weight: number; dimensions: string }
): Promise<number> {
  // En un caso real, harías fetch a la API de Correo Argentino
  // Por ahora usamos el precio fijo como fallback
  console.log('Calculando envío Correo Argentino:', { method: method.serviceType, destination });
  
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return method.price; // Usar precio base por ahora
}

/**
 * Simulación API Andreani
 */
async function calculateAndreaniShipping(
  method: ShippingMethod,
  destination: { province: string; city: string; zipCode: string },
  packageInfo?: { weight: number; dimensions: string }
): Promise<number> {
  // En un caso real, harías fetch a la API de Andreani
  // Por ahora usamos el precio fijo como fallback
  console.log('Calculando envío Andreani:', { method: method.serviceType, destination });
  
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return method.price; // Usar precio base por ahora
}

/**
 * Obtiene métodos disponibles filtrados por transportista
 */
export function getMethodsByCarrier(carrierId: string): ShippingMethod[] {
  return shippingMethods.filter(method => 
    method.carrier === carrierId && method.available
  );
}

/**
 * Obtiene carriers disponibles para una provincia
 */
export function getAvailableCarriersForProvince(province: string): ShippingCarrier[] {
  const zone = shippingZones.find(z => 
    z.provinces.some(p => p.toLowerCase() === province.toLowerCase())
  );
  
  if (!zone) {
    return shippingCarriers.filter(c => c.id === 'correo-argentino');
  }

  return shippingCarriers.filter(carrier => 
    zone.carriers.includes(carrier.id)
  );
}

// ===================================================
// FUNCIONES FALTANTES PARA EL CHECKOUT
// ===================================================

/**
 * Obtiene métodos de envío disponibles para una provincia
 * (Función requerida por el checkout)
 */
export function getAvailableMethodsForProvince(province: string): ShippingMethod[] {
  const zone = shippingZones.find(z => 
    z.provinces.some(p => p.toLowerCase() === province.toLowerCase())
  );
  
  if (!zone) {
    // Si no se encuentra la zona, devolver métodos estándar disponibles
    return shippingMethods.filter(m => m.available && m.id === 'correo-standard');
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
  const standardMethod = availableMethods.find(m => m.id === 'correo-standard');
  
  if (standardMethod && standardMethod.available) {
    return 'correo-standard';
  }
  
  return availableMethods[0]?.id || 'correo-standard';
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
// CONFIGURACIÓN PRINCIPAL ACTUALIZADA
// ===================================================

export const shippingConfig: ShippingConfig = {
  defaultMethod: 'correo-standard',
  freeShippingThreshold: 50000,
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