import { notFound } from 'next/navigation';
import { products, categories } from '../../../data/products';
import { formatPrice } from '../../../utils/formatters';
import { type Product } from '../../../lib/types';
import CategoryProducts from './CategoryProducts';

// ===================================================
// TYPES
// ===================================================

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams?: {
    sort?: string;
    view?: string;
  };
}

// ===================================================
// GENERATE STATIC PARAMS
// ===================================================

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

// ===================================================
// GENERATE METADATA
// ===================================================

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find(c => c.id === params.category);
  
  if (!category) {
    return {
      title: 'Categoría no encontrada',
    };
  }

  return {
    title: `${category.name} | Gaia Six`,
    description: `Explora nuestra colección de ${category.name.toLowerCase()}. Envío gratis y cuotas sin interés.`,
  };
}

// ===================================================
// CATEGORY PAGE COMPONENT
// ===================================================

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = categories.find(c => c.id === params.category);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    product => product.category === params.category && product.active
  );

  const sortBy = searchParams?.sort || 'newest';
  const viewMode = (searchParams?.view as 'grid' | 'list') || 'grid';

  // Ordenar productos
  const sortedProducts = sortProducts(categoryProducts, sortBy);

  return (
    <div className="py-8">
      {/* Header de la categoría */}
      <CategoryHeader 
        category={category} 
        productCount={sortedProducts.length}
        currentSort={sortBy}
        currentView={viewMode}
      />

      {/* Productos de la categoría */}
      <CategoryProducts 
        products={sortedProducts}
        viewMode={viewMode}
        categoryId={params.category}
      />

      {/* Empty state */}
      {sortedProducts.length === 0 && (
        <EmptyCategoryState category={category} />
      )}
    </div>
  );
}

// ===================================================
// CATEGORY HEADER COMPONENT
// ===================================================

interface CategoryHeaderProps {
  category: { id: string; name: string };
  productCount: number;
  currentSort: string;
  currentView: string;
}

function CategoryHeader({ category, productCount, currentSort, currentView }: CategoryHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <a href="/shop" className="hover:text-black transition-colors">
              Tienda
            </a>
            <span>›</span>
            <span className="text-black">{category.name}</span>
          </nav>
          
          <h1 className="text-3xl font-light mb-2">{category.name}</h1>
          <p className="text-gray-600">
            {productCount} {productCount === 1 ? 'producto' : 'productos'}
          </p>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-4">
          {/* Select de ordenamiento */}
          <select
            defaultValue={currentSort}
            onChange={(e) => {
              const url = new URL(window.location.href);
              url.searchParams.set('sort', e.target.value);
              window.location.href = url.toString();
            }}
            className="text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-black"
          >
            <option value="newest">Más nuevos</option>
            <option value="name">Nombre A-Z</option>
            <option value="price-low">Precio: menor a mayor</option>
            <option value="price-high">Precio: mayor a menor</option>
          </select>

          {/* Botones de vista */}
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <a
              href={`?view=grid&sort=${currentSort}`}
              className={`p-2 ${currentView === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
              aria-label="Vista de cuadrícula"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </a>
            <a
              href={`?view=list&sort=${currentSort}`}
              className={`p-2 ${currentView === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
              aria-label="Vista de lista"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Breadcrumb de subcategorías (si aplica) */}
      <CategoryBreadcrumb categoryId={category.id} />
    </div>
  );
}

// ===================================================
// CATEGORY BREADCRUMB COMPONENT
// ===================================================

function CategoryBreadcrumb({ categoryId }: { categoryId: string }) {
  // Aquí puedes agregar subcategorías si las tienes
  const subcategories = getSubcategories(categoryId);

  if (subcategories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {subcategories.map((subcategory) => (
        <a
          key={subcategory.id}
          href={`/shop/${subcategory.id}`}
          className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
        >
          {subcategory.name}
        </a>
      ))}
    </div>
  );
}

// ===================================================
// EMPTY CATEGORY STATE
// ===================================================

function EmptyCategoryState({ category }: { category: { name: string } }) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay productos en {category.name}
        </h3>
        <p className="text-gray-500 mb-6">
          Pronto agregaremos nuevos productos a esta categoría.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/shop"
            className="bg-black text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Ver todos los productos
          </a>
          <a
            href="/contact"
            className="border border-gray-300 text-gray-700 px-6 py-2 text-sm uppercase tracking-widest hover:border-black hover:text-black transition-colors"
          >
            Contactarnos
          </a>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// UTILITY FUNCTIONS
// ===================================================

function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
    default:
      return sorted; // Mantener orden original
  }
}

function getSubcategories(categoryId: string): Array<{ id: string; name: string }> {
  // Aquí puedes definir subcategorías específicas
  // Por ahora retornamos un array vacío
  return [];
}