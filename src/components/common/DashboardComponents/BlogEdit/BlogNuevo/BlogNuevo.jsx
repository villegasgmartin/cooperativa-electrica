//Importaciones:
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog } from '../../../../../../redux/actions/blogActions';

//JSX:
export default function BlogNuevo() {
    const [titulo, setTitulo] = useState('');
    const [subtitulo, setSubtitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [imagenes, setImagenes] = useState([]);

    const dispatch = useDispatch();
    const theme = useTheme();

    // Extraemos el estado del store Redux
    const { createBlogLoading, createBlogError, createBlogSuccess } = useSelector(state => state.blogs);

    const handleImagenesChange = (event) => {
        const nuevasImagenes = Array.from(event.target.files);
        setImagenes(prev => [...prev, ...nuevasImagenes]);
        event.target.value = null;
    };

    const handleRemoveImage = (indexToRemove) => {
        setImagenes(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('subtitulo', subtitulo);
        formData.append('descripcion', texto);
        imagenes.forEach(imagen => {
            formData.append('imagenes', imagen);
        });

        dispatch(createBlog(formData));
    };

    const isFormValid = titulo.trim() && texto.trim() && imagenes.length > 0;

    useEffect(() => {
        if (createBlogSuccess) {
            setTitulo('');
            setSubtitulo('');
            setTexto('');
            setImagenes([]);
        }
    }, [createBlogSuccess]);

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "interTight" }}>
                Nueva Publicación
            </Typography>

            <TextField
                label="Título de la publicación"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <TextField
                label="Subtítulo de la publicación"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
            />

            <TextField
                label="Texto de la publicación"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                sx={{ mb: 2 }}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <label htmlFor="file-upload">
                    <input
                        id="file-upload"
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleImagenesChange}
                    />
                    <IconButton
                        component="span"
                        sx={{
                            width: 80,
                            height: 80,
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'background-color 0.3s',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.15),
                            },
                        }}
                    >
                        <UploadFileIcon color="primary" sx={{ fontSize: 40 }} />
                        <Typography variant="caption" color="primary">Imágenes</Typography>
                    </IconButton>
                </label>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disabled={createBlogLoading || !isFormValid}
                    sx={{
                        mb: 2,
                        textTransform: 'capitalize',
                        borderRadius: '50px',
                        px: 4,
                        fontFamily: "InterTight",
                        fontSize: "17px",
                    }}
                >
                    {createBlogLoading ? 'Creando...' : 'Crear Publicación'}
                </Button>
            </Box>

            {imagenes.length > 0 && (
                <>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                        {imagenes.length} imagen{imagenes.length > 1 ? 'es' : ''} seleccionada{imagenes.length > 1 ? 's' : ''}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        {imagenes.map((img, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`preview-${index}`}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc'
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleRemoveImage(index)}
                                    sx={{
                                        position: 'absolute',
                                        top: -10,
                                        right: -10,
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        '&:hover': { backgroundColor: '#f2f2f2' },
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </>
            )}

            {createBlogSuccess && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                    Publicación creada exitosamente.
                </Typography>
            )}

            {createBlogError && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {createBlogError}
                </Typography>
            )}
        </Box>
    );
}
