import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#000000e6",
        backgroundWhite: "#fff9",
        textBlack: "#1c1e21",
        peacock: "#31748f",
        fadegreen: "#9cd8a0",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: [
          "Helvetica",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addVariant }) {
      addVariant("weeb", ".weeb &");
    }),
  ],
};
