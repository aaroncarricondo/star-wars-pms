import styled from "styled-components";

type IconProps = {
  $height?: string;
};

export const Icon = styled.img<IconProps>`
  height: ${({ $height = "16px" }) => $height};
  width: auto;
`;
