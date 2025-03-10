//Importaciones:
import "../../../pages/servicioElectrico/ServicioElectrico.css";
import { Fade } from 'react-awesome-reveal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//JSX:
const ServicioEdificios = () => {
    return(
        <Fade triggerOnce={true} duration={800} delay={100}>
            <div className='servicioComponents-container'>
                <h2  className='servicio-title2'>Edificios</h2>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>¿Cómo realizar tu trámite?</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description2'>Comunicándote a <a href="mailto:comercial@coopelectmdp.com.ar" className='servicio-link2'>comercial@coopelectmdp.com.ar</a>, <a href="mailto:comercialgc@cooperativamdp.com.ar" className='servicio-link2'>comercialgc@cooperativamdp.com.ar</a> o en nuestra oficina de atención al público.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>¿Quienes están autorizados para iniciar una factibilidad eléctrica?</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description2'>Las solicitudes podrán ser iniciadas por el propietario del inmueble, desarrollador  y/o matriculado apoderado o cualquier  tercero con las facultades legales suficientes (Presidente, Socio Gerente o apoderado).</p>
                        <p className='servicio-description2'>Administradores / Apoderados deberán presentar copia simple y certificada del poder otorgado.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>¿Qué necesito para que una obra de un edificio tenga servicio?</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description2'>Las solicitudes podrán ser iniciadas por el propietario del inmueble, desarrollador  y/o matriculado apoderado o cualquier  tercero con las facultades legales suficientes.</p>
                        <p className='servicio-description2'>Administradores / Apoderados deberán presentar copia simple y certificada del poder otorgado.</p>
                        <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>Necesitarás tener la siguiente documentación:</h3></AccordionSummary>
                    <AccordionDetails>
                        <ol style={{paddingLeft: "25px"}}>
                            <li className='servicio-description2'>Acreditación de la posesión del inmueble (Escritura).</li>
                            <li className='servicio-description2'>DNI del desarrollador.</li>
                            <li className='servicio-description2'>Si la titularidad corresponde a una sociedad, deberá presentar Contrato Social o Estatuto. En caso de realizarse el trámite por un representante, poder a favor del mismo y copia del DNI.</li>
                            <li className='servicio-description2'>Constancia de inscripción de AFIP e IIBB.</li>
                        </ol>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>Además te pediremos que nos informes:</h3></AccordionSummary>
                    <AccordionDetails>
                        <ul style={{paddingLeft: "25px"}}>
                            <li className='servicio-description2'>Datos de contacto del desarrollador (Nombre, Apellido, Domicilio Legal, Teléfono de contacto/celular y mail).</li>
                            <li className='servicio-description2'>Datos de contacto de los profesionales intervinientes (arquitecto y electricista responsables de la obra, Nombre, Apellido, Teléfono de contacto/celular y mail).</li>
                            <li className='servicio-description2'>Email de recepción de notificaciones.</li>
                            <li className='servicio-description2'>Destino de las unidades funcionales (departamentos, oficinas y/o locales).</li>
                            <li className='servicio-description2'>Fecha estimada de inicio y finalización de obra, fecha de ocupación de las unidades funcionales. Estado actual de la obra.</li>
                            <li className='servicio-description2'>Expresar si el edificio contará con servicio de gas.</li>
                            <li className='servicio-description2'>Estado de pilar para medidor de obra (sin pilar, en ejecución o en condiciones).</li>
                            <li className='servicio-description2'>Estado del tablero de medidores definitivo (sin tablero, en ejecución, o ya montado y en condiciones de ser inspeccionado).</li>
                            <li className='servicio-description2'>Si el predio ya tiene un medidor, indicar Número de cuenta.</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>De tu proyecto:</h3></AccordionSummary>
                    <AccordionDetails>
                        <ul className='servicio-description2' style={{paddingLeft: "25px"}}>
                            <li>En caso de requerir un medidor trifásico para la obra, presentar un censo de cargas firmado por el Desarrollador o persona debidamente autorizada y profesional matriculado interviniente.</li>
                            <li>Planos eléctricos rubricados por profesional matriculado interviniente con categoría habilitante y persona debidamente autorizada (propietario/apoderado), a los efectos de evaluar la factibilidad técnico – económica de conexión. En este sentido, es condición necesaria que el mismo contenga cuadro de detalle de potencia indicando Potencia Instalada y Potencia Máxima Simultánea del total de los suministros a abastecer, cantidad de suministros diferenciando entre monofásicos y trifásicos y su potencia individual, así como también marque de manera clara el punto de toma de acuerdo al <a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" target="_blank" className='servicio-link2'>Reglamento de Conexión para Acometidas T1 Múltiples</a>.</li>
                            <li>Toda la documentación antes mencionada deberá ser entregada en Formato Digital (PDF), firmados por el PROPIETARIO/DESARROLLADOR y profesional matriculado.</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>Cargos a abonar por el desarrollador</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description2'>Los EDIFICIOS que estuvieran conformados por diez (10) o más Unidades Funcionales, abonarán el cargo por Contribución por Obra Reembolsable (COR), según lo establecido en el Reglamento de Suministro y Conexión, ARTICULO 14. RÉGIMEN DE EXTENSIÓN Y AMPLIACIÓN DE REDES.</p>
                        <p className='servicio-description2'>Sin perjuicio de lo mencionado, es importante destacar que, aquellos EDIFICIOS que hayan iniciado las obras con anterioridad al 2 de febrero del 2019, o acrediten permiso de obra emitido por la municipalidad o solicitud de suministro de obra con anterioridad a la fecha mencionada, deberán abonar el Cargo por Habilitación de Suministros Conjuntos (CSC), en función de lo dispuesto en el Decreto Provincial N° 3543/06 y la Resolución OCEBA N° 328/12, y de acuerdo a los valores establecido en el Cuadro Tarifario Res. MIySP N° 1297/18.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>Inicio de la factibilidad,  Suministro de obra y espacios para cámaras (centros de transformación)</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description2'>Cuando la potencia requerida para la alimentación del edificio supere la capacidad de las redes existentes y según lo establecido en el Reglamento de Suministro y Conexión y <a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" target="_blank" className='servicio-link2'>Reglamento para Acometidas T1 Múltiples</a>, la Cooperativa podrá requerir y el desarrollador/propietario deberá ceder en forma gratuita el espacio de un recinto destinado a la instalación de un centro de transformación. Para lo cual el desarrollador/propietario deberá destinar un recinto de dimensiones acordes a la capacidad de transformación a instalar, según lo especificado por la DISTRIBUIDORA en cada oportunidad.</p>
                        <p className='servicio-description2'>Asimismo, de acuerdo a lo establecido en el <a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" target="_blank" className='servicio-link2'>Reglamento para Acometidas T1 Múltiples</a>, será requisito primordial el Libre Acceso a la toma primaria, medición y tablero primario. Se entiende por Libre Acceso, a la posibilidad de acceder directamente a las instalaciones desde la vía pública, las 24 hs., sin recurrir a terceros.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>Inspecciones durante el desarrollo de la obra</h3></AccordionSummary>
                    <AccordionDetails><p className='servicio-description2'>La distribuidora inspeccionará la toma primaria instalada, buzón o caja toma, caños de acometida y de reserva, sección de cable de acuerdo a la potencia declarada, gabinete para el medidor totalizador, gabinete de medición múltiple, el cual deberá identificar las unidades funcionales que alimenta cada habitáculo, según lo establece el reglamento de acometidas múltiples.</p></AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>Aviso de Finalización de Obra</h3></AccordionSummary>
                    <AccordionDetails>
                    <p className='servicio-description2'>Es conveniente que el titular del suministro o su representante debidamente autorizado, comunique a la Distribuidora, con una antelación no menor a 90 días, la fecha definitiva de finalización de la obra. Es importante que previo a ese plazo el tablero de medidores se encuentre inspeccionado y habilitado. Esta comunicación es fundamental para que la Distribuidora arbitre los medios necesarios para otorgar el suministro definitivo en el plazo estipulado.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles3'>Otorgamiento de Suministro de Servicios Generales y suministros individuales</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description2'>Habiendo finalizado las obras necesarias, la Distribuidora se comunicará con el Desarrollador o representante debidamente autorizado para informar que están habilitados para solicitar la baja del medidor de obra y la solicitud del medidor de Servicios Generales y suministros individuales siempre y cuando así lo requieran.</p>
                    </AccordionDetails>
                </Accordion>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>¿Qué evaluamos en una solicitud de servicio?</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description2'>Con la información que presentes para tu solicitud, se evaluará si podemos brindarte el servicio en alguna de estas condiciones:</p>
                        <ul className='servicio-description2' style={{paddingLeft: "25px"}}>
                            <li> Atender tu demanda con las redes existentes</li>
                            <li>Atender tu demanda a través de una modificación en nuestra red estableciendo las obras de ampliación necesarias para abastecer la demanda solicitada en las condiciones de calidad de servicio estipulados por la reglamentación vigente. En tal caso, en caso de corresponder, se determinarán los cargos a abonar por el solicitante.</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Fade>
    )
}

export default ServicioEdificios