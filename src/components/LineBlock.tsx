import { Box, BoxProps, Grid } from "./elements";

interface LineBlockProps extends BoxProps {
  lineNumber: number;
  children: React.ReactNode;
  isActive?: boolean;
  isBorderActive?: boolean;
}

const LineBlock: React.FC<LineBlockProps> = ({
  children,
  lineNumber,
  isActive,
  isBorderActive,
  ...props
}) => {
  return (
    <Grid
      position="relative"
      gridTemplateColumns="50px 1fr"
      gridColumnGap={4}
      mt={"3px"}
      mr={7}
      {...props}
    >
      <Box
        textAlign="right"
        color={isActive ? "tertiary" : "secondary"}
        className="line-number"
      >
        {lineNumber}
      </Box>
      {children}
      {isBorderActive && <Border />}
    </Grid>
  );
};

export { LineBlock };

const Border = () => {
  const PADDING_Y = 5;
  const PADDING_X = 12;

  return (
    <Box
      position="absolute"
      top={-PADDING_Y}
      left={-PADDING_X}
      height={`calc(100% + ${PADDING_Y * 2}px)`}
      width={`calc(100% + ${PADDING_X * 2}px)`}
      border="2px solid"
      borderColor="tertiary"
      style={{ pointerEvents: "none" }}
    />
  );
};
