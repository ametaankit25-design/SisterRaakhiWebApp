/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rakhi: {
          pink: '#FF4D8D',
          rose: '#E11D48',
          gold: '#F59E0B',
          amber: '#D97706',
          purple: '#7C3AED',
          deep: '#4C1D95',
          cream: '#FFFBEB',
          saffron: '#FF7A00',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        cursive: ['"Caveat"', '"Playfair Display"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
