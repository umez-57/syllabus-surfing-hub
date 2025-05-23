
import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ea384c",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ffffff",
          foreground: "#ea384c",
        },
        accent: {
          DEFAULT: "#ffe600",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Galaxy theme colors
        galaxy: {
          dark: "#0d0b26",
          purple: "#311b92",
          cyan: "#00d4ff",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        galaxyShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(180deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(30px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px #ffe600" },
          "50%": { boxShadow: "0 0 40px #ffe600, 0 0 60px #ffe600" },
        },
        staggerFadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "star-movement-bottom": {
          "0%": {
            transform: "translate(0%, 0%)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-100%, 0%)",
            opacity: "0",
          },
        },
        "star-movement-top": {
          "0%": {
            transform: "translate(0%, 0%)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(100%, 0%)",
            opacity: "0",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        galaxyShift: "galaxyShift 20s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        staggerFadeIn: "staggerFadeIn 0.6s ease-out forwards",
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
      },
      backgroundImage: {
        "grid-pattern": "url('/grid-pattern.svg')",
        "grid-pattern-light": "url('/grid-pattern-light.svg')",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
