// Importaciones:
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs, updateBlog, deleteBlog } from '../../../../../../redux/actions/blogActions';

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

//JSX:
export default function BlogGestor() {
    const dispatch = useDispatch();
    const { allBlogs: blogs } = useSelector((state) => state.blogs);

    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [blogSeleccionado, setBlogSeleccionado] = useState(null);
    const [tituloEditado, setTituloEditado] = useState('');
    const [subtituloEditado, setSubtituloEditado] = useState('');
    const [descripcionEditada, setDescripcionEditada] = useState('');

    //Traemos los blogs:
    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch]);

    //Eliminar blogs:
    const handleEliminar = () => {
        if (blogSeleccionado?._id) {
            dispatch(deleteBlog(blogSeleccionado._id));
            setModalEliminar(false);
        }
    };

    //Editar blogs:
    const handleEditar = async () => {
    if (blogSeleccionado?._id) {
        const updatedData = {
            titulo: tituloEditado,
            subtitulo: subtituloEditado,
            descripcion: descripcionEditada,
        };
        try {
            await dispatch(updateBlog(blogSeleccionado._id, updatedData));
            dispatch(fetchAllBlogs()); 
            setModalEditar(false);
        } catch (error) {
            console.error('Error al editar el blog:', error);
        }
    }
};

    const abrirModalEliminar = (blog) => {
        setBlogSeleccionado(blog);
        setModalEliminar(true);
    };

    const abrirModalEditar = (blog) => {
        setBlogSeleccionado(blog);
        setTituloEditado(blog.titulo);
        setSubtituloEditado(blog.subtitulo || '');
        setDescripcionEditada(blog.descripcion);
        setModalEditar(true);
    };

    return (
        <Box sx={{ mt: 3, marginBottom: 4 }}>
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
                                {blog.subtitulo && (
                                    <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                                        {blog.subtitulo}
                                    </Typography>
                                )}
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
            <Modal open={modalEliminar} onClose={() => setModalEliminar(false)} aria-labelledby="modal-eliminar">
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
            <Modal open={modalEditar} onClose={() => setModalEditar(false)} aria-labelledby="modal-editar">
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
                        label="Subtítulo"
                        fullWidth
                        value={subtituloEditado}
                        onChange={(e) => setSubtituloEditado(e.target.value)}
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

                    <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setModalEditar(false)}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleEditar}>
                        Guardar Cambios
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
