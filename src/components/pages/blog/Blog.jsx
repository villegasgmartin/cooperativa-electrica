//Importaciones:
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';
import "../blog/Blog.css";
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import axios from 'axios';

//JSX:
const Blog = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    dispatch(setTitle('Blog'));

    // Traer blogs desde la base de datos
    axios.get('http://localhost:8000/api/blog/blogs')
      .then((response) => {
        console.log("Datos recibidos del backend:", response.data.blogs);
        setBlogs(response.data.blogs || []);
      })
      .catch((error) => {
        console.error("Error al cargar los blogs:", error);
      });
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

      {/* Contenedor principal de los blogs */}
      <div className='blog-container'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          {blogs.reverse().map((blog) => (
            <div key={blog._id} className='blog-subcontainer'>
              <Link to={`/blog/${blog._id}/${encodeURIComponent(blog.titulo)}`}>
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
