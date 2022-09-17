import { constants } from "../../config";

const help = {
  input: "help",
  output: [
    null,
    `COMMANDS`,
    `cv             generate link to my Resume / CV`,
    `code           generate link to some of my code`,
    `contact        generate email link`,
    `portfolio      generate link to my design portfolio`,
    `repo           generate link to this site's repository`,
    null,
    `friend --ARG   secret commands that friends have requested`,
    `theme --ARG    change color theme`,
    `credits        resources used to build this site`,
    `kill           stop program`,
    null,
    constants.COMMAND_PREFIX,
  ],
};

export { help };
