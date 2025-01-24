//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia1/BlogNoticia1.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia01 from "../../../assets/images/blog/blog-image-01.jpg"


//JSX:
const BlogNoticia1 = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Cómo Ahorrar Energía en el Hogar')); {/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia1-main-container'>
            <Helmet>
                <title>Cómo Ahorrar Energía en el Hogar | Cooperativa Electrica Mar del Plata</title>
            </Helmet>
            <div className='noticia1-secondary-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='noticia1-mainImage-container'><img src={ImageNoticia01} alt="imágen de blog" className='noticia1-mainImage' /></div>
                    <p className='noticia1-mainDescription'>Ahorrar energía no solo beneficia tu bolsillo, sino también al medio ambiente. En Mar del Plata, el clima puede llevar a un uso intensivo de aires acondicionados en verano y calefactores en invierno. Una forma sencilla de reducir el consumo es cambiar a bombillas LED, que consumen hasta un 80% menos que las tradicionales. Además, recuerda sellar puertas y ventanas para mantener la temperatura interior sin esfuerzos extra de los equipos eléctricos.</p>
                </Fade>
            </div>
            <div className='noticia1-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia1-description' id='light-font'>Otro consejo práctico es desconectar electrodomésticos cuando no estén en uso, ya que muchos siguen consumiendo energía en modo de espera. Optimiza el uso de la lavadora y el lavavajillas, utilizándolos con cargas completas y en programas de bajo consumo. Adopta hábitos simples como apagar las luces al salir de una habitación y aprovecha la luz natural siempre que sea posible.
                    </p>
                    <div className='noticia1-image-container'><img src="https://www.performance-construccion.com/wp-content/uploads/2016/09/electricista_cancun-800x430.png" alt="imágen de blog" className='noticia1-image' /></div>
                </Fade>
            </div>
            <div className='noticia1-container'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='noticia1-image-container blog-background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia1-image' /></div>
                    
                    <p className='noticia1-description'>Reducir tu consumo eléctrico no solo te ayudará a ahorrar, sino que contribuirá a un Mar del Plata más sustentable. Implementa estos cambios y notarás la diferencia en tus facturas y en el impacto ambiental.</p>
                   
                    
                   
                </Fade>
            </div>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                <div className='noticia1-buttonContainer'>
                    <div className='noticia1-button'>
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

export default BlogNoticia1