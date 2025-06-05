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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import DownloadIcon from '@mui/icons-material/Download';
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
const [filtroMesActual, setFiltroMesActual] = React.useState(false);
const [searchQuery, setSearchQuery] = React.useState('');
const [fechaDesde, setFechaDesde] = React.useState(null);
const [fechaHasta, setFechaHasta] = React.useState(null);

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
        // Filtro por búsqueda general
        const query = searchQuery.toLowerCase();
        const coincideBusqueda = (
            registro.descripcion?.toLowerCase().includes(query) ||
            registro.categoria?.toLowerCase().includes(query)
        );

        if (searchQuery && !coincideBusqueda) return false;

        // Filtro por fecha
        const fechaRegistro = dayjs(registro.fecha);
        if (!fechaRegistro.isValid()) return false;

        if (fechaDesde && fechaHasta) {
            if (!fechaRegistro.isBetween(fechaDesde, fechaHasta, 'day', '[]')) return false;
        } else if (fechaDesde) {
            if (fechaRegistro.isBefore(fechaDesde, 'day')) return false;
        } else if (fechaHasta) {
            if (fechaRegistro.isAfter(fechaHasta, 'day')) return false;
        }

        // Filtro por mes actual
        if (filtroMesActual) {
            return fechaRegistro.format('MMMM') === dayjs().format('MMMM');
        }

        return true;
    });
}, [registros, searchQuery, fechaDesde, fechaHasta, filtroMesActual]);


const filtrarMesActual = () => {
    setFiltroMesActual(true);
};

const limpiarFiltros = () => {
    setFechaDesde(null);
    setFechaHasta(null);
    setSearchQuery('');
    setFiltroMesActual(false);
};

//Excel:
    const exportarAExcel = () => {
    const datosParaExcel = registrosFiltrados.map((registro) => ({
        Fecha: formatFecha(registro.fecha),
        Motivo: registro.categoria,
        Descripción: registro.descripcion,
    }));

    const hoja = XLSX.utils.json_to_sheet(datosParaExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Visitas');

    const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Área Técnica.xlsx');
};

return (
    <Box sx={{ width: '90%', mx: 'auto', mt: 3, mb: 6 }}>
    <Typography variant="h5" gutterBottom fontFamily="InterTight">
        Visitas Pendientes
    </Typography>

    {/*Filtros:*/}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: "15px" }}>
        <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 200 }}
    />
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{width: "150px", marginRight: "10px"}}
                    label="Desde"
                    format="DD/MM/YYYY"
                    value={fechaDesde}
                    onChange={(newValue) => {
                    setFechaDesde(newValue);
                    setFiltroMesActual(false);
                    }}
                    maxDate={fechaHasta}
                    renderInput={(params) => <TextField {...params} size="small" sx={{ width: 150, mr: 2 }} />}
                />
                <DatePicker
                    sx={{width: "150px"}}
                    label="Hasta"
                    format="DD/MM/YYYY"
                    value={fechaHasta}
                    onChange={(newValue) => {
                    setFechaHasta(newValue);
                    setFiltroMesActual(false);
                    }}
                    minDate={fechaDesde}
                    renderInput={(params) => <TextField {...params} size="small" sx={{ width: 150 }} />}
                />
            </LocalizationProvider>
        </Box>
        <Button
        variant="contained"
        onClick={filtrarMesActual}
        color="primary"
        sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}
        >
        Mes Actual
        </Button>
        <Button
        variant="outlined"
        onClick={limpiarFiltros}
        color="secondary"
        sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}
        >
        Limpiar filtros
        </Button>
        <Button
            variant="outlined"
            color="success"
            startIcon={<DownloadIcon />}
            sx={{
            textTransform: 'capitalize',
            borderRadius: '50px',
            px: 3,
            fontFamily: 'InterTight',
            fontSize: '14px'
            }}
            onClick={exportarAExcel}
        >
            Excel
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
