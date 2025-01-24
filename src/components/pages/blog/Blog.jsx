//Importaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../blog/Blog.css"
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet"

/*---------Imágenes del Blog: para cambiarlas, colocar las nuevas imágenes en la carpeta "blog", dentro de "images" y luego modificar
solo la parte final de las rutas que estan a continuacion por el nombre de las nuevas imágenes--------- */
import blogImage01 from "../../../assets/images/blog/blog-image-01.jpg"
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
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <Fade triggerOnce={true} duration={800} delay={300} direction='left'><h2 className='blog-intro'>Bienvenidos al blog de nuestra cooperativa, un espacio donde compartimos información relevante sobre nuestros servicios de electricidad e internet, novedades tecnológicas, consejos para el uso eficiente de la energía, y mucho más.</h2></Fade>
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          <div className='blog-subcontainer'>
            <Link to={"/como-ahorrar-energia"}><div className='blog-image-container'><img src={blogImage01} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/como-ahorrar-energia"} style={{textDecoration: "none"}}><h3 className='blog-title'>Cómo Ahorrar Energía en el Hogar</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>Ahorrar energía no solo beneficia tu bolsillo, sino también al medio ambiente.</p>
          </div>
          <div className='blog-subcontainer'>
            <Link to={"/energias-renovables"}><div className='blog-image-container'><img src={blogImage02} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/energias-renovables"} style={{textDecoration: "none"}}><h3 className='blog-title'>Energías Renovables</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>Mar del Plata es una ciudad con un potencial único para aprovechar energías renovables como la solar y la eólica.</p>
          </div>
        </Fade>
      </div>
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          <div className='blog-subcontainer'>
            <Link to={"/las-claves-de-la-velocidad-de-internet"}><div className='blog-image-container'><img src={blogImage03} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/las-claves-de-la-velocidad-de-internet"} style={{textDecoration: "none"}}><h3 className='blog-title'>Velocidad de Internet</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>En un mundo cada vez más conectado, la velocidad de internet se ha convertido en un factor esencial para las actividades diarias.</p>
          </div>
          {/* <div className='blog-subcontainer'>
            <Link to={"/blog-4"}><div className='blog-image-container'><img src={blogImage04} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/blog-4"} style={{textDecoration: "none"}}><h3 className='blog-title'>Velocidad de Internet</h3></Link>
            <p className='blog-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta a sed architecto tenetur excepturi possimus magnam quam porro repellendus ratione. Ex culpa odio porro, id sit aliquam tempore aspernatur iure.</p>
          </div> */}
        </Fade>
      </div>
    </section>
  );
};

export default Blog;