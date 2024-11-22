//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../principios/Principios.css"
import { Fade } from "react-awesome-reveal";
import Image01 from "../../../assets/images/principios/principios-01.jpg"
import Image02 from "../../../assets/images/principios/principios-02.jpg"
import Image03 from "../../../assets/images/principios/principios-03.jpg"

//JSX:
const Principios = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Principios cooperativos'));
  }, [dispatch]);

  return (
    <section className='principios-main-container'>
      <Fade  triggerOnce={true} duration={800} delay={300}>
        <p className='principios-intro'>Los principios cooperativos son las <strong>directrices</strong> mediante las que las cooperativas ponen en práctica sus <strong>valores</strong>.</p>
      </Fade>
      <div className='principios-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='principios-second-container'>
            <div className='principios-text-container'>
              <h3 className='principios-title'><span className='color-title'>1º Principio:</span> ”Membresía Abierta y Voluntaria”</h3>
              <p className='principios-description'>Cualquier persona sin discriminación de raza, género, religión o creencias podrá ser miembro mientras acepte sus responsabilidades.</p>
            </div>
            <div className='principios-text-container'>
              <h3 className='principios-title'><span className='color-title'>2º Principio:</span> ”Control Democrático de los Miembros”</h3>
              <p className='principios-description'>Por cada miembro se establece un voto.</p>
            </div>
          </div>
          <div className='principios-image-container'>
            <img className='principios-img' src={Image01} alt="imágen de principios cooperativos"/>
          </div>
        </Fade>
      </div>
      <div className='principios-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='principios-image-container principios-background-position'>
            <img className='principios-img' src={Image02} alt="imágen de principios cooperativos"/>
          </div>
          <div className='principios-second-container'>
            <div className='principios-text-container'>
              <h3 className='principios-title' id='light-font'><span className='color-title'>3º Principio:</span> “Participación Económica de los Miembros”</h3>
              <p className='principios-description' id='light-font'>Cada miembro hace aportes equitativamente y todos en conjunto determinan las decisiones sobre el capital, todo esto, en beneficio de la sociedad.</p>
            </div>
            <div className='principios-text-container'>
              <h3 className='principios-title' id='light-font'><span className='color-title'>4º Principio:</span> “Autonomía e Independencia”</h3>
              <p className='principios-description' id='light-font'>Pretenden ser organizaciones autónomas de ayuda mutua.</p>
          </div>
          </div>
        </Fade>
      </div>
      <div className='principios-container principios-padding'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='principios-second-container'>
            <div className='principios-text-container'>
              <h3 className='principios-title'><span className='color-title'>5º Principio:</span> “Educación, Entrenamiento e Información”</h3>
              <p className='principios-description'>Buscan trabajar con estructuras acordes a nivel local, regional, nacional e internacional.</p>
            </div>
            <div className='principios-text-container'>
              <h3 className='principios-title'><span className='color-title'>6º Principio:</span> “Cooperación entre Cooperativas”</h3>
              <p className='principios-description'>Buscan trabajar con estructuras acordes a nivel local, regional, nacional e internacional.</p>
            </div>
            <div className='principios-text-container'>
              <h3 className='principios-title'><span className='color-title'>7º Principio:</span> “Compromiso con la Comunidad”</h3>
              <p className='principios-description'>Constantemente está en la búsqueda de un desarrollo sostenible para la sociedad.</p>
            </div>
          </div>
          <div className='principios-image-container'>
            <img className='principios-img' src={Image03} alt="imágen de principios cooperativos"/>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Principios;