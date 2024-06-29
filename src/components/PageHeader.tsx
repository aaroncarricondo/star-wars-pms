import { ReactNode, useEffect } from "react";
import styled from "styled-components";

import { Space } from "./Space";
import { H1 } from "./Titles";

const PageHeaderSpace = styled(Space)`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

type PageHeaderProps = {
  title: string;
  toolbox?: ReactNode;
};

export const PageHeader = ({ title, toolbox }: PageHeaderProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <PageHeaderSpace $justify="space-between" $align="center">
      <H1>{title}</H1>
      {toolbox && <Space>{toolbox}</Space>}
    </PageHeaderSpace>
  );
};
