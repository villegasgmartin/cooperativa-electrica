// Importaciones:
import React from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography
} from '@mui/material';
import BlogNuevo from './BlogNuevo/BlogNuevo';
import BlogGestor from './BlogGestor/BlogGestor';

//JSX:
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`blog-tabpanel-${index}`}
        aria-labelledby={`blog-tab-${index}`}
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

    export default function BlogEdit() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '90%', margin: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{fontFamily: "interTight"}}>
            Blogs
        </Typography>

        <Tabs value={value} onChange={handleChange} aria-label="tabs de blogs">
            <Tab label="Crear Publicación" sx={{textTransform: "capitalize", fontFamily: "interTight", fontSize: "17px"}}/>
            <Tab label="Gestión de Publicaciones" sx={{textTransform: "none", fontFamily: "interTight", fontSize: "17px"}}/>
        </Tabs>

        <TabPanel value={value} index={0}>
            <BlogNuevo />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <BlogGestor />
        </TabPanel>
        </Box>
    );
}
