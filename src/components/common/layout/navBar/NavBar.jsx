//Importaciones:
import * as React from 'react';
import { Link } from 'react-router-dom';
import logoNavbar from "../../../../assets/images/logos/logo-horizontal.png";
import logoDrawer from "../../../../assets/images/logos/logo.png";
import "../navBar/NavBar.css";
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Definición de las páginas
const pages = [
    { name: 'Internet y TV', path: '/nave' },
    {
        name: 'Servicios', path: '#', submenu: [
            { name: 'Servicio Eléctrico', path: "/servicio-electrico" },
            { name: 'Laboratorio de medidores', path: '/laboratorio-de-medidores' },
            { name: 'Biblioteca', path: '/biblioteca' },
            { name: 'AMI Mutual', path: '/AMImutual' },
            { name: 'Vittal', path: '/vittal' },
        ]
    },
    {
        name: 'Institucional', path: '#', submenu: [
            { name: 'Comunicados Institucionales', path: '/comunicados-institucionales' },
            { name: 'Consejo de Administración', path: '/consejo-de-administracion' },
            { name: 'Principios Cooperativos', path: '/principios-cooperativos' },
            { name: 'Historia', path: '/historia' },
            { name: 'Blog', path: '/Blog' }
        ]
    },
    {
        name: 'Usuarios', path: '#', submenu: [
            { name: 'Medios de pago', path: '/formas-de-pago' },
            { name: 'Consejos Útiles', path: '/consejos-utiles' },
            { name: 'Preguntas: Energía', path: '/preguntas-frecuentes' },
            { name: 'Preguntas: NAVE Internet', path: '/preguntas-nave' },
            { name: 'Tutoriales: Oficina Virtual', path: '/preguntas-nave#tutoriales-oficina' },
        ]
    },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Oficina Virtual', path: 'https://oficinavirtual-coopmdp.micoop.com.ar/v2/login', external: true },
];

const NavBar = ({ backgroundColor, backgroundColorMovile }) => {
    const [openSubMenu, setOpenSubMenu] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [openDrawerSubMenu, setOpenDrawerSubMenu] = React.useState(null);
    const drawerRef = React.useRef(null);

    // Maneja el estado de hover para los submenús
    const handleMouseEnter = (name) => setOpenSubMenu(name);
    const handleMouseLeave = () => setOpenSubMenu(null);

    // Alterna el estado del Drawer
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    // Maneja el clic fuera del Drawer para cerrarlo
    const handleClickOutside = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setDrawerOpen(false);
            setOpenDrawerSubMenu(null);
        }
    };

    // Maneja la apertura/cierre de submenús en el Drawer
    const toggleDrawerSubMenu = (name) => {
        setOpenDrawerSubMenu(prev => (prev === name ? null : name));
    };

    // Añadir o eliminar el event listener para clic fuera del Drawer
    React.useEffect(() => {
        if (drawerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drawerOpen]);

    // Renderiza el menú dentro del Drawer
    const renderDrawerMenu = () => (
        <motion.div
            className="drawer"
            style={{ backgroundColor: backgroundColorMovile }}
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.1 }}
        >
            <Fade>
                <Link to={"/"}>
                    <div className="drawer-logo">
                        <img src={logoDrawer} alt="logo cooperativa" width={"100%"} />
                    </div>
                </Link>
            </Fade>
            <div className="drawer-divider"></div>


            {/* Acordeones (submenús) */}
            <div className="drawer-accordions-container">
                {pages.filter(page => page.submenu).map((page) => (
                    <Accordion key={page.name} sx={{ backgroundColor: "transparent", boxShadow: "none",  }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                            sx={{
                                color: "white",
                                fontFamily: "interTight-medium",
                                fontSize: "18px",
                                '&:hover': { color: "#2eed8d" },
                                '&.Mui-expanded': { color: "#2eed8d" },
                                borderRadius: "5px",
                            }}
                        >
                            <span>{page.name}</span>
                        </AccordionSummary>
                        <AccordionDetails sx={{
                            backgroundColor: "white",
                            textDecoration: "none",
                            color: "black",
                            borderRadius: "15px",
                            textAlign: "center",
                            width: "190px",
                            marginLeft: "15px",
                        }}>
                            <ul>
                                {page.submenu.map((subPage) => (
                                    <li key={subPage.name} style={{ listStyle: "none", marginTop: "10px", textDecoration: "none" }}>
                                        <Link to={subPage.path} style={{ color: "black", textDecoration: "none", fontFamily: "interTight", fontSize: "18px" }}>
                                            {subPage.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
             {/* Enlaces simples (sin acordeón) */}
                <ul className="drawer-links-container">
                {pages.filter(page => !page.submenu).map((page) => (
                    <li key={page.name} className="drawer-link">
                        {page.external ? (
                            <a href={page.path} target="_blank" rel="noopener noreferrer">
                                {page.name}
                            </a>
                        ) : (
                            <Link to={page.path}>
                                {page.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );

    // Renderiza el menú de navegación en pantalla grande
    const renderNavBarMenu = () => (
        <ul className="navbar-links-container">
            {pages.map((page) => (
                <li
                    key={page.name}
                    className="navbar-link"
                    onMouseEnter={() => page.submenu && handleMouseEnter(page.name)}
                    onMouseLeave={handleMouseLeave}
                >
                    {page.external ? (
                        <a href={page.path} target="_blank" rel="noopener noreferrer">
                            {page.name}{page.submenu && <span className="arrow">▼</span>}
                        </a>
                    ) : (
                        <Link to={page.path}>
                            {page.name}{page.submenu && <span className="arrow">▼</span>}
                        </Link>
                    )}
                    {page.submenu && openSubMenu === page.name && (
                        <ul className="submenu">
                            {page.submenu.map((subPage) => (
                                <li key={subPage.name} className="submenu-item">
                                    <Link to={subPage.path}>{subPage.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <section className="navbar-container" style={{ backgroundColor }}>
            <Link to={"/"}>
                <div className="navbar-logo">
                    <img src={logoNavbar} alt="logo cooperativa" width={"100%"} />
                </div>
            </Link>
            {renderNavBarMenu()}
            <button className="hamburger" onClick={toggleDrawer}>
                ☰
            </button>
            {drawerOpen && renderDrawerMenu()}
        </section>
    );
};

export default NavBar;
