// Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import "../preguntas/Preguntas.css";
import { Fade } from 'react-awesome-reveal';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';


//JSX:
const Preguntas = () => {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        dispatch(setTitle('Preguntas Frecuentes'));
    }, [dispatch]);

    // Función para manejar cambios en el hash de la URL
    const handleHashChange = () => {
        const pregunta = window.location.hash;

        if (['#pregunta-1', '#pregunta-2', '#pregunta-3', '#pregunta-4', '#pregunta-6', '#pregunta-14'].includes(pregunta)) {
            const preguntaId = pregunta.replace('#', '');
            setExpanded(preguntaId);

            setTimeout(() => {
                const element = document.getElementById(preguntaId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    };

    // Ejecutar al cargar la página y cuando cambia el hash
    useEffect(() => {
        handleHashChange(); // Verificar el hash al cargar la página
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // Función para manejar clics en los acordeones
    const handleAccordionChange = (panel) => {
        setExpanded((prev) => (prev === panel ? null : panel));
    };


    return (
        <section className='preguntas-main-container'>
            <Helmet>
                <title>Preguntas Frecuentes</title>
            </Helmet>
            <div className='preguntas-accordion-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <AccordionGroup variant='soft' size='lg'>
                        <Accordion  id="pregunta-1" 
                                    expanded={expanded === 'pregunta-1'} 
                                    onChange={() => handleAccordionChange('pregunta-1')}>
                            <AccordionSummary><p><span>1- </span>¿CUÁLES SON LOS REQUISITOS PARA DAR DE ALTA UN SUMINISTRO?</p></AccordionSummary>
                            <AccordionDetails><p>El suministro puede ser solicitado por personas humanas o jurídicas, agrupaciones de colaboración y uniones transitorias de empresas, que acrediten la posesión o tenencia legal del inmueble o instalación para el cual se solicita el suministro y mientras dure su derecho de uso.</p>
                            <p>Para conectar el servicio en tu hogar o comercio, necesitas tener la siguiente información y documentación:</p>
                            <ul className='FormasPago-accordion-content'>
                                <li>DNI y para sociedades estatuto o contrato social y poder correspondiente.</li>
                                <li>Documento que avale la tenencia o posesión del inmueble (ESCRITURA / CONTRATO DE ALQUILER  / BOLETO COMPRA VENTA SELLADO).</li>
                                <li>Censo de cargas realizado por un matriculado en caso que necesites conectar un suministro trifásico.</li>
                            </ul>
                                <Accordion>
                                    <AccordionSummary><p>Para suministros comerciales</p></AccordionSummary>
                                    <AccordionDetails>
                                        <ul className='FormasPago-accordion-content'>
                                            <li>Habilitación Municipal o constancia de iniciación de trámite de habilitación.</li>
                                            <li>Constancia de CUIT e Inscripción de Ingresos Brutos (en su caso, documentación que acredite exenciones impositivas).</li>
                                            <li>Permiso Municipal o constancia de trámite de permiso (comercial, eventos y ferias).</li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            id="pregunta-2" 
                            expanded={expanded === 'pregunta-2'} 
                            onChange={() => handleAccordionChange('pregunta-2')}>
                            <AccordionSummary><p><span>2- </span>¿CUÁLES SON LOS REQUISITOS PARA REALIZAR UN CAMBIO DE TITULARIDAD?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Si queres realizar el cambio de titularidad del servicio, necesitas tener la siguiente información y documentación:</p>
                                <ul className='FormasPago-accordion-content'>
                                    <li>Número de cuenta del suministro.</li>
                                    <li>DNI y para sociedades estatuto o contrato social y poder correspondiente.</li>
                                    <li>Documento que avale la tenencia o posesión del inmueble. (ESCRITURA / CONTRATO DE ALQUILER  / BOLETO COMPRA VENTA SELLADO).</li>
                                    <li>Censo de cargas realizado por un matriculado en caso que necesites conectar un suministro trifásico.</li>
                                </ul>
                                <Accordion>
                                    <AccordionSummary><p>Para suministros comerciales</p></AccordionSummary>
                                    <AccordionDetails>
                                        <ul className='FormasPago-accordion-content'>
                                            <li>Habilitación Municipal o constancia de iniciación de trámite de habilitación.</li>
                                            <li>Constancia de CUIT e Inscripción de Ingresos Brutos (en su caso, documentación que acredite exenciones impositivas).</li>
                                        </ul>
                                        <p>Si el suministro no tiene medidor colocado, deberás realizar el trámite de <Link to={"/servicio-electrico?selected=conexion"} className='FormasPago-accordion-link'>Conexión de servicio</Link></p>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            id="pregunta-3" 
                            expanded={expanded === 'pregunta-3'} 
                            onChange={() => handleAccordionChange('pregunta-3')}
                        >
                            <AccordionSummary><p><span>3- </span>¿CUÁLES SON LOS REQUISITOS PARA REALIZAR LA REINSTALACIÓN DEL SUMINISTRO?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Si queres poner la titularidad de un suministro que se encuentra dado de baja, sin medidor instalado, necesitas tener la siguiente información y documentación:</p>
                                <ul className='FormasPago-accordion-content'>
                                    <li>Número de cuenta del suministro (se encuentra en la factura).</li>
                                    <li>DNI y para sociedades estatuto o contrato social y poder correspondiente.</li>
                                    <li>Documento que avale la tenencia o posesión del inmueble. (ESCRITURA / CONTRATO DE ALQUILER  / BOLETO COMPRA VENTA SELLADO).</li>
                                    <li>Censo de cargas realizado por un matriculado en caso que necesites conectar un suministro trifásico.</li>
                                </ul>
                                <Accordion>
                                    <AccordionSummary><p>Para suministros comerciales</p></AccordionSummary>
                                    <AccordionDetails>
                                        <ul className='FormasPago-accordion-content'>
                                            <li>Habilitación Municipal o constancia de iniciación de trámite de habilitación.</li>
                                            <li>Constancia de CUIT e Inscripción de Ingresos Brutos (en su caso, documentación que acredite exenciones impositivas).</li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            id="pregunta-4" 
                            expanded={expanded === 'pregunta-4'} 
                            onChange={() => handleAccordionChange('pregunta-4')}
                        >
                            <AccordionSummary><p><span>4- </span>¿CUÁLES SON LOS REQUISITOS PARA DAR DE BAJA UN SUMINISTRO?</p></AccordionSummary>
                            <AccordionDetails><p>Si sos  titular del servicio podés realizar la baja y el retiro del medidor, en cualquier momento de la prestación del servicio. *</p>
                            <p>No debés tener saldos pendientes de pago, y deberás abonar con la baja del servicio, una factura final con los consumos que realizaste desde tu última lectura a la fecha de la baja.</p>
                            <p>En caso de haber realizado al inicio de tu servicio el pago del depósito de garantía, el mismo se reintegrará en tu última factura. De existir un crédito a tu favor, te solicitaremos la información necesaria para el reintegro del mismo en el momento de la atención del turno.</p>
                            <p>* En caso de que el trámite sea gestionado por un tercero, deberá presentar el poder o autorización correspondiente y su DNI.</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>5- </span>ME SUSPENDIERON EL SERVICIO POR FALTA DE PAGO, ¿CÓMO LO REHABILITO?</p></AccordionSummary>
                            <AccordionDetails><p>Si tu suministro fue suspendido por falta de pago podrás gestionar la rehabilitación de manera automática, de manera digital con tarjeta de débito y crédito Visa, Mastercard, Cabal y Naranja de forma digital a través:</p>
                            <ul className='FormasPago-accordion-content'>
                                <li>Abonando desde <a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target='_blank' className='FormasPago-accordion-link'>Oficina Virtual</a></li>
                            </ul>
                            <p>Además, si no contas con medios digitales, podrás concurrir a cualquier de estas entidades:</p>
                            <ul className='FormasPago-accordion-content'>
                                <li>Provincia NET</li>
                                <li>Ripsa</li>
                                <li>Caja 1 Cooperativa</li>
                            </ul>
                            <p>Recordá que podes mencionar tu número de cuenta  sin necesidad de presentarte con tu factura. Dichas entidades están habilitadas para el cobro de facturas vigentes o vencidas, con aviso de deuda o suspensión, o el servicio suspendido.</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            id="pregunta-6" 
                            expanded={expanded === 'pregunta-6'} 
                            onChange={() => handleAccordionChange('pregunta-6')}
                        >
                            <AccordionSummary><p><span>6- </span>¿QUÉ ES LA SEGMENTACIÓN ENERGÉTICA?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Es una iniciativa que lanzó el gobierno (DNU 332/22) para ordenar los subsidios eléctricos en base a los aspectos socioeconómicos de cada hogar, creando el Registro de Acceso a los Subsidios de Energía ( RASE ) para identificar a los usuarios que lo necesiten.</p>
                                <p>Podés anotarte o modificar tu formulario de inscripción ingresando en <a href="https://subsidios-energia.argentina.gob.ar/" target='_blank' className='FormasPago-accordion-link'>subsidios-energía</a> , tené en cuenta que la asignación del subsidio no es automática, ya que tras un análisis de la solicitud, las autoridades intervinientes nos informan el segmento al cual corresponde tu suministro y luego es aplicado en tu factura.</p>
                                <p>¿Qué datos necesito para completar el formulario?:</p>
                                <ul className='FormasPago-accordion-content'>
                                    <li>Número de cuenta (Encontralo en tu factura)</li>
                                    <li>Número de medidor</li>
                                    <li>DNI y número de trámite</li>
                                    <li>Número de CUIL de los integrantes mayores a 18 años del hogar</li>
                                    <li>Ingresos de bolsillo de cada integrante mayor a 18 años del hogar</li>
                                    <li>Mail</li>
                                </ul>
                                <p>Se aplica para aquellos usuarios residenciales que quieran mantener el subsidio en su hogar.</p>
                                <p>NO incluye:</p>
                                <ul className='FormasPago-accordion-content'>
                                    <li>Suministros comerciales</li>
                                    <li>Suministros servicios generales (consorcios, riego, obra)</li>
                                    <li>Otros tipos de suministros no residenciales</li>
                                </ul>
                                <p>Existen tres niveles de segmentación:</p>
                                <ol className='FormasPago-accordion-content'>
                                    <li>N1 – Ingresos Altos: no tienen subsidio.</li>
                                    <li>N2 – Menores ingresos: reciben subsidio por el total de sus consumos.</li>
                                    <li>N3 – Ingresos medios: reciben subsidio hasta los 400 kWh mensuales de consumo.</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>7- </span>¿CÓMO PUEDO ADHERIR AL DÉBITO AUTOMÁTICO DE LA FACTURA?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Podrás optar por la adhesión al débito automático en una tarjeta de crédito o bien el débito directo en tu cuenta bancaria. Tené en cuenta que una vez finalizado el trámite, se efectuará dicha adhesión a partir de la próxima facturación emitida.</p>
                                <p>Para realizar la adhesión a tu tarjeta de crédito los datos que necesitarás son:</p>
                                <ul className='FormasPago-accordion-content'>
                                    <li>Número de cuenta de tu suministro.</li>
                                    <li>Nombre y apellido, tal como figura en la tarjeta.</li>
                                    <li>Tipo de tarjeta de crédito (Visa, Mastercard, Argencard, Cabal y Naranja). Solo tarjetas emitidas en Argentina.</li>
                                    <li>Número de la tarjeta de crédito de 16 dígitos.</li>
                                </ul>
                                <p>Para realizar la adhesión al débito directo los datos que necesitarás son:</p>
                                <ul className='FormasPago-accordion-content'>
                                    <li>Nombre y apellido o razón social de la cuenta bancaria.</li>
                                    <li>Banco.</li>
                                    <li>Número de CBU.</li>
                                    <li>Tipo de cuenta (Caja de Ahorro o Cuenta Corriente).</li>
                                </ul>
                                <p>Podrás realizar el trámite de manera online en nuestra <a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target='_blank' className='FormasPago-accordion-link'>Oficina Virtual</a></p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>8- </span>¿COMO SE CALCULAN LOS CONSUMOS?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>El consumo del período para tu facturación se determina por los kilovatios hora (kWh) que surgen de la diferencia entre el estado de lectura actual y el estado de lectura anterior para un bimestre de consumo, que luego se factura en dos cuotas mensuales.</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>9- </span>¿COMO PUEDO ESTIMAR MIS CONSUMOS (SIMULADOR)?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>A través de la siguiente aplicación: <a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=100" target='_blank' className='FormasPago-accordion-link'>SIMULADOR DE CONSUMO</a> , tendrás la posibilidad de estimar el consumo mensual de tu inmueble.</p>
                                <p>Esta herramienta te permitirá controlar el consumo, en búsqueda que el mismo sea más eficiente, ayudando al cuidado del planeta.</p>
                                <p>Es muy simple y rápido, solo necesitas seleccionar  cada artefacto eléctrico que tenes  en tu domicilio y el tiempo de uso promedio diario.</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>10- </span>¿CUÁNDO DEBO MODIFICAR LA TARIFA DE MI SUMINISTRO DE RESIDENCIAL A COMERCIAL O VICEVERSA?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Siempre que cambies el destino original que solicitaste para el servicio eléctrico, deberás informarlo a los efectos de adecuar el suministro al nuevo encuadramiento tarifario, SOLICITANDO INSPECCIÓN Y PRESENTANDO UN CENSO DE CARGA.</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>11- </span>¿CÓMO CAMBIO EL MAIL DONDE RECIBO MI FACTURA DIGITAL?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>El correo electrónico que usaste para registrarte en la Oficina Virtual es donde recibirás las facturas, si deseas cambiar ese correo lo puedes hacer desde la oficina virtual en Actualizar datos.</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>12- </span>¿CÓMO PUEDO DESCARGAR MI FACTURA?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Podrás descargar tu factura de manera online en <a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target='_blank' className='FormasPago-accordion-link'>Oficina Virtual</a></p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>13- </span>¿CÓMO REALIZO UNA DENUNCIA POR ROBO DE ENERGÍA?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>La conexión ilegal representa un grave peligro de muerte, no solo para el que la realiza, sino también para su familia y vecinos. Además, es un delito penado por la ley. Una conexión ilegal afecta la calidad de servicio de quién está vinculado a la COOPERATIVA legalmente produciendo variaciones de tensión. Denunciar a quién comete una conexión ilegal estará protegiendo su vida, a su familia y a sus bienes. Por favor, comuníquese con nuestra Sede Administrativa.</p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion
                            id="pregunta-14" 
                            expanded={expanded === 'pregunta-14'} 
                            onChange={() => handleAccordionChange('pregunta-14')}
                        >
                            <AccordionSummary><p><span>14- </span>ELECTRODEPENDIENTES</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Contamos con un servicio diferencial para acompañar a las personas electrodependientes por cuestiones de salud. Para solicitarlo primero es necesario que te inscribas en el Registro de Electrodependientes por Cuestiones de Salud (RECS) del Ministerio de Salud de la Nación.</p>
                                <Accordion>
                                    <AccordionSummary><p>¿Quiénes pueden inscribirse?</p></AccordionSummary>
                                    <AccordionDetails>
                                        <p>Aquellas personas que requieran de un suministro eléctrico constante y en niveles de tensión adecuados para poder alimentar el equipamiento médico prescripto por un médico matriculado y que resulte necesario para evitar riesgos en su vida o su salud (Ley 14.988 de la Provincia de Buenos Aires, que adhiere a lo dispuesto por la Ley Nacional 27.351).</p>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary><p>¿Cómo puedo inscribirme en el RECS?</p></AccordionSummary>
                                    <AccordionDetails>
                                        <p>Podés inscribirte online en la página del <a href="https://www.argentina.gob.ar/servicio/inscribirme-en-el-registro-de-electrodependientes-por-cuestiones-de-salud" target='_blank' className='FormasPago-accordion-link' >Ministerio de salud</a> donde te guiarán para completar cada una de las etapas.</p>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary><p>¿En qué consiste el servicio diferencial?</p></AccordionSummary>
                                    <AccordionDetails>
                                        <p>Al ser aceptados en el RECS se accede al servicio eléctrico de forma gratuita y en el domicilio se instala una fuente de energía alternativa para atender las necesidades de la persona electrodependiente s. Además,  cuenta con una línea telefónica de asistencia gratuita y exclusiva las 24 horas todos los días del año.</p>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary><p>¿Quién puede solicitar el servicio diferencial?</p></AccordionSummary>
                                    <AccordionDetails>
                                        <p>Puede ser el titular del servicio o uno de sus convivientes que ya se encuentre registrado en el Registro de Electrodependientes por Cuestiones de Salud (RECS).</p>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary><p>Ya me inscribí pero no me respondieron, ¿puedo obtener el servicio diferencial?</p></AccordionSummary>
                                    <AccordionDetails>
                                        <p>Si, presentando la constancia del inicio del trámite de inscripción al RECS.</p>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>15- </span>¿CÓMO REALIZAR UN TRASLADO O CAMBIO DE MEDIDOR MONOFÁSICO A TRIFÁSICO?</p></AccordionSummary>
                            <AccordionDetails>
                                <p>Si necesitas realizar un traslado o cambio de medidor, acércate a nuestra oficina comercial o reaiza las consultas necesarias a <a href="mailto:comercial@coopelectmdp.com.ar" className='FormasPago-accordion-link'>comercial@coopelectmdp.com.ar</a></p>
                                <p>Asegurá que las instalaciones se encuentren aptas con las modificaciones correspondientes y el habitáculo identificado con el número de cuenta  para que podamos reemplazar el medidor vigente de acuerdo a tu solicitud.</p>
                                <p>Conocé más información sobre medidas de pilar/habitáculo y condiciones en general en el <a href="https://www.oceba.gba.gov.ar/nueva_web/s.php?i=12" target='_blank' className='FormasPago-accordion-link' >Reglamento de Acometidas</a></p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>16- </span>PRESENTACIÓN DE UN RECLAMO DE ARTEFACTOS DAÑADOS</p></AccordionSummary>
                            <AccordionDetails>
                                <p>El plazo para la presentación de reclamos ante la prestadora del Servicio Público de Electricidad por daños producidos a artefactos o instalaciones derivadas de fallas en la calidad del suministro, será de tres (3) días hábiles, contados a partir de la fecha en que se produjo el hecho que ocasionó el daño. Sólo serán atendidos si obran en nuestros archivos planos de la instalación eléctrica de su domicilio firmado por personal habilitado, donde las protecciones estén de acuerdo con las exigidas por la Ley Marco Regulatorio. Puede consultar las bases de dicho marco en <a href="https://oceba.gba.gov.ar/nueva_web/#" target='_blank' className='FormasPago-accordion-link'>https://oceba.gba.gov.ar/nueva_web/#</a></p>
                            </AccordionDetails>
                        </Accordion>
                    </AccordionGroup>
                </Fade>
            </div>
                <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                    <div className='preguntas-usuarios-text'>
                        <h3 className='preguntas-usuarios-title'>Sres. Usuarios:</h3>
                        <p className='preguntas-usuarios-description'>En caso de <strong>corte de servicio por falta de pago</strong>, si abonan el valor de la reconexión por transferencia o depósito, <strong>dicha reconexión de servicio se hará efectiva una vez que se acredite el pago en nuestros bancos. </strong>
                        Recuerde enviar el comprobante de pago por mail indicando el N° de asociado, como indican las instrucciones. <br/>Muchas gracias.</p>
                    </div>
                </Fade>
                   <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                    <div className='preguntas-usuarios-text'>
                        <h3 className='preguntas-usuarios-title'>Canal de comunicacion</h3>
                        <p className='preguntas-usuarios-description'>Contacta a nuestro nueval canal de Whatsapp</p>
                        <h3 className='contacto-number'><a href="https://wa.link/583s3n" target="_blank" rel="noopener noreferrer"> 223 540-5430</a></h3>
                    </div>
                </Fade>
                
        </section>
    );
};

export default Preguntas;