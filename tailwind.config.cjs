/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '21': '5.25rem', // 84px
      },
      height: {
        '21': '5.25rem', // 84px
      },
      translate: {
        'z-5': '5px',
        'z-6': '6px',
        'z-10': '10px',
      },
      rotate: {
        'x-60': '60deg',
        'z-45': '-45deg',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
} 