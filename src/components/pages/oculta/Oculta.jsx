
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
      {/* <section>
      <div className='publicidad-container' > 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <div className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                        <span className="block">Si Sos Socio y</span>
                        <span className="block">Tenés la <span className="font-bold">Cuota al Día</span>...</span>
                    </div>

                    <div className="text-2xl md:text-3xl font-semibold text-purple-800 mb-2">
                        Tenés
                    </div>

                    <div className="inline-block bg-green-400 text-purple-900 px-4 py-2 text-lg md:text-xl font-bold rounded mb-6">
                        ¡Descuento Extra!
                    </div>
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
                                    size='large'>
                                        <p>600 <span>MB</span></p>
                                        <p>$13865</p>
                                    </Button>
                            </Link>
                    </div>
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
                                    size='large'>
                                        <p>1000 <span>MB</span></p>
                                        <p>$16200</p>
                                    </Button>
                            </Link>
                    </div>
                </div>
            </Fade>
      </section> */}
          <div className="descuento-container">
      <div className="descuento-texto">
        <span>Si Sos Socio y</span>
        <span> Tenés la <strong>Cuota al Día</strong>...</span>
      </div>

      <div className="descuento-titulo">
        Tenés
      </div>

      <div className="descuento-etiqueta">
        ¡Descuento Extra!
      </div>

      <div className="descuento-botones">
        <a href="/formulario?internet=600MB" className="boton-oferta">
          <div className="boton-mb">600<span className="unidad">MB</span></div>
          <div className="boton-precio">— $13.865 —</div>
        </a>

        <a href="/formulario?internet=1000MB" className="boton-oferta">
          <div className="boton-mb">1.000<span className="unidad">MB</span></div>
          <div className="boton-precio">— $16.200 —</div>
        </a>
      </div>
      <div className="descuento-titulo2">
        Selecciona tu paquete ideal
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default Oculta;