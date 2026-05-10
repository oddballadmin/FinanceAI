const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const source = (pattern) => path.join(projectRoot, pattern);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    source('App.{js,jsx,ts,tsx}'),
    source('app/**/*.{js,jsx,ts,tsx}'),
    source('components/**/*.{js,jsx,ts,tsx}'),
    source('features/**/*.{js,jsx,ts,tsx}'),
    source('hooks/**/*.{js,jsx,ts,tsx}'),
    source('lib/**/*.{js,jsx,ts,tsx}'),
    source('store/**/*.{js,jsx,ts,tsx}'),
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
