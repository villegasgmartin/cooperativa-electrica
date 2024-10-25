//Importaciones:
import * as React from 'react';
import { Link } from 'react-router-dom';
import logoNavbar from "../../../../assets/images/logo-horizontal.png";
import logoDrawer from "../../../../assets/images/logo.png";
import "../navBarTest/NavBarTest.css";
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';


//JSX:
const pages = [
    { name: 'Internet y TV', path: '/nave' },
    {
        name: 'Servicios', path: '#', submenu: [
            { name: 'Servicio Eléctrico', path: "/servicio-electrico" },
            { name: 'Laboratorio de medidores', path: '/laboratorio-de-medidores' },
            { name: 'Biblioteca', path: '/biblioteca' },
            { name: 'AMI Mutual', path: '/AMImutual' },
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
            { name: 'Consejos útiles', path: '/consejos-utiles' },
        ]
    },
    { name: 'Contacto', path: '/contacto' },
    { name: 'Oficina Virtual', path: 'https://oficinavirtual-coopmdp.micoop.com.ar/v2/login', external: true },
];

const NavBarTest = ({ backgroundColor }) => {
    const [openSubMenu, setOpenSubMenu] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [openDrawerSubMenu, setOpenDrawerSubMenu] = React.useState(null);
    const drawerRef = React.useRef(null);
    const submenuRef = React.useRef(null);

    const handleMouseEnter = (name) => {
        setOpenSubMenu(name);
    };

    const handleMouseLeave = () => {
        setOpenSubMenu(null);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const toggleDrawerSubMenu = (name) => {
        // Alterna el estado del submenú
        setOpenDrawerSubMenu((prev) => (prev === name ? null : name));
    };

    const handleClickOutside = (event) => {
        // Cierra el Drawer si se hace clic fuera de él
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setDrawerOpen(false);
            setOpenDrawerSubMenu(null); // Cierra el submenú al hacer clic fuera
        }

        // Cierra el submenú si se hace clic fuera de él
        if (submenuRef.current && !submenuRef.current.contains(event.target)) {
            setOpenDrawerSubMenu(null);
        }
    };

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

    return (
        <section className="navbar-container" style={{backgroundColor}}>
            <Link to={"/"}>
                <div className="navbar-logo">
                    <img src={logoNavbar} alt="logo cooperativa" width={"100%"} />
                </div>
            </Link>
            <ul className="navbar-links-container">
                {pages.map((page) => (
                    <li
                        key={page.name}
                        className="navbar-link"
                        onMouseEnter={() => page.submenu && handleMouseEnter(page.name)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {page.external ? (
                            <a href={page.path} target="_blank" rel="noopener noreferrer">{page.name}{page.submenu && <span className="arrow">▼</span>}</a>
                        ) : (
                            <Link to={page.path}>{page.name}{page.submenu && <span className="arrow">▼</span>}</Link>
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
            <button className="hamburger" onClick={toggleDrawer}>
                ☰
            </button>
            {drawerOpen && (
                <motion.div
                    className="drawer"
                    style={{backgroundColor}}
                    ref={drawerRef}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'tween', duration: 0.1 }}
                >
                    <Fade>
                        <div className="drawer-logo">
                            <img src={logoDrawer} alt="logo cooperativa" width={"100%"} />
                        </div>
                    </Fade>
                    <div className="drawer-divider"></div>
                    <ul className="drawer-links-container">
                        {pages.map((page) => (
                            <li
                                key={page.name}
                                className={`drawer-link ${openDrawerSubMenu === page.name ? 'open' : ''}`}
                                onClick={() => toggleDrawerSubMenu(page.name)} // Alterna el submenú
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
                                {page.submenu && (
                                    <ul className={`submenu ${openDrawerSubMenu === page.name ? 'open' : ''}`} ref={submenuRef}>
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
                </motion.div>
            )}
        </section>
    );
};

export default NavBarTest;
