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
  background-color: white;

  flex-basis: 100%;

  @media (min-width: 768px) {
    flex-basis: 90%;
    padding-right: 100px;
  }
  padding-left: 3%;
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
