// Importaciones:
import React from 'react';
import { useState } from 'react';
import { login } from '../../../../redux/actions';
import { useDispatch } from 'react-redux';
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

    const dispatch = useDispatch()
    const [input, setInput] = useState({
            correo: '',
            password: ''
          
    });
    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = () => {
		// Regular expression para validación de el email
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		// Chequeo de errores

		if (input.correo.trim() === '') {
			alert('Por favor ingrese su email');
			return;
		} else if (!emailRegex.test(input.correo)) {
			alert('Email no válido');
			return;
		} else if (input.password.trim() === '') {
			alert('Ingrese una contraseña');
			return;
		}

		
			dispatch(login(input));	
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
                name="correo"
				onChange={handleChange}
                value={input.correo}
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
        </>
    );
}
