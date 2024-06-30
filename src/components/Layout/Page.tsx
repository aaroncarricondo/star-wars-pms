import { PropsWithChildren, ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// @ts-expect-error: Unreachable code error
import ChevronLeftIcon from "../../assets/chevron-left-icon.svg";
import { Icon } from "../Icon";
import { H1 } from "../Titles";
import { Space } from "./Space";

const PageHeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 1600px;
`;

const BackIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

const PageHeaderSpace = styled(Space)`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const PageContent = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

type PageProps = {
  title: string;
  goBack?: string;
  toolbox?: ReactNode;
} & PropsWithChildren;

export const Page = ({ title, goBack, toolbox, children }: PageProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <PageHeaderContainer>
        {goBack && (
          <BackLink to={goBack}>
            <BackIcon src={ChevronLeftIcon} />
            Back
          </BackLink>
        )}
        <PageHeaderSpace $justify="space-between" $align="center" $wrap>
          <H1>{title}</H1>
          {toolbox && <Space>{toolbox}</Space>}
        </PageHeaderSpace>
      </PageHeaderContainer>

      <PageContent>{children}</PageContent>
    </>
  );
};
