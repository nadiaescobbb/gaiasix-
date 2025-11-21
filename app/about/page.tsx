// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4">Sobre GAIA SIX</h1>
          <p className="text-lg text-gray-600">
            Moda nocturna con carácter. Prendas únicas para mujeres que marcan tendencia.
          </p>
        </div>

        {/* Historia */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-4">Nuestra Historia</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            GAIA SIX nace en Tierra del Fuego con la misión de crear prendas que empoderen
            a la mujer moderna. Cada diseño es pensado para destacar sin esfuerzo, 
            combinando elegancia y actitud.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Nos especializamos en looks nocturnos con una estética boho rocker glam 
            que rompe esquemas y celebra la individualidad.
          </p>
        </section>

        {/* Valores */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-6">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Calidad</h3>
              <p className="text-sm text-gray-600">
                Materiales premium y confección artesanal en cada prenda.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Exclusividad</h3>
              <p className="text-sm text-gray-600">
                Diseños únicos y producciones limitadas.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Sustentabilidad</h3>
              <p className="text-sm text-gray-600">
                Compromiso con el medio ambiente y producción consciente.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-gray-200">
          <h2 className="text-2xl font-light mb-4">¿Lista para brillar?</h2>
          <a
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Explorar Colección
          </a>
        </section>
      </div>
    </div>
  );
}