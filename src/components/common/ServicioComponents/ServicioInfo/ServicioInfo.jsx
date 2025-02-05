//Importaciones:
import "../../../pages/servicioElectrico/ServicioElectrico.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//JSX
const ServicioInfo = () => {
    return (
        <Fade triggerOnce={true} duration={800} delay={100}>
            <div className='servicioComponents-container'>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>Adhesión a débito automático</h3></AccordionSummary>
                    <AccordionDetails className='servicio-description2'>
                        <p>¿Cómo puedo adherir al débito automático de la factura?</p>
                        <p>Podrás optar por la adhesión al débito automático en una tarjeta de crédito o bien el débito directo en tu cuenta bancaria. Tené en cuenta que una vez finalizado el trámite, se efectuará dicha adhesión a partir de la próxima facturación emitida.</p>
                        <p>Para realizar la adhesión a tu tarjeta de crédito los datos que necesitarás son:</p>
                        <ul style={{paddingLeft: "25px"}}>
                            <li>Número de cuenta de tu suministro.</li>
                            <li>Nombre y apellido, tal como figura en la tarjeta.</li>
                            <li>Tipo de tarjeta de crédito (Visa, Mastercard, Argencard, Cabal y Naranja). Solo tarjetas emitidas en Argentina.</li>
                            <li>Número de la tarjeta de crédito de 16 dígitos.</li>
                        </ul>
                        <p>Para realizar la adhesión al débito directo los datos que necesitarás son:</p>
                        <ul style={{paddingLeft: "25px"}}>
                            <li>Nombre y apellido o razón social de la cuenta bancaria.</li>
                            <li>Banco.</li>
                            <li>Número de CBU.</li>
                            <li>Tipo de cuenta (Caja de Ahorro o Cuenta Corriente).</li>
                        </ul>
                        <p>Podrás realizar el trámite de manera online en nuestra <a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target="_blank" className='servicio-link2'>Oficina Virtual</a> o de manera presencial en nuestras oficinas comerciales.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>Cambio de tarifa</h3></AccordionSummary>
                    <AccordionDetails className='servicio-description2'>
                        <p>Solicita el cambio de tarifa de obra a residencial/comercial o viceversa.</p>
                        <p>¿Cómo hacerlo?</p>
                        <p>Comunicándote a <a href="mailto:comercial@coopelectmdp.com.ar" className='servicio-link2'>comercial@coopelectmdp.com.ar</a>, <a href="mailto:comercialgc@cooperativamdp.com.ar" className='servicio-link2'>comercialgc@cooperativamdp.com.ar</a> o en nuestra oficina de atención al público</p>
                        <p>¿Qué más tenés que saber?</p>
                        <p>Para realizar tu trámite, tenés que indicarnos tu número de cuenta, nuevo destino y documentación que respalde el mismo.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>Cambio o traslado de medidor</h3></AccordionSummary>
                    <AccordionDetails className='servicio-description2'>
                        <p>Podés solicitar el traslado de tu medidor a un nuevo punto de conexión.</p>
                        <p>¿Cómo hacerlo?</p>
                        <p>Comunicándote a <a href="mailto:comercial@coopelectmdp.com.ar" className='servicio-link2'>comercial@coopelectmdp.com.ar</a>, <a href="mailto:comercialgc@cooperativamdp.com.ar" className='servicio-link2'>comercialgc@cooperativamdp.com.ar</a> o en nuestra oficina de atención al público</p>
                        <p>¿Qué más tenés que saber?</p>
                        <p>Para realizar tu trámite, indicanos tu número de usuario y  asegurate que el nuevo habitáculo/pilar se encuentre en condiciones para instalar el nuevo medidor de acuerdo al <a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" target="_blank" className='servicio-link2'>Reglamento de Acometidas vigente</a>.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>Tarifa Social</h3></AccordionSummary>
                    <AccordionDetails className='servicio-description2'>
                        <p>La tarifa social es otorgada por el Gobierno de la Pcia. de Buenos Aires, a través de su Organismo de Control para el servicio eléctrico, OCEBA, para que los ciudadanos en situación de mayor vulnerabilidad paguen un precio más bajo por el servicio eléctrico.</p>
                        <p>¿Cómo hacerlo?</p>
                        <p>Inscribite ahora, o consulta el estado de tu solicitud <a href="https://oceba.gba.gov.ar/nueva_web/" target="_blank"  className='servicio-link2'>ingresando a la web</a>.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>Segmentación energética</h3></AccordionSummary>
                    <AccordionDetails className='servicio-description2'>
                        <p>La Segmentación Energética es la iniciativa del Gobierno Nacional para ordenar los subsidios a la electricidad y el gas. Esta medida puede tener un impacto relevante en el monto que tengas que pagar por tu servicio de energía eléctrica.</p>
                        <p>s muy importante que te registres, en caso de no hacerlo serás asignado al Nivel 1 de Altos Ingresos, aplicando la quita del subsidio.</p>
                        <p>¿Cómo hacerlo?</p>
                        <p style={{marginBottom: "10px"}}>Si aún no te registraste podés hacerlo en <a href="https://www.argentina.gob.ar/subsidios" target="_blank"  className='servicio-link2'>www.argentina.gob.ar/subsidios</a>.</p>
                        <Link to="/preguntas-frecuentes#pregunta-23" className='servicio-info'>Más información</Link>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>Electrodependientes</h3></AccordionSummary>
                    <AccordionDetails className='servicio-description2'>
                        <p>Son electrodependientes aquellas personas que por razones de vida o salud requieran de un suministro eléctrico constante para poder alimentar el equipamiento médico.</p>
                        <p>¿Cómo puedo inscribirme en el RECS?</p>
                        <p style={{marginBottom: "10px"}}>Inscribite en: <a href="https://www.argentina.gob.ar/servicio/inscribirme-en-el-registro-de-electrodependientes-por-cuestiones-de-salud" target="_blank" className='servicio-link2'>https://www.argentina.gob.ar/servicio/inscribirme-en-el-registro-de-electrodependientes-por-cuestiones-de-salud</a>.</p>
                        <Link to="/preguntas-frecuentes#pregunta-31" className='servicio-info'>Más información</Link>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>Personas víctimas de violencia de género</h3></AccordionSummary>
                    <AccordionDetails className='servicio-description2'>
                        <p>Bonificación especial para personas víctimas de violencia de género</p>
                        <p>La Provincia de Buenos Aires, a través del OCEBA, otorga una bonificación especial de hasta el 100% sobre los conceptos eléctricos facturados, antes de impuestos, a las personas víctimas de violencia por razones de género, en el servicio identificado, por el plazo de 6 meses prorrogables por otro período igual y/o mientras subsista la situación crítica.</p>
                        <p>¿Quiénes pueden acceder?</p>
                        <p>Podrán acceder a la bonificación las personas usuarias del servicio, deberán estar inscriptas en el Registro Único de Casos de las Violencias por Razones de Género de la provincia de Buenos Aires (RUCVG), del Ministerio de las Mujeres, Políticas de Géneros y Diversidad Sexual de la Provincia de Buenos Aires.</p>
                        <a href="https://oceba.gba.gov.ar/nueva_web/" target="_blank" className='servicio-link2'>Click para acceder al beneficio</a>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Fade>
    )
}

export default ServicioInfo