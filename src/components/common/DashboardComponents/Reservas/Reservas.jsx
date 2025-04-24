//Importaciones:
import * as React from 'react';
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
//Logos para PDF
import logo1 from '../../../../assets/images/logos/logo-nave-negro.png';
import logo2 from '../../../../assets/images/logos/logo-pdf.png';

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
function Row({ row, handleEditClick, handleDeleteClick }) {
  const [open, setOpen] = React.useState(false);

  const handleImprimir = () => {
    const doc = new jsPDF();
    doc.addImage(logo1, 'PNG', 10, 10, 30, 25);
    doc.addImage(logo2, 'PNG', 170, 10, 30, 25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Orden de Instalación Programada', 105, 50, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Servicio: ${row.internet}`, 10, 70);
    doc.text(`Fecha y Hora: ${row.fechaFormateada} - ${row.horario}`, 10, 80);
    doc.text(`Mes: ${row.mes}`, 10, 90);

    let y = 110;
    doc.text(`Nombre y Apellido: ${row.nombre}`, 10, y); y += 12;
    doc.text(`Dirección: ${row.direccion}`, 10, y); y += 12;
    if (row.Piso) { doc.text(`Piso: ${row.Piso}`, 10, y); y += 12; }
    if (row.Dpto) { doc.text(`Dpto: ${row.Dpto}`, 10, y); y += 12; }
    doc.text(`Teléfono: ${row.telefono}`, 10, y);

    doc.text('Firma:', 10, 240);
    doc.line(30, 240, 100, 240);
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
        <TableCell>
          <IconButton color="primary" size="small" sx={{ mr: 1 }} onClick={() => handleEditClick(row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" size="small" sx={{ mr: 1 }} onClick={() => handleDeleteClick(row)}>
            <DeleteIcon />
          </IconButton>
          <IconButton color="error" size="small" onClick={handleImprimir} title="Imprimir PDF">
            <PictureAsPdfIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
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
                <li>Teléfono: {row.telefono}</li>
              </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Reservas() {
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

  //Botón de filtrar por mes:
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

  //Funcion para eliminar:
  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8000/api/reservas/borrar-reserva?id=${reservaAEliminar._id}`, {
        method: 'DELETE',
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
        const response = await fetch('http://localhost:8000/api/reservas/reservas', {
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
            horarioFormateado: `${r.horario.replace('-', 'hs a')}`,
          };
        });
        setReservas(reservasFormateadas);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    };
    fetchReservas();
  }, []);

  //Tabla:
  return (
    <Box sx={{ width: '80%', margin: 'auto', marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'InterTight' }}>
        Reservas
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
      <TextField
        label="Buscar servicio"
        variant="outlined"
        size="small"
        sx={{ width: '250px' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 4, fontFamily: 'InterTight', fontSize: '16px' }}
          onClick={handleMostrarMesActual}
        >
          {mostrarMesActual ? 'Todas' : 'Mes actual'}
        </Button>
      </Box>

      <Box sx={{ marginBottom: '50px' }}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                <TableCell />
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Servicio</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Fecha y Hora</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Mes</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', color: isLight ? '#fff' : 'primary.main', py: 2 }}>Gestión</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(reservasFiltradas.length > 0 ? reservasFiltradas : reservas)
                .filter((row) => 
                  row.internet.toLowerCase().includes(searchQuery.toLowerCase()) // Filtra por servicio
                )
                .map((row) => (
          <Row key={row._id} row={row} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
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
              <TextField label="Nombre" fullWidth margin="normal" value={selectedReserva.nombre} onChange={(e) => setSelectedReserva({ ...selectedReserva, nombre: e.target.value })} />
              <TextField label="Dirección" fullWidth margin="normal" value={selectedReserva.direccion} onChange={(e) => setSelectedReserva({ ...selectedReserva, direccion: e.target.value })} />
              <TextField label="Piso" fullWidth margin="normal" value={selectedReserva.Piso} onChange={(e) => setSelectedReserva({ ...selectedReserva, Piso: e.target.value })} />
              <TextField label="Dpto" fullWidth margin="normal" value={selectedReserva.Dpto} onChange={(e) => setSelectedReserva({ ...selectedReserva, Dpto: e.target.value })} />
              <TextField label="Teléfono" fullWidth margin="normal" value={selectedReserva.telefono} onChange={(e) => setSelectedReserva({ ...selectedReserva, telefono: e.target.value })} />
              <TextField label="Servicio" fullWidth margin="normal" value={selectedReserva.internet} onChange={(e) => setSelectedReserva({ ...selectedReserva, internet: e.target.value })} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
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
