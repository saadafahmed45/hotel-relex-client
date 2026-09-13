/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF8F5",
          50: "#FDFCFB",
          100: "#FAF8F5",
          200: "#F4F0E8",
          300: "#ECE5D8",
          dark: "#F2EDE4",
        },
        stone: {
          50: "#F9F8F6",
          100: "#F2EFEA",
          200: "#E7E2D8",
          300: "#DDD6C9",
          400: "#C4BCAC",
          500: "#9E9584",
          border: "#E4DED4",
        },
        charcoal: {
          DEFAULT: "#121316",
          50: "#2B2D33",
          100: "#222327",
          900: "#121316",
          950: "#0B0C0E",
          muted: "#66635F",
        },
        gold: {
          DEFAULT: "#C5A880",
          light: "#DFCABA",
          dark: "#A5865E",
          accent: "#D4AF37",
          subtle: "#F4EEE6",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}