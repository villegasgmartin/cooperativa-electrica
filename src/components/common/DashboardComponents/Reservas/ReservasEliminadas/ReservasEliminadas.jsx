// Importaciones:
import React, { useEffect, useState } from 'react';
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
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchUserData } from '../../../../../../redux/actions/userActions';

//JSX:
export default function ReservasEliminadas() {
    const dispatch = useDispatch();
    const { reservasEliminadas: reservas, loadingEliminadas, errorEliminadas } = useSelector(state => state.reservas);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [fechaDesde, setFechaDesde] = React.useState(null);
    const [fechaHasta, setFechaHasta] = React.useState(null);
    const [mostrarMesActual, setMostrarMesActual] = React.useState(false);
    const { nombre, reservasLeer} = useSelector((state) => state.user);
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    const [orden, setOrden] = useState({ campo: '', direccion: '' });
    const [filtroServicio, setFiltroServicio] = React.useState(null);

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
        setFiltroServicio(null);
    };

      //Función para obtener nombre de usuario:
    useEffect(() => {
        dispatch(fetchUserData());
        }, [dispatch]);
    

 //Excel:
const exportarAExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reservas');

    const columnas = [
        { header: 'NOMBRE Y APELLIDO', key: 'nombre', width: 25 },
        { header: 'DIRECCIÓN', key: 'direccion', width: 25 },
        { header: 'INMUEBLE', key: 'tipo', width: 11 },
        { header: 'PISO', key: 'piso', width: 7 },
        { header: 'DPTO', key: 'dpto', width: 7 },
        { header: 'FECHA DE TURNO', key: 'fechaTurno', width: 18 },
        { header: 'HORARIO', key: 'horario', width: 15 },
        { header: 'FECHA DE SOLICITUD', key: 'fechaSolicitud', width: 25 },
        { header: 'SERVICIO', key: 'internet', width: 15 },
        { header: 'TELÉFONO', key: 'telefono', width: 15 },
        { header: 'EMAIL', key: 'email', width: 30 },
        { header: 'DNI', key: 'dni', width: 13 },
    ];

    worksheet.columns = columnas;

    // Encabezado con estilo
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '#12824c' },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
        };
    });

    const reservasFiltradas = reservas
        .filter((row) => {
        const query = searchQuery.toLowerCase();
        return (
            row.internet?.toLowerCase().includes(query) ||
            row.mes?.toLowerCase().includes(query) ||
            row.nombre?.toLowerCase().includes(query) ||
            row.apellido?.toLowerCase().includes(query) ||
            row.direccion?.toLowerCase().includes(query) ||
            row.telefono?.toLowerCase().includes(query) ||
            row.email?.toLowerCase().includes(query) ||
            row.tipo?.toLowerCase().includes(query)
        );
        })
        .filter((row) => {
            const tieneFiltroFecha = fechaDesde || fechaHasta;
            if (!row.fecha) {
                return !tieneFiltroFecha;
            }

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
        })
        .filter((row) => {
            if (filtroServicio === null) return true;
            if (filtroServicio === 'tv') return row.esTV === true;
            if (filtroServicio === 'internet') return row.esTV === false;
            return true;
    });

    reservasFiltradas.forEach((reserva) => {
        worksheet.addRow({
        nombre: reserva.apellido ? `${reserva.nombre} ${reserva.apellido}` : reserva.nombre,
        direccion: reserva.direccion?.split(',')[0],
        tipo: reserva.tipo,
        piso: reserva.Piso,
        dpto: reserva.Dpto,
        fechaTurno: dayjs(reserva.fecha).format('DD/MM/YYYY'),
        horario: reserva.horario,
        fechaSolicitud: reserva.fechaSolicitud 
            ? dayjs(reserva.fechaSolicitud).format('D [de] MMMM [de] YYYY') 
            : 'No disponible',
        internet: reserva.internet,
        telefono: reserva.telefono,
        email: reserva.email,
        dni: reserva.DNI,
        });
    });

    // Ajuste de estilo para todas las celdas de datos
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `Reservas Eliminadas${dayjs().format('DD-MM-YYYY')}.xlsx`);
    };

    //Ordenar alfabeticamente y ascendente y descendente: 
    const manejarOrden = (campo) => {
        if (orden.campo === campo) {
            if (orden.direccion === null) {
            setOrden({ campo, direccion: 'asc' });
            } else if (orden.direccion === 'asc') {
            setOrden({ campo, direccion: 'desc' });
            } else {
            setOrden({ campo: null, direccion: null });
            }
        } else {
            setOrden({ campo, direccion: 'asc' });
        }
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
            <TableCell align='center'>{(row.apellido ? `${row.nombre} ${row.apellido}` : row.nombre)} - {row.NumeroUsuario}</TableCell>
            <TableCell align='center'>{row.direccion.split(',')[0]}</TableCell>
            <TableCell align='center'>
                {row.fechaSolicitud
                ? dayjs(row.fechaSolicitud).format('DD [de] MMMM [de] YYYY - HH:mm')
                : 'No disponible'}
            </TableCell>
            <TableCell align="center">
                {row.fecha ? dayjs(row.fecha).format('DD/MM/YYYY') : 'TV sin turno'}
                <br />
                {row.horario ? row.horario : ''}
            </TableCell>
            <TableCell align='center'>{row.responsable || 'N/A'}</TableCell>
            {!reservasLeer && (
                <TableCell align='center'>
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
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom>Detalles</Typography>
                    <ul>
                        <li><strong>Servicio:</strong> {row.internet}</li>
                        <li><strong>Fecha de la solicitud:</strong> {row.fechaSolicitud
                            ? dayjs(row.fechaSolicitud).format('DD [de] MMMM [de] YYYY - HH:mm')
                            : 'No disponible'}</li>
                        <li><strong>Inmueble:</strong> {row.tipo}</li>
                        {row.Piso && <li><strong>Piso:</strong> {row.Piso}</li>}
                        {row.Dpto && <li><strong>Dpto:</strong> {row.Dpto}</li>}
                        <li><strong>Tv:</strong> {row.tv}</li>
                        <li><strong>Teléfono:</strong> {row.telefono}</li>
                        <li><strong>DNI:</strong> {row.DNI}</li>
                        <li><strong>Correo:</strong> {row.email}</li>
                        <li><strong>Tercerizado:</strong> {row.terceriazado ? 'Sí' : 'No'}</li>
                        {row.observaciones && <li><strong>Observaciones:</strong> {row.observaciones}</li>}
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
                if (reservasLeer) {
                    return row.terceriazado === true;
                }
                return true;
            })
        .filter((row) => {
            const query = searchQuery.toLowerCase();
            return (
                row.internet?.toLowerCase().includes(query) ||
                row.mes?.toLowerCase().includes(query) ||
                row.nombre?.toLowerCase().includes(query) ||
                row.apellido?.toLowerCase().includes(query) ||
                row.direccion?.toLowerCase().includes(query) ||
                row.telefono?.toLowerCase().includes(query) ||
                row.email?.toLowerCase().includes(query) ||
                row.DNI?.includes(query) ||
                row.tipo?.toLowerCase().includes(query)
            );
            })
        .filter((row) => {
            const tieneFiltroFecha = fechaDesde || fechaHasta;
            if (!row.fecha) {
                return !tieneFiltroFecha;
            }

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
        .filter((row) => !mostrarMesActual || dayjs(row.fecha).format('MMMM') === dayjs().format('MMMM'))
        .filter((row) => {
            if (filtroServicio === null) return true;
            if (filtroServicio === 'tv') return row.esTV === true;
            if (filtroServicio === 'internet') return row.esTV === false;
            return true;
        });
        let reservasOrdenadas = reservasFiltradas;
            if (orden.campo) {
                reservasOrdenadas = [...reservasFiltradas].sort((a, b) => {
                    if (orden.campo === 'nombre' || orden.campo === 'direccion') {
                    const textoA = a[orden.campo].toLowerCase();
                    const textoB = b[orden.campo].toLowerCase();
                
                    if (textoA < textoB) return orden.direccion === 'asc' ? -1 : 1;
                    if (textoA > textoB) return orden.direccion === 'asc' ? 1 : -1;
                    return 0;
                    } else if (orden.campo === 'fecha') {
                    const fechaA = dayjs(a.fecha);
                    const fechaB = dayjs(b.fecha);
                
                    if (!fechaA.isValid() || !fechaB.isValid()) return 0;
                
                    if (fechaA.isBefore(fechaB)) return orden.direccion === 'asc' ? -1 : 1;
                    if (fechaA.isAfter(fechaB)) return orden.direccion === 'asc' ? 1 : -1;
                    return 0;
                    } else if (orden.campo === 'fechaSolicitud') {
                    const fechaA = dayjs(a.fechaSolicitud);
                    const fechaB = dayjs(b.fechaSolicitud);
                
                    if (!fechaA.isValid() || !fechaB.isValid()) return 0;
                
                    if (fechaA.isBefore(fechaB)) return orden.direccion === 'asc' ? -1 : 1;
                    if (fechaA.isAfter(fechaB)) return orden.direccion === 'asc' ? 1 : -1;
                    return 0;
                    }
                    return 0;
                });
                }

        return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: "50px" }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
            Reservas Eliminadas
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'InterTight', fontWeight: 'bold' }}>
            Mostrando {reservasFiltradas.length} de {reservas.length} reservas
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
            {/*Botones para filtrar por tipo de servicios*/}
            <Box sx={{display: "flex", gap: "10px"}}>
                <Button
                variant={filtroServicio === 'internet' ? "contained" : "outlined"}
                color="info"
                onClick={() => setFiltroServicio('internet')}
                sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}
                >Reservas Internet
                </Button>
                <Button
                variant={filtroServicio === 'tv' ? "contained" : "outlined"}
                color="info"
                onClick={() => setFiltroServicio('tv')}
                sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}
                >Reservas TV
                </Button>
            </Box>
            {/*Botón para filtrar por mes*/}
            <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}
                onClick={() => setMostrarMesActual(!mostrarMesActual)}
                >
                {mostrarMesActual ? 'Todas' : 'Mes actual'}
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
                <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        Nombre
                        <Button
                        onClick={() => manejarOrden('nombre')}
                        sx={{ minWidth: '20px', padding: '2px', fontSize: '20px', color: isLight ? '#fff' : 'primary.main',  ml:"2px" }}
                        >
                        {orden.campo === 'nombre' ? (orden.direccion === 'asc' ? '↑' : orden.direccion === 'desc' ? '↓' : '↕') : '↕'}
                        </Button>
                    </Box>
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        Dirección
                        <Button
                        onClick={() => manejarOrden('direccion')}
                        sx={{minWidth: '20px', padding: '2px', fontSize: '20px', color: isLight ? '#fff' : 'primary.main', ml:"2px"  }}
                        >
                        {orden.campo === 'direccion'
                            ? (orden.direccion === 'asc' ? '↑' : orden.direccion === 'desc' ? '↓' : '↕')
                            : '↕'}
                        </Button>
                    </Box>
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        Solicitud
                        <Button
                        onClick={() => manejarOrden('fechaSolicitud')}
                        sx={{  minWidth: '20px', padding: '2px', fontSize: '20px', color: isLight ? '#fff' : 'primary.main', ml:"2px" }}
                        >
                        {orden.campo === 'fechaSolicitud'
                            ? (orden.direccion === 'asc' ? '↑' : orden.direccion === 'desc' ? '↓' : '↕')
                            : '↕'}
                        </Button>
                    </Box>
                </TableCell>
                <TableCell
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        color: isLight ? '#fff' : 'primary.main',
                        py: 2
                    }}
                    >
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        Turno
                        <Button
                        onClick={() => manejarOrden('fecha')}
                        sx={{
                            ml: "2px",
                            minWidth: '20px',
                            padding: '2px',
                            fontSize: '20px',
                            color: isLight ? '#fff' : 'primary.main'
                        }}
                        >
                        {orden.campo === 'fecha'
                            ? orden.direccion === 'asc'
                            ? '↑'
                            : orden.direccion === 'desc'
                            ? '↓'
                            : '↕'
                            : '↕'}
                        </Button>
                    </Box>
                </TableCell>
                <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
                    Responsable
                </TableCell>
                {!reservasLeer && (
                    <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>
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
                reservasOrdenadas.map((row) => (
                    <Row key={row._id} row={row} reservasLeer={reservasLeer} />
                ))
                )}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}
