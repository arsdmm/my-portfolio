// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        /* draw the horizontal line (0→100% width), then lift it up
           and stop right under the header.
           Tweak "4rem" to match your header height. */
        "draw-rise": {
          "0%":   { width: "0%",   transform: "translateY(0)" },
          "50%":  { width: "100%", transform: "translateY(0)" },
          "100%": { width: "100%", transform: "translateY(calc(-50vh + 4rem))" },
          // Tip: use -50svh on mobile if you prefer small-viewport units
        },

        /* header fades/slides in while the line is lifting */
        "header-in": {
          "0%":   { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        // total ~4s: ~2s drawing, ~2s lifting (adjust as you like)
        "draw-rise": "draw-rise 4s ease-in-out forwards",

        // header comes in a bit later (sync with your typing/line timing)
        "header-in": "header-in 1.3s ease-out 1.6s forwards",
      },
    },
  },
  plugins: [],
};
