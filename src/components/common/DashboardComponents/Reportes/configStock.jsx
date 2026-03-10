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
  getComprasSugeridas
} from "../../../../../redux/actions/stockAction";

export default function ConfigInventario() {

  const dispatch = useDispatch();

  const { 
  config,
  compras,
  totalItems,
  costoTotalCompra
} = useSelector(state => state.configStock);

  const [porcentajes, setPorcentajes] = useState({
    porcentajeStockMinimo: 0,
    porcentajeConsumoMensual: 0
  });

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formPrecio, setFormPrecio] = useState({
    id: "",
    categoria: "",
    descripcion: "",
    costoUnitario: 0
  });



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
    text: "Los porcentajes se guardaron correctamente",
    timer: 1600,
    showConfirmButton: false
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
      text: "El precio se actualizó correctamente",
      timer: 1800,
      showConfirmButton: false
    });

  } else {

    await dispatch(addPrecioItem(formPrecio));

    Swal.fire({
      icon: "success",
      title: "Precio agregado",
      text: "El precio fue creado correctamente",
      timer: 1800,
      showConfirmButton: false
    });

  }

  handleClose();
};

 const handleDeletePrecio = (id) => {

  Swal.fire({
    title: "Eliminar precio?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {

    if (result.isConfirmed) {

      await dispatch(deletePrecioItem(id));

      Swal.fire({
        icon: "success",
        title: "Precio eliminado",
        timer: 1600,
        showConfirmButton: false
      });

    }

  });

};

  return (
    <Box sx={{ width: "95%", margin: "auto", mt: 3 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        Configuración de Inventario
      </Typography>

      {/* PORCENTAJES */}

      <Paper sx={{ p: 3, mb: 4 }}>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Configuración de métricas
        </Typography>

        <Box sx={{ display: "flex", gap: 3 }}>

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

          <Button
            variant="contained"
            onClick={handleGuardarPorcentajes}
          >
            Guardar
          </Button>

        </Box>

      </Paper>

      {/* COMPRAS SUGERIDAS */}

<Paper sx={{ p: 3, mb: 4 }}>

  <Typography variant="h6" sx={{ mb: 2 }}>
    Compras sugeridas
  </Typography>

  <Box sx={{ display: "flex", gap: 4, mb: 2 }}>

    <Typography>
      <strong>Items a comprar:</strong> {totalItems || 0}
    </Typography>

    <Typography>
      <strong>Costo estimado:</strong> ${costoTotalCompra || 0}
    </Typography>

  </Box>

  <Box sx={{ overflowX: "auto" }}>

    <Table sx={{ minWidth: 900 }}>

      <TableHead>
        <TableRow>
          <TableCell>Categoria</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell align="center">Deposito</TableCell>
          <TableCell align="center">Stock Actual</TableCell>
          <TableCell align="center">Necesidad Proyectada</TableCell>
          <TableCell align="center">Cantidad Comprar</TableCell>
          <TableCell align="center">Costo Unitario</TableCell>
          <TableCell align="center">Costo Total</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>

        {compras?.map((item, index) => (

          <TableRow key={index}>

            <TableCell align="center" sx={{ color: item.cantidadComprar > 50 ? "red" : "inherit", fontWeight: 600 }}>{item.categoria}</TableCell>

            <TableCell>{item.descripcion}</TableCell>

            <TableCell align="center">
              {item.deposito}
            </TableCell>

            <TableCell align="center">
              {item.stockActual}
            </TableCell>

            <TableCell align="center">
              {item.necesidadProyectada}
            </TableCell>

            <TableCell align="center">
              {item.cantidadComprar}
            </TableCell>

            <TableCell align="center">
              ${item.costoUnitario}
            </TableCell>

            <TableCell align="center">
              ${item.costoTotal}
            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>

  </Box>

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

      {/* DIALOG */}

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
                          {Object.keys(categorias).map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
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
                      {(categorias[formPrecio?.categoria] || []).map((desc) => (
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