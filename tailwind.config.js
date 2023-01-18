/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  important: true,
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
        "color-main-light": "#E2ECE1",
        "color-main-dark": "#466443",
        "color-border": "#C0C0C0",
        "color-bg": "#EFEFEF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
  safelist: [
    "bg-red-500",
    "bg-orange-500",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-gray-400",
    "bg-green-500",
  ],
};
