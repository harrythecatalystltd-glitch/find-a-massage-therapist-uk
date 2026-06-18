import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#34005f", container: "#4b1e78", dark: "#431b6b" },
        "on-primary-container": "#ba8beb",
        secondary: { DEFAULT: "#6b5583", container: "#e4caff" },
        "on-secondary-container": "#685280",
        "brand-accent": "#BFA6D9",
        background: "#f9f9f9",
        surface: {
          DEFAULT: "#f9f9f9",
          "container-lowest": "#ffffff",
          "container-low": "#f3f3f3",
          container: "#eeeeee",
          "container-high": "#e8e8e8",
          "container-highest": "#e2e2e2",
          dim: "#dadada",
        },
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#4b4450",
        outline: { DEFAULT: "#7c7481", variant: "#cdc3d2" },
        tertiary: { DEFAULT: "#212125", container: "#36363a" },
        error: { DEFAULT: "#ba1a1a", container: "#ffdad6" },
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        base: "8px",
        gutter: "24px",
        "section-gap": "80px",
        "margin-desktop": "40px",
        "margin-mobile": "16px",
        "container-max": "1200px",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
