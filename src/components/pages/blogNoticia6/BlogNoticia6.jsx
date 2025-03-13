//Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia5/BlogNoticia5.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"
import { X } from 'lucide-react';

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia04 from "../../../assets/images/blog/blog-image-04.jpeg"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';


//JSX:
const Blognoticia5 = () => {
    const [isOpen, setIsOpen] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('8 de marzo, Día Internacional de la Mujer Trabajadora')); {/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia5-main-container'>
            <Helmet>
            <html lang="es" />
            <meta charSet="UTF-8" />
            <meta name="language" content="es" />
                <title>8 de marzo, Día Internacional de la Mujer Trabajadora</title>
            </Helmet>
            <div className='noticia5-secondary-container'>
            <Fade triggerOnce={true} duration={800} delay={300}>
                                <div className='noticia3-mainImage-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741895862/cooperativa/Dia_de_la_mujer_1_r22cz3.jpg" alt="dia de la mujer" className='noticia3-mainImage' /></div>
                                <p className='noticia3-mainDescription'>La Cooperativa Eléctrica de MdP, conmemora el día Internacional de la Mujer trabajadora y se suma  a los actos y reivindicaciones  para celebrar sus logros en la lucha por la igualdad,  el  reconocimiento y sus  derechos en los ámbitos social, político y laboral. 
                                </p>
                            </Fade>
        {isOpen && (
                <div className='popup-overlay' onClick={() => setIsOpen(false)}>
                    <div className='popup-content' onClick={(e) => e.stopPropagation()}>
                        <button className='popup-close' onClick={() => setIsOpen(false)}>
                            <X size={24} />
                        </button>
                        <video controls autoPlay>
                            <source src="https://res.cloudinary.com/dj3akdhb9/video/upload/v1741432861/cooperativa/Encuentro_Productivo_Bonaerense-3_cyncij.mp4" type="video/mp4" />
                            Tu navegador no admite el elemento <code>video</code>.
                        </video>
                    </div>
                </div>
            )}
            </div>
            <div className='noticia5-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia5-description' id='light-font'> Desde las pioneras que lucharon por el sufragio femenino hasta las líderes sociales, políticas, empresariales y sindicales, sus aportes son bisagras para  continuar abriendo caminos hacia  las generación de una sociedad más justa y solidaria.

                        El Día de la Mujer Trabajadora es un recordatorio de que la lucha por la igualdad es una tarea colectiva y constante y que no puede disociarse de los imperiosos  objetivos de desarrollo,  inclusión y equidad.
                    </p>
                    <div className='noticia1-image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741895861/cooperativa/Dia_de_la_mujer_2_b6ccaa.jpg" alt="imágen de blog" className='noticia5-image' /></div>
                </Fade>
            </div>
            {/* <div className='noticia5-container'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='noticia5-image-container blog-background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia5-image' /></div>
                    <p className='noticia5-description'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                </Fade>
            </div> */}
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                <div className='noticia5-buttonContainer'>
                    <div className='noticia5-button'>
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

export default Blognoticia5