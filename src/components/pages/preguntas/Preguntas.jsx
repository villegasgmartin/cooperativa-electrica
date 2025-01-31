//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import PagosAcordeon from '../../common/FormasPagoComponents/PagosAcordeon';
import "../preguntas/Preguntas.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"
import { Link } from 'react-router-dom';

//JSX:
const Preguntas = () => {

    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(setTitle('Preguntas Frecuentes'));
    }, [dispatch]);

    return (
        <section className='preguntas-main-container'>
            <Helmet>
                <title>Preguntas Frecuentes</title>
            </Helmet>
            <div className='preguntas-accordion-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <AccordionGroup variant='soft' size='lg'>
                        <Accordion>
                            <AccordionSummary><p><span>1- </span>¿DONDE PAGO MIS FACTURAS?</p></AccordionSummary>
                            <AccordionDetails><PagosAcordeon/></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>2- </span>¿Y SI PAGO FUERA DE TÉRMINO?</p></AccordionSummary>
                            <AccordionDetails><p>Las facturas vencidas pueden ser abonadas solamente en la sede de la Cooperativa. En caso de no abonarse la factura a la fecha de su vencimiento, 1°ó 2° vencimiento respectivamente, la COOPERATIVA aplicará automáticamente y en la factura siguiente el interés previsto en el Artículo 9 del Subanexo "E" del Reglamento de Suministro y Concesión.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>3- </span>¿CUÁL ES EL PLAZO DE DESCONEXIÓN POR FALTA DE PAGO?</p></AccordionSummary>
                            <AccordionDetails><p>Transcurridos QUINCE (15) DÍAS HÁBILES ADMINISTRATIVOS de MORA (de acuerdo al Subanexo "A", Artículos 2; 12; 21 y 24), la COOPERATIVA se encuentra facultada para disponer la suspensión del suministro de energía eléctrica al deudor moroso, previa comunicación con no menos de veinticuatro (24) horas de anticipación.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>4- </span>¿QUÉ DEBO HACER PARA RECONECTARME?</p></AccordionSummary>
                            <AccordionDetails><p>Cancelar la deuda correspondiente, únicamente en nuestra Sede Administrativa, abonando la mora y los cargos por rehabilitación establecidos en el Reglamento de Suministro y Conexión.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>5- </span>¿CUÁNTO TIEMPO ESTOY SIN SUMINISTRO SI ME CORTAN POR FALTA DE PAGO?</p></AccordionSummary>
                            <AccordionDetails><p>En realidad usted debe evitar esta situación. La COOPERATIVA dispondrá de CUARENTA y OCHO (48) HORAS HÁBILES para reconectar el suministro, luego del pago de la deuda y la re conexión.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>6- </span>¿SI NO LLEGA LA FACTURA A MI DOMICILIO QUÉ DEBO HACER?</p></AccordionSummary>
                            <AccordionDetails><p>La fecha del próximo vencimiento siempre está publicada en la factura anterior. En caso de que usted no recibiera la misma, deberá reclamarla en la Sede Administrativa o Telefónicamente, con un mínimo de CUATRO DÍAS de anticipación a la fecha mencionada. En caso de querer que llegue a otro domicilio debe presentarse el titular o la persona debidamente autorizada a la Sede Administrativa con DNI y datos del suministro.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>7- </span>¿SI DESEO QUE ME INSTALEN EL MEDIDOR?</p></AccordionSummary>
                            <AccordionDetails><p>Deberá solicitarlo en la Sede Administrativa de la COOPERATIVA, munido de DNI, comprobante que acredite la PROPIEDAD (Escritura Traslativa de Dominio, Boleto de Compra/Venta, etc.), TENENCIA (Contrato de Alquiler o Comodato debidamente timbrado y sellado ó certificado por escribano público) o POSESIÓN u OCUPACIÓN DEL BIEN (certificado de domicilio expedido por el registro nacional de las personas). Para uso comercial o industrial deberá acreditar la Habilitación Municipal, como así también, acompañar comprobante de inscripción impositiva IVA e IIBB. En caso de Personas Jurídicas (Sociedades Civiles y / o Comerciales): Acta Constitutiva, Estatuto, Acreditación (PODER) del Representante Legal con Fotocopia del DNI para poder realizar el trámite. OBRAS A CONSTRUIR: PLANO DE ELECTRICIDAD Y OBRA CONFECCIONADOS POR PROFESIONALES CONFORME A SU INCUMBENCIA Y APROBADOS POR LA MUNICIPALIDAD DE GENERAL PUEYRREDÓN. OBRAS EXISTENTES: TARIFAS T1R: CENSO DE CARGA SIN VISACIÓN DEL COLEGIO PROFESIONAL. TARIFAS T1G, T2 Y T3: CENSO DE CARGA VISADO POR EL COLEGIO PROFESIONAL CORRESPONDIENTE.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>8- </span>¿EXISTEN REQUISITOS RESPECTO AL PILAR DE MEDICIÓN QUE DEBO CONSTRUIR?</p></AccordionSummary>
                            <AccordionDetails><p>Sí, los pilares deben cumplir con los requisitos establecidos en la Resolución 92/08 de OCEBA que resolvió: "Aprobar el Reglamento de Acometidas para clientes de Tarifa 1 -Pequeñas Demandas- el que, como Anexo, forma parte de la presente" que entró en vigencia el 1 de enero de 2009". La Cooperativa le brindará la información necesaria al momento de solicitar la conexión del suministro.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>9- </span>¿SI EL MEDIDOR MARCA MÁS DE LO QUE CONSUMO QUÉ DEBO HACER?</p></AccordionSummary>
                            <AccordionDetails><p>El titular podrá pedir la revisión del medidor como prueba. Si el resultado de esta revisión, arroja que el medidor se encuentra dentro de los límites de tolerancia admitidos, podrá solicitar personalmente un contraste in situ o un contraste en laboratorio, el cual se realizará con cargo para el cliente en caso de confirmar el correcto funcionamiento del registrador.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>10- </span>¿ES POSIBLE SOLICITAR EL RETIRO DEL MEDIDOR DEL INMUEBLE?</p></AccordionSummary>
                            <AccordionDetails><p>Sí, previa cancelación de la deuda existente al momento de la solicitud, el titular o la persona debidamente autorizada por aquel, debe firmar la solicitud de desconexión. El mismo medidor NO puede ser trasladado a otro domicilio, en ese caso se debe solicitar la baja de la conexión de un domicilio y deberá solicitar una nueva conexión de suministro en el nuevo domicilio.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>11- </span>¿PUEDO CAMBIAR EL LUGAR DEL MEDIDOR?</p></AccordionSummary>
                            <AccordionDetails><p>Sí, dentro del límite de la propiedad y sobre la Línea Municipal. Debe tramitarlo el titular o una persona debidamente autorizada en la Sede Administrativa.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>12- </span>¿PUEDO SOLICITAR OTRO MEDIDOR DENTRO DEL MISMO INMUEBLE O DENTRO DE LA MISMA PARCELA?</p></AccordionSummary>
                            <AccordionDetails><p>Sí, pero para ello se debe presentar el plano de subdivisión en PH y/o planos de electricidad con intervención municipal que demuestren la independencia de las instalaciones eléctricas de cada unidad funcional. Esto incluye que se deberá contar con la caja de alojamiento para cada medidor de energía y abonar los cargos correspondientes al número de unidades funcionales.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>13- </span>¿PUEDE LA COOPERATIVA SOLICITAR LA CONSTITUCIÓN DE UN DEPÓSITO DE GARANTÍA?</p></AccordionSummary>
                            <AccordionDetails><p>Sí, en el caso que el cliente haya incurrido en más de una suspensión del suministro en 12 meses corridos, o bien sea cliente temporario o transitorio.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>14- </span>¿PUEDO SER SOCIO DE LA COOPERATIVA SIN SER SOCIO DEL SERVICIO?</p></AccordionSummary>
                            <AccordionDetails><p>No. Si se comprobara que el cliente no es el titular del suministro, LA COOPERATIVA intimará el cambio de la titularidad existente. En caso de que éste no presente la solicitud pertinente dentro de los diez (10) días hábiles administrativos, LA COOPERATIVA estará automáticamente habilitada para proceder al corte del suministro, con comunicación al ORGANISMO DE CONTROL. El titular registrado y el cliente no titular serán solidariamente responsables de todas las obligaciones establecidas a cargo de cualquiera de ellos en el presente Reglamento, incluso el pago de los consumos que se registrasen, recargos e intereses. El cambio de titularidad se realiza en la sede administrativa de la Cooperativa y es totalmente gratuito. No, si el cliente no es titular, la COOPERATIVA le intimará a realizar el cambio de titularidad. De no recibir respuesta, podrá suspender el suministro. Los inquilinos deben poner el suministro a su nombre. Para esto deben concurrir a la sede administrativa de La Cooperativa munidos del contrato de alquiler debidamente timbrado y sellado.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>15- </span>SI VEO QUE ALGUIEN ESTÁ CONECTADO ILEGALMENTE ¿QUÉ DEBO HACER?</p></AccordionSummary>
                            <AccordionDetails><p>La conexión ilegal representa un grave peligro de muerte, no solo para el que la realiza, sino también para su familia y vecinos. Además, es un delito penado por la ley. Una conexión ilegal afecta la calidad de servicio de quién está vinculado a la COOPERATIVA legalmente produciendo variaciones de tensión. Denunciar a quién comete una conexión ilegal estará protegiendo su vida, a su familia y a sus bienes. Por favor, comuníquese con nuestra Sede Administrativa al teléfono (0223) 495-1411/ 493-5777.</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>16- </span>¿ES OBLIGATORIA LA INSTALACIÓN DE UN DISYUNTOR?</p></AccordionSummary>
                            <AccordionDetails><p>Sí. La instalación de un disyuntor general, (o uno por circuito) es obligatoria desde el punto de vista reglamentario, pero además es la única protección segura para la vida de las personas, animales y cosas, tanto por electrocución como por incendio. Proteja asu familia. Si aún no lo hizo, consulte a su electricista e instale un disyuntor (también llamado protección diferencial).</p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>17- </span>PRESENTACIÓN DE RECLAMOS POR ARTEFACTOS DAÑADOS</p></AccordionSummary>
                            <AccordionDetails><p>El plazo para la presentación de reclamos ante la prestadora del Servicio Público de Electricidad por daños producidos a artefactos o instalaciones derivadas de fallas en la calidad del suministro, será de tres (3) días hábiles, contados a partir de la fecha en que se produjo el hecho que ocasionó el daño. Sólo serán atendidos si obran en nuestros archivos planos de la instalación eléctrica de su domicilio firmado por personal habilitado, donde las protecciones estén de acuerdo con las exigidas por la Ley Marco Regulatorio. Puede consultar las bases de dicho marco en <a href="https://oceba.gba.gov.ar/nueva_web/#" className='preguntas-accordion-link' target='_blank'>https://oceba.gba.gov.ar/nueva_web/#</a></p></AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>18- </span>¿CUÁLES SON LOS REQUISITOS PARA DAR DE ALTA UN SUMINISTRO?</p></AccordionSummary>
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
                                            <li>Para solicitar un suministro eléctrico para eventos y ferias en vía pública sacar un turno a través de <a href="https://oficinavirtual-coopmdp.micoop.com.ar/v2/login" target='_blank' className='FormasPago-accordion-link'>Oficina Virtual</a> con 7/ 10 días hábiles de anticipación a la realización del evento. Es necesario que al momento de la atención, tengas disponible la siguiente información y documentación:
                                            </li>
                                        </ul>
                                        <ol className='FormasPago-accordion-content'>
                                            <li>Fecha de inicio y finalización del evento.</li>
                                            <li>Horas diarias de utilización del servicio.</li>
                                            <li>Tipo de conexión (monofásica o trifásica, acompañar censo de carga con la descripción de los artefactos a alimentar y potencia simultánea (kW) estimada a consumir).</li>
                                        </ol>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>19- </span>¿CUÁLES SON LOS REQUISITOS PARA REALIZAR UN CAMBIO DE TITULARIDAD?</p></AccordionSummary>
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
                                        <p>Si el suministro no tiene medidor colocado, deberás realizar el trámite de <Link  className='FormasPago-accordion-link'>Conexión de servicio</Link></p>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary><p><span>20- </span>¿CUÁLES SON LOS REQUISITOS PARA REALIZAR LA REINSTALACIÓN DEL SUMINISTRO?</p></AccordionSummary>
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
                        <Accordion>
                            <AccordionSummary><p><span>21- </span>¿CUÁLES SON LOS REQUISITOS PARA DAR DE BAJA UN SUMINISTRO?</p></AccordionSummary>
                            <AccordionDetails><p>Si sos  titular del servicio podés realizar la baja y el retiro del medidor, en cualquier momento de la prestación del servicio. *</p>
                            <p>No debés tener saldos pendientes de pago, y deberás abonar con la baja del servicio, una factura final con los consumos que realizaste desde tu última lectura a la fecha de la baja.</p>
                            <p>En caso de haber realizado al inicio de tu servicio el pago del depósito de garantía, el mismo se reintegrará en tu última factura. De existir un crédito a tu favor, te solicitaremos la información necesaria para el reintegro del mismo en el momento de la atención del turno.</p>
                            <p>* En caso de que el trámite sea gestionado por un tercero, deberá presentar el poder o autorización correspondiente y su DNI.</p>
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
        </section>
    );
};

export default Preguntas;