/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './services/**/*.{js,jsx}',
    './store/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f8ff',
        foreground: '#111827',
        primary: {
          DEFAULT: '#0052cc',
          dark: '#003d99',
          light: '#e6f0ff'
        },
        success: '#0f766e',
        warning: '#a16207',
        danger: '#b91c1c'
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
        mono: ['ui-monospace', 'SFMono-Regular']
      },
      boxShadow: {
        card: '0 8px 30px rgba(2, 8, 23, 0.08)'
      }
    }
  },
  plugins: []
};
