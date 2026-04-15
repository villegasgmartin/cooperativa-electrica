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
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getStock, putStock, deleteStock, postStock, getStockConfig } from '../../../../../../redux/actions/stockAction';


export default function GestionInventario() {
  const dispatch = useDispatch();
  
  // Traemos los items de stock y la configuración del back
  const { items, loading } = useSelector((state) => state.stock);
  const { config } = useSelector((state) => state.configStock);
  
  const [openRows, setOpenRows] = useState({});
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    id: '',
    categoria: '',
    descripcion: '',
    enStock: 0,
    terciarizado: false,
    deposito: '',
    cantidadRetirada: 0,
    cantidadAgregada: 0
  });

  useEffect(() => {
    dispatch(getStock());
    dispatch(getStockConfig()); // Cargamos las categorías dinámicas y porcentajes
  }, [dispatch]);

  // --- LÓGICA DE CÁLCULOS ---
  const calcularMetricas = (item) => {
    const consumoPromedioMensual = config?.consumoMensual || 0;
    const factorStockMin = (config?.porcentajeConsumoMensual || 0) / 100;

    const stockMinimo = consumoPromedioMensual * factorStockMin;
    const necesidadProyectada = stockMinimo + consumoPromedioMensual;
    const compraRecomendada = necesidadProyectada - item.enStock;

    return {
      consumoPromedioMensual,
      stockMinimo: stockMinimo.toFixed(2),
      necesidadProyectada: necesidadProyectada.toFixed(2),
      compraRecomendada: compraRecomendada > 0 ? compraRecomendada.toFixed(2) : 0,
      costoUnitario: item.costoUnitario || 0
    };
  };

  const agruparItems = (items) => {
    const grouped = {};
    items.forEach(item => {
      const key = item.descripcion;
      if (!grouped[key]) {
        grouped[key] = {
          descripcion: item.descripcion,
          categoria: item.categoria,
          total: 0,
          items: []
        };
      }
      grouped[key].total += Number(item.enStock);
      grouped[key].items.push(item);
    });
    return Object.values(grouped);
  };

  const toggleRow = (desc) => {
    setOpenRows(prev => ({ ...prev, [desc]: !prev[desc] }));
  };

  const handleOpen = (item = null) => {
    if (item) {
      setFormData({
        id: item._id,
        categoria: item.categoria,
        descripcion: item.descripcion,
        enStock: Number(item.enStock),
        terciarizado: item.terciarizado || false,
        deposito: item.deposito || '',
        cantidadRetirada: 0,
        cantidadAgregada: 0
      });
      setEditMode(true);
    } else {
      setFormData({
        id: '',
        categoria: '',
        descripcion: '',
        enStock: 0,
        terciarizado: false,
        deposito: 'General',
        cantidadRetirada: 0,
        cantidadAgregada: 0
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let newData = { ...prev };
      if (name === "terciarizado") {
        newData[name] = value === "Si";
        return newData;
      }
      if (name === "cantidadAgregada") {
        newData.cantidadAgregada = value;
        if (value !== "") newData.cantidadRetirada = "";
        return newData;
      }
      if (name === "cantidadRetirada") {
        newData.cantidadRetirada = value;
        if (value !== "") newData.cantidadAgregada = "";
        return newData;
      }
      newData[name] = value;
      return newData;
    });
  };

  const handleSubmit = async () => {
    if (!formData.categoria || !formData.descripcion) return;

    if (editMode) {
      if (formData.cantidadAgregada && formData.cantidadRetirada) {
        alert("Solo podés agregar o retirar stock, no ambos.");
        return;
      }
      await dispatch(putStock(formData.id, { 
        cantidadRetirada: formData.cantidadRetirada, 
        terciarizado: formData.terciarizado, 
        cantidadAgregada: formData.cantidadAgregada 
      }));
    } else {
      await dispatch(postStock(formData));
    }
    await dispatch(getStock());
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este artículo?')) {
      dispatch(deleteStock(id));
    }
  };

  const categoriasDinamicas = config?.categorias || [];

  const normalize = (str) =>
  (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

    const filteredItems = items.filter(item =>
  normalize(item.descripcion).includes(normalize(search))
);

  return (
    <Box sx={{ width: '95%', margin: 'auto', mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontFamily: 'InterTight' }}>Inventario Técnico</Typography>
        <TextField
          label="Buscar por descripción..."
          variant="outlined"
          fullWidth
          sx={{ mb: 3, width:"300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Agregar Stock
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5 }} />}

      {categoriasDinamicas.map((cat) => (
        <TableContainer component={Paper} sx={{ mb: 4, overflowX: "auto" }} key={cat.nombre}>
          <Typography variant="h6" sx={{ p: 2, bgcolor: '#30E691', fontWeight: 'bold', minWidth: 1100 }}>
            {cat.nombre}
          </Typography>
          <Table size="small" sx={{ minWidth: 1100 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 220 }}>Descripción</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Stock Actual</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Consumo Mensual</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Stock Mínimo</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Necesidad Proyectada</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Compra Recomendada</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Costo Unitario</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Depósito</TableCell>
                <TableCell sx={{ width: 120 }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agruparItems(filteredItems.filter(i => i.categoria === cat.nombre)).map((grupo) => (
                <React.Fragment key={grupo.descripcion}>
                  <TableRow>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleRow(grupo.descripcion)}>
                        {openRows[grupo.descripcion] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                      </IconButton>
                      {grupo.descripcion}
                    </TableCell>
                    <TableCell  align="center">{grupo.total}</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={9} sx={{ p: 0 }}>
                      <Collapse in={openRows[grupo.descripcion]} timeout="auto" unmountOnExit>
                        <Table size="small" sx={{ minWidth: 1100 }}>
                          <TableBody>
                            {grupo.items.map((item) => {
                              const metricas = calcularMetricas(item);
                              return (
                                <TableRow key={item._id}>
                                  <TableCell sx={{ width: 220, pl: 4 }}>{item.descripcion}</TableCell>
                                  <TableCell sx={{ width: 120 }} align="center">{item.enStock}</TableCell>
                                  <TableCell sx={{ width: 120 }} align="center">{metricas.consumoPromedioMensual}</TableCell>
                                  <TableCell sx={{ width: 120 }} align="center">{metricas.stockMinimo}</TableCell>
                                  <TableCell sx={{ width: 120 }} align="center">{metricas.necesidadProyectada}</TableCell>
                                  <TableCell sx={{ width: 120 }} align="center" sx={{ color: metricas.compraRecomendada > 0 ? 'red' : 'inherit', fontWeight: metricas.compraRecomendada > 0 ? 'bold' : 'normal' }}>
                                    {metricas.compraRecomendada}
                                  </TableCell>
                                  <TableCell sx={{ width: 120 }} align="center">U$D {metricas.costoUnitario}</TableCell>
                                  <TableCell sx={{ width: 120 }} align="center">{item.deposito}</TableCell>
                                  <TableCell sx={{ width: 120 }} align="center">
                                    <IconButton onClick={() => handleOpen(item)} color="primary">
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(item._id)} color="error">
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}

      {/* DIALOGO DINÁMICO */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Actualizar Stock' : 'Nuevo Ingreso de Stock'}</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          {!editMode && (
            <>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  name="categoria"
                  value={formData.categoria}
                  label="Categoría"
                  onChange={handleChange}
                >
                  {categoriasDinamicas.map((cat) => (
                    <MenuItem key={cat.nombre} value={cat.nombre}>{cat.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth disabled={!formData.categoria}>
                <InputLabel>Descripción</InputLabel>
                <Select
                  name="descripcion"
                  value={formData.descripcion}
                  label="Descripción"
                  onChange={handleChange}
                >
                  {(categoriasDinamicas.find(c => c.nombre === formData.categoria)?.items || []).map((desc) => (
                    <MenuItem key={desc} value={desc}>{desc}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Depósito</InputLabel>
                <Select
                  name="deposito"
                  value={formData.deposito}
                  label="Depósito"
                  onChange={handleChange}
                >
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Nave">Nave</MenuItem>
                  <MenuItem value="Oficina">Oficina</MenuItem>
                </Select>
              </FormControl>

              <TextField
                name="enStock"
                label="Stock Inicial"
                type="number"
                fullWidth
                value={formData.enStock}
                onChange={handleChange}
              />
            </>
          )}

          {editMode && (
            <>
              <Typography variant="subtitle2" color="textSecondary">
                Item: {formData.descripcion} ({formData.deposito})
              </Typography>
              <TextField
                name="cantidadAgregada"
                label="Ingresar Stock"
                type="number"
                fullWidth
                value={formData.cantidadAgregada}
                onChange={handleChange}
                disabled={!!formData.cantidadRetirada}
              />
              <TextField
                name="cantidadRetirada"
                label="Retirar Stock"
                type="number"
                fullWidth
                value={formData.cantidadRetirada}
                onChange={handleChange}
                disabled={!!formData.cantidadAgregada}
              />
            </>
          )}

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