//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../principios/Principios.css"
import { Fade } from "react-awesome-reveal";
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';

//JSX:
const Principios = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Principios cooperativos'));
  }, [dispatch]);

  return (
    <section className='principios-main-container'>
      <Fade  triggerOnce={true} duration={800} delay={300}>
        <p className='principios-intro'>Los principios cooperativos son las directrices mediante las que las cooperativas ponen en práctica sus valores.</p>
      </Fade>
      <div className='principios-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='principios-text-container'>
            <h3 className='principios-title'><span className='color-title'>1º Principio:</span> ”Membresía Abierta y Voluntaria”</h3>
            <p className='principios-description'>Cualquier persona sin discriminación de raza, género, religión o creencias podrá ser miembro mientras acepte sus responsabilidades.</p>
          </div>
          <div className='principios-image-container'>
            <img className='principios-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnOVXD9RluPfPwMbgfK9C4zpbit8KFTvV_w&s" alt="imágen de principios cooperativos"/>
          </div>
        </Fade>
      </div>
      <div className='principios-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='principios-image-container' id='background-position'>
            <img className='principios-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_MXwKYL_QT8mPAYrRYUlMKNM19qQ8J9BV5A&s" alt="imágen de principios cooperativos"/>
          </div>
          <div className='principios-text-container'>
            <h3 className='principios-title' id='light-font'><span className='color-title'>2º Principio:</span> ”Control Democrático de los Miembros”</h3>
            <p className='principios-description' id='light-font'>Por cada miembro se establece un voto.</p>
          </div>
        </Fade>
      </div>
      <div className='principios-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='principios-text-container'>
            <h3 className='principios-title'><span className='color-title'>3º Principio:</span> “Participación Económica de los Miembros”</h3>
            <p className='principios-description'>Cada miembro hace aportes equitativamente y todos en conjunto determinan las decisiones sobre el capital, todo esto, en beneficio de la sociedad.</p>
          </div>
          <div className='principios-image-container'>
            <img className='principios-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IoEG27pu4I-ZfvwOso4fh5qKFfzXOG1tIA&s" alt="imágen de principios cooperativos"/>
          </div>
        </Fade>
      </div>
      <div className='principios-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='principios-image-container' id='background-position'>
            <img className='principios-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzPXPoVg0JPLiOOJHHnEMZTiTvW5TjPUzcYA&s" alt="imágen de principios cooperativos"/>
          </div>
          <div className='principios-text-container'>
            <h3 className='principios-title' id='light-font'><span className='color-title'>4º Principio:</span> “Autonomía e Independencia”</h3>
            <p className='principios-description' id='light-font'>Pretenden ser organizaciones autónomas de ayuda mutua.</p>
          </div>
        </Fade>
      </div>
      <div className='principios-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='principios-text-container'>
            <h3 className='principios-title'><span className='color-title'>5º Principio:</span> “Educación, Entrenamiento e Información”</h3>
            <p className='principios-description'>Buscan trabajar con estructuras acordes a nivel local, regional, nacional e internacional.</p>
          </div>
          <div className='principios-image-container'>
            <img className='principios-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR53dtafQnQ0SfoNMjnCZEH-r6Ba938crAaIA&s" alt="imágen de principios cooperativos"/>
          </div>
        </Fade>
      </div>
      <div className='principios-container' id='dark-background'>
        <Fade triggerOnce={true} duration={800} delay={300}>
        <div className='principios-image-container' id='background-position'>
          <img className='principios-img' src="https://pbs.twimg.com/media/CmTimK6UcAAmF3X.jpg" alt="imágen de principios cooperativos"/>
        </div>
        <div className='principios-text-container'>
          <h3 className='principios-title' id='light-font'><span className='color-title'>6º Principio:</span> “Cooperación entre Cooperativas”</h3>
          <p className='principios-description' id='light-font'>Buscan trabajar con estructuras acordes a nivel local, regional, nacional e internacional.</p>
        </div>
        </Fade>
      </div>
      <div className='principios-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='principios-text-container'>
            <h3 className='principios-title'><span className='color-title'>7º Principio:</span> “Compromiso con la Comunidad”</h3>
            <p className='principios-description'>Constantemente está en la búsqueda de un desarrollo sostenible para la sociedad.</p>
          </div>
          <div className='principios-image-container'>
            <img className='principios-img' src="https://media.licdn.com/dms/image/C4E12AQEoOEuypgjNuw/article-cover_image-shrink_720_1280/0/1571259708873?e=2147483647&v=beta&t=DkD95n8BBGUDLIcL1SXmTk8LZ0rM7RjZ8gcCFtoH7Cg" alt="imágen de principios cooperativos"/>
          </div>
        </Fade>
      </div>
      <BotonFlotante/>
    </section>
  );
};

export default Principios;