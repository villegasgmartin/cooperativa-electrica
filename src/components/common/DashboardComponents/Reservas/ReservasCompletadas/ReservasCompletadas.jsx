//Importaciones:
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  Button,
  Modal,
  Box as MuiBox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControlLabel,
  Switch
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../../../../../redux/actions/userActions';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import DownloadIcon from '@mui/icons-material/Download';

//Logos para PDF
import logo1 from '../../../../../assets/images/logos/logo-nave-negro.png';

//JSX;
//Estilo de modales:
const modalStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const modalBoxStyles = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 3,
  padding: 3,
  width: 400,
  boxShadow: 24,
});

//PDF:
function Row({ row, handleEditClick, handleDeleteClick, reservasLeer, handleMarkAsRealizada  }) {
  const [open, setOpen] = React.useState(false);

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
      doc.text('SERVICIO DE INTERNET - Conexión de Servicio', 10, y);
      y += 12;
    
      // Datos del socio
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Fecha de Solicitud: ${
        row.fechaSolicitud
        ? dayjs(row.fechaSolicitud).format('D/M/YYYY')
        : 'No disponible'}`,10,y);y += 10;
      doc.text(`Fecha del Turno: ${row.fechaFormateada}`, 10, y); y += 10;

      const nombreCompleto = row.apellido ? `${row.nombre} ${row.apellido}` : row.nombre;
      doc.text(`Nombre y Apellido: ${nombreCompleto} - ${row.NumeroUsuario}`, 10, y);y += 10;

      doc.text(`Dirección: ${row.direccion}`, 10, y); y += 10;
      doc.text(`Tipo: ${row.tipo || 'No disponible'}   Piso: ${row.Piso || 'No disponible'}   Dpto: ${row.Dpto || 'No disponible'}`, 10, y); y += 10;
      doc.text(`Teléfono: ${row.telefono}`, 10, y); y += 10;
      doc.text(`D.N.I.: ${row.DNI}`, 10, y); y += 10
      doc.text('C.U.I.T.: ', 10, y); y += 10;
      doc.text(`Email: ${row.email}`, 10, y); y += 10;
    
      // Datos del servicio solicitado
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('DATOS DEL SERVICIO SOLICITADO', 10, y);
      y += 12;
    
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Plan elegido: ${row.internet || 'No disponible'}`, 10, y); y += 10;
      doc.text(`Plataforma digital: ${row.tv || 'No disponible'}`, 10, y); y += 10;
      doc.text(`Fecha y horario de conexión elegido: ${row.fechaFormateada} - ${row.horario}`, 10, y); y += 10;
    
      // Declaración
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const declarationText = `Declaro que los datos detallados precedentemente son totalmente ciertos y que han sido proporcionados con el fin de obtener los servicios ofrecidos por la Cooperativa en los términos y condiciones explícitas en el reverso de la presente, y a la vez me comprometo a no comercializar, subcontratar, suministrar a terceros ni enajenar en cualquier forma, el servicio solicitado. Además me comprometo a utilizar el servicio accediendo únicamente desde el domicilio declarado, y a no dar a conocer a terceros por ningún medio los datos de acceso a vuestro Servidor. Quedo a la vez notificado que, en caso de comprobarse por cualquier medio el incumplimiento de los compromisos, me será impedido el acceso al servicio en forma inmediata y sin comunicación previa de inhabilitación.`;
    
      const lines = doc.splitTextToSize(declarationText, 180);
      doc.text(lines, 10, y); y += lines.length * 5; 
    
    if (row.observaciones && row.observaciones.trim() !== '') {
      doc.text('Observaciones:', 10, y);
  
      const obsLines = doc.splitTextToSize(row.observaciones, 180);
      y += 6; 
      doc.text(obsLines, 10, y);
      y += obsLines.length * 6;
    }
      y += 10;
      doc.text('Firma del Titular ...............................................', 10, y); y += 20;
      doc.text('Aclaración ...................................................', 10, y -10); y += 10;
      doc.text(`Fecha ....../......./........... Hora ......... : ..........`, 10, y-10); y += 10;
    
      const pageHeight = doc.internal.pageSize.height;
      doc.addImage(logo1, 'PNG', 170, pageHeight - 40, 30, 25);
  
    doc.save(`Orden-Instalación-${nombreCompleto.replace(/ /g, '_')}.pdf`);
    };

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

        {!reservasLeer && ( 
          <>
          <TableCell align='center'>
            <IconButton  size="small" sx={{ mr: "1px" }}>
              <PersonIcon />
            </IconButton>
              <IconButton color="primary" size="small" sx={{ mr: "1px" }} onClick={() => handleEditClick(row)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" size="small" sx={{ mr: "1px" }} onClick={() => handleDeleteClick(row)}>
                <DeleteIcon />
              </IconButton>
              <IconButton color="error" size="small" onClick={() => handleImprimir(row)} title="Imprimir PDF">
                <PictureAsPdfIcon />
              </IconButton>
          </TableCell>
        <TableCell align='center'>
        <Button
          variant="contained"
          onClick={() => handleMarkAsRealizada(row)}
          disabled={!row.estado}
          sx={{
            fontSize: "12px",
          }}
        >
          Pendiente
        </Button>
        </TableCell>
          </>
          
        )}

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Detalles
              </Typography>
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

export default function ReservasCompletadas() {

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [reservas, setReservas] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedReserva, setSelectedReserva] = React.useState(null);
  const [reservaAEliminar, setReservaAEliminar] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [reservasFiltradas, setReservasFiltradas] = React.useState([]);
  const [mostrarMesActual, setMostrarMesActual] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [fechaDesde, setFechaDesde] = React.useState(null);
  const [fechaHasta, setFechaHasta] = React.useState(null);
  const { nombre, reservasLeer} = useSelector((state) => state.user);
  const dispatch = useDispatch();
    const [orden, setOrden] = useState({ campo: '', direccion: '' });

  //Funciones para editar: con modal:
  const handleEditClick = (row) => {
    setSelectedReserva(row);
    setOpenModal(true);
  };

  //Función para eliminar con modal.
  const handleDeleteClick = (row) => {
    setReservaAEliminar(row);
    setOpenConfirmDialog(true);
  };

  //Traemos datos del usuario:
  useEffect(() => {
      dispatch(fetchUserData());
    }, [dispatch]);

//Funcion para eliminar: 
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://panel-cooperativa-back-production.up.railway.app//api/reservas/borrar-reserva?id=${reservaAEliminar._id}`, {
        method: 'PUT',
        headers: { 'x-token': token },
      });
      if (!response.ok) throw new Error('Error al eliminar');
      setReservas(reservas.filter(r => r._id !== reservaAEliminar._id));
      setOpenConfirmDialog(false);
      setReservaAEliminar(null);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  //Cerramos modal:
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReserva(null);
  };

  //Función para editar:
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/reservas/actualizar-reserva?id=${selectedReserva._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
        body: JSON.stringify(selectedReserva),
      });

      if (!response.ok) throw new Error('Error al actualizar la reserva');
      setOpenModal(false);
      setSelectedReserva(null);
      setReservas(reservas.map((r) => r._id === selectedReserva._id ? { ...r, ...selectedReserva } : r));
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

 //Traemos las reservas: GET
  React.useEffect(() => {
    const fetchReservas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/reservas/reservas-realizadas', {
          headers: { 'x-token': token },
        });

        if (!response.ok) throw new Error('Error al obtener las reservas');
        const data = await response.json();
        const reservasFormateadas = data.reservas.map((r) => {
          const fechaObj = dayjs(r.fecha);
          return {
            ...r,
            fechaFormateada: fechaObj.format('D [de] MMMM'),
            mes: fechaObj.format('MMMM'),
          };
        });
        setReservas(reservasFormateadas);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    };
    fetchReservas();
  }, []);

  //Función para limpiar los filtros
  const handleLimpiarFiltros = () => {
    setFechaDesde(null)
    setFechaHasta(null)
    setMostrarMesActual(false); 
    setSearchQuery('');
  };

  //Marcar como pendiente: (correjir)
  const handleMarkAsRealizada = async (row) => {

    try {
      const token = localStorage.getItem('token');
  
      const updatedReserva = {
        ...row,
        estado: false,
        estadoBorrado: false,
      };
  
      const response = await fetch(`https://panel-cooperativa-back-production.up.railway.app/api/reservas/actualizar-reserva?id=${row._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
        body: JSON.stringify(updatedReserva),
      });
  
      if (!response.ok) throw new Error('Error al actualizar la reserva');
  
      console.log("Reserva actualizada correctamente");
  
      // Actualizamos la lista de reservas localmente
      setReservas(reservas.map(r => r._id === row._id ? { ...r, estado: false } : r));
  
    } catch (error) {
      console.error('Error al marcar como realizada:', error);
    }
  };

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
        if (!row.fecha) return true;
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
    saveAs(blob, `Reservas Realizadas${dayjs().format('DD-MM-YYYY')}.xlsx`);
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

// Calculamos aquí las reservas que se están mostrando
const baseReservas = reservasFiltradas.length > 0 ? reservasFiltradas : reservas;

const reservasMostradas = baseReservas
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
      row.tipo?.toLowerCase().includes(query)
    );
  })
  .filter((row) => {
    if (!row.fecha) return true;
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

let reservasOrdenadas = [...reservasMostradas];

if (orden.campo) {
  reservasOrdenadas.sort((a, b) => {
    if (orden.campo === 'nombre' || orden.campo === 'direccion') {
      const textoA = (a[orden.campo] || '').toLowerCase();
      const textoB = (b[orden.campo] || '').toLowerCase();

      if (textoA < textoB) return orden.direccion === 'asc' ? -1 : 1;
      if (textoA > textoB) return orden.direccion === 'asc' ? 1 : -1;
      return 0;
    } 
    
    if (orden.campo === 'fecha' || orden.campo === 'fechaSolicitud') {
      const fechaA = dayjs(a[orden.campo]);
      const fechaB = dayjs(b[orden.campo]);

      if (!fechaA.isValid() || !fechaB.isValid()) return 0;

      if (fechaA.isBefore(fechaB)) return orden.direccion === 'asc' ? -1 : 1;
      if (fechaA.isAfter(fechaB)) return orden.direccion === 'asc' ? 1 : -1;
      return 0;
    }

    return 0;
  });
}


  //Tabla:
  return (
    <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
        Reservas completadas
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'InterTight', fontWeight: 'bold' }}>
          Mostrando {reservasMostradas.length} de {reservas.length} reservas
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: "15px" }}>
        {/*Input de búsqueda por servicio*/}
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
          {mostrarMesActual ? 'Todas' : 'Mes actual'}
        </Button>
        {/*Botón para limpiar filtros*/}
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

      {/*Tabla*/}
      <Box sx={{ marginBottom: '50px' }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
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
                {!reservasLeer && ( 
                <>
                  <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Gestión</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Marcar Pendiente</TableCell>
                </>
              )}
              </TableRow>
            </TableHead>
            <TableBody>
              {reservasOrdenadas.map((row) => (
                <Row
                key={row._id}
                row={row}
                reservasLeer={reservasLeer}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                handleMarkAsRealizada={handleMarkAsRealizada}
                />
                ))}
              </TableBody>
          </Table>
        </TableContainer>
      </Box>

{/* Modal de edición */}
  <Modal open={openModal} onClose={handleCloseModal} sx={modalStyles}>
      <MuiBox sx={modalBoxStyles(theme)}>
        {selectedReserva && (
          <>
            <Typography variant="h6" gutterBottom>Editar Reserva</Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  fullWidth
                  value={selectedReserva.nombre}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, nombre: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido"
                  fullWidth
                  value={selectedReserva.apellido || ''}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, apellido: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Número de usuario"
                  fullWidth
                  value={selectedReserva.NumeroUsuario}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, NumeroUsuario: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="DNI"
                  fullWidth
                  value={selectedReserva.DNI}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, DNI: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Correo"
                  fullWidth
                  value={selectedReserva.email}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Dirección"
                  fullWidth
                  value={selectedReserva.direccion}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, direccion: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Piso"
                  fullWidth
                  value={selectedReserva.Piso}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, Piso: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Dpto"
                  fullWidth
                  value={selectedReserva.Dpto}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, Dpto: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Teléfono"
                  fullWidth
                  value={selectedReserva.telefono}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, telefono: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Servicio"
                  fullWidth
                  value={selectedReserva.internet}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, internet: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedReserva.terceriazado || false}
                      onChange={(e) =>
                        setSelectedReserva({ ...selectedReserva, terceriazado: e.target.checked })
                      }
                      color="primary"
                    />
                  }
                  label="Tercerizado"
                  sx={{ ml: 1 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Observaciones"
                  fullWidth
                  value={selectedReserva.observaciones}
                  onChange={(e) =>
                    setSelectedReserva({ ...selectedReserva, observaciones: e.target.value })
                  }
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Guardar cambios
              </Button>
            </Box>
          </>
        )}
      </MuiBox>
  </Modal>

      {/* Confirmación de eliminación */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}