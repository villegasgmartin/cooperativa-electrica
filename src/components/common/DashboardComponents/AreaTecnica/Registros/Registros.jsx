//Importaciones:
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
    useTheme,
} from '@mui/material';

//JSX:
// Datos de ejemplo (registros ficticios)
const registros = [
    {
        fecha: '2025-04-01',
        motivo: 'Instalación de servicio de Internet',
    },
    {
        fecha: '2025-04-02',
        motivo: 'Cambio de router por falla técnica',
    },
    {
        fecha: '2025-04-03',
        motivo: 'Reubicación del módem en el domicilio',
    },
    {
        fecha: '2025-04-04',
        motivo: 'Actualización de firmware del equipo',
    },
    {
        fecha: '2025-04-05',
        motivo: 'Revisión de conectividad por baja velocidad',
    },
];

export default function Registros() {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
            Registros de Visitas Técnicas
        </Typography>

        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow sx={{ backgroundColor: isLight ? '#30E691' : 'inherit' }}>
                <TableCell
                    sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: isLight ? '#fff' : 'primary.main',
                    py: 2,
                    }}
                >
                    Fecha
                </TableCell>
                <TableCell
                    sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: isLight ? '#fff' : 'primary.main',
                    py: 2,
                    }}
                >
                    Motivo
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {registros.map((registro, index) => (
                <TableRow key={index}>
                    <TableCell>{registro.fecha}</TableCell>
                    <TableCell>{registro.motivo}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}
