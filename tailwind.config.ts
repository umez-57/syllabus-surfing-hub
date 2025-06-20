import type { Config } from "tailwindcss";

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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        // Neo-Brutalism Monster Colors
        monster: {
          green: "#F9DFC6",
          dark: "#0a0a0a",
          gray: "#1a1a1a",
          white: "#F5F5F5",
          silver: "#c0c0c0",
          black: "#000000",
          accent: "#EC4899",
          purple: "#A855F7",
          cyan: "#06B6D4",
          red: "#DC2626",
          emerald: "#10B981",
          yellow: "#FACC15",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Space Grotesk", "serif"],
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
        // Neo-Brutalism animations
        "neo-float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(5deg)",
          },
        },
        "neo-drift": {
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
        "neo-bounce": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        "neo-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
        "neo-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 20px #F9DFC6",
          },
          "50%": {
            "box-shadow": "0 0 40px #F9DFC6, 0 0 60px #F9DFC6",
          },
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
        flip: {
          "0%, 50%": {
            transform: "rotateY(0deg)",
          },
          "51%, 100%": {
            transform: "rotateY(180deg)",
          },
        },
        rotate: {
          "0%": {
            transform: "rotate(0deg) scale(1)",
          },
          "50%": {
            transform: "rotate(180deg) scale(1.2)",
          },
          "100%": {
            transform: "rotate(360deg) scale(1)",
          },
        },
        "meteor": {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        "shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Neo-Brutalism animations
        "neo-float": "neo-float 8s ease-in-out infinite",
        "neo-drift": "neo-drift 12s linear infinite",
        "neo-bounce": "neo-bounce 2s ease-in-out infinite",
        "neo-pulse": "neo-pulse 2s ease-in-out infinite",
        "neo-glow": "neo-glow 2s ease-in-out infinite",
        "star-movement-bottom": "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
        "meteor-effect": "meteor 5s linear infinite",
        "shimmer-slide": "shimmer-slide var(--speed) ease-in-out infinite alternate",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
      },
      backgroundImage: {
        "grid-pattern": "url('/grid-pattern.svg')",
        "grid-pattern-light": "url('/grid-pattern-light.svg')",
        "neo-gradient": "linear-gradient(-45deg, #F9DFC6, #EC4899, #A855F7, #06B6D4)",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;