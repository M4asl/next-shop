const light = {
  bg: {
    body: "#FFF",
    background: "#FFF",
    colorBorder: "#0E141B",
  },
  text: {
    primary: "#0E141B",
    secondary: "#0085FF",
  },
  information: {
    success: "#00BA34",
    warning: "#F98600",
    dangerous: "#E92C2C",
  },
};

const dark = {
  bg: {
    body: "#0E141B",
    colorBorder: "#FFF",
    background: "#0E141B",
  },
  text: {
    primary: "#ffffff",
    secondary: "#168FFF",
  },
  information: {
    success: "#17CB49",
    warning: "#FF9F2D",
    dangerous: "#F74141",
  },
};

const defaultTheme = {
  // Temp fonts
  fonts: {
    title: "Montserrat, sans-serif",
    main: "Montserrat, sans-serif",
  },

  // Breakpoints for responsive design
  breakpoints: {
    xs: "screen and (max-width: 480px)",
    sm: "screen and (max-width: 768px)",
    md: "screen and (max-width: 1024px)",
    lg: "screen and (max-width: 1280px)",
    xl: "screen and (max-width: 1599px)",
  },
};

export const lightTheme = { ...defaultTheme, ...light };
export const darkTheme = { ...defaultTheme, ...dark };
