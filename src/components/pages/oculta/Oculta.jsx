
import "../oculta/Oculta.css";
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
const Oculta = () => {
  



  return (
    <>
    <Helmet>
      <title>Promocion Asociado Nave</title>
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
          {/* <div className="navbarPages-container">
              <NavBar/>
          </div> */}
          
      </header>
      <section>
      <div className='publicidad-container' > 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <div className='image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1744644957/cooperativa/Placa_-_Descuento_extra_Mail_2_egart2.jpg" alt="publicidad" className='noticia1-image' /></div>
                    <div className='image-container-mobile'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1744648665/cooperativa/Placa_-_Descuento_extra_Mail_rjnepu.jpg" alt="publicidad" className='noticia1-image' /></div>
                </Fade>
            </div>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                <div className='publicidad-buttonContainer'>
                    <div className='noticia1-button'>
                            <Link to={"https://api.whatsapp.com/send/?phone=2235376973&text=Hola%21+Quer%C3%ADa+averiguar+sobre+NAVE+INTERNET&type=phone_number&app_absent=0"}>
                                <Button sx={{
                                    width: "100%",
                                    marginTop: "20px", 
                                    marginBottom: "50px",
                                    fontFamily: "interTight",
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                    letterSpacing: "1px",
                                    borderRadius: "50px",
                                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                                    textTransform: "none",
                                    color:"#161616",
                                    backgroundColor: "#30e691"
                                }} 
                                    variant='contained' 
                                    size='large'>Consultar</Button>
                            </Link>
                    </div>
                </div>
            </Fade>
      </section>
      <Footer/>
    </>
  );
};

export default Oculta;