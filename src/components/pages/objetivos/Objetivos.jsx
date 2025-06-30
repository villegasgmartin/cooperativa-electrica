//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../objetivos/Objetivos.css"
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import Image01 from "../../../assets/images/objetivos/objetivos-01.avif"
import Image02 from "../../../assets/images/objetivos/objetivos-02.avif"
import Image03 from "../../../assets/images/objetivos/objetivos-03.avif"
import Image04 from "../../../assets/images/objetivos/objetivos-04.jpg"
import Image05 from "../../../assets/images/objetivos/objetivos-05.avif"
import Image06 from "../../../assets/images/objetivos/objetivos-06.jpg"
import {Helmet} from "react-helmet"

//JSX:
const Objetivos = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Objetivos Sociales'));
    }, [dispatch]);

    return (
        <section className='objetivos-main-container'>
            <Helmet>
                <title>Objetivos Sociales</title>
            </Helmet>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'><h2 className='objetivos-title'>La Cooperativa tendrá por objetivo:</h2></Fade>
            <div className='objetivos-container'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <div className='objetivos-text-container'>
                    <p className='objetivo'><span className='objetivos-color-title'>A)</span> Generar o adquirir energía eléctrica, distribuirla, ya sea en servicios urbanos o rurales y transformarla conforme a los requerimientos correspondientes.</p>
                    <p className='objetivo'><span className='objetivos-color-title'>B)</span> Podrá adquirir y vender materiales, útiles y enseres para toda clase de instalaciones relacionadas con sus actividades, así como suministrar elementos para su uso.</p>
                    </div>
                    <div className='objetivos-image-container'><img src={Image01} alt="objetivos sociales" className='objetivos-image' /></div>
                </Fade>
            </div>
            <div className='objetivos-container' id='objetivos-container-direction'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='objetivos-image-container'><img src={Image02} alt="objetivos sociales" className='objetivos-image' /></div>
                    <p className='objetivo'><span className='objetivos-color-title'>C)</span> Prestar otros servicios públicos como los de gas, teléfonos, comunicaciones, construcción y mantenimiento de pavimentos, desagües, redes de provisión de agua o de cloacas, construcción de cercos, veredas y todo otro servicio que promueva el bienestar de sus asociados y el desarrollo de la comunidad. Para ello podrá efectuar las construcciones necesarias o financiarlas con sus propios fondos, celebrando los convenios y contratos que fuere menester, ya sea con los poderes públicos nacionales, provinciales y municipales, entes administrativos o de carácter privado de cualquier naturaleza.</p>
                </Fade>
            </div>
            <div className='objetivos-container'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='objetivo'><span className='objetivos-color-title'>D)</span> Adquirir viviendas individuales o colectivas, o construirlas, sea por administración o por medio de contratos con empresas del ramo, para entregarlas en uso o en propiedad, en las condiciones que se especifiquen en el reglamento respectivo; adquirir terrenos para sí o para destinarlos a vivienda; ejecutar por administración o por medio de contratos con terceros las obras necesarias para la conservación, ampliación o mejoramiento de las viviendas de sus asociados; solicitar ante instituciones oficiales o privadas los créditos necesarios para la construcción de la vivienda y gestionarlos para los mismos fines;</p>
                    <div className='objetivos-image-container'><img src={Image03} alt="objetivos sociales" className='objetivos-image' /></div>
                </Fade>
            </div>
            <div className='objetivos-container' id='objetivos-container-direction'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='objetivos-image-container'><img src={Image04} alt="objetivos sociales" className='objetivos-image' /></div>
                    <p className='objetivo'>adquirir en el mercado los materiales y demás elementos necesarios para la construcción, con destino a su empleo por la Cooperativa o al suministro; gestionar el concurso de los poderes públicos para la realización de las obras viales necesarias, obras sanitarias y de desagüe en la zona de influencia de la Cooperativa; proporcionar el asesoramiento en todo lo relacionado con el problema de la vivienda brindando los servicios técnicos y la asistencia jurídica necesarios; propender al fomento de los hábitos de economía y previsión entre los asociados. La Cooperativa excluye de sus objetivos las operaciones de ahorro y préstamo para la vivienda u otros fines.</p>
                </Fade>
            </div>
            <div className='objetivos-container'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <div className='objetivos-text-container'>
                        <p className='objetivo'><span className='objetivos-color-title'>E)</span> Adquirir o producir, para distribución, artículos de consumo, de uso personal y del hogar.</p>
                        <p className='objetivo'><span className='objetivos-color-title'>F)</span> Organizar y prestar el servicio de Biblioteca Pública, que se denominará Ingeniero Julio Rateriy, orientado preferentemente a brindar apoyo bibliográfico y documental a los estudiantes y docentes de las carreras técnicas que se dictan en la ciudad y la zona, así como también a difundir los valores y principios del cooperativismo y a fomentar el conocimiento de la historia regional.</p>
                        <p className='objetivo'><span className='objetivos-color-title'>G)</span> Organizar y prestar el servicio de Centro Cultural, comprendiendo el dictado de cursos de disciplinas diversas y la realización de otras actividades culturales o educativas.</p>
                    </div>
                    <div className='objetivos-image-container'><img src={Image05} alt="objetivos sociales" className='objetivos-image' /></div>
                </Fade>
            </div>
            <div className='objetivos-container' id='objetivos-container-direction'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='objetivos-image-container'><img src={Image06} alt="objetivos sociales" className='objetivos-image' /></div>
                    <div className='objetivos-text-container'>
                        <p className='objetivo'><span className='objetivos-color-title'>H)</span> Fomentar el espíritu de solidaridad entre sus asociados, y cumplir con el fin de formar una conciencia cooperativa, ejecutando programas de difusión y educación cooperativa.</p>
                        <p className='objetivo'><span className='objetivos-color-title'>I)</span> Los servicios de suministro de electricidad a que se refiere el inciso a), como asimismo todas las demás prestaciones especificadas precedentemente podrán prestarse a terceros no asociados, dentro de las normas correspondientes que las condicionan, establecidas por la autoridad de aplicación, y los usuarios no tendrán derecho al retorno de utilidades que correspondiere.</p>
                    </div>
                </Fade>
            </div>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='objetivos-articulo-container'>
                        <p className='objetivos-articulo'>De acuerdo con el <strong>ARTÍCULO CINCO</strong> del Estatuto Social vigente que se transcribe en forma textual, los objetivos sociales de la Cooperativa son los que se indican.</p>
                        <div className='objetivos-button-container'>
                            <Link to={"/servicio-electrico"}>
                            <Button sx={{
                                width: "100%", 
                                height: "100%",
                                fontFamily: "interTight",
                                fontSize: "25px",
                                fontWeight: "bold",
                                letterSpacing: "1px",
                                borderRadius: "50px",
                                boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                                textTransform: "none",
                                color:"white",
                                backgroundColor: "#8048ff"
                                }} 
                                variant='contained' 
                                size='large'>Volver
                            </Button>
                            </Link>
                        </div>
                    </div>
                </Fade>
        </section>
    );
};

export default Objetivos;