// Importaciones:
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import PowerIcon from '@mui/icons-material/Power';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet"
import "../servicioElectrico/ServicioElectrico.css";
import ServicioConexion from '../../common/ServicioComponents/ServicioConexion/ServicioConexion'
import ServicioTitularidad from '../../common/ServicioComponents/ServicioTitularidad/ServicioTitularidad';
import ServicioReconexion from '../../common/ServicioComponents/ServicioReconexion/ServicioReconexion';
import ServicioBaja from '../../common/ServicioComponents/ServicioBaja/ServicioBaja';
import ServicioReclamos from '../../common/ServicioComponents/ServicioReclamos/ServicioReclamos';
import ServicioFacturas from '../../common/ServicioComponents/ServicioFacturas/ServicioFacturas';
import ServicioInfo from '../../common/ServicioComponents/ServicioInfo/ServicioInfo';
import ServicioEdificios from '../../common/ServicioComponents/ServicioEdificios/ServicioEdificios';
import ServicioUsuarios from '../../common/ServicioComponents/ServicioUsuarios/ServicioUsuarios';
import { Fade } from "react-awesome-reveal";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useLocation } from 'react-router-dom';
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import { Button } from '@mui/material';

//JSX:
const ServicioElectrico = () => {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(null);

  const menuItemsInitial = [
    { name: "Oficina Virtual", link: "https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" },
    { name: "Cuadro Tarifario", link: "https://oceba.gba.gov.ar/nueva_web/s.php?i=17" },
    { name: "Reglamento", link: "https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" },
    { name: "Preguntas Frecuentes", to: "/preguntas-frecuentes" },
    { name: "Edificios", onClick: () => setSelectedButton("edificios") },
    { name: "Medianos y grandes usuarios", onClick: () => setSelectedButton("usuarios") },
    { name: "Objetivos Sociales", to: "/objetivos-sociales" },
  ];

  const menuItemsExpanded = [
    { name: "Conexión de servicio", onClick: () => setSelectedButton("conexion") },
    { name: "Cambio de titularidad", onClick: () => setSelectedButton("titularidad") },
    { name: "Reconexión", onClick: () => setSelectedButton("reconexion") },
    { name: "Dar de baja el servicio", onClick: () => setSelectedButton("baja") },
    { name: "Reclamos", onClick: () => setSelectedButton("reclamos") },
    { name: "Factura", onClick: () => setSelectedButton("factura") },
    { name: "Canales de contacto", to: "/contacto" },
    { name: "Medios de pago", to: "/formas-de-pago" },
    { name: "Más sobre tu servicio", onClick: () => setSelectedButton("servicio") }
  ];

  useEffect(() => {
    dispatch(setTitle('Servicio Eléctrico'));
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedParam = params.get('selected');
    if (selectedParam) {
      setSelectedButton(selectedParam);
    }
  }, [location.search]);

  return (
    <section className='servicio-main-container'>
      <Helmet>
        <title>Servicio Eléctrico</title>
      </Helmet>
      <div className='servicio-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left' className='servicio-list-desktop'>
          <div>
            <ul className='servicio-list-container'>
              {/* Mostrar los primeros 6 enlaces */}
              {menuItemsInitial.map((item, index) => (
                <li key={index} className='servicio-list'><ArrowRightIcon/>
                  {item.link ? (
                    <a href={item.link} target='_blank' className='servicio-list'>{item.name}</a>
                  ) : item.to ? (
                    <Link to={item.to} className='servicio-list'>{item.name}</Link>
                  ) : (
                    <span onClick={item.onClick} className='servicio-list'>{item.name}</span>
                  )}
                </li>
              ))}
              {/* Mostrar opciones adicionales si se ha seleccionado un botón */}
              {selectedButton !== null &&
                menuItemsExpanded.map((item, index) => (
                  <li key={index} className='servicio-list'><ArrowRightIcon/>
                    {item.link ? (
                      <a href={item.link} target='_blank' className='servicio-list'>{item.name}</a>
                    ) : item.to ? (
                      <Link to={item.to} className='servicio-list'>{item.name}</Link>
                    ) : (
                      <span onClick={item.onClick} className='servicio-list'>{item.name}</span>
                    )}
                  </li>
                ))
              }
            </ul>
          </div>
        </Fade>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left' className='servicio-list-mobile'>
          <Accordion sx={{borderRadius: "20px !important"}}>
              <AccordionSummary sx={{backgroundColor: "#3d116d",
                borderRadius: "20px" 
              }}  expandIcon={<ExpandMoreIcon sx={{color: "white", fontSize: "35px"}}/>}><span className='servicio-accordion-title'>Menú de trámites</span></AccordionSummary>
              <AccordionDetails>
                <div>
                  <ul className='servicio-list-container'>
                    {/* Mostrar los primeros 6 enlaces */}
                    {menuItemsInitial.map((item, index) => (
                      <li key={index} className='servicio-list'><ArrowRightIcon/>
                        {item.link ? (
                          <a href={item.link} target='_blank' className='servicio-list'>{item.name}</a>
                        ) : item.to ? (
                          <Link to={item.to} className='servicio-list'>{item.name}</Link>
                        ) : (
                          <span onClick={item.onClick} className='servicio-list'>{item.name}</span>
                        )}
                      </li>
                    ))}
                    {/* Mostrar opciones adicionales si se ha seleccionado un botón */}
                    {selectedButton !== null &&
                      menuItemsExpanded.map((item, index) => (
                        <li key={index} className='servicio-list'><ArrowRightIcon/>
                          {item.link ? (
                            <a href={item.link} target='_blank' className='servicio-list'>{item.name}</a>
                          ) : item.to ? (
                            <Link to={item.to} className='servicio-list'>{item.name}</Link>
                          ) : (
                            <span onClick={item.onClick} className='servicio-list'>{item.name}</span>
                          )}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </AccordionDetails>
          </Accordion>
        </Fade>
        {/* Contenido dinámico */}
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='servicio-content'>
            {selectedButton === null ? (
              <div className='servicio-button-container'>
                {/* Mostrar los botones */}
                  <button className='servicio-button' onClick={() => setSelectedButton("conexion")}>
                    <PowerIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                    <p className='servicio-button-text'>Conexión de servicio</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("titularidad")}>
                    <PeopleAltIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                    <p className='servicio-button-text'>Cambio de titularidad</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("reconexion")}>
                    <BatteryChargingFullIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                    <p className='servicio-button-text'>Reconexión</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("baja")}>
                    <ArrowCircleDownIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                    <p className='servicio-button-text'>Dar de baja el servicio</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("reclamos")}>
                    <SupportAgentIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                    <p className='servicio-button-text'>Reclamos</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("factura")}>
                    <ReceiptIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                    <p className='servicio-button-text'>Factura</p>
                  </button>
                  <Link to={"/contacto"} style={{textDecoration: "none"}}>
                    <button className='servicio-button'>
                      <LaptopChromebookIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                      <p className='servicio-button-text'>Canales de contacto</p>
                    </button>
                  </Link>
                  <Link to={"/formas-de-pago"} style={{textDecoration: "none"}} >
                    <button className='servicio-button'>
                      <CreditCardIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                      <p className='servicio-button-text'>Medios de pago</p>
                    </button>
                  </Link>
                  <button className='servicio-button' onClick={() => setSelectedButton("servicio")}>
                    <ControlPointIcon sx={{fontSize: "50px"}} className='servicio-button-icon'/>
                    <p className='servicio-button-text'>Más sobre tu servicio</p>
                  </button>
              </div>
            ) : (
              // Mostrar el componente correspondiente según el botón seleccionado
              <div>
                {selectedButton === 'conexion' && <ServicioConexion />}
                {selectedButton === 'titularidad' && <ServicioTitularidad />}
                {selectedButton === 'reconexion' && <ServicioReconexion />}
                {selectedButton === 'baja' && <ServicioBaja />}
                {selectedButton === 'reclamos' && <ServicioReclamos />}
                {selectedButton === 'factura' && <ServicioFacturas />}
                {selectedButton === 'servicio' && <ServicioInfo />}
                {selectedButton === 'edificios' && <ServicioEdificios />}
                {selectedButton === 'usuarios' && <ServicioUsuarios />}
              </div>
            )}
          </div>
        </Fade>
      </div>
      {/*  
      <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='servicio-objetivos'>
            <Link to={"/objetivos-sociales"}>
              <Button sx={{
                width: "100%", 
                height: "45px",
                fontFamily: "interTight",
                fontSize: "22px",
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
          */}
      <BotonWhatsapp/>
    </section>
  );
};

export default ServicioElectrico;
