// Importaciones:
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import { fetchAllBlogs } from '../../../../redux/actions/blogActions';
import "../blog/Blog.css";
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';

// JSX:
const Blog = () => {
  const dispatch = useDispatch();
  
  // Seleccionamos el estado de Redux
  const { allBlogs, loading, error } = useSelector(state => state.blogs);

  //Traemos los blogs:
  useEffect(() => {
    dispatch(setTitle('Blog'));
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  return (
    <section className='blog-main-container'>
      <Helmet>
        <title>Blog</title>
      </Helmet>

      <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
        <h2 className='blog-intro'>
          Bienvenidos al blog de nuestra cooperativa, un espacio donde compartimos información relevante sobre nuestros servicios de electricidad e internet, novedades tecnológicas, consejos para el uso eficiente de la energía, y mucho más.
        </h2>
      </Fade>

      {loading && <p>Cargando blogs...</p>}
      {error && <p style={{ color: 'red' }}>Error al cargar blogs: {error}</p>}

      {/* Contenedor principal de los blogs */}
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          {[...allBlogs].reverse().map((blog) => (
            <div key={blog._id} className='blog-subcontainer'>
              <Link to={`/blog/${blog.path}`}>
                <div className='blog-image-container'>
                  <img
                    src={blog.imagenes[0]?.url}
                    alt={`imagen de ${blog.titulo}`}
                    className='blog-image'
                  />
                </div>
              </Link>
              <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
                <h3 className='blog-title'>{blog.titulo}</h3>
              </Link>
            </div>
          ))}
        </Fade>
      </div>

      <BotonWhatsapp />
    </section>
  );
};

export default Blog;
