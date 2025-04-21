import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Box, Typography, Paper } from '@mui/material';
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import "../blogNoticia1/BlogNoticia1.css"

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

  if (loading) return <div>Cargando...</div>;
  if (!blog) return <div>Blog no encontrado</div>;

  return (
    <Box className="blog-noticia" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>{blog.titulo}</Typography>
      <Typography variant="body1" paragraph>{blog.descripcion}</Typography>

      <Grid container spacing={2}>
        {blog.imagenes.map((imagen, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
              <img
                src={imagen.url}
                alt={`Imagen ${index + 1}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <BotonWhatsapp />
      </Box>
    </Box>
  );
}

export default BlogNoticia1;
