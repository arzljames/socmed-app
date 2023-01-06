/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-main": "#272727",
        "text-sub": "#6F6F6F",
        "color-main": "#5E865A",
        "color-main-dark": "#466443",
        "color-border": "#C0C0C0",
      },
    },
  },
  plugins: [],
};
