//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia2/BlogNoticia2.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia02 from "../../../assets/images/blog/blog-image-02.jpeg"


//JSX:
const BlogNoticia2 = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Energías Renovables en Mar del Plata'));{/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia2-main-container'>
            <Helmet>
                <title>Energías Renovables en Mar del Plata | Cooperativa Electrica Mar del Plata</title>
            </Helmet>
            <div className='noticia2-secondary-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='noticia2-mainImage-container'><img src={ImageNoticia02} alt="imágen de blog" className='noticia2-mainImage' /></div>
                    <p className='noticia2-mainDescription'>Mar del Plata es una ciudad con un potencial único para aprovechar energías renovables como la solar y la eólica. Gracias a su ubicación geográfica y clima, cada vez más hogares y empresas están optando por instalar paneles solares o explorar el uso de pequeños aerogeneradores. Estas soluciones no solo reducen las facturas de luz, sino que también disminuyen la huella de carbono.
                    </p>
                </Fade>
            </div>
            <div className='noticia2-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia2-description' id='light-font'>Proyectos locales están promoviendo la transición hacia energías limpias, ofreciendo beneficios tanto para la economía local como para el medio ambiente. Además, programas gubernamentales brindan incentivos para la instalación de equipos de energía renovable. Informarte sobre estas oportunidades puede ser el primer paso para transformar tu hogar o negocio en un espacio más sustentable.
                    </p>
                    <div className='noticia2-image-container'><img src="https://www.performance-construccion.com/wp-content/uploads/2016/09/electricista_cancun-800x430.png" alt="imágen de blog" className='noticia2-image' /></div>
                </Fade>
            </div>
            <div className='noticia2-container'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='noticia2-image-container blog-background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia2-image' /></div>
                    <p className='noticia2-description'>Si estás interesado en contribuir al cuidado del planeta, considera implementar estas tecnologías. Adoptar la energía renovable es una inversión que no solo mejora la calidad del aire y el entorno, sino que también asegura un futuro energético más seguro y sostenible.
                    </p>
                </Fade>
            </div>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                <div className='noticia2-buttonContainer'>
                    <div className='noticia2-button'>
                            <Link to={"/blog"}>
                                <Button sx={{
                                    width: "100%",
                                    marginTop: "20px", 
                                    fontFamily: "interTight",
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                    letterSpacing: "1px",
                                    borderRadius: "50px",
                                    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                                    textTransform: "none",
                                    color:"#161616",
                                    backgroundColor: "#30e691",
                                    marginBottom: "20px"
                                }} 
                                    variant='contained' 
                                    size='large'>Volver</Button>
                            </Link>
                    </div>
                </div>
            </Fade>
        </section>
    )
}

export default BlogNoticia2