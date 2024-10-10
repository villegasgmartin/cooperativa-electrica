import { useState, useEffect, useRef } from "react";
import LogoHorizontal from "../../../../assets/images/logo-horizontal.png";
import { Link } from "react-router-dom";
// import "../navBarTest/navBarTest.css";

const NavBarTest = () => {
  const [openMenu, setOpenMenu] = useState({
    institucional: false,
    servicios: false,
    usuarios: false,
  });

  // Referencias para los submenús
  const serviciosRef = useRef(null);
  const institucionalRef = useRef(null);
  const usuariosRef = useRef(null);

  const toggleMenu = (menu) => {
    setOpenMenu((prevState) => ({
      institucional: menu === "institucional" ? !prevState.institucional : false,
      servicios: menu === "servicios" ? !prevState.servicios : false,
      usuarios: menu === "usuarios" ? !prevState.usuarios : false,
    }));
  };

  // Cerrar menús al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar el menú si el clic fue fuera de cualquiera de los submenús
      if (
        serviciosRef.current &&
        !serviciosRef.current.contains(event.target) &&
        institucionalRef.current &&
        !institucionalRef.current.contains(event.target) &&
        usuariosRef.current &&
        !usuariosRef.current.contains(event.target)
      ) {
        setOpenMenu({
          institucional: false,
          servicios: false,
          usuarios: false,
        });
      }
    };

    // Escuchar clics en cualquier parte del documento
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="navbar-container">
      <div className="logo-container">
        <img src={LogoHorizontal} width={"100%"} alt="logo de cooperativa" />
      </div>
      <ul className="link-container">
        <Link to={"/nave"}>
          <li className="navbar-link">Internet y TV</li>
        </Link>

        <li className="navbar-link" onClick={() => toggleMenu("servicios")}>
          Servicios
        </li>
        <ul
          className={`submenu ${openMenu.servicios ? "open" : ""}`}
          ref={serviciosRef}
        >
          <Link to="/servicio-electrico">
            <li>Servicio Eléctrico</li>
          </Link>
          <Link to="/laboratorio-medidores">
            <li>Laboratorio de Medidores</li>
          </Link>
          <Link to="/biblioteca">
            <li>Biblioteca</li>
          </Link>
          <Link to="/ami-mutual">
            <li>AMI Mutual</li>
          </Link>
        </ul>

        <li className="navbar-link" onClick={() => toggleMenu("institucional")}>
          Institucional
        </li>
        <ul
          className={`submenu ${openMenu.institucional ? "open" : ""}`}
          ref={institucionalRef}
        >
          <Link to="/comunicados-institucionales">
            <li>Comunicados Institucionales</li>
          </Link>
          <Link to="/consejo-administracion">
            <li>Consejo de Administración</li>
          </Link>
          <Link to="/principios-cooperativos">
            <li>Principios Cooperativos</li>
          </Link>
          <Link to="/historia">
            <li>Historia</li>
          </Link>
        </ul>

        <li className="navbar-link" onClick={() => toggleMenu("usuarios")}>
          Usuarios
        </li>
        <ul
          className={`submenu ${openMenu.usuarios ? "open" : ""}`}
          ref={usuariosRef}
        >
          <Link to="/formas-pago">
            <li>Formas y lugares de pago</li>
          </Link>
          <Link to="/consejos-utiles">
            <li>Consejos Útiles</li>
          </Link>
        </ul>

        <Link to={"/contacto"}>
          <li className="navbar-link">Contacto</li>
        </Link>
        <a
          href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li className="navbar-link">Oficina Virtual</li>
        </a>
      </ul>
    </section>
  );
};

export default NavBarTest;
