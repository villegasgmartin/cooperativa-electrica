import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getStock, putStock, deleteStock, postStock } from '../../../../../../redux/actions/stockAction';

export default function GestionInventario() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.stock);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    categoria: '',
    descripcion: '',
    enStock: 0,
    terciarizado: false
  });

  useEffect(() => {
    dispatch(getStock());
  }, [dispatch]);

  const categorias = {
    "INSTALACIONES DOMICILIARIAS": [
      "ONUs",
      "Fibra Drop Diel.",
      "Mordazas Drop AC",
      "Mordazas Drop DI",
      "Conectores",
      "Patchcord",
      "Precintos",
      "Grampas",
      "Cadena completa"
    ],
    "DESPLIEGUE": [
      "Fibra Drop AC",
      "NAP edificio",
      "NAP 1x8",
      "NAP 1x16",
      "Mordaza p/ drop AC",
      "Patchcord",
      "Conectores",
      "Fibra Oval 6pelos",
      "Fibra Oval 4pelos",
      "Fibra Oval 8pelos",
      "Mordazas clamp",
      "Suncho agujereado",
      "Cadena",
      "Bulones y tornillo",
      "Cruces de reserva",
      "Precintos"
    ]
  };

  const handleOpen = (item = null) => {
    if (item) {
      setFormData({
        id: item._id,
        categoria: item.categoria,
        descripcion: item.descripcion,
        enStock: Number(item.enStock),
        terciarizado: item.terciarizado || false
      });
      setEditMode(true);
    } else {
      setFormData({
        id: '',
        categoria: '',
        descripcion: '',
        enStock: 0,
        terciarizado: false
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "terciarizado") {
      setFormData({ ...formData, [name]: value === "Si" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!formData.categoria || !formData.descripcion) return;

    if (editMode) {
      dispatch(putStock(formData.id, { enStock: formData.enStock }));
    } else {
      dispatch(postStock(formData));
    }

    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este artículo?')) {
      dispatch(deleteStock(id));
    }
  };

  // Filtrar items según categoría
  const itemsPorCategoria = (cat) => items.filter(i => i.categoria === cat);

  return (
    <Box sx={{ width: '95%', margin: 'auto', mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontFamily: 'InterTight' }}>Inventario Técnico</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Agregar Stock
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }} />}

      {/* Tabla por categoría */}
      {["INSTALACIONES DOMICILIARIAS", "DESPLIEGUE"].map((cat) => (
        <TableContainer component={Paper} sx={{ mb: 4 }} key={cat}>
          <Typography variant="h6" sx={{ p: 2, bgcolor: '#30E691', fontWeight: 'bold' }}>
            {cat}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Descripción</TableCell>
                <TableCell align="right">En Stock</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsPorCategoria(cat).map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.descripcion}</TableCell>
                  <TableCell align="right">{item.enStock}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleOpen(item)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}

      {/* Dialogo para agregar/editar */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Actualizar Stock' : 'Nuevo Retiro'}</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Seleccionar categoria */}
          {!editMode && (
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                name="categoria"
                value={formData.categoria}
                label="Categoría"
                onChange={handleChange}
              >
                {Object.keys(categorias).map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Select de descripción según categoría elegida */}
          {formData.categoria && !editMode && (
            <FormControl fullWidth>
              <InputLabel>Descripción</InputLabel>
              <Select
                name="descripcion"
                value={formData.descripcion}
                label="Descripción"
                onChange={handleChange}
              >
                {categorias[formData.categoria].map((desc) => (
                  <MenuItem key={desc} value={desc}>{desc}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Cantidad a retirar / stock */}
          <TextField
            name="enStock"
            label="Cantidad"
            type="number"
            fullWidth
            value={formData.enStock}
            onChange={handleChange}
          />

          {/* Terciarizado */}
          <FormControl fullWidth>
            <InputLabel>Terciarizado</InputLabel>
            <Select
              name="terciarizado"
              value={formData.terciarizado ? "Si" : "No"}
              label="Terciarizado"
              onChange={handleChange}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Si">Si</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
