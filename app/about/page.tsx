export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4">Sobre GAIA SIX</h1>
          <p className="text-lg text-gray-600">
           GAIA SIX es un espacio de ropa nocturna con una estética clara: boho rock glam, femenina y con un toque sexy. Seleccionamos prendas que nos gustan y que encajan con ese estilo.
          </p>
        </div>

        {/* Historia */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-4">Nuestra Historia</h2>
         <p className="text-gray-700 leading-relaxed mb-4">
          GAIA SIX nació en Tierra del Fuego y siempre tuvo la misma idea: elegir prendas que encajen con nuestra estética boho rock glam. 
          No diseñamos ni fabricamos: seleccionamos. 
          Si una prenda va con el estilo GAIA SIX, la sumamos. Si no, queda afuera.
        </p>
        </section>

        {/* Valores */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-6">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Criterio</h3>
              <p className="text-sm text-gray-600">
                Solo traemos prendas que realmente usaríamos. No todo entra; lo que no tiene buena presencia, no va.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Exclusividad</h3>
              <p className="text-sm text-gray-600">
                No manejamos grandes volúmenes. Preferimos pocas unidades y variedad antes que repetir lo mismo cien veces.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Estilo claro</h3>
              <p className="text-sm text-gray-600">
                Nos movemos dentro de una misma línea estética. Si te gusta el look boho rock glam, probablemente encuentres algo que te cierre.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-gray-200">
          <a
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            ver prendas
          </a>
        </section>
      </div>
    </div>
  );
}