//Importaciones:
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControlLabel, Checkbox, Link, Typography } from '@mui/material';
import "../formulario/Form.css";
import { Fade } from 'react-awesome-reveal';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoNave from "../../../assets/images/logos/logo-nave-blanco.png";
import { Helmet } from "react-helmet";
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import BasicDatePicker from '../../common/FormComponents/DatePicker/DatePicker';

//JSX:
const Form = () => {
    const [planInternet, setPlanInternet] = useState('');
    const [planTV, setPlanTV] = useState('');

    return (
        <>
            {/*Header */}
            <Helmet>
                <title>NAVE Internet</title>
            </Helmet>
            <header className="header-nave-container">
                <div className="header-contactos-container">
                    <div className="header-contactos">
                        <LocationOnTwoToneIcon sx={{ color: "white" }} />
                        <h4 className="header-contactosText">Alberti 3600, Mar del Plata</h4>
                    </div>
                    <div className="header-contactos">
                        <LocationOnTwoToneIcon sx={{ color: "white" }} />
                        <h4 className="homePortada-contactosText">20 de Septiembre 2638, Mar del Plata</h4>
                    </div>
                    <div className="header-contactos" id="homePortada-tel">
                        <LocalPhoneTwoToneIcon sx={{ color: "white" }} />
                        <h4 className="header-contactosText">0800-333-0357 / (0223) 495-1411</h4>
                    </div>
                </div>
                <div className="navbarPages-container">
                    <NavBar backgroundColorMovile="#201c1c" backgroundColor="#201c1c" />
                </div>
                <Fade triggerOnce={true} duration={800} delay={300}>
                    <div className='header-nave'>
                        <div className='header-nave-logoContainer'><img src={LogoNave} alt="NAVE Internet" className='header-nave-logo' /></div>
                        <div className='header-nave-textContainer'>
                            <h1 className='header-nave-title'>Internet <span className='header-nave-resaltado'>Cooperativa</span></h1>
                            <p className='header-nave-text'>Descubre nuestras increíbles <span className='header-nave-resaltado'>opciones de Internet y televisión</span> diseñadas para satisfacer todas tus necesidades de entretenimiento y conectividad.</p>
                        </div>
                    </div>
                </Fade>
            </header>
            {/*Descripción*/}
            <section className='form-main-container'>
                <div className='form-text-container'>
                    <Fade triggerOnce={true} duration={800} delay={300}>
                        <p className='form-text01'>Dejanos tus datos y te contactaremos</p>
                        <p className='form-text02'>
                            Completa el siguiente formulario y uno de nuestros asesores te brindará toda la información sobre nuestros planes de Internet y TV. ¡Conéctate con el mejor servicio para tu hogar o empresa!
                        </p>
                    </Fade>
                </div>
                <div>
                    {/*Formulario*/}
                    <Fade triggerOnce={true} duration={800} delay={300}>
                        <form className='form-container'>
                            <TextField
                                label="Nombre y apellido"
                                variant="outlined"
                                fullWidth
                                id='name-input'
                                required
                                sx={{
                                    backgroundColor: "#edeaff", borderRadius: "25px",
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "25px",
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#8048ff',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#8048ff',
                                    }
                                }}
                            />
                            <TextField
                                label="DNI"
                                variant="outlined"
                                fullWidth
                                required
                                id='dni-input'
                                sx={{
                                    backgroundColor: "#edeaff", borderRadius: "25px",
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "25px",
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#8048ff',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#8048ff',
                                    }
                                }}
                            />
                            <TextField
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                required
                                id='telefono'
                                sx={{
                                    backgroundColor: "#edeaff", borderRadius: "25px",
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "25px",
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#8048ff',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#8048ff',
                                    }
                                }}
                            />
                            <TextField
                                label="Mail de contacto"
                                variant="outlined"
                                fullWidth
                                required
                                type="email"
                                id='email-input'
                                sx={{
                                    backgroundColor: "#edeaff", borderRadius: "25px",
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "25px",
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#8048ff',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#8048ff',
                                    }
                                }}
                            />
                            {/*Planes*/}
                            <Select
                                fullWidth
                                value={planInternet}
                                onChange={(e) => setPlanInternet(e.target.value)}
                                displayEmpty
                                sx={{
                                    backgroundColor: "#edeaff",
                                    borderRadius: "25px",
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "25px",
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#8048ff',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#8048ff',
                                    }
                                }}
                                inputProps={{ 'aria-label': 'Plan que solicita de Internet' }}
                            >
                                <MenuItem disabled value="">Plan que solicita de Internet</MenuItem>
                                <MenuItem value="100 megas">100 megas</MenuItem>
                                <MenuItem value="300 megas">300 megas</MenuItem>
                                <MenuItem value="500 megas">500 megas</MenuItem>
                                <MenuItem value="Ninguno">Ninguno</MenuItem>
                            </Select>
                            <Select
                                fullWidth
                                value={planTV}
                                onChange={(e) => setPlanTV(e.target.value)}
                                displayEmpty
                                sx={{
                                    backgroundColor: "#edeaff",
                                    borderRadius: "25px",
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: "25px",
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#8048ff',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#8048ff',
                                    }
                                }}
                                inputProps={{ 'aria-label': 'Plan que solicita de TV' }}
                            >
                                <MenuItem disabled value="">Plan que solicita de TV</MenuItem>
                                {planInternet === 'Ninguno' ? (
                                    <>
                                        <MenuItem value="TV full">TV full + Pack Fútbol + Max gratis</MenuItem>
                                        <MenuItem value="Ninguno">Ninguno</MenuItem>
                                    </>
                                ) : (
                                    <>
                                        <MenuItem value="Pack adicional">Pack TV adicional $5999</MenuItem>
                                        <MenuItem value="Ninguno">Ninguno</MenuItem>
                                    </>
                                )}
                            </Select>
                            {/*Calendario */}
                            <div className='form-calendar'>
                                <p className='form-calendar-text'>Elegí fecha y horario para coordinar la instalación del servicio.</p>
                                <BasicDatePicker />
                            </div>
                            {/*Bases y condiciones */}
                            <div className='form-check'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: '#3d116d',
                                                transform: 'scale(1.4)',
                                                '&.Mui-checked': {
                                                    color: '#8048ff',
                                                },
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{fontSize: "18px",}} >
                                            Estoy de acuerdo con los{' '}
                                            <Link
                                                href="#"
                                                target="_blank"
                                                rel="noopener"
                                                underline="hover"
                                                sx={{ color: '#3d116d', fontWeight: 'bold', fontSize: "18px" }}
                                            >
                                                Términos y condiciones
                                            </Link>
                                        </Typography>
                                    }
                                />
                            </div>
                            {/*Enviar formulario */}
                            <div className='form-button-container'>
                                <Button
                                    sx={{
                                        width: "100%",
                                        fontFamily: "interTight",
                                        fontSize: "25px",
                                        fontWeight: "bold",
                                        letterSpacing: "1px",
                                        borderRadius: "50px",
                                        boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.3)",
                                        textTransform: "none",
                                        color: "#161616",
                                        backgroundColor: "#30e691",
                                        marginBottom: "20px"
                                    }}
                                    variant="contained"
                                    size="large"
                                    type='submit'>
                                    Enviar
                                </Button>
                            </div>
                        </form>
                    </Fade>
                </div>
                <BotonWhatsapp />
            </section>
            <Footer />
        </>
    );
};

export default Form;
