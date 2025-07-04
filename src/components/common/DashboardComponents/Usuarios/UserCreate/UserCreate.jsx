// Importaciones:
import * as React from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../../../../redux/actions/userActions';

// JSX:
export default function UserCreate() {
  const [formData, setFormData] = React.useState({
    nombre: '',
    correo: '',
    password: '',
    telefono: '',
    rol: '',
    reservas: false,
    reservasLeer: false,
    blog: false,
    usuarios: false,
    tecnica: false
  });

  const { loading, success, error } = useSelector(state => state.user.createUser);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rol' && value === 'USER_ADMIN') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        reservas: true,
        reservasLeer: false,
        blog: true,
        usuarios: true,
        tecnica: true,
      }));
    } else if (name === 'rol' && value === 'USER_EMPLOYE') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        reservas: false,
        reservasLeer: false,
        blog: false,
        usuarios: false,
        tecnica: false,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSwitch = (e) => {
    const { name, checked } = e.target;

    setFormData(prev => {
      let updated = { ...prev, [name]: checked };

      if (name === 'reservas' && checked) {
        updated.reservasLeer = false;
      } else if (name === 'reservasLeer' && checked) {
        updated.reservas = false;
      }

      return updated;
    });
  };

  //Función para crear usuarios:
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      nombre: formData.nombre,
      correo: formData.correo,
      password: formData.password,
      telefono: formData.telefono,
      rol: formData.rol,
      reservas: formData.rol === 'USER_ADMIN' ? true : formData.reservas,
      reservasLeer: formData.rol === 'USER_ADMIN' ? false : formData.reservasLeer,
      blog: formData.rol === 'USER_ADMIN' ? true : formData.blog,
      usuarios: formData.rol === 'USER_ADMIN' ? true : formData.usuarios,
      tecnica: formData.rol === 'USER_ADMIN' ? true : formData.tecnica,
    };

    dispatch(createUser(payload));

    setFormData({
      nombre: '',
      correo: '',
      password: '',
      telefono: '',
      rol: '',
      reservas: false,
      reservasLeer: false,
      blog: false,
      usuarios: false,
      tecnica: false,
    });
  };

  return (
    <Box sx={{ width: "90%", margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: "InterTight" }}>
        Crear Usuario
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
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
              name="telefono"
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
                <MenuItem value="USER_EMPLOYE">Usuario</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Switches de accesos */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Typography variant="h6" sx={{ fontFamily: "InterTight", mb: 1 }}>
              Accesos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControlLabel
                control={<Switch checked={formData.reservas} onChange={handleSwitch} name="reservas" />}
                label="Reservas (admin)"
              />
              <FormControlLabel
                control={<Switch checked={formData.reservasLeer} onChange={handleSwitch} name="reservasLeer" />}
                label="Reservas (lectura)"
              />
              <FormControlLabel
                control={<Switch checked={formData.blog} onChange={handleSwitch} name="blog" />}
                label="Blog"
              />
              <FormControlLabel
                control={<Switch checked={formData.usuarios} onChange={handleSwitch} name="usuarios" />}
                label="Usuarios"
              />
              <FormControlLabel
                control={<Switch checked={formData.tecnica} onChange={handleSwitch} name="tecnica" />}
                label="Área Técnica"
              />
            </Box>
          </Box>

        </Box>

        <Box sx={{ textAlign: "center", marginTop: 4 }}>
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