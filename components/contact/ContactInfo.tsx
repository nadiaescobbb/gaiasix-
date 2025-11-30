import { Phone, MapPin, Instagram, Clock } from 'lucide-react';

export function ContactInfo() {
  const contactItems = [
    {
      type: 'WhatsApp',
      value: '+54 9 2964 479923',
      href: 'https://wa.me/5492964479923',
      description: 'Te respondemos en horario comercial.',
      icon: Phone
    },
    {
      type: 'Showroom', 
      value: 'Río Grande',
      description: 'Tierra del Fuego, Argentina',
      note: 'Atención solo con cita previa.',
      icon: MapPin
    },
    {
      type: 'Instagram',
      value: '@gaiasix', 
      href: 'https://instagram.com/gaiasix',
      description: 'Publicamos novedades, ingresos y actualizaciones diarias.',
      icon: Instagram
    }
  ];

  return (
    <div className="space-y-10">
      <div className="pb-8 border-b border-gray-200">
        <span className="text-xs text-[#AF161F] tracking-[0.2em] uppercase font-medium">
          Nuestros Datos
        </span>
        <p className="text-gray-600 leading-relaxed">
          Consultas, pedidos o lo que necesites. Te respondemos dentro del mismo día hábil.
        </p>
      </div>

      <div className="space-y-6">
        {contactItems.map((item, index) => {
          const Component = item.href ? 'a' : 'div';
          const props = item.href ? {
            href: item.href,
            target: '_blank',
            rel: 'noopener noreferrer'
          } : {};

          return (
            <Component
              key={index}
              {...props}
              className={`group block p-6 border border-gray-200 transition-all duration-300 ${
                item.href 
                  ? 'bg-white hover:border-[#AF161F] hover:shadow-lg cursor-pointer' 
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  item.href 
                    ? 'bg-gray-50 group-hover:bg-[#AF161F]' 
                    : 'bg-white'
                }`}>
                  <item.icon 
                    className={`transition-colors ${
                      item.href 
                        ? 'text-gray-600 group-hover:text-white' 
                        : 'text-gray-600'
                    }`} 
                    size={20} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                    {item.type}
                  </h3>
                  <p className={`text-lg font-light transition-colors ${
                    item.href 
                      ? 'text-gray-900 group-hover:text-[#AF161F]' 
                      : 'text-gray-900'
                  }`}>
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>
                  {item.note && (
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                      <Clock size={14} />
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            </Component>
          );
        })}
      </div>

      <div className="p-6 bg-black text-white">
        <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-4">
          Horarios de Atención
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/80">Lunes - Viernes</span>
            <span className="font-light">16:00 - 21:00hs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Sábados</span>
            <span className="font-light">16:00 - 21:00hs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/80">Domingos</span>
            <span className="font-light">Cerrado</span>
          </div>
        </div>
      </div>
    </div>
  );
}