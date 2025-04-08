//Importaciones:
import * as React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button, Typography } from '@mui/material';

//JSX:
export default function UserCreate() {
  return (
    <Box sx={{ width: "90%", margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{fontFamily: "InterTight"}}>
        Crear Usuario
      </Typography>

      {/* Contenedor principal */}
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        
        {/* Sección de Inputs */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <TextField fullWidth label="Nombre y Apellido" margin="normal" />
          <TextField fullWidth label="Correo Electrónico" margin="normal" />
          <TextField fullWidth label="Contraseña" type="password" margin="normal" />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="perfil-label">Perfil</InputLabel>
            <Select
              labelId="perfil-label"
              label="Perfil"
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Visualizador</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Sección de Accesos (ahora en columna) */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography variant="h6" sx={{fontFamily: "InterTight"}}>Accesos</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 1 }}>
            <FormControlLabel control={<Switch />} label="Reservas" />
            <FormControlLabel control={<Switch />} label="Blog" />
            <FormControlLabel control={<Switch />} label="Crear Usuarios" />
          </Box>
        </Box>
      </Box>

      {/* Botón Crear Perfil */}
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button variant="contained" color="primary" size="large"
        sx={{
          textTransform: 'capitalize',
          borderRadius: '50px',        
          px: 4,
          fontFamily: "InterTight",
          fontSize: "17px",
        }}
        >
          Crear Perfil
        </Button>
      </Box>
    </Box>
  );
}
