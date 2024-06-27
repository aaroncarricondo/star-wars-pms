import styled from "styled-components";

import { Space } from "../Space";
import { StyledTableColumn } from "./styles";

const StyledSpace = styled(Space)`
  height: 80px;
`;

export const EmptyTableRow = () => {
  return (
    <tr key="empty">
      <StyledTableColumn colSpan={1000}>
        <StyledSpace $justify="center" $align="center">
          No data
        </StyledSpace>
      </StyledTableColumn>
    </tr>
  );
};
