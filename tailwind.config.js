/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070913',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155'
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite'
      }
    },
  },
  plugins: [],
}
