import styled from "styled-components";

export const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.colors.separator};
  border-bottom-width: ${({ theme }) => theme.border.width};

  font-family: "Oxanium";
  line-height: 1.1rem;
  color: ${({ theme }) => theme.colors.text};

  outline: none;
`;
