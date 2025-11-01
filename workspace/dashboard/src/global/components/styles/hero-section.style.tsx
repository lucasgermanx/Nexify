import { Button, Container } from "react-bootstrap";
import styled from "styled-components";

interface MenuComponentWrapperProps {
  menuVisible: boolean;
}

export const FlexContainer = styled.div`
  padding-left: 10%;
  height:100%;
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

export const MenuComponentWrapper = styled.div<MenuComponentWrapperProps>`
  flex-basis: 100%;
  max-width: 200px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
 

  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: ${({ menuVisible }) => (menuVisible ? 1 : 0)};
    visibility: ${({ menuVisible }) => (menuVisible ? "visible" : "hidden")};
    transform: ${({ menuVisible }) =>
    menuVisible ? "translateX(0)" : "translateX(-100%)"};
    transition: all 0.3s ease-in-out;
  }
`;

export const ContainerWrapper = styled.div`
  background-color: #141414;
  min-height: 100vh;
  margin-left: 0;
  transition: margin-left 0.3s ease;
  padding: 0;
  overflow-x: hidden;

  @media (min-width: 769px) {
    margin-left: var(--sidebar-width, 280px);
    width: calc(100% - var(--sidebar-width, 280px));
    padding: 2rem;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }
`;

export const StyledContainer = styled(Container)`
  padding-left: 0;
`;

export const HideButton = styled(Button)`
  display: none;
  background-color: black;
  border: 0px;
  @media (max-width: 768px) {
    display: block;
    margin-left: 80%;
    margin-top: 6%;
  }
`;
