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
        dispatch(setTitle('Cooperativa Eléctrica en Encuentro Productivo Bonaerense')); {/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia5-main-container'>
            <Helmet>
                <title>Cooperativa Eléctrica en Encuentro Productivo Bonaerense</title>
            </Helmet>
            <div className='noticia5-secondary-container'>
            <Fade>
            <div className='noticia5-mainImage-container' onClick={() => setIsOpen(true)} style={{ position: 'relative', cursor: 'pointer' }}>
                <img 
                    src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741432842/cooperativa/Encuentro_Productivo_Bonaerense-1_ix5tsb.jpg" 
                    alt="Encuentro Productivo Bonaerense"
                    className='noticia5-mainImage'
                />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '50%',
                    padding: '20px',
                }}>
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
            <p className='noticia5-mainDescription'>
                La Cooperativa Eléctrica MdP se sumó al Encuentro Productivo de Gral Pueyrredon organizado por la Provincia de Buenos Aires el pasado sábado 22.
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
                    <p className='noticia5-description' id='light-font'> Especialmente invitado por el Sr. Gobernador participó nuestro Presidente, Ing. Juan Carlos Dentis, quien expuso sobre las particularidades de la prestación del servicio eléctrico en n/ciudad y planteó inquietudes y dificultades, propiciando la generación de canales de diálogo para el abordaje de la situación.
                    Desde nuestra entidad celebramos el encuentro, que tuvo una amplia participación de los sectores de la producción y del trabajo responsables de la matriz productiva y comercial local.
                    </p>
                    <div className='noticia1-image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741432842/cooperativa/Encuentro_Productivo_Bonaerense-2_v8mjz5.jpg" alt="imágen de blog" className='noticia5-image' /></div>
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