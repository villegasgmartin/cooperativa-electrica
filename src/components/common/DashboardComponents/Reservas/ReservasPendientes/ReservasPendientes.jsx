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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useTheme } from '@mui/material/styles';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservas } from '../../../../../../redux/actions/reservasActions';
import { updateReserva } from '../../../../../../redux/actions/reservasActions';
import { markReservaAsRealizada } from '../../../../../../redux/actions/reservasActions';
import { deleteReserva } from '../../../../../../redux/actions/reservasActions';
import { fetchUserData } from '../../../../../../redux/actions/userActions';
import React, { useEffect } from 'react';
import * as XLSX from 'xlsx';
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
function Row({ row, handleEditClick, handleDeleteClick, handleMarkAsRealizada , reservasLeer}) {
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
    doc.text(`Fecha Solicitud: ${row.fechaFormateada}`, 10, y); y += 10;
    doc.text(`Nombre y Apellido: ${row.nombre}`, 10, y); y += 10;
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
    doc.text(lines, 10, y); y += lines.length * 6; 
  
    doc.text('Observaciones:', 10, y); y += 10;
    y += 20; 
  
    doc.text('Firma del Titular ...............................................', 10, y); y += 20;
    doc.text('Aclaración ...................................................', 10, y -10); y += 10;
    doc.text(`Fecha ....../......./........... Hora ......... : ..........`, 10, y-10); y += 10;
  
    doc.addImage(logo1, 'PNG', 170, y - 30, 30, 25);

    doc.save(`orden-instalacion-${row.nombre.replace(/ /g, '_')}.pdf`);
  };


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
        <TableCell>{row.mes}</TableCell>

        {!reservasLeer && ( 
          <TableCell>
            <IconButton color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEditClick(row)}>
              <EditIcon />
            </IconButton>
            <IconButton color="secondary" size="small" sx={{ mr: 1 }} onClick={() => handleDeleteClick(row)}>
              <DeleteIcon />
            </IconButton>
            <IconButton color="error" size="small" onClick={() => handleImprimir(row)} title="Imprimir PDF">
              <PictureAsPdfIcon />
            </IconButton>
          </TableCell>
        )}

        {!reservasLeer && ( 
          <TableCell>
            <Button
              variant="contained"
              onClick={() => handleMarkAsRealizada(row)}
              disabled={row.estado}
              sx={{ fontSize: "12px" }}
            >
              Realizada
            </Button>
          </TableCell>
        )}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom>
                Detalles
              </Typography>
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

export default function ReservasPendientes() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedReserva, setSelectedReserva] = React.useState(null);
  const [reservaAEliminar, setReservaAEliminar] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [reservasFiltradas, setReservasFiltradas] = React.useState([]);
  const [mostrarMesActual, setMostrarMesActual] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [fechaDesde, setFechaDesde] = React.useState(null);
  const [fechaHasta, setFechaHasta] = React.useState(null);
  const [nombreUsuario, setNombreUsuario] = React.useState('');
  const dispatch = useDispatch();
  const { reservas} = useSelector((state) => state.reservas);
  const { nombre, reservasLeer} = useSelector((state) => state.user);

  //Filtrar por mes:
  const handleMostrarMesActual = () => {
    if (mostrarMesActual) {
      setReservasFiltradas([]);
      setMostrarMesActual(false);
    } else {
      const mesActual = dayjs().format('MMMM');
      const reservasDelMesActual = reservas.filter((reserva) =>
        dayjs(reserva.fecha).format('MMMM') === mesActual
      );
      setReservasFiltradas(reservasDelMesActual);
      setMostrarMesActual(true);
    }
  };
  
  //Funciones para eliminar con modal:
  const handleEditClick = (row) => {
    setSelectedReserva(row);
    setOpenModal(true);
  };

  const handleDeleteClick = (row) => {
    setReservaAEliminar(row);
    setOpenConfirmDialog(true);
  };

  //Función para obtener nombre de usuario:
useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  //Funcion para eliminar:
const handleConfirmDelete = () => {
  if (!reservaAEliminar) return;

  dispatch(deleteReserva(reservaAEliminar._id, nombreUsuario));
  setOpenConfirmDialog(false);
  setReservaAEliminar(null);
};

  //Cerramos modal:
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReserva(null);
  };

  //Función para marcar la reserva como realizada
const handleMarkAsRealizada = (row) => {
  dispatch(markReservaAsRealizada(row));
};

// Función para editar:
const handleSaveChanges = () => {
  dispatch(updateReserva(selectedReserva));
  setOpenModal(false);
  setSelectedReserva(null);
};

//Traemos las reservas: GET
useEffect(() => {
    dispatch(fetchReservas());
  }, [dispatch]);

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
  saveAs(blob, `Reservas_${dayjs().format('DD-MM-YYYY')}.xlsx`);
};

  //Tabla:
  return (
    <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
        Reservas pendientes
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
          {mostrarMesActual ? 'Mostrar todas' : 'Mes actual'}
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
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Servicio</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Fecha y Hora</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Mes</TableCell>
                {!reservasLeer && ( 
                <>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Gestión</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Marcar Realizada</TableCell>
                </>
              )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(reservasFiltradas.length > 0 ? reservasFiltradas : reservas)
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
                })
                .map((row) => (
                  <Row
                    key={row._id}
                    row={row}
                    reservasLeer={reservasLeer}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleMarkAsRealizada={handleMarkAsRealizada}
                  />
                ))
              }
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
              <TextField label="Nombre" fullWidth margin="normal" value={selectedReserva.nombre} onChange={(e) => setSelectedReserva({ ...selectedReserva, nombre: e.target.value })} />
              <TextField label="Dirección" fullWidth margin="normal" value={selectedReserva.direccion} onChange={(e) => setSelectedReserva({ ...selectedReserva, direccion: e.target.value })} />
              <TextField label="Piso" fullWidth margin="normal" value={selectedReserva.Piso} onChange={(e) => setSelectedReserva({ ...selectedReserva, Piso: e.target.value })} />
              <TextField label="Dpto" fullWidth margin="normal" value={selectedReserva.Dpto} onChange={(e) => setSelectedReserva({ ...selectedReserva, Dpto: e.target.value })} />
              <TextField label="Teléfono" fullWidth margin="normal" value={selectedReserva.telefono} onChange={(e) => setSelectedReserva({ ...selectedReserva, telefono: e.target.value })} />
              <TextField label="Servicio" fullWidth margin="normal" value={selectedReserva.internet} onChange={(e) => setSelectedReserva({ ...selectedReserva, internet: e.target.value })} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  label="Fecha"
                  value={dayjs(selectedReserva.fecha)}
                  onChange={(newDate) => setSelectedReserva({ ...selectedReserva, fecha: newDate.toISOString() })}
                  renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </LocalizationProvider>
              <FormControl fullWidth margin="normal">
                <InputLabel>Hora</InputLabel>
                <Select value={selectedReserva.horario} onChange={(e) => setSelectedReserva({ ...selectedReserva, horario: e.target.value })}>
                  <MenuItem value="8-10">8:00 - 10:00</MenuItem>
                  <MenuItem value="10-12">10:00 - 12:00</MenuItem>
                  <MenuItem value="12-14">12:00 - 14:00</MenuItem>
                  <MenuItem value="14-16">14:00 - 16:00</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" color="secondary" onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>Guardar cambios</Button>
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