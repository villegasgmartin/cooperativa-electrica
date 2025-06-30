// Importaciones:
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Paper, Button, IconButton, CircularProgress } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { CSSTransition } from 'react-transition-group';
import { getBlogByPath } from '../../../../redux/actions/blogActions';
import NavBar from '../../common/layout/navBar/NavBar';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import "../blogNoticia1/BlogNoticia1.css";
import "../../common/layout/header/Header.css";

function BlogNoticia1() {
  const { path } = useParams();
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  const { singleBlog: blog, loading, error } = useSelector((state) => state.blogs);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getBlogByPath(path));
  }, [dispatch, path]);

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const handlePrevImage = () => {
    const currentIndex = blog.imagenes.findIndex((img) => img.url === selectedImage);
    const prevIndex = currentIndex === 0 ? blog.imagenes.length - 1 : currentIndex - 1;
    setSelectedImage(blog.imagenes[prevIndex].url);
  };

  const handleNextImage = () => {
    const currentIndex = blog.imagenes.findIndex((img) => img.url === selectedImage);
    const nextIndex = currentIndex === blog.imagenes.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(blog.imagenes[nextIndex].url);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress color="primary" size={60} thickness={4} />
      </Box>
    );
  }

  if (error || !blog) return <div>Blog no encontrado</div>;

  return (
    <>
      <header className="header-main-container">
        <div className="header-contactos-container">
          <div className="header-contactos">
            <LocationOnTwoToneIcon sx={{ color: "white" }} />
            <h4 className="header-contactosText">Alberti 3600, Mar del Plata</h4>
          </div>
          <div className="header-contactos">
            <LocationOnTwoToneIcon sx={{ color: "white" }} />
            <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
          </div>
          <div className="header-contactos" id="homePortada-tel">
            <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
            <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
          </div>
        </div>
        <div className="navbarPages-container">
          <NavBar />
        </div>
        <Fade duration={800} triggerOnce={true}>
          <h1 className="header-title-blog">{blog.titulo}</h1>
        </Fade>
      </header>

      <section className='noticia1-main-container'>
        <Box>
          <Fade triggerOnce duration={800} delay={300} direction='left'>
            <h2 className='noticia1-title' gutterBottom>{blog.subtitulo}</h2>
            <p className='noticia1-description' paragraph>{blog.descripcion}</p>
          </Fade>
          <Grid container spacing={2}>
            {blog.imagenes.map((imagen, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Fade triggerOnce direction="up" delay={index * 150} duration={700}>
                  <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2, cursor: 'pointer' }}>
                    <img
                      src={imagen.url}
                      alt={`Imagen ${index + 1}`}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                      onClick={() => handleImageClick(imagen.url)}
                    />
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4 }}>
          </Box>
        </Box>

        <div className='homeBlog-buttonContainer'>
          <Fade triggerOnce duration={800} delay={300} direction='up'>
            <Link to={"/blog"}>
              <Button
                sx={{
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
                Volver
              </Button>
            </Link>
          </Fade>
        </div>

        {/* Modal de imagen con animación */}
        <CSSTransition in={showModal} timeout={300} classNames="fade" unmountOnExit nodeRef={nodeRef}>
          <div className="modal-overlay" ref={nodeRef} onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <IconButton
                onClick={handleCloseModal}
                sx={{ position: 'absolute', top: 10, right: 10, color: 'white', backgroundColor: 'rgba(0,0,0,0.4)' }}
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 20,
                  transform: 'translateY(-50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              >
                <ArrowBackIos />
              </IconButton>
              <img src={selectedImage} alt="Vista ampliada" />
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 20,
                  transform: 'translateY(-50%)',
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </div>
          </div>
        </CSSTransition>
      </section>
      <Footer />
    </>
  );
}

export default BlogNoticia1;
