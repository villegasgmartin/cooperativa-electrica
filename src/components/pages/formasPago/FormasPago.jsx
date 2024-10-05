//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import PagosAcordeon from '../../common/FormasPagoComponents/PagosAcordeon';
import "../formasPago/FormasPago.css"
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';
import { Fade } from 'react-awesome-reveal';

//JSX:
const FormasPago = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Formas y lugares de pago'));
  }, [dispatch]);

  return (
    <section className='pagos-main-container'>
      <div className='provinciaNet-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='provinciaNet-textContainer'>
            <h3 className='pagos-info-title'>¡Pagá tus impuestos y servicios!</h3>
            <p className='provinciaNet-text'>Extraé dinero en efectivo con tu tarjeta de débito del Banco Provincia</p>
            <p className='provinciaNet-text'>Pagá con tarjeta de débito del Banco Provincia</p>
            <p className='provinciaNet-text'>Horario: de 7:30 a 12:30 hs</p>
            <p className='provinciaNet-text'>Para más información <strong>entrá en la página web oficial de Provincia NET <a href="https://www.provincianet.com.ar/" target='_blank' className='provinciaNet-link'>www.provincianet.com.ar</a></strong></p>
          </div>
          <div className='pagos-info-image03'><img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2022/12/logo-PN-Pagos-VF_.jpg" alt="imágen provincia net" width={"100%"} /></div>
        </Fade>
      </div>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div className='pagos-accordion-container'><PagosAcordeon/></div>
        </Fade>
        <div className='pagos-info-container'>
          <div className='pagos-usuarios-container'>
            <Fade triggerOnce={true} duration={800} delay={300}>
              <p className='pagos-info-text'><span style={{color: "#12824c", fontWeight: "bold"}}>Sres. Usuarios</span><br/>
                En caso de <strong>corte de servicio por falta de pago</strong>, si abonan el valor de la reconexión por transferencia o depósito, <strong>dicha reconexión de servicio se hará efectiva una vez que se acredite el pago en nuestros bancos</strong>.Recuerde enviar el comprobante de pago por mail indicando el N° de asociado, como indican las instrucciones.<br/>
                Muchas gracias.
              </p>
              <p className='pagos-info-text' ><span style={{color: "#12824c", fontWeight: "bold"}}>Sres. /as. Asociados:<br/></span> Se informa que a partir de abril 2023  la emisión de facturas es mensual, a fin de facilitar el pago del servicio eléctrico frente al aumento de los cuadros tarifarios, para dar cumplimiento a lo dispuesto oportunamente por el Organismo de Control Eléctrico de la Provincia de Buenos Aires OCEBA.
              </p>
            </Fade>
          </div>
          <Fade triggerOnce={true} duration={800} delay={300}>
            <div className='pagos-logos-container'>
                <div className='alias-container'>
                  <p className='alias'>ALIAS: <strong>COOP-PROVINCIA</strong><br/>ó ALIAS: <strong>COOP-NACION</strong></p>
                </div>
                <div className='pagos-info-image01'><img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2022/12/apps-pagos.png" width={"100%"} alt="imágen de pagos" /></div>
                <div className='pagos-info-image02'><img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2022/12/icono-pago.png" alt="logo de pagos" width={"100%"}/></div>
              </div>
          </Fade>
        </div>
        <BotonFlotante/>
    </section>
  );
};

export default FormasPago;