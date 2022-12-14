import { constants } from "../../config";

const theme = {
  input: "theme",
  arguments: [
    "light",
    "dark",
    "monokai",
    "one-dark",
    "matrix",
    "high-contrast",
    "red",
    "abyss",
    "github",
  ],
  output: {
    light: [
      null,
      "changing theme to Light Mode...",
      "avert your eyes...",
      "theme has been changed to Light Mode",
      null,
      constants.COMMAND_PREFIX,
    ],
    dark: [
      null,
      "changing theme to Dark Mode...",
      "theme has been changed to Dark Mode",
      null,
      constants.COMMAND_PREFIX,
    ],
    monokai: [
      null,
      "changing theme to Monokai...",
      "theme has been changed to Monokai",
      null,
      constants.COMMAND_PREFIX,
    ],
    "one-dark": [
      null,
      "changing theme to Atom One Dark...",
      "theme has been changed to Atom One Dark",
      null,
      constants.COMMAND_PREFIX,
    ],
    matrix: [
      null,
      "changing theme to the Matrix...",
      "theme has been changed to the Matrix",
      null,
      constants.COMMAND_PREFIX,
    ],
    "high-contrast": [
      null,
      "changing theme to High Contrast...",
      "theme has been changed to High Contrast",
      null,
      constants.COMMAND_PREFIX,
    ],
    red: [
      null,
      "changing theme to Red...",
      null,
      "theme has been changed to Red",
      null,
      constants.COMMAND_PREFIX,
    ],
    abyss: [
      null,
      "changing theme to the Abyss...",
      "Theme has been changed to the Abyss",
      null,
      constants.COMMAND_PREFIX,
    ],
    github: [
      null,
      "changing theme to Github...",
      "theme has been changed to Github",
      null,
      constants.COMMAND_PREFIX,
    ],
  },
  effect: "CHANGE_THEME",
  error: [
    null,
    "You must provide a valid argument:",
    null,
    `theme --light`,
    null,
    "available colors:",
    "light, dark, monokai, one-dark, matrix, high-contrast, red, abyss, github",
    null,
    constants.COMMAND_PREFIX,
  ],
};

export { theme };
