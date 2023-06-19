/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#454545',
          200: '#292929',
          300: '#2E2E2E',
          400: '#303030',
          500: '#121212'
        }
      },
      fontSize: {
        'header': '1.7rem',
        'content': '1rem',
        'small': '0.85rem'
      }
    }
    
  },
  plugins: [],
}