/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EDEAE2',
        ink: '#15161A',
        studio: {
          DEFAULT: '#121317',
          light: '#1B1D22',
        },
        signal: '#2A3EF5',
        clay: '#B5613F',
        sage: '#6B6A54',
        line: 'rgba(21,22,26,0.12)',
        'line-dark': 'rgba(237,234,226,0.14)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      maxWidth: {
        content: '1400px',
      },
    },
  },
  plugins: [],
};
