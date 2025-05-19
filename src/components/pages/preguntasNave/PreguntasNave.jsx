//Importaciones:
import "../preguntasNave/PreguntasNave.css"
import {Helmet} from "react-helmet"
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import { Fade } from 'react-awesome-reveal';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoNave from "../../../assets/images/logos/logo-nave-blanco.png"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import Footer from '../../common/layout/footer/Footer';
import PreguntasNaveAccordion from "../../common/PreguntasNaveComponents/preguntasNaveAccordion/PreguntasNaveAccordion";
import PreguntasNaveVideos from "../../common/PreguntasNaveComponents/preguntasNaveVideos/PreguntasNaveVideos";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';

//JSX:
const PreguntasNave = () => {
    return (
    <>
        <Helmet>
            <title>NAVE Internet</title>
        </Helmet>
        <header className="header-nave-container">
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
                <NavBar backgroundColorMovile="#201c1c" backgroundColor="#201c1c" />
            </div>
            <Fade triggerOnce={true} duration={800} delay={300}>
                <div className='header-nave'>
                <div className='header-nave-logoContainer'><img src={LogoNave} alt="NAVE Internet" className='header-nave-logo' /></div>
                <div className='header-nave-textContainer'>
                    <h1 className='header-nave-title'>Internet <span className='header-nave-resaltado'>Cooperativa</span></h1>
                    <p className='header-nave-text'>Descubre nuestras increíbles <span  className='header-nave-resaltado'>opciones de Internet y televisión</span> diseñadas para satisfacer todas tus necesidades de entretenimiento y conectividad.</p>
                </div>
                </div>
            </Fade>
        </header>
        <section className="preguntasNave-main-container">
            <PreguntasNaveAccordion/>
            <Fade triggerOnce={true} duration={800} delay={300}>
                <div className="preguntasNave-videos-container">
                    <h2 className='preguntasNave-h2'>Aprendé a usar la Oficina Virtual</h2>
                    <p className='preguntasNave-description'>En esta sección encontrarás una serie de videos tutoriales breves y prácticos que te guiarán paso a paso para realizar distintas gestiones desde la Oficina Virtual.</p>
                    <PreguntasNaveVideos/>
                </div>
            </Fade>
            <Fade triggerOnce={true} duration={800} delay={300}>
                <div className='nave-button-container'>
                    <Link to="/nave" style={{ width: '100%', textDecoration: 'none' }}>
                        <Button sx={{ 
                            width: "100%",
                            height: "50px",
                            fontFamily: "interTight",
                            marginTop: "20px",
                            fontSize: "20px",
                            letterSpacing: "1px",
                            borderRadius: "50px",
                            boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                            textTransform: "none",
                            color: "white",
                                backgroundColor: "#8048ff",
                            }} 
                            variant='contained' 
                            size='large'
                            >
                            Ver Planes
                        </Button>
                    </Link>
                </div>
            </Fade>
        </section>
        <Footer/>
        <BotonWhatsapp/>
    </>
    )
}

export default PreguntasNave