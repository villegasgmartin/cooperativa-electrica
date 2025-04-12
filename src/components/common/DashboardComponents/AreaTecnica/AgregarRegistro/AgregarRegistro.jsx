//Importaciones:
import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

//JSX:
    export default function AgregarRegistro() {
    const [fecha, setFecha] = useState('');
    const [motivo, setMotivo] = useState('');

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "interTight" }}>
                Agregar Registro
            </Typography>

            <TextField
                label="Fecha"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />

            <TextField
                label="Motivo de visita"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
            />
        </Box>
    );
}
