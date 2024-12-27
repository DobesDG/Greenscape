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
        "primary-brown": "#cfc4b3",
        "primary-green": "#b5d288",
        "secondary-green": "#336150",
        "third-green" : "#1c4a39",
      },
      backgroundImage: {
        "bg-pattern": "url('./src/assets/bg.png')",
        "emailLogo": "url('./src/assets/email.png)"
      },
      fontFamily: {
        "inter": ["Inter", 'serif']
      },
    },
  },
  plugins: [],
};

