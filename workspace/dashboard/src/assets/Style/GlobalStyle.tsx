import { createGlobalStyle, styled } from "styled-components";

import { Button } from "react-bootstrap";

export const GlobalStyle = createGlobalStyle`
 .inter-<uniquifier> {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    letter-spacing: 0.02em;
    line-height: 1.6;
  }
  
  .avatar-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    overflow: hidden;
  }
  
  .avatar-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .text-welcome {
    color: #0C1D59;
    padding: 3%;
    font-weight: 600;
  }

  .border-card {
    border: 0.5px solid #F2F2F2;
    border-radius: 8px !important;
  }
  
  .page-link{
    background-color:white;
    color:orange;
    border: 0px;
    border-radius:10px !important;
    text-align:center;
    box-shadow: none !important;
    
    &:hover {
      color:black;
    }
    &:focus {
      background-color:orange;
      color:white;
      box-shadow: none !important;
    }
    &:active {
      background-color:orange;
      color:white;
      box-shadow: none !important;
    }
  }

  .active>.page-link, .page-link.active {
    background-color:orange !important;
  }


  a{
    text-decoration:none;
    color: black;
  }
`;


export const ButtonOrange = styled(Button)`
  background-color: #ff9a36;
  border: 0;
  color: white;

  &:hover {
    background-color: #ffbb6e !important;
  }

  &:focus {
    outline: none; 
    box-shadow: none; 
    background-color: #e88319 !important;
  }

  &:active {
    background-color: #e88319 !important;
  }
`;

export const ButtonGreen = styled(Button)`
  background-color: #68d391;
  border: 0;
  color: white;
  font-weight: 600;

  &:hover {
    background-color: #5cbf7a;
  }

  &:focus {
    outline: none; 
    box-shadow: none; 
    background-color: #68d391 !important;
  }

  &:active {
    background-color: #4fa566;
  }
`;

export const ButtonTransparent = styled(Button)`
  background-color: transparent;
  color: black;
  border: 0;

  &:hover {
    color: orange;
    background-color: transparent !important;
  }

  &:focus {
    outline: none; 
    box-shadow: none; 
    background-color: transparent !important;
  }

  &:active {
    opacity: 0.7;
  }

  .footer-avatar-container {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 1rem;
    padding-bottom: 1rem;
  }
  
  
`;