import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}", // Ensure our new 'ui' folder is scanned!
  ],
  theme: {
    extend: {
      colors: {
        // VertexWeb Brand Palette
        background: "#050505", // Deepest black
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#0070f3", // Electric Blue
          foreground: "#FFFFFF",
        },
        secondary: "#111111", // Soft black for cards
        accent: "#7928CA",    // Cyber Purple
        muted: "#888888",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "slow-fade": "fadeIn 1.5s ease-in-out",
        "spotlight": "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;