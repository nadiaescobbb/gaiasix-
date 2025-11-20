export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-light text-center mb-12">Contacto</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-light mb-6">Hablemos</h2>
            <div className="space-y-4 text-gray-600">
              <p>¿Tenés alguna consulta sobre nuestros productos?</p>
              <p>¿Necesitás ayuda con tu pedido?</p>
              <p>Estamos aquí para ayudarte.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-light mb-6">Información de Contacto</h2>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">gaiashowroom@gmail.com</p>
              </div>
              <div>
                <p className="font-medium">WhatsApp</p>
                <p className="text-gray-600">+54 9 2964 479923</p>
              </div>
              <div>
                <p className="font-medium">Instagram</p>
                <p className="text-gray-600">@gaiasix</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}