import { useEffect } from "react";
import { Link } from "react-router-dom";

import fileDownload from "js-file-download";

import { trackPageView } from "../analytics";
import { Block, Box, Page } from "../components";

import resume from "../assets/resume.pdf";

trackPageView("/cv");

const Cv = () => {
  const data = RESUME_DATA;

  useEffect(() => {
    fileDownload(resume, "Jonathan Vu Resume 2022.pdf");
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

export { Cv };

const RESUME_DATA = [
  `If your file does not download,`,
  `please click here:`,
  " ",
  <button
    style={{ all: "unset", cursor: "pointer" }}
    onClick={(e) => {
      e.preventDefault();
      fileDownload(resume, "Jonathan Vu Resume 2022.pdf");
    }}
  >
    <u>resume.pdf</u>
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
