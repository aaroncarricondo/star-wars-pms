import styled, { DefaultTheme } from "styled-components";

import { mediaQueries } from "../../theme";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type Span = Range<1, 25>;

type Breakpoints = {
  $xs?: Span;
  $sm?: Span;
  $md?: Span;
  $lg?: Span;
  $xl?: Span;
  $xxl?: Span;
};

type ColProps = {
  $span?: Span;
  $gap?: keyof DefaultTheme["spacing"];
} & Breakpoints;

const getFlexBasis = (span: number | undefined) =>
  span ? `${100 / (24 / span)}%` : undefined;

const Col = styled.div<ColProps>`
  display: flex;
  flex-basis: ${({ $span }) => getFlexBasis($span)};
  max-width: ${({ $span }) => getFlexBasis($span)};
  padding-left: ${({ $gap = "none", theme }) =>
    `calc(${theme.spacing[$gap]} / 2)`};
  padding-right: ${({ $gap = "none", theme }) =>
    `calc(${theme.spacing[$gap]} / 2)`};

  // Media breakpoints
  @media ${mediaQueries.xs} {
    flex-basis: ${({ $xs }) => getFlexBasis($xs)};
    max-width: ${({ $xs }) => getFlexBasis($xs)};
  }
  @media ${mediaQueries.sm} {
    flex-basis: ${({ $sm }) => getFlexBasis($sm)};
    max-width: ${({ $sm }) => getFlexBasis($sm)};
  }
  @media ${mediaQueries.md} {
    flex-basis: ${({ $md }) => getFlexBasis($md)};
    max-width: ${({ $md }) => getFlexBasis($md)};
  }
  @media ${mediaQueries.lg} {
    flex-basis: ${({ $lg }) => getFlexBasis($lg)};
    max-width: ${({ $lg }) => getFlexBasis($lg)};
  }
  @media ${mediaQueries.xl} {
    flex-basis: ${({ $xl }) => getFlexBasis($xl)};
    max-width: ${({ $xl }) => getFlexBasis($xl)};
  }
  @media ${mediaQueries.xxl} {
    flex-basis: ${({ $xxl }) => getFlexBasis($xxl)};
    max-width: ${({ $xxl }) => getFlexBasis($xxl)};
  }
`;

export { Col };
