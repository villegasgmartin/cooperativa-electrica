//Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia10/BlogNoticia10.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"
import { X } from 'lucide-react';

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia04 from "../../../assets/images/blog/blog-image-04.jpeg"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';


//JSX:
const Blognoticia10 = () => {
    const [isOpen, setIsOpen] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Encuentro con autoridades provinciales')); {/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia5-main-container'>
            <Helmet>
            <html lang="es" />
            <meta charSet="UTF-8" />
            <meta name="language" content="es" />
                <title>Encuentro con autoridades provinciales</title>
            </Helmet>
            <div className='noticia5-secondary-container'>
            <Fade triggerOnce={true} duration={800} delay={300}>
                                <div className='noticia10-mainImage-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1745919043/cooperativa/Encuentro_con_autoridades_provinciales_yljtsj.jpg" alt="Encuentro con autoridades provinciales" className='noticia10-mainImage' /></div>
                                <p className='noticia3-mainDescription'>El pasado lunes 21 de abril la Cooperativa Eléctrica MdP sostuvo reunión de trabajo en la Subsecretaría  de Energía de la Provincia de Buenos Aires
                                Participaron del encuentro el Subsecretario Gastón Ghioni y equipo, el Coordinador Regional del Ministerio de Trabajo Raúl Calmante y el Asesor del Ministerio de Infraestructura y Servicios Públicos Santiago Gutierrez. Por su parte  la Cooperativa  estuvo representada por su Presidente, Ing. Juan Carlos Dentis, su Vice Presidente, CPN Gustavo Casciotti, el Gerente, Ing. Manuel Pérez y el Asesor Técnico, Jorge Falcone.
                                Se plantearon aspectos vinculados con el funcionamiento de la entidad, su  estructura de costos, inversiones y proyectos.
                                Se entablaron mecanismos de contacto fluido para estrechar vínculos e intercambio de información.
                                </p>
                            </Fade>
        {/* {isOpen && (
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
            )} */}
            </div>
            {/* <div className='noticia5-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia5-description' id='light-font'> Desde las pioneras que lucharon por el sufragio femenino hasta las líderes sociales, políticas, empresariales y sindicales, sus aportes son bisagras para  continuar abriendo caminos hacia  las generación de una sociedad más justa y solidaria.

                        El Día de la Mujer Trabajadora es un recordatorio de que la lucha por la igualdad es una tarea colectiva y constante y que no puede disociarse de los imperiosos  objetivos de desarrollo,  inclusión y equidad.
                    </p>
                    <div className='noticia1-image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741895861/cooperativa/Dia_de_la_mujer_2_b6ccaa.jpg" alt="imágen de blog" className='noticia5-image' /></div>
                </Fade>
            </div> */}
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

export default Blognoticia10