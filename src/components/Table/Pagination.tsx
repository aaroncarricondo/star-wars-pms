import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

// @ts-expect-error: Unreachable code error
import ArrowLeft from "../../assets/arrow-left-icon.svg";
// @ts-expect-error: Unreachable code error
import ArrowRight from "../../assets/arrow-right-icon.svg";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Space } from "../Space";
import { PAGE_SIZE } from ".";

type PaginationContainerProps = {
  $show: boolean;
};

const PaginationContainer = styled(Space)<PaginationContainerProps>`
  margin-top: ${({ theme }) => theme.spacing.normal};

  display: ${({ $show }) => ($show ? undefined : "none")};
`;

const PreviousNextButton = styled(Button)``;

const PageContainer = styled(Space)`
  border-radius: ${({ theme }) => theme.border.radius};
  background-color: ${({ theme }) => theme.colors.headerBackground};

  padding: ${({ theme }) => theme.spacing.normal};
`;

type PaginationProps = {
  page: number;
  dataLength: number;
  isLoading: boolean;
  setPage: Dispatch<SetStateAction<number>>;
};

export const Pagination = ({
  page,
  dataLength,
  isLoading,
  setPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(dataLength / PAGE_SIZE);

  const goPrevious = () => {
    setPage((prev) => (prev - 1 === 0 ? prev : prev - 1));
  };

  const goNext = () => {
    setPage((prev) => (prev + 1 > totalPages ? prev : prev + 1));
  };

  return (
    <PaginationContainer
      $justify="flex-end"
      $show={isLoading || totalPages > 1}
    >
      <PreviousNextButton disabled={page === 1} onClick={goPrevious}>
        <Icon src={ArrowLeft} />
      </PreviousNextButton>
      <PageContainer $align="center">
        {page} of {totalPages}
      </PageContainer>
      <PreviousNextButton disabled={page === totalPages} onClick={goNext}>
        <Icon src={ArrowRight} />
      </PreviousNextButton>
    </PaginationContainer>
  );
};
