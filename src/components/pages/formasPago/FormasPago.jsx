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
                <li>Ingresá el código de pagos </li>
              </ol>
            </div>
            <div></div>
            <div></div>
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