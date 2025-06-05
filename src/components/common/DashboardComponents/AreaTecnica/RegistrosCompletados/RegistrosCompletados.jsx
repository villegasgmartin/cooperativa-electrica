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
import DownloadIcon from '@mui/icons-material/Download';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerRegistrosCompletados,
    eliminarRegistro,
    editarRegistro,
    marcarRegistroPendiente,
} from '../../../../../../redux/actions/tecnicaActions';

//JSX:
export default function RegistrosCompletados() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    // Redux state
    const registros = useSelector((state) => state.tecnica.completados || []);

    // Estados locales para diálogos y edición
    const [openEliminar, setOpenEliminar] = React.useState(false);
    const [registroEliminar, setRegistroEliminar] = React.useState(null);
    const [openEditar, setOpenEditar] = React.useState(false);
    const [descripcionEditada, setDescripcionEditada] = React.useState('');
    const [categoriaEditada, setCategoriaEditada] = React.useState('');
    const [fechaEditada, setFechaEditada] = React.useState(null);
    const [registroEditar, setRegistroEditar] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [fechaDesde, setFechaDesde] = React.useState(null);
    const [fechaHasta, setFechaHasta] = React.useState(null);
    const [filtroMesActual, setFiltroMesActual] = React.useState(false);

    // Cargar visitas realizadas:
    React.useEffect(() => {
        dispatch(obtenerRegistrosCompletados());
    }, [dispatch]);

    //Función para eliminar
    const handleEliminar = () => {
        if (!registroEliminar) return;
        dispatch(eliminarRegistro(registroEliminar._id));
        setOpenEliminar(false);
    };

    //Función para editar:
    const handleEditar = () => {
        if (!registroEditar) return;
        dispatch(
        editarRegistro(registroEditar._id, {
            descripcion: descripcionEditada,
            categoria: categoriaEditada,
            fecha: fechaEditada ? fechaEditada.toISOString() : null,
        })
        );
        setOpenEditar(false);
    };

    //Función para marcar como pendiente:
    const marcarComoPendiente = (registro) => {
        dispatch(
        marcarRegistroPendiente({
            ...registro,
            estado: false,
        })
        );
    };

  // Formatear fecha
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        });
    };

  // Filtrar registros localmente (el filtrado sigue aquí)
const registrosFiltrados = React.useMemo(() => {
    return registros.filter((registro) => {
        if (!registro.estado) return false;
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
        <Box sx={{ width: '90%', margin: 'auto', marginTop: 3, marginBottom: '50px' }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
            Visitas Realizadas
        </Typography>

        {/* Filtros */}
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

        {/* Tabla */}
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                <TableCell
                    sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}
                >
                    Fecha
                </TableCell>
                <TableCell
                    sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}
                >
                    Motivo
                </TableCell>
                <TableCell
                    sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}
                >
                    Descripción
                </TableCell>
                <TableCell
                    sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}
                >
                    Gestión
                </TableCell>
                <TableCell
                    sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}
                >
                    Marcar Pendiente
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {registrosFiltrados.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
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
                        onClick={() => marcarComoPendiente(registro)}
                        >
                        Pendiente
                        </Button>
                    </TableCell>
                    </TableRow>
                ))
                )}
            </TableBody>
            </Table>
        </TableContainer>

        {/* Diálogos */}
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

        <Dialog open={openEditar} onClose={() => setOpenEditar(false)}>
            <DialogTitle>Editar Registro</DialogTitle>
            <DialogContent>
            <Box sx={{ mt: 1 }}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Motivo</InputLabel>
                <Select value={categoriaEditada} onChange={(e) => setCategoriaEditada(e.target.value)} label="Motivo">
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
                fullWidth
                multiline
                minRows={3}
                value={descripcionEditada}
                onChange={(e) => setDescripcionEditada(e.target.value)}
                sx={{ mb: 2 }}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Fecha"
                    value={fechaEditada}
                    onChange={(newValue) => setFechaEditada(newValue)}
                    slotProps={{ textField: { fullWidth: true } }}
                />
                </LocalizationProvider>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenEditar(false)} color="primary">
                Cancelar
            </Button>
            <Button onClick={handleEditar} variant="contained" color="primary">
                Guardar
            </Button>
            </DialogActions>
        </Dialog>
        </Box>
    );
}
