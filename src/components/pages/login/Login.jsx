// Importaciones:
import React from 'react';
import {
    Box,
    Button,
    Link,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import { Helmet } from "react-helmet";
import "../login/Login.css";

// JSX:
export default function Login() {
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
                label="Usuario"
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
                />

            <TextField
            label="Contraseña"
            type="password"
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
            />


            <Box textAlign="right">
                <Link
                href="#"
                underline="hover"
                color="#30E691"
                variant="body2"
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
            >
                Ingresar
            </Button>
            </Paper>
        </Box>
        </>
    );
}
