import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EF",
        // "terracotta" now holds a refined bronze. Original brand value: #C4663D (dark #A4512E).
        terracotta: { DEFAULT: "#9C6B43", dark: "#7E5330" },
        champagne: "#E9D5B0",
        blush: "#E8B4A6",
        ink: "#2B2420",
      },
      keyframes: { marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } } },
      animation: { marquee: "marquee 45s linear infinite" },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
