/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
            './pages/**/*.{html,js}',
            './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', //blanco
        secondary: '#1E293B', 
        accent: "#1565C0",
      },
      backgroundImage: {
        'close-menu': "url('img/icon-close.svg')",
        'open-menu': "url('img/icon-hamburger.svg')",
      },
    },
  },
  plugins: [],
}

