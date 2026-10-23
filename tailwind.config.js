/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        ink: {
          50: '#F3F5F8', 100: '#E3E8EF', 200: '#C5CEDB', 300: '#9AA8BC', 400: '#6D7E97',
          500: '#4D5E78', 600: '#3A4962', 700: '#2B3850', 800: '#1D283C', 900: '#131C2C', 950: '#0B111C',
        },
        sea: {
          50: '#EEF7F6', 100: '#D5ECEA', 200: '#AED9D5', 300: '#7FC0BB', 400: '#55A5A0',
          500: '#3D8A86', 600: '#306F6C', 700: '#295957', 800: '#234846', 900: '#1E3B3A',
        },
        cream: { 50: '#FFFDF9', 100: '#FAF7F2', 200: '#F3EEE5', 300: '#E8E1D5', 400: '#D8CEBE' },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(19,28,44,.04), 0 8px 24px -8px rgba(19,28,44,.08)',
        lift: '0 2px 4px rgba(19,28,44,.04), 0 24px 48px -16px rgba(19,28,44,.18)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'none' } },
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'scale-in': { from: { opacity: 0, transform: 'scale(.97) translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.2,.7,.2,1) both',
        'fade-in': 'fade-in .25s ease-out both',
        'scale-in': 'scale-in .3s cubic-bezier(.2,.7,.2,1) both',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [],
};
