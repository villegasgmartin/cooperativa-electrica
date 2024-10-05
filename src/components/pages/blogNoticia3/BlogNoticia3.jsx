//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import "../blogNoticia3/BlogNoticia3.css"
import BotonFlotante from '../../common/BotonFlotante/BotonFlotante';
import { Fade } from 'react-awesome-reveal';

/*Para cambiar la imágen principal en esta sección: colocar la ruta que corresponde aqui debajo*/
import ImageNoticia03 from "../../../assets/images/blog/blog-image-03.jpg"


//JSX:
const BlogNoticia3 = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Blog'));
    }, [dispatch]);

    return (
        <section className='noticia3-main-container'>
            <div className='noticia3-secondary-container'>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <h2 className='noticia3-title'>Título principal de la noticia</h2>
                    <div className='noticia3-mainImage-container'><img src={ImageNoticia03} alt="imágen de blog" className='noticia3-mainImage' /></div>
                    <p className='noticia3-mainDescription'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem odit optio porro libero soluta consectetur at perferendis pariatur sunt laboriosam nihil quae itaque, id vero explicabo possimus repellendus quos ut. 
                    </p>
                </Fade>
            </div>
            <div className='noticia3-container' id='dark-background'> 
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <p className='noticia3-description' id='light-font'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                    <div className='noticia3-image-container'><img src="https://www.performance-construccion.com/wp-content/uploads/2016/09/electricista_cancun-800x430.png" alt="imágen de blog" className='noticia3-image' /></div>
                </Fade>
            </div>
            <div className='noticia3-container'> 
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='noticia3-image-container' id='background-position'><img src="https://projectssdn.com/wp-content/uploads/elementor/thumbs/electricidad-residencial-e-industrial-qp5x9bwrw4jy9i0gusv63vzojxuitdyio7dnxpklgg.png" alt="imágen de blog" className='noticia3-image' /></div>
                    <p className='noticia3-description'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam nostrum minus modi sapiente quia molestias. Nihil sequi mollitia maxime culpa autem inventore aperiam itaque architecto similique, ex omnis? Officia, nulla.
                    </p>
                </Fade>
            </div>
            <div className='noticia3-buttonContainer'>
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
            <BotonFlotante/>
        </section>
    )
}

export default BlogNoticia3