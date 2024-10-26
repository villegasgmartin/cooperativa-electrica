//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia2/BlogNoticia2.css"
import { Fade } from 'react-awesome-reveal';

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia02 from "../../../assets/images/blog/blog-image-02.jpeg"


//JSX:
const BlogNoticia2 = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Noticia 2'));{/*Cambio de título*/}
    }, [dispatch]);

    return (
        <section className='noticia2-main-container'>
            <div className='noticia2-secondary-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='noticia2-mainImage-container'><img src={ImageNoticia02} alt="imágen de blog" className='noticia2-mainImage' /></div>
                    <p className='noticia2-mainDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut. 
                    </p>
                </Fade>
            </div>
            <div className='noticia2-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='right'>
                    <p className='noticia2-description' id='light-font'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                    <div className='noticia2-image-container'><img src="https://www.performance-construccion.com/wp-content/uploads/2016/09/electricista_cancun-800x430.png" alt="imágen de blog" className='noticia2-image' /></div>
                </Fade>
            </div>
            <div className='noticia2-container'> 
                <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
                    <div className='noticia2-image-container blog-background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia2-image' /></div>
                    <p className='noticia2-description'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                </Fade>
            </div>
            <div className='noticia2-buttonContainer'>
                <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
                    <Link to={"/blog"}>
                        <Button sx={{
                            height: "60px",
                            fontFamily: "archivo",
                            backgroundColor: "#12824c",
                            width: "100%"
                        }} 
                            variant='contained' 
                            size='large'>Volver</Button>
                    </Link>
                </Fade>
            </div>
        </section>
    )
}

export default BlogNoticia2