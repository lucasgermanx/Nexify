import { createGlobalStyle, styled } from "styled-components";

import { Button } from "react-bootstrap";

export const GlobalStyle = createGlobalStyle`
 .inter-<uniquifier> {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
  }

  html, body {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
  }

  /* Custom Scrollbar Dark Theme */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #121212;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    transition: background 0.3s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 140, 0, 0.6);
  }

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 140, 0, 0.3) #121212;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    letter-spacing: 0.02em;
    line-height: 1.6;
    background-color: #141414;
    color: #e2e8f0;
    margin: 0;
    padding: 0;
  }

  /* Fix sidebar content clipping */
  .pro-sidebar {
    overflow: visible !important;
  }

  .pro-sidebar-inner {
    overflow: visible !important;
    padding: 0 !important;
  }

  .pro-sidebar-content {
    overflow: visible !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .ps-menu-root {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .ps-menu-button {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  /* FilePond Dark Theme */
  .filepond--root {
    background-color: #121212 !important;
    color: #e2e8f0 !important;
  }

  .filepond--panel-root {
    background-color: #121212 !important;
    border: 1px dashed rgba(255, 255, 255, 0.1) !important;
  }

  .filepond--drop-label {
    color: rgba(255, 255, 255, 0.6) !important;
  }

  .filepond--label-action {
    color: #ff8c00 !important;
    
    &:hover {
      color: #ffa500 !important;
    }
  }

  .filepond--item-panel {
    background-color: rgba(255, 255, 255, 0.05) !important;
  }

  /* InputGroup Dark Theme */
  .input-group-text {
    background-color: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }

  /* Dropdown Dark Theme */
  .dropdown-menu {
    background-color: #121212 !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7) !important;
    
    .dropdown-item {
      color: rgba(255, 255, 255, 0.8) !important;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.05) !important;
        color: #ff8c00 !important;
      }
      
      &:active, &:focus {
        background-color: rgba(255, 255, 255, 0.08) !important;
        color: #ff8c00 !important;
      }
    }
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
    color: #e2e8f0;
    padding: 3%;
    font-weight: 600;
  }

  .border-card {
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px !important;
    background-color: #121212;
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
    color: #e2e8f0;
    
    &:hover {
      color: #ff8c00;
    }
  }

  /* Modal Dark Theme Styles */
  .modal-content {
    background-color: #121212 !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    border-radius: 12px !important;
    color: #e2e8f0 !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6) !important;
  }

  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.85) !important;
  }

  .modal-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    background-color: transparent !important;
    color: white !important;
    
    .modal-title {
      color: white !important;
      font-weight: 600;
    }

    .btn-close {
      filter: invert(1) grayscale(100%) brightness(200%);
    }
  }

  .modal-body {
    background-color: transparent !important;
    color: #e2e8f0 !important;
    padding: 24px !important;

    h5 {
      color: white !important;
      font-weight: 600;
      margin-bottom: 20px;
    }

    h4, h3, h2, h1 {
      color: white !important;
    }

    p {
      color: rgba(255, 255, 255, 0.7) !important;
    }

    label {
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }

  .modal-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
    background-color: transparent !important;
  }

  /* Form inputs dark theme */
  .form-control, .form-select {
    background-color: #121212 !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    color: #e2e8f0 !important;
    
    &:focus {
      background-color: #121212 !important;
      border-color: #ff8c00 !important;
      color: #e2e8f0 !important;
      box-shadow: 0 0 0 0.2rem rgba(255, 140, 0, 0.25) !important;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3) !important;
    }
  }

  .form-label {
    color: rgba(255, 255, 255, 0.8) !important;
    font-weight: 500;
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
  color: #e2e8f0;
  border: 0;

  &:hover {
    color: #ff8c00;
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