//Importaciones:
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import axios from 'axios';
import "./HomeBlog2.css";
import { Button } from '@mui/material';

//JSX:
const HomeBlog2 = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/blog/blogs');
        const todosLosBlogs = response.data.blogs || [];
  
        // Ordenar por _id (más nuevo primero) y tomar los 3 primeros
        const blogsOrdenados = todosLosBlogs.sort((a, b) =>
          b._id.localeCompare(a._id)
        );
  
        setBlogs(blogsOrdenados.slice(0, 3));
      } catch (error) {
        console.error('Error al obtener los blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className='homeBlog-main-container'>
      <Fade triggerOnce={true} duration={900} delay={300}>
        <h2 className='homeBlog-title'>Blog</h2>
      </Fade>
      <Fade triggerOnce={true} duration={900} delay={300} direction='up'>
        <p className='homeBlog-description'>
          Bienvenidos al blog de nuestra cooperativa, un espacio donde compartimos
          información relevante sobre nuestros servicios de electricidad e internet, novedades tecnológicas,
          consejos para el uso eficiente de la energía, y mucho más.
        </p>
      </Fade>
      <div className='homeBlog-noticiasContainer'>
        <Fade cascade={true} duration={800} triggerOnce={true}>
          {blogs.map((blog, index) => (
            <div key={blog._id} className={`homeBlog-noticia noticia-0${index + 1}`}>
              <Link to={`/blog/${blog._id}/${encodeURIComponent(blog.titulo)}`}>
                <div className='homeBlog-img-container'>
                  <img
                    className='homeBlog-img'
                    src={blog.imagenes[0]?.url}
                    alt={blog.titulo}
                  />
                </div>
              </Link>
              <Link className='link-blog' to={`/blog/${blog._id}/${encodeURIComponent(blog.titulo)}`} style={{ textDecoration: 'none' }}>
                <h3 className='HomeBlog-noticiaTitle'>{blog.titulo}</h3>
              </Link>
            </div>
          ))}
        </Fade>
      </div>
      <div className='homeBlog-buttonContainer'>
        <Fade triggerOnce={true} duration={800} delay={300} direction='up'>
          <Link to={"/blog"}>
          <Button sx={{ 
              width: "100%",
              height: "100%",
              fontFamily: "interTight",
              fontSize: "25px",
              fontWeight: "bold",
              letterSpacing: "2px",
              borderRadius: "50px",
              boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
              textTransform: "none",
              color:"black",
              backgroundColor: "#2eed8d",
              }} 
              variant='contained' 
              size='large'
          >
              Ver más
          </Button>
          </Link>
        </Fade>
      </div>
    </section>
  );
};

export default HomeBlog2;