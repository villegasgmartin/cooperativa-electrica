//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia3/BlogNoticia3.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia03 from "../../../assets/images/blog/blog-image-03.jpg"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';


//JSX:
const BlogNoticia3 = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Por Qué la Velocidad de Internet Es Clave para tu Hogar y Negocio')); {/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia3-main-container'>
            <Helmet>
                <title>Por Qué la Velocidad de Internet Es Clave para tu Hogar y Negocio</title>
            </Helmet>
            <div className='noticia3-secondary-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='noticia3-mainImage-container'><img src={ImageNoticia03} alt="imágen de blog" className='noticia3-mainImage' /></div>
                    <p className='noticia3-mainDescription'>En un mundo cada vez más conectado, la velocidad de internet se ha convertido en un factor esencial para las actividades diarias, tanto en el hogar como en los negocios. Desde videollamadas hasta streaming en alta definición y comercio electrónico, contar con una conexión rápida y estable asegura que todo funcione sin interrupciones. </p>
                </Fade>
            </div>
            <div className='noticia3-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia3-description' id='light-font'>Nuestra cooperativa eléctrica en Mar del Plata ofrece planes de internet diseñados para garantizar la mejor experiencia de navegación. Con velocidades que se adaptan a tus necesidades, puedes disfrutar de descargas rápidas, conexiones simultáneas en múltiples dispositivos y una experiencia en línea sin interrupciones, ideal para hogares y oficinas.
                    </p>
                    <div className='noticia3-image-container'><img src="https://www.performance-construccion.com/wp-content/uploads/2016/09/electricista_cancun-800x430.png" alt="imágen de blog" className='noticia3-image' /></div>
                </Fade>
            </div>
            <div className='noticia3-container'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='noticia3-image-container blog-background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia3-image' /></div>
                    <p className='noticia3-description'>No dejes que una conexión lenta te detenga. Elige un plan de internet que te brinde velocidad, estabilidad y soporte local confiable. Transformamos tu conexión en una herramienta para trabajar, aprender y entretenerte de manera eficiente.
                    </p>
                </Fade>
            </div>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                <div className='noticia3-buttonContainer'>
                    <div className='noticia3-button'>
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
            <BotonWhatsapp/>
        </section>
    )
}

export default BlogNoticia3