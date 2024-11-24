// Importaciones:
import "../header/Header.css";
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import { Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import NavBar from "../navBar/NavBar";


// Componente Header:
const Header = ({ title}) => {
    const [content, setContent] = useState({ title});
    const [isVisible, setIsVisible] = useState(true);
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => {
            setContent({ title});
            setIsVisible(true);
            setFadeKey((prevKey) => prevKey + 1);
        }, 100);

        return () => clearTimeout(timer);
    }, [title]);

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
                <NavBar/>
            </div>
            <Fade key={fadeKey} duration={800} triggerOnce={true}>
                <h1 className="header-title">{content.title}</h1>
            </Fade>
        </header>
    );
}

export default Header;
