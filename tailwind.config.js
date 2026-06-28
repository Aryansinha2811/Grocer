/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--brand-primary)',
          secondary: 'var(--brand-secondary)',
          dark: 'var(--brand-dark-accent)',
        }
      },
      backgroundImage: {
        'gradient-brand-primary': 'var(--gradient-primary)',
        'gradient-brand-dark': 'var(--gradient-dark)',
      }
    },
  },
  plugins: [],
}