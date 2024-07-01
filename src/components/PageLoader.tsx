import styled from "styled-components";

import { Space } from "./Layout/Space";
import { Spinner } from "./Spinner";

const PageLoaderContainer = styled(Space)`
  height: ${({ theme }) =>
    `calc(100vh - ${theme.navbarHeight} - ${theme.spacing.normal} * 2)`};
`;

export const PageLoader = () => {
  return (
    <PageLoaderContainer $justify="center" $align="center">
      <Spinner />
    </PageLoaderContainer>
  );
};
