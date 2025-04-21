import * as React from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

export default function UserCreate() {
  const [formData, setFormData] = React.useState({
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    rol: '',
    accesos: {
      reservas: false,
      blog: false,
      usuarios: false,
      areaTecnica: false,
    }
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitch = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      accesos: {
        ...prev.accesos,
        [name]: checked
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const token = localStorage.getItem('token');
    const headers = {
      'x-token': token
    };

    // Solo mandamos los accesos como parte del payload completo
    const payload = {
      nombre: formData.nombre,
      correo: formData.correo,
      password: formData.password,
      telefono: formData.telefono,  // Incluimos el teléfono en el payload
      rol: formData.rol,
      accesos: formData.accesos
    };

    try {
      await axios.post('http://localhost:8000/api/login', payload, { headers });
      setSuccess(true);
      setFormData({
        nombre: '',
        correo: '',
        password: '',
        telefono: '',  // Limpiamos el campo de teléfono
        rol: '',
        accesos: {
          reservas: false,
          blog: false,
          usuarios: false,
          areaTecnica: false,
        }
      });
    } catch (err) {
      setError('Error al crear el usuario. Verificá los datos o el token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: "InterTight" }}>
        Crear Usuario
      </Typography>

      {loading && <CircularProgress />}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Usuario creado con éxito.</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>

          {/* Datos del usuario */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <TextField
              fullWidth
              label="Nombre y Apellido"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Teléfono"
              name="telefono"  // Agregamos el nombre del campo para el teléfono
              value={formData.telefono}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="perfil-label">Perfil</InputLabel>
              <Select
                labelId="perfil-label"
                label="Perfil"
                name="rol"
                value={formData.rol}
                onChange={handleChange}
              >
                <MenuItem value="USER_ADMIN">Administrador</MenuItem>
                <MenuItem value="USER_EDITOR">Usuario</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Switches de accesos */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Typography variant="h6" sx={{ fontFamily: "InterTight" }}>Accesos</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 1 }}>
              <FormControlLabel
                control={<Switch checked={formData.accesos.reservas} onChange={handleSwitch} name="reservas" />}
                label="Reservas"
              />
              <FormControlLabel
                control={<Switch checked={formData.accesos.blog} onChange={handleSwitch} name="blog" />}
                label="Blog"
              />
              <FormControlLabel
                control={<Switch checked={formData.accesos.usuarios} onChange={handleSwitch} name="usuarios" />}
                label="Usuarios"
              />
              <FormControlLabel
                control={<Switch checked={formData.accesos.areaTecnica} onChange={handleSwitch} name="areaTecnica" />}
                label="Área Técnica"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={loading}
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
      </form>
    </Box>
  );
}
