/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinky: {
          light: "#ffeef6",
          DEFAULT: "#ff7fb8",
          dark: "#ff4c95",
        }
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"]
      }
    },
  },
  plugins: [],
}
