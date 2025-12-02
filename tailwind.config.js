/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════
      // 🎨 PALETA GAIA SIX 
      // ═══════════════════════════════════════════════
      colors: {
        gaia: {
          // Colores principales
          black: '#000000',
          white: '#F0F3F4',
          crimson: '#AF161F', 
          
          // Grises
          charcoal: '#111111',
          silver: '#C9C9C9',
          ash: '#666666',
          
          // Utilidades
          overlay: 'rgba(0, 0, 0, 0.85)',
          'overlay-light': 'rgba(0, 0, 0, 0.40)',
          border: 'rgba(201, 201, 201, 0.15)',
          'border-solid': 'rgba(201, 201, 201, 0.3)',
        }
      },
      
      // ═══════════════════════════════════════════════
      // 🔤 SISTEMA TIPOGRÁFICO — Solo 2 familias
      // ═══════════════════════════════════════════════
      fontFamily: {
      display: ['Galiska', 'Inter', 'serif'],
      body: ['Galiska', 'Inter', 'system-ui', 'sans-serif'],

      

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
      // 📐 ESCALA TIPOGRÁFICA — Editorial
      // ═══════════════════════════════════════════════
      fontSize: {
        // Micro (labels, tags)
        'micro': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.3em' }], // 10px
        
        // Base
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px  
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        
        // Display
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1.05' }],      // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],          // 72px
        '8xl': ['6rem', { lineHeight: '1' }],            // 96px
        '9xl': ['8rem', { lineHeight: '1' }],            // 128px
      },
      
      // ═══════════════════════════════════════════════
      // 📏 ESPACIADO — Sistema editorial completo
      // ═══════════════════════════════════════════════
      spacing: {
        // Base (4px increments)
        '0': '0',
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
        '40': '10rem',    // 160px
        '48': '12rem',    // 192px
        
        // Específicos Gaia
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
      },
      
      // ═══════════════════════════════════════════════
      // 🖼 ASPECT RATIOS — Formatos fotográficos
      // ═══════════════════════════════════════════════
      aspectRatio: {
        'product': '3/4',     // Producto vertical
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
    },
  },
  plugins: [],
}