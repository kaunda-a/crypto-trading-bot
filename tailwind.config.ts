import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          100: "#E0E7FF", // Light indigo
          200: "#C7D2FE", // Soft indigo
          300: "#A5B4FC", // Mild indigo
          400: "#818CF8", // Indigo
          500: "#6366F1", // Mid indigo
          600: "#4F46E5", // Deeper indigo
          700: "#4338CA", // Dark indigo
          800: "#3730A3", // Very dark indigo
          900: "#312E81", // Deep indigo
          950: "#1E1B4B", // Darkest indigo
        },

        muted: "#F3F4F6",
        danger: "#E53E3E",
        success: "#38A169",
        info: "#3182CE",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
        background: "background-color",
      },
      transitionDuration: {
        DEFAULT: "300ms",
        short: "150ms",
        long: "500ms",
      },
      backgroundImage: {
        "complex-gradient": `radial-gradient(circle farthest-side at 0 100%, theme(colors.theme.300), transparent),
                             radial-gradient(circle farthest-side at 100% 0, theme(colors.theme.500), transparent),
                             radial-gradient(circle farthest-side at 100% 100%, theme(colors.theme.200), transparent),
                             radial-gradient(circle farthest-side at 0 0, theme(colors.theme.400), theme(colors.theme.800))`,
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
