import styled, { DefaultTheme } from "styled-components";

type JustifyAlign =
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "center";

export type BaseSpaceProps = {
  $direction?: "row" | "row-reverse" | "column" | "column-reverse";
  $justify?: JustifyAlign;
  $align?: JustifyAlign;
  $gap?: keyof DefaultTheme["spacing"];
  $wrap?: boolean;
  $grow?: number;
};

const Space = styled.div<BaseSpaceProps>`
  display: flex;
  flex-direction: ${({ $direction = "row" }) => $direction};
  flex-wrap: ${({ $wrap = false }) => ($wrap ? "wrap" : "nowrap")};
  flex-grow: ${({ $grow }) => ($grow ? $grow : undefined)};
  gap: ${({ $gap = "normal", theme }) => theme.spacing[$gap]};
  justify-content: ${({ $justify }) => $justify};
  align-items: ${({ $align }) => $align};
`;

export { Space };
