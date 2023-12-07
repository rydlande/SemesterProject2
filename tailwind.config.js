/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{css, js, html}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      fa: "#fafafa",
      main: "#409494",
      "main-dark": "#155A5A",
      "main-light": "#C0E7E7",
      pink: "#ff49db",
      gray: "#8492a6",
      "gray-light": "#F2F2F2",
      "gray-lighter": "#D9D9D9",
      "gray-dark": "#5c6674",
      white: "#FFFFFF",
      black: "#000000",
      red: "#e50000",
    },
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
