//Importaciones:
import * as React from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import UserCreate from './UserCreate/UserCreate';  
import UserTable from './UserTable/UserTable'; 

//JSX:
export default function Usuarios() {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: 3 }}>
        <Typography variant="h4" gutterBottom>
            Usuarios
        </Typography>

        {/* Pestañas */}
        <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="Crear Usuario" />
            <Tab label="Listado de Usuarios" />
        </Tabs>

        {/* Contenido de las pestañas */}
        <Box sx={{ marginTop: 2 }}>
            {tabIndex === 0 && <UserCreate/>}   {/* Mostrar formulario de creación */}
            {tabIndex === 1 && <UserTable />}    {/* Mostrar tabla de usuarios */}
        </Box>
        </Box>
    );
}
