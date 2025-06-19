/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#8b5cf6",
        accent: "#22d3ee",
        muted: "#f1f5f9",
        dark: "#0f172a",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"], // Updated font
      },
      animation: {
        blob: "blob 7s infinite",
        typingDot: "typingDot 1s infinite ease-in-out",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        typingDot: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.3" },
          "50%": { transform: "translateY(-6px)", opacity: "1" },
        },
      },
      screens: {
        "2xl": "1440px", // For large PCs/desktops
        xl: "1280px", // For mid-size screens
        lg: "1024px",
        md: "768px",
        sm: "640px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
