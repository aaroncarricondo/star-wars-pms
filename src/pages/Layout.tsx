import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

// @ts-expect-error: Unreachable code error
import RebelAllianceLogo from "../assets/rebel-alliance.svg";
import { Icon } from "../components/Icon";
import { Space } from "../components/Layout/Space";
import { PageLoader } from "../components/PageLoader";

const NavBar = styled.nav`
  background-color: ${({ theme }) => theme.colors.headerBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.normal};

  height: ${({ theme }) => theme.navbarHeight};
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const NavBarTitle = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.normal};
  margin-top: ${({ theme }) => theme.navbarHeight};
`;

export const Layout = () => {
  return (
    <>
      <NavBar>
        <Space $align="center">
          <Icon $height="24px" src={RebelAllianceLogo} />
          <NavBarTitle to="/">rebelalliance.org</NavBarTitle>
        </Space>
      </NavBar>
      <Content>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Content>
    </>
  );
};
