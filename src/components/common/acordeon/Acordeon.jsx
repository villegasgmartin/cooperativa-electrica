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
    </AccordionGroup>
  );
}