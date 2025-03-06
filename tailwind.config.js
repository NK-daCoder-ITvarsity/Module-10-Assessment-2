 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js,jsx,ts,tsx}", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        spin360: "spin360 1s linear infinite",
      },
      keyframes: {
        spin360: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
  },
  plugins: [],
}}