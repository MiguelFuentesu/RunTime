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
        verde: {
          DEFAULT: "#3D7A5C",
          claro: "#E8F4EE",
          medio: "#6BA888",
          oscuro: "#1E4D38",
          profundo: "#102D21",
        },
        tierra: {
          DEFAULT: "#C17F4A",
          claro: "#F5E6D3",
          medio: "#E0A876",
          oscuro: "#8A5530",
        },
        crema: {
          DEFAULT: "#FAF6F0",
          medio: "#F0E8DC",
          oscuro: "#DDD0BF",
        },
        texto: {
          DEFAULT: "#2C2420",
          suave: "#6B5C52",
          tenue: "#A89088",
        },
        ok: "#2D7A4F",
        alerta: "#C17F4A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 2px 8px rgba(44,36,32,.07)",
        md: "0 6px 24px rgba(44,36,32,.10)",
        lg: "0 16px 48px rgba(44,36,32,.13)",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        xl: "28px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
