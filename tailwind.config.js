/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#072340',
        turquoise: '#3FB6B2',
        orange: '#FFC35D'
      }
    },
    fontFamily: {
      sans: ['Mulish', 'sans-serif']
    }
  },
  plugins: [],
}
