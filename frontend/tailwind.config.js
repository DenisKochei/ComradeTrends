const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/index.css",
    flowbite.content(),
  ],
  safelist: ["font-bold", "font-serif", "font-extrabold", "!font-[700]"],
  theme: {
    extend: {
      minHeight: {
        override: "0px",
      },
      minWidth: {
        "5xl:": "1500px",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
