// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- Asegúrate de que esta línea esté así
  ],
  theme: {
    extend: {
      // AQUÍ PEGARÁS LA CONFIGURACIÓN DE COLORES Y FUENTES QUE HICIMOS ANTES
      colors: {
        'primary': '#003366',
        'background': '#F8F9FA',
        'accent': '#FF7F50',
        'text-primary': '#343A40',
        'text-secondary': '#6C757D',
        'border-soft': '#CED4DA',
      },
      fontFamily: {
        'sans': ['Source Sans 3', 'sans-serif'],
        'heading': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}