import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      animation: {
        "color-pulse": "color-pulse 3s infinite ease-in-out"
      },
      keyframes: {
        "color-pulse": {
          "0%": { backgroundColor: "#5d4bff40" },
          "50%": { backgroundColor: "#5d4bff60" },
          "100%": { backgroundColor: "#5d4bff40" }
        }
      },
      colors: {
        "primary-brand": "#5d4bff",
        "primary-accent": "#5d4bffb2",
        "secondary-accent": "#eeecfe",
        "primary-card": "#b8b8b8",
        "secondary-card": "#7a7a7a"
      },
      fontFamily: {
        aeonik: ["var(--font-aeonik)"],
        ppneuebit: ["var(--font-ppneuebit)"]
      }
    }
  },
  plugins: []
} satisfies Config;
