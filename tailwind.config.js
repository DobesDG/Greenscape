/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-purple": "#d19dfa",
        "light-gray": "#dee3ff",
        "default-green": "#039b62",
        "hover-green": "#25d367",
      },
    },
  },
  plugins: [],
};

