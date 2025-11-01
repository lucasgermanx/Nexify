import { Link } from "react-router-dom";
import styled from "styled-components";


export const IconBox = styled.i`
  border: 0px;
  font-size: 23px;
  color: #BDBDBD;
  &:hover{
    color:orange !important;
  }
`;

export const ContainerMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 120vh;
  padding-top: 10%;
  padding-left: 12%;
  width:10vh;
  background-color:white;
  border-right: 1px solid #e8e8e8;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-left:10px;
  p {
    padding-top:20px;
    margin:0px;
  }
`;

export const TitleSection = styled.div`
  div {
    font-size: 12px;
    color: #a3a3a3;
  }
`;

export const Logo = styled.img`
  width: 60%;
`;

export const MenuLink = styled(Link)`
  font-size: 14px;
  text-decoration:none;
  color:#6b6b6b;
  font-weight: 400;
  &:hover{
    color:orange !important;
  }
`;


export const Divider = styled.div`
  margin-top: 10vh;
  margin-bottom: 20px;
`;