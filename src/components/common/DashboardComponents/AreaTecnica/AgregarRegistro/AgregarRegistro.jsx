//Importaciones:
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';


//JSX:
export default function AgregarRegistro() {
    const [fecha, setFecha] = useState(null);
    const [motivo, setMotivo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleGuardar = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Traer el token desde localStorage
            const token = localStorage.getItem('token');

            // Headers con x-token
            const headers = {
                'x-token': token,
            };

            const response = await axios.post(
                'http://localhost:8000/api/tecnica/crear-tecnica',
                {
                    fecha: fecha.toISOString(),
                    descripcion: motivo,
                },
                { headers }
            );

            setSuccess(true);
            setFecha(null);
            setMotivo('');
        } catch (err) {
            console.error(err);
            setError('Hubo un error al guardar el registro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
                Agregar Registro
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Fecha"
                    value={fecha}
                    onChange={(newValue) => setFecha(newValue)}
                    format="DD/MM/YYYY"
                    sx={{ mb: 2, width: '40%' }}
                />
            </LocalizationProvider>

            <TextField
                label="Motivo de visita"
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleGuardar}
                disabled={loading || !fecha || !motivo}
            >
                {loading ? 'Guardando...' : 'Guardar'}
            </Button>

            {success && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                    Registro guardado correctamente.
                </Typography>
            )}

            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
}