//Importaciones:
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

//JSX:
const HistoriaAcordeon = () => {
    return (
        <div>
            <AccordionGroup variant='soft' size='lg'>
                <Accordion>
                    <AccordionSummary><strong>22/10/1934</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Sanción de una ordenanza por la cual la Municipalidad se compromete a ser consumidora y a suscribir acciones de la futura Cooperativa por $360.000, con la condición de que la usina generadora se ponga en marcha antes de los dos años.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>18/11/1934</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Durante una asamblea popular realizada en el Teatro Colón, queda constituida oficialmente la Cooperativa de Electricidad de Mar del Plata. El primer Directorio estaba así integrado:</p>
                        <div style={{display: "flex"}}>
                            <ul style={{marginLeft: "10px"}}>
                                <li>Presidente: <strong>Ingeniero Julio Rateriy</strong></li>
                                <li>Vicepresidente: <strong>Justo Copes</strong></li>
                                <li>Secretario: <strong>Pablo Saint Antonin</strong></li>
                                <li>Prosecretario: <strong>Humberto Besozzi</strong></li>
                                <li>Tesorero: <strong>Marcelino Etchegaray</strong></li>
                                <li>Protesorero: <strong>Eduardo M. Aráoz</strong></li>
                                <li>Vocales: <strong>Pedro Bassanetti – Paulino Gutiérrez</strong></li>
                            </ul>
                            <ul>
                                <li><strong>Representantes de la Municipalidad:</strong></li>
                                <li>Miguel Guglielmotti</li>
                                <li>Doctor Belisario Llanos</li>
                                <li>Ingeniero Antonio Vignolo</li>
                                <li>Manuel Villalba</li>
                                <li>Asesor Letrado: Doctor Eduardo Caballero de Tineo</li>
                            </ul>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>16/11/1935</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>La Municipalidad otorga a la Cooperativa la concesión para instalar y explotar una usina eléctrica. Esta concesión se extiende luego al alumbrado público.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>10/12/1935</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Se escrituró el terreno donde comenzó de inmediato a construirse el edificio para la usina popular, en la manzana comprendida entre las calles Alberti, España, Rawson y 20 de Setiembre.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>21/12/1936</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>El Concejo Deliberante prorrogó el plazo establecido en la ordenanza del 22/10/1934. La usina no había podido equiparse, ya que el Municipio no cumplió con el aporte accionario prometido.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>30/12/1936</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>El Intendente José Camusso veta esta ordenanza. El Concejo Deliberante, en votación dividida, no rechaza el veto – como sí lo había hecho un año antes, al no aceptar el Departamento Ejecutivo la ordenanza-contrato para la provisión de energía por parte de la Cooperativa para el alumbrado público- y de inmediato renueva por 20 años la concesión a la compañía norteamericana que prestaba el servicio en condiciones de abuso y onerosidad. Se incluyó al alumbrado público, antes concedido a la Cooperativa. Un decreto posterior declaró fenecido el compromiso financiero de la Municipalidad hacia la Cooperativa, la que sólo conservó autorización para el servicio domiciliario, en competencia con la empresa extranjera.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>25/05/1938</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Inauguración simbólica de la usina popular con sus generadores instalados y parte de las redes construidas, pero sin poder brindar el servicio por la revocación de la aprobación de planos dispuesta por el Intendente Camusso el 8/04/1938. Esta anulación originó una rebelión generalizada del vecindario, la que configuró el más grande movimiento colectivo no político de protesta registrado en la historia de la ciudad. Ante el cariz de los acontecimientos, que tuvieron repercusión nacional al ser reflejados por los grandes diarios de Buenos Aires, intervino el Gobernador Manuel Fresco para destrabar la situación.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>9/07/1939</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Con una gran fiesta popular comenzó la prestación del servicio eléctrico al fluir por las redes la corriente solidaria generada por la usina cooperativa, la que inicialmente llegó a 500 asociados usuarios.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>26/09/1953</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Se inaugura el edificio de la actual sede social de la Cooperativa, en Alberti esquina 20 de Setiembre.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>29/06/1971</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Se inaugura en forma efectiva la Biblioteca Ingeniero Julio Rateriy, cuya creación había sido dispuesta el año anterior. La fundación se debió a una iniciativa del presidente de la Cooperativa, Ingeniero Leonello Sartora, y fue concebida principalmente para el uso de los alumnos de la Facultad de Ingeniería y de las escuelas técnicas de la ciudad.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>24/04/1976</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Una asamblea general extraordinaria aprueba el denominado Convenio de Racionalización firmado con Agua y Energía Eléctrica de la Nación. Como resultado del acuerdo se fija la nueva zona de actuación de la Cooperativa, que es la actual, comprendida entre la Avenida Independencia, la calle General Roca, la calle General Guido y la Avenida Colón. Son en total 77 manzanas.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>7/07/1985</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Coincidiendo con el Día de la Cooperación, se inauguró el nuevo edificio destinado a la Biblioteca Ingeniero Julio Rateriy.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>Julio 1993</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Creación del “Ecomuseo Barrio Plaza Peralta Ramos”, con el propósito de recopilar la historia del barrio y sus vecinos y asociados.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>31/10/1997</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Queda inaugurado el primer cuerpo del Edificio Cooperativa de Electricidad, inmueble de viviendas construido íntegramente con fondos de la institución.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>24/11/98</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Con las firmas de los representantes de la Cooperativa por una parte y del Sr. Intendente Municipal, Profesor Blas Aprile, en representación del Municipio de Gral. Pueyrredon se suscribió el Contrato de Concesión Municipal para el Servicio Público de Distribución de Energía Eléctrica.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>31/05/99</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Finalización del plan de obras oportunamente trazado y que posibilitó el reemplazo de más de 20.000 metros de tendidos de conductores convencionales para la distribución de energía eléctrica en baja tensión por conductores preensamblados. Lográndose de esta manera una mayor confiabilidad y calidad de servicio eléctrico.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>15/06/1999</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>El Ente de Cultura de General Pueyrredón aprueba la creación del Centro Cultural Biblioteca Ingeniero Julio Rateriy.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>23/05/2003</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Autorización por parte de la OCEBA (Organismo de Control Eléctrico de la Provincia de Buenos Aires) de la habilitación del Laboratorio de Medidores Eléctricos instalado en la Cooperativa. Emprendimiento realizado en conjunto con las Cooperativas vecinas de Cte. Nicanor Otamendi y Laguna de los Padres.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>01/08/2004</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Recuperación, por parte de la Cooperativa, del edificio de la calle Alberti esquina España. El mismo estaba ocupado por la empresa EDEA SA quién lo utilizaba como un centro de distribución eléctrico.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>23/05/2008</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Aprobación por parte del Consejo de Administración de la Cooperativa, de la creación del Departamento de Turismo.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>25/03/2009</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Queda inaugurado el segundo cuerpo del Edificio Cooperativa de Electricidad, inmueble de viviendas construido íntegramente con fondos de la institución.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>31/07/2011</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>En conjunto con las Cooperativas de Dionisia y Laguna de los Padres se realiza la instalación de una torre metálica en el Paraje “Centinela del Mar” (Partido de General Alvarado) y otra en Sierra de los Padres (Partido de General Pueyrredon). Las mismas poseen equipamiento de medición de vientos a 15, 30 y 45 metros de altura y reportan datos al INTI (Instituto Nacional de Tecnología Industrial) con la finalidad de evaluar la calidad del recurso eólico en esta región.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>24/09/2011</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Queda inaugurado el tercero y último cuerpo del Edificio Cooperativa de Electricidad, inmueble de viviendas construido íntegramente con fondos de la institución.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>26/06/2013</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>El Consejo de Administración de la Cooperativa aprueba el proyecto “Tesla”: tendido de una red de fibra óptica en anillos en la zona de servicio eléctrico de la Cooperativa, para brindar Internet de banda ancha con fibra óptica hasta el hogar (“FTTH”).</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>10/10/2014</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Se realiza la primera conexión de Internet a un asociado en el edificio “Cooperativa de Electricidad Mar del Plata”.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>31/01/2015</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Asamblea General Extraordinaria de Delegados aprueba la construcción de un Club en dependencias de la Cooperativa, denominado “Espacio 75”. El mismo es fruto de una alianza estratégica entre la S.M.S. “San Cristóbal”, el Municipio de General Pueyrredon y nuestra Cooperativa. Lugar de encuentro para los asociados, a través de talleres de formación, exposiciones de diseño, plástica, obras de teatro y musicales.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>07/07/2017</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Tesla (Servicio de Internet), cambia su nombre a NAVE.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>13/03/2020</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>NAVE realiza su primera conexión de televisión, una plataforma de contenidos multipantalla con más de 100 canales.</p>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary><strong>30/08/2024</strong></AccordionSummary>
                    <AccordionDetails>
                        <p>Luego de varios meses de trabajo, y de reuniones con la Municipalidad de General Pueyrredon, NAVE finaliza los trabajos de tendido de fibra óptica hasta el edificio COSMOS de Mar del Plata, permitiendo así una extensión de su red más allá de sus 77 manzanas históricas.</p>
                    </AccordionDetails>
                </Accordion>
            </AccordionGroup>
        </div>
    )
}

export default HistoriaAcordeon