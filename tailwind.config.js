/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /*
         * RIMIS CROCHET palette — "Nature-Distilled / organic-earthy editorial".
         * Warm paper instead of pure white, walnut instead of black, and a
         * firing terracotta accent with sage + honey supporting tones.
         */
        cream: {
          50: '#FBF7F0', // warm paper
          100: '#F6EEE1',
          200: '#EDE0CD',
          300: '#E0CDB2',
        },
        clay: {
          DEFAULT: '#D3BC9E',
          100: '#EFE4D3',
          200: '#E0CDB3',
          300: '#C6A985',
        },
        terracotta: {
          DEFAULT: '#BC5B2C', // richer fired-clay accent
          light: '#D67F4E',
          dark: '#93421C',
          soft: '#F3DCC9',
        },
        sage: {
          DEFAULT: '#77856A',
          light: '#A5B294',
          dark: '#59654B',
          soft: '#E3E8DB',
        },
        moss: {
          DEFAULT: '#55613F',
          dark: '#3F4A2E',
        },
        blush: {
          DEFAULT: '#D49E90',
          light: '#F0D8D0',
        },
        honey: {
          DEFAULT: '#C2892B',
          light: '#DFB35C',
          dark: '#9A6A1C',
        },
        wheat: {
          DEFAULT: '#E3C79C',
          light: '#F1E0C2',
        },
        ink: {
          DEFAULT: '#2A2119', // warm walnut
          soft: '#544739',
          muted: '#8A7A69',
          faint: '#B9A995',
        },
      },
      fontFamily: {
        // Jost first, with Bengali + Devanagari fallbacks so multilingual
        // text renders beautifully without extra wiring.
        sans: ['Jost', 'Hind Siliguri', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Hind Siliguri', 'Noto Sans Devanagari', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 18px 45px -25px rgba(42, 33, 25, 0.35)',
        card: '0 26px 60px -30px rgba(42, 33, 25, 0.42)',
        lift: '0 34px 80px -38px rgba(42, 33, 25, 0.5)',
        glow: '0 0 0 1px rgba(188, 91, 44, 0.16), 0 22px 44px -24px rgba(188, 91, 44, 0.48)',
        sageglow: '0 0 0 1px rgba(119, 133, 106, 0.18), 0 22px 44px -26px rgba(119, 133, 106, 0.45)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        400: '400ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '100%': { transform: 'translate3d(36px, -28px, 0) scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'grow-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 32s linear infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        drift: 'drift 20s ease-in-out infinite alternate',
        'drift-reverse': 'drift 28s ease-in-out infinite alternate-reverse',
        shimmer: 'shimmer 7s linear infinite',
      },
    },
  },
  plugins: [],
}
