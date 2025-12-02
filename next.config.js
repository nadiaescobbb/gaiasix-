/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite todas las imágenes HTTPS
      },
      {
        protocol: 'http', 
        hostname: 'localhost', // Para desarrollo local
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
}


module.exports = nextConfig