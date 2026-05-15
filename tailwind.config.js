/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './store/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        app: {
          background: 'rgb(var(--color-background) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
          foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          'primary-foreground':
            'rgb(var(--color-primary-foreground) / <alpha-value>)',
          positive: 'rgb(var(--color-positive) / <alpha-value>)',
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          danger: 'rgb(var(--color-danger) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
};
