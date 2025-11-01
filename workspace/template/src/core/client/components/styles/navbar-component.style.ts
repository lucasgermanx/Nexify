import { Nav, Navbar } from "react-bootstrap";

import styled from "styled-components";

export const StyledNavbar = styled(Navbar)`
  margin-bottom: 0; /* Remove the default margin-bottom */
`;

export const NavLink = styled(Nav.Link)`
    font-weight:500;
    color:black;
    &:hover{
      color:orange
    }
`