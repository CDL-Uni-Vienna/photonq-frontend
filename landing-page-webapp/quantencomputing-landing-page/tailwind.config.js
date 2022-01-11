const colors = require("./theme/theme.config");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-light": "#AFCDE3",
        ...colors,
      },
      maxWidth: {
        max: "1400px",
      },
      width: {
        "filter-button": "142px",
        "filter-button-sm": "81px",
      },
      maxHeight: {
        hero: "1100px",
      },
      padding: {
        navbar: "80px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
