const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      minHeight:{
        "override": "0px"
      },
    },
  },
  plugins: [
    flowbite.plugin(),require('tailwind-scrollbar')
  ],
}