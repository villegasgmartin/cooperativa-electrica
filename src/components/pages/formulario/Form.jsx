//Importaciones:
import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Select, MenuItem, FormControlLabel, Checkbox, Link, Typography,  Snackbar, Alert, CircularProgress } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import Footer from '../../common/layout/footer/Footer';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import NavBar from '../../common/layout/navBar/NavBar';
import LogoNave from "../../../assets/images/logos/logo-nave-blanco.png";
import { Helmet } from "react-helmet";
import BotonWhatsapp from '../../common/BotonWhatsapp/BotonWhatsapp';
import BasicDatePicker from '../../common/FormComponents/DatePicker/DatePicker';
import "../formulario/Form.css"
import { useDispatch } from 'react-redux';
import { createReservaForm } from '../../../../redux/actions/formActions';
import { useNavigate } from 'react-router-dom'; 
// Google Maps
import { Autocomplete } from '@react-google-maps/api';
import { isPointInPolygon } from "geolib";

//JSX:
const Form = () => {
    const dispatch = useDispatch();
    const [autocomplete, setAutocomplete] = useState(null);
    const [fechaInstalacion, setFechaInstalacion] = useState(null); 
    const [franjaHoraria, setFranjaHoraria] = useState('');
    const [planInternet, setPlanInternet] = useState('');
    const [internetPlan, setInternetPlan] = useState('');
    const [planTV, setPlanTV] = useState('');
    const [direccion, setDireccion] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [coberturaMensaje, setCoberturaMensaje] = useState('');
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
    const [zona, setZona] = useState("");
    const inputRef = useRef(null);
    const [internetPlanURL, setInternetPlanURL] = useState('');
    const [direccionValidada, setDireccionValidada] = useState(false);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
    if (autocomplete !== null) {
        const place = autocomplete.getPlace();
        setDireccion(place.formatted_address || "");
    }
    };

    useEffect(() => {
        if (window.google && window.google.maps) {
            const autocomplete = new window.google.maps.places.Autocomplete(
                inputRef.current,
                { types: ["geocode"] } // Opcional: limitar a direcciones
            );
        
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                setDireccion(place.formatted_address);
                }
            });
            }
        }, []);

        useEffect(() => {
           
            if (zona?.trim() !== '' && zona?.trim() !== 'Direccion en Zona 1') {
                
                setInternetPlanURL("Fuera de Zona");
                
            } else {
                setInternetPlanURL("");
            }
        }, [zona]);

    //Zonas de cobertura:
    const zona1 = [
        { latitude: -37.99692, longitude: -57.5633 },
        { latitude: -38.00567, longitude: -57.5707 },
        { latitude: -38.00728, longitude: -57.56752 },
        { latitude: -38.00784, longitude: -57.56786 },
        { latitude: -38.00835, longitude: -57.5669 },
        { latitude: -38.01158, longitude: -57.56949 },
        { latitude: -38.012, longitude: -57.56853 },
        { latitude: -38.01129, longitude: -57.56785 },
        { latitude: -38.0117, longitude: -57.567 },
        { latitude: -38.01099, longitude: -57.56622 },
        { latitude: -38.01139, longitude: -57.56545 },

        { latitude: -38.013, longitude: -57.56665 },
        { latitude: -38.01212, longitude: -57.5686 },

        { latitude: -38.01315, longitude: -57.56943 },
        { latitude: -38.01676, longitude: -57.56238 },
        
        { latitude: -38.01325, longitude: -57.55959 },
        { latitude: -38.01063, longitude: -57.56476 },
  

        { latitude: -38.00503, longitude: -57.5603 },
        { latitude: -38.0143, longitude: -57.5421 },
        { latitude: -38.00954, longitude: -57.5382 },
        { latitude: -38.00904, longitude: -57.53921 },
        { latitude: -38.01214, longitude: -57.54176 },
        { latitude: -38.00662, longitude: -57.55275 },
        { latitude: -38.00346, longitude: -57.55016 },
        { latitude: -37.99683, longitude: -57.5633 }
        ]
    
    

    // const verificarCobertura = async () => {
    //     if (!direccion) {
    //         setCoberturaMensaje('Por favor, ingresá una dirección.');
    //         return;
    //     }
    
    //     try {
    //         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`);
    //         const data = await response.json();
    
    //         if (data.length > 0) {
    //             const { lat, lon } = data[0];
    //             const latFloat = parseFloat(lat);
    //             const lonFloat = parseFloat(lon);
    
    //             const dentroDeZona = isPointInPolygon({ lat: latFloat, lng: lonFloat }, zona1) ||
    //                                 isPointInPolygon({ lat: latFloat, lng: lonFloat }, zona2);
    
    //             if (dentroDeZona) {
    //                 setCoberturaMensaje('¡Excelente! Hay cobertura en tu zona.');
    //             } else {
    //                 setCoberturaMensaje('Lo sentimos, no hay cobertura en tu dirección.');
    //             }
    //         } else {
    //             setCoberturaMensaje('Dirección no encontrada. Por favor, revisala.');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setCoberturaMensaje('Error al verificar la dirección.');
    //     }
    // };
    const getCoordinates = async (address) => {

        const apiKey = "AIzaSyDnG7odirzcO_xm7R1EIxf1a7Dhi2OflDU"; // Reemplázalo con tu clave real
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&loading=async`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
           
    
             if (data.status === "OK") {
                const { lat, lng } = data.results[0].geometry.location;
                const city = data.results[0].address_components[2];
                const address = data.results[0].formatted_address
                return { latitude: parseFloat(data.results[0].geometry.location.lat), longitude: parseFloat(data.results[0].geometry.location.lng), city, address };
            } else {
                console.error("Error en la geocodificación:", data.status);
                return null;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return null;
        }
    };
    

    async function verificarCobertura(e) {
      const {casa, edificio, ph} = tipoInmueble
      if(!casa && !edificio && !ph){
        return alert('Elija un tipo de inmueble')
      }
    
        try {
            const coordenadas = await getCoordinates(direccion);

            const ciudad = coordenadas.city.long_name
            const direccionCompleta = coordenadas.address;
            if(ciudad != 'Mar del Plata'){
                // return alert('Servicio no disponible fuera de Mar del Plata')
                setMostrarPopup(true);
  return;

            }
            setDireccionValidada(true)
            if (isPointInPolygon(coordenadas, zona1)) {
                setZona("Direccion en Zona 1");
            } else {
                setZona("Fuera de Zona de Servicio");
                setMostrarPopup(true);
                return;
            }
            } catch (error) {
            setZona("Error al buscar la dirección");
            }
        }

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

    const handleInternetChange = (event) => {
        setInternetPlan(event.target.value);
    };

    //Enviamos los datos
    const handleSubmit = async (event) => {

        if(internetPlan==='Fuera de Zona' && planTV==='Ninguno'){
            return alert( 'No esta habilitado para solicitar un turno')
        } 

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
                Dpto: formData.departamento,
                Piso: formData.piso,
                direccion,
                fecha: isoFecha,
                horario: franjaHoraria,
                internet: internetPlan,
                tv: planTV,
                nombre: formData.name,
                email: formData.email,
                telefono: formData.telefono,
                tipo: Object.keys(tipoInmueble).find(key => tipoInmueble[key]),
            };
            //Si no hay errores, hacemos POST
            try {
                    await dispatch(createReservaForm(dataToSend));
                    
            setTimeout(() => {
                navigate('/confirmación');
            }, 1000);

            } catch (error) {
                console.error('Error al enviar el formulario:', error);
            }
        }
    };

    const handleEnviarYSalir = async () => {
    if (!email || !direccion) {
        return alert("Por favor ingrese su email y asegúrese de haber escrito una dirección.");
    }

    const dataToSend = {
        email,
        direccion
    };

    try {
        await dispatch(createReservaForm(dataToSend));
        console.log("Datos enviados:", dataToSend);
        setMostrarPopup(false);
        setEmail('');
        setDireccion('');
    } catch (error) {
        console.error("Error al enviar datos:", error);
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
                            ¡Conéctate con el mejor servicio para tu hogar o empresa!. En caso de necesitar un cambio de plan o cambio de servicio por favor comunicarse a nuestros 
                            <a href="/contacto"> canales de comunicacion </a>
                          
                            
                        </p>
                        <span className="color-title01 form-text02">Formulario para nuevos Clientes</span>
                    </Fade>
                </div>
                {mostrarPopup && (
                    <div className="popup-overlay"
                    onClick={() => setMostrarPopup(false)}
                    >
                        
                        <div className="popup"
                         onClick={(e) => e.stopPropagation()}>
                        <h2 className='form-text01'>Su dirección está fuera de cobertura</h2>
                        <p className='form-text02'>No contamos con planes de Internet en esa zona.</p>
                        <p className='form-text02'>¿Desea contratar el servicio de TV?</p>
                        <Button onClick={() => {
                            // lógica para continuar solo con TV
                            setMostrarPopup(false);
                        }}
                        variant="contained"
                               
                                sx={{
                                    marginTop: "10px",
                                    borderRadius: "25px",
                                    backgroundColor: "#8048ff",
                                    textTransform: "none",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    '&:hover': {
                                        backgroundColor: "#5c32b3"
                                    }
                                }}
                        >Continuar</Button>

                        <p className='form-text02'>¿Desea que le avisemos cuando tengamos servicio de internet disponible en su zona?</p>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <TextField
                            variant='outlined'
                            name="Email"
                            type="email"
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Button  
                        onClick={() => {
                            handleEnviarYSalir()
                            
                            console.log('Email enviado:', email);
                            setMostrarPopup(false);
                        }}
                        variant="contained"
                               
                                sx={{
                                    marginTop: "10px",
                                    borderRadius: "25px",
                                    backgroundColor: "#8048ff",
                                    textTransform: "none",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    '&:hover': {
                                        backgroundColor: "#5c32b3"
                                    }
                                }}
                        
                        >Enviar y salir</Button>
                        </div>
                        </div>
                    </div>
                    )}
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
                            <p className='form-span'>*Debe seleccionar una dirección del listado:</p>
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
                            <div style={{display: "flex", gap: "10px"}}>
                                {/* Piso */}
                            <TextField
                                label="Piso"
                                variant="outlined"
                                fullWidth
                                type="text"
                                name="piso"
                                value={formData.piso}
                                onChange={handleInputChange}
                                error={!!errors.piso}
                                helperText={errors.piso}
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
                                    },
                                    width: "130px"
                                }}
                            />
                            {/* Departamento */}
                            <TextField
                                label="Departamento"
                                variant="outlined"
                                fullWidth
                                type="text"
                                name="departamento"
                                value={formData.departamento}
                                onChange={handleInputChange}
                                error={!!errors.departamento}
                                helperText={errors.departamento}
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
                                    },
                                    width: "130px"
                                }}
                            />
                            </div>
                            {/*Botón para tar cobertura*/}
                            <Button
                                variant="contained"
                                onClick={verificarCobertura}
                                sx={{
                                    marginTop: "10px",
                                    borderRadius: "25px",
                                    backgroundColor: "#8048ff",
                                    textTransform: "none",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    '&:hover': {
                                        backgroundColor: "#5c32b3"
                                    }
                                }}
                            >
                                Consultar cobertura
                            </Button>
                            {coberturaMensaje && (
                                <Typography
                                    variant="body2"
                                    sx={{ marginTop: "10px", fontWeight: "bold", color: coberturaMensaje.includes('¡Excelente!') ? 'green' : 'red' }}
                                >
                                    {coberturaMensaje}
                                </Typography>
                            )}
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
                    {direccionValidada?(
                        <>
                           {/* Servicio de internet */}
                           {(zona ?? '').trim() == '' || (zona ?? '').trim() == 'Direccion en Zona 1'?(
                                <Select
                                    displayEmpty
                                    fullWidth
                                    id="internet-plan-select"
                                    value={internetPlan}
                                    onChange={handleInternetChange}
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
                                    <MenuItem value="300 MB">300 megas</MenuItem>
                                    <MenuItem value="600 MB">600 megas</MenuItem>
                                    <MenuItem value="1000 MB">1000 megas</MenuItem>
                                    <MenuItem value="Ninguna">Ninguna</MenuItem>
                                </Select>
                                ):(
                                <Select
                                    displayEmpty
                                    fullWidth
                                    id="internet-plan-select"
                                    value={internetPlan}
                                    onChange={handleInternetChange}
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
                                    <MenuItem value="Fuera de Zona">Fuera de Zona</MenuItem>
                                </Select>
                                )}
                            {/*Servicio de cable*/}
                            {(zona ?? '').trim() == '' || (zona ?? '').trim() == 'Direccion en Zona 1'?(
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
                            ):(
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
                                    value="Futbol fuera de zona"
                                    disabled={planInternet === 'Ninguno'}
                                >
                                     TV  $10000
                                </MenuItem>
                                <MenuItem
                                    value="Ninguno"
                                >
                                    Ninguno
                                </MenuItem>
                            </Select>

                            )}
                        
                           {/*Calendario */}
                           <div className='form-calendar'>
                                <p className='form-calendar-text'>Elegí fecha y horario para coordinar la instalación del servicio.</p>
                                <BasicDatePicker
                                    fechaInstalacion={fechaInstalacion}
                                    setFechaInstalacion={setFechaInstalacion}
                                    franjaHoraria={franjaHoraria}
                                    setFranjaHoraria={setFranjaHoraria}
                                    tipoInmueble={Object.keys(tipoInmueble).find(key => tipoInmueble[key])}
                                />
                            </div>
                        
                        </>




                    ):("")}
                         
                        
                         
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
