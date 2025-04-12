// Importaciones:
import React from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography
} from '@mui/material';
import AgregarRegistro from './AgregarRegistro/AgregarRegistro';
import Registros from './Registros/Registros';

// JSX:
// Panel de pestañas:
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`area-tecnica-tabpanel-${index}`}
            aria-labelledby={`area-tecnica-tab-${index}`}
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

// Componente principal:
const AreaTecnica = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "interTight" }}>
                Área Técnica
            </Typography>

            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="tabs de área técnica"
            >
                <Tab
                    label="Registrar Visita"
                    sx={{
                        textTransform: "capitalize",
                        fontFamily: "interTight",
                        fontSize: "17px"
                    }}
                />
                <Tab
                    label="Historial de Visitas"
                    sx={{
                        textTransform: "capitalize",
                        fontFamily: "interTight",
                        fontSize: "17px"
                    }}
                />
            </Tabs>

            <TabPanel value={value} index={0}>
                <AgregarRegistro />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Registros />
            </TabPanel>
        </Box>
    );
};

export default AreaTecnica;
