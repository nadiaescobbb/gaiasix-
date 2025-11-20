import Link from 'next/link'
import Image from 'next/image'
import { products, categories, getProductsByCategory } from '../../data/products'

export default function ShopPage() {
  const allProducts = products.filter(p => p.active)
  
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4">Tienda</h1>
          <p className="text-black/60">
            {allProducts.length} producto{allProducts.length !== 1 ? 's' : ''} disponible{allProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filtros de Categoría */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 border border-black text-sm hover:bg-black hover:text-white transition-colors capitalize"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product) => (
            <Link 
              key={product.id} 
              href={`/shop/product/${product.id}`}
              className="group"
            >
              <div className="relative bg-gray-100 aspect-[3/4] mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.new && (
                    <span className="bg-[#AF161F] text-white px-2 py-1 text-xs">Nuevo</span>
                  )}
                  {product.featured && (
                    <span className="bg-black text-white px-2 py-1 text-xs">Destacado</span>
                  )}
                  {product.stock === 0 && (
                    <span className="bg-gray-500 text-white px-2 py-1 text-xs">Agotado</span>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-light mb-2 capitalize">{product.name}</h3>
                <p className="text-lg font-medium">{formatPrice(product.price)}</p>
                <p className="text-sm text-black/50 capitalize mt-1">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {allProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-black/60 text-lg">No hay productos disponibles en este momento.</p>
            <Link 
              href="/"
              className="inline-block mt-4 bg-black text-white px-6 py-3 text-sm hover:bg-[#AF161F] transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}