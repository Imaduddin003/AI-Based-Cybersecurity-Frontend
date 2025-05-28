/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*/.{js,jsx,ts,tsx}", // Fix: Use **/* instead of */
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};