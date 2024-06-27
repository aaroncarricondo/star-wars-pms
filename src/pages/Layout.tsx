import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

import RebelAllianceLogo from "/rebel-alliance.svg";

import { Space } from "../components/Space";

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

const NavBarLogo = styled.img`
  height: 24px;
  width: auto;
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
          <NavBarLogo src={RebelAllianceLogo}></NavBarLogo>
          <NavBarTitle to="/">rebelalliance.org</NavBarTitle>
        </Space>
      </NavBar>
      <Content>
        <Outlet />
      </Content>
    </>
  );
};
