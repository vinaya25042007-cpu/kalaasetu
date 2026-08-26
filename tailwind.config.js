/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: '#BF5B3D', light: '#D98A6B', dark: '#8C3E28' },
        madder: { DEFAULT: '#7A1F3D', light: '#A13A5C', dark: '#4F1327' },
        turmeric: { DEFAULT: '#E8A93C', light: '#F3C978', dark: '#B8811F' },
        ivory: '#FBF6EE',
        indigonight: { DEFAULT: '#232C4D', light: '#3B4A7A' },
        bronze: '#8C6A3F',
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'kolam': "radial-gradient(circle at 1px 1px, rgba(191,91,61,0.15) 1px, transparent 0)",
      },
      boxShadow: {
        'glow': '0 0 40px rgba(232,169,60,0.35)',
      },
    },
  },
  plugins: [],
}