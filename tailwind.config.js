/** @type {import('tailwindcss').Config} */
import daisy from "daisyui";

export default {
  plugins: [daisy],
  theme: {
    extend: {},
  },
  purge: ["./index.html", "./src/**/*.{svelte,js,ts}"], //for unused css
  variants: {
    extend: {},
  },
  darkmode: false, // or 'media' or 'class'
};
