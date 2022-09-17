import React, { useEffect, useState } from "react";

import { Block, Box, LineBlock, Page } from "../../components";
import { getPrevSessionMobile } from "../../storage";
import { getCurrentDate, useInterval } from "../../utils";

getPrevSessionMobile();

const LandingMobile = () => {
  const data = LANDING_MOBILE_DATA;

  const [blocks, setBlocks] = useState<React.ReactNode[]>([]);
  const [line, setLine] = useState(0);

  const isFinished = line === data.length - 1;

  useInterval(() => {
    if (isFinished) {
      return;
    }

    setLine(line + 1);
  }, 300);

  useEffect(() => {
    setBlocks([...blocks, data[line]]);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
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

const LANDING_MOBILE_DATA = [
  getPrevSessionMobile()
    ? `Last Session: ${getPrevSessionMobile()} AEDT`
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
