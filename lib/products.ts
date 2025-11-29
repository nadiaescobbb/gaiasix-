import { logger } from './logger';

// ===================================================
// TYPES
// ===================================================

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  material?: string;
  care?: string;
  stock: number;
  featured?: boolean;
  new?: boolean;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
}

// ===================================================
// CATEGORÍAS
// ===================================================

export const categories: Category[] = [
  { id: 'all', name: 'Todo', slug: 'todo', order: 0 },
  { id: 'vestidos', name: 'Vestidos', slug: 'vestidos', order: 1 },
  { id: 'tops', name: 'Tops', slug: 'tops', order: 2 },
  { id: 'sets', name: 'Sets', slug: 'sets', order: 3 },
  { id: 'faldas', name: 'Faldas', slug: 'faldas', order: 4 },
  { id: 'short', name: 'Short', slug: 'short', order: 5 },
];

// ===================================================
// PRODUCTS DATA - ORDENADO Y CORREGIDO
// ===================================================

export const products: Product[] = [
  // === TOPS ===
  {
    id: 1,
    name: 'Top Floyd',
    slug: 'top-floyd',
    category: 'tops',
    price: 16720,
    image: '/images/noche/top-floyd.avif',
    images: ['/images/noche/top-floyd.avif'],
    description: 'Diseño con escote drapeado y espalda baja, detalle de tachtas en plateado en terminaciones de escote - Abarca talle S, m - Calce: Holgado - medidas aproximadas: contorno busto: 80cm a 95 cm, largo: 50cm. - Las medidas estan tomadas sobre una superficie plana, no sobre el contorno de una persona.',
    sizes: ['S', 'M'],
    colors: ['negro'],
    material: 'licra',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave. Evitar secadora.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 2,
    name: 'Top Mallorca',
    slug: 'top-mallorca',
    category: 'tops',
    price: 16720,
    image: '/images/fotoproducto/top-mallorca.avif',
    images: ['/images/fotoproducto/top-mallorca.avif'],
    description: 'Top elegante de diseño único',
    sizes: ['S'],
    colors: ['marron'],
    material: 'licra',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 3,
    name: 'Top Kira',
    slug: 'top-kira',
    category: 'tops',
    price: 16720,
    image: '/images/fotoproducto/top-kira.avif',
    images: ['/images/fotoproducto/top-kira.avif'],
    description: 'Top versátil en colores marrón y negro',
    sizes: ['S'],
    colors: ['marron', 'negro'],
    material: 'licra',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 4,
    name: 'Top Mili',
    slug: 'top-mili',
    category: 'tops',
    price: 10680,
    image: '/images/noche/top-mili.avif',
    images: ['/images/noche/top-mili.avif'],
    description: 'Crop Top Halter Con Hebilla Microfibra - Verde',
    sizes: ['S'],
    colors: ['verde'],
    material: 'microfibra',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave. Evitar secadora.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 5,
    name: 'Top Trick',
    slug: 'top-trick',
    category: 'tops',
    price: 7350,
    image: '/images/products/top-trick.avif',
    images: ['/images/products/top-trick.avif'],
    description: 'Top tul manga larga liso',
    sizes: ['S'],
    colors: ['Marrón'],
    material: 'Tul',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave. Evitar secadora.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 6,
    name: 'Top Tini',
    slug: 'top-tini',
    category: 'tops',
    price: 11700,
    image: '/images/products/top-tini.avif',
    images: ['/images/products/top-tini.avif'],
    description: 'Top micro buche bufanda',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },
  {
    id: 7,
    name: 'Top Anja',
    slug: 'top-anja',
    category: 'tops',
    price: 13500,
    image: '/images/products/top-anja.avif',
    images: ['/images/products/top-anja.avif'],
    description: 'Top micro asim pico con cuello manga larga',
    sizes: ['S', 'M'],
    colors: ['Gris'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },
  {
    id: 8,
    name: 'Top Drape',
    slug: 'top-drape',
    category: 'tops',
    price: 13550,
    image: '/images/products/top-drape.avif',
    images: ['/images/products/top-drape.avif'],
    description: 'Top micro corpiño para atar',
    sizes: ['S', 'M'],
    colors: ['Negro', 'Bordo'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },
  {
    id: 9,
    name: 'Top Fylo',
    slug: 'top-fylo',
    category: 'tops',
    price: 13550,
    image: '/images/products/top-fylo.avif',
    images: ['/images/products/top-fylo.avif'],
    description: 'Top micro escote cavado',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },

  // === FALDAS ===
  {
    id: 10,
    name: 'Pollera Bri',
    slug: 'pollera-bri',
    category: 'faldas',
    price: 16720,
    image: '/images/fotoproducto/pollera-bri.avif',
    images: ['/images/fotoproducto/pollera-bri.avif'],
    description: 'Pollera elegante en color marrón',
    sizes: ['S'],
    colors: ['marron'],
    material: 'licra',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 11,
    name: 'Mini Trace',
    slug: 'mini-trace',
    category: 'faldas',
    price: 11375,
    image: '/images/products/mini-trace.avif',
    images: ['/images/products/mini-trace.avif'],
    description: 'Pollera micro nudo',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 12,
    name: 'Mini Lark',
    slug: 'mini-lark',
    category: 'faldas',
    price: 11125,
    image: '/images/products/mini-lark.avif',
    images: ['/images/products/mini-lark.avif'],
    description: 'Pollera micro volado frunce',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 13,
    name: 'Pollera Nala',
    slug: 'pollera-nala',
    category: 'faldas',
    price: 30400,
    image: '/images/boho/pollera-nala.avif',
    images: ['/images/boho/pollera-nala.avif'],
    description: 'Falda Larga Encaje - Beige',
    sizes: ['S'],
    colors: ['beige'],
    material: 'encaje',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },

  // === SETS ===
  {
    id: 14,
    name: 'Set Feral',
    slug: 'set-feral',
    category: 'sets',
    price: 15670,
    image: '/images/products/set-feral.avif',
    images: ['/images/products/set-feral.avif'],
    description: 'Conjunto completo para un look coordinado',
    sizes: ['S'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 15,
    name: 'Set Seline',
    slug: 'set-seline',
    category: 'sets',
    price: 12250,
    image: '/images/products/set-seline.avif',
    images: ['/images/products/set-seline.avif'],
    description: 'Conjunto elegante en tul, perfecto para ocasiones especiales',
    sizes: ['S'],
    colors: ['Tul'],
    material: 'Tul premium',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },

  // === VESTIDOS ===
  {
    id: 16,
    name: 'Vestido Issi',
    slug: 'vestido-issi',
    category: 'vestidos',
    price: 30600,
    image: '/images/boho/vestido-issi.avif',
    images: ['/images/boho/vestido-issi.avif'],
    description: 'Vestido largo con tajo tejido',
    sizes: ['S'],
    colors: ['crema'],
    material: 'tejido',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 17,
    name: 'Vestido Rio',
    slug: 'vestido-rio',
    category: 'vestidos',
    price: 33600,
    image: '/images/boho/vestido-rio.avif',
    images: ['/images/boho/vestido-rio.avif'],
    description: 'Vestido largo tela encaje - talle único - medidas aproximadas: ancho de busto:26cm , cintura:31cm , cadera:40cm , largo desde el cuello: 145cm. - Las medidas estan tomadas sobre una superficie plana, no sobre el contorno de una persona.',
    sizes: ['S'],
    colors: ['bordo'],
    material: 'encaje',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 18,
    name: 'Vestido Isla',
    slug: 'vestido-isla',
    category: 'vestidos',
    price: 28400,
    image: '/images/categories/vestido-isla.avif',
    images: ['/images/categories/vestido-isla.avif'],
    description: 'Vestido de tul estampado - Calce: Al cuerpo / abarca talle s y M - medidas aproximadas: Busto: 83cm a 95cm , cintura:60cm a 70cm, largo total: 80cm. El largo total no incluye los lazos de la falda. - La tela se adapta al cuerpo y cede algunos centimetros. - Las medidas estan tomadas sobre una superficie plana, no sobre el contorno de una persona.',
    sizes: ['S', 'M'],
    colors: ['rosa viejo'],
    material: 'microtul estampado',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 19,
    name: 'Vestido Esme',
    slug: 'vestido-esme',
    category: 'vestidos',
    price: 28200,
    image: '/images/boho/vestido-esme-pe.avif',
    images: ['/images/boho/vestido-esme-pe.avif'],
    description: 'Vestido de microtul con volados. Atado al cuello y corto, talle único.',
    sizes: ['S'],
    colors: ['verde'],
    material: 'microtul',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave. Evitar secadora.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 20,
    name: 'Vestido Platt',
    slug: 'vestido-platt',
    category: 'vestidos',
    price: 23500,
    image: '/images/products/vestido-platt.avif',
    images: ['/images/products/vestido-platt.avif'],
    description: 'Vestido micro cuello bote falda volado',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    care: 'Lavar a mano con agua fría',
    stock: 2,
    featured: true,
    active: true,
  },
  {
    id: 21,
    name: 'Vestido Inessia',
    slug: 'vestido-inessia',
    category: 'vestidos',
    price: 21500,
    image: '/images/products/vestido-inessia.avif',
    images: ['/images/products/vestido-inessia.avif'],
    description: 'Vestido micro falda para atar',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    stock: 2,
    featured: true,
    active: true,
  },
  {
    id: 22,
    name: 'Vestido Stun',
    slug: 'vestido-stun',
    category: 'vestidos',
    price: 21500,
    image: '/images/noche/vestido-stun.avif',
    images: ['/images/noche/vestido-stun.avif'],
    description: 'Vestido micro strapless con lazo regulable. Medidas aproximadas: busto:75cm a 95cm , largo total:63cm. - Las medidas estan tomadas sobre una superficie plana, no sobre el contorno de una persona.',
    sizes: ['S', 'M'],
    colors: ['Negro', 'Chocolate'],
    stock: 3,
    featured: true,
    active: true,
  },
  {
    id: 23,
    name: 'Vestido Zetra',
    slug: 'vestido-zetra',
    category: 'vestidos',
    price: 13230,
    image: '/images/products/vestido-zetra.avif',
    images: ['/images/products/vestido-zetra.avif'],
    description: 'Elegancia sin esfuerzo',
    sizes: ['S'],
    colors: ['Negro'],
    material: 'Seda sintética',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 24,
    name: 'Vestido Leria',
    slug: 'vestido-leria',
    category: 'vestidos',
    price: 13230,
    image: '/images/fotoproducto/vestido-leria.avif',
    images: ['/images/fotoproducto/vestido-leria.avif'],
    description: 'Vestido elegante en color beige',
    sizes: ['S'],
    colors: ['beige'],
    material: 'licra',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },

  // === SHORTS ===
  {
    id: 25,
    name: 'Short Texas',
    slug: 'short-texas',
    category: 'short',
    price: 51040,
    image: '/images/noche/short-texas.avif',
    images: ['/images/noche/short-texas.avif'],
    description: 'Short engomado tiro bajo con apliques plateados, trenzado adelante y con pasacintos',
    sizes: ['M', 'L'],
    colors: ['camel', 'chocolate'],
    material: 'ecocuero',
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 26,
    name: 'Short Ibiza',
    slug: 'short-ibiza',
    category: 'short',
    price: 51040,
    image: '/images/fotoproducto/short-ibiza.avif',
    images: ['/images/fotoproducto/short-ibiza.avif'],
    description: 'Short de diseño moderno',
    sizes: ['M'],
    colors: ['negro'],
    material: 'algodón',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 27,
    name: 'Short Print',
    slug: 'short-print',
    category: 'short',
    price: 51040,
    image: '/images/fotoproducto/short-print.avif',
    images: ['/images/fotoproducto/short-print.avif'],
    description: 'Short con estampado único',
    sizes: ['M'],
    colors: ['estampado'],
    material: 'algodón',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    active: true,
  },
];

// ============================================
// VALIDACIONES MEJORADAS
// ============================================

export const validateProducts = (): boolean => {
  const errors: string[] = [];
  const ids = new Set<number>();
  const slugs = new Set<string>();
  
  products.forEach((product: Product, index: number) => {
    // Validar ID único
    if (ids.has(product.id)) {
      errors.push(`❌ ID duplicado: ${product.id} en producto "${product.name}" (índice ${index})`);
    }
    ids.add(product.id);

    // Validar slug único
    if (slugs.has(product.slug)) {
      errors.push(`❌ Slug duplicado: "${product.slug}" en producto "${product.name}"`);
    }
    slugs.add(product.slug);

    // Validar precio
    if (!product.price || product.price <= 0) {
      errors.push(`❌ Producto "${product.name}" sin precio válido`);
    }
    
    // Validar tallas
    if (!product.sizes || product.sizes.length === 0) {
      errors.push(`❌ Producto "${product.name}" sin tallas`);
    }
    
    // Validar stock
    if (product.stock < 0) {
      errors.push(`❌ Producto "${product.name}" con stock negativo`);
    }

    // Validar imagen
    if (!product.image) {
      errors.push(`⚠️ Producto "${product.name}" sin imagen`);
    }

    // Validar categoría existente
    const categoryExists = categories.some(cat => cat.id === product.category);
    if (!categoryExists && product.category !== 'short') {
      errors.push(`❌ Categoría "${product.category}" no existe para producto "${product.name}"`);
    }
  });
  
  if (errors.length > 0) {
    logger.error('🔴 ERRORES EN PRODUCTOS:');
    errors.forEach(error => logger.error(error));
    
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`Productos inválidos:\n${errors.join('\n')}`);
    }
    
    return false;
  } else {
    logger.success('✅ Todos los productos validados correctamente');
    logger.info(`📦 Total de productos: ${products.length}`);
    logger.info(`🏷️ IDs únicos: ${Array.from(ids).sort((a, b) => a - b).join(', ')}`);
    return true;
  }
};

// ============================================
// HELPERS
// ============================================

export const getProductById = (id: number | string): Product | undefined => {
  return products.find(p => p.id === parseInt(id as string));
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === 'all') {
    return products.filter(p => p.active);
  }
  return products.filter(p => p.category === categoryId && p.active);
};

export const getFeaturedProducts = (limit: number = 3): Product[] => {
  return products
    .filter(p => p.featured && p.active)
    .slice(0, limit);
};

export const getNewProducts = (limit: number = 3): Product[] => {
  return products
    .filter(p => p.new && p.active)
    .slice(0, limit);
};

// Ejecutar validación en desarrollo
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  validateProducts();
}