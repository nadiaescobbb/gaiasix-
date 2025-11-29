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

// Datos de productos 
export const products: Product[] = [
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
    colors: ['negro'], // ← AGREGAR colors
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
  // ... AGREGA AQUÍ EL RESTO DE TUS PRODUCTOS CON LAS NUEVAS PROPIEDADES
];

export const categories: Category[] = [
  { id: 'all', name: 'Todo', slug: 'todo', order: 0 },
  { id: 'vestidos', name: 'Vestidos', slug: 'vestidos', order: 1 },
  { id: 'tops', name: 'Tops', slug: 'tops', order: 2 },
  { id: 'sets', name: 'Sets', slug: 'sets', order: 3 },
  { id: 'blusas', name: 'Blusas', slug: 'blusas', order: 4 },
  { id: 'faldas', name: 'Faldas', slug: 'faldas', order: 5 },
  { id: 'short', name: 'Short', slug: 'short', order: 6 },
  { id: 'camperas', name: 'Camperas', slug: 'camperas', order: 7 },
];

// Helper functions
export const getProductById = (id: number | string): Product | undefined => {
  const productId = typeof id === 'string' ? parseInt(id) : id;
  return products.find((p: Product) => p.id === productId);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p: Product) => p.slug === slug);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === 'all') {
    return products.filter((p: Product) => p.active);
  }
  return products.filter((p: Product) => p.category === categoryId && p.active);
};

export const getFeaturedProducts = (limit: number = 3): Product[] => {
  return products
    .filter((p: Product) => p.featured && p.active)
    .slice(0, limit);
};

export const getNewProducts = (limit: number = 3): Product[] => {
  return products
    .filter((p: Product) => p.new && p.active)
    .slice(0, limit);
};