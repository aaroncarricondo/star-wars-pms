import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  navbarHeight: "48px",
  spacing: {
    none: "0",
    extraSmall: "0.25rem",
    small: "0.5rem",
    normal: "1rem",
    large: "2rem",
  },
  border: {
    radius: "16px",
    width: "1px",
  },
  colors: {
    background: "#262626",
    headerBackground: "#434343",
    primary: "rgb(0, 221, 255)",
    highlight: "rgba(0, 221, 255, 0.1)",
    text: "#fafafa",
    error: "#ff0088",
  },
};

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

export const mediaQueries = {
  xs: `(max-width: ${breakpoints.sm - 1}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  xxl: `(min-width: ${breakpoints.xxl}px)`,
};
