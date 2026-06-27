/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1D4ED8",
        },
        secondary: {
          DEFAULT: "#7C3AED",
          light: "#8B5CF6",
          dark: "#6D28D9",
        },
        accent: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          dark: "#0891B2",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        surface: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          blue: "#EFF6FF",
          indigo: "#EEF2FF",
          violet: "#F5F3FF",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(37, 99, 235, 0.10)",
        card: "0 4px 24px -2px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 12px 40px -4px rgba(37, 99, 235, 0.18)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
        "gradient-accent": "linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)",
        "gradient-hero": "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 50%, #EEF2FF 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
