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
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getHistorialRetiros } from "../../../../../../redux/actions/stockAction";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import DownloadIcon from '@mui/icons-material/Download';



const Retiros = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistorialRetiros());
  }, [dispatch]);

  const reportes = useSelector(state => state.stock.items);

  // ---- STATES FILTROS ----
  const [busqueda, setBusqueda] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [terciarizado, setTerciarizado] = useState("");
 const [deposito, setDeposito] = useState("");
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
    setTerciarizado("");
     setDeposito("");
  };

  // ---- FILTRO INTELIGENTE ----
  const historialFiltrado = useMemo(() => {
    if (!reportes) return [];

    return reportes.filter(r => {
      const texto = busqueda.toLowerCase();

      const coincideTexto =
        r.categoria?.toLowerCase().includes(texto) ||
        r.descripcion?.toLowerCase().includes(texto) ||
        r.quienRetira?.toLowerCase().includes(texto) ||
        r.deposito?.toLowerCase().includes(texto);

      const fechaReporte = new Date(r.fecha);

      const coincideDesde = desde
        ? fechaReporte >= new Date(desde + "T00:00:00")
        : true;

      const coincideHasta = hasta
        ? fechaReporte <= new Date(hasta + "T23:59:59")
        : true;

      const coincideterciarizado =
  terciarizado === "" ? true : r.terciarizado === terciarizado;

  const coincidedeposito =
  deposito === "" ? true : r.deposito === deposito;


      return coincideTexto && coincideDesde && coincideHasta && coincideterciarizado && coincidedeposito;
    });
  }, [reportes, busqueda, desde, hasta, terciarizado, deposito]);

  // ---- RESET PAGINA SI CAMBIA FILTRO ----
  useEffect(() => {
    setPage(0);
  }, [busqueda, desde, hasta]);

  // ---- SLICE PAGINADO ----
  const historialPaginados = historialFiltrado.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const exportarAExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Historial de Retiros');

  // Columnas
  worksheet.columns = [
    { header: 'Responsable', key: 'quienRetira', width: 25 },
    { header: 'Categoría', key: 'categoria', width: 20 },
    { header: 'Descripción', key: 'descripcion', width: 30 },
    { header: 'Deposito', key: 'deposito', width: 30 },
    { header: 'Acción / Cantidad', key: 'accion', width: 20 },
    { header: 'Terciarizado', key: 'terciarizado', width: 15 },
    { header: 'Fecha', key: 'fecha', width: 20 },
  ];

  // Estilo de encabezado
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF12824C' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Datos filtrados
  historialFiltrado.forEach((r) => {
    worksheet.addRow({
      quienRetira: r.quienRetira,
      categoria: r.categoria,
      descripcion: r.descripcion,
      deposito: r.deposito,
      accion: `${r.accion} / cant:${r.enStock || ''}`,
      terciarizado: r.terciarizado ? 'Si' : 'No',
      fecha: new Date(r.fecha).toLocaleString(),
    });
  });




  // Estilo de celdas
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // encabezado
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
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, `Historial Retiros ${dayjs().format('DD-MM-YYYY')}.xlsx`);
};

  const totales = useMemo(() => {
  let totalAgregadoNuevo = 0;   // "Agregado"
  let totalAgregadoStock = 0;   // "Agregado Stock"
  let totalRetirado = 0;        // "Retiro Stock"

  historialFiltrado.forEach(r => {
    const cantidad = Number(r.enStock) || 0;

    if (r.accion === "Agregado") {
      totalAgregadoNuevo += cantidad;
    }

    if (r.accion === "Agregado Stock") {
      totalAgregadoStock += cantidad;
    }

    if (r.accion === "Retiro Stock") {
      totalRetirado += cantidad;
    }
  });

  return {
    totalAgregadoNuevo,
    totalAgregadoStock,
    totalRetirado
  };
}, [historialFiltrado]);


  return (
    <TableContainer component={Paper}>
      <Typography sx={{ p: 2, fontFamily: "interTight" }} variant="h6">
        Historial de Retiros
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

    <Box>

  
       <InputLabel id="terciarizado-label">Terciarizado</InputLabel>
        <Select
          labelId="terciarizado-label"
          value={terciarizado}
          label="Terciarizado"
          size="small"
          onChange={(e) => setTerciarizado(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value={true}>Si</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
        </Box>

         <Box>
 <InputLabel id="terciarizado-label">Deposito</InputLabel>
        <Select
          labelId="deposito-label"
          value={deposito}
          label="Deposito"
          size="small"
          onChange={(e) => setDeposito(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value={"General"}>General</MenuItem>
          <MenuItem value={"Nave"}>Nave</MenuItem>
          <MenuItem value={"Oficina"}>Oficina</MenuItem>
        </Select>
         </Box>

       

        <Button
          variant="outlined"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={exportarAExcel}
        >
          Exportar Excel
        </Button>

                    

        <Button
          variant="outlined"
         
          size="small"
          onClick={limpiarFiltros}
        >
          Limpiar
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 4, px: 2, pb: 2, flexWrap: "wrap" }}>
        <Typography variant="subtitle2" color="green">
          Ingreso Item Nuevo: {totales.totalAgregadoNuevo}
        </Typography>

        <Typography variant="subtitle2" color="blue">
          Agregado a Stock: {totales.totalAgregadoStock}
        </Typography>

        <Typography variant="subtitle2" color="red">
          Retirado: {totales.totalRetirado}
        </Typography>
      </Box>


      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Responsable</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Deposito</TableCell>
            <TableCell>Acción</TableCell>
            <TableCell>Terciarizado</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {historialPaginados.map((a) => (

            <TableRow key={a._id}>
              <TableCell>{a.quienRetira}</TableCell>
              <TableCell>{a.categoria}</TableCell>
              <TableCell>{a.descripcion}</TableCell>
               <TableCell>{a.deposito}</TableCell>
              <TableCell>{a.accion}</TableCell>
              <TableCell>{a.terciarizado ? 'Si': 'No'}</TableCell>
              <TableCell>
                {new Date(a.fecha).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}

          {historialPaginados.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No hay historial
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ---- PAGINADO ---- */}
      <TablePagination
        component="div"
        count={historialPaginados.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[20]}
        labelRowsPerPage="Filas por página"
      />
    </TableContainer>
  );
};

export default Retiros;
