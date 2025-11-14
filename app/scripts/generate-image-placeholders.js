const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURACIÓN
// ============================================

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const PRODUCTS_DIR = path.join(IMAGES_DIR, 'products');

// Lista de imágenes necesarias según products.js
const REQUIRED_IMAGES = [
  'top-trick.avif',
  'top-tini.avif',
  'top-anja.avif',
  'top-drape.avif',
  'top-fylo.avif',
  'mini-trace.avif',
  'mini-lark.avif',
  'set-feral.avif',
  'set-seline.avif',
  'vestido-platt.avif',
  'vestido-inessia.avif',
  'vestido-stun.avif',
  'vestido-zetra.avif',
];

// ============================================
// FUNCIONES
// ============================================

function createDirectories() {
  console.log('📁 Creando estructura de carpetas...\n');
  
  const dirs = [PUBLIC_DIR, IMAGES_DIR, PRODUCTS_DIR];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Creado: ${dir}`);
    } else {
      console.log(`ℹ️  Ya existe: ${dir}`);
    }
  });
  
  console.log('\n');
}

function generateReadme() {
  const readme = `# Imágenes de Productos

## 📸 Estructura

\`\`\`
public/
  └── images/
      └── products/
          ├── top-trick.avif
          ├── top-tini.avif
          ├── top-anja.avif
          └── ...
\`\`\`

## 🎨 Especificaciones de Imágenes

### Formato
- **Tipo**: AVIF (WebP o JPG como fallback)
- **Ratio**: 3:4 (vertical)
- **Resolución recomendada**: 1200x1600px
- **Peso máximo**: 500KB por imagen

### Optimización
\`\`\`bash
# Instalar sharp para optimizar imágenes
npm install -g sharp-cli

# Convertir a AVIF
sharp input.jpg -o output.avif --avif

# Redimensionar y optimizar
sharp input.jpg -o output.avif --resize 1200 1600 --avif
\`\`\`

## 📋 Imágenes Requeridas

${REQUIRED_IMAGES.map((img, i) => `${i + 1}. ${img}`).join('\n')}

## 🚀 Subir Imágenes

1. Toma fotos con buena iluminación
2. Usa fondo neutro (preferiblemente blanco o gris)
3. Mantén el ratio 3:4 (vertical)
4. Optimiza con Sharp o TinyPNG
5. Guarda en esta carpeta con el nombre correcto

## 🔄 Reemplazar Placeholders

Una vez que tengas las imágenes reales:
1. Reemplaza los archivos .avif en esta carpeta
2. Mantén los mismos nombres de archivo
3. Verifica que el ratio sea 3:4

---

**Nota**: Las imágenes placeholder actuales son solo para desarrollo.
`;

  const readmePath = path.join(PRODUCTS_DIR, 'README.md');
  fs.writeFileSync(readmePath, readme, 'utf8');
  console.log('✅ README.md creado en /public/images/products/\n');
}

function checkMissingImages() {
  console.log('🔍 Verificando imágenes faltantes...\n');
  
  const missing = [];
  const existing = [];
  
  REQUIRED_IMAGES.forEach(image => {
    const imagePath = path.join(PRODUCTS_DIR, image);
    if (fs.existsSync(imagePath)) {
      existing.push(image);
    } else {
      missing.push(image);
    }
  });
  
  if (existing.length > 0) {
    console.log('✅ Imágenes existentes:');
    existing.forEach(img => console.log(`   - ${img}`));
    console.log('\n');
  }
  
  if (missing.length > 0) {
    console.log('❌ Imágenes faltantes:');
    missing.forEach(img => console.log(`   - ${img}`));
    console.log('\n');
  }
  
  return { missing, existing };
}

function generateGitignoreException() {
  const gitignorePath = path.join(PRODUCTS_DIR, '.gitignore');
  const content = `# Permitir subir imágenes de productos
!*.avif
!*.webp
!*.jpg
!*.png
`;
  
  fs.writeFileSync(gitignorePath, content, 'utf8');
  console.log('✅ .gitignore configurado para permitir imágenes\n');
}

function generateNextConfig() {
  console.log('📝 Configuración recomendada para next.config.js:\n');
  console.log(`
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Si usas Cloudinary
      },
    ],
  },
}

module.exports = nextConfig
`);
}

// ============================================
// EJECUTAR
// ============================================

console.log('🚀 GENERADOR DE ESTRUCTURA DE IMÁGENES\n');
console.log('='.repeat(50) + '\n');

createDirectories();
generateReadme();
generateGitignoreException();
checkMissingImages();
generateNextConfig();

console.log('='.repeat(50));
console.log('\n✅ PROCESO COMPLETADO\n');
console.log('📋 PRÓXIMOS PASOS:\n');
console.log('1. Sube tus imágenes a public/images/products/');
console.log('2. Usa el formato AVIF (o WebP/JPG)');
console.log('3. Mantén el ratio 3:4 (1200x1600px recomendado)');
console.log('4. Verifica que los nombres coincidan con products.js\n');
console.log('💡 TIP: Usa https://squoosh.app para optimizar imágenes\n');