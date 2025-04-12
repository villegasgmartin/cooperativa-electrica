// Importaciones:
import * as React from 'react';
import PropTypes from 'prop-types';
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
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useTheme } from '@mui/material/styles';
import jsPDF from 'jspdf';

// Logos
import logo1 from '../../../../assets/images/logos/logo-nave-negro.png';
import logo2 from '../../../../assets/images/logos/logo-pdf.png';

//JSX:
// Datos de ejemplo
function createData(service, dateTime, month) {
  return {
    service,
    dateTime,
    month,
    history: [
      { detail: 'Nombre y Apellido: Juan Pérez' },
      { detail: 'Dirección: Calle Falsa 123' },
      { detail: 'Teléfono: 123-456-789' },
    ],
  };
}

const rows = [
  createData('Internet', 'Lunes, 8hs a 10hs', 'Abril'),
  createData('Internet', 'Martes, 10hs a 12hs', 'Abril'),
  createData('Internet', 'Miércoles, 14hs a 16hs', 'Abril'),
  createData('Internet', 'Jueves, 16hs a 18hs', 'Abril'),
  createData('Internet', 'Viernes, 9hs a 11hs', 'Abril'),
  createData('Internet', 'Sábado, 11hs a 13hs', 'Abril'),
];

// Componente para fila colapsable
function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  const handleImprimir = () => {
    const doc = new jsPDF();

    // Logos
    doc.addImage(logo1, 'PNG', 10, 10, 35, 25);
    doc.addImage(logo2, 'PNG', 150, 10, 35, 25);

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Orden de Instalación Programada', 105, 50, { align: 'center' });

    // Datos
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Servicio: ${row.service}`, 10, 70);
    doc.text(`Fecha y Hora: ${row.dateTime}`, 10, 80);
    doc.text(`Mes: ${row.month}`, 10, 90);

    // Historial
    let y = 110;
    row.history.forEach((item) => {
      doc.text(`${item.detail}`, 10, y);
      y += 12;
    });

    // Firma
    doc.text('Firma:', 10, 240);
    doc.line(30, 240, 100, 240); // Línea horizontal

    // Guardar PDF
    doc.save(`orden-instalacion-${row.dateTime.replace(/[, ]/g, '_')}.pdf`);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.service}</TableCell>
        <TableCell>{row.dateTime}</TableCell>
        <TableCell>{row.month}</TableCell>
        <TableCell>
          <IconButton color="primary" size="small" sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" size="small" sx={{ mr: 1 }}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={handleImprimir}
            title="Imprimir PDF"
          >
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
                {row.history.map((item, index) => (
                  <li key={index}>{item.detail}</li>
                ))}
              </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    service: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
  }).isRequired,
};

// Componente principal
export default function Reservas() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <Box sx={{ width: '80%', margin: 'auto', marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'InterTight' }}>
        Reservas
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <TextField
          label="Buscar servicio"
          variant="outlined"
          size="small"
          sx={{ width: '250px' }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'capitalize',
            borderRadius: '50px',
            px: 4,
            fontFamily: 'InterTight',
            fontSize: '16px',
          }}
        >
          Mes actual
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: isLight ? '#30E691' : 'inherit',
              }}
            >
              <TableCell />
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: isLight ? '#fff' : 'primary.main',
                  py: 2,
                }}
              >
                Servicio
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: isLight ? '#fff' : 'primary.main',
                  py: 2,
                }}
              >
                Fecha y Hora
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: isLight ? '#fff' : 'primary.main',
                  py: 2,
                }}
              >
                Mes
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: isLight ? '#fff' : 'primary.main',
                  py: 2,
                }}
              >
                Gestión
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
