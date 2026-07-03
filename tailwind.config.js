/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        rose: '#C9847A',
        gold: '#C9A84C',
        charcoal: '#2C2C2C',
        ink: '#3A3A3A',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        dmsans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        italiana: ['var(--font-italiana)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
