// Importaciones:
import * as React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Stack,
    useTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// JSX:
export default function Registros() {
    const [registros, setRegistros] = React.useState([]);
    const [openEliminar, setOpenEliminar] = React.useState(false);
    const [registroEliminar, setRegistroEliminar] = React.useState(null);
    const [openEditar, setOpenEditar] = React.useState(false);
    const [descripcionEditada, setDescripcionEditada] = React.useState('');
    const [categoriaEditada, setCategoriaEditada] = React.useState('');
    const [fechaEditada, setFechaEditada] = React.useState(null);
    const [registroEditar, setRegistroEditar] = React.useState(null);
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const cargarRegistros = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-token': token };
            const response = await axios.get('https://cooperativaback.up.railway.app/api/tecnica/tecnicas', { headers });
            setRegistros(response.data.tecnica);
        } catch (error) {
            console.error('Error al cargar los registros:', error);
        }
    };

    React.useEffect(() => {
        cargarRegistros();
    }, []);

    const handleEliminar = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-token': token };
            const response = await axios.delete(
                `https://cooperativaback.up.railway.app/api/tecnica/borrar-tecnica?id=${registroEliminar._id}`,
                { headers }
            );

            if (response.status === 200) {
                setRegistros(registros.filter((r) => r._id !== registroEliminar._id));
                setOpenEliminar(false);
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    const handleEditar = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-token': token };
            const response = await axios.put(
                `https://cooperativaback.up.railway.app/api/tecnica/actualizar-tecnica?id=${registroEditar._id}`,
                {
                    descripcion: descripcionEditada,
                    categoria: categoriaEditada,
                    fecha: fechaEditada.toISOString(),
                },
                { headers }
            );

            if (response.status === 200) {
                setRegistros(
                    registros.map((registro) =>
                        registro._id === registroEditar._id
                            ? {
                                ...registro,
                                descripcion: descripcionEditada,
                                categoria: categoriaEditada,
                                fecha: fechaEditada.toISOString(),
                            }
                            : registro
                    )
                );
                setOpenEditar(false);
            }
        } catch (error) {
            console.error('Error al editar el registro:', error);
        }
    };

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
                Registros de Visitas Técnicas
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: isLight ? '#fff' : 'primary.main',
                                    py: 2,
                                }}
                            >
                                Fecha
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: isLight ? '#fff' : 'primary.main',
                                    py: 2,
                                }}
                            >
                                Motivo
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: isLight ? '#fff' : 'primary.main',
                                    py: 2,
                                }}
                            >
                                Descripción
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: isLight ? '#fff' : 'primary.main',
                                    py: 2,
                                }}
                            >
                                Gestión
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registros.map((registro) => (
                            <TableRow key={registro._id}>
                                <TableCell>{formatFecha(registro.fecha)}</TableCell>
                                <TableCell>{registro.categoria}</TableCell>
                                <TableCell>{registro.descripcion}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            color="primary"
                                            aria-label="editar"
                                            onClick={() => {
                                                setRegistroEditar(registro);
                                                setDescripcionEditada(registro.descripcion);
                                                setCategoriaEditada(registro.categoria); // nuevo
                                                setFechaEditada(dayjs(registro.fecha));
                                                setOpenEditar(true);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            aria-label="eliminar"
                                            onClick={() => {
                                                setRegistroEliminar(registro);
                                                setOpenEliminar(true);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal de confirmación para eliminar */}
            <Dialog open={openEliminar} onClose={() => setOpenEliminar(false)}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <Typography>¿Estás seguro de que deseas eliminar este registro?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEliminar(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleEliminar} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de edición */}
            <Dialog open={openEditar} onClose={() => setOpenEditar(false)}>
                <DialogTitle>Editar Registro</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={fechaEditada}
                            onChange={(newValue) => setFechaEditada(newValue)}
                            format="DD/MM/YYYY"
                            sx={{ mb: 2, width: '100%' }}
                        />
                    </LocalizationProvider>

                    {/* Select para motivo */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Motivo</InputLabel>
                        <Select
                            value={categoriaEditada}
                            onChange={(e) => setCategoriaEditada(e.target.value)}
                            label="Motivo"
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

                    {/* Campo de descripción */}
                    <TextField
                        margin="dense"
                        id="descripcion"
                        label="Descripción"
                        type="text"
                        fullWidth
                        multiline
                        minRows={3}
                        value={descripcionEditada}
                        onChange={(e) => setDescripcionEditada(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => setOpenEditar(false)} color="primary" sx={{ textTransform: 'capitalize' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleEditar} color="primary" sx={{ textTransform: 'capitalize' }}>
                        Guardar cambios
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
