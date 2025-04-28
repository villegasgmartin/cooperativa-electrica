//Importaciones:
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';

//JSX:
export default function AgregarRegistro() {
    const [fecha, setFecha] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleGuardar = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('token');
            const headers = {
                'x-token': token,
            };

            const response = await axios.post(
                'https://cooperativaback.up.railway.app/api/tecnica/crear-tecnica',
                {
                    fecha: fecha.toISOString(),
                    categoria: categoria,
                    descripcion: descripcion,
                },
                { headers }
            );

            setSuccess(true);
            setFecha(null);
            setCategoria('');
            setDescripcion('');
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

            <FormControl sx={{ mb: 2, width: '50%', marginLeft: "10px" }} required>
                <InputLabel id="categoria-label">Motivo de visita</InputLabel>
                <Select
                    labelId="categoria-label"
                    value={categoria}
                    label="Motivo de visita"
                    onChange={(e) => setCategoria(e.target.value)}
                >
                    <MenuItem value="Ingreso al edificio">Ingreso al edificio</MenuItem>
                    <MenuItem value="Colocación de caja">Colocación de caja</MenuItem>
                    <MenuItem value="Reclamos de servicio">Reclamos de servicio</MenuItem>
                    <MenuItem value="Cambio de plan internet">Cambio de plan internet</MenuItem>
                    <MenuItem value="Cambio de plan tv">Cambio de plan tv</MenuItem>
                    <MenuItem value="Baja de internet">Baja de internet</MenuItem>
                    <MenuItem value="Baja de tv">Baja de tv</MenuItem>
                    <MenuItem value="Cambio de titularidad">Cambio de titularidad</MenuItem>
                    <MenuItem value="Cambio de domicilio">Cambio de domicilio</MenuItem>
                    <MenuItem value="Tarea programada">Tarea programada</MenuItem>
                    <MenuItem value="Suspension">Suspension</MenuItem>
                    <MenuItem value="Reconexión">Reconexión</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                minRows={3}
                sx={{ mb: 2 }}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleGuardar}
                disabled={loading || !fecha || !categoria || !descripcion}
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
