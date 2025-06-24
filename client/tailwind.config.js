/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ".index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32", // Green
        secondary: "#D32F2F", // Red
        accent: "##a16207", // Yellow
        neutral: "#263238", // Yellow
        light: "#F5F6F5", // light
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}



