// app/shop/product/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { getProductBySlug } from '../../../../lib/products';
import ProductDetail from './productdetail';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
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
      type: 'website', 
      url: `/shop/product/${slug}`, 
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  console.log('🔍 [DEBUG] Slug recibido:', slug);
  
  const product = getProductBySlug(slug);
  console.log('🔍 [DEBUG] Producto encontrado:', product);
  
  // Verificar todos los slugs disponibles
  const allProducts = require('../../../../lib/products').products;
  console.log('🔍 [DEBUG] Todos los slugs:', allProducts.map((p: any) => p.slug));

  if (!product) {
    console.log('❌ [DEBUG] Producto NO encontrado para slug:', slug);
    notFound();
  }

  console.log('✅ [DEBUG] Producto encontrado:', product.name);
  return <ProductDetail product={product} />;
}