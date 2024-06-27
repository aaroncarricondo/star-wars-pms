import { ReactNode, useEffect } from "react";
import styled from "styled-components";

import { Space } from "./Space";

const PageHeaderTitle = styled.h1`
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.primary};
`;

type PageHeaderProps = {
  title: string;
  toolbox?: ReactNode;
};

export const PageHeader = ({ title, toolbox }: PageHeaderProps) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <Space $justify="space-between" $align="center">
      <PageHeaderTitle>{title}</PageHeaderTitle>
      {toolbox && toolbox}
    </Space>
  );
};
