import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Snackbar,
    Alert,
    Typography,
    Paper,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import "../newPassword/NewPassword.css";

export default function NewPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSubmit = async () => {
        if (!newPassword.trim() || !confirmPassword.trim()) {
            setSnackbarMessage('Por favor completa ambos campos');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        if (newPassword !== confirmPassword) {
            setSnackbarMessage('Las contraseñas no coinciden');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            await axios.put(`https://panel-cooperativa-back-production.up.railway.app/api/auth/actualizar-clave?token=${token}`, {
                password: newPassword
            });

            setSnackbarMessage('Contraseña actualizada con éxito');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            setSnackbarMessage('Hubo un error al actualizar la contraseña');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Restablecer contraseña</title>
            </Helmet>
            <Box
                className="login-page"
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: "50px 60px",
                        width: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        backgroundColor: '#161616',
                        borderRadius: '50px',
                        '@media (max-width:600px)': {
                            width: '80%',
                            '@media (max-width: 450px)': {
                                width: '90%',
                            },
                            padding: '40px 30px',
                        },
                    }}
                >
                    <Typography
                        variant="h5"
                        align="center"
                        fontWeight="bold"
                        color="white"
                        sx={{
                            fontSize: {
                                xs: '1.2rem',
                                sm: '1.4rem',
                                md: '1.6rem',
                            }
                        }}
                    >
                        Nueva contraseña
                    </Typography>

                    <TextField
                        label="Nueva contraseña"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{
                            style: { color: 'white' },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff sx={{ color: '#ccc' }}/> : <Visibility sx={{ color: '#ccc' }}/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& label.Mui-focused': { color: '#2eed8d' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: '#2eed8d' },
                            },
                        }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextField
                        label="Confirmar nueva contraseña"
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{
                            style: { color: 'white' },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                        {showConfirmPassword ? <VisibilityOff  sx={{ color: '#ccc' }}/> : <Visibility sx={{ color: '#ccc' }}/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& label.Mui-focused': { color: '#2eed8d' },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: '#2eed8d' },
                            },
                        }}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#12824c',
                            color: 'white',
                            textTransform: 'capitalize',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            '&:hover': { backgroundColor: '#2ed483' }
                        }}
                        onClick={handleSubmit}
                    >
                        Restablecer contraseña
                    </Button>
                </Paper>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
