/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bank: {
          50: '#f0f4f9',
          100: '#e1e9f2',
          200: '#c3d3e6',
          300: '#94b3d4',
          400: '#5e8fc0',
          500: '#3a72aa',
          600: '#2b5a8e',
          700: '#234873',
          800: '#1e3d60',
          900: '#1a334f',
          950: '#0d1d2e',
        },
        rbi: {
          gold: '#c59b27',
          dark: '#16233F'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
