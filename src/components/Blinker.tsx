import { useState } from "react";

import { useInterval } from "../utils";

const BLINKER_INTERVAL = 550;

interface BlinkerProps {
  show?: boolean;
}

const Blinker: React.FC<BlinkerProps> = ({ show, ...props }) => {
  const [isVisible, setVisible] = useState<boolean>(false);

  useInterval(() => {
    setVisible(!isVisible);
  }, BLINKER_INTERVAL);

  return <span {...props}>{(isVisible || show) && "_"}</span>;
};

export { Blinker };
