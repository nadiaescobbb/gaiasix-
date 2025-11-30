import { HeroProduct, Product, Look } from '../types/home.types';

export const heroProduct: HeroProduct = {
  name: "vestido isla",
  price: 31500,
  image: "/images/boho/vestido-isla.avif",
  tag: "nocturno"
};

export const collectionProducts: Product[] = [
  {
    id: 1,
    name: "vestido isla",
    category: "vestidos",
    price: 31500,
    image: "/images/boho/vestido-isla.avif",
    isNew: true
  },
  {
    id: 2,
    name: "pollera nala",
    category: "faldas",
    price: 33440,
    image: "/images/boho/pollera-nala.avif",
    isNew: true
  },
  {
    id: 3,
    name: "vestido esme",
    category: "vestidos",
    price: 29500,
    image: "/images/boho/vestido-esme-fr.avif",
    isNew: true
  },
  {
    id: 4,
    name: "top mallorca",
    category: "tops",
    price: 13550,
    image: "/images/fotoproducto/top-mallorca.avif",
    isNew: true
  }
];

export const shopTheLook: Look[] = [
  {
    id: 1,
    name: "rock dress",
    items: ["top floyd", "pollera nala"],
    price: 50160,
    discount: 47650,
    image: "/images/boho/pollera-nala-ang.avif"
  },
  {
    id: 2,
    name: "noche dress",
    items: ["top drape", "mini trace"],
    price: 24925,
    discount: 23680,
    image: "/images/products/top-drape.avif"
  }
];