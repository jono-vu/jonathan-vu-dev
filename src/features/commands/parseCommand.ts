import { changeTheme } from "../../storage";
import {
  code,
  contact,
  credits,
  cv,
  friend,
  help,
  kill,
  portfolio,
  repo,
  theme,
  noMatch,
} from "../commands";

const commands: Command[] = [
  code,
  contact,
  credits,
  cv,
  help,
  kill,
  friend,
  portfolio,
  repo,
  theme,
];

type OutputBlocks = Array<string | null>;

interface Command {
  input: string;
  output: OutputBlocks | any;

  effect?: string;
  arguments?: OutputBlocks;
  error?: OutputBlocks;
}

function parseCommand(input: string) {
  const command = commands.find((command) => input.startsWith(command.input));

  if (!command) {
    return noMatch.output;
  }

  if (!command.arguments) {
    parseEffect(command.effect);
    return command.output;
  }

  const argument = parseCommandArgument(input);
  const commandArgument = command.arguments.find((item) => item === argument);

  if (!commandArgument) {
    return command.error;
  }

  parseEffect(command.effect, commandArgument);
  return command.output[commandArgument];
}

export { parseCommand };

function parseCommandArgument(input: string) {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [command, argument] = input.split(" --");
  return argument;
}

function parseEffect(effect?: string, commandArgument?: string) {
  switch (effect) {
    case "KILL":
      setInterval(() => {
        window.location.reload();
      }, 2000);
      break;
    case "CHANGE_THEME":
      setTimeout(() => {
        changeTheme(commandArgument || "dark");
      }, 1000);
      break;
    default:
      return;
  }
}
