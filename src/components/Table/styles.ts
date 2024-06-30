import styled, { css } from "styled-components";

import { mediaQueries } from "../../theme";
import { Icon } from "../Icon";

export const TableContainer = styled.div`
  overflow: auto;
`;

export const StyledTable = styled.table`
  width: 100%;

  border-collapse: collapse;
`;

const paddingCss = css`
  // Media breakpoints
  @media ${mediaQueries.xs} {
    padding: ${({ theme }) => theme.spacing.small};
  }
  @media ${mediaQueries.sm} {
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

type StyledTableHeaderProps = {
  $canBeSorted: boolean;
} & EllipsisProps;

export const StyledTableHeader = styled.th<StyledTableHeaderProps>`
  background-color: ${({ theme }) => theme.colors.headerBackground};

  text-align: start;
  text-transform: uppercase;

  ${paddingCss}
  ${ellipsisCss}

  cursor: ${({ $canBeSorted }) => ($canBeSorted ? "pointer" : undefined)};

  transition: opacity 0.25s;
  &:hover {
    opacity: ${({ $canBeSorted }) => ($canBeSorted ? 0.8 : undefined)};
  }

  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.border.radius};
  }
  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.border.radius};
  }
`;

export const StyledTableColumn = styled.td<EllipsisProps>`
  ${paddingCss}
  ${ellipsisCss}

  border-bottom: ${({ theme }) =>
    `${theme.border.width} solid ${theme.colors.headerBackground}`};
`;

type StyledTableRowProps = {
  $isClickable?: boolean;
};

export const StyledTableRow = styled.tr<StyledTableRowProps>`
  &:hover {
    background-color: ${({ theme, $isClickable = false }) =>
      $isClickable ? theme.colors.highlight : "transparent"};
  }

  cursor: ${({ $isClickable = false }) =>
    $isClickable ? "pointer" : undefined};
`;

type SortIconProps = {
  $show: boolean;
};

export const SortIcon = styled(Icon)<SortIconProps>`
  visibility: ${({ $show }) => ($show ? undefined : "hidden")};
`;
