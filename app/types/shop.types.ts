export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew: boolean;
  slug: string;
  stock: number;
  sizes?: string[];
  description?: string;
}

export interface Category {
  id: string;
  name: string;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'newest';
export type ViewMode = 'grid' | 'list';