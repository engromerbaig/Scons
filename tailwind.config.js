/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1025px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend:
     {
      fontFamily: {
        clash: ['manrope Display', 'sans-serif'],
        clashvar: ['manrope Display Variable', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'], // small typo fixed here (you had "san-serif")
        coolvetica: ['Coolvetica', 'Monument Extended', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'], // ✅ Added Manrope properly
      },
      
      colors: {
        // bxlue: '#0b1a79',
        neon: '#28ed70',
        charcoal: '#26292D',
        offWhite:'#F5F5F5',
      neonLight: '#d6dbfb',
        neonLightBg:'#d6dbfb',
        innerBg:"#E5FFF2",
        uniqueBg:'#D9FFEC',

        // green: '#06FF93',
        // neon: '#37B2FF',
        // purple: '#CC5EFF',
        // seaneon: '#00EBEB',
        // grayBg: '#262626',

        grayBg: '#F3F4F6',
        // whiteBg: '#1D1D1D',
        whiteBg: '#FFFFFF',

        // whiteBg: '#00EBEB',
        grayText:'#6D6E70',
        bodyText:'#6D6E70',

        boxBorder: '#FFFFFF40',
      },
      // fixing h-screen and min-h-screen issue for mob
      minHeight: {
        screen: ['100svh', 'calc(var(--vh, 1vh) * 100)'], // Use `100svh` for modern browsers, fallback to `--vh`
      },
      height: {
        screen: ['100svh', 'calc(var(--vh, 1vh) * 100)'], // Use 100svh or fallback to custom variable
      },
      fontSize: {
        '250px': 'clamp(6.5rem, 11vw, 15rem)',

        '230px': 'clamp(6rem, 10.417vw, 14.375rem)',

        '200px': 'clamp(5rem, 10.417vw, 12.5rem)',

        '180px': 'clamp(4.5rem, 9.375vw, 11.25rem)'  ,// 180px

       '125px': 'clamp(3.125rem, 6.51vw, 7.8125rem)',  // 125px
        '120px': 'clamp(3rem, 6.25vw, 7.5rem)', // Responsive size for 120px
        '150px': 'clamp(3.75rem, 7.5vw, 9.375rem)',
'111px': 'clamp(2.75rem, 5.8vw, 6.9375rem)', // Responsive size for 111px

        '100px': 'clamp(2.5rem, 5.2vw, 6.25rem)',

        '90px': 'clamp(2.25rem, 4.6875vw, 5.625rem)',
        '85px': 'clamp(2.125rem, 5vw, 5.3125rem)',
'75px': 'clamp(1.875rem, 3.75vw, 4.6875rem)',

        '65px': 'clamp(1.625rem, 3.25vw, 4.0625rem)',
        '70px': 'clamp(1.75rem, 3.645vw, 4.375rem)',
        '60px': 'clamp(1.5rem, 3.125vw, 3.75rem)',
        '55px': 'clamp(1.375rem, 2.864vw, 3.4375rem)',
        '50px': 'clamp(1.25rem, 2.604vw, 3.125rem)',
        '45px': 'clamp(1.125rem, 2.344vw, 2.8125rem)',

        '40px': 'clamp(1rem, 2.083vw, 2.5rem)',
        '35px': 'clamp(1rem, 1.822vw, 2.1875rem)',
        '34px': 'clamp(1rem, 1.771vw, 2.125rem)',
        '32px': 'clamp(0.9375rem, 1.667vw, 2rem)',

        '30px': 'clamp(0.9375rem, 1.563vw, 1.875rem)',
        '28px': 'clamp(1.125rem, 1.457vw, 1.75rem)',
        '27px': 'clamp(1.125rem, 1.406vw, 1.6875rem)',

        '25px': 'clamp(1rem, 1.302vw, 1.5625rem)',
        '24px': 'clamp(1rem, 1.25vw, 1.5rem)',
        '17px': 'clamp(0.85rem, 0.885vw, 1.0625rem)',
        '10px': 'clamp(0.625rem, 0.625vw, 0.75rem)', // Scales between ~10px and 12px
 // Scales between ~13.6px and 17px // Scales between ~16px and 24px

      },
    },

    animation: {
      marquee: 'marquee 25s linear infinite',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        'html, body': {
          fontFamily: theme('fontFamily.manrope'), // Set default font family
          color: theme('colors.black'),           // Set default text color
          backgroundColor: theme('colors.whiteBg'), // Optional default background color
        },
        ':root': {
          '--color-neon': theme('colors.neon'),
        },
      });
    },
  ],
};
