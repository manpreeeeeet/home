/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        frieren: "url('/lain.webp')",
      },
      colors: {
        background: "#000000e6",
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
    },
  },
  plugins: [],
};
