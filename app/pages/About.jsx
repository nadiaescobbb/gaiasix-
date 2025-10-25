import React from 'react';

export default function About({ onNavigate }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-5xl font-bold mb-8 text-center">
        Sobre Gaia Six
      </h1>
      
      <div className="prose prose-lg max-w-none font-body space-y-6 text-gray-700 leading-relaxed">
        <p className="text-xl">
          Gaia Six es esa amiga con estilo que te inspira a ser vos misma.
        </p>
        
        <p>
          Creemos que la ropa no es solo lo que te ponés, es cómo te sentís cuando lo hacés. 
          Por eso cada prenda que elegimos está pensada para darte libertad, confianza y onda en cada look.
        </p>

        <p>
          No seguimos tendencias por seguirlas. Buscamos piezas atemporales que se adapten a tu vida real: 
          ese brunch del domingo, esa salida improvisada, esa reunión importante donde querés sentirte increíble sin esfuerzo.
        </p>

        <p>
          Somos una marca hecha por mujeres, para mujeres que saben lo que quieren y no tienen miedo de mostrarlo. 
          Creemos en la elegancia sin pretensiones, en la comodidad sin sacrificar el estilo, y en que cada día merece 
          un outfit que te haga sentir poderosa.
        </p>

        <p className="text-xl font-semibold">
          Gaia Six: tu estilo, tu libertad, tu momento. 🖤
        </p>
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={() => onNavigate('shop')}
          className="bg-red-700 text-white px-8 py-3 rounded font-body font-semibold hover:bg-red-800 transition"
        >
          Descubrí la Colección
        </button>
      </div>
    </section>
  );
}