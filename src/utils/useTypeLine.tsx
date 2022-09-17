import { useState } from "react";
import { useInterval } from "./useInterval";

const DEFAULT_TYPING_DELAY = 100;

interface TypeLineOptions {
  onCompleted?: (result: string) => void;
  delay?: number;
}

function useTypeLine(line: string, options: TypeLineOptions) {
  const [result, setResult] = useState<string>("");
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  function executeTyping() {
    if (currentIdx === line.length) {
      options.onCompleted?.(result);
      setResult("");
      setCurrentIdx(0);
      return;
    }

    if (currentIdx === 0) {
      const blankResult = "█".repeat(line.length);

      const newResult = replaceAt(blankResult, currentIdx, line[currentIdx]);
      setResult(newResult);
      setCurrentIdx(currentIdx + 1);
      return;
    }

    const newResult = replaceAt(result, currentIdx, line[currentIdx]);

    setCurrentIdx(currentIdx + 1);
    setResult(newResult);
  }

  useInterval(() => {
    executeTyping();
  }, options.delay || DEFAULT_TYPING_DELAY);

  return { result };
}

export { useTypeLine };

function replaceAt(string: string, index: number, replacement: string) {
  return (
    string.substring(0, index) +
    replacement +
    string.substring(index + replacement.length)
  );
}
