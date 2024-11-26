//Importaciones:
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Button } from '@mui/material';
import "../servicioElectrico/ServicioElectrico.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import Image01 from "../../../assets/images/servicio-electrico/servicio-electrico-01.jpg"
import Image02 from "../../../assets/images/servicio-electrico/servicio-electrico-02.jpg"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Helmet} from "react-helmet"

//JSX:
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
      <Helmet>
        <title>Servicio Eléctrico</title>
      </Helmet>
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
                  width: "180px",
                  marginTop: "20px", 
                  fontFamily: "interTight",
                  fontSize: "25px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  borderRadius: "50px",
                  boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                  textTransform: "none",
                  color:"#161616",
                  backgroundColor: "#30e691",
                  marginBottom: "20px"
          }}>
              Cerrar
            </Button>
          </div>
        </div>
      )}
      <div className='servicio-first-container'>
        <div className='servicio-accordion-container'>
          <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
              <Accordion sx={{
                borderRadius: "50px !important" 
              }}>
                <AccordionSummary sx={{
                  backgroundColor: "#30e691",
                  borderRadius: "50px"
                }} expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "50px"}}/>}><span className='servicio-accordion-content'>Nuevo cuadro tarifario para consumos a partir del 01/02/2024</span></AccordionSummary>
                <AccordionDetails>
                  <div className='servicio-accordion-detailsContainer'>
                    <p className='servicio-accordion-details'>Con fecha 23/2/24 se publicó en Boletín Oficial la Res. 198/24 del MIySP que traslada los precios mayoristas de la energía aprobados por Res. 07/24 de la Secretaria de Energía de la Nación, publicada el pasado 07/02/24. En primer término, se informa que se mantienen los segmentos tarifarios N1, N2 (equiparable en costos a la tarifa social) y N3.
                      Para los segmentos residenciales de menores ingresos (N2) y de ingresos medios (N3) de menos de 400 kWh/mes, no se modificaron los precios por lo que permanecen vigentes los valores aplicados hasta la última factura.
                      Lo mismo sucede con los usuarios de Tarifa Social y Clubes de Barrio. Para el resto de los segmentos, es decir, los usuarios residenciales de mayores ingresos (N1), los de ingresos medios de más de 400 kWh/mes y los NO residenciales, se les aplica el precio de la energía SIN SUBSIDIO.
                      En el caso de los usuarios T2 y T3 los incrementos promedian el 140%. Reiteramos, tal como lo hicimos en comunicado anterior que estas tarifas son de aplicación a los consumos a partir del 1/2/24 por lo cual se verán reflejadas en la factura del período 02/24.
                      Consejo de Administración.</p>
                    <a href="https://www.cooperativamdp.com.ar/wp-content/uploads/2024/03/Incrementos-tarifarios-febrero-24-Res.-198-24.pdf" target='_blank'>
                    <Button sx={{
                        width: "100%", 
                        height: "100%",
                        fontFamily: "interTight",
                        fontSize: "25px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        borderRadius: "50px",
                        boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                        textTransform: "none",
                        color:"white",
                        backgroundColor: "#8048ff",
                        marginBottom: "20px"
                      }} 
                        variant='contained' 
                        size='large'>Leer el documento
                        </Button>
                    </a>
                  </div>
                </AccordionDetails>
              </Accordion>
          </Fade>
          </div>
          <div className='servicio-usuarios' id='servicio-usuarios-gap'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
              <div className='servicio-usuarios-text'>
                <h3 className='servicio-usuarios-title'>Sres. Usuarios:</h3>
                <p className='servicio-usuarios-description'>Por <strong>Res. Oceba N° 167/18</strong>, la falta de pago de cualquier concepto ajeno al precio de la energía consumida por el usuario y los cargos que correspondan de acuerdo al primer párrafo del presente artículo, no podrán constituir causal de incumplimiento habilitante para la interrupción o desconexión del suministro a dicho usuario (Art. 78 de la Ley 11769).</p>
              </div>
              <div className='servicio-image-container'><img src={Image01} alt="imágen de aviso" className='servicio-image01'/></div>
            </Fade>
          </div>
          <div>
            <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
            <p className='servicio-corte'>En caso de corte de servicio por falta de pago, si abonan el valor de la reconexión por transferencia o depósito, dicha reconexión de servicio se hará efectiva una vez que se acredite el pago en nuestros bancos.
            <strong> Recuerde enviar el comprobante de pago por mail indicando el N° de asociado</strong>, como indican las instrucciones. Muchas gracias.</p>
            </Fade>
          </div>
          <div className='servicio-usuarios'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
            <div className='servicio-image-container'><img src={Image02} alt="imágen de aviso" className='servicio-image02'/></div>
              <div className='servicio-usuarios-text'>
                <h3 className='servicio-usuarios-title'>Usuarios Residenciales y Tarifa Social:</h3>
                <p className='servicio-usuarios-description'>A los efectos de mantener los subsidios, los usuarios deben realizar la presentación de la Declaración Jurada a través de la página web <a className='servicio-enlace' href="https://www.argentina.gob.ar/subsidios">www.argentina.gob.ar/subsidios.</a> En caso de no presentarla, estarán en condiciones de perder dicho beneficio.
                  Usted puede consultar por su inclusión en la Tarifa Social en la página web del Organismo de Control de Energía Eléctrica de la Pcia de Buenos Aires: <a className='servicio-enlace' href="https://oceba.gba.gov.ar/tarifa_social/pordni">oceba.gba.gov.ar/tarifa_social/pordni</a></p>
              </div>
            </Fade>
          </div>
      </div>
          <div className='servicio-info-container'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
              <h2 className='servicio-info-title'>Datos Identificatorios</h2>
                <div className='servicio-list-container'>
                  <ul>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Denominación de la entidad: </spam>Cooperativa de Provisión de Electricidad, Servicios Públicos, y Vivienda de Mar del Plata Ltda.</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Fecha de fundación: </spam>8 de noviembre de 1934.</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Matrícula Nacional (I.N.A.E.S.): </spam>543.</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Matrícula Provincial (I.P.A.C.): </spam>1410.</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Sede legal y administrativa: </spam>Alberti 3600. Mar del Plata. Partido de General Pueyrredon. Provincia de Buenos Aires.</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Código Postal: </spam>7600.</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">C.U.I.T.: </spam>30-54569450-2.</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Teléfonos: </spam>(0223) 495-1411 / 493-5777</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">E-mails: </spam>consejo@coopelectmdp.com.ar / comercial@coopelectmdp.com.ar</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Sitio web: </spam>www.cooperativamdp.com.ar</li>
                      <li className='servicio-info-text'><spam className="servicio-dataName">Actividad principal: </spam>Distribución de energía eléctrica.</li>
                    </ul>
                </div>
            </Fade>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
              <h2 className='servicio-info-title2'>Servicios Principales</h2>
              <p className='servicio-info-description'>Nuestra Cooperativa brinda en la actualidad a sus asociados los siguientes servicios:</p>
                <div className='servicio-list-container2'>
                  <ul>
                      <li className='servicio-info-text2'><ArrowRightAltIcon sx={{
                        fontSize: "40px",
                        color: "#30e691",
                      }}/><strong>Distribución de electricidad a aproximadamente 5000 usuarios.</strong></li>
                      <li className='servicio-info-text2'><ArrowRightAltIcon sx={{
                        fontSize: "40px",
                        color: "#30e691",
                      }}/><strong>Biblioteca.</strong></li>
                      <li className='servicio-info-text2'><ArrowRightAltIcon sx={{
                        fontSize: "40px",
                        color: "#30e691",
                      }}/><strong>Espacio 75, ahora en Concesión a Club TRI.</strong></li>
                      <li className='servicio-info-text2'><ArrowRightAltIcon sx={{
                        fontSize: "40px",
                        color: "#30e691",
                      }}/><strong>Internet por Fibra Óptica "Nave Internet Cooperativa".</strong></li>
                  </ul>
                </div>
            </Fade>
              <div className='servicio-buttonContainer'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                  <div className='servicio-button'>
                    <Link to={"/preguntas-frecuentes"}>
                      <Button sx={{
                        width: "100%", 
                        height: "100%",
                        fontFamily: "interTight",
                        fontSize: "25px",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        borderRadius: "50px",
                        boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                        textTransform: "none",
                        color:"#161616",
                        backgroundColor: "#30e691"
                      }} 
                        variant='contained' 
                        size='large'>Preguntas Frecuentes
                        </Button>
                    </Link>
                  </div>
                </Fade>
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                  <div className='servicio-button'>
                  <Link to={"/objetivos-sociales"}>
                    <Button sx={{
                      width: "100%", 
                      height: "100%",
                      fontFamily: "interTight",
                      fontSize: "25px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      borderRadius: "50px",
                      boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                      textTransform: "none",
                      color:"#161616",
                      backgroundColor: "#30e691"
                    }} 
                      variant='contained' 
                      size='large'>Objetivos Sociales</Button>
                  </Link>
                  </div>
                </Fade>
              </div>
          </div>
    </section>
  );
};

export default ServicioElectrico;