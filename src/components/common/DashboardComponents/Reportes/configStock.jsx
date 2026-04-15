import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  Select,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";

import {
  getStockConfig,
  updateStockConfig,
  addPrecioItem,
  updatePrecioItem,
  deletePrecioItem,
  getComprasSugeridas,
  getConsumoMensual,
  addCategoria,
  deleteCategoria,
  addItemCategoria,
  deleteItemCategoria
} from "../../../../../redux/actions/stockAction";

export default function ConfigInventario() {

  const dispatch = useDispatch();

  const {
    config,
    compras,
    totalItems,
    costoTotalCompra
  } = useSelector(state => state.configStock);

  const categorias = config?.categorias || [];

  const [porcentajes, setPorcentajes] = useState({
    porcentajeStockMinimo: 0,
    porcentajeConsumoMensual: 0
  });

  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [nuevoItem, setNuevoItem] = useState("");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [formPrecio, setFormPrecio] = useState({
    id: "",
    categoria: "",
    descripcion: "",
    costoUnitario: 0
  });

  useEffect(() => {
    dispatch(getStockConfig());
    dispatch(getComprasSugeridas());
  }, [dispatch]);

  useEffect(() => {
    if (config) {
      setPorcentajes({
        porcentajeStockMinimo: config.porcentajeStockMinimo,
        porcentajeConsumoMensual: config.porcentajeConsumoMensual
      });
    }
  }, [config]);

  const handleChange = (e) => {
    setPorcentajes({
      ...porcentajes,
      [e.target.name]: e.target.value
    });
  };

  const handleGuardarPorcentajes = async () => {

    await dispatch(updateStockConfig(config._id, porcentajes));

    Swal.fire({
      icon: "success",
      title: "Configuración actualizada",
      timer: 1600,
      showConfirmButton: false
    });

  };

  const handleAgregarCategoria = async () => {

    if (!nuevaCategoria) return;

    await dispatch(addCategoria(nuevaCategoria));

    setNuevaCategoria("");

    Swal.fire({
      icon: "success",
      title: "Categoría agregada",
      timer: 1500,
      showConfirmButton: false
    });

  };

  const handleAgregarItem = async () => {

    if (!categoriaSeleccionada || !nuevoItem) return;

    await dispatch(addItemCategoria(categoriaSeleccionada, nuevoItem));

    setNuevoItem("");

    Swal.fire({
      icon: "success",
      title: "Item agregado",
      timer: 1500,
      showConfirmButton: false
    });

  };

  const handleDeleteItem = (categoria, item) => {

    Swal.fire({
      title: "Eliminar item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar"
    }).then(async result => {

      if (result.isConfirmed) {

        await dispatch(deleteItemCategoria(categoria, item));

        Swal.fire({
          icon: "success",
          title: "Item eliminado",
          timer: 1400,
          showConfirmButton: false
        });

      }

    });

  };

  const handleOpen = (item = null) => {

    if (item) {

      setFormPrecio({
        id: item._id,
        categoria: item.categoria,
        descripcion: item.descripcion,
        costoUnitario: item.costoUnitario
      });

      setEditMode(true);

    } else {

      setFormPrecio({
        id: "",
        categoria: "",
        descripcion: "",
        costoUnitario: 0
      });

      setEditMode(false);

    }

    setOpen(true);

  };

  const handleClose = () => setOpen(false);

  const handlePrecioChange = (e) => {

    setFormPrecio({
      ...formPrecio,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmitPrecio = async () => {

    if (editMode) {

      await dispatch(updatePrecioItem(formPrecio.id, {
        costoUnitario: formPrecio.costoUnitario
      }));

      Swal.fire({
        icon: "success",
        title: "Precio actualizado",
        timer: 1600,
        showConfirmButton: false
      });

    } else {

      await dispatch(addPrecioItem(formPrecio));

      Swal.fire({
        icon: "success",
        title: "Precio agregado",
        timer: 1600,
        showConfirmButton: false
      });

    }

    handleClose();

  };

  const handleDeletePrecio = (id) => {

    Swal.fire({
      title: "Eliminar precio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar"
    }).then(async result => {

      if (result.isConfirmed) {

        await dispatch(deletePrecioItem(id));

        Swal.fire({
          icon: "success",
          title: "Precio eliminado",
          timer: 1400,
          showConfirmButton: false
        });

      }

    });

  };
  const normalize = (str) =>
  str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredCategorias = categorias
  .map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      const searchText = normalize(search);

      return (
        normalize(item).includes(searchText) ||
        normalize(cat.nombre).includes(searchText)
      );
    })
  }))
  .filter(cat => cat.items.length > 0);

  return (

    <Box sx={{ width: "95%", margin: "auto", mt: 3 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Configuración de Inventario
      </Typography>

      {/* MÉTRICAS */}

      <Paper sx={{ p: 3, mb: 4 }}>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Configuración de métricas
        </Typography>

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>

          <TextField
            label="Porcentaje Stock Minimo"
            name="porcentajeStockMinimo"
            type="number"
            value={porcentajes.porcentajeStockMinimo}
            onChange={handleChange}
          />

          <TextField
            label="Porcentaje Consumo Mensual"
            name="porcentajeConsumoMensual"
            type="number"
            value={porcentajes.porcentajeConsumoMensual}
            onChange={handleChange}
          />

          <TextField
            label="Consumo mensual"
            value={config?.consumoMensual || 0}
            InputProps={{ readOnly: true }}
          />

          <Button
            variant="contained"
            onClick={handleGuardarPorcentajes}
          >
            Guardar
          </Button>

          <Button
            variant="outlined"
            onClick={async () => {

              await dispatch(getConsumoMensual());

              Swal.fire({
                icon: "success",
                title: "Consumo actualizado",
                timer: 1400,
                showConfirmButton: false
              });

            }}
          >
            Calcular consumo
          </Button>

        </Box>

      </Paper>

      {/* CATEGORIAS */}

      <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Categorías de Inventario
        </Typography>
        <TextField
          label="Buscar categoría o item..."
          variant="outlined"
          fullWidth
          sx={{ mb: 2, width:"300px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>

          <TextField
            label="Nueva categoría"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleAgregarCategoria}
          >
            Agregar categoría
          </Button>

        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>

          <FormControl sx={{ minWidth: 200 }}>

            <InputLabel>Categoría</InputLabel>

            <Select
              value={categoriaSeleccionada}
              label="Categoría"
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >

              {categorias.map(cat => (
                <MenuItem key={cat.nombre} value={cat.nombre}>
                  {cat.nombre}
                </MenuItem>
              ))}

            </Select>

          </FormControl>

          <TextField
            label="Nuevo item"
            value={nuevoItem}
            onChange={(e) => setNuevoItem(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleAgregarItem}
          >
            Agregar item
          </Button>

        </Box>

        <Table>

          <TableHead>

            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>

          </TableHead>

          <TableBody>

            {filteredCategorias.map(cat =>
              cat.items.map(item => (

                <TableRow key={cat.nombre + item}>

                  <TableCell>{cat.nombre}</TableCell>

                  <TableCell>{item}</TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteItem(cat.nombre, item)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))
            )}

          </TableBody>

        </Table>

      </Paper>

      {/* PRECIOS */}

      <Paper sx={{ p: 3 }}>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

          <Typography variant="h6">
            Precios de Items
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpen()}
          >
            Agregar
          </Button>

        </Box>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="center">Costo Unitario</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {config?.preciosItems?.map(item => (

              <TableRow key={item._id}>

                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.descripcion}</TableCell>

                <TableCell align="center">
                  ${item.costoUnitario}
                </TableCell>

                <TableCell align="center">

                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(item)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDeletePrecio(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

      {/* MODAL */}

      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>
          {editMode ? "Editar Precio" : "Nuevo Precio"}
        </DialogTitle>

        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>

          <FormControl fullWidth>

            <InputLabel>Categoría</InputLabel>

            <Select
              name="categoria"
              value={formPrecio.categoria}
              label="Categoría"
              onChange={handlePrecioChange}
            >

              {categorias.map(cat => (
                <MenuItem key={cat.nombre} value={cat.nombre}>
                  {cat.nombre}
                </MenuItem>
              ))}

            </Select>

          </FormControl>

          <FormControl fullWidth>

            <InputLabel>Descripción</InputLabel>

            <Select
              name="descripcion"
              value={formPrecio.descripcion}
              label="Descripción"
              onChange={handlePrecioChange}
            >

              {(categorias.find(c => c.nombre === formPrecio.categoria)?.items || []).map(desc => (

                <MenuItem key={desc} value={desc}>
                  {desc}
                </MenuItem>

              ))}

            </Select>

          </FormControl>

          <TextField
            label="Costo Unitario"
            name="costoUnitario"
            type="number"
            value={formPrecio.costoUnitario}
            onChange={handlePrecioChange}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmitPrecio}
          >
            Guardar
          </Button>

        </DialogActions>

      </Dialog>

    </Box>

  );

}