import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta premium: blanco, gris, negro suave, beige, marrón, cobre/dorado sutil
        ink: {
          DEFAULT: "#1a1816",
          soft: "#2a2724",
          muted: "#6b6660",
        },
        sand: {
          50: "#fbfaf8",
          100: "#f5f2ed",
          200: "#ece6dc",
          300: "#ddd3c4",
        },
        copper: {
          DEFAULT: "#b08d57",
          light: "#c9a877",
          dark: "#8a6d3f",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(26, 24, 22, 0.12)",
        card: "0 18px 50px -20px rgba(26, 24, 22, 0.20)",
        glow: "0 0 0 1px rgba(176, 141, 87, 0.18), 0 24px 60px -24px rgba(176, 141, 87, 0.35)",
      },
      backgroundImage: {
        "copper-line":
          "linear-gradient(90deg, transparent, rgba(176,141,87,0.6), transparent)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
