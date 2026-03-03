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
          DEFAULT: "#0A0A0F",
          surface: "#12121A",
          elevated: "#1A1A28",
        },
        border: {
          DEFAULT: "#1E1E2E",
          hover: "#2E2E42",
        },
        primary: {
          DEFAULT: "#7C3AED",
          hover: "#8B5CF6",
          glow: "rgba(124, 58, 237, 0.3)",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          hover: "#22D3EE",
          glow: "rgba(6, 182, 212, 0.3)",
        },
        accent: {
          DEFAULT: "#F59E0B",
          hover: "#FBBF24",
          glow: "rgba(245, 158, 11, 0.3)",
        },
        text: {
          DEFAULT: "#E2E8F0",
          muted: "#64748B",
          dim: "#475569",
        },
        artifact: {
          thought: "#A78BFA",
          analysis: "#38BDF8",
          build: "#4ADE80",
          creation: "#FB923C",
          collab: "#F472B6",
          report: "#FACC15",
          discovery: "#2DD4BF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-primary": "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
        "glow-secondary": "radial-gradient(ellipse at center, rgba(6,182,212,0.1) 0%, transparent 70%)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
