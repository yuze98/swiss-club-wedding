/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#c1683a',      // terracotta primary accent
        cream: '#f5ebe0',     // warm cream background
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Jost', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        'fadeIn-delay-1': 'fadeIn 1s ease-out 0.3s forwards',
        'fadeIn-delay-2': 'fadeIn 1s ease-out 0.8s forwards',
        'fadeIn-delay-3': 'fadeIn 1s ease-out 1.3s forwards',
        'fadeIn-delay-4': 'fadeIn 1s ease-out 1.8s forwards',
        'fadeIn-delay-5': 'fadeIn 1s ease-out 2.3s forwards',
        slideUp: 'slideUp 0.8s ease-out forwards',
        'slideUp-delay-1': 'slideUp 0.8s ease-out 0.1s forwards',
        'slideUp-delay-2': 'slideUp 0.8s ease-out 0.2s forwards',
        'slideUp-delay-3': 'slideUp 0.8s ease-out 0.3s forwards',
        'slideUp-delay-4': 'slideUp 0.8s ease-out 0.4s forwards',
        slideDown: 'slideDown 1s ease-out forwards',
        'slideDown-delay-2': 'slideDown 1s ease-out 0.8s forwards',
        scaleIn: 'scaleIn 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
