import styled from "styled-components";

type ButtonProps = {
  $secondary?: boolean;
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  align-items: center;
  justify-content: space-between;

  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.primary};
  border-style: solid;
  border-width: ${({ theme }) => theme.border.width};
  border-radius: ${({ theme }) => theme.border.radius};

  border: ${({ $secondary }) => ($secondary ? "none" : undefined)};

  height: 48px;
  width: auto;
  padding: ${({ theme }) => theme.spacing.normal};

  font-family: "Oxanium";
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.headerBackground};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:not(:disabled) {
    cursor: pointer;
  }
`;
