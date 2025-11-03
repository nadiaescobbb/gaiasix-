// ============================================
// PRODUCTOS PRINCIPALES
// ============================================

export const products = [
  // === TOPS ===
  {
    id: 1,
    name: 'Top Adara',
    slug: 'top-adara',
    category: 'tops',
    price: 7500,
    image: '/images/products/top-adara.avif',
    images: ['/images/products/top-adara.avif'],
    description: 'Top moderno y versátil, perfecto para cualquier ocasión. Diseño cómodo que se adapta a tu estilo.',
    sizes: ['Talle único'],
    colors: ['Marrón'],
    material: 'Tul',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    new: true,
    active: true,
  },
  {
    id: 7,
    name: 'Top Borgo',
    slug: 'top-borgo',
    category: 'tops',
    price: 12450,
    image: '/images/products/top-borgo.avif',
    images: ['/images/products/top-borgo.avif'],
    description: 'Top elegante con diseño único. Ideal para destacar en cualquier ocasión.',
    sizes: ['S', 'M'],
    colors: ['Negro', 'Bordeaux'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
    featured: true,
    active: true,
  },
  {
    id: 13,
    name: 'Top Black',
    slug: 'top-black',
    category: 'tops',
    price: 12500,
    image: '/images/products/top-black.avif',
    images: ['/images/products/top-black.avif'],
    description: 'Este top combina con todo y se siente increíble. Perfecto para esa salida que no planeaste pero terminó siendo épica.',
    sizes: ['S'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    active: true,
  },
  {
    id: 14,
    name: 'Top Halter',
    slug: 'top-halter',
    category: 'tops',
    price: 11200,
    image: '/images/products/top-halter.avif',
    images: ['/images/products/top-halter.avif'],
    description: 'Fresco, simple y con ese toque que te diferencia. Para días de sol y noches de verano.',
    sizes: ['S'],
    colors: ['Blanco'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    active: true,
  },

  // === BLUSAS ===
  {
    id: 2,
    name: 'Blusa Albany',
    slug: 'blusa-albany',
    category: 'blusas',
    price: 20550,
    image: '/images/products/blusa-albany.avif',
    images: ['/images/products/blusa-albany.avif'],
    description: 'Blusa sofisticada con detalles únicos. Perfecta para ocasiones especiales o un look casual elegante.',
    sizes: ['S', 'M'],
    colors: ['Blanco', 'Negro'],
    material: 'Encaje',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    active: true,
  },

  // === CAMISAS ===
  {
    id: 15,
    name: 'Camisa Oversized Blanca',
    slug: 'camisa-oversized-blanca',
    category: 'camisas',
    price: 15800,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'],
    description: 'La camisa que necesitás en tu vida. Relajada, con onda y súper versátil.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blanco'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 15,
    active: true,
  },
  {
    id: 16,
    name: 'Camisa Seda Negra',
    slug: 'camisa-seda-negra',
    category: 'camisas',
    price: 19800,
    image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500',
    images: ['https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500'],
    description: 'Lujo que se siente. Esa camisa que te hace caminar diferente.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro'],
    material: 'Seda natural',
    care: 'Lavar a mano con agua fría',
    stock: 8,
    active: true,
  },

  // === FALDAS ===
  {
    id: 3,
    name: 'Falda Mos',
    slug: 'falda-mos',
    category: 'faldas',
    price: 12300,
    image: '/images/products/falda-mos.avif',
    images: ['/images/products/falda-mos.avif'],
    description: 'Falda mini con estilo moderno. Perfecta para combinar con cualquier top.',
    sizes: ['S'],
    colors: ['Beige'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    active: true,
  },
  {
    id: 17,
    name: 'Falda Tania',
    slug: 'falda-tania',
    category: 'faldas',
    price: 18900,
    image: '/images/products/falda-tania.avif',
    images: ['/images/products/falda-tania.avif'],
    description: 'Esa falda que te hace sentir poderosa. Elegante sin ser formal, cómoda sin perder estilo.',
    sizes: ['S'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    active: true,
  },
  {
    id: 18,
    name: 'Mini Globo',
    slug: 'mini-globo',
    category: 'faldas',
    price: 16900,
    image: '/images/products/mini-globo.avif',
    images: ['/images/products/mini-globo.avif'],
    description: 'Movimiento y elegancia. Perfecta para sentirte femenina sin perder tu esencia.',
    sizes: ['S'],
    colors: ['Rojo'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    active: true,
  },

  // === PANTALONES ===
  {
    id: 19,
    name: 'Pantalón Wide Leg Gris',
    slug: 'pantalon-wide-leg-gris',
    category: 'pantalones',
    price: 22500,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500',
    images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500'],
    description: 'Comodidad nivel experto. Te mueves libre y te ves increíble.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gris'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 15,
    active: true,
  },
  {
    id: 20,
    name: 'Pantalón Cargo Negro',
    slug: 'pantalon-cargo-negro',
    category: 'pantalones',
    price: 24500,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500'],
    description: 'Funcional con estilo. Para esos días que necesitás comodidad pero no querés sacrificar la onda.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 18,
    active: true,
  },

  // === CAMPERAS ===
  {
    id: 21,
    name: 'Campera Sale',
    slug: 'campera-sale',
    category: 'camperas',
    price: 45000,
    image: '/images/products/campera-sale.avif',
    images: ['/images/products/campera-sale.avif'],
    description: 'La pieza que transforma cualquier outfit. Actitud pura en formato campera.',
    sizes: ['S', 'M'],
    colors: ['Negro'],
    material: 'Cuero sintético premium',
    care: 'Limpieza profesional recomendada',
    stock: 1,
    featured: true,
    active: true,
  },

  // === VESTIDOS ===
  {
    id: 23,
    name: 'Vestido Ciel',
    slug: 'vestido-ciel',
    category: 'vestidos',
    price: 28500,
    image: '/images/products/vestido-ciel.avif',
    images: ['/images/products/vestido-ciel.avif'],
    description: 'Elegancia sin esfuerzo. Ese vestido que te salva en cualquier ocasión y siempre te hace sentir especial.',
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
    name: 'Vestido Ursula',
    slug: 'vestido-ursula',
    category: 'vestidos',
    price: 32500,
    image: '/images/products/vestido-ursula.avif',
    images: ['/images/products/vestido-ursula.avif'],
    description: 'Para esos momentos que pedían algo especial. Te vas a sentir increíble, te lo garantizo.',
    sizes: ['XS'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    active: true,
  },

  // === SETS ===
  {
    id: 4,
    name: 'Set Total Black',
    slug: 'set-total-black',
    category: 'sets', 
    price: 15670,
    image: '/images/products/set-totalblack.avif',
    images: ['/images/products/set-totalblack.avif'],
    description: 'Conjunto completo para un look coordinado. Elegante y versátil.',
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
    name: 'Set Kiss',
    slug: 'set-kiss',
    category: 'sets', 
    image: '/images/products/set-kiss.avif',
    images: ['/images/products/set-kiss.avif'],
    description: 'Conjunto completo para un look coordinado. Elegante y versátil.',
    sizes: ['S'],
    colors: ['Tul'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 1,
    featured: true,
    active: true,
  },
];

// ============================================
// CATEGORÍAS (CORREGIDAS)
// ============================================

export const categories = [
  { 
    id: 'all', 
    name: 'Todo',
    slug: 'todo',
    description: 'Toda nuestra colección',
    icon: '✨',
    order: 0
  },
  { 
    id: 'vestidos', 
    name: 'Vestidos',
    slug: 'vestidos',
    description: 'Elegancia sin esfuerzo',
    icon: '👗',
    order: 1
  },
  { 
    id: 'blusas', 
    name: 'Blusas',
    slug: 'blusas',
    description: 'Sofisticación en cada detalle',
    icon: '👚',
    order: 2
  },
  { 
    id: 'camisas', 
    name: 'Camisas',
    slug: 'camisas',
    description: 'Versátiles y atemporales',
    icon: '👔',
    order: 3
  },
  { 
    id: 'pantalones', 
    name: 'Pantalones',
    slug: 'pantalones',
    description: 'Comodidad con estilo',
    icon: '👖',
    order: 4
  },
  { 
    id: 'faldas', 
    name: 'Faldas',
    slug: 'faldas',
    description: 'Feminidad moderna',
    icon: '🩱',
    order: 5
  },
  { 
    id: 'camperas', 
    name: 'Camperas',
    slug: 'camperas',
    description: 'La pieza que completa tu look',
    icon: '🧥',
    order: 6
  },
  { 
    id: 'sets', // ✅ Plural para consistencia
    name: 'Sets',
    slug: 'sets',
    description: 'Conjuntos coordinados',
    icon: '👯',
    order: 7
  },
  { 
    id: 'tops', 
    name: 'Tops',
    slug: 'tops',
    description: 'Básicos con personalidad',
    icon: '👕',
    order: 8
  },
];

// ============================================
// IMÁGENES DEL HERO/SLIDER
// ============================================

export const heroImages = [
  '/images/products/vestidos-main.jpg',
  '/images/products/campera-sale.avif', // ✅ Cambié a .avif
];

// ============================================
// UTILIDADES Y HELPERS
// ============================================

/**
 * Obtener productos destacados
 */
export const getFeaturedProducts = () => {
  return products.filter(p => p.featured && p.active);
};

/**
 * Obtener productos nuevos
 */
export const getNewProducts = () => {
  return products.filter(p => p.new && p.active);
};

/**
 * Obtener productos por categoría
 */
export const getProductsByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return products.filter(p => p.active);
  }
  return products.filter(p => p.category === categoryId && p.active);
};

/**
 * Buscar producto por ID
 */
export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

/**
 * Buscar producto por slug
 */
export const getProductBySlug = (slug) => {
  return products.find(p => p.slug === slug);
};

/**
 * Buscar productos
 */
export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.active && (
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    )
  );
};

/**
 * Obtener productos relacionados
 */
export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => 
      p.id !== productId && 
      p.category === product.category && 
      p.active
    )
    .slice(0, limit);
};

/**
 * Verificar disponibilidad de talla
 */
export const isSizeAvailable = (productId, size) => {
  const product = getProductById(productId);
  if (!product) return false;
  
  return product.sizes.includes(size) && product.stock > 0;
};

/**
 * Obtener rango de precios
 */
export const getPriceRange = () => {
  const prices = products.filter(p => p.active).map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

/**
 * Filtrar productos por rango de precio
 */
export const filterByPriceRange = (minPrice, maxPrice) => {
  return products.filter(p => 
    p.active && 
    p.price >= minPrice && 
    p.price <= maxPrice
  );
};

/**
 * Obtener colores disponibles
 */
export const getAvailableColors = () => {
  const colorsSet = new Set();
  products.forEach(p => {
    if (p.active && p.colors) {
      p.colors.forEach(color => colorsSet.add(color));
    }
  });
  return Array.from(colorsSet);
};

/**
 * Filtrar por color
 */
export const filterByColor = (color) => {
  return products.filter(p => 
    p.active && 
    p.colors && 
    p.colors.includes(color)
  );
};

/**
 * Ordenar productos
 */
export const sortProducts = (productsArray, sortBy = 'default') => {
  const sorted = [...productsArray];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.filter(p => p.new);
    default:
      return sorted;
  }
};

/**
 * Obtener estadísticas del catálogo
 */
export const getCatalogStats = () => {
  const activeProducts = products.filter(p => p.active);
  
  return {
    totalProducts: activeProducts.length,
    totalCategories: categories.length - 1,
    featuredProducts: products.filter(p => p.featured && p.active).length,
    newProducts: products.filter(p => p.new && p.active).length,
    averagePrice: activeProducts.length > 0 
      ? Math.round(activeProducts.reduce((sum, p) => sum + p.price, 0) / activeProducts.length)
      : 0,
    priceRange: getPriceRange(),
    productsByCategory: categories
      .filter(c => c.id !== 'all')
      .map(c => ({
        category: c.name,
        count: products.filter(p => p.category === c.id && p.active).length
      }))
  };
};

// ============================================
// EXPORTS
// ============================================

export default {
  products,
  categories,
  heroImages,
  getFeaturedProducts,
  getNewProducts,
  getProductsByCategory,
  getProductById,
  getProductBySlug,
  searchProducts,
  getRelatedProducts,
  isSizeAvailable,
  getPriceRange,
  filterByPriceRange,
  getAvailableColors,
  filterByColor,
  sortProducts,
  getCatalogStats,
};