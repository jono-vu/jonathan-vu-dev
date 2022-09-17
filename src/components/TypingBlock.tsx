import { Block } from "../components";
import { useTypeLine } from "../utils";

interface TypingBlockProps {
  children: string | null;
  callback: (result: string) => void;
}

const TypingBlock: React.FC<TypingBlockProps> = ({ children, callback }) => {
  const { result } = useTypeLine(children || ` `, {
    onCompleted: callback,
    delay: 20,
  });

  return <Block style={{ wordBreak: "break-all" }}>{result}</Block>;
};

export { TypingBlock };
