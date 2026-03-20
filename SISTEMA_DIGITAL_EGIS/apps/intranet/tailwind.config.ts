import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        guild: {
          bg: "#0B0F19",
          panel: "#151B2B",
          border: "#2A3655",
          text: "#94A3B8",
          heading: "#F8FAFC",
        },
        quest: {
          new: "#FBBF24", // Amber/Gold
          active: "#3B82F6", // Blue
          complete: "#10B981", // Emerald
          urgent: "#EF4444", // Red
        },
        magic: {
          light: "#818CF8",
          core: "#6366F1",
          dark: "#4338CA",
        }
      },
      fontFamily: {
        hud: ["var(--font-rajdhani)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
