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
    Button,
    useTheme,
} from '@mui/material';


//JSX:
export default function UserInactive() {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

  // Obtener usuarios inactivos (estado: false)
    useEffect(() => {
    axios
    .get('https://cooperativaback.up.railway.app/api/usuarios-suspendidos', {
        headers: { 'x-token': localStorage.getItem('token') },
    })
    .then((response) => {
        const usuariosInactivos = response.data.usuarios?.filter(user => user.estado === false) || [];
        setUsers(usuariosInactivos);
        setLoading(false);
    })
    .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
        setLoading(false);
    });
}, []);

// Traducción de roles
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

// Activar usuario (estado: true)
const handleActivarUsuario = async (userId) => {
    try {
    const payload = { estado: true };

    await axios.put(
        `https://cooperativaback.up.railway.app/api?id=${userId}`,
        payload,
        {
        headers: { 'x-token': localStorage.getItem('token') },
        }
    );

    // Eliminar usuario activado de la lista local
    setUsers(prev => prev.filter(user => user.uid !== userId));
    } catch (error) {
    console.error('Error al activar el usuario:', error);
    }
};

return (
    <Box sx={{ width: '90%', margin: 'auto', marginTop: 3, marginBottom: 6 }}>
    <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
        Usuarios inactivos
    </Typography>

    {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Cargando usuarios inactivos...
        </Typography>
        </Box>
    ) : (
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                {['Nombre completo', 'Teléfono', 'Correo Electrónico', 'Función', 'Dar de Alta'].map((title, idx) => (
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
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleActivarUsuario(user.uid)}
                    >
                        Activar
                    </Button>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={5} align="center">
                    No hay usuarios inactivos
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </TableContainer>
    )}
    </Box>
);
}