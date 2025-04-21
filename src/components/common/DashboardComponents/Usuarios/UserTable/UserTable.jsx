//Importaciones:
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//JSX:
export default function UserTable() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/usuarios', {
      headers: { 'x-token': localStorage.getItem('token') }
    })
    .then(response => {
      console.log('Datos obtenidos de la API:', response.data);
      setUsers(response.data.usuarios || []);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error al obtener los usuarios:', error);
      setLoading(false);
    });
  }, []);

  const traducirRol = (rol) => {
    switch (rol) {
      case 'USER_ADMIN':
        return 'Administrador';
      case 'USER_EMPLOYE':
        return 'Usuario';
      default:
        return rol;
    }
  };

  const handleDeleteConfirmation = (userId) => {
    setUserToDelete(userId);
    setOpenModal(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        // Enviar solicitud para cambiar el estado del usuario a false
        await axios.delete(`http://localhost:8000/api?id=${userToDelete}`, {
          headers: { 'x-token': localStorage.getItem('token') }
        });
        
        // Actualizar la lista de usuarios filtrando al usuario que se desactivó
        setUsers(users.filter(user => user.uid !== userToDelete));
        setOpenModal(false);
      } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto', marginTop: 3,  marginBottom: 6  }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
        Listado de usuarios
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Cargando lista de usuarios...
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                {['Nombre completo', 'Teléfono', 'Correo Electrónico', 'Función', 'Gestión'].map((title, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      color: isLight ? '#fff' : 'primary.main',
                      py: 2,
                    }}
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.nombre}</TableCell>
                    <TableCell>{user.telefono || 'No disponible'}</TableCell>
                    <TableCell>{user.correo}</TableCell>
                    <TableCell>{traducirRol(user.rol)}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton color="primary" onClick={() => handleEdit(user.uid)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteConfirmation(user.uid)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No hay usuarios disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal de confirmación */}
      <Dialog open={openModal} onClose={handleCancelDelete}>
        <DialogTitle>Confirmación de desactivación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro de que deseas dar de baja este usuario?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
