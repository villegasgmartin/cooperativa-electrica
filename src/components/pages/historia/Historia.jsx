//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../historia/Historia.css"
import HistoriaAcordeon from '../../common/HistoriaComponents/historiaAcordeon/HistoriaAcordeon';
import { Fade } from 'react-awesome-reveal';

//JSX:
const Historia = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Historia'));
  }, [dispatch]);

  return (
    <section className='historia-container'>
      <Fade triggerOnce={true} duration={1000} delay={300} direction='right'>
        <p className='historia-intro'>“Hoy nuestra entidad es la Cooperativa más antigua de Mar del Plata en actividad, sin distinción de especialidades. Es importante destacar que 17 calles o lugares públicos de la ciudad llevan el nombre de directivos o fundadores de la Cooperativa y 7 de ellos fueron elegidos, por el voto popular, intendentes del Partido de General Pueyrredon”.</p>
      </Fade>
      <div className='historia-bio-container'>
        <Fade triggerOnce={true} duration={500} delay={300}>
          <p className='historia-text'>Nuestra Cooperativa, nació en el año 1934, como producto de la reacción ante los excesos cometidos por la Compañía de Electricidad del Sud Argentino (C.E.S.A.), dependiente del grupo estadounidense A.N.S.E.C. (Andes, Norte, Sud, Este y Centro), que prestaba servicio en condiciones de abuso y onerosidad extremos, rayanos con la expoliación. Esta firma era, probablemente, controlada por la Banca Morgan.</p>
          <div className='historia-image-container historia-bacground-position'><img className='historia-image' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHc5xL0e3sqJBx3fhnIGZVdEpn2UwzuH1cJ5cQeId2-vqlZXfweyK1kzzgCwGZAJLtjX-htxa4kewu1uoL0Q-S020ZmydhAa81kF0awUTmtZHTUnEkceGeUZLSeobn0pHFhxElqZ0n7bgE/s1600/Comitiva+que+avanzo+por+Diag.+Pueyrredon+a%25C3%25B1o+1939.jpg" alt="" /></div>
        </Fade>
      </div>
      <div className='historia-bio-container' id='dark-background' >
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='historia-image-container historia-background-position'><img className='historia-image' src="https://www.essapp.coop/sites/www.essapp.coop/files/electricidad.jpg" alt="" /></div>
          <p className='historia-text' id='light-font' >Corresponde aquí recordar brevemente la historia de los sucesos ocurridos inmediatamente antes de que la Cooperativa comenzara a cumplir con su cometido –generación y distribución de electricidad- que tuvieron una trascendencia sustancialmente mayor en la comunidad, en cuanto a su capacidad de conmover y cohesionar a los marplatenses, que los relacionados con nuestra entidad durante los 90 años posteriores.</p>
        </Fade>
      </div>
      <div className='historia'>
        <Fade triggerOnce={true} duration={1000} delay={300} direction='up'><h2 className='historia-title'>Principales Hitos Históricos</h2></Fade>
        <div className='historia-accordion-container'>
          <Fade triggerOnce={true} duration={1200} delay={300} direction='up'><HistoriaAcordeon/></Fade>
        </div>
      </div>
          <section className='valores-container'>
          <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='valores-image-container'>
            <img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2017/04/icon_03.png" style={{width: "100%"}} alt="imágen de historia" />
          </div>
          <div className='valores-text-container'>
            <p className='valores-text'>Las cooperativas están basadas en los valores de:</p>
            <ul>
              <li className='valores-list'>Autoayuda</li>
              <li className='valores-list'>Auto-responsabilidad</li>
              <li className='valores-list'>Democracia</li>
              <li className='valores-list'>Igualdad</li>
              <li className='valores-list'>Equidad</li>
              <li className='valores-list'>Solidaridad</li>
            </ul>
            <p className='valores-list'>En la tradición de sus fundadores, los miembros cooperativos creen en los valores éticos de honestidad, actitud receptiva, responsabilidad social y respeto hacia los demás.</p>
          </div>
          <div className='valores-image-container'>
            <img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2017/05/valores.png" style={{width: "100%"}} alt="imágen de valores" />
          </div>
        </Fade>
      </section>
    </section>
  );
};

export default Historia;