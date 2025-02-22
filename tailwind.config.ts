import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "color-pulse": "color-pulse 3s infinite ease-in-out",
      },
      keyframes: {
        "color-pulse": {
          "0%": { backgroundColor: "#3c3c58" },
          "50%": { backgroundColor: "#52526b" },
          "100%": { backgroundColor: "#3c3c58" },
        },
      },
      colors: {
        "primary-dark": "#272845",
        "primary-card": "#3c3c58",
        "primary-card-hover": "#69687f",
        "primary-btn": "#0e9a83",
        "primary-btn-hover": "#5cb19d",
        "primary-border": "#69687f",
        "secondary-dark": "#29334b",
        "secondary-card": "#3e475d",
        "secondary-card-hover": "#6b7183",
        "secondary-border": "#6b7183",
      },
      fontFamily: {
        ranchers: ["Ranchers", "normal"],
        outfit: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
