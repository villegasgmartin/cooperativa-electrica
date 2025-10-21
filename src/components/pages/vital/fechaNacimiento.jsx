import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from "@mui/material";

const FechaNacimiento = ({ formData, setFormData }) => {
  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    const nuevaFecha = { ...formData, [name]: value };

    // Si los 3 campos están completos, combina la fecha en formato DD-MM-YYYY
    if (nuevaFecha.dia && nuevaFecha.mes && nuevaFecha.anio) {
      nuevaFecha.fechaNacimiento = `${String(nuevaFecha.dia).padStart(2, "0")}-${String(
        nuevaFecha.mes
      ).padStart(2, "0")}-${nuevaFecha.anio}`;
    }

    setFormData(nuevaFecha);
  };

  const dias = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];
  const anios = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => 2025 - i);

  return (
    <Box>

  
    <Box>
        <Typography sx={{fontSize:"13px", fontWeight:"700" }}>
        Fecha de nacimiento (Haga clic sobre el día, mes y año para seleccionar)
      </Typography>
      </Box>
    <Box
      sx={{
        display: "flex",
        gap: {sm:2,xs:1},
        maxWidth: 490,
        // flexDirection:{sm:"row", xs:"column"},
      }}
    >
      
      {/* Día */}
      <FormControl required sx={{ minWidth:{sm:150, xs:100} , maxWidth: {sm:160, xs:"100%"}, flex: "1 1 auto" }}>
         
        <InputLabel>Día</InputLabel>
        <Select
          name="dia"
          value={formData.dia || ""}
          label="Día"
          onChange={handleSelectChange}
         
        >
          {dias.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Mes */}
      <FormControl required sx={{ minWidth:{sm:150, xs:100},  maxWidth: {sm:160, xs:"100%"}, flex: "1 1 auto" }}>
        <InputLabel>Mes</InputLabel>
        <Select
          name="mes"
          value={formData.mes || ""}
          label="Mes"
          onChange={handleSelectChange}
        >
          {meses.map((m, i) => (
            <MenuItem key={i + 1} value={i + 1}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Año */}
      <FormControl required sx={{ minWidth:{sm:150, xs:100},  maxWidth: {sm:160, xs:"100%"}, flex: "1 1 auto" }}>
        <InputLabel>Año</InputLabel>
        <Select
          name="anio"
          value={formData.anio || ""}
          label="Año"
          onChange={handleSelectChange}
        >
          {anios.map((a) => (
            <MenuItem key={a} value={a}>{a}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
      </Box>
  );
};

export default FechaNacimiento;
