//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../consejosUtiles/ConsejosUtiles.css"
import { Button } from '@mui/material';
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

//JSX:
const ConsejosUtiles = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Consejos Útiles'));
  }, [dispatch]);

  return (
    <section className='consejos-main-container'>
      <div className='consejos-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='consejos-text-container'>
            <h3 className='consejos-number'>Primer Consejo:</h3>
            <p className='consejos-text'>Recuerde cambiar la titularidad del medidor a nombre de quien usa realmente la energía, dado que el titular es el único autorizado a solicitar verificación técnica, hacer reclamos por el servicio, y toda situación que tenga que ver con el suministro de energía del domicilio.</p>
          </div>
          <div className='consejos-image-container'><img src="https://static.vecteezy.com/system/resources/previews/006/659/341/non_2x/electric-meter-power-tool-cartoon-style-for-your-design-free-vector.jpg" alt="imágen consejos útiles" className='consejos-image'/></div>
        </Fade>
      </div>
      <div className='consejos-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='consejos-image-container' id='background-position'><img src="https://static.vecteezy.com/system/resources/previews/026/562/385/non_2x/green-energy-concept-illustration-isolated-flat-cartoon-bulb-lamp-eco-electricity-saving-alternative-renewable-resources-green-leaves-logo-design-element-vector.jpg" alt="imágen consejos útiles" className='consejos-image'/></div>
          <div className='consejos-text-container'>
            <h3 className='consejos-number'>Segundo Consejo:</h3>
            <p className='consejos-text' id='light-font'>Recuerde que las tarifas argentinas son ascendentes, a mayor consumo mayor costo, por lo cual recomendamos racionalizar el uso de la energía no solo por los problemas de generación y conservación del medio ambiente que son de conocimiento popular, sino además para gastar menos al momento de abonar la energía.</p>
          </div>
        </Fade>
      </div>
      <div className='consejos-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='consejos-text-container'>
            <h3 className='consejos-number'>Tercer Consejo:</h3>
            <p className='consejos-text'>Recuerde que el uso indiscriminado de los toma múltiple función, conocidos comúnmente como zapatillas, son probables puntos de falla de su instalación y disminuyen la seguridad y confiabilidad de la misma.</p>
          </div>
          <div className='consejos-image-container'><img src="https://media.istockphoto.com/id/1171543301/es/vector/enchufe-y-enchufe-en-el-fuego-de-sobrecarga.jpg?s=612x612&w=0&k=20&c=RgYUNXLfbZ_P-Ryr7AxfjzR83k9FtJRHiWqaHjtnRDY=" alt="imágen consejos útiles" className='consejos-image'/></div>
        </Fade>
      </div>
      <div className='consejos-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='consejos-image-container' id='background-position'><img src="https://static.vecteezy.com/system/resources/previews/005/483/099/original/home-electrical-appliances-broken-microwave-damaged-device-cartoon-flat-illustration-fire-safety-vector.jpg" alt="imágen consejos útiles" className='consejos-image'/></div>
          <div className='consejos-text-container'>
            <h3 className='consejos-number'>Cuarto Consejo:</h3>
            <p className='consejos-text' id='light-font'>Conforme al Marco Regulatorio Eléctrico Provincial- Sub- Anexo D, Reglamentación para el Ejercicio de Instalaciones Eléctrica de Inmuebles AEA 90364 - Sección 771: Viviendas, oficinas y locales (unitarios), edición Marzo 2006 las instalaciones eléctricas deben estar realizadas y protegidas conforme a los lineamientos establecidos en la misma. No se reconocerá daños en electrodomésticos u otro tipo de máquina si al momento de realizar la inspección correspondiente no se encuentran las protecciones adecuadas a la norma.</p>
          </div>
        </Fade>
      </div>
      <div className='consejos-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='consejos-text-container'>
            <h3 className='consejos-number'>Quinto Consejo:</h3>
            <p className='consejos-text'>Recuerde que ante cualquier duda que surja respecto a su servicio nuestra oficina comercial ubicada en calle Alberti 3600, está abierta de lunes a viernes, excepto feriados, de 7,30 hs a 12,30 hs. No dude en consultar, le evitará problemas futuros.</p>
          </div>
          <div className='consejos-image-container'><img src="https://img.freepik.com/vector-premium/hombre-sonriente-electricista-general-pie-cerca-centralita-involucrado-mantenimiento-reparacion-cableado-electrico-ilustracion-vectorial_178650-45001.jpg" alt="imágen consejos útiles" className='consejos-image'/></div>
        </Fade>
      </div>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='consejos-logo-container'><img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2016/03/icon_04.png" alt="logo de usuarios" width={"100%"} /></div>
        </Fade>
        <Fade  triggerOnce={true} duration={800} delay={300}>
        <div className='consejos-button-container'>
            <Link to={"/preguntas-frecuentes"}>
              <Button sx={{
                  width: "100%",
                  height: "60px",
                  fontFamily: "archivo",
                  backgroundColor: "#12824c"
                }} 
                  variant='contained' 
                  size='large'
                  >Preguntas Frecuentes</Button>
            </Link>
          </div>
        </Fade>
      <BotonFlotante/>
    </section>
  );
};

export default ConsejosUtiles;