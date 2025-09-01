
import "../oculta-vittal/Oculta-Vittal.css";
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import {Helmet} from "react-helmet"
// import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';


//JSX:
const OcultaVittal = () => {
  



  return (
    <>
    <Helmet>
      <title>Promocion Vittal</title>
      <meta name="robots" content="noindex"/>
      <meta name="googlebot" content="noindex"/>

    </Helmet>
    <header className="header-container">
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
          
      </header>
          <div className="descuento-container">
      <div className="descuento-texto">
        <img className="vittal-img" src="/assets/FOLLETO_VITTAL_page-0001_u8alb8.jpg" alt="" />
      </div>

      <div className="descuento-botones">
        <a href="/vittal" className="boton-oferta">
          <div className="boton-mb">Consulta Ahora</div>
         
        </a>
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default OcultaVittal;