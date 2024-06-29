import styled, { css } from "styled-components";

const themingCss = css`
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  font-weight: normal;
`;

export const H1 = styled.h1`
  ${themingCss}
`;

export const H2 = styled.h2`
  ${themingCss}
  margin-top: 0;
`;

export const H3 = styled.h3`
  ${themingCss}
  margin: 0;
  font-size: 1rem;
`;
