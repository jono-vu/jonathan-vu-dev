import React, { useEffect, useState } from "react";
import { Block, Box, BoxProps, Grid, Page } from "../../components";
import { useInterval } from "../../utils";

const prevSession = window.localStorage.getItem("last_session");

const BLOCKS = [
  prevSession
    ? `Last Session: ${prevSession} AEDT`
    : `New Session: ${getCurrentDate()} AEDT`,
  " ",
  " ",
  " ",
  " ",
  " ",
  " ",
  `Jonathan Vu`,
  `Frontend Development & Design`,
  `based in Melbourne`,
  " ",
  " ",
  <a
    href="mailto:jono.vu@gmail.com"
    target="_blank"
    rel="noreferrer"
    style={{ all: "unset", cursor: "pointer" }}
  >
    <u>mailto:jono.vu@gmail.com</u>
  </a>,
  <a
    href="https://github.com/jono-vu/music-app"
    target="_blank"
    rel="noreferrer"
    style={{ all: "unset", cursor: "pointer" }}
  >
    <u>https://github.com/jono-vu/music-app</u>
  </a>,
  " ",
  `See this site on Desktop for more.`,
];

window.localStorage.setItem("last_session", getCurrentDate());

const LandingMobile = () => {
  const [blocks, setBlocks] = useState<React.ReactNode[]>([]);
  const [line, setLine] = useState(0);

  const isFinished = line === BLOCKS.length - 1;

  useInterval(() => {
    if (isFinished) {
      return;
    }

    setLine(line + 1);
  }, 300);

  useEffect(() => {
    setBlocks([...blocks, BLOCKS[line]]);
  }, [line]);

  return (
    <Page pl={3} fontSize={[1, 2, 3]}>
      {blocks.map((block, i) => (
        <LineBlock key={i} lineNumber={i + 1} mr={4}>
          <Block>{block}</Block>
        </LineBlock>
      ))}
      {!isFinished && (
        <LineBlock lineNumber={line + 2} mr={4}>
          <Box>{blocks[line + 1]}▊</Box>
        </LineBlock>
      )}
    </Page>
  );
};

export { LandingMobile };

interface LineBlockProps extends BoxProps {
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
  ...props
}) => {
  return (
    <Grid
      position="relative"
      gridTemplateColumns="50px 1fr"
      gridColumnGap={4}
      mt={"3px"}
      mr={7}
      {...props}
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

function getCurrentDate() {
  const timestampUTC = new Date();

  const dateAEDT = timestampUTC.toLocaleDateString("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return `${dateAEDT}`;
}
