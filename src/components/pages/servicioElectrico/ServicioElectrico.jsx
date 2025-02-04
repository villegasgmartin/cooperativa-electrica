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
import {Helmet} from "react-helmet"
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
import { Button} from '@mui/material';
import { Fade } from "react-awesome-reveal";

//JSX:
const ServicioElectrico = () => {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    dispatch(setTitle('Servicio Eléctrico'));
  }, [dispatch]);

  return (
    <section className='servicio-main-container'>
      <Helmet>
        <title>Servicio Eléctrico</title>
      </Helmet>
      <div className='servicio-container'>
      <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
        <div>
          <ul className='servicio-list-container'>
            <li className='servicio-list'><a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target='_blank' className='servicio-list'>Oficina Virtual</a></li>
            <li className='servicio-list'><a href="https://oceba.gba.gov.ar/nueva_web/s.php?i=17" target='_blank' className='servicio-list'>Cuadro Tarifario</a></li>
            <li className='servicio-list'><a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" target='_blank' className='servicio-list'>Reglamento</a></li>
            <li className='servicio-list'><Link to={"/preguntas-frecuentes"} className='servicio-list'>Preguntas Frecuentes</Link></li>
            <li onClick={() => setSelectedButton("edificios")} className='servicio-list'>Edificios</li>
            <li onClick={() => setSelectedButton("usuarios")} className='servicio-list'>Medianos y grandes usuarios</li>
          </ul>
        </div>
      </Fade>
        {/* Contenido dinámico */}
      <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
        <div className='servicio-content'>
            {selectedButton === null ? (
              // Mostrar botones si no hay selección
              <div>
                <div className='servicio-button-container'>
                  <button className='servicio-button' onClick={() => setSelectedButton("conexion")}>
                    <PowerIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Conexión de servicio</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("titularidad")}>
                    <PeopleAltIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Cambio de titularidad</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("reconexion")}>
                    <BatteryChargingFullIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Reconexión</p>
                  </button>
                </div>
                <div className='servicio-button-container'>
                  <button className='servicio-button' onClick={() => setSelectedButton("baja")}>
                    <ArrowCircleDownIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Dar de baja el servicio</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("reclamos")}>
                    <SupportAgentIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Reclamos</p>
                  </button>
                  <button className='servicio-button' onClick={() => setSelectedButton("factura")}>
                    <ReceiptIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Factura</p>
                  </button>
                </div>
                <div className='servicio-button-container'>
                  <Link to={"/contacto"} style={{textDecoration: "none"}}>
                    <button className='servicio-button'>
                      <LaptopChromebookIcon sx={{fontSize: "50px"}}/>
                      <p className='servicio-button-text'>Canales de contacto</p>
                    </button>
                  </Link>
                  <Link to={"/formas-de-pago"} style={{textDecoration: "none"}} >
                    <button className='servicio-button'>
                      <CreditCardIcon sx={{fontSize: "50px"}}/>
                      <p className='servicio-button-text'>Medios de pago</p>
                    </button>
                  </Link>
                  <button className='servicio-button' onClick={() => setSelectedButton("servicio")}>
                    <ControlPointIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Más sobre tu servicio</p>
                  </button>
                </div>
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

                  <Fade triggerOnce={true} duration={800} delay={100}>
                    <div className='servicio-back-button'>
                      <Button onClick={() => setSelectedButton(null)} sx={{ 
                            width: "100%",
                            height: "50px",
                            fontFamily: "interTight",
                            marginTop: "20px",
                            fontSize: "20px",
                            letterSpacing: "1px",
                            borderRadius: "50px",
                            boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                            textTransform: "none",
                            color:"white",
                            backgroundColor: "#8048ff",
                          }} 
                          variant='contained' 
                          size='large'
                        >
                          Volver
                        </Button>
                    </div>
                  </Fade>
              </div>
            )}
          </div>
      </Fade>
      </div>
    </section>
  );
};

export default ServicioElectrico;
