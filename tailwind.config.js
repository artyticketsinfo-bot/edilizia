/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./types.ts"
  ],
  theme: {
    extend: {
      colors: {
        construction: {
          deep: '#2F3E46',
          sage: '#52796F',
          brick: '#C97B36',
          light: '#EAEAEA',
          darkText: '#222222',
          whiteOff: '#F8F9FA',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}