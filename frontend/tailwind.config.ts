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
        brand: {
          blue: "#2563EB",
          navy: "#0F172A",
          green: "#10B981",
          white: "#FFFFFF",
          slateLight: "#F8FAFC",
          borderLight: "#F1F5F9",
          mutedText: "#64748B",
          darkText: "#334155"
        }
      },
      fontFamily: {
        heading: ["Poppins", "-apple-system", "sans-serif"],
        sans: ["Inter", "-apple-system", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
