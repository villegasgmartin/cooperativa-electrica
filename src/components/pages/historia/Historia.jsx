//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../historia/Historia.css"
import HistoriaAcordeon from '../../common/HistoriaComponents/historiaAcordeon/HistoriaAcordeon';

//JSX:
const Historia = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Historia'));
  }, [dispatch]);

  return (
    <section className='historia-container'>
      <p className='historia-intro'>“Hoy nuestra entidad es la Cooperativa más antigua de Mar del Plata en actividad, sin distinción de especialidades. Es importante destacar que 17 calles o lugares públicos de la ciudad llevan el nombre de directivos o fundadores de la Cooperativa y 7 de ellos fueron elegidos, por el voto popular, intendentes del Partido de General Pueyrredon”.</p>
      <div className='historia-bio-container'>
        <p className='historia-text'>Nuestra Cooperativa, nació en el año 1934, como producto de la reacción ante los excesos cometidos por la Compañía de Electricidad del Sud Argentino (C.E.S.A.), dependiente del grupo estadounidense A.N.S.E.C. (Andes, Norte, Sud, Este y Centro), que prestaba servicio en condiciones de abuso y onerosidad extremos, rayanos con la expoliación. Esta firma era, probablemente, controlada por la Banca Morgan.</p>
        <div className='historia-image-container'><img className='historia-image' src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHc5xL0e3sqJBx3fhnIGZVdEpn2UwzuH1cJ5cQeId2-vqlZXfweyK1kzzgCwGZAJLtjX-htxa4kewu1uoL0Q-S020ZmydhAa81kF0awUTmtZHTUnEkceGeUZLSeobn0pHFhxElqZ0n7bgE/s1600/Comitiva+que+avanzo+por+Diag.+Pueyrredon+a%25C3%25B1o+1939.jpg" alt="" /></div>
      </div>
      <div className='historia-bio-container' id='dark-background' >
        <div className='historia-image-container' id='background-position' ><img className='historia-image' src="https://www.essapp.coop/sites/www.essapp.coop/files/electricidad.jpg" alt="" /></div>
        <p className='historia-text' id='light-font' >Corresponde aquí recordar brevemente la historia de los sucesos ocurridos inmediatamente antes de que la Cooperativa comenzara a cumplir con su cometido –generación y distribución de electricidad- que tuvieron una trascendencia sustancialmente mayor en la comunidad, en cuanto a su capacidad de conmover y cohesionar a los marplatenses, que los relacionados con nuestra entidad durante los 90 años posteriores. </p>
      </div>
      <div className='historia'>
        <h2 className='historia-title'>Principales Hitos Históricos</h2>
        <div className='historia-accordion-container'>
          <HistoriaAcordeon/>
        </div>
      </div>
      <div className='valores-container'>
          <p>Las cooperativas están basadas en los valores de:</p>
          <ul>
            <li>Autoayuda</li>
            <li>Auto-responsabilidad</li>
            <li>Democracia</li>
            <li>Igualdad</li>
            <li>Equidad</li>
            <li>Solidaridad</li>
          </ul>
          <p>En la tradición de sus fundadores, los miembros cooperativos creen en los valores éticos de honestidad, actitud receptiva, responsabilidad social y respeto hacia los demás.</p>
        </div>
    </section>
  );
};

export default Historia;