import styled from "styled-components";

export const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.colors.text};
  border-bottom-width: ${({ theme }) => theme.border.width};

  font-family: "Oxanium";
  line-height: 1.1rem;
  color: ${({ theme }) => theme.colors.text};

  padding: ${({ theme }) => theme.spacing.small};

  outline: none;

  &:-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text};
    box-shadow: none;
  }
`;
