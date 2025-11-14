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
    sizes: ['s'],
    colors: ['Marrón'],
    material: 'Tul',
    care: "Lavar con cuidado, preferiblemente a mano o ciclo suave. Evitar secadora.",
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },

  {
    id: 9,
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
    id: 7,
    name: 'Top anja',
    slug: 'top-anja',
    category: 'tops',
    price: 13500,
    image: '/images/products/top-anja.avif',
    images: ['/images/products/top-anja.avif'],
    description: 'top micro asim pico con cuello manga larga',
    sizes: ['S', 'M'],
    colors: ['gris'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },

  {
    id: 8,
    name: 'Top drape',
    slug: 'top-drape',
    category: 'tops',
    price: 13550,
    image: '/images/products/top-drape.avif',
    images: ['/images/products/top-drape.avif'],
    description: 'top micro corpiño para atar',
    sizes: ['S', 'M'],
    colors: ['Negro', 'bordo'],
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },

   {
    id: 9,
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
    id: 10,
    name: 'mini trace',
    slug: 'mini trace',
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
    id: 10,
    name: 'mini lark',
    slug: 'mini lark',
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
    id: 4,
    name: 'Set feral',
    slug: 'set-feral',
    category: 'sets', 
    price: 15670,
    image: '/images/products/set-feral.avif',
    images: ['/images/products/set-feral.avif'],
    description: 'Conjunto completo para un look coordinado.',
    sizes: ['S'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    active: true,
  },
  {
    id: 5,
    name: 'Set seline',
    slug: 'set-seline',
    category: 'sets',
    price: 12250, 
    image: '/images/products/set-seline.avif',
    images: ['/images/products/set-seline.avif'],
    description: 'Conjunto elegante en tul, perfecto para ocasiones especiales.',
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
    id: 24,
    name: 'Vestido platt',
    slug: 'vestido-miel',
    category: 'vestidos',
    price: 23500,
    image: '/images/products/vestido-platt.avif',
    images: ['/images/products/vestido-platt.avif'],
    description: 'Vestido micro cuello bote falda volado ',
    sizes: ['s','m'],
    colors: ['Negro'],
    care: 'Lavar a mano con agua fría',
    stock: 2,
    featured: true,
    active: true,
  },

  {
    id: 25,
    name: 'Vestido inessia',
    slug: 'vestido-inessia',
    category: 'vestidos',
    price: 21500,
    image: '/images/products/vestido-inessia.avif',
    images: ['/images/products/vestido-inessia.avif'],
    description: 'Vestido micro falda para atar',
    sizes: ['s', 'm'],
    colors: ['Negro'],
    stock: 2,
    featured: true,
    active: true,
  },

  {
    id: 26,
    name: 'Vestido stun',
    slug: 'vestido-stun',
    category: 'vestidos',
    price: 21500,
    image: '/images/products/vestido-stun.avif',
    images: ['/images/products/vestido-stun.avif'],
    description: 'Vestido micro strapless para atar',
    sizes: ['s', 'm'],
    colors: ['Negro', 'chocolate'],
    stock: 3,
    featured: true,
    active: true,
  },


   {
    id: 27,
    name: 'Vestido zetra',
    slug: 'vestido-zetra',
    category: 'vestidos',
    price: 13230,
    image: '/images/products/vestido-zetra.avif',
    images: ['/images/products/vestido-zetra.avif'],
    description: 'Elegancia sin esfuerzo.',
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
// VALIDACIONES
// ============================================

export const validateProducts = () => {
  const errors = [];
  
  products.forEach(product => {
    if (!product.price || product.price <= 0) {
      errors.push(`Producto "${product.name}" sin precio válido`);
    }
    if (!product.sizes || product.sizes.length === 0) {
      errors.push(`Producto "${product.name}" sin tallas`);
    }
    if (product.stock < 0) {
      errors.push(`Producto "${product.name}" con stock negativo`);
    }
  });
  
  if (errors.length > 0) {
    console.error('❌ Errores en productos:', errors);
  } else {
    console.log('✅ Todos los productos validados correctamente');
  }
  
  return errors;
};

// Ejecutar validación al importar
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  validateProducts();
}