//Importaciones:
import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControlLabel, Checkbox, Link, Typography,  Snackbar, Alert } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoNave from "../../../assets/images/logos/logo-nave-blanco.png";
import { Helmet } from "react-helmet";
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import BasicDatePicker from '../../common/FormComponents/DatePicker/DatePicker';
import axios from 'axios';
import "../formulario/Form.css"
// Google Maps
import { Autocomplete } from '@react-google-maps/api';

//JSX:
const Form = () => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [fechaInstalacion, setFechaInstalacion] = useState(null); 
    const [franjaHoraria, setFranjaHoraria] = useState('');
    const [planInternet, setPlanInternet] = useState('');
    const [planTV, setPlanTV] = useState('');
    const [direccion, setDireccion] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [tipoInmueble, setTipoInmueble] = useState({
        casa: false,
        edificio: false,
        ph: false,
    });
    const [formData, setFormData] = useState({
        name: '',
        dni: '',
        telefono: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);
    const [terminosAceptados, setTerminosAceptados] = useState(false);

    const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
    if (autocomplete !== null) {
        const place = autocomplete.getPlace();
        setDireccion(place.formatted_address || "");
    }
    };

    //Google Maps
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDnG7odirzcO_xm7R1EIxf1a7Dhi2OflDU&libraries=places";
        script.async = true;
        script.onload = () => setIsLoaded(true);
        document.head.appendChild(script);
    }, []);

    //CheckBox de Tipo de inmueble
    const handleCheckboxChange = (event) => {
        setTipoInmueble({
            ...tipoInmueble,
            [event.target.name]: event.target.checked,
        });
    };

    //Captura lo escrito
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //Enviamos los datos
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        //Validaciones
        let formErrors = {};
        if (!formData.name) formErrors.name = "Nombre es requerido";
        if (!formData.dni) formErrors.dni = "DNI es requerido";
        if (!formData.telefono) formErrors.telefono = "Teléfono es requerido";
        if (!formData.email) formErrors.email = "Correo es requerido";
        if (!fechaInstalacion) formErrors.fechaInstalacion = "Elegí una fecha";
        if (!franjaHoraria) formErrors.franjaHoraria = "Elegí un horario";
        if (!terminosAceptados) formErrors.terminosAceptados = "Debes aceptar los términos";

        setErrors(formErrors);
    
        if (Object.keys(formErrors).length === 0) {
            const isoFecha = new Date(fechaInstalacion).toISOString();
    
            const dataToSend = {
                DNI: formData.dni,
                Dpto: "", 
                Piso: "", 
                direccion,
                fecha: isoFecha,
                horario: franjaHoraria,
                internet: planInternet,
                nombre: formData.name,
                telefono: formData.telefono,
                tipo: Object.keys(tipoInmueble).find(key => tipoInmueble[key]),
            };
            //Si no hay errores, hacemos POST
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/reservas/crear-reserva',
                    dataToSend
                );

                // Limpiamos campos
                setFormData({ name: '', dni: '', telefono: '', email: '' });
                setDireccion('');
                setFechaInstalacion(null);
                setFranjaHoraria('');
                setPlanInternet('');
                setPlanTV('');
                setTipoInmueble({ casa: false, edificio: false, ph: false });
                setTerminosAceptados(false);

                // Mostrar mensaje de éxito
                setSuccessMessageOpen(true);
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
            }
        }
    };
    

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
                        <form className='form-container' onSubmit={handleSubmit}>
                            {/*Nombre y apellido*/}
                            <TextField
                                label="Nombre y apellido"
                                variant="outlined"
                                fullWidth
                                id='name-input'
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
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
                            {/*DNI*/}
                            <TextField
                                label="DNI"
                                variant="outlined"
                                fullWidth
                                required
                                name="dni"
                                value={formData.dni}
                                onChange={handleInputChange}
                                error={!!errors.dni}
                                helperText={errors.dni}
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
                            {/*Teléfono*/}
                            <TextField
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                required
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                error={!!errors.telefono}
                                helperText={errors.telefono}
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
                            {/*Dirección con Google Maps Autocompletado*/}
                            <div style={{ width: '100%' }}>
                                <Autocomplete
                                    onLoad={onLoad}
                                    onPlaceChanged={onPlaceChanged}
                                >
                                    <TextField
                                        label="Dirección"
                                        variant="outlined"
                                        fullWidth
                                        id="direccion"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
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
                                    />
                                </Autocomplete>
                            </div>
                            {/*Tipos de inmueble*/}
                            <div className="form-check" style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: 15 }}>
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
                                            name="casa"
                                            checked={tipoInmueble.casa}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={<Typography variant="body2" sx={{ fontSize: '18px' }}>Casa</Typography>}
                                />
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
                                            name="edificio"
                                            checked={tipoInmueble.edificio}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={<Typography variant="body2" sx={{ fontSize: '18px' }}>Edificio</Typography>}
                                />
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
                                            name="ph"
                                            checked={tipoInmueble.ph}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={<Typography variant="body2" sx={{ fontSize: '18px' }}>PH</Typography>}
                                />
                            </div>
                            {/*Email*/}
                            <TextField
                                label="Mail de contacto"
                                variant="outlined"
                                fullWidth
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
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
                            {/* Servicio de internet */}
                            <Select
                                fullWidth
                                value={planInternet}
                                onChange={(e) => {
                                    setPlanInternet(e.target.value);
                                    setPlanTV("");
                                }}
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
                            {/*Servicio de cable*/}
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
                                <MenuItem
                                    value="TV full"
                                    disabled={planInternet !== 'Ninguno'}
                                >
                                    TV full + Pack Fútbol + Max gratis
                                </MenuItem>
                                <MenuItem
                                    value="Pack adicional"
                                    disabled={planInternet === 'Ninguno'}
                                >
                                    Pack TV adicional $5999
                                </MenuItem>
                                <MenuItem
                                    value="Ninguno"
                                    disabled={planInternet === 'Ninguno'}
                                >
                                    Ninguno
                                </MenuItem>
                            </Select>
                            {/*Calendario */}
                            <div className='form-calendar'>
                                <p className='form-calendar-text'>Elegí fecha y horario para coordinar la instalación del servicio.</p>
                                <BasicDatePicker
                                    fechaInstalacion={fechaInstalacion}
                                    setFechaInstalacion={setFechaInstalacion}
                                    franjaHoraria={franjaHoraria}
                                    setFranjaHoraria={setFranjaHoraria}
                                />
                            </div>
                            {/*Bases y condiciones */}
                            <div className='form-check'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={terminosAceptados}
                                            onChange={(e) => setTerminosAceptados(e.target.checked)}
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
                                                href="https://drive.google.com/file/d/1X0siKyH7pwhhlTY5Tro_k0nYeQTUGC83/view"
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
                                type='submit'
                                disabled={
                                    !formData.name ||
                                    !formData.dni ||
                                    !formData.telefono ||
                                    !formData.email ||
                                    !direccion ||
                                    !fechaInstalacion ||
                                    !franjaHoraria ||
                                    !Object.values(tipoInmueble).includes(true) ||
                                    !terminosAceptados
                                }
                                >
                                Enviar
                                </Button>
                            </div>
                        </form>
                    </Fade>
                </div>
            </section>
            <Footer />
            <BotonWhatsapp />
            {/*Mensaje de datos enviados*/}
            <Snackbar
                open={successMessageOpen}
                autoHideDuration={4000}
                onClose={() => setSuccessMessageOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSuccessMessageOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    ¡Tus datos fueron enviados con éxito!
                </Alert>
            </Snackbar>
        </>
    );
}

export default Form;
