module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        darkGray: {
          "900": "#202225",
          "850": "#292b2f",
          "800": "#2f3136",
          "700": "#36393f",
          "600": "#3e4249",
          "650": "rgba(114,118,125,.3)",
          "500": "#5b5d61",
          "400": "#a8aaad",
          "300": "#bebfbf",
          "200": "#c1c1c1",
          "100": "#fcfcfd"
        },
        accent: {
          "900": "#75d26f"
        }
      },
      borderRadius: {
        lgg: "1.15rem"
      },
      minWidth: {
        "740": "740px"
      },
      width: {
        "100px": "100px"
      },
      height: {
        "100px": "100px"
      }
    }
  },
  variants: {
    borderRadius: ["hover"],
    outline: ["focus", "hover"]
  },
  plugins: []
};
