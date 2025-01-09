/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#FFF',
          surface: '#F8F9FA',
          primary: '#007AFF',
          secondary: '#6C757D',
          text: {
            primary: '#000000',
            secondary: '#666666',
            tertiary: '#999999',
          },
          border: '#E5E5E5',
          error: '#FF3B30',
        },
        dark: {
          background: '#1C1C1E',
          surface: '#2C2C2E',
          primary: '#0A84FF',
          secondary: '#86868B',
          text: {
            primary: '#FFFFFF',
            secondary: '#EBEBF5',
            tertiary: '#8E8E93',
          },
          border: '#38383A',
          error: '#FF453A',
        },
      },
    },
  },
  plugins: [],
};
