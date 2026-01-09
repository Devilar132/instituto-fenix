/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Laranja vibrante do logo (Primary)
        primary: {
          50: '#FFF4F0',
          100: '#FFE5D9',
          200: '#FFCCB3',
          300: '#FFB38D',
          400: '#FF8A5C',
          500: '#FF6B35', // Cor principal do logo
          600: '#E55A2B',
          700: '#CC4A21',
          800: '#B33A17',
          900: '#992A0D',
        },
        // Laranja complementar (Secondary)
        secondary: {
          50: '#FFF8F5',
          100: '#FFF0E8',
          200: '#FFE1D1',
          300: '#FFC9A3',
          400: '#FFA875',
          500: '#FF8747',
          600: '#E66F2F',
          700: '#CC5717',
          800: '#B33F0F',
          900: '#992707',
        },
        // Preto do logo (Dark)
        dark: {
          50: '#1A1A1A',
          100: '#2D2D2D',
          200: '#404040',
          300: '#525252',
          400: '#666666',
          500: '#000000', // Preto puro do logo
          600: '#0A0A0A',
          700: '#141414',
          800: '#1F1F1F',
          900: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

