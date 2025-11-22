"use client";

// Simulación de datos
const products = [
  {
    id: 1,
    name: "Vestido Stun",
    category: "vestidos",
    price: 21500,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
    new: true,
    stock: 5,
  },
  {
    id: 2,
    name: "Top Drape",
    category: "tops",
    price: 13550,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    new: false,
    stock: 3,
  },
  {
    id: 3,
    name: "Mini Trace",
    category: "pantalones",
    price: 11375,
    image: "https://images.unsplash.com/photo-1624206112918-ad7b0a4eb040?w=600&h=800&fit=crop",
    new: false,
    stock: 8,
  },
  {
    id: 4,
    name: "Top Fylo",
    category: "tops",
    price: 13550,
    image: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?w=600&h=800&fit=crop",
    new: true,
    stock: 6,
  },
  {
    id: 5,
    name: "Vestido Eclipse",
    category: "vestidos",
    price: 19800,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop",
    new: false,
    stock: 0,
  },
  {
    id: 6,
    name: "Pantalón Wide",
    category: "pantalones",
    price: 15200,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&h=800&fit=crop",
    new: false,
    stock: 4,
  },
  {
    id: 7,
    name: "Top Mesh",
    category: "tops",
    price: 12800,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
    new: true,
    stock: 7,
  },
  {
    id: 8,
    name: "Vestido Midi",
    category: "vestidos",
    price: 18900,
    image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&h=800&fit=crop",
    new: false,
    stock: 5,
  },
  {
    id: 9,
    name: "Jean High Waist",
    category: "pantalones",
    price: 16500,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    new: false,
    stock: 10,
  },
];

export default function ShopPage() {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-AR')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header simple */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-2">PRODUCTOS</h1>
          <p className="text-sm text-gray-500">{products.length} productos</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Grid de productos minimalista */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <a
              key={product.id}
              href={`#product-${product.id}`}
              className="group"
            >
              {/* Imagen */}
              <div className="relative bg-gray-100 aspect-[3/4] mb-3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
                
                {/* Badge solo si es nuevo o sin stock */}
                {product.new && (
                  <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-[10px] tracking-wider">
                    NUEVO
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="absolute top-2 left-2 bg-gray-400 text-white px-2 py-1 text-[10px] tracking-wider">
                    AGOTADO
                  </span>
                )}
              </div>

              {/* Info del producto */}
              <div>
                <h3 className="text-sm font-light mb-1 uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="text-sm font-medium">{formatPrice(product.price)}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Paginación simple (opcional) */}
        <div className="flex justify-center items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <button className="px-4 py-2 text-sm border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            ANTERIOR
          </button>
          <span className="text-sm text-gray-600">1 / 1</span>
          <button className="px-4 py-2 text-sm border border-gray-300 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
            SIGUIENTE
          </button>
        </div>
      </div>
    </div>
  );
}