/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9",
        secondary: "#A855F7",
        accent: "#F59E0B",
        neutral: "#F3F4F6",
        "base-100": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
