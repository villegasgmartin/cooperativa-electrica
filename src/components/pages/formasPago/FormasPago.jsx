//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const FormasPago = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Formas y lugares de pago'));
  }, [dispatch]);

  return (
    <div>
        <h2></h2>
        <div>
          <div>
            <div></div>
            <div><img src="" alt="" /></div>
            <div></div>
            <div><img src="" alt="" /></div>
          </div>
          <div>
            <div>
              <h4>En Efectivo</h4>
              <p>Puede realizar el pago de sus facturas de Servicio Eléctrico o de Nave Internet en la Sede de nuestra Cooperativa, Alberti 3600 (esquina 20 de Septiembre), Mar del Plata de lunes a viernes de 7:30 a 12:30 hs.</p>
            </div>
            <div>
              <h4>PagoMisCuentas</h4>
              <p>Puede realizar el pago de sus facturas de suministro eléctrico y de Nave Internet a través de la plataforma <a href="">PagoMisCuentas</a> (instrucciones en <a href=""> https://pagomiscuentas.com/como-pago</a>)</p>
              <ol>
                <li>Ingresa al HomeBanking</li>
                <li>Seleccioná por rubro: Luz, Agua, Gas</li>
                <li>Seleccioná por Ente: Coop Electricidad MDP</li>
                <li>Ingresá el código de pagos <strong>(¿donde encuentro mi código de pagos? haga click <a href="">aquí para Servicio Eléctrico</a> y <a href="">aquí para Nave Internet</a>)</strong></li>
              </ol>
              <p><strong>*Recuerde que no debe tener facturas vencidas para poder adherirse</strong></p>
            </div>
            <div>
              <h4>La Red de Agentes de cobranzas Provincia NET Pagos</h4>
              <p>En convenio con Bapro Medios de Pagos Sociedad Anónima, ud. puede abonar la factura de Suministro Eléctrico o de Nave Internet, de la Cooperativa en cualquier ventanilla Provincia NET Pagos</p>
            </div>
            <div>
              <h4>Tarjeta de Débito y Crédito - VISA y Master</h4>
              <p>Puede realizar el pago de su Factura de Servicio Eléctrico y Nave Internet con Tarjeta de Débito y Crédito (en 1 pago) de cualquier banco en la Sede de nuestra Cooperativa, Alberti 3600 esquina 20 de Septiembre, Mar del Plata de lunes a viernes de 7:30 a 12:30 hs.). Para el pago de su Factura de Servicio Internet NAVE en las oficinas comerciales de calle 20 de septiembre 2638 de lunes a viernes de 8 hs a 15 hs.</p>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
    </div>
  );
};

export default FormasPago;