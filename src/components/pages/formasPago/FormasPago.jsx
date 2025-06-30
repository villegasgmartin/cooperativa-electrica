//Impoprtaciones:
import PagosAcordeon from '../../common/FormasPagoComponents/PagosAcordeon';
import "../formasPago/FormasPago.css"
import { Fade } from 'react-awesome-reveal';
import Image01 from "../../../assets/images/pagos/pagos-01.png"
import Image02 from "../../../assets/images/pagos/pagos-02.png"
import Image03 from "../../../assets/images/pagos/pagos-03.png"
import Image04 from "../../../assets/images/pagos/pagos-04.png"
import Image05 from "../../../assets/images/pagos/pagos-05.png"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import {Helmet} from "react-helmet"

//JSX:
const FormasPago = () => {

  return (
    <>
      <Helmet>
        <title>Medios de pago</title>
      </Helmet>
      <header className="header-pagos-container">
          <div className="header-contactos-container">
              <div className="header-contactos">
                  <LocationOnTwoToneIcon sx={{ color: "white" }} />
                  <h4 className="header-contactosText">Alberti 3600, Mar del Plata</h4>
              </div>
              <div className="header-contactos">
                  <LocationOnTwoToneIcon sx={{ color: "white" }} />
                  <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
              </div>
              <div className="header-contactos" id="homePortada-tel">
                  <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
                  <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
              </div>
          </div>
          <div className="navbarPages-container">
              <NavBar backgroundColorMovile="#201c1c" backgroundColor="#201c1c"/>
          </div>
          <Fade  triggerOnce={true} duration={800} delay={300}>
              <h1 className="header-pagos-title">Medios de Pago</h1>
          </Fade>
      </header>
      <section className='pagos-main-container'>
      <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
        <div className='pagos-logos-container'>
          <img src={Image01} alt="BNA+"  className='pagos-logos'/>
          <img src={Image02} alt="Cuenta DNI"  className='pagos-logos'/>
          <img src={Image03} alt="Mercado Pagp"  className='pagos-logos'/>
          <img src={Image04} alt="MODO"  className='pagos-logos'/>
          <img src={Image05} alt="Provincia Net Pagos"  className='pagos-logos'/>
        </div>
      </Fade>
      <div className='pagos-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <h2 className='pagos-title'>¡Pagá tus impuestos y servicios!</h2>
          <div className='pagos-arrow-text'> 
            <ArrowRightAltIcon sx={{fontSize: "35px", color: "#3d116d;"}}/><p className='pagos-text'><strong>Extraé dinero</strong> en efectivo con tu tarjeta de débito del Banco Provincia</p>
          </div>
          <div className='pagos-arrow-text'> 
            <ArrowRightAltIcon sx={{fontSize: "35px", color: "#3d116d;"}}/><p className='pagos-text'><strong>Pagá con tarjeta de débito </strong>del Banco Provincia</p>
          </div>
        </Fade>
          <Fade triggerOnce={true} duration={800} delay={300}>
            <p className='pagos-text-02'>Horario: de 7:30 a 12:30 hs<br/>Para más información entrá en la página web oficial de Provincia NET www.provincianet.com.ar</p>
            <div className='pagos-alias-container'>
              {/* <p className='pagos-text-03'>ALIAS:</p>
              <ul>
                <li className='pagos-text-03'>COOP-PROVINCIA </li>
                <li className='pagos-text-03'>COOP-NACION</li>
              </ul> */}
            </div>
          </Fade>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          <div className='pagos-accordion-container'><PagosAcordeon/></div>
        </Fade>
      </div>
        {/* <div className='pagos-usuarios-container'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
              <div className='pagos-usuarios'>
                <p className='pagos-info-title'>Sres. Usuarios</p>
                <p className='pagos-info-text'>En caso de corte de servicio por falta de pago, si abonan el valor de la reconexión por transferencia o depósito, dicha reconexión de servicio se hará efectiva una vez que se acredite el pago en nuestros bancos. Recuerde enviar el comprobante de pago por mail indicando el N° de asociado, como indican las instrucciones.<br/>
                  Muchas gracias.
                </p>
              </div>
            </Fade>
            <Fade  triggerOnce={true} duration={800} delay={300} direction='right'>
              <div className='pagos-usuarios pagos-background'>
                <p className='pagos-info-title' >Sres. /as. Asociados:</p>  
                <p  className='pagos-info-text'>Se informa que a partir de abril 2023  la emisión de facturas es mensual, a fin de facilitar el pago del servicio eléctrico frente al aumento de los cuadros tarifarios, para dar cumplimiento a lo dispuesto oportunamente por el Organismo de Control Eléctrico de la Provincia de Buenos Aires OCEBA.
                </p>
              </div>
            </Fade>
        </div> */}
    </section>
    <Footer/>
    </>
  );
};

export default FormasPago;