import { Box, BoxProps } from "../elements";

interface GridProps extends BoxProps {
  children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Box display="grid" {...props}>
      {children}
    </Box>
  );
};

export { Grid };
