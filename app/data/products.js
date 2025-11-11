// ============================================
// PRODUCTOS PRINCIPALES - ACTUALIZADO
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
    description: 'Top moderno y versátil, perfecto para cualquier ocasión.',
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
    description: 'Top elegante con diseño único.',
    sizes: ['S', 'M'],
    colors: ['Negro', 'Bordeaux'],
    material: 'Algodón premium',
    care: 'Lavar a máquina en ciclo suave',
    stock: 2,
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
    name: 'Set Kiss',
    slug: 'set-kiss',
    category: 'sets',
    price: 14500, // ⚡ PRECIO AGREGADO
    image: '/images/products/set-kiss.avif',
    images: ['/images/products/set-kiss.avif'],
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
    id: 23,
    name: 'Vestido Ciel',
    slug: 'vestido-ciel',
    category: 'vestidos',
    price: 28500,
    image: '/images/products/vestido-ciel.avif',
    images: ['/images/products/vestido-ciel.avif'],
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

/**
 * ⚡ NUEVO: Validar integridad de productos
 */
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