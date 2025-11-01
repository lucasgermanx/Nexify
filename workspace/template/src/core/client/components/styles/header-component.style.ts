import { Button, Container } from "react-bootstrap";

import styled from "styled-components";

interface HeaderBackgroundProps {
  bgUrl?: string;
}

export const HeaderContainer = styled(Container)`
  margin-top:1rem;
`;

export const HeaderBackground = styled.div<HeaderBackgroundProps>`
  background-image: url(${props => props.bgUrl || 'https://i.imgur.com/s0r1L8W.png'});
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0px;
  margin: 0px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export const HeaderContent = styled.div`
  padding-top: 10%;
  padding-bottom: 10%;
`;

export const HeaderTitle = styled.h1`
  color: white;
  font-weight: 700;
  font-size: 50px;
`;

export const HeaderText = styled.p`
  color: white;
`;

export const OrangeButton = styled(Button)`
  color: white;
  background-color: orange;
  border: 0px;
  padding: 15px;
  border-radius: 10px;
  width: 200px;
  margin-right: 10px;
`;

export const GrayButton = styled(Button)`
  color: white;
  background-color: #161616;
  border: 0px;
  padding: 15px;
  border-radius: 10px;
  width: 200px;
`;