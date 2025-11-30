import { useRouter } from 'next/navigation';

export function EmptyCart() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Carrito vacío</h1>
        <p className="text-gray-600 mb-6">Agrega productos para proceder al checkout</p>
        <button 
          onClick={() => router.push('/shop')}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Continuar comprando
        </button>
      </div>
    </div>
  );
}