//Importaciones:
import { Fade } from 'react-awesome-reveal';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

//JSX:
const PreguntasNaveAccordion = () => {
    return (
        <div className='preguntasNave-accordion-container'>
            <Fade triggerOnce={true} duration={800} delay={300}>
                <AccordionGroup variant='soft' size='lg'>
                    <Accordion>
                        <AccordionSummary><p>¿Qué es NAVE INTERNET?</p></AccordionSummary>
                        <AccordionDetails><p>NAVE INTERNET es un servicio de telecomunicaciones que utiliza tecnología de <strong>fibra óptica directa al hogar (FTTH – Fiber to the Home)</strong>. Esto garantiza una conexión estable, de alta velocidad y excelente calidad para navegar, trabajar desde casa, hacer videollamadas o ver contenido en streaming.</p></AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Qué es la TV Digital?</p></AccordionSummary>
                        <AccordionDetails><p>La TV Digital es un servicio adicional de NAVE. Es una plataforma de contenidos que se descarga a modo de aplicación en el televisor, celular o computadora. Es importante que el televisor cuente con <strong>Android TV</strong> como sistema operativo. Además puede disfrutarse desde notebook, celulares, tablets y PC de escritorio.  El plan que ofrecemos cuenta con 99 canales y Futbol Premium. Además incluye HBO MAX POR 12 MESES GRATIS!</p>
                        <p className="preguntasNave-texto">El servicio de TV Digital está disponible para toda la ciudad de Mar del Plata</p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Cómo descargo y configuro la app de TV ROCSTAR en mi Smart TV Android?</p></AccordionSummary>
                        <AccordionDetails>
                            <p>Te explicamos paso a paso:</p>
                            <p><strong>1. Conexión a WIFI:</strong></p>
                            <ul className='FormasPago-accordion-content'>
                                <li>En tu TV, ingresá a Ajustes (ícono de engranaje en el margen superior derecho) y presioná OK.</li>
                                <li>Seleccioná Red e Internet y presioná OK.</li>
                                <li>Buscá tu red WiFi utilizando las flechas del control remoto, seleccionála y presioná OK.</li>
                                <li>Ingresá tu contraseña:<br/>Si no la cambiaste, es el DNI del titular del servicio. (Si tu DNI tiene 7 dígitos, agregá un "0" adelante).</li>
                                <li>Usá el botón IR/ENTER del teclado en pantalla para conectarte.</li>
                                <li>Esperá a que indique "Conexión establecida".</li>
                            </ul>
                            <p><strong>2. Configuración de tu cuenta de Google:</strong></p>
                            <ul className='FormasPago-accordion-content'>
                                <li>Volvé con la flecha Atrás al menú de Ajustes.</li>
                                <li>Bajá hasta Cuentas e inicio de sesión.</li>
                                <li>Iniciá sesión con una cuenta de Gmail personal.<br/>Si ya tenés una cuenta configurada, simplemente continuá.</li>
                            </ul>
                            <p><strong>3. Instalación de la app ROCSTAR:</strong></p>
                            <ul className='FormasPago-accordion-content'>
                                <li>Volvé al Menú Principal de la TV usando la flecha Atrás o el botón de Inicio.</li>
                                <li>Ingresá a Google Play Store.</li>
                                <li>Usá la función de búsqueda para buscar y escribí "ROCSTAR".</li>
                                <li>Seleccioná ROCSTAR y presioná Instalar.</li>
                            </ul>
                            <p><strong>4. Primer inicio de sesión en ROCSTAR:</strong></p>
                            <ul className='FormasPago-accordion-content'>
                                <li>Volvé al menú de inicio y abrí la app ROCSTAR.</li>
                                <li>En la pantalla de inicio:<br/>
                                    <ul className='FormasPago-accordion-content'>
                                        <li>Seleccioná la opción Operador, presioná OK y elegí COOPMDQ de la lista.</li>
                                        <li>Ingresá el Usuario y la Contraseña que te entregaron nuestros técnicos al momento de la instalación.</li>
                                        <li>Confirmá con Aceptar.</li>
                                    </ul>
                                </li>
                            </ul>
                            <p>¡Listo! Si ingresaste todo correctamente, vas a ver la grilla de canales y disfrutar de la TV.</p>
                            <p><strong>¿Problemas durante la instalación?</strong></p>
                            <p>No te preocupes. Comunicate con nuestro soporte técnico telefónico: 223 306-0280 (Guardia de soporte técnico).</p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>Grilla de canales DE TV DIGITAL</p></AccordionSummary>
                        <AccordionDetails><p>Hacé clic <a href="https://res.cloudinary.com/dj3akdhb9/image/upload/v1747667903/cooperativa/grilla%20TV%20digital.png" className="preguntasNave-link" target="_blank" rel="noopener noreferrer">aquí</a> para ver la grilla de canales disponibles</p></AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Cómo me comunico con un representante?</p></AccordionSummary>
                        <AccordionDetails><p>Podés escribirnos por WhatsApp al 223 537 6973 de <strong>lunes a viernes de 8 a 15 hs</strong>.
                                            Fuera de ese horario, contamos con una <strong>asistente virtual con inteligencia artificial</strong> que responde tus consultas las 24 hs.
                                            También podés visitarnos en nuestra oficina: <strong>20 de Septiembre 2638</strong>, Mar del Plata.</p></AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Cuáles son los planes disponibles?</p></AccordionSummary>
                        <AccordionDetails>
                            <p>Ofrecemos planes para hogares, pequeños comercios y empresas:</p>
                            <ul className='FormasPago-accordion-content'> 
                                <li>
                                    <p><strong>Plan 300/300</strong></p>
                                    <p>300 Mbps de bajada y subida. Ideal para hogares con varios dispositivos conectados y necesidades básicas de velocidad.</p>
                                </li>
                                <li>
                                    <p><strong>Plan 600/600</strong></p>
                                    <p>600 Mbps de bajada y subida. Pensado para quienes necesitan mayor rendimiento: videollamadas, streaming en 4K y trabajo remoto.</p>
                                </li>
                                <li>
                                    <p><strong>Plan GIGA 1000/1000</strong></p>
                                    <p>1000 Mbps de bajada y subida. Nuestro plan más potente, ideal para hogares grandes o oficinas con múltiples usuarios y un uso intensivo de la conexión.</p>
                                </li>
                                <li>
                                    <p><strong>Planes con Mbps dedicados</strong></p>
                                    <p>Conexiones exclusivas para grandes empresas o clientes corporativos. No compartís el ancho de banda con otros usuarios. Total estabilidad, velocidad garantizada y atención técnica especializada.</p>
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Cómo puedo contratar NAVE INTERNET?</p></AccordionSummary>
                        <AccordionDetails>
                            <p>Podés contratar nuestro servicio de tres formas:</p>
                            <ul className='FormasPago-accordion-content'> 
                                <li>Completando el <a className="preguntasNave-link" href="/formulario" target="_blank" rel="noopener noreferrer">formulario online</a>.</li>
                                <li>Por WhatsApp al <strong>223 537 6973</strong>.</li>
                                <li>O visitándonos en nuestra oficina.</li>
                            </ul>
                            <p>Un representante te guiará en el proceso y responderá todas tus dudas.</p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Qué necesito para tener NAVE INTERNET en mi hogar?</p></AccordionSummary>
                        <AccordionDetails><p>
                            Solo necesitás que tu domicilio esté dentro de nuestra <strong>zona de cobertura de fibra óptica</strong>. Nosotros nos encargamos de la instalación completa: router, cables y todo lo necesario para que empieces a disfrutar de tu conexión.
                            </p></AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Cuánto demora la instalación?</p></AccordionSummary>
                        <AccordionDetails><p>La instalación puede tardar entre <strong>5 y 10 días hábiles</strong>, dependiendo de tu ubicación. Un técnico de NAVE INTERNET se encargará de dejar todo listo y funcionando.</p></AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Puedo cambiar de plan después de contratar?</p></AccordionSummary>
                        <AccordionDetails><p>¡Sí! Podés cambiar de plan en cualquier momento. Si necesitás más velocidad, simplemente contactanos y gestionamos el cambio por vos.</p></AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Ofrecen soporte técnico?</p></AccordionSummary>
                        <AccordionDetails><p>Sí. Contamos con <strong>soporte técnico especializado</strong> para resolver cualquier inconveniente.
                                            Podés contactarnos por teléfono o programar una visita técnica. También tenemos una <strong>guardia técnica al 153 060 280</strong>.</p></AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Puedo contratar NAVE INTERNET si no soy miembro de la Cooperativa?</p></AccordionSummary>
                        <AccordionDetails><p>Sí, nuestro servicio está disponible para todo el público.
                                            Nuestra cobertura está en constante expansión, y además ofrecemos <strong>TV Digital en toda Mar del Plata</strong>.</p>
                                            <p>Consultá si llegamos a tu domicilio completando este <a className="preguntasNave-link"  href="/formulario" target="_blank" rel="noopener noreferrer">formulario</a></p>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary><p>¿Cuáles son los medios de pago?</p></AccordionSummary>
                        <AccordionDetails><p>Consultá todos los medios de pago disponibles haciendo clic<a className="preguntasNave-link"  href="/formas-de-pago" target="_blank" rel="noopener noreferrer"> acá</a></p></AccordionDetails>
                    </Accordion>
                </AccordionGroup>
            </Fade>
        </div>
    )
}

export default PreguntasNaveAccordion