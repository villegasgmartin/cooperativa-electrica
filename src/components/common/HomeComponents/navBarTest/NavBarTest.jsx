// Importaciones
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoNavbar from "../../../../assets/images/logo-horizontal.png";
import "../navBarTest/NavBarTest.css";

// JSX
function BasicExample() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/">
          <img src={LogoNavbar} alt="logo cooperativa" className='navbar-logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/nave">Internet y TV</Nav.Link>
            <NavDropdown title="Servicios" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/servicio-electrico" id="servicio-electrico">Servicio Eléctrico</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/laboratorio-de-medidores" id="laboratorio-medidores">Laboratorio de Medidores</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/biblioteca" id="biblioteca">Biblioteca</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/AMImutual" id="ami-mutual">AMI Mutual</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Institucional" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/comunicados-institucionales" id="comunicados-institucionales">Comunicados Institucionales</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/consejo-de-administracion" id="consejo-administracion">Consejo de Administración</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/principios-cooperativos" id="principios-cooperativos">Principios Cooperativos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/historia" id="historia">Historia</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/blog" id="blog">Blog</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Usuarios" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/formas-de-pago" id="formas-pago">Formas y lugares de pago</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/consejos-utiles" id="consejos-utiles">Consejos Útiles</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target="_blank" rel="noopener noreferrer">Oficina Virtual</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
