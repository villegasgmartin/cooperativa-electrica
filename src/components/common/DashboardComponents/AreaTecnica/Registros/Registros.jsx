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
import axios from 'axios';

//JSX:
export default function Registros() {
const [registros, setRegistros] = React.useState([]);
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

//Obtenemos registros con estado en false:
const cargarRegistros = async () => {
try {
    const token = localStorage.getItem('token');
    const headers = { 'x-token': token };
    const response = await axios.get(
    'https://cooperativaback.up.railway.app/api/tecnica/tecnicas',
    { headers }
    );

    // Filtrar solo registros con estado: false
    const registrosFiltrados = response.data.tecnica.filter(registro => !registro.estado);
    setRegistros(registrosFiltrados);
} catch (error) {
    console.error('Error al cargar los registros:', error);
}
};


React.useEffect(() => {
    cargarRegistros();
}, []);


//Función para eliminar registros:
const handleEliminar = async () => {
    try {
    const token = localStorage.getItem('token');
    const headers = { 'x-token': token };
    await axios.delete(
        `https://cooperativaback.up.railway.app/api/tecnica/borrar-tecnica?id=${registroEliminar._id}`,
        { headers }
    );
    setRegistros(registros.filter((r) => r._id !== registroEliminar._id));
    setOpenEliminar(false);
    } catch (error) {
    console.error('Error al eliminar el registro:', error);
    }
};

//Función para editar registros:
const handleEditar = async () => {
    try {
    const token = localStorage.getItem('token');
    const headers = { 'x-token': token };
    await axios.put(
        `https://cooperativaback.up.railway.app/api/tecnica/actualizar-tecnica?id=${registroEditar._id}`,
        {
        descripcion: descripcionEditada,
        categoria: categoriaEditada,
        fecha: fechaEditada.toISOString(),
        },
        { headers }
    );

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
    } catch (error) {
    console.error('Error al editar el registro:', error);
    }
};

//Función para marcar como visita realizada:
const marcarComoRealizada = async (row) => {
try {
    const token = localStorage.getItem('token');
    const updatedRegistro = { ...row, estado: true };

    const response = await fetch(
    `https://cooperativaback.up.railway.app/api/tecnica/actualizar-tecnica?id=${row._id}`,
    {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'x-token': token,
        },
        body: JSON.stringify(updatedRegistro),
    }
    );

    if (!response.ok) throw new Error('Error al actualizar el registro');

    await cargarRegistros();
} catch (error) {
    console.error('Error al marcar como realizada:', error);
}
};


const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    });
};

const registrosFiltrados = React.useMemo(() => {
    return registros.filter((registro) => {
    if (categoriaFiltro && registro.categoria !== categoriaFiltro)
        return false;

    const fechaRegistro = dayjs(registro.fecha);
    if (filtroMesActual) {
        const inicioMes = dayjs().startOf('month');
        const finMes = dayjs().endOf('month');
        return fechaRegistro.isBetween(inicioMes, finMes, 'day', '[]');
    } else if (fechaFiltro) {
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

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
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
            <MenuItem value=""><em>Todos</em></MenuItem>
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

        <Button variant="contained" onClick={filtrarMesActual} color="primary" sx={{ borderRadius: 50, px: 4 }}>
        Mes Actual
        </Button>

        <Button variant="outlined" onClick={limpiarFiltros} color="secondary" sx={{ borderRadius: 50, px: 4 }}>
        Limpiar filtros
        </Button>
    </Box>

    <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Fecha</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Motivo</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Descripción</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Gestión</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Marcar Realizada</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {registrosFiltrados.length === 0 ? (
            <TableRow>
                <TableCell colSpan={5} align="center">No hay registros que coincidan con los filtros.</TableCell>
            </TableRow>
            ) : (
            registrosFiltrados.map((registro) => (
                <TableRow key={registro._id}>
                <TableCell>{formatFecha(registro.fecha)}</TableCell>
                <TableCell>{registro.categoria}</TableCell>
                <TableCell>{registro.descripcion}</TableCell>
                <TableCell>
                    <Stack direction="row" spacing={1}>
                    <IconButton color="primary" onClick={() => {
                        setRegistroEditar(registro);
                        setDescripcionEditada(registro.descripcion);
                        setCategoriaEditada(registro.categoria);
                        setFechaEditada(dayjs(registro.fecha));
                        setOpenEditar(true);
                    }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => {
                        setRegistroEliminar(registro);
                        setOpenEliminar(true);
                    }}>
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
                    onClick={() => marcarComoRealizada(registro)}
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
        <Button onClick={handleEliminar} color="error">Eliminar</Button>
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
            {/* Reutiliza las mismas opciones que arriba */}
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
        <Button onClick={handleEditar} variant="contained">Guardar</Button>
        </DialogActions>
    </Dialog>
    </Box>
);
}
