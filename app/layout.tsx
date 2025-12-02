import './globals.css'
import localFont from 'next/font/local'
import { AppProvider } from '../context/AppContext'
import { ToastProvider } from '../context/ToastContext'
import ClientLayout from '../components/layout/ClientLayout'


// ═══════════════════════════════════════════════════════════════
// FUENTES LOCALES — Gaia Six Sistema Tipográfico
// ═══════════════════════════════════════════════════════════════

/**
 * GALISKA — Tipografía display para títulos y hero
 * Usamos el archivo único que tenés: Galiska.woff2
 */
const galiska = localFont({
  src: [
    {
      path: '../public/fonts/Galiska.woff2',
      weight: '300', // Light
      style: 'normal',
    },
    {
      path: '../public/fonts/Galiska.woff2', 
      weight: '400', 
      style: 'normal',
    },
    {
      path: '../public/fonts/Galiska.woff2', 
      weight: '700', // Bold
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

/**
 * CSTUNKER — Tipografía body para UI y textos
 * Usamos el archivo único que tenés: CSTunker.woff2
 */
const cstunker = localFont({
  src: [
    {
      path: '../public/fonts/CSTunker.woff2',
      weight: '300', // Light
      style: 'normal',
    },
    {
      path: '../public/fonts/CSTunker.woff2', 
      weight: '400', // Regular
      style: 'normal',
    },
    {
      path: '../public/fonts/CSTunker.woff2', 
      weight: '700', // Bold
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

// ═══════════════════════════════════════════════════════════════
// METADATA — SEO y Open Graph
// ═══════════════════════════════════════════════════════════════
export const metadata = {
  title: 'GAIA SIX ',
  description: 'Siluetas nocturnas. Diseños que definen. Elegancia sin palabras.',
  keywords: ['moda femenina', 'boho', 'rock glam', 'vestidos', 'ropa nocturna', 'gaia six'],
  authors: [{ name: 'GAIA SIX' }],
  creator: 'GAIA SIX',
  
  // Open Graph (para compartir en redes)
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://gaiasix.com',
    title: 'gaia six - showroom online',
    description: 'Siluetas nocturnas. Diseños que definen.',
    siteName: 'GAIA SIX',
    images: [
      {
        url: '/logo.jpg', 
        width: 1200,
        height: 630,
        alt: 'GAIA SIX',
      },
    ],
  },
  
  // Favicons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  
  // Configuración adicional
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ═══════════════════════════════════════════════════════════════
// VIEWPORT — Configuración responsive
// ═══════════════════════════════════════════════════════════════
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000', // Negro Gaia
}

// ═══════════════════════════════════════════════════════════════
// ROOT LAYOUT — Estructura principal
// ═══════════════════════════════════════════════════════════════
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="es" 
      className={`${galiska.variable} ${cstunker.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased bg-white text-black">
        <ToastProvider>
          <AppProvider>
            <ClientLayout>  
              {children}
            </ClientLayout>
          </AppProvider>
        </ToastProvider>
      </body>
    </html>
  )
}