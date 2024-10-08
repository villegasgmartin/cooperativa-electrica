//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../laboratorio/Laboratorio.css"
import LabImage01 from "../../../assets/images/laboratorio/laboratorio01.jpg"
import LabImage02 from "../../../assets/images/laboratorio/laboratorio02.jpg"
import LabImage03 from "../../../assets/images/laboratorio/laboratorio03.jpg"
import LabImage04 from "../../../assets/images/laboratorio/laboratorio04.jpg"
import { Fade } from 'react-awesome-reveal';

//JSX:
const Laboratorio = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Laboratorio de medidores'));
  }, [dispatch]);

  return (
    <section className='laboratorio-main-container'>
      <div className='laboratorio-info-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='laboratorio-image-container laboratorio-background-position'><img src={LabImage01} alt="imágen de laboratorio de medidores" className='laboratorio-image'/></div>
          <div className='laboratorio-text-container'>
            <h2 className='laboratorio-title color-title'>"LACOP"</h2>
            <p className='laboratorio-text'>“Lacop” nace el 30 de Septiembre de 2004, con el fin de desarrollar actividades de naturaleza económica, tendientes a ofrecer servicios técnicos vinculados con su objeto social, principalmente a otras cooperativas eléctricas, como así a quienes demanden sus servicios, en un verdadero espíritu abierto, participativo, y de solidaridad cooperativa.<br/>
            El propósito de dejar constituida una cooperativa de primer grado tendiente a brindar servicios de ensayo y medición de medidores de aparatos de energía eléctrica pese al breve plazo transcurrido ya ha rendido sus frutos, al haberse establecido vínculos con otras Cooperativas eléctricas localizadas en el sud-este de la Provincia de Buenos Aires, tales como las de Mar del Sur, Mar de Ajó, Camet, Coronel Vidal, Dionisia, Mechongué, Mar del Plata, San Cayetano, de la Garma, San Francisco Bellocq, Orense, Indio Rico, Laguna de los Padres, Balcarce, Madariaga, Villa Gesell, Castelli, Lezama y Maipú, etc.<br/>
            El desafío asumido, tiende a responder necesidades impuestas por un contexto económico propio del sector, como así a dar rápida respuesta a la demanda de servicios técnicos profesionalizados, sin perjuicio del apremio por optimizar costos operativos. En definitiva, se tiende a brindar, desde esta flamante entidad, una inmediata y efectiva respuesta a necesidades técnicas y a paliar, bajo esta nueva actividad la crisis de rentabilidad que viene soportando el sector de distribución de energía eléctrica.
            </p>
          </div>
        </Fade>
      </div>
      <div className='laboratorio-info-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='laboratorio-text-container'>
            <h2 className='laboratorio-title' id='light-font'><span className='color-title'>Antecedentes:</span> El Marco Eléctrico Regulatorio en la Provincia de Buenos Aires. Motivos conducentes a la creación del laboratorio.</h2>
            <p className='laboratorio-text' id='light-font'>A partir de la sanción del nuevo Marco Eléctrico Regulatorio en al ámbito de la Provincia de Buenos Aires, por ley nº 11769/96 y su decreto reglamentario 1208/97, las distribuidoras y cooperativas eléctricas deben ajustar sus prestaciones a las exigencias impuestas por el Organismo de Control de Energía de la Provincia de Buenos Aires –OCEBA-, creado por la misma ley.<br/>
            De los requerimientos impuestos por el OCEBA en el control de calidad de servicio y producto eléctrico, se instrumenta a partir de año 2002, mediante resolución 314, el control y verificación periódica de los medidores de energía en la Provincia de Buenos Aires, cuyas pautas se establecen en el “Procedimiento de verificación periódica de medidores de energía Eléctrica”. El procedimiento en sí, establece el control obligatorio de todo el parque de medidores de las distribuidoras de energía de la Provincia, a través de ensayos de muestras provenientes de lotes agrupados por marca, modelo y año de fabricación.<br/>
            Al inicio de la vigencia de la citada norma, el único laboratorio de control autorizado por el OCEBA estaba localizado en la Facultad de Ingeniería de la Universidad Nacional de La Plata, Por razones de distancia, de costos de traslado y de operatividad, el procedimiento en sí planteaba distintas dificultades a las cooperativas que debían requerir de dicho servicio.
            </p>
          </div>
          <div className='laboratorio-image-container'><img src={LabImage02} alt="imágen de laboratorio de medidores" className='laboratorio-image'/></div>
        </Fade>
      </div>
      <div className='laboratorio-info-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='laboratorio-image-container laboratorio-background-position'><img src={LabImage03} alt="imágen de laboratorio de medidores" className='laboratorio-image'/></div>
          <div className='laboratorio-text-container'>
            <p className='laboratorio-text'>
            Como resultado de esa realidad, surge entonces en el área técnica de las cooperativas de Mar del Plata, Laguna de los Padres y Dionisia la idea de constituir un laboratorio propio de ensayo y calibración de medidores, idea que es elevada a los respectivos consejos de administración para su consideración, la que por cierto es acompañada por estos últimos.<br/>
            Se realizan en consecuencia las evaluaciones económicas y técnicas del mismo, las que resultan altamente favorables a la realización del proyecto, dando nacimiento de esta manera al laboratorio.<br/>
            Es de destacar la extensa trayectoria institucional de las cooperativas que conforman el laboratorio, así como también el alto grado de capacitación alcanzado por el personal técnico especializado de las mismas, además del hecho de asumir entre las asociadas una importante inversión de capital, la mayoría destinada a la adquisición de equipamiento y elementos de uso técnico, como así a la capacitación brindada a su personal para llevar adelante el proyecto generador de nuevas fuentes de trabajo con el compromiso de mantener el alto grado participativo los principios de solidaridad y cooperación entre las mismas y la comunidad.<br/>
            La integración alcanzada por las tres cooperativas fundadoras, con raigambre en el sudeste de la Provincia de Buenos Aires, se ve plasmada en la creación de esta nueva entidad cooperativa, dentro del marco de la ley 20.337, lo que posibilitará a las asociadas generar ingresos adicionales a su actividad principal que es la distribución de energía eléctrica y contribuir a un mejor aprovechamiento de sus capacidades productivas, atento las restricciones de rentabilidad que sufre la actividad específica.
            </p>
          </div>
        </Fade>
      </div>
      <div className='laboratorio-info-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='laboratorio-text-container'>
          <h2 className='laboratorio-title' id='light-font'>Importancia del servicio técnico a prestar. <span className='color-title'>Equipamiento</span></h2>
            <p className='laboratorio-text' id='light-font'>La medición de la energía eléctrica que suministran las cooperativas distribuidoras a sus socios o clientes, es un punto de vital importancia para la economía de las mismas, que hace a la calidad y eficiencia de la correcta facturación, -en salvaguarda de los derechos del usuario-, por lo que queda de manifiesto la importancia de medir los consumos sin márgenes de error.<br/>
            El laboratorio, ubicado en calle Alberti nº 3600 de Mar del Plata, en instalaciones cedidas por la Cooperativa de Electricidad de Mar del Plata Ltda., e instrumentadas a través de un contrato de comodato, está conformado por un medidor patrón marca SCHLUMBERGER modelo SM 3050; una caja de carga marca OELEC Modelo GIT 50P3, bastidor con capacidad para cinco medidores trifásicos / monofásicos, y por accesorios necesarios. A la fecha se encuentra oficializado por el Organismo de Control conforme al expediente 722/98 Alc 134/03 “Laboratorio oficialmente autorizado”, y certificado por el Instituto Nacional de Tecnología Industrial –INTI- mediante certificado de calibración número 7228 del 11 de mayo de 2004, siendo para la verificación de medidores hasta clase 0,2.
            </p>
            <h2 className='laboratorio-title' id='light-font'><span className='color-title'>Metas</span> de capacitación al personal</h2>
            <p className='laboratorio-text' id='light-font'>Dentro de los objetivos y metas impuestas, se prevé la capacitación de recursos humanos, principalmente dirigida al personal estable de las cooperativas asociadas, y – según las posibilidades – de todas aquellas cooperativas que por razones económicas o técnicas se encuentren imposibilitadas de aplicar recursos propios, tendientes a capacitar a su personal.</p>
          </div>
          <div className='laboratorio-image-container'><img src={LabImage04} alt="imágen de laboratorio de medidores" className='laboratorio-image'/></div>
        </Fade>
      </div>
      <div className='laboratorio-final-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='laboratorio-final-content'>
            <p className='laboratoeio-final-firma'>Cooperativa de Provisión de Bienes y Servicios para Prestadores de Energía Eléctrica “LACOP” Laboratorio de ensayo y calibración de medidores Ltda.</p>
            <p className='laboratorio-final-description'>Nuestra Institución ha sido constituida bajo el marco y desarrollo de actividades relacionadas al quehacer operativo y de gestión vinculadas a una actividad específica, dentro del sector de prestación del servicio de distribución eléctrica.</p>
          </div>
          <div className='laboratorio-final-logo'><img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2017/04/icon_07.png" alt="logo de medidores" width={"100%"} /></div>
        </Fade>
      </div>
    </section>
  );
};

export default Laboratorio;