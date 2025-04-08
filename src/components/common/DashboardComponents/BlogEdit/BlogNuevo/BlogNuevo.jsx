//Importaciones:
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

//JSX:
export default function BlogNuevo() {
    const [titulo, setTitulo] = useState('');
    const [texto, setTexto] = useState('');
    const [imagenes, setImagenes] = useState([]);

    const handleImagenesChange = (event) => {
        setImagenes([...event.target.files]);
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 3 }}>
        <Typography variant="h5" gutterBottom sx={{fontFamily: "interTight"}}>
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
            label="Texto de la publicación"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            sx={{ mb: 2 }}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
        />

        <Button
            variant="contained"
            component="label"
            sx={{ mb: 2,
                textTransform: 'capitalize',
                borderRadius: '50px',        
                px: 4,
                fontFamily: "InterTight",
                fontSize: "17px",
                }}
        >
            Cargar Imágenes
            <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleImagenesChange}
            />
        </Button>

        {imagenes.length > 0 && (
            <Box>
            <Typography variant="body2">
                {imagenes.length} imagen{imagenes.length > 1 ? 'es' : ''} seleccionada{imagenes.length > 1 ? 's' : ''}
            </Typography>
            </Box>
        )}
        </Box>
    );
}
