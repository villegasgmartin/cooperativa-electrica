//Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia7/BlogNoticia7.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"
import { X } from 'lucide-react';

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia04 from "../../../assets/images/blog/blog-image-04.jpeg"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';


//JSX:
const Blognoticia7 = () => {
    const [isOpen, setIsOpen] = useState(false);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('La Cooperativa Eléctrica en la clínica FISCALIZATE')); {/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia5-main-container'>
            <Helmet>
            <html lang="es" />
            <meta charSet="UTF-8" />
            <meta name="language" content="es" />
                <title>La Cooperativa Eléctrica en la clínica FISCALIZATE</title>
            </Helmet>
            <div className='noticia5-secondary-container'>
            <Fade triggerOnce={true} duration={800} delay={300}>
                                <div className='noticia3-mainImage-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1744800329/cooperativa/La_Cooperativa_Ele%CC%81ctrica_en_la_cli%CC%81nica_FISCALIZATE_-2_ma6cst.jpg" alt="dia de la mujer" className='noticia3-mainImage' /></div>
                                <p className='noticia3-mainDescription'>La Cooperativa Eléctrica de MdP participó de la clinica de cumplimiento participativo en el marco del programa  FISCALIZATE de  Cooperativas en marcha  del Instituto Provincial de Asociativismo y Cooperativismo (IPAC) realizado el pasado jueves 20-3 en el IMFC.
                                </p>
                            </Fade>
        {/* {isOpen && (
                <div className='popup-overlay' onClick={() => setIsOpen(false)}>
                    <div className='popup-content' onClick={(e) => e.stopPropagation()}>
                        <button className='popup-close' onClick={() => setIsOpen(false)}>
                            <X size={24} />
                        </button>
                        <video controls autoPlay>
                            <source src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1744800329/cooperativa/La_Cooperativa_Ele%CC%81ctrica_en_la_cli%CC%81nica_FISCALIZATE_-2_ma6cst.jpg" type="video/mp4" />
                            Tu navegador no admite el elemento <code>video</code>.
                        </video>
                    </div>
                </div>
            )} */}
            </div>
            <div className='noticia5-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia5-description' id='light-font'> Con la presencia de Milagros Moya, directora provincial de registro y fiscalización cooperativa,  se acompañó a una  veintena de cooperativas de la ciudad y la zona para que puedan mejorar el cumplimiento normativo, regularizar documentacion y fortalecer el vinculo institucional.
                    Nuestra entidad, señera del cooperativismo marplatense, celebra el encuentro por su aporte a la promocion y sustentabilidad del modelo de gestión cooperativo bonaerense.
                    </p>
                    <div className='noticia1-image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1744800329/cooperativa/La_Cooperativa_Ele%CC%81ctrica_en_la_cli%CC%81nica_FISCALIZATE_-_1_fatyt6.jpg" alt="imágen de blog" className='noticia5-image img-vertical' /></div>
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

export default Blognoticia7