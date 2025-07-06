//Importaciones:
import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Select, MenuItem, FormControlLabel, Checkbox, Link, Typography,  Snackbar, Alert, Box, Grid, Stack, Dialog, DialogActions, DialogContent, Switch } from '@mui/material';
import BasicDatePicker from '../../../../common/FormComponents/DatePicker/DatePicker';
import { useDispatch } from 'react-redux';
import { createReservaForm } from '../../../../../../redux/actions/formActions';
import { createReservaTV } from '../../../../../../redux/actions/formActions';
// Google Maps
import { Autocomplete } from '@react-google-maps/api';
import { isPointInPolygon } from "geolib";
import FechaPersonalizada from '../FechaPersonalizada/FechaPersonalizada';

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
    const [zona, setZona] = useState("");
    const inputRef = useRef(null);
    const [internetPlanURL, setInternetPlanURL] = useState('');
    const [direccionValidada, setDireccionValidada] = useState(false);
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [mostrarPopupEnviado, setmostrarPopupEnviado] = useState(false)
    const [usoHorarioPersonalizado, setUsoHorarioPersonalizado] = useState(false);


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
        {latitude:-37.99755,longitude: -57.56412},
        {latitude:-37.99797,longitude: -57.56561},
        {latitude:-37.99924,longitude: -57.56533},
        {latitude:-37.99954,longitude: -57.5669},
        {latitude:-38.00004, longitude:-57.56688},
        {latitude:-38.00038, longitude:-57.56753},
        {latitude:-38.00083, longitude:-57.56755},
        {latitude:-38.00241, longitude:-57.56784},
        {latitude:-38.00115, longitude:-57.56818},
        {latitude:-38.00224,longitude: -57.56908},
        {latitude:-38.00204, longitude:-57.56951},
        {latitude:-38.00235, longitude:-57.57002},
        {latitude:-38.00274, longitude:-57.56945},
        {latitude:-38.00398, longitude:-57.56913},
        {latitude:-38.0043, longitude:-57.57072},
        { latitude: -38.00567, longitude: -57.5707 },
        {latitude:-38.00685, longitude:-57.57},
        {latitude:-38.00662, longitude:-57.56913},
        {latitude:-38.00647, longitude:-57.56865},
        {latitude:-38.0066,longitude: -57.56838},
        {latitude:-38.00922, longitude:-57.56767},
        {latitude:-38.00948, longitude:57.56927},
        {latitude:-38.01075, longitude:-57.56902},
        {latitude:-38.01108, longitude:-57.57058},
        {latitude:-38.01234, longitude:-57.57029},
        {latitude:-38.0121, longitude:-57.56862},
        {latitude:-38.01289, longitude:-57.56919},
        { latitude: -38.01676, longitude: -57.56238 },
        { latitude: -38.01325, longitude: -57.55959 },
        { latitude: -38.01074, longitude: -57.56459 },
        { latitude: -38.00503, longitude: -57.5603 },
        { latitude: -38.0143, longitude: -57.5421 },
        { latitude: -38.00954, longitude: -57.5382 },
        { latitude: -38.00904, longitude: -57.53921 },
        { latitude: -38.01214, longitude: -57.54176 },
        { latitude: -38.00662, longitude: -57.55275 },
        { latitude: -38.00346, longitude: -57.55016 },
        { latitude: -37.99683, longitude: -57.5633 }
        ]

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
    
    
        const verificarEspana = (address)=>{
        console.log(address)
        const parts = address.split(',').map(p => p.trim());


        const nombreCalle = parts[0].split(' ')[0];
        const alturaCalle = parts[0].split(' ')[1];
        const alturaNumero = parseInt(alturaCalle)
        let zona;

        if(nombreCalle == 'España' && alturaNumero>2200 && alturaNumero<3900){
            zona = true
        }else{
            zona = false
        }

        return zona

    }

    async function verificarCobertura(e) {
        const {casa, edificio, ph} = tipoInmueble
        if(!casa && !edificio && !ph){
            return alert('Elija un tipo de inmueble')
        }
    
        try {
            const coordenadas = await getCoordinates(direccion);
            const ciudad = coordenadas.city.long_name
            const direccionCompleta = coordenadas.address;
            const espana = verificarEspana(direccion);
            if(ciudad != 'Mar del Plata' && !direccionCompleta.includes('Mar del Plata')){
                return alert('Servicio no disponible fuera de Mar del Plata')
            }
            setDireccionValidada(true)
            if (isPointInPolygon(coordenadas, zona1) || espana) {
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
            if(zona == 'Fuera de Zona de Servicio' || internetPlan == 'Ninguna'){
            event.preventDefault();
            let formErrors = {};
            if (!formData.name) formErrors.name = "Nombre es requerido";
            if (!formData.apellido) formErrors.apellido = "Apellido es requerido";
            if (!formData.dni) formErrors.dni = "DNI es requerido";
            if (!formData.telefono) formErrors.telefono = "Teléfono es requerido";
            if (!formData.email) formErrors.email = "Correo es requerido";
    
            setErrors(formErrors);
    
            if (Object.keys(formErrors).length === 0) {
        
                const dataToSend = {
                    DNI: formData.dni,
                    Dpto: formData.departamento,
                    Piso: formData.piso,
                    direccion,
                    tv: planTV,
                    nombre: formData.name,
                    apellido: formData.apellido,
                    email: formData.email,
                    telefono: formData.telefono,
                    tipo: Object.keys(tipoInmueble).find(key => tipoInmueble[key]),
                };
                    try {
                        await dispatch(createReservaTV(dataToSend));
                        
                    // Limpiamos campos
                        setFormData({ name: '', apellido: '', dni: '', telefono: '', email: '' , piso: "", departamento: ""});
                        setDireccion('');
                        setFechaInstalacion(null);
                        setFranjaHoraria('');
                        setPlanInternet('');
                        setPlanTV('');
                        setTipoInmueble({ casa: false, edificio: false, ph: false });

                        // Mostrar mensaje de éxito
                        setmostrarPopupEnviado(true)
                    } catch (error) {
                        console.error('Error al enviar el formulario:', error);
                    }
                }
            };
    
            event.preventDefault();
            
            //Validaciones
            let formErrors = {};
            if (!formData.name) formErrors.name = "Nombre es requerido";
            if (!formData.apellido) formErrors.apellido = "Apellido es requerido";
            if (!formData.dni) formErrors.dni = "DNI es requerido";
            if (!formData.telefono) formErrors.telefono = "Teléfono es requerido";
            if (!formData.email) formErrors.email = "Correo es requerido";
            if (!fechaInstalacion) formErrors.fechaInstalacion = "Elegí una fecha";
            if (!franjaHoraria) formErrors.franjaHoraria = "Elegí un horario";  
            
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
                    apellido: formData.apellido,
                    email: formData.email,
                    telefono: formData.telefono,
                    tipo: Object.keys(tipoInmueble).find(key => tipoInmueble[key]),
                };
                //Si no hay errores, hacemos POST
                try {
                        await dispatch(createReservaForm(dataToSend));

                    // Limpiamos campos
                    setFormData({ name: '', apellido: '', dni: '', telefono: '', email: '' , piso: "", departamento: ""});
                    setDireccion('');
                    setFechaInstalacion(null);
                    setFranjaHoraria('');
                    setPlanInternet('');
                    setPlanTV('');
                    setTipoInmueble({ casa: false, edificio: false, ph: false });

                    // Mostrar mensaje de éxito
                    setmostrarPopupEnviado(true)
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
            setMostrarPopup(false);
            setEmail('');
            setDireccion('');
            setTimeout(() => {
                        window.location= '/'
                    }, 1500);
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    };

    return (
        <>
            {/*Descripción*/}
            <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: "50px" }}>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
                    Crear Reserva
                </Typography>
                    {mostrarPopup && (
                    <Dialog
                        open={mostrarPopup}
                        onClose={() => setMostrarPopup(false)}
                        fullWidth
                        maxWidth="xs"
                    >
                        <DialogContent>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
                            La dirección se encuentra fuera de la zona de cobertura
                        </Typography>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={() => setMostrarPopup(false)}
                            sx={{
                            borderRadius: '25px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 4,
                            marginBottom: "20px"
                            }}
                        >
                            Cerrar
                        </Button>
                        </DialogActions>
                    </Dialog>
                    )}

                {mostrarPopupEnviado && (
                    <Dialog
                        open={mostrarPopupEnviado}
                        onClose={() => setmostrarPopupEnviado(false)}
                        fullWidth
                        maxWidth="xs"
                    >
                        <DialogContent>
                        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold'}}>
                            La reserva fue creada con éxito
                        </Typography>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={() => setmostrarPopupEnviado(false)}
                            sx={{
                            borderRadius: '25px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 4,
                            marginBottom: "20px"
                            }}
                        >
                            Cerrar
                        </Button>
                        </DialogActions>
                    </Dialog>
                    )}

                <div>
                {/*Formulario*/}
                <Box onSubmit={handleSubmit} component="form" sx={{ p: 2 , marginBottom: "50px"}}>
                    <Stack spacing={2}>
                    {/*Nombre*/}
                    <TextField
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        id='name-input'
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    {/*Apellido*/}
                    <TextField
                        label="Apellido"
                        variant="outlined"
                        fullWidth
                        id='apellido-input'
                        required
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        error={!!errors.apellido}
                        helperText={errors.apellido}
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
                    />
                    {/*Dirección con Google Maps Autocompletado*/}
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
                            
                            />
                        </Autocomplete>
                    {/*Tipos de inmueble*/}
                    <div  style={{display: "flex", justifyContent: "center"}}>
                        <Stack direction="row" spacing={2}>
                            <FormControlLabel
                            control={
                                <Checkbox
                                name="casa"
                                checked={tipoInmueble.casa}
                                onChange={handleCheckboxChange}
                                />
                            }
                            label="Casa"
                            />
                            <FormControlLabel
                            control={
                                <Checkbox
                                name="edificio"
                                checked={tipoInmueble.edificio}
                                onChange={handleCheckboxChange}
                                />
                            }
                            label="Edificio"
                            />
                            <FormControlLabel
                            control={
                                <Checkbox
                                name="ph"
                                checked={tipoInmueble.ph}
                                onChange={handleCheckboxChange}
                                />
                            }
                            label="PH"
                            />
                        </Stack>
                        </div>
                    {/* Piso y Depto */}
                    <div  style={{display: "flex", justifyContent: "center", gap: "10px"}}>
                        <div style={{width: "100px"}}>
                            <TextField
                            label="Piso"
                            name="piso"
                            value={formData.piso}
                            onChange={handleInputChange}
                            error={!!errors.piso}
                            helperText={errors.piso}
                            fullWidth
                            />
                        </div>
                        <div style={{width: "100px"}}>
                            <TextField
                            label="Departamento"
                            name="departamento"
                            value={formData.departamento}
                            onChange={handleInputChange}
                            error={!!errors.departamento}
                            helperText={errors.departamento}
                            fullWidth
                            />
                        </div>
                    </div>
                    {/*Botón para tar cobertura*/}
                    <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
                        <Button
                            variant="contained"
                            onClick={verificarCobertura}
                        >
                            Consultar cobertura
                        </Button>
                    </div>
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
                    />
                {direccionValidada?(
                <>
                    {/* Servicio de internet */}
                    {(zona ?? '').trim() == '' || (zona ?? '').trim() == 'Direccion en Zona 1' && internetPlan!='Ninguna' ?(
                        <Select
                            displayEmpty
                            fullWidth
                            id="internet-plan-select"
                            value={internetPlan}
                            onChange={handleInternetChange}
                            inputProps={{ 'aria-label': 'Plan que solicita de Internet' }}
                        >
                            <MenuItem disabled value="">Plan que solicita de Internet</MenuItem>
                            <MenuItem value="300 MB">300 megas</MenuItem>
                            <MenuItem value="600 MB">600 megas</MenuItem>
                            <MenuItem value="1000 MB">1000 megas</MenuItem>
                            <MenuItem value="Ninguna">Ninguna</MenuItem>
                        </Select>
                        ):(
                        ""
                        )}
                    {/*Servicio de cable*/}
                    {(zona ?? '').trim() == '' || (zona ?? '').trim() == 'Direccion en Zona 1' && internetPlan!='Ninguna' ?(
                            <Select
                            fullWidth
                            value={planTV}
                            onChange={(e) => setPlanTV(e.target.value)}
                            displayEmpty
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
                    {(zona ?? '').trim() === '' || ((zona ?? '').trim() === 'Direccion en Zona 1' && internetPlan !== 'Ninguna') ? (
                    <>
                        <FormControlLabel
                        control={
                            <Switch
                            checked={usoHorarioPersonalizado}
                            onChange={(e) => setUsoHorarioPersonalizado(e.target.checked)}
                            color="primary"
                            />
                        }
                        label={usoHorarioPersonalizado ? "Horario personalizado" : "Horario estándar"}
                        sx={{ mt: 2 }}
                        />

                        {usoHorarioPersonalizado ? (
                        <FechaPersonalizada
                            fechaInstalacion={fechaInstalacion}
                            setFechaInstalacion={setFechaInstalacion}
                            franjaHoraria={franjaHoraria}
                            setFranjaHoraria={setFranjaHoraria}
                        />
                        ) : (
                        <BasicDatePicker
                            fechaInstalacion={fechaInstalacion}
                            setFechaInstalacion={setFechaInstalacion}
                            franjaHoraria={franjaHoraria}
                            setFranjaHoraria={setFranjaHoraria}
                            tipoInmueble={Object.keys(tipoInmueble).find(key => tipoInmueble[key])}
                            sinEstilo={true}
                        />
                        )}
                    </>
                    ) : ""}
                    </>
                    ):("")}
                    {/*Enviar formulario */}
                    {(zona ?? '').trim() == '' || (zona ?? '').trim() == 'Direccion en Zona 1' && internetPlan!='Ninguna' ?(
                        <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
                            <Button
                                variant="contained"
                                size="large"
                                type='submit'
                                disabled={
                                    !formData.name ||
                                    !formData.apellido ||
                                    !formData.dni ||
                                    !formData.telefono ||
                                    !formData.email ||
                                    !direccion ||
                                    !fechaInstalacion ||
                                    !franjaHoraria ||
                                    !Object.values(tipoInmueble).includes(true)
                                }
                                >
                                Enviar
                                </Button>
                        </div>
                    ):(
                        <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
                            <Button
                                variant="contained"
                                size="large"
                                type='submit'
                                disabled={
                                    !formData.name ||
                                    !formData.apellido ||
                                    !formData.dni ||
                                    !formData.telefono ||
                                    !formData.email ||
                                    !direccion ||
                                    !Object.values(tipoInmueble).includes(true)
                                }
                                >
                                Enviar
                            </Button>
                        </div>
                    )}
                    </Stack>
                </Box>
                </div>
            </Box>
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
