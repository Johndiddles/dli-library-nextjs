/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    fontFamily: {
      montserrat: ["var(--font-montserrat)", "sans-serif"],
      raleway: ["var(--font-raleway)", "serif"],
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
