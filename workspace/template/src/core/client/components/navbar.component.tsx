import { NavLink } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useStore from '../hooks/store.hook';
import { StyledNavbar } from './styles/navbar-component.style';

function NavbarComponent() {
  const {store} = useStore()

  return (
    <StyledNavbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink href="#link">
            <img src={'data:image/png;base64,'+store?.contents?.[0].logo} alt="teste" width={50}/>
          </NavLink>
          <NavLink href="/" style={{paddingLeft:"20px"}}>Página Inicial</NavLink>
          {/* <Nav className="me-auto">
            {categories && categories?.map((category:any)=>(
              <NavLink href={'category/'+category?.category_slug}>{category.category_icon} {category?.category}</NavLink>
            ))}
          </Nav> */}
          <Nav className="ms-auto">
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="#link">F.A.Q</NavLink>
            <NavLink href="">|</NavLink>
            <NavLink href="/cart">Carrinho</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <hr />
    </StyledNavbar>
  );
}

export default NavbarComponent;
