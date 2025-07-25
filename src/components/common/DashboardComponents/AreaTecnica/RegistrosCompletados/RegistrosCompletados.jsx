// RImportaciones:
import * as React from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton, useTheme, Dialog, DialogActions, DialogContent,
    DialogTitle, Button, TextField, Select, MenuItem, InputLabel, FormControl, Collapse
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { useDispatch, useSelector } from 'react-redux';
import {
    obtenerRegistrosCompletados,
    eliminarRegistro,
    editarRegistro,
    marcarRegistroPendiente,
} from '../../../../../../redux/actions/tecnicaActions';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import logo1 from '../../../../../assets/images/logos/logo-nave-negro.png';

//JSX:
function RowDetalle({ registro, onMarcarPendiente, onEditar, onEliminar }) {
    const [open, setOpen] = React.useState(false);

    const formatFecha = (fecha) =>
        new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

    //PDF:
        const handleImprimir = () => {
        const doc = new jsPDF();
    
        // Título 
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('Cooperativa de Provisión de Electricidad,', 105, 20, { align: 'center' });
        doc.text('Servicios Públicos y Vivienda de Mar del Plata Ltda.', 105, 30, { align: 'center' });
    
        // Subtítulo 
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('20 de Septiembre 2638 Whatsapp 2235376973', 105, 40, { align: 'center' });
    
        let y = 50;
    
        // Título de la sección
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(`ÁREA TÉCNICA - ${registro.categoria}`, 10, y);
        y += 12;
    
        // Datos del socio
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);

        const fechaSolicitud = registro.fechaSolicitud
        ? dayjs(registro.fechaSolicitud).format('DD/MM/YYYY')
        : 'No disponible';
        doc.text(`Fecha de Solicitud: ${fechaSolicitud}`, 10, y);
        y += 10;

        const fechaTurno = registro.fecha
        ? dayjs(registro.fecha).format('DD/MM/YYYY')
        : 'No disponible';
        const horaTurno = registro.hora ? `, ${registro.hora} hs` : '';
        doc.text(`Fecha del Turno: ${fechaTurno}${horaTurno}`, 10, y);
        y += 10;

        const nombre = registro.nombre?.trim();
        const apellido = registro.apellido?.trim();

        const nombreCompleto = nombre && apellido
        ? `${nombre} ${apellido}`
        : nombre || apellido || 'No disponible';

        const numeroUsuario = registro.NumeroUsuario?.toString().trim();
        const textoFinal = numeroUsuario
        ? `Nombre y Apellido: ${nombreCompleto} - ${numeroUsuario}`
        : `Nombre y Apellido: ${nombreCompleto}`;

        doc.text(textoFinal, 10, y);
        y += 10;

        
        const direccion = registro.direccion?.trim() || 'No disponible';
        doc.text(`Dirección: ${direccion}`, 10, y);
        y += 10;
        doc.text(`Tipo: ${registro.tipo || 'No disponible'}   Piso: ${registro.Piso || 'No disponible'}   Dpto: ${registro.Dpto || 'No disponible'}`, 10, y); y += 10;
        //doc.text(`Teléfono: ${registro.telefono}`, 10, y); y += 10;
        //doc.text(`D.N.I.: ${registro.DNI}`, 10, y); y += 10;
        doc.text('C.U.I.T.: ', 10, y); y += 10;
        //doc.text(`Email: ${registro.email}`, 10, y); y += 10;
    
        // Datos del servicio solicitado
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('DATOS DEL SERVICIO SOLICITADO', 10, y);
        y += 12;
    
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`Motivo de visita: ${registro.categoria || 'No disponible'}`, 10, y); y += 10;
        //doc.text(`Plataforma digital: ${registro.tv || 'No disponible'}`, 10, y); y += 10;
        //doc.text(`Fecha y horario de conexión elegido: ${registro.fechaFormateada} - ${registro.horario}`, 10, y); y += 10;
    
        // Declaración
        const declarationText = `Declaro que los datos detallados precedentemente son totalmente ciertos y que han sido proporcionados con el fin de obtener los servicios ofrecidos por la Cooperativa en los términos y condiciones explícitas en el reverso de la presente, y a la vez me comprometo a no comercializar, subcontratar, suministrar a terceros ni enajenar en cualquier forma, el servicio solicitado. Además me comprometo a utilizar el servicio accediendo únicamente desde el domicilio declarado, y a no dar a conocer a terceros por ningún medio los datos de acceso a vuestro Servidor. Quedo a la vez notificado que, en caso de comprobarse por cualquier medio el incumplimiento de los compromisos, me será impedido el acceso al servicio en forma inmediata y sin comunicación previa de inhabilitación.`;
    
        const lines = doc.splitTextToSize(declarationText, 180);
        doc.text(lines, 10, y);
        y += lines.length * 5;
    
            if (registro.descripcion && registro.descripcion.trim() !== '') {
            doc.text('Observaciones:', 10, y);
            const obsLines = doc.splitTextToSize(registro.descripcion, 180);
            y += 6;
            doc.text(obsLines, 10, y);
            y += obsLines.length * 6;
        }
    
        y += 10;
        doc.text('Firma del Titular ...............................................', 10, y); y += 20;
        doc.text('Aclaración ...................................................', 10, y - 10);
        doc.text(`Fecha ....../......./........... Hora ......... : ..........`, 10, y);
    
        const pageHeight = doc.internal.pageSize.height;
        doc.addImage(logo1, 'PNG', 160, pageHeight - 40, 30, 25);
    
        doc.save('Área-Técnica-Realizados.pdf');
        };

    return (
        <>
            <TableRow hover>
                <TableCell>
                    <IconButton onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    {
                    registro.fechaSolicitud
                    ? formatFecha(registro.fechaSolicitud)
                    : 'No disponible'}
                </TableCell>
                <TableCell align="center">{formatFecha(registro.fecha)} - {registro.hora} hs</TableCell>
                <TableCell align="center">
                    {registro.direccion?.trim()
                        ? registro.direccion.split(',')[0]
                        : 'No disponible'}
                </TableCell>
                <TableCell align="center">
                    {registro.apellido
                        ? `${registro.nombre} ${registro.apellido}`
                        : registro.nombre} - {registro.NumeroUsuario}
                </TableCell>
                <TableCell align="center">{registro.categoria}</TableCell>
                <TableCell align="center">
                    <IconButton color="primary" onClick={() => onEditar(registro)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onEliminar(registro)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={handleImprimir}>
                        <PictureAsPdfIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                    <Button variant="contained" color="success" size="small" onClick={() => onMarcarPendiente(registro)}>
                        Pendiente
                    </Button>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Detalles
                            </Typography>
                            <ul>
                                <li><strong>Nombre y Apellido:</strong>{' '}{registro.nombre?.trim() || registro.apellido?.trim()? [registro.nombre, registro.apellido].filter(Boolean).join(' '): 'No disponible'}</li>
                                <li><strong>Número de usuario:</strong> {registro?.NumeroUsuario || 'No disponible'}</li>
                                <li><strong>Motivo de visita:</strong> {registro.categoria}</li>
                                <li><strong>Observaciones:</strong> {registro.descripcion}</li>
                            </ul>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function RegistrosCompletados() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const registros = useSelector((state) => state.tecnica.completados || []);

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
    const [nombreEditado, setNombreEditado] = React.useState('');
    const [apellidoEditado, setApellidoEditado] = React.useState('');
    const [numeroUsuarioEditado, setNumeroUsuarioEditado] = React.useState('');
    const [fechaSolicitudEditada, setFechaSolicitudEditada] = React.useState(null);
    const [horaEditada, setHoraEditada] = React.useState('');
    const [direccionEditada, setDireccionEditada] = React.useState('');
    const [filtroMotivo, setFiltroMotivo] = React.useState('');
    const [orden, setOrden] = React.useState({ campo: '', direccion: '' });

    //Función para obtener los registros completados:
    React.useEffect(() => {
        dispatch(obtenerRegistrosCompletados());
    }, [dispatch]);

    //Función para eliminar registros:
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
                NumeroUsuario: numeroUsuarioEditado,
                fecha: fechaEditada ? fechaEditada.toISOString() : null,
                nombre: nombreEditado,
                apellido: apellidoEditado,
                fechaSolicitud: fechaSolicitudEditada ? fechaSolicitudEditada.toISOString() : null,
                hora: horaEditada,
                direccion: direccionEditada,
            })
        );
        setOpenEditar(false);
    };

    //Función para marcar como pendiente:
    const marcarComoPendiente = (registro) => {
        dispatch(marcarRegistroPendiente({ ...registro, estado: false }));
    };

    //Formateo de fecha:
    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

//Manejo de orden:
const manejarOrden = (campo) => {
    setOrden((prevOrden) => {
        if (prevOrden.campo !== campo) {
        return { campo, direccion: 'desc' };
        } else {
        if (prevOrden.direccion === 'desc') {
            return { campo, direccion: 'asc' };
        } else if (prevOrden.direccion === 'asc') {
            return { campo: '', direccion: '' };
        } else {
            return { campo, direccion: 'desc' };
        }
        }
    });
};

// Filtrar registros según filtros seleccionados
    const registrosFiltrados = React.useMemo(() => {
        let resultado = registros.filter((registro) => {
            if (!registro.estado) return false;
            // Filtro por búsqueda general
            const query = searchQuery.toLowerCase();
            const coincideBusqueda =
                registro.descripcion?.toLowerCase().includes(query) ||
                registro.categoria?.toLowerCase().includes(query) ||
                registro.hora?.toLowerCase().includes(query) ||
                registro.direccion?.toLowerCase().includes(query) ||
                registro.nombre?.toLowerCase().includes(query) ||
                registro.fechaSolicitud?.toLowerCase().includes(query) ||
                registro.apellido?.toLowerCase().includes(query) ||
                registro.NumeroUsuario?.toString().toLowerCase().includes(query);
    
            if (searchQuery && !coincideBusqueda) return false;
    
            if (filtroMotivo && registro.categoria !== filtroMotivo) return false;
    
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
            return true;
        });
    
        if (orden.campo) {
        resultado = [...resultado].sort((a, b) => {
            let valA, valB;

            if (orden.campo === 'turno') {
            valA = a.fecha ? new Date(a.fecha) : new Date(0);
            valB = b.fecha ? new Date(b.fecha) : new Date(0);
            } else if (orden.campo === 'direccion') {
            valA = a.direccion?.toLowerCase() || '';
            valB = b.direccion?.toLowerCase() || '';
            } else if (orden.campo === 'usuario') {
            valA = (a.nombre + ' ' + (a.apellido || '')).toLowerCase();
            valB = (b.nombre + ' ' + (b.apellido || '')).toLowerCase();
            } else if (orden.campo === 'solicitud') {
            valA = a.fechaSolicitud ? new Date(a.fechaSolicitud) : new Date(0);
            valB = b.fechaSolicitud ? new Date(b.fechaSolicitud) : new Date(0);
            }

            if (valA < valB) return orden.direccion === 'asc' ? -1 : 1;
            if (valA > valB) return orden.direccion === 'asc' ? 1 : -1;
            return 0;
        });
    }

return resultado;

}, [registros, searchQuery, fechaDesde, fechaHasta, filtroMotivo, orden]);


// Exportar a Excel:
const exportarAExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Visitas');

    const columnas = [
        { header: 'FECHA DE SOLICITUD', key: 'solicitud', width: 20 },
        { header: 'FECHA DE TURNO', key: 'turno', width: 18 },
        { header: 'HORARIO', key: 'horario', width: 15 },
        { header: 'DIRECCIÓN', key: 'direccion', width: 25 },
        { header: 'NOMBRE Y APELLIDO', key: 'nombreApellido', width: 25 },
        { header: 'USUARIO', key: 'numeroUsuario', width: 15 },
        { header: 'MOTIVO DE VISITA', key: 'motivo', width: 30 },
    ];

    worksheet.columns = columnas;

    // Estilo de encabezado
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF12824C' },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
        };
    });

    // Preparar los datos en el nuevo formato
    const datosParaExcel = registrosFiltrados.map((registro) => {
        const nombreApellido = registro.apellido
        ? `${registro.nombre} ${registro.apellido}`
        : registro.nombre;

        return {
        solicitud: formatFecha(registro.fechaSolicitud) || 'No disponible',
        turno: formatFecha(registro.fecha),
        horario: registro.hora,
        direccion: registro.direccion?.split(',')[0] || '' ,
        nombreApellido,
        numeroUsuario: registro.NumeroUsuario || '',
        motivo: registro.categoria || '',
        };
    });

    datosParaExcel.forEach((dato) => {
        worksheet.addRow(dato);
    });

    // Estilo de celdas de datos
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return;
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
    const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, `Área Técnica - Realizados ${dayjs().format('DD-MM-YYYY')}.xlsx`);
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: 3, marginBottom: '50px' }}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
                Visitas Realizadas
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'InterTight', fontWeight: 'bold' }}>
                Mostrando {registrosFiltrados.length} de {registros.length} registros
            </Typography>

            {/*Filtros*/}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: '15px' }}>
                <TextField label="Buscar" variant="outlined" size="small" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: 200 }} />
                <FormControl size="small" sx={{ width: 200 }}>
                <InputLabel id="filtro-motivo-label">Motivo</InputLabel>
                    <Select
                        labelId="filtro-motivo-label"
                        value={filtroMotivo}
                        label="Motivo"
                        onChange={(e) => setFiltroMotivo(e.target.value)}
                    >
                        <MenuItem value="">Todos</MenuItem>
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
                    </Select>
                </FormControl>
                <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Desde" format="DD/MM/YYYY" value={fechaDesde} onChange={(newValue) => setFechaDesde(newValue)} sx={{ width: 150,  marginRight: '10px' }} maxDate={fechaHasta} />
                    <DatePicker label="Hasta" format="DD/MM/YYYY" value={fechaHasta} onChange={(newValue) => setFechaHasta(newValue)} sx={{ width: 150 }} minDate={fechaDesde} />
                </LocalizationProvider>
                </Box>
                <Button variant="outlined" onClick={() => { setFechaDesde(null); setFechaHasta(null); setSearchQuery(''); setFiltroMotivo(null) }} color="secondary" sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '14px' }}>Limpiar filtros</Button>
                <Button variant="outlined" color="success" startIcon={<DownloadIcon />} onClick={exportarAExcel} sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 3, fontFamily: 'InterTight', fontSize: '14px' }}>Excel</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                            <TableCell />
                            <TableCell
                                align="center"
                                sx={{
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                color: isLight ? '#fff' : 'primary.main',
                                }}
                            >
                                <Box sx={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                    Solicitud
                                    <Button
                                        onClick={() => manejarOrden('solicitud')}
                                        sx={{  minWidth: '20px', padding: '2px', fontSize: '20px', color: isLight ? '#fff' : 'primary.main', ml:"2px" }}
                                    >
                                        {orden.campo === 'solicitud' 
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
                                            }}
                                        >
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                            Turno
                                            <Button
                                                onClick={() => manejarOrden('turno')}
                                                sx={{  minWidth: '20px', padding: '2px', fontSize: '20px', color: isLight ? '#fff' : 'primary.main', ml:"2px" }}
                                            >
                                                {orden.campo === 'turno' 
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
                                            }}
                                        >
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
                                        <TableCell
                                            align="center"
                                            sx={{
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                            color: isLight ? '#fff' : 'primary.main',
                                            }}
                                        >
                                        <Box sx={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                            Usuario
                                            <Button
                                                onClick={() => manejarOrden('usuario')}
                                                sx={{ minWidth: '20px', padding: '2px', fontSize: '20px', color: isLight ? '#fff' : 'primary.main',  ml:"2px" }}
                                            >
                                                {orden.campo === 'usuario' ? (orden.direccion === 'asc' ? '↑' : orden.direccion === 'desc' ? '↓' : '↕') : '↕'}
                                            </Button>
                                            </Box>
                                        </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Motivo</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Gestión</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main' }}>Marcar Realizada</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registrosFiltrados.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No hay registros que coincidan con los filtros.</TableCell>
                            </TableRow>
                        ) : (
                            registrosFiltrados.map((registro) => (
                                <RowDetalle
                                    key={registro._id}
                                    registro={registro}
                                    onMarcarPendiente={marcarComoPendiente}
                                    onEditar={(reg) => {
                                        setRegistroEditar(reg);
                                        setNombreEditado(reg.nombre || '');
                                        setApellidoEditado(reg.apellido || '');
                                        setHoraEditada(reg.hora || '');
                                        setFechaSolicitudEditada(dayjs(reg.fechaSolicitud)) || null;
                                        setDireccionEditada(reg.direccion || '');
                                        setDescripcionEditada(reg.descripcion);
                                        setCategoriaEditada(reg.categoria);
                                        setFechaEditada(dayjs(reg.fecha));
                                        setNumeroUsuarioEditado(reg.NumeroUsuario || '');
                                        setOpenEditar(true);
                                    }}
                                    onEliminar={(reg) => {
                                        setRegistroEliminar(reg);
                                        setOpenEliminar(true);
                                    }}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

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
                        <Box sx={{ display: 'flex', gap: 2, mb: 2, mt:1 }}>
                            <TextField
                            label="Nombre"
                            value={nombreEditado}
                            onChange={(e) => setNombreEditado(e.target.value)}
                            fullWidth
                            sx={{ flex: 1 }}
                            />
                            <TextField
                            label="Apellido"
                            value={apellidoEditado}
                            onChange={(e) => setApellidoEditado(e.target.value)}
                            fullWidth
                            sx={{ flex: 1 }}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mb: 2, mt:1 }}>
                            <TextField
                            label="Número de Usuario"
                            value={numeroUsuarioEditado}
                            onChange={(e) => setNumeroUsuarioEditado(e.target.value)}
                            fullWidth
                            sx={{ flex: 1 }}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Fecha de Solicitud"
                                    value={fechaSolicitudEditada}
                                    onChange={(newVal) => setFechaSolicitudEditada(newVal)}
                                    slotProps={{ textField: { fullWidth: 1 } }}
                                    format="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Fecha del Turno"
                                value={fechaEditada}
                                onChange={(newVal) => setFechaEditada(newVal)}
                                slotProps={{ textField: { fullWidth: true } }}
                                format="DD/MM/YYYY"
                            />
                            </LocalizationProvider>

                            <TextField
                            label="Horario del Turno"
                            value={horaEditada}
                            onChange={(e) => setHoraEditada(e.target.value)}
                            placeholder="Ej: 10:00"
                            fullWidth
                            />
                        </Box>

                        <TextField
                            fullWidth
                            label="Dirección"
                            value={direccionEditada}
                            onChange={(e) => setDireccionEditada(e.target.value)}
                            sx={{ mb: 2 }}
                        />

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
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label="Descripción"
                            value={descripcionEditada}
                            onChange={(e) => setDescripcionEditada(e.target.value)}
                        />
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