import { PropsWithChildren } from "react";
import styled from "styled-components";

const PopupHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-top-left-radius: ${({ theme }) => theme.border.radius};
  border-top-right-radius: ${({ theme }) => theme.border.radius};

  padding: ${({ theme }) => theme.spacing.normal};

  text-transform: uppercase;
`;

const PopupContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-left-radius: ${({ theme }) => theme.border.radius};
  border-bottom-right-radius: ${({ theme }) => theme.border.radius};

  padding: ${({ theme }) => theme.spacing.normal};
`;

type ModalLayoutProps = {
  title: string;
} & PropsWithChildren;

export const ModalLayout = ({ title, children }: ModalLayoutProps) => {
  return (
    <>
      <PopupHeader>{title}</PopupHeader>
      <PopupContent>{children}</PopupContent>
    </>
  );
};
