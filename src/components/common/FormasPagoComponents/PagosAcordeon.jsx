//Importaciones:
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import "../FormasPagoComponents/PagosAcordeon.css"

//JSX: clas
export default function PagosAcordeon() {
  return (
    <AccordionGroup variant='soft' size='lg'>
      <Accordion>
        <AccordionSummary>En Efectivo</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>Puede realizar el pago de sus facturas de Servicio Eléctrico o de Nave Internet en la Sede de nuestra Cooperativa, Alberti 3600 (esquina 20 de Septiembre), Mar del Plata de lunes a viernes de 7:30 a 12:30 hs.</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>PagoMisCuentas</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>Puede realizar el pago de sus facturas de suministro eléctrico y de Nave Internet a través de la plataforma <a href="https://pagomiscuentas.com/" target='_blank' className='FormasPago-accordion-link'>PagoMisCuentas</a> (instrucciones en <a href="https://pagomiscuentas.com/como-pago" target='_blank'  className='FormasPago-accordion-link'>https://pagomiscuentas.com/como-pago</a>)</p>
          <ol>
            <li className='FormasPago-accordion-content'>Ingresa a Homebanking</li>
            <li className='FormasPago-accordion-content'>Seleccioná por rubro: Luz, Agua, Gas</li>
            <li className='FormasPago-accordion-content'>Seleccioná por Ente: Coop Electricidad MDP</li>
            <li className='FormasPago-accordion-content'>Ingresá el código de pagos <strong>( ¿donde encuentro mi código de pagos? haga click <a href="https://res.cloudinary.com/dj3akdhb9/image/upload/v1728488740/cooperativa/Click_para_ver_factura_de_energia_yef0tt.png" target='_blank'  className='FormasPago-accordion-link'>aquí para Servicio Eléctrico</a> y <a href="https://res.cloudinary.com/dj3akdhb9/image/upload/v1728488740/cooperativa/Click_para_ver_factura_de_NAVE_qclwju.png" target='_blank' className='FormasPago-accordion-link'>aquí para Nave Internet</a> )</strong></li>
          </ol>
          <strong className='FormasPago-accordion-content'>*Recuerde que no debe tener facturas vencidas para poder adherirse</strong>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>La Red de Agentes de cobranzas Provincia NET Pagos</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>En convenio con Bapro Medios de Pagos Sociedad Anónima, ud. puede abonar la factura de Suministro Eléctrico o de Nave Internet, de la Cooperativa en cualquier ventanilla Provincia NET Pagos</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Tarjeta de Débito y Crédito - VISA y Master</AccordionSummary>
        <AccordionDetails>
          <p>Puede realizar el pago de su Factura de Servicio Eléctrico y Nave Internet con Tarjeta de Débito y Crédito (en 1 pago) de cualquier banco en la Sede de nuestra Cooperativa, Alberti 3600 esquina 20 de Septiembre, Mar del Plata de lunes a viernes de 7:30 a 12:30 hs.). Para el pago de su Factura de Servicio Internet NAVE en las oficinas comerciales de calle 20 de septiembre 2638 de lunes a viernes de 8 hs a 15 hs.</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Link Pagos</AccordionSummary>
        <AccordionDetails>
        <p className='FormasPago-accordion-content'>También puede abonar la factura de servicio eléctrico y de Internet, ingresando al Home Banking de su Banco</p>
        <ol>
          <li className='FormasPago-accordion-content'>Ingresá a Homebanking</li>
          <li className='FormasPago-accordion-content'>Seleccioná por rubro: Luz, Agua, Gas</li>
          <li className='FormasPago-accordion-content'>Seleccioná por Ente: Cooperativa de Electricidad Mar del Plata</li>
          <li className='FormasPago-accordion-content'>Ingresá el código de pagos <strong>( ¿donde encuentro mi código de pagos? haga click <a href="https://res.cloudinary.com/dj3akdhb9/image/upload/v1728488740/cooperativa/Click_para_ver_factura_de_energia_yef0tt.png" target='_blank'  className='FormasPago-accordion-link'>aquí para Servicio Eléctrico</a> y <a href="https://res.cloudinary.com/dj3akdhb9/image/upload/v1728488740/cooperativa/Click_para_ver_factura_de_NAVE_qclwju.png" target='_blank' className='FormasPago-accordion-link'>aquí para Nave Internet</a> )</strong></li>
        </ol>
        <strong className='FormasPago-accordion-content'>*Recuerde que no debe tener facturas vencidas para poder adherirse</strong>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>En caso de abonar con Cheque</AccordionSummary>
        <AccordionDetails>
          <ul>
            <li className='FormasPago-accordion-content'>Indicar la cuenta que se cancela por e-mail:</li>
            <li className='FormasPago-accordion-content'>Si corresponde a suministro eléctrico a <a href="mailto:comercial@coopelectmdp.com.ar" className='FormasPago-accordion-link'>comercial@coopelectmdp.com.ar</a> o <a href="mailto:comercialgc@cooperativamdp.com.ar" className='FormasPago-accordion-link'>comercialgc@cooperativamdp.com.ar</a></li>
            <li className='FormasPago-accordion-content'>Si corresponde a suministro de Nave internet a: <a href="mailto:nave-adm@cooperativamdp.com.ar" className='FormasPago-accordion-link'>nave-adm@cooperativamdp.com.ar</a></li>
            <li className='FormasPago-accordion-content'>Los cheques deberán ser del titular del suministro y extendido a la orden de COOPERATIVA DE PROVISIÓN DE ELECTRICIDAD, SERVICIOS PÚBLICOS, VIVIENDA Y CRÉDITO DE MAR DEL PLATA LIMITADA – NO A LA ORDEN.</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>En caso de abonar con Interdepósito, transferencia bancaria</AccordionSummary>
        <AccordionDetails>
          <ul>
            <li className='FormasPago-accordion-content'><strong>Recuerde: CUIT 30-54569450-2</strong></li>
            <li className='FormasPago-accordion-content'>Indicar la cuenta que se cancela (por e-mail)</li>
            <li className='FormasPago-accordion-content'>Si corresponde a suministro eléctrico a <a href="mailto:comercial@coopelectmdp.com.ar" className='FormasPago-accordion-link'>comercial@coopelectmdp.com.ar</a> o <a href="mailto:comercialgc@cooperativamdp.com.ar" className='FormasPago-accordion-link'>comercialgc@cooperativamdp.com.ar</a></li>
            <li className='FormasPago-accordion-content'>Si corresponde a suministro de Nave internet a: <a href="mailto:nave-adm@cooperativamdp.com.ar" className='FormasPago-accordion-link'>nave-adm@cooperativamdp.com.ar</a></li>
            <li className='FormasPago-accordion-content'>Puede transferir desde su CUENTA DNI, APP DE BANCOS O MERCADO PAGO, UALÁ, ETC,</li>
            <li className='FormasPago-accordion-content'><strong>BANCO DE LA NACIÓN ARGENTINA:</strong></li>
            <li className='FormasPago-accordion-content'>SUCURSAL 1180 - BARRIO INDEPENDENCIA</li>
            <li className='FormasPago-accordion-content'>CBU: 01101450-20014584407517</li>
            <li className='FormasPago-accordion-content'>ALIAS: COOP-NACION</li>
            <li className='FormasPago-accordion-content'>CUENTA CORRIENTE N° 14584407/51</li>
            <strong className='FormasPago-accordion-content'>BANCO DE LA PROVINCIA DE BUENOS AIRES:</strong>
            <li className='FormasPago-accordion-content'>SUCURSAL 6189 - INDEPENDENCIA</li>
            <li className='FormasPago-accordion-content'>CBU 0140401601618901041221</li>
            <li className='FormasPago-accordion-content'>ALIAS: COOP-PROVINCIA</li>
            <li className='FormasPago-accordion-content'>CUENTA CORRIENTE N° 10412/2</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Macro Click Pago</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>Ingresar al siguiente link: <a href="https://pagos.macroclickpago.com.ar/SearchDeuda/796346" target='_blank' className='FormasPago-accordion-link'>http://pagos.macroclickpago.com.ar/796346</a> luego completar el Código de Pago Electrónico, seleccionar el concepto a pagar y por último elegir el medio de pago: tarjeta de débito, crédito o debin.</p>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}