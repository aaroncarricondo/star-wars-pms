import styled from "styled-components";

import { Space } from "../Space";
import { Spinner } from "../Spinner";
import { StyledTableColumn } from "./styles";

const StyledSpace = styled(Space)`
  height: 80px;
`;

export const LoadingTableRow = () => {
  return (
    <tr key="empty">
      <StyledTableColumn colSpan={1000}>
        <StyledSpace $justify="center" $align="center">
          <Spinner />
        </StyledSpace>
      </StyledTableColumn>
    </tr>
  );
};
