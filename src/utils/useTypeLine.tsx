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
      const blankResult = "▊".repeat(line.length);

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

// const JUMBLED_LETTERS = "jonathanJONATHANvuVU".split("");

// const [isJumbling, setJumbling] = useState<boolean>(false);

// function executeTyping() {
//   if (currentIdx === line.length) {
//     options.onCompleted?.(result);
//     setResult("");
//     setCurrentIdx(0);
//     return;
//   }

//   const currentChar = line[currentIdx];

//   const jumbleArray = [
//     currentChar,
//     ...randomItemsFromArray(JUMBLED_LETTERS, 1),
//   ];

//   const jumbledChar = randomItemInArray(jumbleArray);

//   if (jumbledChar === currentChar) {
//     let newResult = "";

//     if (isJumbling) {
//       newResult = removeLastChar(result) + currentChar;
//     } else {
//       newResult = result + currentChar;
//     }

//     setResult(newResult);
//     setCurrentIdx(currentIdx + 1);

//     setJumbling(false);

//     return;
//   }

//   let newResult = "";

//   if (isJumbling) {
//     newResult = removeLastChar(result) + jumbledChar;
//   } else {
//     newResult = result + jumbledChar;
//   }

//   setResult(newResult);

//   setJumbling(true);
// }

// function randomItemsFromArray(array: any[], numItems: number) {
//   const shuffledArray = array.sort(() => 0.5 - Math.random());
//   const filteredArray = shuffledArray.filter((_, i) => i < numItems);

//   return filteredArray;
// }

// function randomItemInArray(array: any[]) {
//   return array[Math.floor(Math.random() * array.length)];
// }

// function removeLastChar(string: string) {
//   return string.slice(0, -1);
// }
