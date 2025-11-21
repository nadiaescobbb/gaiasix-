import { notFound } from 'next/navigation';
import { getProductById } from '../../../../data/products';
import ProductDetail from './productdetail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} | Gaia Six`,
    description: product.description || `Compra ${product.name} en Gaia Six`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}