// Importaciones:
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { crearTecnica, buscarUsuarioPorNumero } from '../../../../../../redux/actions/tecnicaActions';

// JSX:
export default function AgregarRegistro() {
    const [fecha, setFecha] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [numeroUsuario, setNumeroUsuario] = useState('');
    const [hora, setHora] = useState('');
    const [mostrarSuccess, setMostrarSuccess] = useState(false);
    const [motivoCustom, setMotivoCustom] = useState('');
    const [intentoDeGuardado, setIntentoDeGuardado] = useState(false);

    const dispatch = useDispatch();

    // Estado desde Redux
    const tecnicaState = useSelector((state) => state.tecnica);
    const {
        loading,
        error,
        success,
        usuario,
        notFound,
        loadingUsuario
    } = tecnicaState;

    // Resetear campos tras éxito:
    useEffect(() => {
        if (success) {
            setFecha(null);
            setCategoria('');
            setDescripcion('');
            setNumeroUsuario('');
            setHora('');
        }
    }, [success]);

    // Lanzar búsqueda de usuario por número
    useEffect(() => {
        if (numeroUsuario.trim() === '') return;
        const handler = setTimeout(() => {
            dispatch(buscarUsuarioPorNumero(numeroUsuario));
        }, 500);
        return () => clearTimeout(handler);
    }, [numeroUsuario, dispatch]);

    // Mostrar mensaje de éxito por 3s
    useEffect(() => {
        if (success) {
            setMostrarSuccess(true);
            const timer = setTimeout(() => setMostrarSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    // Función para guardar registro:
    const handleGuardar = () => {
        setIntentoDeGuardado(true);
        if (!fecha || (!categoria && !motivoCustom)  || !descripcion || !hora || !numeroUsuario || notFound) return;

        dispatch(crearTecnica({
            fecha: fecha.toISOString(),
            hora,
            categoria: motivoCustom || categoria, 
            descripcion,
            NumeroUsuario: numeroUsuario,
            nombre: usuario?.nombre || '',
            apellido: usuario?.apellido || '',
            direccion: usuario?.direccion || '',
            motivoCustom: motivoCustom || '',
        }));
    };


    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight', mb: 2 }}>
                Agregar Registro
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                    gap: 2,
                    flexWrap: 'wrap',
                    mb: 2
                }}
            >
                <Box sx={{ position: 'relative', width: { xs: '100%', md: 200 } }}>
                    <TextField
                        label="Número de usuario"
                        value={numeroUsuario}
                        onChange={(e) => setNumeroUsuario(e.target.value)}
                        error={notFound}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <CircularProgress
                                        size={20}
                                        sx={{ visibility: loadingUsuario ? 'visible' : 'hidden' }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                </Box>

                <TextField
                    label="Nombre"
                    value={usuario?.nombre || ''}
                    onChange={() => {}}
                    sx={{ width: { xs: '100%', md: 200 } }}
                />

                <TextField
                    label="Apellido"
                    value={usuario?.apellido || ''}
                    onChange={() => {}}
                    sx={{ width: { xs: '100%', md: 200 } }}
                />

                <TextField
                    label="Dirección"
                    value={(usuario?.direccion?.split(',')[0] || '').trim()}
                    onChange={() => {}}
                    sx={{ width: { xs: '100%', md: 300 } }}
                    />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Fecha"
                        value={fecha}
                        onChange={(newValue) => setFecha(newValue)}
                        format="DD/MM/YYYY"
                        sx={{ width: { xs: '100%', sm: 200 } }}
                    />
                </LocalizationProvider>

                <TextField
                    label="Hora"
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    sx={{ width: { xs: '100%', sm: 120 } }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                />

                <FormControl sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: 240 }} required>
                    <InputLabel id="categoria-label">Motivo de visita</InputLabel>
                    <Select
                        labelId="categoria-label"
                        value={categoria}
                        label="Motivo de visita"
                        onChange={(e) => {
                            setCategoria(e.target.value);
                            setMotivoCustom('');
                        }}        disabled={!!motivoCustom}
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
                        <MenuItem value=""><em>--- Borrar selección ---</em></MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Especificar otro motivo"
                    value={motivoCustom}
                    onChange={(e) => {
                        setMotivoCustom(e.target.value);
                        setCategoria('');
                    }}
                    disabled={!!categoria}
                    sx={{ width: { xs: '100%', sm: 240 } }}
                />
            </Box>

            <TextField
                label="Observaciones"
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
                disabled={
                    loading ||
                    !fecha ||
                    !hora ||
                    (!categoria && !motivoCustom) ||
                    !descripcion ||
                    !numeroUsuario ||
                    notFound
                            }
            >
                Guardar
            </Button>

            {mostrarSuccess && intentoDeGuardado && (
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
