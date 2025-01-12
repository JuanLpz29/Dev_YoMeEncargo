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
        myGray: '#1E293B',
        myColor: '#43a6e8',
        offCyan: '#c7e5ed',
        myHover: '#2e7bb0',
      },
      backgroundImage: {
        'close-menu': "url('img/icon-close.svg')",
        'open-menu': "url('img/icon-hamburger.svg')",
        'logo-pattern': "url('src/assets/images/Login.jpeg')",
      },
    },
  },
  plugins: [
    import('tailwind-scrollbar'),
    function ({ addBase }) {
      addBase({
        'html, body': {
          margin: '0',
          padding: '0',
          width: '100%',
          height: '100%',
        },
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
          },
        },
      });
    },
  ],
  variants: {
    extend: {
        display: ['print']
    },
  },
}