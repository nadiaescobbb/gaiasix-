import './globals.css'

export const metadata = {
  title: 'Gaia Six - Shop online',
  description: 'Ropa femenina con estilo. Cómoda, con onda y lista para salir. Descubrí nuestra colección de looks casuales y de salir.',
  keywords: 'ropa femenina, moda, estilo, casual, elegante, argentina',
  authors: [{ name: 'Gaia Six' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Gaia Six',
    description: 'Ropa femenina con estilo. Cómoda, con onda y lista para salir.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Gaia Six',
    images: [
      {
        url: '/logo.png', 
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaia Six',
    description: 'Ropa femenina con estilo. Cómoda, con onda y lista para salir.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}