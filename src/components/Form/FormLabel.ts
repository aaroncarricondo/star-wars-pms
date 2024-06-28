import styled from "styled-components";

type FormLabelProps = {
  $required?: boolean;
};

export const FormLabel = styled.label<FormLabelProps>`
  text-transform: uppercase;

  ${({ theme, $required }) =>
    $required
      ? `&:after {
        margin-inline-start: ${theme.spacing.extraSmall};
        content: "*";
        color: ${theme.colors.error};
      }`
      : ""}
`;
