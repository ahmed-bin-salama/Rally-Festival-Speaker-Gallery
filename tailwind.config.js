/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rally: {
          maroon: "#6B021B",
          darkMaroon: "#4A0112",
          burgundy: "#800020",
          gold: "#D4AF37",
          dark: "#111827",
          cardDark: "#1F2937",
          lightBg: "#F9FAFB",
          accentBg: "#F3F4F6",
          textMuted: "#6B7280"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
