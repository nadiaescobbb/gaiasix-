export const products = [
  // === TOPS ===
  {
    id: 1,
    name: 'Top trick',
    slug: 'top-trick',
    category: 'tops',
    price: 7350,
    image: '/images/products/top-trick.avif',
    images: ['/images/products/top-trick.avif'],
    description: 'top tul manga larga liso',
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
    id: 2,
    name: 'Top tini',
    slug: 'top-tini',
    category: 'tops',
    price: 11700,
    image: '/images/products/top-tini.avif',
    images: ['/images/products/top-tini.avif'],
    description: 'top micro buche bufanda',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },
  
  {
    id: 3,
    name: 'Top anja',
    slug: 'top-anja',
    category: 'tops',
    price: 13500,
    image: '/images/products/top-anja.avif',
    images: ['/images/products/top-anja.avif'],
    description: 'top micro asim pico con cuello manga larga',
    sizes: ['S', 'M'],
    colors: ['Gris'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },

  {
    id: 4,
    name: 'Top drape',
    slug: 'top-drape',
    category: 'tops',
    price: 13550,
    image: '/images/products/top-drape.avif',
    images: ['/images/products/top-drape.avif'],
    description: 'top micro corpiño para atar',
    sizes: ['S', 'M'],
    colors: ['Negro', 'Bordo'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },

  {
    id: 5,
    name: 'Top fylo',
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
    id: 6, 
    name: 'Mini trace',
    slug: 'mini-trace',
    category: 'faldas',
    price: 11375,
    image: '/images/products/mini-trace.avif',
    images: ['/images/products/mini-trace.avif'],
    description: 'Pollera micro nudo',
    sizes: ['S','M'],
    colors: ['Negro'],
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },

  {
    id: 7,
    name: 'Mini lark',
    slug: 'mini-lark',
    category: 'faldas',
    price: 11125,
    image: '/images/products/mini-lark.avif',
    images: ['/images/products/mini-lark.avif'],
    description: 'Pollera micro volado frunce',
    sizes: ['S','M'],
    colors: ['Negro'],
    care: 'Lavar a mano con agua fría',
    stock: 1,
    featured: true,
    active: true,
  },

  // === SETS ===
  {
    id: 8, 
    name: 'Set feral',
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
    id: 9, 
    name: 'Set seline',
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
    id: 10,
    name: 'Vestido platt',
    slug: 'vestido-platt',
    category: 'vestidos',
    price: 23500,
    image: '/images/products/vestido-platt.avif',
    images: ['/images/products/vestido-platt.avif'],
    description: 'Vestido micro cuello bote falda volado',
    sizes: ['S','M'],
    colors: ['Negro'],
    care: 'Lavar a mano con agua fría',
    stock: 2,
    featured: true,
    active: true,
  },

  {
    id: 11, // ✅ CORREGIDO: era 25
    name: 'Vestido inessia',
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
    id: 12, 
    name: 'Vestido stun',
    slug: 'vestido-stun',
    category: 'vestidos',
    price: 21500,
    image: '/images/products/vestido-stun.avif',
    images: ['/images/products/vestido-stun.avif'],
    description: 'Vestido micro strapless para atar',
    sizes: ['S', 'M'],
    colors: ['Negro', 'Chocolate'],
    stock: 3,
    featured: true,
    active: true,
  },

  {
    id: 13, 
    name: 'Vestido zetra',
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
];

// ============================================
// CATEGORÍAS
// ============================================

export const categories = [
  { id: 'all', name: 'Todo', slug: 'todo', order: 0 },
  { id: 'vestidos', name: 'Vestidos', slug: 'vestidos', order: 1 },
  { id: 'tops', name: 'Tops', slug: 'tops', order: 2 },
  { id: 'sets', name: 'Sets', slug: 'sets', order: 3 },
  { id: 'blusas', name: 'Blusas', slug: 'blusas', order: 4 },
  { id: 'faldas', name: 'Faldas', slug: 'faldas', order: 5 },
  { id: 'pantalones', name: 'Pantalones', slug: 'pantalones', order: 6 },
  { id: 'camperas', name: 'Camperas', slug: 'camperas', order: 7 },
];

// ============================================
// VALIDACIONES MEJORADAS
// ============================================

export const validateProducts = () => {
  const errors = [];
  const ids = new Set();
  
  products.forEach((product, index) => {
    // Validar ID único
    if (ids.has(product.id)) {
      errors.push(`❌ ID duplicado: ${product.id} en producto "${product.name}" (índice ${index})`);
    }
    ids.add(product.id);

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

    // Validar slug único
    const duplicateSlugs = products.filter(p => p.slug === product.slug);
    if (duplicateSlugs.length > 1) {
      errors.push(`⚠️ Slug duplicado: "${product.slug}"`);
    }
  });
  
  if (errors.length > 0) {
    console.error('🔴 ERRORES EN PRODUCTOS:');
    errors.forEach(error => console.error(error));
    return false;
  } else {
    console.log('✅ Todos los productos validados correctamente');
    console.log(`📦 Total de productos: ${products.length}`);
    console.log(`🏷️ IDs: ${Array.from(ids).sort((a, b) => a - b).join(', ')}`);
    return true;
  }
};

// Ejecutar validación en desarrollo
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  validateProducts();
}

// ============================================
// HELPERS
// ============================================

export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

export const getProductBySlug = (slug) => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return products.filter(p => p.active);
  }
  return products.filter(p => p.category === categoryId && p.active);
};

export const getFeaturedProducts = (limit = 3) => {
  return products
    .filter(p => p.featured && p.active)
    .slice(0, limit);
};