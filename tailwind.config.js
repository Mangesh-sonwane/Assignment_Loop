/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#dadada',
        bg_1: '#111111',
        bg_2: '#333333',
        bg_3: '#161B22',
        bg_4: '#0E1117',
        bg_5: '#232222',
        bg_6: 'rgb(255, 255, 255, 0.1)',
      },
      borderWidth: {
        // Custom border widths
        1: '0.1px',
      },
    },
  },
  plugins: [],
};
