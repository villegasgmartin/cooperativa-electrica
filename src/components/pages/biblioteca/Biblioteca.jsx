//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import "../biblioteca/Biblioteca.css"
import { Fade } from 'react-awesome-reveal';

//JSX:
const Biblioteca = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Biblioteca'));
  }, [dispatch]);

  return (
    <section className='biblioteca-main-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'><h2 className='biblioteca-title'>Biblioteca Ingeniero Julio Rateriy</h2></Fade>
        <div className='biblioteca-accordion-container'>
          <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
            <AccordionGroup variant='soft' size='lg'>
            <Accordion>
              <AccordionSummary>Biblioteca Ingeniero Julio Rateriy</AccordionSummary>
              <AccordionDetails>
                <p className='biblioteca-accordion-details'>Su creación fue dispuesta en 1970 y comenzó sus actividades a mediados de 1971. El motivo de su fundación, en principio, fue la de facilitar a los estudiantes de la carrera de ingeniería de la Universidad de Mar del Plata, en forma gratuita, el acceso a la bibliografía necesaria a su especialidad. Más tarde se amplió a todas las carreras disponibles.<br/>
                A raíz de este aporte, fundamental en su momento para la ciudad, es que la Municipalidad de General Pueyrredón, a través de la Resolución Nº 571/1983, declaró Entidad de Bien Público a nuestra institución.<br/>
                Desde el 7 de julio de 1984 la Biblioteca dispone de un edificio propio, contiguo a la sede social de la Cooperativa.<br/>
                Cuenta con obras de las más diversas materias de las carreras universitarias y terciarias de la ciudad, libros y monografías que se refieren a la historia de Mar del Plata y la región.<br/>
                La Biblioteca presta diversos servicios relacionados con su quehacer específico. Dispone de más de 10.000 volúmenes.<br/>
                En lo académico -y adaptada a las demandas modernas- desarrolla sus servicios como un Centro de Documentación. A la bibliografía existente en el depósito, se la complementa con búsquedas en internet que se relacionen con los temas solicitados, monografías, ensayos y todo trabajo que se halle debidamente documentado y avalado por instituciones educativas u organismos oficiales.<br/>
                La asociación a la Biblioteca es <span className='biblioteca-resaltado'>abierta a todo público</span>. Para utilizar sus servicios no es necesario ser asociado a la Cooperativa de Electricidad y sus requisitos son: DNI original, un servicio a nombre del interesado, libreta universitaria o constancia de estudio y abonar la cuota vigente al momento de la asociación. Los libros se prestan por un período de 14 días, con posibilidad de renovación telefónica por un período idéntico. Las reservas se pueden realizar también telefónicamente.<br/>
                En la actualidad, la Biblioteca funciona como un eje social coordinado con las actividades administrativas y sociales de la Cooperativa. A través de ella, los asociados y público en general pueden actualizar sus servicios de Obras Sanitarias, Municipalidad, ARBA y otros impuestos, para abonarlos inmediatamente en el sector de Cajas de la Cooperativa.</p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>Centro Cultural Biblioteca Ing. Julio Rateriy</AccordionSummary>
              <AccordionDetails>
                <p className='biblioteca-accordion-details'>Fue inaugurado el 14 de agosto de 1999, como extensión del cometido de la Biblioteca. En sus salones se desarrollaron actividades culturales en general, exposiciones, conferencias, espectáculos teatrales, musicales y artísticos de la más variada índole. Los artistas plásticos y fotógrafos de la ciudad tuvieron oportunidad de mostrar sus trabajos en la Galería de Exposiciones de la Biblioteca, por un lapso de 15 días. Estas podían ser visitadas con entrada libre y gratuita, y posibilitaron el estrechar vínculos entre la comunidad artística y nuestra institución.<br/>
                Sus instalaciones se utilizaron para el dictado de cursos sobre distintas manifestaciones del arte.<br/>
                En las memorias anuales del Consejo de Administración de la Cooperativa quedaron registradas las actividades llevadas a cabo por el Centro Cultural, a lo largo de 15 años de trayectoria.<br/>
                En la actualidad, el espacio utilizado para ese propósito cedió lugar a un nuevo emprendimiento denominado Espacio 75.<br/>
                Con nuevos gestores culturales (TRImarchi) se creó Club TRI, que tiene como objetivo ser usina cultural para la realización de diferentes actividades artísticas, formativas y de entretenimiento, conformándose como una red artística para el intercambio y la creación en todas sus formas.</p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>Ecomuseo Barrial</AccordionSummary>
              <AccordionDetails>
                <p className='biblioteca-accordion-details'>Un ecomuseo se define como un centro museístico orientado sobre la identidad de un territorio. En nuestro caso, tuvo sus orígenes en la iniciativa de un grupo de asociados y vecinos que, interesados en custodiar el patrimonio cultural y resguardar la identidad del barrio que constituye el núcleo del área de actuación de la Cooperativa, decidieron reunir aquellos elementos (fotografías, documentos, objetos, etc.) que testifican una historia compartida hasta el presente. A partir de algunas charlas y conferencias organizadas conjuntamente con la Universidad Nacional de Mar del Plata entre julio y agosto de 1993 se creó el Ecomuseo Barrio Plaza Peralta Ramos. Si bien esta área será siempre de interés para la institución, el funcionamiento del Ecomuseo culminó con la publicación del libro “Mar del Plata. El Barrio del Oeste. 1876-1940”.</p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>Actividad Editorial</AccordionSummary>
              <AccordionDetails>
                <p className='biblioteca-accordion-details'>En coincidencia con los propósitos arriba expuestos, la Cooperativa solicitó a su asociado Arquitecto Roberto Osvaldo Cova –por otra parte el más reconocido de los historiadores de Mar del Plata- que redactara una obra sobre los lugares, construcciones, personas y acontecimientos propios de la zona, entonces periférica, en la que se afincó en 1935 y aún continúa allí radicada, la COOPERATIVA DE ELECTRICIDAD DE MAR DEL PLATA. Ese trabajo, que también contiene una crónica detallada sobre los orígenes de nuestra entidad, alcanzó niveles de excelencia en todo sentido; sus 550 páginas de sabroso y documentado texto con numerosas fotografías, mapas, planos y grabados fueron editadas por la Cooperativa en junio de 2006 bajo el título: <strong>MAR DEL PLATA, EL BARRIO DEL OESTE, 1876-1940</strong>. Los 1000 ejemplares inicialmente impresos se agotaron rápidamente, dado el interés de muchísimos convecinos, destacándose que se obsequiaron varios volúmenes a la Municipalidad y a la Universidad Nacional.<br/>
                En el año 2019 se editó el libro del ingeniero Luis Alberto Rateriy, titulado <strong>“La Tierra del Fuego y La Pescadilla. Primeros barrios de residencia de los pescadores profesionales marplatenses”</strong>. En ese momento se encontraba en ejercicio de la presidencia de nuestra Cooperativa, a la cual cedió sus derechos de autor.</p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>Homenaje de la ciudad al arquitecto Cova</AccordionSummary>
              <AccordionDetails>
                <p className='biblioteca-accordion-details'>En coincidencia con el 80º aniversario del nacimiento de nuestro consocio Arquitecto Roberto Osvaldo Cova, y a raíz de una convocatoria del Gabinete Marplatense de Estudios Históricos Regionales, el 23 de agosto de 2009 sus amigos, ex alumnos y ciudadanos en general, testimoniaron su afecto al hombre que reprodujo con estricta fidelidad el pasado edilicio de Mar del Plata, a través de sus obras escritas con una prosa elegante, elevada y teñida de emoción. El acto se desarrolló en el Teatro Colón –donde nació administrativamente en 1934 nuestra Cooperativa- cuyas instalaciones se vieron colmadas por una gran cantidad de convecinos que deseaban testimoniar su afecto a Roberto Cova.</p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary>Preservación de la ex sala de máquinas</AccordionSummary>
              <AccordionDetails>
                <p className='biblioteca-accordion-details'>A raíz de la importancia histórica que adquirió la entrada en funciones, el 9 de julio de 1939, de los generadores de la primera Usina Popular de la región, ubicados en instalaciones de nuestra Cooperativa, la Municipalidad de General Pueyrredon declaró, a través de la Ordenanza 13.254, <strong>Inmueble de Interés Patrimonial</strong> al local donde funcionara nuestra Sala de Máquinas. La Cooperativa se comprometió a la preservación de ese salón en los términos establecidos en la Ordenanza 10.075, obligación que se cumple con agrado, no exento de orgullo.</p>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
          </Fade>
      </div>
      <div className='biblioteca-servicios-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <div className='biblioteca-servicios'>
            <h3 className='biblioteca-servicios-title'>SERVICIOS:</h3>
            <ul>
              <li className='biblioteca-servicios-text'>PRÉSTAMO DE LIBROS Y REVISTAS PARA TODAS LAS CARRERAS UNIVERSITARIAS Y TERCIARIAS, COMPUTACIÓN, NOVELAS, AUTOAYUDA, CIENCIAS, EDUCACIÓN, HISTORIA LOCAL y REGIONAL.</li>
              <li className='biblioteca-servicios-text'>ASOCIACIÓN CON MÍNIMOS REQUISITOS</li>
              <li className='biblioteca-servicios-text'>RESERVA Y RENOVACIÓN TELEFÓNICA</li>
              <li className='biblioteca-servicios-text'>CATÁLOGO ONLINE  EN <a className='biblioteca-link' href="https://bibliotecarateriy.com.ar/">https://bibliotecarateriy.com.ar/</a></li>
              <li className='biblioteca-servicios-text'>BÚSQUEDAS EN INTERNET</li>
              <li className='biblioteca-servicios-text'>ACTUALIZACIÓN DE IMPUESTOS VENCIDOS</li>
              <li className='biblioteca-servicios-text'>ASESORAMIENTO PERSONALIZADO</li>
            </ul>
            <p className='biblioteca-adress'>20 DE SEPTIEMBRE 2638 – MAR DEL PLATA – ARGENTINA (0223) 493-5777 (interno 5) – Lunes a Viernes de 7,30 a 13,30 hs. </p>
          </div>
        </Fade>
        <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
          <div className='biblioteca-image-container'><img src="https://www.cooperativamdp.com.ar/wp-content/uploads/2017/05/logobiblio.png" alt="logo de biblioteca" width={"100%"}/></div>
        </Fade>
      </div>
    </section>
  );
};

export default Biblioteca;