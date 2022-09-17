import { useEffect } from "react";
import { Link } from "react-router-dom";

import fileDownload from "js-file-download";

import { Block, Box, Page } from "../components";

import portfolio from "../assets/portfolio.pdf";

const Portfolio = () => {
  useEffect(() => {
    fileDownload(portfolio, "Jonathan Vu Portfolio 2019.pdf");
  }, []);

  return (
    <Page>
      <Box>
        <Block>If your file does not download,</Block>
        <Block>please click here:</Block>
        <Block> </Block>
        <button
          style={{ all: "unset", cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            fileDownload(portfolio, "Jonathan Vu Portfolio 2019.pdf");
          }}
        >
          <u>portfolio.pdf</u>
        </button>
        <Block> </Block>
        <Block> </Block>
        <Block>You may close this tab</Block>
        <Block>
          or go back{" "}
          <u>
            <Link to="/">home</Link>
          </u>
        </Block>
      </Box>
    </Page>
  );
};

export { Portfolio };
