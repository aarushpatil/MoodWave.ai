/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        backgradienttop: "#3A37B9",
        backgradientbot: "#8421A7",
        displaybox: "#311f42",
        button: "#803DB5",
        logocolor: "#5065A8",
      },
      fontFamily: {
        Lato: ["Lato"],
      },
    },
  },
  plugins: [],
};
