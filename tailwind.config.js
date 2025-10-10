/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        primary: '#2563eb', // azul PayPal
        secondary: '#0ea5e9', // celeste
        accent: '#facc15', // amarillo para acentos
      },
    },
  },
  plugins: [],
}