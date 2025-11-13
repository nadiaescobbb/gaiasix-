import { useState, useEffect } from 'react';

// ==========================================
// SKELETON COMPONENTS
// ==========================================

function Skeleton({ className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-gray-200',
    light: 'bg-gray-100',
    dark: 'bg-gray-300'
  };

  return (
    <div 
      className={`animate-pulse ${variants[variant]} rounded ${className}`}
      aria-label="Cargando..."
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="aspect-[3/4] mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

function CategoryFilterSkeleton() {
  return (
    <div className="flex justify-center gap-4 mb-16">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-8 w-24" />
      ))}
    </div>
  );
}

// ==========================================
// SHOP PAGE CON LOADING
// ==========================================

function ShopPageWithLoading({ 
  selectedCategory, 
  onSelectCategory, 
  onAddToCart 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    
    // Simular carga de datos (reemplazar con tu lógica real)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Cargar productos y categorías
    const { products: productsData, categories: categoriesData } = await import('../data/products');
    
    setProducts(productsData.filter(p => p.active));
    setCategories(categoriesData);
    setIsLoading(false);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <CategoryFilterSkeleton />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${
                selectedCategory === cat.id 
                  ? 'border-b-2 border-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No hay productos en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4] mb-3">
        {imageLoading && (
          <Skeleton className="absolute inset-0" />
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
        />
        
        {/* Overlay con botones de talla */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => onAddToCart(product, size)}
                className="bg-white px-4 py-2 text-xs uppercase tracking-wide hover:bg-red-800 hover:text-white transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <h3 className="uppercase tracking-wide">{product.name}</h3>
        <span>${product.price.toLocaleString('es-AR')}</span>
      </div>
    </div>
  );
}

// ==========================================
// SPINNER COMPONENTS
// ==========================================

function Spinner({ size = 'md', color = 'black' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`${sizes[size]} border-2 border-gray-200 border-t-${color} rounded-full animate-spin`} />
  );
}

function LoadingButton({ loading, children, ...props }) {
  return (
    <button 
      {...props}
      disabled={loading || props.disabled}
      className={`relative ${props.className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <Spinner size="sm" />
        </div>
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
    </button>
  );
}

// ==========================================
// DEMO COMPONENT
// ==========================================

export default function LoadingStatesDemo() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleClick = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-light mb-8">Loading States & Skeletons</h1>
        </div>

        {/* Skeleton Loaders */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-6">Skeleton Loaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* Spinners */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-6">Spinners</h2>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Spinner size="sm" />
              <p className="mt-2 text-xs text-gray-600">Small</p>
            </div>
            <div className="text-center">
              <Spinner size="md" />
              <p className="mt-2 text-xs text-gray-600">Medium</p>
            </div>
            <div className="text-center">
              <Spinner size="lg" />
              <p className="mt-2 text-xs text-gray-600">Large</p>
            </div>
          </div>
        </section>

        {/* Loading Buttons */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-6">Loading Buttons</h2>
          <div className="space-y-4">
            <LoadingButton
              loading={loading1}
              onClick={() => handleClick(setLoading1)}
              className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition"
            >
              Click para cargar
            </LoadingButton>

            <LoadingButton
              loading={loading2}
              onClick={() => handleClick(setLoading2)}
              className="w-full border border-black py-3 px-6 rounded hover:bg-black hover:text-white transition"
            >
              Botón outline con loading
            </LoadingButton>
          </div>
        </section>

        {/* Code Examples */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-medium mb-4">Ejemplos de Uso</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">1. Skeleton Loader</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`<ProductCardSkeleton />

// O componente básico
<Skeleton className="h-20 w-full mb-4" />`}
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">2. Spinner</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`<Spinner size="md" color="black" />`}
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">3. Loading Button</h3>
              <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`<LoadingButton
  loading={isSubmitting}
  onClick={handleSubmit}
  className="bg-black text-white py-3 px-6"
>
  Enviar
</LoadingButton>`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}