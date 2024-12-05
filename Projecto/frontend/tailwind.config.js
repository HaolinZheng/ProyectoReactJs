/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  ttheme: {
    extend: {
      colors: {
        'primary': "#3260F4",
        'secondary': "#112051",
        "gray-primary": "#EDF1F2",
        "gray-darker": "#D9D9D9",
        "yellow-primary": "#FDE047",
        "red-danger": "#EB5659",
        "red-primary": "#FFA5A5",
        "green-primary": "#86EFAC",
        "yellow-disable": "#FCEFA8",
        "red-disable": "#FFD5D5",
        "green-disable": "#C3F8D6",
      },
    },
  },
  plugins: [],
};
