//Importaciones:
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Box, Paper, Button } from '@mui/material';
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import "../blogNoticia1/BlogNoticia1.css"
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@mui/material';

//JSX:
function BlogNoticia1() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/blog/get-blog?id=${id}`)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener el blog:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress color="primary" size={60} thickness={4} />
      </Box>
    );
  }
  
  if (!blog) return <div>Blog no encontrado</div>;

  return (
    <section className='noticia1-main-container'>
      <Box  sx={{ paddingLeft: 3, paddingRight: 3}}>
        <Fade triggerOnce={true} duration={800} delay={300} direction='left'>
          <h1 className='noticia1-title' gutterBottom>{blog.titulo}</h1>
          <p className='noticia1-description' paragraph>{blog.descripcion}</p>
        </Fade>
        <Grid container spacing={2}>
          {blog.imagenes.map((imagen, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Fade
                triggerOnce
                direction="up"
                delay={index * 150}
                duration={700}
              >
                <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                  <img
                    src={imagen.url}
                    alt={`Imagen ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Paper>
              </Fade>
            </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4 }}>
            <BotonWhatsapp />
          </Box>
      </Box>
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
              Volver
          </Button>
          </Link>
        </Fade>
      </div>
  </section>
  );
}

export default BlogNoticia1;
