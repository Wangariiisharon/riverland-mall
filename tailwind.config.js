// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#D6A829",
      },
      backgroundImage: {
        "hero-bg": "url(/hero-bg.jpg)",
        // Add more custom background images here
      },
      fontFamily: {
        sans: ["Source Sans 3", "sans-serif"],
      },
    },
  },
  plugins: [],
};
