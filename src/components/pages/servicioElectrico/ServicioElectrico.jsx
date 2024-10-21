import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Button } from '@mui/material';
import "../servicioElectrico/ServicioElectrico.css";
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';     
import AccordionSummary from '@mui/joy/AccordionSummary';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

const ServicioElectrico = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    dispatch(setTitle('Servicio Eléctrico'));

    const modalShown = sessionStorage.getItem('modalShown');
    if (!modalShown) {
      setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('modalShown', 'true'); 
      }, 1000); 
    }
  }, [dispatch]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className='servicio-main-container'>
      {isModalOpen && (
        <div className='guardia-modal-overlay'>
          <div className='guardia-modal-content'>
            <h4 className='guardia-modal-title'>Estimados usuarios:</h4>
            <p className='guardia-modal-description'>A partir del día lunes 20 de Mayo estaremos realizando una Obra de tendido subterráneo por Avenida Colón entre las calles Salta y España.</p>
            <p className='guardia-modal-description'>Sepan disculpar las molestias ocasionadas.</p>
            <Button 
              variant="contained" 
              onClick={closeModal}
              sx={{
                backgroundColor: "#12824c",
                marginTop: '20px',
                fontFamily: "archivo"
              }}>
              Cerrar
            </Button>
          </div>
        </div>
      )}
      <div className='servicio-accordion-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <AccordionGroup variant='soft' size='lg'>
            <Accordion>
              <AccordionSummary>NUEVO CUADRO TARIFARIO PARA CONSUMOS A PARTIR DEL 01/02/2024</AccordionSummary>
              <AccordionDetails>
                <div className='servicio-accordion-details'>
                  <p className='servicio-accordion-content'>Con fecha 23/2/24 se publicó en Boletín Oficial la Res. 198/24 del MIySP...</p>
                  <a href="https://www.cooperativamdp.com.ar/wp-content/uploads/2024/03/Incrementos-tarifarios-febrero-24-Res.-198-24.pdf" target='_blank'>
                    <Button sx={{
                      height: "60px",
                      fontFamily: "archivo",
                      backgroundColor: "#12824c"
                    }} 
                      variant='contained' 
                      size='large'>
                      Leer el Documento
                    </Button>
                  </a>
                </div>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </Fade>
        </div>
          <div className='servicio-usuarios'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
              <div className='servicio-usuarios-text'>
                <h3 className='servicio-usuarios-title'>Sres. Usuarios:</h3>
                <p className='servicio-usuarios-description'>Por Res. Oceba N° 167/18, la <span className='resaltado'>falta de pago</span> de cualquier concepto ajeno al precio de la energía consumida por el usuario y los cargos que correspondan de acuerdo al primer párrafo del presente artículo, no podrán constituir causal de incumplimiento habilitante para la interrupción o desconexión del suministro a dicho usuario (Art. 78 de la Ley 11769).</p>
              </div>
              <div className='servicio-image-container'><img src="https://cdn.prod.website-files.com/64cb8feadae4f2e5a069eb86/64d496b7f051c502a51c450e_Set%20Reminders%20on%20WhatsApp%20with%20EazyBe%20Chrome%20Extension.png" alt="imágen de aviso" className='servicio-image'/></div>
            </Fade>
          </div>
          <div className='servicio-usuarios'id='dark-background'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
              <div className='servicio-image-container servicio-background-position' ><img src="https://www.enel.cl/content/dam/enel-cl/es/personas/informacion-de-utilidad/que-hace-enel-ante-un-corte-de-luz/08.png" alt="imágen de aviso" className='servicio-image' /></div>
              <div className='servicio-usuarios-text'>
                <h3 className='servicio-usuarios-title'id='light-font'>Sres. Usuarios:</h3>
                <p className='servicio-usuarios-description' id='light-font'>En caso de <span className='resaltado2'>corte de servicio por falta de pago</span>, si abonan el valor de la reconexión por transferencia o depósito, <span className='resaltado2'>dicha reconexión de servicio se hará efectiva una vez que se acredite el pago en nuestros bancos‼️.</span>
                  Recuerde enviar el comprobante de pago por mail indicando el N° de asociado, como indican las instrucciones.Muchas gracias.</p>
              </div>
            </Fade>
          </div>
          <div className='servicio-usuarios'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
              <div className='servicio-usuarios-text'>
                <h3 className='servicio-usuarios-title'>Sres. Usuarios Residenciales y Tarifa Social:</h3>
                <p className='servicio-usuarios-description'>A los efectos de <span className='resaltado'>mantener los subsidios</span>, los usuarios deben realizar la presentación de la Declaración Jurada a través de la página web <strong><a className='servicio-enlace' href="https://www.argentina.gob.ar/subsidios">www.argentina.gob.ar/subsidios.</a></strong> En caso de no presentarla, estarán en condiciones de perder dicho beneficio.
                  Usted puede consultar por su inclusión en la Tarifa Social en la página web del Organismo de Control de Energía Eléctrica de la Pcia de Buenos Aires: <strong><a className='servicio-enlace' href="https://oceba.gba.gov.ar/tarifa_social/pordni">oceba.gba.gov.ar/tarifa_social/pordni</a></strong></p>
              </div>
              <div className='servicio-image-container'><img src="https://www.jotform.com/blog/wp-content/uploads/2018/12/New-feature-reminder-email-blog-00B894-700x424.png?3.3.57079" alt="imágen de aviso" className='servicio-image'/></div>
            </Fade>
          </div>
            <div className='servicio-info-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='servicio-info'>
              <h3 className='servicio-info-title'>Datos Identificatorios</h3>
              <ul>
                <li className='servicio-info-text'><strong>Denominación de la entidad: </strong>Cooperativa de Provisión de Electricidad, Servicios Públicos, y Vivienda de Mar del Plata Ltda.</li>
                <li className='servicio-info-text'><strong>Fecha de fundación: </strong>8 de noviembre de 1934.</li>
                <li className='servicio-info-text'><strong>Matrícula Nacional (I.N.A.E.S.): </strong>543.</li>
                <li className='servicio-info-text'><strong>Matrícula Provincial (I.P.A.C.): </strong>1410.</li>
                <li className='servicio-info-text'><strong>Sede legal y administrativa: </strong>Alberti 3600. Mar del Plata. Partido de General Pueyrredon. Provincia de Buenos Aires. • Código Postal: 7600.</li>
                <li className='servicio-info-text'><strong>C.U.I.T.: </strong>30-54569450-2.</li>
                <li className='servicio-info-text'><strong>Teléfonos: </strong>(0223) 495-1411 / 493-5777</li>
                <li className='servicio-info-text'><strong>E-mails: </strong>consejo@coopelectmdp.com.ar / comercial@coopelectmdp.com.ar</li>
                <li className='servicio-info-text'><strong>Sitio web: </strong>www.cooperativamdp.com.ar</li>
                <li className='servicio-info-text'><strong>Actividad principal: </strong>Distribución de energía eléctrica.</li>
              </ul>
            </div>
            <div className='servicio-infoYButton-container'>
              <div className='servicio-info'>
                <h3 className='servicio-info-title'>Servicios Principales</h3>
                <p className='servicio-info-text'>Nuestra Cooperativa brinda en la actualidad a sus asociados los siguientes servicios:</p>
                <ul>
                  <li className='servicio-info-text'>Distribución de electricidad a aproximadamente 5000 usuarios.</li>
                  <li className='servicio-info-text'>Biblioteca.</li>
                  <li className='servicio-info-text'>Espacio 75, ahora en Concesión a Club TRI.</li>
                  <li className='servicio-info-text'>Internet por Fibra Óptica "Nave Internet Cooperativa".</li>
                </ul>
              </div>
              <div className='servicio-buttonContainer'>
                <Link to={"/preguntas-frecuentes"}>
                  <Button sx={{
                    width: "100%", 
                    height: "60px",
                    fontFamily: "archivo",
                    backgroundColor: "#12824c"
                  }} 
                    variant='contained' 
                    size='large'>Preguntas Frecuentes
                    </Button>
                </Link>
                <Link to={"/objetivos-sociales"}>
                  <Button sx={{
                    width: "100%", 
                    height: "60px",
                    fontFamily: "archivo",
                    backgroundColor: "#12824c"
                  }} 
                    variant='contained' 
                    size='large'>Objetivos Sociales</Button>
                </Link>
              </div>
            </div>
        </Fade>
        </div>
    </section>
  );
};

export default ServicioElectrico;