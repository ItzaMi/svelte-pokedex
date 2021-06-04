module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,svelte}"],
  theme: {},
  variants: {
    extend: {
      inset: ["hover", "group-hover"],
      translate: ["group-hover"],
      fill: ["hover", "focus"],
      animation: ["hover", "focus"],
      cursor: ["hover", "focus"],
    },
  },
};
