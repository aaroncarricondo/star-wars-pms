import styled from "styled-components";

export const Button = styled.button`
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.primary};
  border-style: solid;
  border-width: ${({ theme }) => theme.border.width};
  border-radius: ${({ theme }) => theme.border.radius};

  height: 48px;
  width: auto;
  padding: ${({ theme }) => theme.spacing.normal};

  font-family: "Oxanium";
  text-transform: uppercase;
  line-height: 1.1rem;
  color: ${({ theme }) => theme.colors.text};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.headerBackground};
  }
  &:disabled {
    opacity: 0.6;
  }
  cursor: pointer;
`;
