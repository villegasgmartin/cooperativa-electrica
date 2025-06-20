// Importaciones:
import React, { useEffect } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import ReservasPendientes from '../Reservas/ReservasPendientes/ReservasPendientes';
import ReservasCompletadas from '../Reservas/ReservasCompletadas/ReservasCompletadas';
import ReservasEliminadas from './ReservasEliminadas/ReservasEliminadas';
import CrearReserva from './CrearReserva/CrearReserva';
import { fetchUserData } from '../../../../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

// Subcomponente TabPanel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`reservas-tabpanel-${index}`}
            aria-labelledby={`reservas-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 2 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function ReservasTabs() {
    const [value, setValue] = React.useState(0);
    const { nombre, reservasLeer} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

      //Función para obtener nombre de usuario:
    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);
    
    let tabIndex = 0;

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{fontFamily: "InterTight"}}>
            Reservas
        </Typography>


            <Tabs value={value} onChange={handleChange} aria-label="Tabs de reservas">
                <Tab label="Pendientes" sx={{ textTransform: "capitalize", fontFamily: "interTight", fontSize: "17px" }} />
                <Tab label="Completadas" sx={{ textTransform: "capitalize", fontFamily: "interTight", fontSize: "17px" }} />
                <Tab label="Eliminadas" sx={{ textTransform: "capitalize", fontFamily: "interTight", fontSize: "17px" }} />
                {!reservasLeer && (
                    <Tab label="Nueva" sx={{ textTransform: "capitalize", fontFamily: "interTight", fontSize: "17px" }} />
                )}
            </Tabs>

            <TabPanel value={value} index={0}>
                <ReservasPendientes />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReservasCompletadas />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ReservasEliminadas />
            </TabPanel>
            {!reservasLeer && (
                <TabPanel value={value} index={3}>
                    <CrearReserva />
                </TabPanel>
            )}

        </Box>
    );
}