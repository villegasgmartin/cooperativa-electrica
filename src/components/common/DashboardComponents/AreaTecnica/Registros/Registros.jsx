// Importaciones
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

import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerRegistros,
    eliminarRegistro,
    editarRegistro,
    marcarComoRealizada,
} from '../../../../../../redux/actions/tecnicaActions';

// JSX:
export default function Registros() {
const dispatch = useDispatch();
const registros = useSelector((state) => state.tecnica.registros || []);
const [openEliminar, setOpenEliminar] = React.useState(false);
const [registroEliminar, setRegistroEliminar] = React.useState(null);
const [openEditar, setOpenEditar] = React.useState(false);
const [descripcionEditada, setDescripcionEditada] = React.useState('');
const [categoriaEditada, setCategoriaEditada] = React.useState('');
const [fechaEditada, setFechaEditada] = React.useState(null);
const [registroEditar, setRegistroEditar] = React.useState(null);
const [categoriaFiltro, setCategoriaFiltro] = React.useState('');
const [fechaFiltro, setFechaFiltro] = React.useState(null);
const [filtroMesActual, setFiltroMesActual] = React.useState(false);

const theme = useTheme();
const isLight = theme.palette.mode === 'light';

// Cargar visitas pendientes:
React.useEffect(() => {
    dispatch(obtenerRegistros());
}, [dispatch]);

// Eliminar visitas pendientes:
const handleEliminar = async () => {
    if (!registroEliminar) return;
    await dispatch(eliminarRegistro(registroEliminar._id));
    setOpenEliminar(false);
};

// Editamos visitas:
const handleEditar = async () => {
    if (!registroEditar) return;
    const data = {
    descripcion: descripcionEditada,
    categoria: categoriaEditada,
    fecha: fechaEditada.toISOString(),
    };
    await dispatch(editarRegistro(registroEditar._id, data));
    setOpenEditar(false);
};

// Marcar como visita realizada:
const handleMarcarRealizada = async (registro) => {
    await dispatch(marcarComoRealizada(registro));
};

// Formatear fecha
const formatFecha = (fecha) =>
    new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    });

// Filtrar registros según filtros seleccionados
const registrosFiltrados = React.useMemo(() => {
    return registros.filter((registro) => {
    if (registro.estado) return false;

    if (categoriaFiltro && registro.categoria !== categoriaFiltro) return false;

    const fechaRegistro = dayjs(registro.fecha);
    if (filtroMesActual) {
        const inicioMes = dayjs().startOf('month');
        const finMes = dayjs().endOf('month');
        return fechaRegistro.isBetween(inicioMes, finMes, 'day', '[]');
    }
    if (fechaFiltro) {
        return fechaRegistro.isSame(fechaFiltro, 'day');
    }
    return true;
    });
}, [registros, categoriaFiltro, fechaFiltro, filtroMesActual]);

const filtrarMesActual = () => {
    setCategoriaFiltro('');
    setFiltroMesActual(true);
    setFechaFiltro(null);
};

const limpiarFiltros = () => {
    setCategoriaFiltro('');
    setFechaFiltro(null);
    setFiltroMesActual(false);
};

return (
    <Box sx={{ width: '90%', mx: 'auto', mt: 3, mb: 6 }}>
    <Typography variant="h5" gutterBottom fontFamily="InterTight">
        Visitas Pendientes
    </Typography>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
        <FormControl sx={{ minWidth: 220 }}>
        <InputLabel>Filtrar por motivo</InputLabel>
        <Select
            value={categoriaFiltro}
            onChange={(e) => {
            setCategoriaFiltro(e.target.value);
            setFiltroMesActual(false);
            setFechaFiltro(null);
            }}
            label="Filtrar por motivo"
        >
            <MenuItem value="">
            <em>Todos</em>
            </MenuItem>
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Filtrar por fecha"
            value={fechaFiltro}
            onChange={(newValue) => {
            setFechaFiltro(newValue);
            setFiltroMesActual(false);
            setCategoriaFiltro('');
            }}
            sx={{ minWidth: 180 }}
            slotProps={{ textField: { size: 'small' } }}
        />
        </LocalizationProvider>

        <Button
        variant="contained"
        onClick={filtrarMesActual}
        color="primary"
        sx={{ borderRadius: 50, px: 4 }}
        >
        Mes Actual
        </Button>

        <Button
        variant="outlined"
        onClick={limpiarFiltros}
        color="secondary"
        sx={{ borderRadius: 50, px: 4 }}
        >
        Limpiar filtros
        </Button>
    </Box>

    <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
            <TableCell
                sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: isLight ? '#fff' : 'primary.main',
                }}
            >
                Fecha
            </TableCell>
            <TableCell
                sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: isLight ? '#fff' : 'primary.main',
                }}
            >
                Motivo
            </TableCell>
            <TableCell
                sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: isLight ? '#fff' : 'primary.main',
                }}
            >
                Descripción
            </TableCell>
            <TableCell
                sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: isLight ? '#fff' : 'primary.main',
                }}
            >
                Gestión
            </TableCell>
            <TableCell
                sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
                color: isLight ? '#fff' : 'primary.main',
                }}
            >
                Marcar Realizada
            </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {registrosFiltrados.length === 0 ? (
            <TableRow>
                <TableCell colSpan={5} align="center">
                No hay registros que coincidan con los filtros.
                </TableCell>
            </TableRow>
            ) : (
            registrosFiltrados.map((registro) => (
                <TableRow key={registro._id}>
                <TableCell>{formatFecha(registro.fecha)}</TableCell>
                <TableCell>{registro.categoria}</TableCell>
                <TableCell>{registro.descripcion}</TableCell>
                <TableCell>
                    <Stack direction="row" spacing={1}>
                    <IconButton
                        color="primary"
                        onClick={() => {
                        setRegistroEditar(registro);
                        setDescripcionEditada(registro.descripcion);
                        setCategoriaEditada(registro.categoria);
                        setFechaEditada(dayjs(registro.fecha));
                        setOpenEditar(true);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => {
                        setRegistroEliminar(registro);
                        setOpenEliminar(true);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    </Stack>
                </TableCell>
                <TableCell>
                    <Button
                    variant="contained"
                    color="success"
                    size="small"
                    disabled={registro.estado}
                    onClick={() => handleMarcarRealizada(registro)}
                    >
                    {registro.estado ? 'Realizada' : 'Realizada'}
                    </Button>
                </TableCell>
                </TableRow>
            ))
            )}
        </TableBody>
        </Table>
    </TableContainer>

    {/* Modal Eliminar */}
    <Dialog open={openEliminar} onClose={() => setOpenEliminar(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
        <Typography>¿Estás seguro de que deseas eliminar este registro?</Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setOpenEliminar(false)}>Cancelar</Button>
        <Button onClick={handleEliminar} color="error">
            Eliminar
        </Button>
        </DialogActions>
    </Dialog>

    {/* Modal Editar */}
    <Dialog open={openEditar} onClose={() => setOpenEditar(false)}>
        <DialogTitle>Editar Registro</DialogTitle>
        <DialogContent>
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Motivo</InputLabel>
            <Select
            value={categoriaEditada}
            onChange={(e) => setCategoriaEditada(e.target.value)}
            label="Motivo"
            >
            {/* Mismas opciones */}
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
            fullWidth
            multiline
            minRows={3}
            label="Descripción"
            value={descripcionEditada}
            onChange={(e) => setDescripcionEditada(e.target.value)}
            sx={{ mb: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Fecha"
            value={fechaEditada}
            onChange={(newVal) => setFechaEditada(newVal)}
            slotProps={{ textField: { fullWidth: true } }}
            />
        </LocalizationProvider>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setOpenEditar(false)}>Cancelar</Button>
        <Button onClick={handleEditar} variant="contained" color="primary">
            Guardar
        </Button>
        </DialogActions>
    </Dialog>
    </Box>
);
}
