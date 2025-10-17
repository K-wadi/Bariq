/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bariq Dark Theme - Premium Colors
        bariq: {
          // Primary red accent
          red: "#E62323",
          "red-hover": "#ff3434",
          // Dark backgrounds
          black: "#0B0B0B",
          "black-lighter": "#121212",
          // Text colors
          white: "#FFFFFF",
          grey: "#9CA3AF",
          "grey-light": "#D1D5DB",
        },
        // Legacy support
        primary: {
          bright: "#E62323",
          DEFAULT: "#E62323",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #E62323, #ff3434)",
        "gradient-diagonal": "linear-gradient(135deg, #E62323, #ff3434)",
        "gradient-radial":
          "radial-gradient(circle, rgba(230,35,35,0.1) 0%, rgba(11,11,11,0) 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "bounce-light": "bounceLight 2s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceLight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(230,35,35,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(230,35,35,0.5)" },
        },
      },
      boxShadow: {
        "red-glow": "0 0 20px rgba(230,35,35,0.3)",
        "red-glow-lg": "0 0 30px rgba(230,35,35,0.5)",
        "dark-card":
          "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
      },
    },
  },
  plugins: [],
};
