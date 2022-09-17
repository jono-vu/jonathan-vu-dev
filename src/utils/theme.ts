const THEMES = {
  default: {
    colors: {
      text: "#E8E8E8",
      bg: "#222",
      secondary: "#4B4B4B",
      tertiary: "#E8E8E8",
    },
  },
  light: {
    colors: {
      text: "#222",
      bg: "#E8E8E8",
      secondary: "#4B4B4B",
      tertiary: "#222",
    },
  },
  dark: {
    colors: {
      text: "#E8E8E8",
      bg: "#222",
      secondary: "#4B4B4B",
      tertiary: "#E8E8E8",
    },
  },
  monokai: {
    colors: {
      text: "#66D9EF",
      bg: "#272822",
      secondary: "#F92672",
      tertiary: "#A6E22E",
    },
  },
  "one-dark": {
    colors: {
      text: "#E06C75",
      bg: "#282C34",
      secondary: "#98C379",
      tertiary: "#E5C07B",
    },
  },
  matrix: {
    colors: {
      text: "#22B455",
      bg: "#020204",
      secondary: "#204829",
      tertiary: "#92E5A1",
    },
  },
  "high-contrast": {
    colors: {
      text: "white",
      bg: "black",
      secondary: "yellow",
      tertiary: "white",
    },
  },
  red: {
    colors: {
      text: "#9C162E",
      bg: "#1C162E",
      secondary: "#3C162E",
      tertiary: "#5C162E",
    },
  },
  abyss: {
    colors: {
      text: "#6688cc",
      bg: "#000c18",
      secondary: "#ddbb88",
      tertiary: "#770811",
    },
  },
  github: {
    colors: {
      text: "#4078c0",
      bg: "#fafafa",
      secondary: "#6e5494",
      tertiary: "#6cc644",
    },
  },
};

const theme = getTheme();

function getTheme() {
  const localStorageTheme = window.localStorage.getItem("theme") as
    | keyof typeof THEMES
    | string
    | null;

  if (!localStorageTheme) return THEMES["default"];

  const theme = THEMES[localStorageTheme as keyof typeof THEMES];

  if (!theme) return THEMES["default"];

  return theme;
}

export { theme, getTheme };
