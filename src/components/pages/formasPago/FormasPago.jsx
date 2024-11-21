//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import PagosAcordeon from '../../common/FormasPagoComponents/PagosAcordeon';
import "../formasPago/FormasPago.css"
import { Fade } from 'react-awesome-reveal';

//JSX:
const FormasPago = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Medios de pago'));
  }, [dispatch]);

  return (
    <section className='pagos-main-container'>
      <div className='pagos-container'>
        <div className='logos-container'>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <h2>¡Pagá tus impuestos y servicios!</h2>
        <p><strong>Extraé dinero</strong> en efectivo con tu tarjeta de débito del Banco Provincia</p>
          <p><strong>Pagá con tarjeta de débito</strong> del Banco Provincia</p>
        <div>
          <p>Horario: de 7:30 a 12:30 hs</p>
          <p> Para más información entrá en la página web oficial de Provincia NET www.provincianet.com.ar</p>
        </div>
        <div>
          <p>ALIAS;</p>
          <ul>
            <li>COOP-PROVINCIA </li>
            <li>COOP-NACION</li>
          </ul>
      </div>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='pagos-accordion-container'><PagosAcordeon/></div>
        </Fade>
      </div>
        <div className='pagos-info-container'>
          <div className='pagos-usuarios-container'>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
              <p className='pagos-info-text'><span style={{color: "#12824c", fontWeight: "bold"}}>Sres. Usuarios</span><br/>
                En caso de <strong>corte de servicio por falta de pago</strong>, si abonan el valor de la reconexión por transferencia o depósito, <strong>dicha reconexión de servicio se hará efectiva una vez que se acredite el pago en nuestros bancos</strong>.Recuerde enviar el comprobante de pago por mail indicando el N° de asociado, como indican las instrucciones.<br/>
                Muchas gracias.
              </p>
              <p className='pagos-info-text' ><span style={{color: "#12824c", fontWeight: "bold"}}>Sres. /as. Asociados:<br/></span> Se informa que a partir de abril 2023  la emisión de facturas es mensual, a fin de facilitar el pago del servicio eléctrico frente al aumento de los cuadros tarifarios, para dar cumplimiento a lo dispuesto oportunamente por el Organismo de Control Eléctrico de la Provincia de Buenos Aires OCEBA.
              </p>
            </Fade>
          </div>
        </div>
    </section>
  );
};

export default FormasPago;