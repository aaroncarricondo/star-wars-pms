import styled from "styled-components";

import { BaseSpaceProps } from "./Space";

type RowProps = Omit<BaseSpaceProps, "align" | "flexGrow">;

const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: ${({ $direction = "row" }) => $direction};
  justify-content: ${({ $justify = "flex-start" }) => $justify};
  flex-flow: ${({ $wrap = true }) => ($wrap ? "row wrap" : "row nowrap")};
  row-gap: ${({ $gap = "none", theme }) => theme.spacing[$gap]};
`;

export { Row };
