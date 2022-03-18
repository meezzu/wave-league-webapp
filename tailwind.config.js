module.exports = {
  mode: "jit",
  tailwindcss: {
    viewer: true,
  },
  darkMode: false,
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000022",
        secondary: "#EA7F1F",
        white: "#FFFFFF",
        black: "#000000",
        black1: "#0A0A0A",
        black2: "#1D1D1D",
        grey1: " #333333",
        grey3: "#828282",
        grey4:"#BDBDBD",
        grey5: "#F8F8F8",
      },
    },
  },
  plugins: [],
};
