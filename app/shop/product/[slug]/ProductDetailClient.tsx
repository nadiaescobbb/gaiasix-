"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Truck, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

// ═══════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  sizes?: string[];
  colors?: string[];
  material?: string;
  care?: string;
  stock: number;
  isNew: boolean;
  slug: string;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// ═══════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════
export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const images = product.images || [product.image];

  const formatPrice = (price: number): string => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('seleccioná una talla');
      return;
    }
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    console.log('agregado:', { product, size: selectedSize, quantity });
  };

  const handleRelatedClick = (slug: string) => {
    router.push(`/shop/product/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gaia-bone">
      
      {/* Navegación minimalista */}
      <div className="border-b border-gaia-border">
        <div className="container-gaia py-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-xs text-gaia-ash hover:text-gaia-black-soft transition-colors duration-300 font-body uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            volver
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container-gaia section-gaia">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* ─── GALERÍA ─── */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="aspect-product bg-gaia-cream overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 overflow-hidden border transition-colors duration-300 ${
                      selectedImage === idx 
                        ? 'border-gaia-black-soft' 
                        : 'border-gaia-border hover:border-gaia-concrete'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`vista ${idx + 1}`}
                      width={80}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── INFO ─── */}
          <div className="space-y-8">
            
            {/* Header */}
            <div>
              {product.isNew && (
                <span className="inline-block bg-gaia-crimson text-gaia-bone text-[9px] tracking-ultra uppercase px-3 py-1.5 font-body font-medium mb-6 shadow-[0_2px_8px_rgba(175,22,31,0.3)]">
                  nuevo
                </span>
              )}
              
              <h1 className="text-4xl md:text-5xl tracking-tight mb-6 font-display font-light text-gaia-black-soft capitalize">
                {product.name}
              </h1>

              <p className="text-3xl mb-6 font-display font-light text-gaia-black-soft">
                {formatPrice(product.price)}
              </p>

              {product.description && (
                <p className="text-gaia-ash leading-relaxed font-body font-light">
                  {product.description}
                </p>
              )}
            </div>

            {/* Selector de talla */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-body font-medium text-gaia-black-soft uppercase tracking-wider">
                    talla
                  </span>
                  <button className="text-[10px] text-gaia-ash hover:text-gaia-black-soft transition-colors duration-300 font-body underline uppercase tracking-wider">
                    guía de talles
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={product.stock === 0}
                      className={`px-6 py-3 text-xs uppercase font-body font-medium tracking-wider transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-gaia-black-soft text-gaia-bone'
                          : 'border border-gaia-border-solid text-gaia-black-soft hover:border-gaia-black-soft'
                      } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cantidad */}
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-gaia-border-solid">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gaia-cream transition-colors duration-300 font-body text-gaia-black-soft"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-6 py-3 font-body text-gaia-black-soft">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gaia-cream transition-colors duration-300 font-body text-gaia-black-soft"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <span className="text-xs text-gaia-ash font-body font-light">
                {product.stock > 0 ? (
                  `${product.stock} disponibles`
                ) : (
                  <span className="text-gaia-crimson font-medium">sin stock</span>
                )}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className="btn-primary flex-1"
              >
                {isAddingToCart ? 'agregando...' : 'agregar al carrito'}
              </button>
              
              <button
                disabled={product.stock === 0}
                className="btn-secondary flex-1"
              >
                comprar ahora
              </button>
            </div>

            {/* Info adicional */}
            <div className="space-y-6 pt-8 border-t border-gaia-border">
              
              {/* Envío y devoluciones */}
              <div className="grid sm:grid-cols-2 gap-6 text-sm font-body">
                <div className="flex gap-3 text-gaia-ash">
                  <Truck size={18} className="flex-shrink-0 mt-0.5 text-gaia-concrete" />
                  <div className="font-light">
                    <div className="text-gaia-black-soft mb-1 font-medium">envíos gratis</div>
                    <div>en compras +$150.000</div>
                  </div>
                </div>
                
                <div className="flex gap-3 text-gaia-ash">
                  <RotateCcw size={18} className="flex-shrink-0 mt-0.5 text-gaia-concrete" />
                  <div className="font-light">
                    <div className="text-gaia-black-soft mb-1 font-medium">cambios</div>
                    <div>7 días desde la compra</div>
                  </div>
                </div>
              </div>

              {/* Detalles del producto */}
              {(product.material || product.care) && (
                <div className="space-y-2 text-sm font-body font-light">
                  {product.material && (
                    <div className="flex gap-2">
                      <span className="text-gaia-ash">material:</span>
                      <span className="text-gaia-black-soft">{product.material}</span>
                    </div>
                  )}
                  {product.care && (
                    <div className="flex gap-2">
                      <span className="text-gaia-ash">cuidado:</span>
                      <span className="text-gaia-black-soft">{product.care}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-gaia-border">
            <h2 className="text-4xl md:text-5xl tracking-tight mb-12 font-display font-light text-gaia-black-soft">
              piezas relacionadas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related, idx) => (
                <div 
                  key={related.id}
                  className={`product-card ${idx % 2 === 1 ? 'md:mt-12' : ''}`}
                  onClick={() => handleRelatedClick(related.slug)}
                >
                  <div className="product-image">
                    <Image
                      src={related.image}
                      alt={related.name}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover"
                    />
                    
                    {related.isNew && (
                      <div className="badge-new">nuevo</div>
                    )}

                    {/* Overlay automático desde globals.css */}
                    <div className="product-overlay-base">
                      <button className="product-overlay-btn">
                        ver prenda
                      </button>
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base capitalize font-display font-light text-gaia-black-soft">
                        {related.name}
                      </h3>
                      <p className="text-lg font-display font-light text-gaia-black-soft ml-4">
                        {formatPrice(related.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}