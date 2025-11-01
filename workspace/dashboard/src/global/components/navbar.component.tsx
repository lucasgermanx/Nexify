import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";

import { Store } from "@/core/client/providers/store/store-provider.types";
import { useStore } from "@/core/client/providers/store/store.provider";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";
import { useManageStore } from "../../core/client/hooks/select-store-zuustand";
import SelectGroup from "./select-group.component";

const NavLink = styled(Nav.Link)`
  color: black;
  font-weight: 400;
  font-size: 14px;
  &:hover {
    color: #ff9a36;
    transition: color 0.6s ease;
  }
`;

function convertToOptionsArray(stores: Store[] | undefined) {
  if (stores == undefined) {
    return [];
  }
  return stores?.map((store) => ({
    value: store.store_reference,
    label: store.store_name,
  }));
}

function NavbarComponent({ title, buttonText, buttonAction, buttonAction2, buttonText2 }: any) {
  const { stores } = useStore();
  const options = convertToOptionsArray(stores);
  const {store_reference, setStoreReference} = useManageStore()
  
  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <h4 className="mt-2">
            <strong>{title}</strong>
          </h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {options && (
              <>
                <NavLink className="mt-1">
                  <SelectGroup options={options} onChange={((e:any)=>{setStoreReference(e.target.value)})} defaultValue={store_reference}/>
                </NavLink>
              </>
            )}
            {buttonText && buttonAction && (
              <NavLink className="mt-1">
                <ButtonTransparent onClick={buttonAction}>
                  <strong>{buttonText}</strong>
                </ButtonTransparent>
              </NavLink>
            )}
            {buttonText2 && buttonAction2 && (
              <NavLink className="mt-1">
                <ButtonOrange onClick={buttonAction2}>
                  {buttonText2}
                </ButtonOrange>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
