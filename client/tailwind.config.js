/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5722',
          dark: '#E64A19',
          light: '#FF8A65',
          soft: 'rgba(255, 87, 34, 0.1)',
        },
        secondary: {
          DEFAULT: '#FFC107',
          dark: '#FFA000',
          light: '#FFD54F',
        },
        dark: {
          DEFAULT: '#111111',
          card: '#1A1A1A',
          paper: '#222222',
          border: '#333333',
        },
        light: {
          DEFAULT: '#FFFFFF',
          bg: '#F8F9FA',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        customGray: {
          DEFAULT: '#777777',
          light: '#A0A0A0',
          dark: '#4A4A4A',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(255, 87, 34, 0.35)',
        'glow-gold': '0 0 25px rgba(255, 193, 7, 0.35)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.15)',
        'premium-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-reverse': 'floatReverse 5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-3deg)' },
        }
      }
    },
  },
  plugins: [],
}
