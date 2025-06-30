//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../comunicados/Comunicados.css"
import image01 from "../../../assets/images/comunicados/comunicados01.jpg"
import image02 from "../../../assets/images/comunicados/comunicados02.jpeg"
import image03 from "../../../assets/images/comunicados/comunicados03.jpg"
import image04 from "../../../assets/images/comunicados/comunicados04.jpg"
import { Fade } from "react-awesome-reveal";
import {Helmet} from "react-helmet"

//JSX:
const Comunicados = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Comunicados Institucionales'));
  }, [dispatch]);

  return (
    <section className='comunicadosPage-container'>
      <Helmet>
        <title>Comunicados Institucionales</title>
      </Helmet>
      <div className='comunicado-container padding-top'> 
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='comunicados-text-containter'>
            <h2 className='comunicados-title'><span className='color-title01'>¡Celebramos</span> la reunión de fin de año con nuestro increíble <span className='color-title01'>equipo!</span></h2>
            <p className='comunicados-description'>Participaron de la misma, el personal y los consejeros de la Cooperativa y de Nave. Gracias a cada uno por su dedicación y compromiso</p>
          </div>
          <div className='comunicados-image-container'><img src={image01} className='comunicados-image' alt="foto del comunicado" /></div>
        </Fade>
      </div>
      <div className='comunicado-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='comunicados-image-container'><img src={image02} className='comunicados-image' alt="foto del comunicado" /></div>
          <div className='comunicados-text-containter'>
            <h2 className='comunicados-title' id='light-font'>Encuentro de cierre de año en el <span className='color-title02'>Espacio 75 – ClubTri</span> .</h2>
            <ul>
              <li className='comunicados-description text-left no-padding' id='light-font'>Reconocimientos a Luis Berardo y Jorge Falcone por su trayectoria laboral</li>
              <li className='comunicados-description text-left no-padding' id='light-font'>Al Club Tri por su accionar conjunto</li>
              <li className='comunicados-description text-left no-padding' id='light-font'>A Manuel Pérez por su reciente incorporación como Gerente de la Cooperativa</li>
              <li className='comunicados-description text-left no-padding' id='light-font'>Celebramos el 89 aniversario de la Cooperativa</li>
            </ul>
          </div>
        </Fade>
      </div>
      <div className='comunicado-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='comunicados-text-containter'>
            <h2 className='comunicados-title'>El 6 de diciembre estuvimos en Azul participando de la 45° ASAMBLEA GENERAL ORDINARIA de <span className='color-title01'>FEDECOBA</span></h2>
            <p className='comunicados-description'>En esta oportunidad, se celebró el 45° ANIVERSARIO de la entidad federativa y se inauguró el CENTRO INTEGRAL COOPERATIVO (CIC)</p>
          </div>
          <div className='comunicados-image-container'><img src={image03} className='comunicados-image' alt="foto del comunicado" /></div>
        </Fade>
      </div>
      <div className='comunicado-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='comunicados-image-container'><img src={image04} className='comunicados-image' alt="foto del comunicado" /></div>
          <div className='comunicados-text-containter'>
            <h2 className='comunicados-title' id='light-font'>A partir de Noviembre de 2023, tenemos un nuevo Gerente Técnico y Comercial de nuestra Cooperativa, el Ing. <span className='color-title02'>Manuel Pérez</span>.⁣</h2>
            <p className='comunicados-description' id='light-font'>Firma el contrato con nuestro Presidente Juan Carlos Dentis y nuestros empleados le dan una cálida bienvenida.⁣</p>
          </div>
        </Fade>
      </div>
      <div className='comunicados-info-container'>
          <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='comunicados-info'>
            <h3 className='comunicados-info-title'>De nuestra consideración:</h3>
            <p className='comunicados-info-description'>Esta Cooperativa está realizando un relevamiento de <span className='comunicados-resaltado'>titularidad del servicio</span> para actualizar los registros de nuestros usuarios.</p>
            <p className='comunicados-info-description'> Es por eso que, en caso de que la factura de electricidad que recibe no se encuentre a nombre de los actuales ocupantes, o tenga datos erróneos ( dni, nombre incompleto, abreviaturas. etc) deberá comunicarse a nuestras oficinas al 4935777/4951411 o enviando un mail a <a href="mailto:comercial@coopelectmdp.com.ar" className='comunicados-links'>comercial@coopelectmdp.com.ar</a>, <a href="mailto:comercialgc@cooperativamdp.com.ar" className='comunicados-links'>comercialgc@cooperativamdp.com.ar</a> para brindarle información con los pasos a seguir y la presentación de la documentación pertinente.</p>
            <p className='comunicado-saludo'>Sin más, saludamos a Ud./s muy atentamente.-</p>
          </div>
          <div className='comunicados-info'>
            <h3 className='comunicados-info-title'>Sr. Asociado</h3>
            <p className='comunicados-info-description'>Hasta junio del año 2024 se ha detallado en su factura, por concepto <span className='comunicados-resaltado'>cuota capital</span>, un valor porcentual del costo de la energía. Con este aporte, la empresa cooperativa de la que usted forma parte, desde siempre comprometida con la comunidad en la que está inmersa, viene dando servicios como:</p>
            <ul>
              <li className='comunicados-info-description'>Internet con la mejor calidad y a precio justo. Ofrecemos FTTH, fibra óptica hasta el hogar. Los primeros en Mar del Plata, con un servicio de TV online, básico incluido.</li>
              <li className='comunicados-info-description'>La reconocida Biblioteca Julio Rateriy, ganadora Premio Hipocampo 2006.</li>
              <li className='comunicados-info-description'>Ventanilla de pagos Provincia Net.</li>
              <li className='comunicados-info-description'>Espacio 75. ClubTri. Ganador del Lobo de Mar 2018 a la Innovación Artística.</li>
            </ul>
            <p className='comunicados-info-description'>Nos ponemos a su disposición para cualquier duda, aclaración o aporte que desee hacer. Puede hacerlo por cualquiera de los canales habituales, en persona o escribiéndonos al mail <a href="mailto:consejo@coopelectmdp.com.ar"  className='comunicados-links'>consejo@coopelectmdp.com.ar</a>.</p>
            <h5 className='comunicados-gracias'>Muchas Gracias</h5>
            <h4 className='comunicados-firma'>Consejo de Administración</h4>
          </div>
        </Fade>
      </div>
    </section>

  );
};

export default Comunicados;