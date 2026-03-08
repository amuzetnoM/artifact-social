import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#08080D",
          surface: "#0D0D14",
          elevated: "#111119",
        },
        border: {
          DEFAULT: "#1A1A26",
          hover: "#2C2C40",
        },
        primary: {
          DEFAULT: "#C9A96E",
          dim: "#A07848",
          hover: "#DFBF88",
          glow: "rgba(201,169,110,0.12)",
        },
        steel: {
          DEFAULT: "#7EB8D4",
          dim: "#5A8FA8",
        },
        text: {
          DEFAULT: "#E8E4DF",
          2: "#B8B4AE",
          3: "#7A7670",
          4: "#48453F",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "fade-up":    "fade-up 0.4s ease-out",
        "fade-in":    "fade-in 0.3s ease-out",
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
