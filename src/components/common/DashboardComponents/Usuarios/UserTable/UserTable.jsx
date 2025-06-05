
// Importaciones:
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../..&../../../../../../../redux/actions/userActions';
import { deleteUser } from '../..&../../../../../../../redux/actions/userActions';
import { updateUser } from '../..&../../../../../../../redux/actions/userActions';

//JSX:
export default function UserTable() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const dispatch = useDispatch();
  const { users, loadingUsers, errorUsers } = useSelector(state => state.user);

  // Estados para edición
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editData, setEditData] = useState({
    nombre: '',
    telefono: '',
    rol: '',
    usuarios: false,
    reservas: false,
    tecnica: false,
    blog: false,
  });

  //Función para obtener usuarios activos:
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


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

  const traducirRolApi = (rolTexto) => {
    return rolTexto === 'Administrador' ? 'USER_ADMIN' : 'USER_EMPLOYE';
  };

  const handleDeleteConfirmation = (userId) => {
    setUserToDelete(userId);
    setOpenModal(true);
  };

  //Función para eliminar usuarios:
 const handleDeleteUser = () => {
  if (userToDelete) {
    dispatch(deleteUser(userToDelete));
    dispatch(fetchUsers()); // recarga usuarios visibles
    setOpenModal(false);
  }
};


  const handleCancelDelete = () => {
    setOpenModal(false);
  };

  const handleEdit = (userId) => {
    const selectedUser = users.find(u => u.uid === userId);
    if (selectedUser) {
      setUserToEdit(userId);
      setEditData({
        nombre: selectedUser.nombre,
        telefono: selectedUser.telefono,
        rol: selectedUser.rol === 'USER_ADMIN' ? 'Administrador' : 'Usuario',
        usuarios: selectedUser.usuarios,
        reservas: selectedUser.reservas,
        tecnica: selectedUser.tecnica,
        blog: selectedUser.blog,
      });
      setOpenEditModal(true);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

//Función para editar usuarios:
  const handleSaveEdit = () => {
    dispatch(updateUser(userToEdit, editData));
    setOpenEditModal(false);
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto', marginTop: 3, marginBottom: 6 }}>
      <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
        Listado de usuarios
      </Typography>

      {loadingUsers? (
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

      {/* Modal de edición */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="Nombre completo"
            value={editData.nombre}
            onChange={(e) => handleEditChange('nombre', e.target.value)}
            fullWidth
          />
          <TextField
            label="Teléfono"
            value={editData.telefono}
            onChange={(e) => handleEditChange('telefono', e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Rol</InputLabel>
            <Select
              value={editData.rol}
              label="Rol"
              onChange={(e) => handleEditChange('rol', e.target.value)}
            >
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Usuario">Usuario</MenuItem>
            </Select>
          </FormControl>

          {/* Mostrar switches sólo si el rol es "Usuario" */}
          {editData.rol === 'Usuario' && (
            <>
              <FormControlLabel
                control={<Switch checked={editData.usuarios} onChange={(e) => handleEditChange('usuarios', e.target.checked)} />}
                label="Acceso a Usuarios"
              />
              <FormControlLabel
                control={<Switch checked={editData.reservas} onChange={(e) => handleEditChange('reservas', e.target.checked)} />}
                label="Acceso a Reservas"
              />
              <FormControlLabel
                control={<Switch checked={editData.tecnica} onChange={(e) => handleEditChange('tecnica', e.target.checked)} />}
                label="Acceso a Área Técnica"
              />
              <FormControlLabel
                control={<Switch checked={editData.blog} onChange={(e) => handleEditChange('blog', e.target.checked)} />}
                label="Acceso a Blog"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" sx={{ backgroundColor: '#12824c', color: 'white' }}>
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
