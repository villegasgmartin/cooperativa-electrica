//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia4/BlogNoticia4.css"
import { Fade } from 'react-awesome-reveal';
import {Helmet} from "react-helmet"

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia04 from "../../../assets/images/blog/blog-image-04.jpeg"
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';


//JSX:
const BlogNoticia4 = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Noticia 4')); {/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia4-main-container'>
            <Helmet>
                <title>Blog</title>
            </Helmet>
            <div className='noticia4-secondary-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='noticia4-mainImage-container'><img src={ImageNoticia04} alt="imágen de blog" className='noticia4-mainImage' /></div>
                    <p className='noticia4-mainDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut. 
                    </p>
                </Fade>
            </div>
            <div className='noticia4-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia4-description' id='light-font'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                    <div className='noticia1-image-container'><img src="https://www.performance-construccion.com/wp-content/uploads/2016/09/electricista_cancun-800x430.png" alt="imágen de blog" className='noticia4-image' /></div>
                </Fade>
            </div>
            <div className='noticia4-container'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='noticia4-image-container blog-background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia4-image' /></div>
                    <p className='noticia4-description'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                </Fade>
            </div>
            <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                <div className='noticia4-buttonContainer'>
                    <div className='noticia4-button'>
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

export default BlogNoticia4