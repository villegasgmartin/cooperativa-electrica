//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia1/BlogNoticia1.css"
import { Fade } from 'react-awesome-reveal';

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia01 from "../../../assets/images/blog/blog-image-01.webp"


//JSX:
const BlogNoticia1 = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Blog'));
    }, [dispatch]);

    return (
        <section className='noticia1-main-container'>
            <div className='noticia1-secondary-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <h2 className='noticia1-title'>Título principal de la noticia</h2>
                    <div className='noticia1-mainImage-container'><img src={ImageNoticia01} alt="imágen de blog" className='noticia1-mainImage' /></div>
                    <p className='noticia1-mainDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut. 
                    </p>
                </Fade>
            </div>
            <div className='noticia1-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <p className='noticia1-description' id='light-font'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                    <div className='noticia1-image-container'><img src="https://www.performance-construccion.com/wp-content/uploads/2016/09/electricista_cancun-800x430.png" alt="imágen de blog" className='noticia1-image' /></div>
                </Fade>
            </div>
            <div className='noticia1-container'> 
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='noticia1-image-container' id='background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia1-image' /></div>
                    <p className='noticia1-description'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                </Fade>
            </div>
            <div className='noticia1-buttonContainer'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <Link to={"/blog"}>
                        <Button sx={{
                            height: "60px",
                            fontFamily: "archivo",
                            backgroundColor: "#12824c"
                        }} 
                            variant='contained' 
                            size='large'>Volver</Button>
                    </Link>
                </Fade>
            </div>
        </section>
    )
}

export default BlogNoticia1