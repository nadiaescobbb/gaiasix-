# 🖤 Gaia Six

E-commerce de ropa femenina con estilo. Tu estilo, tu libertad, tu momento.

## 🌟 Características

- 🛍️ Catálogo de productos con filtros por categoría
- 🛒 Carrito de compras funcional
- 👤 Sistema de registro y login
- 📦 Historial de pedidos
- 📱 100% Responsive
- ⚡ Optimizado para performance

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14
- **Estilo**: Tailwind CSS
- **Iconos**: Lucide React
- **Storage**: Browser Storage API
- **Tipografías**: Playfair Display + Inter

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/gaia-six.git

# Entrar al directorio
cd gaia-six

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
gaia-six/
├── app/
│   ├── components/       # Componentes reutilizables
│   │   ├── layout/      # Header, Footer, etc.
│   │   ├── products/    # Componentes de productos
│   │   ├── auth/        # Login, registro
│   │   └── ui/          # Componentes UI generales
│   ├── services/        # Lógica de negocio
│   ├── hooks/           # Custom hooks
│   ├── context/         # Context API
│   ├── data/            # Datos estáticos
│   ├── utils/           # Funciones auxiliares
│   ├── globals.css      # Estilos globales
│   ├── layout.jsx       # Layout principal
│   └── page.jsx         # Página principal
├── public/              # Archivos estáticos
└── package.json
```

## 🎨 Paleta de Colores

- **Negro**: #000000
- **Rojo Gaia**: #741717
- **Gris Claro**: #f9fafb

## 🔐 Funcionalidades de Usuario

### Registro
- Formulario completo con validaciones
- Guarda dirección de envío
- Creación automática de sesión

### Login
- Validación de credenciales
- Persistencia de sesión
- Recuperación de historial

### Mi Cuenta
- Información personal
- Dirección de envío
- Historial de pedidos completo

## 📦 Scripts Disponibles

```bash
npm run dev      # Modo desarrollo
npm run build    # Build de producción
npm run start    # Iniciar servidor de producción
npm run lint     # Linter
```

## 🌐 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

## 📝 Variables de Entorno

Crear archivo `.env.local`:

```env
# Mercado Pago (futuro)
NEXT_PUBLIC_MP_PUBLIC_KEY=tu_public_key

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=tu_ga_id
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a Gaia Six.

## 📧 Contacto

- **Email**: contacto@gaiasix.com
- **Instagram**: [@gaiasix](https://instagram.com/gaiasix)
- **WhatsApp**: +54 9 11 1234-5678

---

Hecho con 🖤 por ndv