/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      spacing: {
        13: 2,
      },
      colors: {
        'light-blue': 'rgba(241, 243, 255, 1)',
        'lime-green': 'rgba(92, 184, 95, 1)',
        'lime-green-hover': 'rgb(45, 90, 47)',
        'blue': 'rgba(13, 40, 166, 1)',
      },
      content: {
        'checklist': 'url("img/png/check.png")',
      },
    },
  },
}