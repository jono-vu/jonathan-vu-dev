import { useEffect, useState } from "react";

import { Block, Box, Grid, Page } from "../components";
import { parseCommand } from "../features";
import { useInterval, useTypeLine } from "../utils";

const prevSession = window.localStorage.getItem("last_session");

const INITIAL_OUTPUT = [
  prevSession
    ? `Last Session: ${prevSession} AEDT`
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
  `[ https://jonathan-vu.dev ]:`,
];

window.localStorage.setItem("last_session", getCurrentDateTime());

const Landing = () => {
  const [blocks, setBlocks] = useState<Array<string | null>>([]);
  const [outputQueue, setOutputQueue] =
    useState<Array<string | null>>(INITIAL_OUTPUT);

  const [outputCounter, setOutputCounter] = useState<number>(0);
  const [isTypingCompleted, setTypingCompleted] = useState<boolean>(false);

  const [borderedIdx, setBorderedIdx] = useState<number | undefined>(undefined);
  const [activeIdx, setActiveIdx] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (outputCounter === outputQueue.length) {
      setTypingCompleted(true);
      setActiveIdx(outputCounter - 1);
    }
  }, [outputCounter, outputQueue.length]);

  useInterval(() => {
    !isTypingCompleted && scrollToBottom();
  }, 100);

  function handleCommand(input: string) {
    if (!input) {
      return;
    }

    function printCommand() {
      let newBlocks = blocks;
      newBlocks[outputCounter - 1] = newBlocks[outputCounter - 1] + " " + input;

      setBlocks(newBlocks);
    }

    printCommand();

    const commandOutput = parseCommand(input);
    setOutputQueue([...outputQueue, ...commandOutput]);
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
        <LineBlock lineNumber={outputCounter + 1}>
          <TypingBlock
            callback={(result) => {
              setOutputCounter(outputCounter + 1);
              setBlocks([...blocks, result]);
            }}
          >
            {outputQueue[outputCounter]}
          </TypingBlock>
        </LineBlock>
      )}
    </Page>
  );
};

export { Landing };

interface LineBlockProps {
  lineNumber: number;
  children: React.ReactNode;
  isActive?: boolean;
  isBorderActive?: boolean;
}

const LineBlock: React.FC<LineBlockProps> = ({
  children,
  lineNumber,
  isActive,
  isBorderActive,
}) => {
  return (
    <Grid
      position="relative"
      gridTemplateColumns="50px 1fr"
      gridColumnGap={4}
      mt={"3px"}
      mr={7}
    >
      <Box
        textAlign="right"
        color={isActive ? "tertiary" : "secondary"}
        className="line-number"
      >
        {lineNumber}
      </Box>
      {children}
      {isBorderActive && <Border />}
    </Grid>
  );
};

interface TypingBlockProps {
  children: string | null;
  callback: (result: string) => void;
}

const TypingBlock: React.FC<TypingBlockProps> = ({ children, callback }) => {
  const { result } = useTypeLine(children || ` `, {
    onCompleted: callback,
    delay: 20,
  });

  return <Block style={{ wordBreak: "break-all" }}>{result}</Block>;
};

const Border = () => {
  const PADDING_Y = 5;
  const PADDING_X = 12;

  return (
    <Box
      position="absolute"
      top={-PADDING_Y}
      left={-PADDING_X}
      height={`calc(100% + ${PADDING_Y * 2}px)`}
      width={`calc(100% + ${PADDING_X * 2}px)`}
      border="2px solid"
      borderColor="tertiary"
      style={{ pointerEvents: "none" }}
    />
  );
};

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function getCurrentDateTime() {
  const timestampUTC = new Date();

  const timestampAEDT = timestampUTC.toLocaleTimeString("en-AU", {
    timeZone: "Australia/Melbourne",
  });

  const dateAEDT = timestampUTC.toLocaleDateString("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return `${dateAEDT} ${timestampAEDT}`;
}
