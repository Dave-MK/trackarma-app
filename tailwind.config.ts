import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#14B8A6",
          magenta: "#D946EF",
          bg: "#0B0F14",
          card: "#121821"
        }
      },
      boxShadow: {
        halo: "0 20px 60px rgba(20, 184, 166, 0.14)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
