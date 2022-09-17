import { constants } from "../../config";

const noMatch = {
  input: "*",
  output: [
    null,
    "!UNRECOGNISED COMMAND!",
    "type `help` for more commands",
    null,
    constants.COMMAND_PREFIX,
  ],
};

export { noMatch };
