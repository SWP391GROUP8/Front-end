const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{html, ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        blue: {
          custom: "#0950A1",
          text: "#0C2957",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
