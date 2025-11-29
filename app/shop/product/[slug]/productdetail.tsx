"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag, Share2, Truck, RotateCcw } from 'lucide-react';
import { useAppContext } from '../../../../context/AppContext';
import { WishlistButton } from '../../../../components/ui/WishlistButton';
import { formatPrice } from '../../../../utils/formatters';
import { type Product } from '../../../../lib/products';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, currentUser } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');

  // Seleccionar primera talla por defecto si está disponible
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.sizes, selectedSize]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Por favor seleccioná un talle');
      return;
    }

    setAddingToCart(true);
    try {
      addToCart(product, selectedSize);
      // Mantener el estado de "agregado" por 2 segundos
      setTimeout(() => setAddingToCart(false), 2000);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setAddingToCart(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error al compartir:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const renderStockMessage = () => {
    if (product.stock === 0) {
      return <span className="text-red-600 font-medium">AGOTADO</span>;
    } else if (product.stock <= 2) {
      return <span className="text-orange-600 font-medium">ÚLTIMAS {product.stock} UNIDADES</span>;
    } else {
      return <span className="text-green-600 font-medium">EN STOCK</span>;
    }
  };

  const getSizeGuide = () => {
    const guides = {
      tops: "Las tallas de tops son estándar. Si estás entre dos tallas, te recomendamos elegir la talla superior.",
      vestidos: "Los vestidos tienen un calce regular. Consultá la tabla de medidas para mayor precisión.",
      faldas: "Las faldas tienen elasticidad en la cintura para mayor comodidad.",
      short: "Los shorts tienen calce regular. Si preferís un fit más holgado, elegí una talla superior."
    };
    return guides[product.category as keyof typeof guides] || "Consultá nuestra guía de tallas para encontrar tu medida perfecta.";
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a la tienda
          </Link>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-black transition-colors"
              title="Compartir producto"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Galería de Imágenes */}
          <div className="space-y-4">
            {/* Imagen Principal */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && (
                  <span className="bg-black text-white px-3 py-1 text-xs font-semibold tracking-wider">
                    NUEVO
                  </span>
                )}
                {product.featured && (
                  <span className="bg-white text-black px-3 py-1 text-xs font-semibold tracking-wider border border-black">
                    DESTACADO
                  </span>
                )}
              </div>
            </div>

            {/* Miniaturas */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {[product.image, ...product.images].slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`relative aspect-square bg-gray-50 overflow-hidden border-2 ${
                      selectedImage === image ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - vista ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información del Producto */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h1 className="text-3xl font-light text-gray-900 mb-2 capitalize">
                      {product.name}
                    </h1>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                      {product.category}
                    </p>
                  </div>
                  <WishlistButton product={product} variant="icon" />
                </div>
                
                <div className="text-2xl font-light text-gray-900">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Estado del Stock */}
              <div className="flex items-center gap-4 text-sm">
                {renderStockMessage()}
                {product.stock > 0 && (
                  <span className="text-gray-500">
                    {product.stock} disponible{product.stock !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Selector de Talle */}
              {product.stock > 0 && product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-900">
                      TALLE:
                    </label>
                    <span className="text-xs text-gray-500">
                      {selectedSize && `Seleccionado: ${selectedSize}`}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`
                          px-4 py-2 text-sm uppercase tracking-wider border transition-all min-w-[60px]
                          ${selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 text-gray-700 hover:border-black'
                          }
                          ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                        disabled={product.stock === 0}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    {getSizeGuide()}
                  </p>
                </div>
              )}

              {/* Botón Agregar al Carrito */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || !selectedSize || addingToCart}
                className={`
                  w-full flex items-center justify-center gap-3 py-4 text-sm uppercase tracking-widest
                  transition-all duration-300 border
                  ${product.stock === 0 || !selectedSize
                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                    : addingToCart
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-black text-white border-black hover:bg-gray-800'
                  }
                `}
              >
                <ShoppingBag size={20} />
                {product.stock === 0
                  ? 'AGOTADO'
                  : addingToCart
                  ? 'AGREGADO ✓'
                  : 'AGREGAR AL CARRITO'
                }
              </button>

              {/* Información de Envío */}
              <div className="bg-gray-50 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck size={18} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Envío gratis</p>
                    <p className="text-xs text-gray-600">En compras superiores a $150.000</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <RotateCcw size={18} className="text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Devolución gratuita</p>
                    <p className="text-xs text-gray-600">30 días para cambiar tu producto</p>
                  </div>
                </div>
              </div>

              {/* Tabs de Información */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex border-b border-gray-200 mb-4">
                  {[
                    { id: 'description' as const, label: 'Descripción' },
                    { id: 'details' as const, label: 'Detalles' },
                    { id: 'shipping' as const, label: 'Envíos' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="prose prose-sm max-w-none">
                  {activeTab === 'description' && (
                    <div className="space-y-3">
                      <p className="text-gray-700 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div className="space-y-3">
                      {product.material && (
                        <div>
                          <strong className="text-gray-900">Material:</strong>
                          <span className="text-gray-700 ml-2 capitalize">{product.material}</span>
                        </div>
                      )}
                      
                      {product.care && (
                        <div>
                          <strong className="text-gray-900">Cuidados:</strong>
                          <span className="text-gray-700 ml-2">{product.care}</span>
                        </div>
                      )}
                      
                      {product.colors && product.colors.length > 0 && (
                        <div>
                          <strong className="text-gray-900">Colores:</strong>
                          <span className="text-gray-700 ml-2 capitalize">{product.colors.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-3 text-sm text-gray-700">
                      <p><strong>Envío estándar:</strong> 3-5 días hábiles</p>
                      <p><strong>Envío express:</strong> 24-48 horas (consultar disponibilidad)</p>
                      <p><strong>Retiro en tienda:</strong> Gratuito - Disponible en 24 horas</p>
                      <p><strong>Área de cobertura:</strong> Todo el país</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}