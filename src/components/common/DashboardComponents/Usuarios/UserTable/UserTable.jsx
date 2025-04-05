// src/components/UserTable/UserTable.jsx

import * as React from 'react';
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
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Datos de ejemplo
const employees = [
  {
    fullName: 'Juan Pérez',
    phone: '123-456-7890',
    email: 'juan.perez@example.com',
    role: 'Administrador',
  },
  {
    fullName: 'María Gómez',
    phone: '098-765-4321',
    email: 'maria.gomez@example.com',
    role: 'Soporte técnico',
  },
  {
    fullName: 'Luis Rodríguez',
    phone: '456-789-0123',
    email: 'luis.rodriguez@example.com',
    role: 'Comercial',
  },
  {
    fullName: 'Ana Fernández',
    phone: '321-654-9870',
    email: 'ana.fernandez@example.com',
    role: 'Gerente',
  },
  {
    fullName: 'Carlos Méndez',
    phone: '789-012-3456',
    email: 'carlos.mendez@example.com',
    role: 'Técnico',
  },
];

export default function UserTable() {
  return (
    <Box sx={{ width: '90%', margin: 'auto', marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>
        Listado de empleados
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre completo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Función</TableCell>
              <TableCell>Gestión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.fullName}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small" sx={{ mr: 1 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
