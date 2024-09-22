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
        primary: '#8c8c8c',
        secondary: '#1E293B',
        accent: "#1565C0",
      },
    },
  },
  plugins: [],
}

