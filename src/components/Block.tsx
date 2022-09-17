import React, { useEffect, useRef, useState } from "react";
import useKeypress from "react-use-keypress";

import { Blinker, Box, BoxProps } from "../components";
import { constants } from "../config";

const ALPHANUMERIC_CHAR_ARRAY =
  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split("");

interface BlockProps extends BoxProps {
  children: React.ReactNode;
  showBlinker?: boolean;
  onCommand?: (input: string) => void;
}

const Block: React.FC<BlockProps> = ({
  children,
  showBlinker,
  onCommand,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box
        display="inline"
        color={isCommandInput(children) ? "tertiary" : "inherit"}
        style={{ whiteSpace: "pre-wrap", wordBreak: "inherit" }}
      >
        {resolveEmptyChildren(children)}
      </Box>
      {showBlinker && (
        <CommandBlock
          onCommand={(input) => {
            onCommand?.(input);
          }}
        />
      )}
    </Box>
  );
};

export { Block };
export type { BlockProps };

function resolveEmptyChildren(children: React.ReactNode) {
  if (children === ` `)
    return (
      <Box>
        {" "}
        <br />
      </Box>
    );
  return children;
}

function isCommandInput(children: React.ReactNode) {
  if (
    typeof children === `string` &&
    children.startsWith(constants.COMMAND_PREFIX)
  ) {
    return true;
  }
  return false;
}

interface CommandBlockProps {
  onCommand: (input: string) => void;
}

const CommandBlock: React.FC<CommandBlockProps> = ({ onCommand }) => {
  const [commandInput, setCommandInput] = useState<string>("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useKeypress(ALPHANUMERIC_CHAR_ARRAY, (e) => {
    if (
      e.getModifierState("Control") ||
      e.getModifierState("Meta") ||
      e.getModifierState("Alt") ||
      e.getModifierState("AltGraph")
    ) {
      return;
    }

    inputRef.current?.focus();
  });

  return (
    <form
      style={{ display: "inline", position: "relative" }}
      onSubmit={(e) => {
        e.preventDefault();

        onCommand(commandInput);
      }}
    >
      <input
        ref={inputRef}
        style={{
          all: "unset",
          width: 0,
          position: "absolute",
          top: "100px",
        }}
        value={commandInput}
        onChange={(e) => {
          e.preventDefault();

          setCommandInput(e.target.value);
        }}
      />{" "}
      {commandInput}
      <Blinker />
    </form>
  );
};
