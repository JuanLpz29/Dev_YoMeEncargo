/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        myGray: "#1E293B", //gris oscuro del navbar, etc.
        myColor: "#43a6e8", // color botones y letritas del logo
        offCyan: "#c7e5ed", //light cyan background
        myHover: "#2e7bb0", //hover color
      },
      backgroundImage: {
        "close-menu": "url('/img/icon-close.svg')",
        "open-menu": "url('/img/icon-hamburger.svg')",
        "logo-pattern": "url('/img/login.jpeg')",
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "html, body": {
          margin: "0",
          padding: "0",
          width: "100%",
          height: "100%",
        },
        "#root": {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          "@media (max-width: 768px)": {
            flexDirection: "column",
          },
        },
      });
    },
  ],
  variants: {
    extend: {
      display: ["print"],
    },
  },
};
