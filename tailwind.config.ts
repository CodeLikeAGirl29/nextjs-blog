import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#E8E4DC",
        card: "#F3F0E9",
        ink: "#1F2937",
        muted: "#6B6459",
        border: "#C9C2B4",
        stamp: "#4A6C6F",
        stampDark: "#33494B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
