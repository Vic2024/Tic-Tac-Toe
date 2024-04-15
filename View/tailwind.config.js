/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'layout': { 'max': '930px' },
      'phone': { 'max': '768px' }
    },
    colors: {
      'primary': '#eee',
      'secondary': '#242424',
      'modal': 'rgba(0, 0, 0, 0.7)',
      'green-back': 'rgb(34 197 94)',
      'green-border': 'rgb(21 128 61)',
      'blue-back': 'rgb(96 165 250)',
      'blue-border': 'rgb(29 78 216)',
      'orange-back': 'rgb(251 146 60)',
      'orange-border': 'rgb(194 65 12)',
      'red-back': 'rgb(248 113 113)',
      'red-border': 'rgb(185 28 28)',
      'red-error': 'rgb(220 38 38)',
      'gray-back': 'rgb(64 64 64)',
      'hover-green': 'rgb(74 222 128)',
      'hover-red': 'rgb(239 68 68)'
    },
    extend: {
      animation: {
        toast: 'toast .3s forwards'
      },
      keyframes: {
        toast: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0px)',
          }
        },
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animated')
  ],
}

