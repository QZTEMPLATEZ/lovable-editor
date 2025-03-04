import type { Config } from "tailwindcss";
import { colors } from "./src/theme/colors";
import { animations } from "./src/theme/animations";

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
      fontFamily: {
        artistic: ["Great Vibes", "cursive"],
        cinzel: ["Cinzel", "serif"],
        italiana: ["Italiana", "serif"],
      },
      colors,
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      ...animations,
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;