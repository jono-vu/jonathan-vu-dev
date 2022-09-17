import styled, { StyledComponentProps } from "styled-components";

import {
  border,
  BorderProps,
  color,
  ColorProps,
  flex,
  FlexProps,
  fontSize,
  FontSizeProps,
  grid,
  gridGap,
  GridGapProps,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
} from "styled-system";

type BoxProps = StyledComponentProps<"div", any, {}, never> &
  ColorProps &
  SpaceProps &
  LayoutProps &
  PositionProps &
  GridProps &
  FlexProps &
  FontSizeProps &
  GridGapProps &
  TextAlignProps &
  BorderProps;

const Box = styled.div<BoxProps>(
  {
    boxSizing: "border-box",
    minWidth: 0,
  },
  space,
  color,
  layout,
  position,
  fontSize,
  grid,
  gridGap,
  flex,
  textAlign,
  border
);

export { Box };
export type { BoxProps };
