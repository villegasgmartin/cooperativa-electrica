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
        <Typography variant="h4" gutterBottom sx={{fontFamily: "InterTight"}}>
            Usuarios
        </Typography>

        {/* Pestañas */}
        <Tabs value={tabIndex} onChange={handleChange}>
            <Tab label="Crear Usuario" sx={{textTransform: "none", fontFamily: "interTight", fontSize: "17px"}} />
            <Tab label="Listado de Usuarios" sx={{textTransform: "none", fontFamily: "interTight", fontSize: "17px"}}/>
        </Tabs>

        {/* Contenido de las pestañas */}
        <Box sx={{ marginTop: 2 }}>
            {tabIndex === 0 && <UserCreate/>} 
            {tabIndex === 1 && <UserTable />} 
        </Box>
        </Box>
    );
}
