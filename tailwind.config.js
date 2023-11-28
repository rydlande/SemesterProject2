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
      blue: "#1fb6ff",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      gray: "#8492a6",
    },
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
