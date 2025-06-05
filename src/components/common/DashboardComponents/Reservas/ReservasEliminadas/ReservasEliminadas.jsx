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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';

//JSX:
export default function ReservasEliminadas() {
    const dispatch = useDispatch();
    const { reservasEliminadas: reservas, loadingEliminadas, errorEliminadas } = useSelector(state => state.reservas);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [fechaDesde, setFechaDesde] = React.useState(null);
    const [fechaHasta, setFechaHasta] = React.useState(null);
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

  //Función para limpiar los filtros
    const handleLimpiarFiltros = () => {
        setFechaDesde(null)
        setFechaHasta(null)
        setMostrarMesActual(false); 
        setSearchQuery('');
    };

  //EXCEL:
    const exportarAExcel = () => {
    // Aplico los mismos filtros que se ven en pantalla:
    const reservasFiltradasParaExcel = reservas
        .filter((row) => {
        const query = searchQuery.toLowerCase();
        return (
            row.internet.toLowerCase().includes(query) ||
            row.mes.toLowerCase().includes(query) ||
            row.nombre.toLowerCase().includes(query) ||
            row.direccion.toLowerCase().includes(query) ||
            row.telefono.toLowerCase().includes(query) ||
            row.email.toLowerCase().includes(query)
        );
        })
        .filter((row) => {
        if (!row.fecha) return false;
        const fechaReserva = dayjs(row.fecha);
        if (!fechaReserva.isValid()) return false;

        if (fechaDesde && fechaHasta) {
            return fechaReserva.isBetween(fechaDesde, fechaHasta, 'day', '[]');
        } else if (fechaDesde) {
            return fechaReserva.isSame(fechaDesde, 'day') || fechaReserva.isAfter(fechaDesde, 'day');
        } else if (fechaHasta) {
            return fechaReserva.isSame(fechaHasta, 'day') || fechaReserva.isBefore(fechaHasta, 'day');
        }
        return true;
        })
        .filter((row) => {
        if (!mostrarMesActual) return true;
        const mesActual = dayjs().format('MMMM');
        return dayjs(row.fecha).format('MMMM') === mesActual;
        });

    // Transformamos los datos para exportar
    const data = reservasFiltradasParaExcel.map((reserva) => ({
        Servicio: reserva.internet,
        Nombre: reserva.nombre,
        Dirección: reserva.direccion,
        Piso: reserva.Piso,
        Dpto: reserva.Dpto,
        Teléfono: reserva.telefono,
        Email: reserva.email,
        Fecha: dayjs(reserva.fecha).format('DD/MM/YYYY'),
        Horario: reserva.horario,
        Mes: reserva.mes,
        DNI: reserva.DNI,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reservas');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Reservas_${dayjs().format('DD-MM-YYYY')}.xlsx`);  };

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
        .filter((row) => {
            const query = searchQuery.toLowerCase();
            return (
            row.internet.toLowerCase().includes(query) ||
            row.mes.toLowerCase().includes(query) ||
            row.nombre.toLowerCase().includes(query) ||
            row.direccion.toLowerCase().includes(query) ||
            row.telefono.toLowerCase().includes(query) ||
            row.email.toLowerCase().includes(query)
            );
        })
        .filter((row) => {
            if (!row.fecha) return false; 
            const fechaReserva = dayjs(row.fecha); 
            if (!fechaReserva.isValid()) return false;
            if (fechaDesde && fechaHasta) {
            return fechaReserva.isBetween(fechaDesde, fechaHasta, 'day', '[]');
            } else if (fechaDesde) {
            return fechaReserva.isSame(fechaDesde, 'day') || fechaReserva.isAfter(fechaDesde, 'day');
            } else if (fechaHasta) {
            return fechaReserva.isSame(fechaHasta, 'day') || fechaReserva.isBefore(fechaHasta, 'day');
            }
            return true;
        })
        .filter((row) => !mostrarMesActual || dayjs(row.fecha).format('MMMM') === dayjs().format('MMMM'));

    return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: "50px" }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
            Reservas Eliminadas
        </Typography>

        {/* FILTROS */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: "15px" }}>
            <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            sx={{ width: '200px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/*DatePicker para filtrar por fecha*/}
            <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{width: "150px", marginRight: "10px"}}
                    format="DD/MM/YYYY"
                    label="Desde"
                    value={fechaDesde}
                    onChange={(newDate) => setFechaDesde(newDate)}
                    maxDate={fechaHasta}
                    renderInput={(params) => <TextField {...params} size="small" sx={{ width: 150, mr: 2 }} />}
                />
                
                <DatePicker
                    sx={{width: "150px"}}
                    format="DD/MM/YYYY"
                    label="Hasta"
                    value={fechaHasta}
                    onChange={(newDate) => setFechaHasta(newDate)}
                    minDate={fechaDesde}
                    renderInput={(params) => <TextField {...params} size="small" sx={{ width: 150 }} />}
                />
                </LocalizationProvider>
            </Box>
            {/*Botón para filtrar por mes*/}
            <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}
                onClick={() => setMostrarMesActual(!mostrarMesActual)}
                >
                {mostrarMesActual ? 'Mostrar todas' : 'Mes actual'}
                </Button>
                <Button
                variant="outlined"
                color="secondary"
                sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}
                onClick={handleLimpiarFiltros}
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
