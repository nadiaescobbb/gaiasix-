import { ReactNode } from 'react';

// ===================================================
// TYPES
// ===================================================

interface ShopLayoutProps {
  children: ReactNode;
}

// ===================================================
// SHOP LAYOUT COMPONENT
// ===================================================

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar de categorías - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 py-8">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                  Categorías
                </h3>
                <nav className="space-y-2">
                  <CategoryLink href="/shop" label="Todos los productos" />
                  <CategoryLink href="/shop/vestidos" label="Vestidos" />
                  <CategoryLink href="/shop/tops" label="Tops" />
                  <CategoryLink href="/shop/sets" label="Sets" />
                  <CategoryLink href="/shop/faldas" label="Faldas" />
                  <CategoryLink href="/shop/short" label="Shorts" />
                </nav>
              </div>

              {/* Filtros adicionales */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                  Filtros
                </h3>
                <div className="space-y-3">
                  <FilterOption label="Nuevos ingresos" />
                  <FilterOption label="Más vendidos" />
                  <FilterOption label="En oferta" />
                </div>
              </div>

              {/* Información de envío */}
              <div className="pt-6 border-t border-gray-200">
                <div className="text-xs text-gray-500 space-y-2">
                  <p>🚚 Envío gratis desde $150.000</p>
                  <p>💳 3 cuotas sin interés</p>
                  <p>↩️ 7 días para cambios</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

// ===================================================
// COMPONENTES AUXILIARES
// ===================================================

interface CategoryLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

function CategoryLink({ href, label, isActive = false }: CategoryLinkProps) {
  return (
    <a
      href={href}
      className={`
        block text-sm transition-colors
        ${isActive 
          ? 'text-black font-medium' 
          : 'text-gray-600 hover:text-black'
        }
      `}
    >
      {label}
    </a>
  );
}

interface FilterOptionProps {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

function FilterOption({ label, checked = false, onChange }: FilterOptionProps) {
  return (
    <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer hover:text-black transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
      />
      <span>{label}</span>
    </label>
  );
}