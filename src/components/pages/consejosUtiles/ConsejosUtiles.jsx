//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../consejosUtiles/ConsejosUtiles.css"
import { Button } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import Image01 from "../../../assets/images/consejos/consejo-01.jpg"
import Image02 from "../../../assets/images/consejos/consejo-02.jpg"
import Image03 from "../../../assets/images/consejos/consejo-03.jpg"
import Image04 from "../../../assets/images/consejos/consejo-04.jpg"
import Image05 from "../../../assets/images/consejos/consejo-05.jpg"
import {Helmet} from "react-helmet"

//JSX:
const ConsejosUtiles = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Consejos Útiles'));
  }, [dispatch]);

  return (
    <section className='consejos-main-container'>
      <Helmet>
        <title>Consejos Útiles</title>
      </Helmet>
      <div className='consejos-container consejos-padding'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='consejos-text-container'>
            <h3 className='consejos-title-01'>Primer Consejo:</h3>
            <p className='consejos-text'>Recuerde cambiar la titularidad del medidor a nombre de quien usa realmente la energía, dado que el titular es el único autorizado a solicitar verificación técnica, hacer reclamos por el servicio, y toda situación que tenga que ver con el suministro de energía del domicilio.</p>
          </div>
          <div className='consejos-image-container'><img src={Image01} alt="imágen consejos útiles" className='consejos-image'/></div>
        </Fade>
      </div>
      <div className='consejos-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='consejos-image-container consejos-background-position'><img src={Image02} alt="imágen consejos útiles" className='consejos-image'/></div>
          <div className='consejos-text-container'>
            <h3 className='consejos-title-02'>Segundo Consejo:</h3>
            <p className='consejos-text' id='light-font'>Recuerde que las tarifas argentinas son ascendentes, a mayor consumo mayor costo, por lo cual recomendamos racionalizar el uso de la energía no solo por los problemas de generación y conservación del medio ambiente que son de conocimiento popular, sino además para gastar menos al momento de abonar la energía.</p>
          </div>
        </Fade>
      </div>
      <div className='consejos-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='consejos-text-container'>
            <h3 className='consejos-title-01'>Tercer Consejo:</h3>
            <p className='consejos-text'>Recuerde que el uso indiscriminado de los toma múltiple función, conocidos comúnmente como zapatillas, son probables puntos de falla de su instalación y disminuyen la seguridad y confiabilidad de la misma.</p>
          </div>
          <div className='consejos-image-container'><img src={Image03} alt="imágen consejos útiles" className='consejos-image'/></div>
        </Fade>
      </div>
      <div className='consejos-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='consejos-image-container consejos-background-position'><img src={Image04} alt="imágen consejos útiles" className='consejos-image'/></div>
          <div className='consejos-text-container'>
            <h3 className='consejos-title-02'>Cuarto Consejo:</h3>
            <p className='consejos-text' id='light-font'>Conforme al Marco Regulatorio Eléctrico Provincial- Sub- Anexo D, Reglamentación para el Ejercicio de Instalaciones Eléctrica de Inmuebles AEA 90364 - Sección 771: Viviendas, oficinas y locales (unitarios), edición Marzo 2006 las instalaciones eléctricas deben estar realizadas y protegidas conforme a los lineamientos establecidos en la misma. No se reconocerá daños en electrodomésticos u otro tipo de máquina si al momento de realizar la inspección correspondiente no se encuentran las protecciones adecuadas a la norma.</p>
          </div>
        </Fade>
      </div>
      <div className='consejos-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='consejos-text-container'>
            <h3 className='consejos-title-01'>Quinto Consejo:</h3>
            <p className='consejos-text'>Recuerde que ante cualquier duda que surja respecto a su servicio nuestra oficina comercial ubicada en calle Alberti 3600, está abierta de lunes a viernes, excepto feriados, de 7,30 hs a 12,30 hs. No dude en consultar, le evitará problemas futuros.</p>
          </div>
          <div className='consejos-image-container'><img src={Image05} alt="imágen consejos útiles" className='consejos-image'/></div>
        </Fade>
      </div>
        <Fade  triggerOnce={true} duration={800} delay={300} direction='up'>
          <div className='consejos-button-container'>
            <div className='consejos-button'>
                <Link to={"/preguntas-frecuentes"}>
                <Button sx={{
                            width: "100%", 
                            height: "100%",
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
                            size='large'>Preguntas Frecuentes
                            </Button>
                </Link>
              </div>
          </div>
        </Fade>
    </section>
  );
};

export default ConsejosUtiles;