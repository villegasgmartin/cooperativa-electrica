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
    IconButton,
    Stack,
    useTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

//JSX:
export default function Registros() {
    const [registros, setRegistros] = React.useState([]);
    const [openEliminar, setOpenEliminar] = React.useState(false); // Modal eliminar
    const [registroEliminar, setRegistroEliminar] = React.useState(null); // Registro a eliminar
    const [openEditar, setOpenEditar] = React.useState(false); // Modal editar
    const [descripcionEditada, setDescripcionEditada] = React.useState(''); // Descripción editada
    const [registroEditar, setRegistroEditar] = React.useState(null); // Registro a editar
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    // Función para cargar los registros desde la API
    const cargarRegistros = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'x-token': token,
            };

            const response = await axios.get('http://localhost:8000/api/tecnica/tecnicas', { headers });
            setRegistros(response.data.tecnica);
        } catch (error) {
            console.error('Error al cargar los registros:', error);
        }
    };

    // Cargar los registros al montar el componente
    React.useEffect(() => {
        cargarRegistros();
    }, []);

    // Función para eliminar un registro
    const handleEliminar = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'x-token': token,
            };

            const response = await axios.delete(
                `http://localhost:8000/api/tecnica/borrar-tecnica?id=${registroEliminar._id}`,
                { headers }
            );

            if (response.status === 200) {
                setRegistros(registros.filter((registro) => registro._id !== registroEliminar._id));
                setOpenEliminar(false);
            }
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    // Función para editar un registro
    const handleEditar = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'x-token': token,
            };

            const response = await axios.put(
                `http://localhost:8000/api/tecnica/actualizar-tecnica?id=${registroEditar._id}`,
                { descripcion: descripcionEditada },
                { headers }
            );

            if (response.status === 200) {
                setRegistros(
                    registros.map((registro) =>
                        registro._id === registroEditar._id ? { ...registro, descripcion: descripcionEditada } : registro
                    )
                );
                setOpenEditar(false);
            }
        } catch (error) {
            console.error('Error al editar el registro:', error);
        }
    };

    // Función para formatear la fecha
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

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
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    color: isLight ? '#fff' : 'primary.main',
                                    py: 2,
                                }}
                            >
                                Gestión
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registros.map((registro) => (
                            <TableRow key={registro._id}>
                                <TableCell>{formatFecha(registro.fecha)}</TableCell>
                                <TableCell>{registro.descripcion}</TableCell>
                                <TableCell>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            color="primary"
                                            aria-label="editar"
                                            onClick={() => {
                                                setRegistroEditar(registro);
                                                setDescripcionEditada(registro.descripcion); 
                                                setOpenEditar(true); 
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            aria-label="eliminar"
                                            onClick={() => {
                                                setRegistroEliminar(registro);
                                                setOpenEliminar(true); 
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal de confirmación para eliminar */}
            <Dialog open={openEliminar} onClose={() => setOpenEliminar(false)}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <Typography>¿Estás seguro de que deseas eliminar este registro?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEliminar(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleEliminar} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de edición */}
            <Dialog open={openEditar} onClose={() => setOpenEditar(false)}>
                <DialogTitle>Editar Descripción</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="descripcion"
                        label="Descripción"
                        type="text"
                        fullWidth
                        value={descripcionEditada}
                        onChange={(e) => setDescripcionEditada(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={() => setOpenEditar(false)} color="primary"
                        sx={{textTransform: "capitalize"}}>
                        Cancelar
                    </Button>
                    <Button onClick={handleEditar} color="primary"
                    sx={{textTransform: "capitalize"}}>
                        Guardar cambios
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
