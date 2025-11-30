export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew: boolean;
}

export interface Look {
  id: number;
  name: string;
  items: string[];
  price: number;
  discount: number;
  image: string;
}

export interface HeroProduct {
  name: string;
  price: number;
  image: string;
  tag: string;
}

export type FilterType = 'todos' | 'vestidos' | 'faldas' | 'tops';