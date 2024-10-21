//Importaciones:
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import "../historiaAcordeon/HistoriaAcordeon.css"

//JSX:
const HistoriaAcordeon = () => {
    return (
        <div>
            <AccordionGroup variant='soft' size='md'>
                <Accordion>
                    <AccordionSummary>22/10/1934</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Sanción de una ordenanza por la cual la Municipalidad se compromete a ser consumidora y a suscribir acciones de la futura Cooperativa por $360.000, con la condición de que la Usina generadora se ponga en marcha antes de los dos años.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>18/11/1934</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Durante una asamblea popular realizada en el Teatro Colón, queda constituida oficialmente la Cooperativa de Electricidad de Mar del Plata. El primer Directorio estaba integrado por:</p>
                        <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "5px",}}>
                            <ul style={{marginLeft: "20px"}}>
                                <li className='historia-accordion-details'>Presidente: <strong>Ingeniero Julio Rateriy</strong></li>
                                <li className='historia-accordion-details'>Vicepresidente: <strong>Justo Copes</strong></li>
                                <li className='historia-accordion-details'>Secretario: <strong>Pablo Saint Antonin</strong></li>
                                <li className='historia-accordion-details'>Prosecretario: <strong>Humberto Besozzi</strong></li>
                                <li className='historia-accordion-details'>Tesorero: <strong>Marcelino Etchegaray</strong></li>
                                <li className='historia-accordion-details'>Protesorero: <strong>Eduardo M. Aráoz</strong></li>
                                <li className='historia-accordion-details'>Vocales: <strong>Pedro Bassanetti – Paulino Gutiérrez</strong></li>
                            </ul>
                            <ul>
                                <li className='historia-accordion-details'><strong>Representantes de la Municipalidad:</strong></li>
                                <li className='historia-accordion-details'>Miguel Guglielmotti</li>
                                <li className='historia-accordion-details'>Doctor Belisario Llanos</li>
                                <li className='historia-accordion-details'>Ingeniero Antonio Vignolo</li>
                                <li className='historia-accordion-details'>Manuel Villalba</li>
                                <li className='historia-accordion-details'>Asesor Letrado: Doctor Eduardo Caballero de Tineo</li>
                            </ul>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>16/11/1935</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>La Municipalidad otorga a la Cooperativa la concesión para instalar y explotar una Usina Eléctrica. Esta concesión se extiende luego al alumbrado público.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>10/12/1935</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Se escrituró el terreno donde comenzó de inmediato a construirse el edificio para la usina popular, en la manzana comprendida entre las calles Alberti, España, Rawson y 20 de Setiembre.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>21/12/1936</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>El Concejo Deliberante prorrogó el plazo establecido en la ordenanza del 22/10/1934. La usina no había podido equiparse, ya que el Municipio no cumplió con el aporte accionario prometido.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>30/12/1936</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>El Intendente José Camusso veta esta Ordenanza. El Concejo Deliberante, en votación dividida, no rechaza el veto – como sí lo había hecho un año antes, al no aceptar el Departamento Ejecutivo la Ordenanza-contrato para la provisión de energía por parte de la Cooperativa para el alumbrado público- y de inmediato renueva por 20 años la concesión a la compañía norteamericana que prestaba el servicio en condiciones de abuso y onerosidad. Se incluyó al alumbrado público, antes concedido a la Cooperativa. Un decreto posterior declaró fenecido el compromiso financiero de la Municipalidad hacia la Cooperativa, la que sólo conservó autorización para el servicio domiciliario, en competencia con la empresa extranjera.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>25/05/1938</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Inauguración simbólica de la usina popular con sus generadores instalados y parte de las redes construidas, pero sin poder brindar el servicio por la revocación de la aprobación de planos dispuesta por el Intendente Camusso el 8/04/1938. Esta anulación originó una rebelión generalizada del vecindario, la que configuró el más grande movimiento colectivo no político de protesta registrado en la historia de la ciudad. Ante el cariz de los acontecimientos, que tuvieron repercusión nacional al ser reflejados por los grandes diarios de Buenos Aires, intervino el Gobernador Manuel Fresco para destrabar la situación.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>9/07/1939</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Con una gran fiesta popular comenzó la prestación del servicio eléctrico al fluir por las redes la corriente solidaria generada por la usina cooperativa, la que inicialmente llegó a 500 asociados usuarios.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>26/09/1953</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Se inaugura el edificio de la actual sede social de la Cooperativa, en Alberti esquina 20 de Setiembre.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>29/06/1971</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Se inaugura en forma efectiva la Biblioteca Ingeniero Julio Rateriy, cuya creación había sido dispuesta el año anterior. La fundación se debió a una iniciativa del presidente de la Cooperativa, Ingeniero Leonello Sartora, y fue concebida principalmente para el uso de los alumnos de la Facultad de Ingeniería y de las escuelas técnicas de la ciudad.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>24/04/1976</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Una asamblea general extraordinaria aprueba el denominado Convenio de Racionalización firmado con Agua y Energía Eléctrica de la Nación. Como resultado del acuerdo se fija la nueva zona de actuación de la Cooperativa, que es la actual, comprendida entre la Avenida Independencia, la calle General Roca, la calle General Guido y la Avenida Colón. Son en total 77 manzanas.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>7/07/1985</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Coincidiendo con el Día de la Cooperación, se inauguró el nuevo edificio destinado a la Biblioteca Ingeniero Julio Rateriy.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>Julio 1993</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Creación del “Ecomuseo Barrio Plaza Peralta Ramos”, con el propósito de recopilar la historia del barrio y sus vecinos y asociados.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>31/10/1997</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Queda inaugurado el primer cuerpo del Edificio Cooperativa de Electricidad, inmueble de viviendas construido íntegramente con fondos de la institución.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>24/11/199</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Con las firmas de los representantes de la Cooperativa por una parte y del Sr. Intendente Municipal, Profesor Blas Aprile, en representación del Municipio de Gral. Pueyrredon se suscribió el Contrato de Concesión Municipal para el Servicio Público de Distribución de Energía Eléctrica.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>31/05/1999</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Finalización del plan de obras oportunamente trazado y que posibilitó el reemplazo de más de 20.000 metros de tendidos de conductores convencionales para la distribución de energía eléctrica en baja tensión por conductores preensamblados. Lográndose de esta manera una mayor confiabilidad y calidad de servicio eléctrico.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>15/06/1999</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>El Ente de Cultura de General Pueyrredón aprueba la creación del Centro Cultural Biblioteca Ingeniero Julio Rateriy.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>23/05/2003</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Autorización por parte de la OCEBA (Organismo de Control Eléctrico de la Provincia de Buenos Aires) de la habilitación del Laboratorio de Medidores Eléctricos instalado en la Cooperativa. Emprendimiento realizado en conjunto con las Cooperativas vecinas de Cte. Nicanor Otamendi y Laguna de los Padres.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>01/08/2004</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Recuperación, por parte de la Cooperativa, del edificio de la calle Alberti esquina España. El mismo estaba ocupado por la empresa EDEA SA quién lo utilizaba como un centro de distribución eléctrico.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>23/05/2008</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Aprobación por parte del Consejo de Administración de la Cooperativa, de la creación del Departamento de Turismo.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>25/03/2009</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Queda inaugurado el segundo cuerpo del Edificio Cooperativa de Electricidad, inmueble de viviendas construido íntegramente con fondos de la institución.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>31/07/2011</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>En conjunto con las Cooperativas de Dionisia y Laguna de los Padres se realiza la instalación de una torre metálica en el Paraje “Centinela del Mar” (Partido de General Alvarado) y otra en Sierra de los Padres (Partido de General Pueyrredon). Las mismas poseen equipamiento de medición de vientos a 15, 30 y 45 metros de altura y reportan datos al INTI (Instituto Nacional de Tecnología Industrial) con la finalidad de evaluar la calidad del recurso eólico en esta región.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>24/09/2011</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Queda inaugurado el tercero y último cuerpo del Edificio Cooperativa de Electricidad, inmueble de viviendas construido íntegramente con fondos de la institución.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>26/06/2013</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>El Consejo de Administración de la Cooperativa aprueba el proyecto “Tesla”: tendido de una red de fibra óptica en anillos en la zona de servicio eléctrico de la Cooperativa, para brindar Internet de banda ancha con fibra óptica hasta el hogar (“FTTH”).</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>10/10/2014</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Se realiza la primera conexión de Internet a un asociado en el edificio “Cooperativa de Electricidad Mar del Plata”.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>31/01/2015</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Asamblea General Extraordinaria de Delegados aprueba la construcción de un Club en dependencias de la Cooperativa, denominado “Espacio 75”. El mismo es fruto de una alianza estratégica entre la S.M.S. “San Cristóbal”, el Municipio de General Pueyrredon y nuestra Cooperativa. Lugar de encuentro para los asociados, a través de talleres de formación, exposiciones de diseño, plástica, obras de teatro y musicales.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>07/07/2017</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Tesla (Servicio de Internet), cambia su nombre a NAVE.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>13/03/2020</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>NAVE realiza su primera conexión de televisión, una plataforma de contenidos multipantalla con más de 100 canales.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary>30/08/2024</AccordionSummary>
                    <AccordionDetails>
                        <p className='historia-accordion-details'>Luego de varios meses de trabajo, y de reuniones con la Municipalidad de General Pueyrredon, NAVE finaliza los trabajos de tendido de fibra óptica hasta el edificio COSMOS de Mar del Plata, permitiendo así una extensión de su red más allá de sus 77 manzanas históricas.</p>
                    </AccordionDetails>
                </Accordion>
            </AccordionGroup>
        </div>
    )
}

export default HistoriaAcordeon