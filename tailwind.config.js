const konstaConfig = require("konsta/config");

// wrap your config with konstaConfig
module.exports = konstaConfig({
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
