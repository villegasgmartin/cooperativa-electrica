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
  TablePagination,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchreportes } from "../../../../../../redux/actions/userActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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

  // ---- DETALLE EXPANDIDO ----
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (id) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
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

// ---- RENDER DETALLE ----
const renderDetalle = (detalle) => {
    if (!detalle) return <Typography color="text.secondary">Sin detalle</Typography>;

    let datos = {};

    // 1. LIMPIEZA Y PARSEO MANUAL (Ya que no es JSON válido)
    if (typeof detalle === "string") {
      try {
        // Quitamos saltos de línea y espacios extras
        let cleanStr = detalle.replace(/\n/g, '').trim();
        
        // Eliminamos constructores específicos de MongoDB que rompen el parseo
        // Esto quita "new ObjectId('...')" y deja solo el ID o lo ignora
        cleanStr = cleanStr.replace(/new ObjectId\(['"](.+?)['"]\)/g, '"$1"');
        
        // Intentamos una conversión manual línea por línea si JSON.parse falla
        // Buscamos patrones tipo clave: 'valor' o clave: valor
        const regex = /([a-zA-Z0-9_]+):\s*('[^']*'|"[^"]*"|[^,}]+)/g;
        let match;
        while ((match = regex.exec(cleanStr)) !== null) {
          let key = match[1];
          let value = match[2].replace(/['"]/g, '').trim(); // Quitamos comillas
          datos[key] = value;
        }
      } catch (e) {
        return <Typography sx={{ fontSize: 14 }}>{detalle}</Typography>;
      }
    } else {
      datos = detalle;
    }

    // 2. FILTRADO DE CLAVES
    const camposIgnorar = ["_id", "__v", "esTV", "estadoBorrado", "terceriazado", "estado"];
    const entries = Object.entries(datos).filter(([key]) => !camposIgnorar.includes(key));

    if (entries.length === 0) return <Typography sx={{ fontSize: 14 }}>{detalle}</Typography>;

    // 3. RENDERIZADO ESTILO "FICHA"
    return (
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, 
        gap: 2, 
        bgcolor: "#fff", 
        p: 2, 
        borderRadius: 1,
        border: "1px solid #e0e0e0" 
      }}>
        {entries.map(([key, value]) => {
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, str => str.toUpperCase());

          // Formatear el valor si es booleano o fecha
          let valorFinal = value;
          if (value === "false") valorFinal = "No";
          if (value === "true") valorFinal = "Sí";
          if (key.toLowerCase().includes("fecha") && typeof value === "string") {
            const d = new Date(value);
            if (!isNaN(d.getTime())) valorFinal = d.toLocaleString();
          }

          return (
            <Box key={key}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "text.secondary", display: "block" }}>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {valorFinal}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

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
            <TableCell />
            <TableCell>Responsable</TableCell>
            <TableCell>Tarea</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reportesPaginados.map((r) => (
            <React.Fragment key={r._id}>
              <TableRow>
                <TableCell>
                  <IconButton size="small" onClick={() => toggleRow(r._id)}>
                    {expandedRows[r._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{r.responsable}</TableCell>
                <TableCell>{r.tarea}</TableCell>
                <TableCell>{r.accion}</TableCell>
                <TableCell>{new Date(r.fecha).toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{ p: 0, border: 0 }}>
                  <Collapse in={expandedRows[r._id]} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
                      {renderDetalle(r.detalle)}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}

          {reportesPaginados.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
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