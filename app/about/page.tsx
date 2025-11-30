export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gaia-white pt-24 pb-16">
      <div className="container-gaia">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <p className="text-lg text-gaia-silver leading-relaxed font-body">
            GAIA SIX es un espacio de ropa nocturna con una estética clara: 
            <strong className="text-gaia-black"> boho rock glam</strong>, femenina y con un toque sexy. 
            Seleccionamos prendas que nos gustan y que encajan con ese estilo.
          </p>
        </div>

        {/* Historia */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6 font-display">Nuestra Historia</h2>
          <div className="text-gaia-silver leading-relaxed font-body space-y-4 max-w-2xl">
            <p>
              GAIA SIX nació en Tierra del Fuego y siempre tuvo la misma idea: 
              elegir prendas que encajen con nuestra estética boho rock glam.
            </p>
            <p>
              <strong className="text-gaia-black">No diseñamos ni fabricamos: seleccionamos.</strong>
            </p>
            <p>
              Si una prenda va con el estilo GAIA SIX, la sumamos. Si no, queda afuera.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-8 font-display">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gaia-border p-6 rounded-sm hover:border-gaia-silver transition-colors">
              <h3 className="text-lg font-light mb-3 font-display">Criterio</h3>
              <p className="text-sm text-gaia-silver font-body">
                Solo traemos prendas que realmente usaríamos. No todo entra; lo que no tiene buena presencia, no va.
              </p>
            </div>
            <div className="border border-gaia-border p-6 rounded-sm hover:border-gaia-silver transition-colors">
              <h3 className="text-lg font-light mb-3 font-display">Exclusividad</h3>
              <p className="text-sm text-gaia-silver font-body">
                No manejamos grandes volúmenes. Preferimos pocas unidades y variedad antes que repetir lo mismo cien veces.
              </p>
            </div>
            <div className="border border-gaia-border p-6 rounded-sm hover:border-gaia-silver transition-colors">
              <h3 className="text-lg font-light mb-3 font-display">Estilo Claro</h3>
              <p className="text-sm text-gaia-silver font-body">
                Nos movemos dentro de una misma línea estética. Si te gusta el look boho rock glam, probablemente encuentres algo que te cierre.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-gaia-border">
          <a
            href="/shop"
            className="btn-gaia-primary"
          >
            Ver Prendas
          </a>
        </section>
      </div>
    </div>
  );
}