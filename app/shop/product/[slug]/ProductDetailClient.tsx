"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Truck, RotateCcw } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navegación minimalista */}
      <div className="border-b border-gaia-border">
        <div className="container-gaia py-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-gaia-ash hover:text-gaia-black transition-colors font-body"
          >
            <ArrowLeft size={16} />
            shop
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container-gaia section-gaia">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* ─── GALERÍA ─── */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <div className="aspect-[3/4] bg-gaia-charcoal/5 overflow-hidden">
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
                    className={`w-20 h-24 overflow-hidden border transition-colors ${
                      selectedImage === idx 
                        ? 'border-gaia-black' 
                        : 'border-gaia-border hover:border-gaia-black'
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
                <span className="badge-new mb-4">nuevo</span>
              )}
              
              <h1 className="text-4xl md:text-5xl font-light mb-6 font-display capitalize">
                {product.name}
              </h1>

              <p className="text-3xl font-light mb-6 font-body">
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
                  <span className="text-sm font-body text-gaia-black">
                    talla
                  </span>
                  <button className="text-xs text-gaia-ash hover:text-gaia-black transition-colors font-body underline">
                    guía de talles
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      disabled={product.stock === 0}
                      className={`px-6 py-3 text-sm uppercase font-body transition-all ${
                        selectedSize === size
                          ? 'bg-gaia-black text-white'
                          : 'border border-gaia-border text-gaia-black hover:border-gaia-black'
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
              <div className="flex items-center border border-gaia-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gaia-charcoal/5 font-body"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-6 py-3 font-body">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gaia-charcoal/5 font-body"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>

              <span className="text-sm text-gaia-ash font-body">
                {product.stock > 0 ? (
                  `${product.stock} disponibles`
                ) : (
                  <span className="text-gaia-black">sin stock</span>
                )}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
                className="btn-primary flex-1 py-4"
              >
                {isAddingToCart ? 'agregando...' : 'agregar'}
              </button>
              
              <button
                disabled={product.stock === 0}
                className="btn-secondary flex-1 py-4"
              >
                comprar ahora
              </button>
            </div>

            {/* Info adicional */}
            <div className="space-y-6 pt-8 border-t border-gaia-border">
              
              {/* Envío y devoluciones */}
              <div className="grid sm:grid-cols-2 gap-6 text-sm font-body">
                <div className="flex gap-3 text-gaia-ash">
                  <Truck size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gaia-black mb-1">envíos gratis</div>
                    <div>en compras mayores a $150.000</div>
                  </div>
                </div>
                
                <div className="flex gap-3 text-gaia-ash">
                  <RotateCcw size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gaia-black mb-1">cambios</div>
                    <div>7 días desde la compra</div>
                  </div>
                </div>
              </div>

              {/* Detalles */}
              {(product.material || product.care) && (
                <div className="space-y-2 text-sm font-body">
                  {product.material && (
                    <div className="flex gap-2">
                      <span className="text-gaia-ash">material:</span>
                      <span className="text-gaia-black">{product.material}</span>
                    </div>
                  )}
                  {product.care && (
                    <div className="flex gap-2">
                      <span className="text-gaia-ash">cuidado:</span>
                      <span className="text-gaia-black">{product.care}</span>
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
            <h2 className="text-3xl font-light mb-12 font-display">
              piezas relacionadas
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related, idx) => (
                <div 
                  key={related.id}
                  className={`product-card group ${idx % 2 === 1 ? 'md:mt-12' : ''}`}
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

                    <div className="product-overlay-base group-hover:opacity-100">
                    <button className="product-overlay-btn">ver prenda</button>
                  </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-light capitalize font-body">
                        {related.name}
                      </h3>
                      <p className="text-lg font-light font-body ml-4">
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