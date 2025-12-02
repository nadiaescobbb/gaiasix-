// app/shop/product/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import ProductDetail from './ProductDetailClient';

// ═══════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════
interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ═══════════════════════════════════════════════════════════════
// STATIC PARAMS 
// ═══════════════════════════════════════════════════════════════
export async function generateStaticParams() {
  // Generar paths para todos los productos activos
  return products
    .filter(p => p.active)
    .map((product) => ({
      slug: product.slug,
    }));
}

// ═══════════════════════════════════════════════════════════════
// METADATA — SEO optimizado
// ═══════════════════════════════════════════════════════════════
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'producto no encontrado — gaia six',
      description: 'el producto que buscás no está disponible',
    };
  }

  // Descripción truncada segura
  const description = product.description 
    ? product.description.substring(0, 160) 
    : `${product.name} — ${product.category} — gaia six`;

  // Precio formateado para structured data
  const priceFormatted = product.price.toFixed(2);

  return {
    title: `${product.name} — gaia six`,
    description,
    
    // Keywords
    keywords: [
      product.name,
      product.category,
      'gaia six',
      'boho rock glam',
      'ropa femenina',
      'moda nocturna',
      'vestidos',
      'argentina',
    ],
    
    // Open Graph
    openGraph: {
      title: product.name,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1067, // Ratio 3:4
          alt: product.name,
        },
      ],
      type: 'website',
      siteName: 'GAIA SIX',
      locale: 'es_AR',
    },
    
    // Canonical URL
    alternates: {
      canonical: `/shop/product/${slug}`,
    },
    
    // Robots
    robots: {
      index: product.active,
      follow: true,
    },
    
    // Structured Data (JSON-LD)
    other: {
      'product:price:amount': priceFormatted,
      'product:price:currency': 'ARS',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': 'GAIA SIX',
    },
  };
}

// ═══════════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  // Debug solo en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEV] Cargando producto:', slug);
  }
  
  // Obtener producto
  const product = getProductBySlug(slug);
  
  if (!product) {
    // Debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      const allSlugs = products.map(p => p.slug);
      console.error('[DEV] Producto no encontrado:', slug);
      console.error('[DEV] Slugs disponibles:', allSlugs);
    }
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.category, product.id, 3);
  
  // Renderizar
  return (
    <>
      {/* JSON-LD Structured Data para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description || `${product.name} — ${product.category}`,
            image: product.image,
            brand: {
              '@type': 'Brand',
              name: 'GAIA SIX',
            },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'ARS',
              availability: product.stock > 0 
                ? 'https://schema.org/InStock' 
                : 'https://schema.org/OutOfStock',
              url: `https://gaiasix.com/shop/product/${slug}`,
              seller: {
                '@type': 'Organization',
                name: 'GAIA SIX',
              },
            },
            category: product.category,
            sku: product.id.toString(),
          }),
        }}
      />
      
      {/* Componente cliente */}
      <ProductDetail 
        product={product} 
        relatedProducts={relatedProducts} 
      />
    </>
  );
}