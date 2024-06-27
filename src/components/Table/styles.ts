import styled, { css } from "styled-components";

import { mediaQueries } from "../../theme";

export const StyledTable = styled.table`
  max-width: 900px;
`;

const paddingCss = css`
  // Media breakpoints
  @media ${mediaQueries.xs} {
    padding: ${({ theme }) => theme.spacing.extraSmall};
  }
  @media ${mediaQueries.sm} {
    padding: ${({ theme }) => theme.spacing.small};
  }
  @media ${mediaQueries.xxl} {
    padding: ${({ theme }) => theme.spacing.normal};
  }
`;

type EllipsisProps = { $ellipsis?: boolean };

const ellipsisCss = css<EllipsisProps>`
  ${({ $ellipsis }) =>
    $ellipsis
      ? `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
      : `
      word-wrap: break-word;
      white-space: normal;
    `}
`;

export const StyledTableHeader = styled.th<EllipsisProps>`
  background-color: ${({ theme }) => theme.colors.headerBackground};

  text-align: start;
  text-transform: uppercase;

  ${paddingCss}
  ${ellipsisCss}
`;

export const StyledTableColumn = styled.td<EllipsisProps>`
  ${paddingCss}
  ${ellipsisCss}
`;
