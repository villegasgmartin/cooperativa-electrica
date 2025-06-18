import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../../../../../redux/actions/blogActions';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { Button } from '@mui/material';
import "./HomeBlog2.css";

const HomeBlog2 = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(state => state.blogs);

  //Traemos los blogs con redux:
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <p>Cargando blogs...</p>;
  if (error) return <p>Error al cargar blogs: {error}</p>;

  // Ordenar y tomar solo los 3 primeros
  const blogsOrdenados = [...blogs].sort((a, b) => b._id.localeCompare(a._id)).slice(0, 3);

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
          {blogsOrdenados.map((blog, index) => (
            <div key={blog._id} className={`homeBlog-noticia noticia-0${index + 1}`}>
              <Link to={`/blog/${blog.path}`}>
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
              color: "black",
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