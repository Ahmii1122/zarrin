/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
      colors: {
        primary: "#7C4EE4",
        tblack: "#333333",
        tgray: "#666666",
        tgray2: "#999999",
        tgray3: "#BBBBBB",
      },
      maxWidth: {
        contained: "1440px",
      },
    },
  },
  plugins: [],
};
