import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    main: "#4790FC",
    white: "#FAFAFA",
    black: "#363636",
    lightgray: "#E4E7EC", // disable에 쓰이는 color
    gray: "rgba(0, 0, 0, 0.50)", // 진한 회색 글씨
  },
  fonts: {
    HangeulFontMedium: "HangeulFontMedium",
    HangeulFontRegular: "HangeulFontRegular",
    HangeulFontSemiBold: "HangeulFontSemiBold",
    EnglishFontBold: "EnglishFontBold",
    EnglishFontLight: "EnglishFontLight",
  },
  fontSizes: {
    xsmall: "12px",
    small: "16px",
    medium: "20px",
    mediumlarge: "26px",
    large: "32px",
    xlarge: "40px",
    xxlarge: "48px",
    xxxlarge: "60px",
  },
};
export default theme;
