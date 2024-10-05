// Importaciones de React y componentes de MUI
import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LogoNavbar from "../../../../assets/images/logo-horizontal.png"
import "../../HomeComponents/navbarHome/NavbarHome.css"

// Definición del array de páginas y submenús
const pages = [
    { name: 'INTERNET Y TV', path: '/nave' },
    { name: 'SERVICIOS', path: '#', submenu: [
        { name: 'Servicio Eléctrico', path: "/servicio-electrico" },
        { name: 'Laboratorio de medidores', path: '/laboratorio-de-medidores' },
        { name: 'Biblioteca', path: '/biblioteca' },
        { name: 'AMI Mutual', path: '/AMImutual' },
    ]},
    { name: 'INSTITUCIONAL', path: '#', submenu: [
        { name: 'Comunicados Institucionales', path: '/comunicados-institucionales' },
        { name: 'Consejo de Administración', path: '/consejo-de-administracion' },
        { name: 'Principios Cooperativos', path: '/principios-cooperativos' },
        { name: 'Historia', path: '/historia' },
        { name: 'Blog', path: '/Blog' }
    ]},
    { name: 'USUARIOS', path: '#', submenu: [
        { name: 'Formas y lugares de pago', path: '/formas-de-pago' },
        { name: 'Consejos útiles', path: '/consejos-utiles' },
    ]},
    { name: 'CONTACTO', path: '/contacto' },
    { name: 'OFICINA VIRTUAL', path: 'https://oficinavirtual-coopmdp.micoop.com.ar/v2/login', external: true },
];

// Componente de la barra de navegación
function ResponsiveAppBar() {
    // Estados para manejar la apertura de menús
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElSubMenu, setAnchorElSubMenu] = React.useState(null);
    const [selectedMenu, setSelectedMenu] = React.useState(null);

    // Función para abrir el menú de navegación
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    // Función para cerrar el menú de navegación
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Función para abrir un submenú
    const handleOpenSubMenu = (event, page) => {
        setAnchorElSubMenu(event.currentTarget);
        setSelectedMenu(page);
    };

    // Función para cerrar el submenú
    const handleCloseSubMenu = () => {
        setAnchorElSubMenu(null);
        setSelectedMenu(null);
    };

    return (
        <AppBar position="static" sx={{
            position: "absolute",
            left: "50%",
            transform: 'translateX(-50%)',
            top: "50px",
            width: '80%',
            mx: 'auto',
            borderRadius: "5px",
            backgroundColor:"#12824c" ,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: { xs: '50px', sm: '60px', md: '85px' }
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ height: "85px", justifyContent: 'space-between',}}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={"/"}>
                            <img className='logo-header'
                                src={LogoNavbar}
                                alt='logo de cooperativa eléctrica'
                            />
                        </Link>
                    </Box>
                    {/* Botones de navegación y submenús para pantallas grandes */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        {pages.map((page) => (
                            page.submenu ? (
                                <React.Fragment key={page.name}>
                                    <Button
                                        onClick={(event) => handleOpenSubMenu(event, page)}
                                        sx={{ 
                                            my: 2, 
                                            color: 'white', 
                                            display: 'block', 
                                            fontFamily: "InterTight", 
                                            fontSize: {
                                                md: "10px",
                                                lg: "13px"
                                            },
                                            '&:hover': {
                                                color: '#2eed8d',
                                                transition: '0.3s',
                                            }}}
                                    >
                                        {page.name}
                                    </Button>
                                    <Menu
                                        id={`submenu-${page.name}`}
                                        anchorEl={anchorElSubMenu}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        open={Boolean(anchorElSubMenu) && selectedMenu === page}
                                        onClose={handleCloseSubMenu}
                                    >
                                        {page.submenu.map((subItem) => (
                                            <MenuItem key={subItem.name} onClick={() => { handleCloseSubMenu(); handleCloseNavMenu(); }}>
                                                <Typography
                                                    component={Link}
                                                    to={subItem.path}
                                                    sx={{   
                                                        textAlign: 'center', 
                                                        textDecoration: 'none', 
                                                        color: 'inherit', 
                                                        fontFamily: "InterTight" }}
                                                >
                                                    {subItem.name}
                                                </Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </React.Fragment>
                            ) : page.external ? (
                                <Button
                                    key={page.name}
                                    href={page.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ 
                                        my: 2,
                                        color: 'white', 
                                        display: 'block',
                                        fontSize: {
                                            md: "10px",
                                            lg: "13px"
                                        },
                                        fontFamily: "InterTight", 
                                        '&:hover': {
                                                color: '#2eed8d',
                                                transition: '0.3s',
                                            }}}
                                >
                                    {page.name}
                                </Button>
                            ) : (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    to={page.path}
                                    onClick={handleCloseNavMenu}
                                    sx={{ 
                                        my: 2, 
                                        color: 'white', 
                                        display: 'block', 
                                        fontFamily: "InterTight", 
                                        fontSize: {
                                            md: "10px",
                                            lg: "13px"
                                        }, 
                                        '&:hover': {
                                                color: '#2eed8d',
                                                transition: '0.3s',
                                            } }}
                                >
                                    {page.name}
                                </Button>
                            )
                        ))}
                    </Box>
                    {/* Menú desplegable para pantallas pequeñas */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            sx={{paddingBottom: "35px",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                page.submenu ? (
                                    <React.Fragment key={page.name}>
                                        <MenuItem onClick={(event) => handleOpenSubMenu(event, page)}>
                                            <Typography
                                                sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit', fontFamily: "InterTight" }}
                                            >
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                        <Menu
                                            id={`submenu-${page.name}`}
                                            anchorEl={anchorElSubMenu}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            open={Boolean(anchorElSubMenu) && selectedMenu === page}
                                            onClose={handleCloseSubMenu}
                                        >
                                            {page.submenu.map((subItem) => (
                                                <MenuItem key={subItem.name} onClick={() => { handleCloseSubMenu(); handleCloseNavMenu(); }}>
                                                    <Typography
                                                        component={Link}
                                                        to={subItem.path}
                                                        sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit', fontFamily: "InterTight" }}
                                                    >
                                                        {subItem.name}
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </React.Fragment>
                                ) : page.external ? (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography
                                            component="a"
                                            href={page.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit', fontFamily: "InterTight" }}
                                        >
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ) : (
                                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                        <Typography
                                            component={Link}
                                            to={page.path}
                                            sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit', fontFamily: "InterTight" }}
                                        >
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                )
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;