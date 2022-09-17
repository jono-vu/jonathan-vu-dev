import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Cv, Landing, Portfolio } from "./routes";
import { LandingMobile } from "./routes/mobile/landing";
import { getTheme, theme } from "./utils";

const App = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    window.onstorage = (e) => {
      setCurrentTheme(getTheme());
    };
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      {isTabletOrMobile && <LandingMobile />}
      {!isTabletOrMobile && (
        <BrowserRouter>
          <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/cv" element={<Cv />} />

            <Route index element={<Landing />} />
          </Routes>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
};

export { App };
