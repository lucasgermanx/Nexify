import logo from "@/assets/images/logo.png";
import styled from '@emotion/styled';
import React from 'react';
import { Logo } from "../styles/SideBarStyle";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;

  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, rtl, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <center>
        <Logo src={logo} alt="Logo" />
      </center>
    </StyledSidebarHeader>
  );
};
