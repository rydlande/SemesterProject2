/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ['./*.html', './src/**/*.{css, js, html}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      stone: colors.stone,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      teal: colors.teal,
      cyan: colors.cyan,
      purple: colors.purple,
      pink: colors.fuchsia,
      rose: colors.rose,
      fa: '#fafafa',
    },
    extend: {},
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
