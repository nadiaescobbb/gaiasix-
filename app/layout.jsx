import './globals.css'

export const metadata = {
  title: 'Gaia Six - Tu estilo, tu libertad',
  description: 'Ropa femenina con estilo. Cómoda, con onda y lista para salir. Descubrí nuestra colección de looks casuales y de salir.',
  keywords: 'ropa femenina, moda, estilo, casual, elegante, argentina',
  authors: [{ name: 'Gaia Six' }],
  openGraph: {
    title: 'Gaia Six - Tu estilo, tu libertad',
    description: 'Ropa femenina con estilo. Cómoda, con onda y lista para salir.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Gaia Six',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaia Six - Tu estilo, tu libertad',
    description: 'Ropa femenina con estilo. Cómoda, con onda y lista para salir.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}