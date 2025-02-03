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

//JSX:
const ServicioElectrico = () => {
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    dispatch(setTitle('Servicio Eléctrico'));
  }, [dispatch]);

  return (
    <section className='servicio-main-container'>
      <div className='servicio-container'>
        {/* Lista fija a la izquierda */}
        <div className='servicio-lista-container'>
          <ul className='servicio-lista'>
            <li><a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target='_blank'>Oficina Virtual</a></li>
            <li><a href="https://oceba.gba.gov.ar/nueva_web/s.php?i=17" target='_blank'>Cuadro Tarifario</a></li>
            <li><a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" target='_blank'>Reglamento</a></li>
            <li><Link to={"/preguntas-frecuentes"}>Preguntas Frecuentes</Link></li>
            <li onClick={() => setSelectedButton("edificios")}>Edificios</li>
            <li onClick={() => setSelectedButton("usuarios")}>Medianos y grandes usuarios</li>
          </ul>
        </div>

        {/* Contenido dinámico */}
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
                <Link to={"/contacto"}>
                  <button className='servicio-button'>
                    <LaptopChromebookIcon sx={{fontSize: "50px"}}/>
                    <p className='servicio-button-text'>Canales de contacto</p>
                  </button>
                </Link>
                <Link to={"/formas-de-pago"} >
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
              <button className='servicio-back-button' onClick={() => setSelectedButton(null)}>Volver</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicioElectrico;
