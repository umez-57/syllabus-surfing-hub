
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
          DEFAULT: "#fff6",
          foreground: "#ea384c",
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
        // Custom colors for the design system
        galaxy: {
          dark: "#0d0b26",
          purple: "#311b92",
          blue: "#1a237e", 
          cyan: "#00d4ff",
        },
        yellow: {
          accent: "#ffe600",
        }
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
        // Custom animations for the new design
        "galaxy-shift": {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(180deg)",
          },
        },
        "drift": {
          "0%": {
            transform: "translateX(-10px)",
          },
          "50%": {
            transform: "translateX(10px)",
          },
          "100%": {
            transform: "translateX(-10px)",
          },
        },
        "glow": {
          "0%, 100%": {
            "box-shadow": "0 0 20px rgba(255, 230, 0, 0.5)",
          },
          "50%": {
            "box-shadow": "0 0 40px rgba(255, 230, 0, 0.8)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        // Custom animations
        "galaxy-shift": "galaxy-shift 20s ease infinite",
        "float": "float 8s ease-in-out infinite",
        "drift": "drift 12s linear infinite", 
        "glow": "glow 2s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-pattern": "url('/grid-pattern.svg')",
        "grid-pattern-light": "url('/grid-pattern-light.svg')",
        "galaxy-gradient": "linear-gradient(-45deg, #0d0b26, #311b92, #1a237e, #00d4ff)",
      },
      backgroundSize: {
        "400%": "400% 400%",
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
