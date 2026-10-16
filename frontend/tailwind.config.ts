import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F0F4F8", // Soft crisp ice light background from palette
        paper: "#FFFFFF", // High-contrast clean card background
        ink: "#0B172A", // Deep midnight navy ink for borders, dark cards & text
        orange: "#2D8CF0", // Vibrant electric blue from palette (primary accent)
        yellow: "#A1D5F5", // Ice sky blue from palette (secondary vibrant accent)
        royal: "#1A4A8E", // Deep royal blue from palette
        slateDark: "#4A5970", // Slate steel from palette
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Arial Black", "sans-serif"],
        body: ["var(--font-grotesk)", "Inter", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        neo: "4px 4px 0 0 #0B172A",
        "neo-md": "5px 5px 0 0 #0B172A",
        "neo-lg": "7px 7px 0 0 #0B172A",
        "neo-orange": "5px 5px 0 0 #2D8CF0",
        "neo-yellow": "5px 5px 0 0 #A1D5F5",
        "neo-royal": "5px 5px 0 0 #1A4A8E",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rot: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "hero-in": {
          "0%": { opacity: "0", transform: "translateY(0.35em)" },
          "100%": { opacity: "1", transform: "none" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        rot: "rot 14s linear infinite",
        float: "float 4.5s ease-in-out infinite",
        "hero-in": "hero-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
