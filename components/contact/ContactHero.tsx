export function ContactHero() {
  return (
    <section className="relative h-[40vh] md:h-[50vh] bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/contact-hero.jpg)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-tight">
            HABLEMOS
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto">
            Escribinos y te respondemos dentro del mismo día hábil.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
}