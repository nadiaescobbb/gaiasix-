import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generar array de páginas para mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-16">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 text-sm border border-gaia-border hover:border-gaia-black disabled:opacity-30 disabled:cursor-not-allowed transition-all font-body"
      >
        <ChevronLeft size={16} />
        anterior
      </button>

      {/* Números de página */}
      <div className="flex gap-1 mx-4">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 text-sm border transition-all font-body ${
              currentPage === page
                ? 'bg-gaia-black text-white border-gaia-black'
                : 'border-gaia-border hover:border-gaia-black text-gaia-ash hover:text-gaia-black'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 text-sm border border-gaia-border hover:border-gaia-black disabled:opacity-30 disabled:cursor-not-allowed transition-all font-body"
      >
        siguiente
        <ChevronRight size={16} />
      </button>
    </div>
  );
}