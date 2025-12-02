/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gaia: {
          // Paleta principal — Cálida
          'bone': '#F8F5F0',           // Blanco hueso cálido (reemplaza white)
          'cream': '#EDE7DD',          // Crema secundario
          'concrete': '#7A7D7F',       // Gris microcemento
          'black-soft': '#1A1A1A',     // Negro suave (reemplaza black puro)
          'crimson': '#AF161F',        // Acento signature
          
          // Grises auxiliares
          'charcoal': '#2B2B2B',       // Charcoal suave
          'silver': '#C9C9C9',         // Silver (placeholders)
          'ash': '#666666',            // Ash (texto secundario)
          
          // Overlays — Actualizados a negro suave
          'overlay': 'rgba(26, 26, 26, 0.50)',
          'overlay-light': 'rgba(26, 26, 26, 0.15)',
          'overlay-hover': 'rgba(26, 26, 26, 0.60)',
          
          // Borders — Actualizados a concrete
          'border': 'rgba(122, 125, 127, 0.15)',
          'border-solid': 'rgba(122, 125, 127, 0.3)',
        }
      },
      
      // ═══════════════════════════════════════════════
      // 🔤 SISTEMA TIPOGRÁFICO
      // ═══════════════════════════════════════════════
      fontFamily: {
        display: ['Galiska', 'Georgia', 'Playfair Display', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      // ═══════════════════════════════════════════════
      // 📏 TRACKING (Letter Spacing) — Sistema consistente
      // ═══════════════════════════════════════════════
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.15em',
        'wider': '0.25em',
        'ultra': '0.3em',
      },
      
      // ═══════════════════════════════════════════════
      // 📐 ESCALA TIPOGRÁFICA — Editorial + Optimizada
      // ═══════════════════════════════════════════════
      fontSize: {
        // Micro (labels, tags, badges)
        'micro': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.3em', fontWeight: '500' }], // 10px
        
        // Base — Body text
        'xs': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '300' }],  // 14px  
        'base': ['1rem', { lineHeight: '1.5rem', fontWeight: '300' }],     // 16px (body default)
        'lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '300' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '400' }],   // 20px
        
        // Display — Títulos (usar font-display)
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],      // 60px
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],          // 72px
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],            // 96px
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.04em' }],            // 128px
      },
      
      // ═══════════════════════════════════════════════
      // 📏 ESPACIADO — Sistema 4px + específicos Gaia
      // ═══════════════════════════════════════════════
      spacing: {
        // Base (4px increments) — Ya incluidos por defecto en Tailwind
        // Solo agregamos los específicos
        'section': '6rem',      // 96px — padding vertical secciones
        'section-lg': '8rem',   // 128px — secciones grandes
        'gutter': '1.5rem',     // 24px — espaciado interno cards
      },
      
      // ═══════════════════════════════════════════════
      // 🎬 ANIMACIONES — Minimalista, sin efectos pesados
      // ═══════════════════════════════════════════════
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      
      // ═══════════════════════════════════════════════
      // 🖼 ASPECT RATIOS — Formatos fotográficos
      // ═══════════════════════════════════════════════
      aspectRatio: {
        'product': '3/4',     // Producto vertical (principal)
        'editorial': '4/5',   // Editorial vertical
        'square': '1/1',      // Cuadrado
        'landscape': '4/3',   // Horizontal
        'hero': '16/9',       // Hero horizontal
      },
      
      // ═══════════════════════════════════════════════
      // 🎯 TRANSICIONES — Smooth & Elegant
      // ═══════════════════════════════════════════════
      transitionDuration: {
        'fast': '200ms',
        'base': '300ms',
        'slow': '500ms',
        'slower': '700ms',
      },
      
      transitionTimingFunction: {
        'gaia': 'cubic-bezier(0.4, 0, 0.2, 1)', // Ease out suave
      },
      
      // ═══════════════════════════════════════════════
      // 📐 CONTAINERS — Max width responsive
      // ═══════════════════════════════════════════════
      maxWidth: {
        'gaia': '1400px', // Max container width
      },
      
      // ═══════════════════════════════════════════════
      // 🎨 BACKGROUND IMAGES — Gradientes Gaia
      // ═══════════════════════════════════════════════
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(26, 26, 26, 0.15) 80%, rgba(26, 26, 26, 0.25) 100%)',
        'gradient-overlay': 'linear-gradient(to top, rgba(26, 26, 26, 0.7) 0%, rgba(26, 26, 26, 0.2) 50%, transparent 100%)',
        'gradient-radial': 'radial-gradient(circle at center, #EDE7DD 0%, #F8F5F0 100%)',
      },
    },
  },
  plugins: [],
}