/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',
          surface: '#111827',
          card: '#1F2937',
          accent: '#3B82F6',
          cyan: '#06B6D4',
          neon: '#10B981',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.25), rgba(11, 15, 25, 1))',
        'glow-gradient': 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
      }
    },
  },
  plugins: [],
}
