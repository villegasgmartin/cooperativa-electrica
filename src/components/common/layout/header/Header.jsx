// Importaciones:
import "../header/Header.css";
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import { Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import NavBar from "../navBar/NavBar";


// Componente Header:
const Header = ({ title, logo, isMutual }) => {
    const [content, setContent] = useState({ title, logo });
    const [isVisible, setIsVisible] = useState(true);
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        setIsVisible(false); // Ocultar el contenido actual
        const timer = setTimeout(() => {
            setContent({ title, logo }); // Cambiar el contenido después del fade
            setIsVisible(true); // Hacer visible el nuevo contenido
            setFadeKey((prevKey) => prevKey + 1); // Forzar el re-render
        }, 100); // Tiempo de espera reducido a 400 ms

        return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
    }, [title, logo]); // Dependencias para detectar cambios

    return (
        <header className="header-main-container">
            <div className="header-contactos-container">
                <div className="header-contactos">
                    <LocationOnTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="header-contactosText">Alberti 3600, Mar del Plata</h4>
                </div>
                <div className="header-contactos">
                    <LocationOnTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
                </div>
                <div className="header-contactos" id="homePortada-tel">
                    <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
                    <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
                </div>
            </div>
            <div className="navbarPages-container">
                <NavBar backgroundColor="#12824c"/>
            </div>
            <Fade key={fadeKey} duration={800} triggerOnce={true}>
                <div className="header-title-container">
                    {content.logo ? (
                        <img
                            src={content.logo}
                            alt="Logo"
                            className={isMutual ? "header-logo-mutual" : "header-logo-nave"}
                        />
                    ) : (
                        <h1 className="header-title">{content.title}</h1>
                    )}
                </div>
            </Fade>
        </header>
    );
}

export default Header;
