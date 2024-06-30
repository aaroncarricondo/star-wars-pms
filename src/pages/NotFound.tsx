import styled from "styled-components";

import { Space } from "../components/Layout/Space";

const NotFoundContainer = styled(Space)`
  font-size: 80px;
  height: ${({ theme }) =>
    `calc(100vh - ${theme.navbarHeight} - ${theme.spacing.normal} * 2)`};
`;

export const NotFound = () => {
  return (
    <NotFoundContainer
      $direction="column"
      $justify="center"
      $align="center"
      $gap="none"
    >
      <div>404</div>
      <div>Not Found</div>
    </NotFoundContainer>
  );
};
