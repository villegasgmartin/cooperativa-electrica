//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../blog/Blog.css"
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';

/*---------Imágenes del Blog: para cambiarlas, colocar las nuevas imágenes en la carpeta "blog", dentro de "images" y luego modificar
solo la parte final de las rutas que estan a continuacion por el nombre de las nuevas imágenes--------- */
import blogImage01 from "../../../assets/images/blog/blog-image-01.webp"
import blogImage02 from "../../../assets/images/blog/blog-image-02.jpeg"
import blogImage03 from "../../../assets/images/blog/blog-image-03.jpg"
import blogImage04 from "../../../assets/images/blog/blog-image-04.jpeg"

//JSX:
const Blog = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Blog'));
  }, [dispatch]);

  return (
    <section className='blog-main-container'>
      <Fade triggerOnce={true} duration={800} delay={300}><h2 className='blog-intro'>Bienvenidos al blog de nuestra cooperativa, un espacio donde compartimos información relevante sobre nuestros servicios de electricidad e internet, novedades tecnológicas, consejos para el uso eficiente de la energía, y mucho más.</h2></Fade>
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div>
            <Link to={"/"}><div className='blog-image-container'><img src={blogImage01} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/"}><h3 className='blog-title'>Título noticia</h3></Link>
            <p className='blog-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta a sed architecto tenetur excepturi possimus magnam quam porro repellendus ratione. Ex culpa odio porro, id sit aliquam tempore aspernatur iure.</p>
          </div>
          <div>
            <Link to={"/"}><div className='blog-image-container'><img src={blogImage02} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/"}><h3 className='blog-title'>Título noticia</h3></Link>
            <p className='blog-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta a sed architecto tenetur excepturi possimus magnam quam porro repellendus ratione. Ex culpa odio porro, id sit aliquam tempore aspernatur iure.</p>
          </div>
        </Fade>
      </div>
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300}>
          <div>
            <Link to={"/"}><div className='blog-image-container'><img src={blogImage03} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/"}><h3 className='blog-title'>Título noticia</h3></Link>
            <p className='blog-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta a sed architecto tenetur excepturi possimus magnam quam porro repellendus ratione. Ex culpa odio porro, id sit aliquam tempore aspernatur iure.</p>
          </div>
          <div>
            <Link to={"/"}><div className='blog-image-container'><img src={blogImage04} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/"}><h3 className='blog-title'>Título noticia</h3></Link>
            <p className='blog-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta a sed architecto tenetur excepturi possimus magnam quam porro repellendus ratione. Ex culpa odio porro, id sit aliquam tempore aspernatur iure.</p>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Blog;