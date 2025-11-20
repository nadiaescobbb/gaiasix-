// 📄 ARCHIVO: app/layout.tsx - CORREGIDO

import './globals.css'
import localFont from 'next/font/local'
import { AppProvider } from '../context/AppContext'
import { ToastProvider } from '../context/ToastContext'
import ClientLayout from '../components/layout/ClientLayout'

// ===============================
// FUENTES LOCALES - CORREGIDAS
// ===============================
const galiscka = localFont({
  src: '../fonts/galiscka.woff2',  
  variable: '--font-galiscka',
})

const cstucker = localFont({
  src: '../fonts/cstucker.woff2',  
  variable: '--font-cstucker',
})

// ===============================
// METADATA
// ===============================
export const metadata = {
  title: 'Gaia Six - Shop online',
  description: 'Ropa femenina con estilo',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

// ===============================
// ROOT LAYOUT
// ===============================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${galiscka.variable} ${cstucker.variable}`}>
      <body className="antialiased">
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