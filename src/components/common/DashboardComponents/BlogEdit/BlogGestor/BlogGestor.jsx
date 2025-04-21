//Importaciones:
import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Modal,
    TextField,
    Card,
    CardContent,
    CardActions,
    Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

//JSX:
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

export default function BlogGestor() {
    const [blogs, setBlogs] = useState([]);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [blogSeleccionado, setBlogSeleccionado] = useState(null);
    const [tituloEditado, setTituloEditado] = useState('');
    const [descripcionEditada, setDescripcionEditada] = useState('');

    const obtenerBlogs = async () => {
        try {
        const response = await axios.get('http://localhost:8000/api/blog/blogs', {
            headers: {
            'x-token': localStorage.getItem('token'),
            },
        });
        setBlogs(response.data.blogs);
        } catch (error) {
        console.error('Error al obtener blogs:', error);
        }
    };

    useEffect(() => {
        obtenerBlogs();
    }, []);

    const handleEliminar = async () => {
        try {
        await axios.delete(`http://localhost:8000/api/blog/borrar-blog?id=${blogSeleccionado._id}`, {
            headers: {
            'x-token': localStorage.getItem('token'),
            },
        });
        setModalEliminar(false);
        obtenerBlogs();
        } catch (error) {
        console.error('Error al eliminar el blog:', error);
        }
    };

    const handleEditar = async () => {
        try {
        await axios.put(
            `http://localhost:8000/api/blog/actualizar-blog?id=${blogSeleccionado._id}`,
            {
            titulo: tituloEditado,
            descripcion: descripcionEditada,
            },
            {
            headers: {
                'x-token': localStorage.getItem('token'),
            },
            }
        );
        setModalEditar(false);
        obtenerBlogs();
        } catch (error) {
        console.error('Error al editar el blog:', error);
        }
    };

    const abrirModalEliminar = (blog) => {
        setBlogSeleccionado(blog);
        setModalEliminar(true);
    };

    const abrirModalEditar = (blog) => {
        setBlogSeleccionado(blog);
        setTituloEditado(blog.titulo);
        setDescripcionEditada(blog.descripcion);
        setModalEditar(true);
    };

    return (
        <Box sx={{ mt: 3,  marginBottom: 4 }}>
        <Typography variant="h5" sx={{ fontFamily: 'interTight', mb: 2 }}>
            Lista de Publicaciones
        </Typography>

        <Grid container spacing={2}>
            {blogs.map((blog) => (
            <Grid item xs={12} md={6} key={blog._id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {blog.titulo}
                    </Typography>
                    <Typography variant="body2">{blog.descripcion}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton color="primary" onClick={() => abrirModalEditar(blog)}>
                    <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => abrirModalEliminar(blog)}>
                    <DeleteIcon />
                    </IconButton>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>

        {/* Modal Eliminar */}
        <Modal
            open={modalEliminar}
            onClose={() => setModalEliminar(false)}
            aria-labelledby="modal-eliminar"
        >
            <Box sx={styleModal}>
            <Typography id="modal-eliminar" variant="h6" sx={{ mb: 2 }}>
                ¿Estás seguro de que deseas eliminar este blog?
            </Typography>
            <Button variant="contained" color="error" onClick={handleEliminar} sx={{ mr: 1 }}>
                Eliminar
            </Button>
            <Button variant="outlined" onClick={() => setModalEliminar(false)}>
                Cancelar
            </Button>
            </Box>
        </Modal>

        {/* Modal Editar */}
        <Modal
            open={modalEditar}
            onClose={() => setModalEditar(false)}
            aria-labelledby="modal-editar"
        >
            <Box sx={styleModal}>
            <Typography id="modal-editar" variant="h6" sx={{ mb: 2 }}>
                Editar Publicación
            </Typography>

            <TextField
                label="Título"
                fullWidth
                value={tituloEditado}
                onChange={(e) => setTituloEditado(e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={4}
                value={descripcionEditada}
                onChange={(e) => setDescripcionEditada(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" onClick={handleEditar} sx={{ mr: 1 }}>
                Guardar Cambios
            </Button>
            <Button variant="outlined" onClick={() => setModalEditar(false)}>
                Cancelar
            </Button>
            </Box>
        </Modal>
        </Box>
    );
}
