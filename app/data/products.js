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
    image: '/images/products/top-adara.jpg', 
    images: [
      '/images/products/top-adara.jpg',
      '/images/products/top-adara-2.jpg',
    ],
    description: 'Top moderno y versátil, perfecto para cualquier ocasión. Diseño cómodo que se adapta a tu estilo.',
    sizes: ['S', 'M', 'L'],
    colors: ['Negro', 'Blanco'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 15,
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
    image: '/images/products/top-borgo.jpg',
    images: [
      '/images/products/top-borgo.jpg',
    ],
    description: 'Top elegante con diseño único. Ideal para destacar en cualquier ocasión.',
    sizes: ['S', 'M', 'L'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 12,
    featured: true,
    active: true,
  },
  {
    id: 13,
    name: 'Top Cruzado Negro',
    slug: 'top-cruzado-negro',
    category: 'tops',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
    ],
    description: 'Este top combina con todo y se siente increíble. Perfecto para esa salida que no planeaste pero terminó siendo épica.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 20,
    active: true,
  },
  {
    id: 14,
    name: 'Top Halter Blanco',
    slug: 'top-halter-blanco',
    category: 'tops',
    price: 11200,
    image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500',
    images: [
      'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=500',
    ],
    description: 'Fresco, simple y con ese toque que te diferencia. Para días de sol y noches de verano.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blanco'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 18,
    active: true,
  },

  // === BLUSAS ===
  {
    id: 2,
    name: 'Blusa Albany',
    slug: 'blusa-albany',
    category: 'blusas',
    price: 20550,
    image: '/images/products/blusa-albany.jpeg',
    images: [
      '/images/products/blusa-albany.jpeg',
    ],
    description: 'Blusa sofisticada con detalles únicos. Perfecta para ocasiones especiales o un look casual elegante.',
    sizes: ['S', 'M', 'L'],
    colors: ['Blanco', 'Beige'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 10,
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
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    ],
    description: 'La camisa que necesitás en tu vida. Relajada, con onda y súper versátil. De día con jeans, de noche con una falda.',
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
    images: [
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=500',
    ],
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
    name: 'Mini Adara',
    slug: 'mini-adara',
    category: 'faldas',
    price: 12300,
    image: '/images/products/top-adara.jpg', 
    images: [
      '/images/products/top-adara.jpg',
    ],
    description: 'Falda mini con estilo moderno. Perfecta para combinar con cualquier top.',
    sizes: ['S', 'M', 'L'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 10,
    active: true,
  },
  {
    id: 17,
    name: 'Falda Midi Negra',
    slug: 'falda-midi-negra',
    category: 'faldas',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    ],
    description: 'Esa falda que te hace sentir poderosa. Elegante sin ser formal, cómoda sin perder estilo.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 12,
    active: true,
  },
  {
    id: 18,
    name: 'Falda Plisada Gris',
    slug: 'falda-plisada-gris',
    category: 'faldas',
    price: 16900,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500',
    ],
    description: 'Movimiento y elegancia. Perfecta para sentirte femenina sin perder tu esencia.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gris'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 10,
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
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500',
    ],
    description: 'Comodidad nivel experto. Te mueves libre y te ves increíble. ¿Qué más querés?',
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
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
    ],
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
    name: 'Campera Cuero Roja',
    slug: 'campera-cuero-roja',
    category: 'camperas',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    ],
    description: 'La pieza que transforma cualquier outfit. Actitud pura en formato campera.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rojo'],
    material: 'Cuero sintético premium',
    care: 'Limpieza profesional recomendada',
    stock: 5,
    featured: true,
    active: true,
  },
  {
    id: 22,
    name: 'Campera Bomber Negra',
    slug: 'campera-bomber-negra',
    category: 'camperas',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500',
    ],
    description: 'Clásica y atemporal. La campera que siempre vuelve y nunca pasa de moda.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro'],
    material: 'Nylon premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 10,
    active: true,
  },

  // === VESTIDOS ===
  {
    id: 23,
    name: 'Vestido Slip Negro',
    slug: 'vestido-slip-negro',
    category: 'vestidos',
    price: 28500,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    ],
    description: 'Elegancia sin esfuerzo. Ese vestido que te salva en cualquier ocasión y siempre te hace sentir especial.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro'],
    material: 'Seda sintética',
    care: 'Lavar a mano con agua fría',
    stock: 8,
    featured: true,
    active: true,
  },
  {
    id: 24,
    name: 'Vestido Midi Rojo',
    slug: 'vestido-midi-rojo',
    category: 'vestidos',
    price: 32500,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500',
    ],
    description: 'Para esos momentos que pedían algo especial. Te vas a sentir increíble, te lo garantizo.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rojo'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 6,
    featured: true,
    active: true,
  },

  // === SET ===
  {
    id: 4,
    name: 'Set Total Black',
    slug: 'set-total-black',
    category: 'set',
    price: 15670,
    image: '/images/products/conjunto-negro.jpg',
    images: [
      '/images/products/conjunto-negro.jpg',
    ],
    description: 'Conjunto completo para un look coordinado. Elegante y versátil.',
    sizes: ['S', 'M', 'L'],
    colors: ['Negro'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 8,
    featured: true,
    active: true,
  },
];

// ============================================
// CATEGORÍAS
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
    id: 'sets', 
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
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200',
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
  return products.find(p => p.id === id);
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
  return {
    totalProducts: products.filter(p => p.active).length,
    totalCategories: categories.length - 1, // -1 porque 'all' no cuenta
    featuredProducts: products.filter(p => p.featured && p.active).length,
    newProducts: products.filter(p => p.new && p.active).length,
    averagePrice: Math.round(
      products
        .filter(p => p.active)
        .reduce((sum, p) => sum + p.price, 0) / 
      products.filter(p => p.active).length
    ),
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
// MOCK DATA PARA DESARROLLO
// ============================================

/**
 * Generar productos de prueba (útil para testing)
 */
export const generateMockProducts = (count = 10) => {
  const mockProducts = [];
  const categories = ['tops', 'vestidos', 'pantalones', 'faldas'];
  
  for (let i = 0; i < count; i++) {
    mockProducts.push({
      id: 1000 + i,
      name: `Producto Mock ${i + 1}`,
      slug: `producto-mock-${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 30000) + 5000,
      image: `https://picsum.photos/500/500?random=${i}`,
      images: [`https://picsum.photos/500/500?random=${i}`],
      description: 'Producto de prueba para desarrollo',
      sizes: ['S', 'M', 'L'],
      colors: ['Negro', 'Blanco'],
      material: 'Algodón',
      care: 'Lavar a máquina',
      stock: Math.floor(Math.random() * 20) + 1,
      active: true,
    });
  }
  
  return mockProducts;
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
  generateMockProducts,
};