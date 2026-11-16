/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sony: {
          dark: '#050505',
          black: '#0a0a0a',
          card: '#121212',
          surface: '#1a1a1a',
          border: '#2a2a2a',
          muted: '#8a8a8a',
          blue: '#0050FF',
          cyan: '#00D6FF',
        },
        gray: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
          500: '#5a5a5a',
          400: '#8a8a8a',
          300: '#aaaaaa',
          200: '#d0d0d0',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
      },
    },
  },
  plugins: [],
}
