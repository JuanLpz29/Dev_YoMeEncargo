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
        myGray: '#1E293B',  //gris oscuro del navbar, etc.
        myColor: '#43a6e8', // color botones y letritas del logo
        offCyan: '#c7e5ed', //light cyan background
      },
      backgroundImage: {
        'close-menu': "url('img/icon-close.svg')",
        'open-menu': "url('img/icon-hamburger.svg')",
        'logo-pattern': "url('src/assets/images/Login.jpeg')",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    extend: {
        display: ['print']
    },
  },
}

