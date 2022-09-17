import { useEffect } from "react";
import { Link } from "react-router-dom";

import fileDownload from "js-file-download";

import { Block, Box, Page } from "../components";

import resume from "../assets/resume.pdf";

const Cv = () => {
  useEffect(() => {
    fileDownload(resume, "Jonathan Vu Resume 2022.pdf");
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
            fileDownload(resume, "Jonathan Vu Resume 2022.pdf");
          }}
        >
          <u>resume.pdf</u>
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

export { Cv };
