import styled, { createGlobalStyle } from "styled-components";

import { Button } from "react-bootstrap";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    body{
        font-family: "Montserrat", sans-serif;
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

    .hover-effect:hover{
        color:orange !important;
    }
`;

export const ButtonTransparent = styled(Button)`
    border:0px;
    color:black;
    background-color:transparent;
    &:hover{
        background-color:transparent;
    }
`

export default GlobalStyle;
