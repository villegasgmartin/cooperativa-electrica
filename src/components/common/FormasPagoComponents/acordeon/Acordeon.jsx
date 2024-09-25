import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default function Acordeon() {
  return (
    <AccordionGroup variant='soft' size='lg' sx={{ maxWidth: 400 , marginTop: "100px", marginLeft: "300px"}}>
      <Accordion>
        <AccordionSummary>En Efectivo</AccordionSummary>
        <AccordionDetails>
          Puede realizar el pago de sus facturas de Servicio Eléctrico o de Nave Internet en la Sede de nuestra Cooperativa, Alberti 3600 (esquina 20 de Septiembre), Mar del Plata de lunes a viernes de 7:30 a 12:30 hs.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>PagoMisCuentas</AccordionSummary>
        <AccordionDetails>
          Puede realizar el pago de sus facturas de suministro eléctrico y de Nave Internet a través de la plataforma <a href="">PagoMisCuentas</a> (instrucciones en <a href="">https://pagomiscuentas.com/como-pago</a>)
          <ol>
            <li>Ingresa a Homebanking</li>
            <li>Seleccioná por rubro: Luz, Agua, Gas</li>
            <li>3- Seleccioná por Ente: Coop Electricidad MDP</li>
            <li>Ingresá el código de pagos <strong>(¿donde encuentro mi código de pagos? haga click <a href="">aquí para Servicio Eléctrico</a> y <a href="">aquí para Nave Internet</a>)</strong></li>
          </ol>
          <strong>*Recuerde que no debe tener facturas vencidas para poder adherirse</strong>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>La Red de Agentes de cobranzas Provincia NET Pagos</AccordionSummary>
        <AccordionDetails>
          En convenio con Bapro Medios de Pagos Sociedad Anónima, ud. puede abonar la factura de Suministro Eléctrico o de Nave Internet, de la Cooperativa en cualquier ventanilla Provincia NET Pagos
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Tarjeta de Débito y Crédito - VISA y Master</AccordionSummary>
        <AccordionDetails>
          Puede realizar el pago de su Factura de Servicio Eléctrico y Nave Internet con Tarjeta de Débito y Crédito (en 1 pago) de cualquier banco en la Sede de nuestra Cooperativa, Alberti 3600 esquina 20 de Septiembre, Mar del Plata de lunes a viernes de 7:30 a 12:30 hs.). Para el pago de su Factura de Servicio Internet NAVE en las oficinas comerciales de calle 20 de septiembre 2638 de lunes a viernes de 8 hs a 15 hs.
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Link Pagos</AccordionSummary>
        <AccordionDetails>
        También puede abonar la factura de servicio eléctrico y de Internet, ingresando al Home Banking de su Banco
        <ol>
          <li>Ingresá a Homebanking</li>
          <li>Seleccioná por rubro: Luz, Agua, Gas</li>
          <li>Seleccioná por Ente: Cooperativa de Electricidad Mar del Plata</li>
          <li>Ingresá el código de pagos <strong>(¿dónde encuentro mi código de pagos? haga click aquí para Servicio Eléctrico y aquí para Nave internet)</strong></li>
        </ol>
        <strong>*Recuerde que no debe tener facturas vencidas para poder adherirse</strong>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>En caso de abonar con Cheque</AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>Indicar la cuenta que se cancela por e-mail:</li>
            <li>si corresponde a suministro eléctrico a <a href="">comercial@coopelectmdp.com.ar</a> o <a href="">comercialgc@cooperativamdp.com.ar</a></li>
            <li>si corresponde a suministro de Nave internet a: <a href="">nave-adm@cooperativamdp.com.ar</a></li>
            <li>- Los cheques deberán ser del titular del suministro y extendido a la orden de COOPERATIVA DE PROVISIÓN DE ELECTRICIDAD, SERVICIOS PÚBLICOS, VIVIENDA Y CRÉDITO DE MAR DEL PLATA LIMITADA – NO A LA ORDEN.</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>En caso de abonar con Interdepósito</AccordionSummary>
        <AccordionDetails>
          <ul>
            <li><strong>recuerde: CUIT 30-54569450-2</strong></li>
            <li>Indicar la cuenta que se cancela (por e-mail)</li>
            <li>si corresponde a suministro eléctrico a <a href="">comercial@coopelectmdp.com.ar o comercialgc@cooperativamdp.com.ar</a></li>
            <li>si corresponde a suministro de Nave internet a: <a href="">nave-adm@cooperativamdp.com.ar</a></li>
            <li>Puede transferir desde su CUENTA DNI, APP DE BANCOS O MERCADO PAGO, UALÁ, ETC,</li>
            <li><strong>BANCO DE LA NACIÓN ARGENTINA</strong></li>
            <li>SUCURSAL 1180 - BARRIO INDEPENDENCIA</li>
            <li>CBU: 01101450-20014584407517</li>
            <li>ALIAS: COOP-NACION</li>
            <li>CUENTA CORRIENTE N° 14584407/51</li>
            <strong>BANCO DE LA PROVINCIA DE BUENOS AIRES</strong>
            <li>SUCURSAL 6189 - INDEPENDENCIA</li>
            <li>CBU 0140401601618901041221</li>
            <li>ALIAS: COOP-PROVINCIA</li>
            <li>CUENTA CORRIENTE N° 10412/2</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Macro Click Pago</AccordionSummary>
        <AccordionDetails>
          Ingresar al siguiente link: <a href="">http://pagos.macroclickpago.com.ar/796346</a> luego completar el Código de Pago Electrónico, seleccionar el concepto a pagar y por último elegir el medio de pago: tarjeta de débito, crédito o debin.
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}