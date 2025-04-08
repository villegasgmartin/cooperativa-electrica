//Importaciones:
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    DialogContentText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//JSX:
const dummyBlogs = [
    {
        id: 1,
        titulo: 'Primera publicación',
        texto: 'Este es el contenido de la primera publicación.',
        fecha: '2025-04-01',
        imagenes: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/200',
        ],
    },
    {
        id: 2,
        titulo: 'Segunda publicación',
        texto: 'Contenido interesante sobre el segundo blog.',
        fecha: '2025-04-02',
        imagenes: ['https://via.placeholder.com/180'],
    },
    ];

    export default function BlogGestor() {
    const [blogs, setBlogs] = useState(dummyBlogs);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const handleEditOpen = (blog) => {
        setSelectedBlog({ ...blog });
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setSelectedBlog(null);
    };

    const handleDeleteOpen = (blog) => {
        setSelectedBlog(blog);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        setBlogs(blogs.filter((b) => b.id !== selectedBlog.id));
        setDeleteDialogOpen(false);
        setSelectedBlog(null);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedBlog(null);
    };

    const handleImageDelete = (imgUrl) => {
        setSelectedBlog((prev) => ({
        ...prev,
        imagenes: prev.imagenes.filter((img) => img !== imgUrl),
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedBlog((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    return (
        <Box sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom sx={{fontFamily: "InterTight"}}>
            Gestión de Publicaciones
        </Typography>

        <Box
            sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
            }}
        >
            {blogs.map((blog) => (
            <Paper key={blog.id} sx={{ padding: 2 }}>
                <Typography variant="h6">{blog.titulo}</Typography>
                <Typography variant="body2" color="textSecondary">
                {blog.fecha}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(blog)}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    color="secondary"
                    onClick={() => handleDeleteOpen(blog)}
                >
                    <DeleteIcon />
                </IconButton>
                </Box>
            </Paper>
            ))}
        </Box>

        {/* Diálogo de edición */}
        <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
            <DialogTitle>Editar Publicación</DialogTitle>
            <DialogContent>
            <TextField
                label="Título"
                name="titulo"
                fullWidth
                margin="normal"
                value={selectedBlog?.titulo || ''}
                onChange={handleInputChange}
            />
            <TextField
                label="Texto"
                name="texto"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={selectedBlog?.texto || ''}
                onChange={handleInputChange}
            />

            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Imágenes
            </Typography>
            <ImageList cols={3} rowHeight={140}>
                {selectedBlog?.imagenes?.map((img, idx) => (
                <ImageListItem key={idx}>
                    <img src={img} alt={`img-${idx}`} loading="lazy" />
                    <ImageListItemBar
                    actionIcon={
                        <IconButton
                        sx={{ color: 'white' }}
                        onClick={() => handleImageDelete(img)}
                        >
                        <DeleteIcon />
                        </IconButton>
                    }
                    />
                </ImageListItem>
                ))}
            </ImageList>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleEditClose}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={handleEditClose}>
                Guardar cambios
            </Button>
            </DialogActions>
        </Dialog>

        {/* Diálogo de confirmación de eliminación */}
        <Dialog
            open={deleteDialogOpen}
            onClose={handleDeleteClose}
        >
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogContent>
            <DialogContentText>
                ¿Seguro que querés eliminar la publicación "{selectedBlog?.titulo}"?
                Esta acción no se puede deshacer.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDeleteClose}>Cancelar</Button>
            <Button
                onClick={handleDeleteConfirm}
                color="secondary"
                variant="contained"
            >
                Eliminar
            </Button>
            </DialogActions>
        </Dialog>
        </Box>
    );
}
