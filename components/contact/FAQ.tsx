export function FAQ() {
  const faqs = [
    {
      q: '¿En cuánto tiempo responden?',
      a: 'Respondemos en el mismo día hábil. Si escribís fuera de horario, te contestamos al día siguiente.'
    },
    {
      q: '¿Puedo visitar el showroom?',
      a: 'Sí, con cita previa. Escribinos por WhatsApp para coordinar'
    },
    {
      q: '¿Hacen envíos a todo el país?',
      a: 'Trabajamos con Correo Argentino, Andreani y envíos en moto dentro de Río Grande. Los despachos salen en el día.'
    },
    {
      q: '¿Puedo cambiar un producto?',
      a: 'Sí, podés cambiar dentro de los 7 días. Podés ver la política completa en nuestra web.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">
            FAQ
          </span>
          <h2 className="text-3xl font-light mt-3 mb-4">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="group bg-white border border-gray-200 p-6 hover:border-[#AF161F] transition-colors"
            >
              <summary className="font-light text-lg cursor-pointer list-none flex items-center justify-between">
                {faq.q}
                <span className="text-2xl text-gray-400 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}