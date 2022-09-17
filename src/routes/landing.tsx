import { useEffect, useState } from "react";

import { trackPageView } from "../analytics";
import { Block, Box, LineBlock, Page, TypingBlock } from "../components";
import { constants } from "../config";
import { parseCommand } from "../features";
import { getPrevSession } from "../storage";
import { getCurrentDateTime, scrollToBottom, useInterval } from "../utils";

trackPageView("/");
getPrevSession();

const Landing = () => {
  const data = LANDING_DATA;

  const [blocks, setBlocks] = useState<Array<string | null>>([]);
  const [blockQueue, setBlockQueue] = useState<Array<string | null>>(data);

  const [line, setLine] = useState<number>(0);
  const [isTypingCompleted, setTypingCompleted] = useState<boolean>(false);

  const [borderedIdx, setBorderedIdx] = useState<number | undefined>(undefined);
  const [activeIdx, setActiveIdx] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (line === blockQueue.length) {
      setTypingCompleted(true);
      setActiveIdx(line - 1);
    }
  }, [line, blockQueue.length]);

  useInterval(() => {
    !isTypingCompleted && scrollToBottom();
  }, 100);

  function handleCommand(input: string) {
    if (!input) {
      return;
    }

    function printCommand() {
      let newBlocks = blocks;
      newBlocks[line - 1] = newBlocks[line - 1] + " " + input;

      setBlocks(newBlocks);
    }

    printCommand();

    const commandOutput = parseCommand(input);
    setBlockQueue([...blockQueue, ...commandOutput]);
    setTypingCompleted(false);
  }

  return (
    <Page>
      <Box
        position="absolute"
        height="100%"
        width="100%"
        top={0}
        left={0}
        onClick={() => {
          setBorderedIdx(undefined);
        }}
      />

      {blocks.map((blockContent, i) => {
        const isActive = activeIdx === i;
        const isBorderActive = borderedIdx === i;

        const showBlinker =
          isTypingCompleted && i === blocks.length - 1 && isActive;

        return (
          <Box
            key={`${blockContent}-${i}`}
            onMouseDown={() => {
              setBorderedIdx(i);
            }}
          >
            <LineBlock lineNumber={i + 1} {...{ isActive, isBorderActive }}>
              <Block {...{ showBlinker, onCommand: handleCommand }}>
                {blockContent}
              </Block>
            </LineBlock>
          </Box>
        );
      })}

      {!isTypingCompleted && (
        <LineBlock lineNumber={line + 1}>
          <TypingBlock
            callback={(result) => {
              setLine(line + 1);
              setBlocks([...blocks, result]);
            }}
          >
            {blockQueue[line]}
          </TypingBlock>
        </LineBlock>
      )}
    </Page>
  );
};

export { Landing };

const LANDING_DATA = [
  getPrevSession()
    ? `Last Session: ${getPrevSession()} AEDT`
    : `New Session: ${getCurrentDateTime()} AEDT`,

  null,
  null,
  null,
  null,
  null,
  null,
  `Jonathan Vu`,
  `Frontend Development & Design`,
  `based in Melbourne`,
  null,
  null,
  "type `help` for more commands",
  constants.COMMAND_PREFIX,
];
