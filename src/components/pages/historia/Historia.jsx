//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../historia/Historia.css"
import HistoriaAcordeon from '../../common/HistoriaComponents/historiaAcordeon/HistoriaAcordeon';
import { Fade } from 'react-awesome-reveal';
import Image01 from "../../../assets/images/historia/historia-01.webp"
import Image02 from "../../../assets/images/historia/historia-02.webp"
import {Helmet} from "react-helmet"

//JSX:
const Historia = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Historia'));
  }, [dispatch]);

  return (
    <section className='historia-container'>
      <Helmet>
        <title>Historia</title>
      </Helmet>
      <Fade triggerOnce={true} duration={1000} delay={300}>
        <div className='historia-intro-container'>
          <p className='historia-intro'>“Hoy nuestra entidad es la Cooperativa más antigua de Mar del Plata en actividad, sin distinción de especialidades. Es importante destacar que 17 calles o lugares públicos de la ciudad llevan el nombre de directivos o fundadores de la Cooperativa y 7 de ellos fueron elegidos, por el voto popular, intendentes del Partido de General Pueyrredon”.</p>
        </div>
      </Fade>
      <div className='historia-bio-container'>
        <Fade triggerOnce={true} duration={500} delay={300} direction='right'>
          <p className='historia-text'>Nuestra Cooperativa, nació en el año 1934, como producto de la reacción ante los excesos cometidos por la Compañía de Electricidad del Sud Argentino (C.E.S.A.), dependiente del grupo estadounidense A.N.S.E.C. (Andes, Norte, Sud, Este y Centro), que prestaba servicio en condiciones de abuso y onerosidad extremos, rayanos con la expoliación. Esta firma era, probablemente, controlada por la Banca Morgan.</p>
          <div className='historia-image-container historia-bacground-position'><img className='historia-image' src={Image01} alt="historia" /></div>
        </Fade>
      </div>
      <div className='historia-bio-container' id='dark-background' >
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='historia-image-container historia-background-position'><img className='historia-image' src={Image02} alt="historia" /></div>
          <p className='historia-text' id='light-font' >Corresponde aquí recordar brevemente la historia de los sucesos ocurridos inmediatamente antes de que la Cooperativa comenzara a cumplir con su cometido –generación y distribución de electricidad- que tuvieron una trascendencia sustancialmente mayor en la comunidad, en cuanto a su capacidad de conmover y cohesionar a los marplatenses, que los relacionados con nuestra entidad durante los 90 años posteriores.</p>
        </Fade>
      </div>
      <div className='historia'>
        <Fade triggerOnce={true} duration={1000} delay={300} direction='up'><h2 className='historia-title'>Principales Hitos Históricos</h2></Fade>
        <div className='historia-accordion-container'>
          <Fade triggerOnce={true} duration={1200} delay={300} direction='up'><HistoriaAcordeon/></Fade>
        </div>
        <div className='valores-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          <p className='valores'>Las cooperativas están basadas en los valores de: <strong>AUTOAYUDA, AUTO-RESPONSABILIDAD, DEMOCRACIA, IGUALDAD, EQUIDAD Y SOLIRADIDAD</strong>. En la tradición de sus fundadores, los miembros cooperativos creen en los valores éticos de honestidad, actitud receptiva, responsabilidad social y respeto hacia los demás.</p>
        </Fade>
      </div>
      </div>
    </section>
  );
};

export default Historia;