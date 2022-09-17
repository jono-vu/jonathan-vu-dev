import { useEffect } from "react";
import { Link } from "react-router-dom";

import fileDownload from "js-file-download";

import { Block, Box, Page } from "../components";

import portfolio from "../assets/portfolio.pdf";

const Portfolio = () => {
  const data = PORTFOLIO_DATA;

  useEffect(() => {
    fileDownload(portfolio, "Jonathan Vu Portfolio 2019.pdf");
  }, []);

  return (
    <Page>
      <Box>
        {data.map((block, i) => {
          return <Block key={i}>{block}</Block>;
        })}
      </Box>
    </Page>
  );
};

export { Portfolio };

const PORTFOLIO_DATA = [
  `If your file does not download,`,
  `please click here:`,
  " ",
  <button
    style={{ all: "unset", cursor: "pointer" }}
    onClick={(e) => {
      e.preventDefault();
      fileDownload(portfolio, "Jonathan Vu Portfolio 2019.pdf");
    }}
  >
    <u>portfolio.pdf</u>
  </button>,
  " ",
  " ",
  "You may close this tab",
  <>
    or go back{" "}
    <u>
      <Link to="/">home</Link>
    </u>
  </>,
];
