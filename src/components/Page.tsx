import styled, { useTheme, createGlobalStyle } from "styled-components";

import { Box, BoxProps } from "../components";
import { theme as utilsTheme } from "../utils";

interface PageProps extends BoxProps {
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <StyledPage
      color="text"
      width="full"
      p={3}
      pl={6}
      {...{ theme }}
      {...props}
    >
      <GlobalStyle colors={(theme as typeof utilsTheme).colors} />
      <StyledBackground {...{ theme }} />
      {children}
    </StyledPage>
  );
};

export { Page };

const GlobalStyle = createGlobalStyle<{ colors: typeof utilsTheme["colors"] }>`
  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ colors }) => `${colors.secondary} ${colors.bg}`};
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: ${({ colors }) => colors.bg};
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ colors }) => colors.secondary};
    border-radius: 20px;
    border: 3px solid ${({ colors }) => colors.bg};
  }

  body {
    margin: 0;
    font-family: "IBM Plex Mono", monospace;
    font-size: 14pt;
    line-height: 1.55;
    letter-spacing: 0.015em;

    overflow-x: hidden;
  }

  body .line-number::-moz-selection {
    background: transparent;
    color: inherit;
  }

  body .line-number::selection {
    background: transparent;
    color: inherit;
  }
`;

const StyledPage = styled(Box)`
  *::-moz-selection {
    background: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.bg};
  }

  *::selection {
    background: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.bg};
  }
`;

const StyledBackground = styled(Box)`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;

  background: ${({ theme }) => theme.colors.bg};
`;
