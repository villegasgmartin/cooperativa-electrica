//Importaciones:
import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

//JSX:
export default function DashboardHome() {
    return (
        <Box
        sx={{
            width: '90%',
            margin: 'auto',
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }}
        >
        <DashboardIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />

        <Typography variant="h4" gutterBottom>
            Bienvenido/a al panel de administración
        </Typography>

        <Typography variant="body1" sx={{ maxWidth: 600, mb: 3 }}>
            Desde aquí podés gestionar los distintos módulos del sistema como reservas, usuarios y publicaciones. 
            Utilizá el menú lateral para navegar por las secciones disponibles según tu perfil de acceso.
        </Typography>

        <Divider sx={{ width: '100%', my: 2 }} />

        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            }}
        >
            <EmojiPeopleIcon />
            <Typography variant="caption">
            Sistema de gestión - Versión 1.01
            </Typography>
        </Box>
        </Box>
    );
}