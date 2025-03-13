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
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';

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
            <Link to={"/el-consejo-de-administracion-recibe-diputado-provincial"}><div className='blog-image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741429570/cooperativa/El_Consejo_de_Administracio%CC%81n_recibio%CC%81_a_Diputado_Provincial_-_foto_3_kupkpm.jpg" alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/el-consejo-de-administracion-recibe-diputado-provincial"} style={{textDecoration: "none"}}><h3 className='blog-title'>El Consejo de Administración recibió a Diputado Provincial</h3></Link>
            <p className='blog-description'>El  Consejo de Administración de la Cooperativa Eléctrica MdP se reunió con el Diputado provincial Gustavo Pulti y la Concejala María Eva Ayala.
            </p>
          </div>
          <div className='blog-subcontainer'>
        
            <Link to={"/cooperativa-electrica-en-encuentro-productivo-bonaerense"}><div className='blog-image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741432842/cooperativa/Encuentro_Productivo_Bonaerense-1_ix5tsb.jpg" alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/cooperativa-electrica-en-encuentro-productivo-bonaerense"} style={{textDecoration: "none"}}><h3 className='blog-title'> Cooperativa Eléctrica en Encuentro Productivo Bonaerense</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>La Cooperativa Eléctrica MdP se sumó al Encuentro Productivo de Gral Pueyrredon  organizado por la Provincia de Buenos Aires  el pasado sábado 22.</p>
          </div>
         
         
        </Fade>
      </div>
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          <div className='blog-subcontainer'>
            <Link to={"/dia-de-la-mujer"}><div className='blog-image-container'><img src="https://res.cloudinary.com/dj3akdhb9/image/upload/v1741895862/cooperativa/Dia_de_la_mujer_-_header_z6mwgy.jpg" alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/dia-de-la-mujer"} style={{textDecoration: "none"}}><h3 className='blog-title'>8 de marzo, Día Internacional de la Mujer Trabajadora</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>La Cooperativa Eléctrica de MdP, conmemora el día Internacional de la Mujer trabajadora y se suma  a los actos y reivindicaciones  para celebrar sus logros en la lucha por la igualdad,  el  reconocimiento y sus  derechos en los ámbitos social, político y laboral.</p>
          </div>
          <div className='blog-subcontainer'>
            <Link to={"/como-ahorrar-energia"}><div className='blog-image-container'><img src={blogImage01} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/como-ahorrar-energia"} style={{textDecoration: "none"}}><h3 className='blog-title'>Cómo Ahorrar Energía en el Hogar</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>Ahorrar energía no solo beneficia tu bolsillo, sino también al medio ambiente.</p>
          </div>
        </Fade>
      </div>
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
        <div className='blog-subcontainer'>
            <Link to={"/energias-renovables"}><div className='blog-image-container'><img src={blogImage02} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/energias-renovables"} style={{textDecoration: "none"}}><h3 className='blog-title'>Energías Renovables</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>Mar del Plata es una ciudad con un potencial único para aprovechar energías renovables como la solar y la eólica.</p>
          </div>
          <div className='blog-subcontainer'>
            <Link to={"/las-claves-de-la-velocidad-de-internet"}><div className='blog-image-container'><img src={blogImage03} alt="imágen de blog" className='blog-image' /></div></Link>
            <Link to={"/las-claves-de-la-velocidad-de-internet"} style={{textDecoration: "none"}}><h3 className='blog-title'>Velocidad de Internet</h3></Link>{/*Cambio de título*/}
            <p className='blog-description'>En un mundo cada vez más conectado, la velocidad de internet se ha convertido en un factor esencial para las actividades diarias.</p>
          </div>
        </Fade>
      </div>
      <BotonWhatsapp/>
    </section>
  );
};

export default Blog;