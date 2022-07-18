/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'normal': '#A9A979',
        'fire': '#F0812C',
        'water': '#6891F0',
        'grass': '#79C94F',
        'electric': '#F8D12C',
        'ice': '#99D9D9',
        'fighting': '#C12C23',
        'poison': '#C12C23',
        'ground': '#E1C168',
        'flying': '#A991F0',
        'psychic': '#F85789',
        'bug': '#A9B91A',
        'rock': '#B9A135',
        'ghost': '#705799',
        'dragon': '#7035F8',
        'dark': '#705746',
        'steel': '#B9B9D1',
        'fairy': '#FF9CE2',
      }
    },
  },
  plugins: [],
}
