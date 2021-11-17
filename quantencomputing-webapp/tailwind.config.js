const colors = require("./src/theme/theme.config");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      minWidth: {
        "1/2": "50%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
