/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bariq Red: #E5252A (accent/CTA, headings, highlights)
        primary: {
          bright: '#E5252A',
          sky: '#E5252A',
          clean: '#E5252A',
          ocean: '#E5252A',
          silver: '#FFFFFF',
          dark: '#0A0A0A',
          25: '#F3F4F6',
          50: '#F3F4F6',
        },
        // Jet Black: #0A0A0A (hero-achtergrond, footer, knoppen)
        charcoal: {
          25: '#F3F4F6',
          50: '#F3F4F6',
          100: '#F3F4F6',
          200: '#1F2937',
          300: '#1F2937',
          400: '#1F2937',
          500: '#1F2937',
          600: '#1F2937',
          700: '#1F2937',
          800: '#0A0A0A',
          900: '#0A0A0A',
        },
        // Pure White: #FFFFFF (tekst op donkere vlakken, cards)
        // Steel Grey: #1F2937 (body-tekst op licht, iconen)
        // Light Grey: #F3F4F6 (sectie-achtergrond, borders)
        text: {
          body: '#1F2937',
          muted: '#1F2937',
        },
        // Custom dark theme colors
        dark: {
          bg: '#0A0A0A',
          card: '#FFFFFF',
          text: '#FFFFFF',
          textSecondary: '#1F2937',
          border: '#F3F4F6',
          accent: '#E5252A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #E5252A, #E5252A)',
        'gradient-diagonal': 'linear-gradient(135deg, #E5252A, #E5252A)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-light': 'bounceLight 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
};