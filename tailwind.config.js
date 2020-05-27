module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        darkGray: {
          "900": "#202225",
          "850": "#292b2f",
          "800": "#2f3136",
          "750": "#32353b",
          "700": "#36393f",
          "600": "#3e4249",
          "650": "rgba(114,118,125,.3)",
          "550": "#6D747D",
          "500": "#5b5d61",
          "400": "#a8aaad",
          "300": "#bebfbf",
          "200": "#c1c1c1",
          "150": "#DCDDDE",
          "100": "#fcfcfd"
        },
        accent: {
          "1000": "#C04D15",
          "900": "#FF671B",
          "800": "#FF7935",
          "700": "#FF8A4F",
          "600": "#FF9C69",
          "500": "#FFAD83",
          "400": "#FFBF9D",
          "300": "#FFD0B7",
          "200": "#FFE1D1",
          "100": "#FFF2EB"
        }
      },
      borderRadius: {
        lgg: "1.15rem"
      },
      minWidth: {
        "740": "740px"
      },
      width: {
        "100px": "100px",
        "20px": "20px",

        "15px": "15px",

        "4/7": "57%"
      },
      height: {
        "100px": "100px",
        "20px": "20px",

        "15px": "15px",
        "1/2": "0.13rem",
        "1px": "1px"
      },
      padding: {
        "1.15": "0.35rem",
        "18": "4.5rem"
      }
    }
  },
  variants: {
    borderRadius: ["hover"],
    backgroundColor: ["hover", "focus", "active"],
    textColor: ["hover", "focus", "active"],
    outline: ["focus", "hover"]
  },
  plugins: []
};
