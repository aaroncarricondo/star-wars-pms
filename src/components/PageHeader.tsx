import { ReactNode, useEffect } from "react";

import { Space } from "./Space";
import { H1 } from "./Titles";

type PageHeaderProps = {
  title: string;
  toolbox?: ReactNode;
};

export const PageHeader = ({ title, toolbox }: PageHeaderProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Space $justify="space-between" $align="center">
      <H1>{title}</H1>
      {toolbox && <Space>{toolbox}</Space>}
    </Space>
  );
};
