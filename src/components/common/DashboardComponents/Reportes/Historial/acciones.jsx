import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  TablePagination
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchreportes } from "../../../../../../redux/actions/userActions";

const Acciones = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchreportes());
  }, [dispatch]);

  const reportes = useSelector(state => state.user.reporte);

  // ---- STATES FILTROS ----
  const [busqueda, setBusqueda] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  // ---- PAGINADO ----
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // ---- LIMPIAR FILTROS ----
  const limpiarFiltros = () => {
    setBusqueda("");
    setDesde("");
    setHasta("");
  };

  // ---- FILTRO INTELIGENTE ----
  const reportesFiltrados = useMemo(() => {
    if (!reportes) return [];

    return reportes.filter(r => {
      const texto = busqueda.toLowerCase();

      const coincideTexto =
        r.responsable?.toLowerCase().includes(texto) ||
        r.tarea?.toLowerCase().includes(texto) ||
        r.accion?.toLowerCase().includes(texto);

      const fechaReporte = new Date(r.fecha);

      const coincideDesde = desde
        ? fechaReporte >= new Date(desde + "T00:00:00")
        : true;

      const coincideHasta = hasta
        ? fechaReporte <= new Date(hasta + "T23:59:59")
        : true;

      return coincideTexto && coincideDesde && coincideHasta;
    });
  }, [reportes, busqueda, desde, hasta]);

  // ---- RESET PAGINA SI CAMBIA FILTRO ----
  useEffect(() => {
    setPage(0);
  }, [busqueda, desde, hasta]);

  // ---- SLICE PAGINADO ----
  const reportesPaginados = reportesFiltrados.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Typography sx={{ p: 2, fontFamily: "interTight" }} variant="h6">
        Historial de acciones
      </Typography>

      {/* ---- FILTROS ---- */}
      <Box sx={{ display: "flex", gap: 2, p: 2, flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          label="Buscar..."
          variant="outlined"
          size="small"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <TextField
          label="Desde"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
        />

        <TextField
          label="Hasta"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
        />

        <Button
          variant="outlined"
         
          size="small"
          onClick={limpiarFiltros}
        >
          Limpiar
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Responsable</TableCell>
            <TableCell>Tarea</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reportesPaginados.map((a) => (
            <TableRow key={a._id}>
              <TableCell>{a.responsable}</TableCell>
              <TableCell>{a.tarea}</TableCell>
              <TableCell>{a.accion}</TableCell>
              <TableCell>
                {new Date(a.fecha).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}

          {reportesPaginados.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No hay acciones registradas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ---- PAGINADO ---- */}
      <TablePagination
        component="div"
        count={reportesFiltrados.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[20]}
        labelRowsPerPage="Filas por página"
      />
    </TableContainer>
  );
};

export default Acciones;
