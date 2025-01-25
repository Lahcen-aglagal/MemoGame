/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-from-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'slide-from-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        }
      },
      transitionDuration: {
        '2000': '2000ms', // Add a 2000ms duration
      },
      animation: {
        'slide-from-left': 'slide-from-left 0.5s ease-out forwards',
        'slide-from-right': 'slide-from-right 0.5s ease-out forwards'
      }
    }
  },
  plugins: [],
}