/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5F7FFF',
        accent: '#A970FF',
        darkBg: '#181A20',
        darkCard: 'rgba(35,38,47,0.7)',
        glass: 'rgba(40,44,52,0.5)',
        glow: '#7F9CF5',
        borderGlass: 'rgba(120,120,255,0.3)',
        cardShadow: 'rgba(0,0,0,0.6)',
        textGlow: '#F4F4F5',
      },
      fontFamily: {
        sans: ['Inter', 'HarmonyOS Sans', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(40,44,52,0.25)',
        glow: '0 0 16px 2px #5F7FFF, 0 0 2px 1px #A970FF',
        card: '0 2px 24px 0 rgba(0,0,0,0.35)',
      },
      backdropBlur: {
        glass: '12px',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(120deg, #23262F 0%, #181A20 100%)',
        'glass-gradient': 'linear-gradient(120deg, rgba(95,127,255,0.12) 0%, rgba(169,112,255,0.08) 100%)',
      },
      borderWidth: {
        glass: '1.5px',
      },
      transitionProperty: {
        'bg': 'background-color, background-image',
        'shadow': 'box-shadow',
      },
    },
  },
  plugins: [],
};
