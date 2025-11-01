import useStore from '@/core/client/hooks/store.hook';
import { useEffect } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import secureLocalStorage from 'react-secure-storage';
import styled from 'styled-components';
import notifyCart from '../zustand/notify-cart';

// Create a styled Navbar component
const StyledNavbar = styled(Navbar)`
  margin-bottom: 0; /* Remove the default margin-bottom */
`;

const NavLink = styled(Nav.Link)`
    font-weight:500;
    font-size: 13px;
    color:white;
    &:hover{
      color:orange
    }
`

const BadgeCart = styled(Badge)`
    background-color:orange !important;
    color:white;
`

function NavbarComponent() {
  const {cart_length, setQuantityCart} = notifyCart()
  const {store} = useStore()
  
  useEffect(() => {
    const cartLength = JSON.parse(secureLocalStorage.getItem("cart") as any) || [];
    const totalQuantity = cartLength.reduce((total:any, item:any) => total + item.quantity, 0);
    setQuantityCart(totalQuantity)
  }, [])

  return (
    <StyledNavbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink href="/">
            <img src={'data:image/png;base64,'+store?.contents?.[0].logo} alt="teste" width={50}/>
          </NavLink>
          <NavLink href="/" style={{paddingLeft:"20px"}}>Página Inicial</NavLink>
          <NavLink href="/shop" style={{paddingLeft:"20px"}}>Loja</NavLink>
          <Nav className="ms-auto">
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="">|</NavLink>
            <NavLink href="/cart">
              <i className='bx bx-cart' style={{fontSize:"20px"}}></i>
              <BadgeCart>{cart_length}</BadgeCart>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <hr />
    </StyledNavbar>
  );
}

export default NavbarComponent;
