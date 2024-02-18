import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "4xs": "280px",
        "3xs": "325px",
        "2xs": "400px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        lg2: "1200px",
        xl: "1280px",
        xxl: "1400px",
        "3xl": "1500px",
        "4xl": "1600px",
        "5xl": "1700px",
        "6xl": "1800px",
        full: "1920px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
