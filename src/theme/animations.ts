export const animations = {
  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    gradient: {
      "0%, 100%": {
        backgroundPosition: "0% 50%",
      },
      "50%": {
        backgroundPosition: "100% 50%",
      },
    },
    "glow-pulse": {
      "0%, 100%": {
        opacity: "1",
      },
      "50%": {
        opacity: "0.5",
      },
    },
    "float": {
      "0%, 100%": {
        transform: "translateY(0)",
      },
      "50%": {
        transform: "translateY(-10px)",
      },
    },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    "gradient": "gradient 15s ease infinite",
    "glow-pulse": "glow-pulse 2s ease-in-out infinite",
    "float": "float 3s ease-in-out infinite",
  },
};