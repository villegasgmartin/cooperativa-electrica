//Importaciones:
import { Fade } from "react-awesome-reveal"
import "../ServicioTitularidad/ServicioTitularidad.css"
import { Link } from 'react-router-dom';

//JSX:
const ServicioTitularidad = () => {
  return (
    <Fade triggerOnce={true} duration={800} delay={100}>
        <div className='servicioComponents-container'>
          <div>
            <h2 className='servicio-title'>Cambiar la titularidad del servicio</h2>
            <p className='servicio-description'>Poné el servicio a tu nombre</p>
          </div>
          <div>
            <h3 className='servicio-subtitles'>¿Cómo realizar tu trámite?</h3>
            <p className='servicio-description'>Comunicándote a <a href="mailto:comercial@coopelectmdp.com.ar"  className='servicio-link'>comercial@coopelectmdp.com.ar</a>, <a href="mailto:comercialgc@cooperativamdp.com.ar"  className='servicio-link'>comercialgc@cooperativamdp.com.ar</a> o en nuestra oficina de atención al público.</p>
          </div>
          <div>
            <h3 className='servicio-subtitles'>¿Qué más tenés que saber?</h3>
            <p className='servicio-description'>Para realizar tu trámite, tenés que tener en cuenta el destino de tu servicio eléctrico, acreditar tu identidad con DNI, presentar documentación de posesión  y proporcionar detalles de tu vivienda, comercio u otros fines.</p>
          </div>
          <Link to="/preguntas-frecuentes#pregunta-19" className='servicio-info'>Más información</Link>
        </div>
    </Fade>
  )
}

export default ServicioTitularidad