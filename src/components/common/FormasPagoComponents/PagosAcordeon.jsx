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
        <AccordionSummary>Pago con QR desde la Factura</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>Escaneando el código QR impreso en su factura, podrá abonar de forma rápida y segura utilizando cualquier billetera virtual o aplicación bancaria con fondos disponibles.</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Botón de Pago en Oficina Virtual</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>Regístrese en nuestra Oficina Virtual y abone sus facturas desde la sección -Mis Facturas-, mediante tarjeta de débito o crédito, a través del siguiente enlace:
          <a href="oficinavirtual-coopmdp.micoop.com.ar" target='_blank'>oficinavirtual-coopmdp.micoop.com.ar</a>oficinavirtual-coopmdp.micoop.com.ar</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Pago en Efectivo en Sede Central</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>Puede abonar personalmente en nuestra sede ubicada en Alberti 3600 (esquina 20 de Septiembre), Mar del Plata.
          <strong>Horario de atención:</strong> lunes a viernes, de 7:30 a 12:30 hs.</p>
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
          <strong className='FormasPago-accordion-content FormasPago-accordion-link'>*Recuerde que no debe tener facturas vencidas para poder adherirse</strong>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Home Banking</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>A través de su plataforma de home banking:
            <ul>
              <li>Seleccione el rubro: Luz, Agua, Gas</li>
              <li>Seleccione el ente: Coop Electricidad MDP</li>
              <li className='FormasPago-accordion-content'>Ingresá el código de pagos <strong>( ¿donde encuentro mi código de pagos? haga click <a href="https://res.cloudinary.com/dj3akdhb9/image/upload/v1728488740/cooperativa/Click_para_ver_factura_de_energia_yef0tt.png" target='_blank'  className='FormasPago-accordion-link'>aquí para Servicio Eléctrico</a> y <a href="https://res.cloudinary.com/dj3akdhb9/image/upload/v1728488740/cooperativa/Click_para_ver_factura_de_NAVE_qclwju.png" target='_blank' className='FormasPago-accordion-link'>aquí para Nave Internet</a> )</strong></li>
            </ul>

Importante: No debe contar con facturas vencidas para adherirse a esta modalidad.</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>La Red de Agentes de cobranzas Provincia NET Pagos</AccordionSummary>
        <AccordionDetails>
          <p className='FormasPago-accordion-content'>En convenio con Bapro Medios de Pagos Sociedad Anónima, Ud. puede abonar la factura de Suministro Eléctrico o de Nave Internet, de la Cooperativa en cualquier ventanilla Provincia NET Pagos</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Tarjeta de Débito y Crédito - VISA y Master</AccordionSummary>
        <AccordionDetails>
          <p>&quot;Puede abonar sus facturas de servicio eléctrico y NAVE Internet con tarjetas de débito y crédito (en 1 pago) en la Caja 1 de la Sede de Alberti 3600. El Servicio NAVE Internet puede abonarse con tarjeta de débito o crédito en las oficinas comerciales de calle 20 de septiembre 2638.</p>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Débito Automático</AccordionSummary>
        <AccordionDetails>
        <p className='FormasPago-accordion-content'>Registre su CBU (Clave Bancaria Uniforme) en nuestra <a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target='_blanck'>oficina virtual</a> </p>

<p className='FormasPago-accordion-content'>*La CVU (Clave Virtual Uniforme) no es válida para esta modalidad de cobro.</p>
       
     
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary>En caso de abonar con Cheque</AccordionSummary>
        <AccordionDetails>
          <ul>
            <li className='FormasPago-accordion-content'>Indicar la cuenta que se cancela por e-mail:</li>
            <li className='FormasPago-accordion-content'>Si corresponde a suministro eléctrico a <a href="mailto:comercial@coopelectmdp.com.ar" className='FormasPago-accordion-link'>comercial@coopelectmdp.com.ar</a> o <a href="mailto:comercialgc@cooperativamdp.com.ar" className='FormasPago-accordion-link'>comercialgc@cooperativamdp.com.ar</a></li>
            <li className='FormasPago-accordion-content'>Los cheques deberán ser del titular del suministro y extendido a la orden de COOPERATIVA DE PROVISIÓN DE ELECTRICIDAD, SERVICIOS PÚBLICOS, VIVIENDA Y CRÉDITO DE MAR DEL PLATA LIMITADA – NO A LA ORDEN.</li>
          </ul>
        </AccordionDetails>
      </Accordion> */}
      {/* <Accordion>
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
      </Accordion> */}
    </AccordionGroup>
  );
}