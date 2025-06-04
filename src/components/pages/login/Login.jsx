// Importaciones:
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
    Paper,
    Snackbar,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Helmet } from "react-helmet";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login, forgotPassword } from '../../../../redux/actions/authActions';
import "../login/Login.css";

// JSX:
//Función Login:
export default function Login() {
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        correo: '',
        password: ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (input.correo.trim() === '') {
            setSnackbarMessage('Por favor ingrese su email');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        } else if (!emailRegex.test(input.correo)) {
            setSnackbarMessage('Email no válido');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        } else if (input.password.trim() === '') {
            setSnackbarMessage('Ingrese una contraseña');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            await dispatch(login(input));
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleForgotPassword = async () => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (input.correo.trim() === '') {
            setSnackbarMessage('Por favor ingrese su email para recuperar la contraseña');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        } else if (!emailRegex.test(input.correo)) {
            setSnackbarMessage('Email no válido');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            await dispatch(forgotPassword(input.correo));
            setSnackbarMessage('Se envió un enlace para restablecer tu contraseña');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(error.message || 'Error al enviar el correo. Verifica el email.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
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
                        Ingresa a tu cuenta
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{ style: { color: 'white' } }}
                        sx={{
                            '& label.Mui-focused': {
                                color: '#2eed8d',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#2eed8d',
                                },
                            },
                        }}
                        name="correo"
                        onChange={handleChange}
                        value={input.correo}
                    />

                    <TextField
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        InputProps={{
                            style: { color: 'white' },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff sx={{ color: '#ccc' }} /> : <Visibility sx={{ color: '#ccc' }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& label.Mui-focused': {
                                color: '#2eed8d',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'white',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'white',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#2eed8d',
                                },
                            },
                        }}
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                    />

                    <Box textAlign="right">
                        <Link
                            href="#"
                            underline="hover"
                            color="#30E691"
                            variant="body2"
                            onClick={handleForgotPassword}
                        >
                            Olvidé mi contraseña
                        </Link>
                    </Box>

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
                            '&:hover': {
                                backgroundColor: '#2ed483'
                            }
                        }}
                        onClick={handleSubmit}
                    >
                        Ingresar
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
