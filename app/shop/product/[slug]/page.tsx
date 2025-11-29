import { notFound } from 'next/navigation';
import { getProductBySlug } from '../../../../lib/products';
import ProductDetail from './productdetail';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} | Gaia Six`,
    description: product.description.substring(0, 160) || `Compra ${product.name} en Gaia Six. Envíos a todo el país.`,
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      images: [product.image],
      type: 'product',
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}