// Importaciones:
import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Collapse, IconButton, Typography, Button, TextField, useTheme
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservasEliminadas } from '../../../../../../redux/actions/reservasActions';
import { marcarReservaPendiente }  from '../../../../../../redux/actions/reservasActions';

//JSX:
export default function ReservasEliminadas() {
    const dispatch = useDispatch();
    const { reservasEliminadas: reservas, loadingEliminadas, errorEliminadas } = useSelector(state => state.reservas);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [fechaFiltro, setFechaFiltro] = React.useState(null);
    const [mostrarMesActual, setMostrarMesActual] = React.useState(false);
    const [reservasLeer, setReservasLeer] = React.useState(false);
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    // Cargar reservas desde Redux
    React.useEffect(() => {
        dispatch(fetchReservasEliminadas());
    }, [dispatch]);

    // Función para marcar como pendiente una reserva eliminada
    const handleMarcarPendiente = (reserva) => {
        dispatch(marcarReservaPendiente(reserva._id));
    };

    const handleLimpiarFiltros = () => {
        setSearchQuery('');
        setFechaFiltro(null);
        setMostrarMesActual(false);
    };

    // Tabla
    function Row({ row }) {
        const [open, setOpen] = React.useState(false);

        return (
        <>
            <TableRow>
            <TableCell>
                <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell>{row.internet}</TableCell>
            <TableCell>{`${row.fechaFormateada} - ${row.horario} hs`}</TableCell>
            <TableCell>{row.responsable || 'N/A'}</TableCell>
            {!reservasLeer && (
                <TableCell>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ fontSize: '12px' }}
                    onClick={() => handleMarcarPendiente(row)}
                >
                    Pendiente
                </Button>
                </TableCell>
            )}
            </TableRow>

            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom>Detalles</Typography>
                    <ul>
                    <li>Nombre y Apellido: {row.nombre}</li>
                    <li>Dirección: {row.direccion}</li>
                    {row.Piso && <li>Piso: {row.Piso}</li>}
                    {row.Dpto && <li>Dpto: {row.Dpto}</li>}
                    <li>Tv: {row.tv}</li>
                    <li>Teléfono: {row.telefono}</li>
                    <li>DNI: {row.DNI}</li>
                    <li>Correo: {row.email}</li>
                    </ul>
                </Box>
                </Collapse>
            </TableCell>
            </TableRow>
        </>
        );
    }

    // Filtros
    const reservasFiltradas = reservas
        .filter((row) => row.internet.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((row) => !fechaFiltro || dayjs(row.fecha).isSame(fechaFiltro, 'day'))
        .filter((row) => !mostrarMesActual || dayjs(row.fecha).format('MMMM') === dayjs().format('MMMM'));

    return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: "50px" }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
            Reservas Eliminadas
        </Typography>

        {/* FILTROS */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <TextField
            label="Buscar servicio"
            variant="outlined"
            size="small"
            sx={{ width: '250px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format="DD/MM/YYYY"
                label="Filtrar por fecha"
                value={fechaFiltro}
                onChange={(newDate) => setFechaFiltro(newDate)}
                renderInput={(params) => <TextField {...params} size="small" sx={{ width: '250px' }} />}
            />
            </LocalizationProvider>
            <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '16px', width: "170px" }}
            onClick={() => setMostrarMesActual(!mostrarMesActual)}
            >
            {mostrarMesActual ? 'Mostrar todas' : 'Mes actual'}
            </Button>
            <Button
            variant="outlined"
            color="secondary"
            sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '16px' }}
            onClick={handleLimpiarFiltros}
            >
            Limpiar filtros
            </Button>
        </Box>

        {/* TABLA */}
        <TableContainer component={Paper}>
            <Table aria-label="tabla reservas eliminadas">
            <TableHead>
                <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                <TableCell />
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    Servicio
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    Fecha y Hora
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    Responsable
                </TableCell>
                {!reservasLeer && (
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    Marcar Pendiente
                    </TableCell>
                )}
                </TableRow>
            </TableHead>
            <TableBody>
                {loadingEliminadas ? (
                <TableRow><TableCell colSpan={5}>Cargando...</TableCell></TableRow>
                ) : errorEliminadas ? (
                <TableRow><TableCell colSpan={5}>Error al cargar las reservas.</TableCell></TableRow>
                ) : (
                reservasFiltradas.map((row) => (
                    <Row key={row._id} row={row} reservasLeer={reservasLeer} />
                ))
                )}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}
