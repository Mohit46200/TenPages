/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // A used-bookshop palette: aged paper, forest-green cloth binding,
        // oxblood leather accent and a brass foil highlight.
        paper: {
          DEFAULT: "#EDE6D3",
          light: "#F7F2E4",
          dark: "#DED2B3",
        },
        ink: {
          DEFAULT: "#231F1A",
          soft: "#4A443B",
        },
        forest: {
          DEFAULT: "#28433A",
          light: "#39594C",
          dark: "#182A24",
        },
        oxblood: {
          DEFAULT: "#7C2A2A",
          light: "#9C3B34",
          dark: "#571C1C",
        },
        brass: {
          DEFAULT: "#B7883A",
          light: "#D2A657",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
