//Importaciones:
import { Fade } from "react-awesome-reveal"
import "../../../pages/servicioElectrico/ServicioElectrico.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

//JSX:
const ServicioUsuarios = () => {
    return (
        <Fade triggerOnce={true} duration={800} delay={100}>
            <div className='servicioComponents-container'>
                <div>
                    <h2 className='servicio-title2'>Medianos y Grandes Usuarios</h2>
                    <p className='servicio-description'>Cuando tu suministro requiera de 10KW o más, entonces debes considerarte un Gran Usuario de la distribuidora.</p>
                    <p className='servicio-description'>Según la potencia que requieras, se le asignará alguna de las siguientes tarifas:</p>
                </div>
                <div>
                <ul className='servicio-description'  style={{paddingLeft: "25px"}}>
                    <li><strong>Tarifa T2 - Medianas Demandas:</strong> Cuando la potencia solicitada se encuentra entre los 10KW y los 49KW.</li>
                    <li><strong>Tarifa T3 - Grandes Demandas:</strong> Cuando la potencia solicitada supera los 49KW.</li>
                </ul>
                </div>
                <div>
                    <p className='servicio-description'>Cada una de estas tarifas tiene su propio Reglamento de acometidas y encuadramiento tarifario:</p>
                    <ul className='servicio-description'  style={{paddingLeft: "25px"}}>
                        <li><a href="https://oceba.gba.gov.ar/nueva_web/PDFS/acometidas/Resolucion0074Anexo.pdf" target="_blank"  className='servicio-link'>Reglamento de Acometidas Usuarios Tarifa 2 - Medianas Demandas</a></li>
                        <li><a href="https://oceba.gba.gov.ar/nueva_web/PDFS/acometidas/Resolucion0093Anexo.pdf" target="_blank"  className='servicio-link'>Reglamento de Acometidas Suministro en Tarifa T3 - Baja Tensión</a></li>
                    </ul>
                </div>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>¿Cómo inicio el trámite?</h3></AccordionSummary>
                    <AccordionDetails>
                    <p className='servicio-description2'>Podes iniciar el trámite presentándote en las Oficinas de Atención a Usuarios en Alberti 3600 o escribinos y envianos tu consulta a <a href="mailto:comercial@coopelectmdp.com.ar"  className='servicio-link2'>comercial@coopelectmdp.com.ar</a> o <a href="mailto:comercialgc@cooperativamdp.com.ar"  className='servicio-link2'>comercialgc@cooperativamdp.com.ar</a>.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "#3d116d", fontSize: "35px"}}/>}><h3 className='servicio-subtitles2'>¿Qué documentación necesito?</h3></AccordionSummary>
                    <AccordionDetails>
                        <p className='servicio-description'>Para realizar el trámite deberás presentar la siguiente documentación:</p>
                        <ul className='servicio-description'  style={{paddingLeft: "25px"}}> 
                            <li>Solicitud de Suministro en la tarifa que corresponda, firmada al dorso e indicando potencia contratada en cada banda horaria.</li>
                            <li>Condiciones Generales de la tarifa que corresponda,T1, T2 o T3 (<a href="https://oceba.gba.gov.ar/nueva_web/s.php?i=16" target="_blank"  className='servicio-link2'>Categorías Tarifarias</a>).</li>
                            <li>Censo de carga firmado por técnico o ingeniero matriculado.</li>
                            <li>Comprobante de ocupación, posesión o tenencia legal del inmueble (contrato de locación sellado, escritura, etc.).</li>
                            <li>Contrato Social, en caso de ser persona jurídica.</li>
                            <li>Fotocopia del DNI en caso de ser persona física.</li>
                            <li>Habilitación municipal o constancia de inicio de trámite.</li>
                            <li>En caso de ser persona jurídica, documentación que acredita la representación de la sociedad por parte del firmante (acta de directorio, estatuto, poder, etc.).</li>
                            <li>Constancia de la condición en IVA y en Ingresos Brutos.</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Fade>
    )
}

export default ServicioUsuarios