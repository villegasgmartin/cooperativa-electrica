// Importaciones:
import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Chip,
    Stack,
    IconButton,
    Divider,
    FormControlLabel,
    Checkbox,
    Switch,
    Snackbar,
    Alert,
    Tooltip,
    Modal,
    Box as MuiBox,
    GlobalStyles,
    Select,
    MenuItem,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Autocomplete } from '@react-google-maps/api';
import { isPointInPolygon } from 'geolib';
import BasicDatePicker from '../../../FormComponents/DatePicker/DatePicker';
import FechaPersonalizada from '../FechaPersonalizada/FechaPersonalizada';
import { fetchUserData } from '../../../../../../redux/actions/userActions';
import {
    fetchReservas,
    updateReserva,
    markReservaAsRealizada,
    deleteReserva,
    crearUsuarioBCM,
    fetchReservasRealizadas,
    updateReservaRealizada,
    deleteReservaCompletada,
    handleMarkAsPendienteRedux,
} from '../../../../../../redux/actions/reservasActions';
import {
    createReservaForm,
    createReservaTV,
} from '../../../../../../redux/actions/formActions';

// Plugins dayjs:
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Estilo de modales:
const modalStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const modalBoxStyles = (theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    padding: 3,
    width: 520,
    maxWidth: '95vw',
    maxHeight: '88vh',
    overflowY: 'auto',
    boxShadow: 24,
});

// Zona de cobertura:
// const zona1 = [
//     { latitude: -37.99117, longitude: -57.57442 },
//     { latitude: -38.0008, longitude: -57.5822 },
//     { latitude: -38.00599, longitude: -57.572 },
//     { latitude: -38.0043, longitude: -57.57072 },
//     { latitude: -38.00567, longitude: -57.5707 },
//     { latitude: -38.00685, longitude: -57.57 },
//     { latitude: -38.00662, longitude: -57.56913 },
//     { latitude: -38.00647, longitude: -57.56865 },
//     { latitude: -38.0066, longitude: -57.56838 },
//     { latitude: -38.00922, longitude: -57.56767 },
//     { latitude: -38.00948, longitude: -57.56927 },
//     { latitude: -38.01075, longitude: -57.56902 },
//     { latitude: -38.01108, longitude: -57.57058 },
//     { latitude: -38.01234, longitude: -57.57029 },
//     { latitude: -38.0121, longitude: -57.56862 },
//     { latitude: -38.01289, longitude: -57.56919 },
//     { latitude: -38.0166, longitude: -57.56217 },
//     { latitude: -38.00848, longitude: -57.55563 },
//     { latitude: -38.0059, longitude: -57.56066 },
//     { latitude: -38.00525, longitude: -57.56023 },
//     { latitude: -38.01438, longitude: -57.54191 },
//     { latitude: -38.0096, longitude: -57.53808 },
//     { latitude: -38.00899, longitude: -57.53931 },
//     { latitude: -38.01204, longitude: -57.54193 },
//     { latitude: -38.00653, longitude: -57.55264 },
//     { latitude: -38.00346, longitude: -57.55016 },
//     { latitude: -37.99117, longitude: -57.57442 },
// ];
       const zona1 = [
        {latitude: -37.99117, longitude:-57.57442 },
         {latitude: -38.0008, longitude:-57.5822 },
         {latitude: -38.00599, longitude:-57.572 },
          {latitude: -38.0098, longitude:-57.57536 },
        { latitude: -38.0166, longitude: -57.56217 },
        { latitude: -38.00848, longitude: -57.55563 },
        { latitude: -38.01438, longitude: -57.54191 },
        { latitude: -38.0096, longitude: -57.53808 },
        { latitude: -38.00899, longitude: -57.53931 },
        { latitude: -38.01204, longitude: -57.54193 },
        { latitude: -38.00653, longitude: -57.55264 },
        { latitude: -38.00346, longitude: -57.55016 },
        {latitude: -37.99117, longitude:-57.57442 }
      
        ]
// Helpers:
const getReservaDate = (reserva) => {
    if (!reserva?.fecha) return null;

    const rawFecha = reserva.fecha;

    if (typeof rawFecha === 'string') {
        const fechaSoloDia = rawFecha.includes('T')
            ? rawFecha.split('T')[0]
            : rawFecha;

        const parsed = dayjs(fechaSoloDia).startOf('day');
        return parsed.isValid() ? parsed : null;
    }

    const parsed = dayjs(rawFecha).startOf('day');
    return parsed.isValid() ? parsed : null;
};

const formatDate = (value) => {
    if (!value) return 'Sin fecha';

    if (typeof value === 'string') {
        const ymd = value.includes('T') ? value.split('T')[0] : value;
        const [y, m, d] = ymd.split('-');
        if (y && m && d) return `${d}/${m}/${y}`;
    }

    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.format('DD/MM/YYYY') : 'Sin fecha';
};

const getNombreCompleto = (reserva) => {
    if (!reserva) return '';
    return reserva.apellido ? `${reserva.nombre} ${reserva.apellido}` : reserva.nombre;
};

const normalizar = (value) => {
    return String(value || '').toLowerCase().trim();
};

const getInicioSemanaLunes = (fecha) => {
    const base = dayjs(fecha).startOf('day');
    const day = base.day();
    const diff = day === 0 ? -6 : 1 - day;
    return base.add(diff, 'day');
};

const capitalizarPrimeraLetra = (texto) => {
    if (!texto) return '';
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};

    const obtenerMinutosDesdeHorario = (horario) => {
        if (!horario) return 99999;
            const texto = String(horario).trim();
            const match = texto.match(/(\d{1,2})\s*:\s*(\d{2})/);

        if (!match) return 99999;

            const horas = parseInt(match[1], 10);
            const minutos = parseInt(match[2], 10);

        return horas * 60 + minutos;
    };

export default function ReservasCalendario() {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { reservas = [], realizadas = [] } = useSelector((state) => state.reservas);
    const { reservasLeer } = useSelector((state) => state.user);

    const [vistaCalendario, setVistaCalendario] = useState('semanal');

    const [mesActual, setMesActual] = useState(dayjs().startOf('month'));
    const [semanaActual, setSemanaActual] = useState(getInicioSemanaLunes(dayjs()));

    const [searchQuery, setSearchQuery] = useState('');
    const [filtroServicio, setFiltroServicio] = useState(null);

    const [openDayModal, setOpenDayModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [usoHorarioPersonalizado, setUsoHorarioPersonalizado] = useState(false);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [reservaAEliminar, setReservaAEliminar] = useState(null);

    const [openRealizadaModal, setOpenRealizadaModal] = useState(false);
    const [reservaRealizadaSeleccionada, setReservaRealizadaSeleccionada] = useState(null);
    const [fechaRealizada, setFechaRealizada] = useState(null);
    const [horarioRealizada, setHorarioRealizada] = useState('');

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [createUsoHorarioPersonalizado, setCreateUsoHorarioPersonalizado] = useState(false);

    const [autocomplete, setAutocomplete] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [zona, setZona] = useState('');
    const [internetPlanURL, setInternetPlanURL] = useState('');
    const [direccionValidada, setDireccionValidada] = useState(false);
    const [mostrarPopupFueraZona, setMostrarPopupFueraZona] = useState(false);

    const [fechaInstalacion, setFechaInstalacion] = useState(null);
    const [franjaHoraria, setFranjaHoraria] = useState('');
    const [internetPlan, setInternetPlan] = useState('');
    const [planTV, setPlanTV] = useState('');

    const [tipoInmueble, setTipoInmueble] = useState({
        casa: false,
        edificio: false,
        ph: false,
    });

    const [formData, setFormData] = useState({
        name: '',
        apellido: '',
        dni: '',
        telefono: '',
        email: '',
        piso: '',
        departamento: '',
        colocacionCaja: false,
        ingresoEdificio: false,
    });

    const [errors, setErrors] = useState({});

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const username = localStorage.getItem('username') || 'Web';

    useEffect(() => {
        dispatch(fetchUserData());
        dispatch(fetchReservas());
        dispatch(fetchReservasRealizadas());
    }, [dispatch]);

    useEffect(() => {
        if (zona?.trim() !== '' && zona?.trim() !== 'Direccion en Zona 1') {
            setInternetPlanURL('Fuera de Zona');
        } else {
            setInternetPlanURL('');
        }
    }, [zona]);

    const refreshReservas = () => {
        dispatch(fetchReservas());
        dispatch(fetchReservasRealizadas());
    };

    const mostrarSnackbar = (mensaje, severity = 'success') => {
        setSnackbarMsg(mensaje);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const onLoad = (autocompleteInstance) => {
        setAutocomplete(autocompleteInstance);

        if (autocompleteInstance?.setFields) {
            autocompleteInstance.setFields([
                'formatted_address',
                'name',
                'geometry',
                'address_components',
            ]);
        }
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();

            if (place?.formatted_address) {
                setDireccion(place.formatted_address);
                setDireccionValidada(false);
                setZona('');
                return;
            }

            if (place?.name) {
                setDireccion(place.name);
                setDireccionValidada(false);
                setZona('');
            }
        }
    };

    const getCoordinates = async (address) => {
        const apiKey = 'AIzaSyDnG7odirzcO_xm7R1EIxf1a7Dhi2OflDU';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&loading=async`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK') {
                const city = data.results[0].address_components[2];
                const addressResult = data.results[0].formatted_address;

                return {
                    latitude: parseFloat(data.results[0].geometry.location.lat),
                    longitude: parseFloat(data.results[0].geometry.location.lng),
                    city,
                    address: addressResult,
                };
            }

            console.error('Error en la geocodificación:', data.status);
            return null;
        } catch (error) {
            console.error('Error en la solicitud:', error);
            return null;
        }
    };

    const verificarEspana = (address) => {
        const parts = address.split(',').map((p) => p.trim());
        const nombreCalle = parts[0]?.split(' ')[0];
        const alturaCalle = parts[0]?.split(' ')[1];
        const alturaNumero = parseInt(alturaCalle);

        return nombreCalle === 'España' && alturaNumero > 2200 && alturaNumero < 3900;
    };

    const verificarCobertura = async () => {
        const { casa, edificio, ph } = tipoInmueble;

        if (!casa && !edificio && !ph) {
            return alert('Elija un tipo de inmueble');
        }

        if (!direccion) {
            return alert('Ingrese una dirección');
        }

        try {
            const coordenadas = await getCoordinates(direccion);

            if (!coordenadas) {
                setZona('Error al buscar la dirección');
                return;
            }

            const ciudad = coordenadas.city?.long_name;
            const direccionCompleta = coordenadas.address;
            const espana = verificarEspana(direccion);

            if (
                ciudad !== 'Mar del Plata' &&
                ciudad !== 'General Pueyrredón' &&
                !direccionCompleta.includes('Mar del Plata')
            ) {
                return alert('Servicio no disponible fuera de Mar del Plata');
            }

            setDireccionValidada(true);

            if (isPointInPolygon(coordenadas, zona1) || espana) {
                setZona('Direccion en Zona 1');
            } else {
                setZona('Fuera de Zona de Servicio');
                setMostrarPopupFueraZona(true);
            }
        } catch (error) {
            console.error(error);
            setZona('Error al buscar la dirección');
        }
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        if (checked) {
            setTipoInmueble({
                casa: name === 'casa',
                edificio: name === 'edificio',
                ph: name === 'ph',
            });
        } else {
            setTipoInmueble({
                casa: false,
                edificio: false,
                ph: false,
            });
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;

        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleInternetChange = (event) => {
        setInternetPlan(event.target.value);
    };

    const reservasUnificadas = useMemo(() => {
        const pendientes = reservas.map((reserva) => ({
            ...reserva,
            estadoCalendario: 'pendiente',
        }));

        const completadas = realizadas.map((reserva) => ({
            ...reserva,
            estadoCalendario: 'completada',
        }));

        return [...pendientes, ...completadas];
    }, [reservas, realizadas]);

    const reservasFiltradas = useMemo(() => {
        return reservasUnificadas
            .filter((row) => {
                if (reservasLeer) return row.terceriazado === true;
                return true;
            })
            .filter((row) => {
                if (!searchQuery) return true;

                const query = normalizar(searchQuery);

                return (
                    normalizar(row.internet).includes(query) ||
                    normalizar(row.tv).includes(query) ||
                    normalizar(row.nombre).includes(query) ||
                    normalizar(row.apellido).includes(query) ||
                    normalizar(row.direccion).includes(query) ||
                    normalizar(row.telefono).includes(query) ||
                    normalizar(row.email).includes(query) ||
                    normalizar(row.DNI).includes(query) ||
                    normalizar(row.tipo).includes(query) ||
                    normalizar(row.NumeroUsuario).includes(query) ||
                    normalizar(row.observaciones).includes(query)
                );
            })
            .filter((row) => {
                if (filtroServicio === null) return true;
                if (filtroServicio === 'tv') return row.esTV === true;
                if (filtroServicio === 'internet') return row.esTV === false;
                return true;
            });
    }, [reservasUnificadas, reservasLeer, searchQuery, filtroServicio]);

    const reservasDelMesVisible = useMemo(() => {
        return reservasFiltradas.filter((reserva) => {
            const fecha = getReservaDate(reserva);
            if (!fecha) return false;

            return fecha.isSame(mesActual, 'month');
        });
    }, [reservasFiltradas, mesActual]);

    const diasSemana = useMemo(() => {
        const inicioSemana = getInicioSemanaLunes(semanaActual);
        return Array.from({ length: 7 }, (_, index) => inicioSemana.add(index, 'day'));
    }, [semanaActual]);

    const reservasSemanaVisible = useMemo(() => {
        const inicioSemana = diasSemana[0];
        const finSemana = diasSemana[6];

        return reservasFiltradas.filter((reserva) => {
            const fecha = getReservaDate(reserva);
            if (!fecha) return false;

            return (
                fecha.isSameOrAfter(inicioSemana, 'day') &&
                fecha.isSameOrBefore(finSemana, 'day')
            );
        });
    }, [reservasFiltradas, diasSemana]);

    const reservasPeriodoVisible =
        vistaCalendario === 'semanal' ? reservasSemanaVisible : reservasDelMesVisible;

    const totalPendientesPeriodo = reservasPeriodoVisible.filter(
        (r) => r.estadoCalendario === 'pendiente'
    ).length;

    const totalCompletadasPeriodo = reservasPeriodoVisible.filter(
        (r) => r.estadoCalendario === 'completada'
    ).length;

    const diasCalendario = useMemo(() => {
        const startOfMonth = mesActual.startOf('month');
        const endOfMonth = mesActual.endOf('month');

        const startDay = startOfMonth.day();
        const normalizedStartDay = startDay === 0 ? 6 : startDay - 1;

        const calendarStart = startOfMonth.subtract(normalizedStartDay, 'day');

        const endDay = endOfMonth.day();
        const normalizedEndDay = endDay === 0 ? 6 : endDay - 1;
        const calendarEnd = endOfMonth.add(6 - normalizedEndDay, 'day');

        const days = [];
        let cursor = calendarStart;

        while (cursor.isSameOrBefore(calendarEnd, 'day')) {
            days.push(cursor);
            cursor = cursor.add(1, 'day');
        }

        return days;
    }, [mesActual]);

    const getReservasPorDia = (dia) => {
        return reservasFiltradas
            .filter((reserva) => {
                const fecha = getReservaDate(reserva);
                if (!fecha) return false;

                return fecha.isSame(dia, 'day');
            })
            .sort((a, b) => {
                const minutosA = obtenerMinutosDesdeHorario(a.horario);
                const minutosB = obtenerMinutosDesdeHorario(b.horario);

                return minutosA - minutosB;
            });
    };

    const handleOpenDay = (dia) => {
        setSelectedDay(dia);
        setOpenDayModal(true);
    };

    const handleCloseDay = () => {
        setOpenDayModal(false);
        setSelectedDay(null);
    };

    const handleMesAnterior = () => {
        setMesActual((prev) => prev.subtract(1, 'month'));
    };

    const handleMesSiguiente = () => {
        setMesActual((prev) => prev.add(1, 'month'));
    };

    const handleIrMesActual = () => {
        setMesActual(dayjs().startOf('month'));
    };

    const handleSemanaAnterior = () => {
        setSemanaActual((prev) => getInicioSemanaLunes(prev).subtract(7, 'day'));
    };

    const handleSemanaSiguiente = () => {
        setSemanaActual((prev) => getInicioSemanaLunes(prev).add(7, 'day'));
    };

    const handleIrSemanaActual = () => {
        setSemanaActual(getInicioSemanaLunes(dayjs()));
    };

    const handleCambiarVistaCalendario = () => {
        setVistaCalendario((prev) => (prev === 'semanal' ? 'mensual' : 'semanal'));
    };

    const handleLimpiarFiltros = () => {
        setSearchQuery('');
        setFiltroServicio(null);
    };

    const limpiarFormularioCrear = (dia = selectedDay) => {
        setAutocomplete(null);
        setDireccion('');
        setZona('');
        setInternetPlanURL('');
        setDireccionValidada(false);
        setMostrarPopupFueraZona(false);
        setFechaInstalacion(dia || dayjs());
        setFranjaHoraria('');
        setInternetPlan('');
        setPlanTV('');
        setCreateUsoHorarioPersonalizado(false);
        setTipoInmueble({
            casa: false,
            edificio: false,
            ph: false,
        });
        setFormData({
            name: '',
            apellido: '',
            dni: '',
            telefono: '',
            email: '',
            piso: '',
            departamento: '',
            colocacionCaja: false,
            ingresoEdificio: false,
        });
        setErrors({});
    };

    const handleOpenCreateModal = (dia = selectedDay) => {
        limpiarFormularioCrear(dia);
        setOpenCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
        setErrors({});
    };



    const validarFormularioBase = () => {
        const formErrors = {};

        if (!formData.name) formErrors.name = 'Nombre es requerido';
        if (!formData.apellido) formErrors.apellido = 'Apellido es requerido';
        if (!formData.dni) formErrors.dni = 'DNI es requerido';
        if (!formData.telefono) formErrors.telefono = 'Teléfono es requerido';
        if (!formData.email) formErrors.email = 'Correo es requerido';

        return formErrors;
    };

    const handleSubmitCreate = async () => {
        const tipoSeleccionado = Object.keys(tipoInmueble).find((key) => tipoInmueble[key]);

        if (!tipoSeleccionado) {
            setErrors({ tipoInmueble: 'Elija un tipo de inmueble' });
            return;
        }

        if (!direccion) {
            setErrors({ direccion: 'Dirección es requerida' });
            return;
        }

        const esSoloTV = zona === 'Fuera de Zona de Servicio' || internetPlan === 'Ninguna';

        if (esSoloTV) {
            const formErrors = validarFormularioBase();

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
                    tipo: tipoSeleccionado,
                    esTV: true,
                    usermane: username,
                };

                try {
                    await dispatch(createReservaTV(dataToSend));
                    refreshReservas();
                    setOpenCreateModal(false);
                    mostrarSnackbar('Reserva creada correctamente', 'success');
                } catch (error) {
                    console.error('Error al enviar el formulario:', error);
                    mostrarSnackbar('Ocurrió un error al crear la reserva', 'error');
                }
            }

            return;
        }

        const formErrors = validarFormularioBase();

        if (!fechaInstalacion) formErrors.fechaInstalacion = 'Elegí una fecha';
        if (!franjaHoraria) formErrors.franjaHoraria = 'Elegí un horario';
        if (!internetPlan) formErrors.internetPlan = 'Elegí un plan de internet';

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
                tipo: tipoSeleccionado,
                colocacionCaja: formData.colocacionCaja,
                ingresoEdificio: formData.ingresoEdificio,
            };

            try {
                await dispatch(createReservaForm(dataToSend));
                refreshReservas();
                setOpenCreateModal(false);
                mostrarSnackbar('Reserva creada correctamente', 'success');
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                mostrarSnackbar('Ocurrió un error al crear la reserva', 'error');
            }
        }
    };

    const handleEditClick = (reserva) => {
        setSelectedReserva({ ...reserva });
        setUsoHorarioPersonalizado(false);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedReserva(null);
    };

    const handleSaveChanges = async () => {
        if (!selectedReserva) return;

        try {
            if (selectedReserva.estadoCalendario === 'pendiente') {
                await dispatch(updateReserva(selectedReserva));
            }

            if (selectedReserva.estadoCalendario === 'completada') {
                await dispatch(updateReservaRealizada(selectedReserva));
            }

            refreshReservas();
            setOpenEditModal(false);
            setSelectedReserva(null);
            mostrarSnackbar('Reserva actualizada correctamente', 'success');
        } catch (error) {
            console.error('Error al guardar cambios:', error);
            mostrarSnackbar('Ocurrió un error al editar la reserva', 'error');
        }
    };

    const handleDeleteClick = (reserva) => {
        setReservaAEliminar(reserva);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!reservaAEliminar) return;

        try {
            if (reservaAEliminar.estadoCalendario === 'pendiente') {
                await dispatch(deleteReserva(reservaAEliminar._id));
            }

            if (reservaAEliminar.estadoCalendario === 'completada') {
                await dispatch(deleteReservaCompletada(reservaAEliminar._id));
            }

            refreshReservas();
            setOpenDeleteDialog(false);
            setReservaAEliminar(null);
            mostrarSnackbar('Reserva eliminada correctamente', 'success');
        } catch (error) {
            console.error('Error al eliminar:', error);
            mostrarSnackbar('Ocurrió un error al eliminar la reserva', 'error');
        }
    };

    const handleCrearUsuario = async (row) => {
        try {
            const result = await dispatch(crearUsuarioBCM(row));

            if (result?.success) {
                mostrarSnackbar('Usuario creado correctamente', 'success');
            } else {
                mostrarSnackbar(result?.message || 'No se pudo crear el usuario', 'error');
            }
        } catch (error) {
            console.error('Error al crear usuario:', error);
            mostrarSnackbar('Ocurrió un error al crear el usuario', 'error');
        }
    };

    const handleOpenRealizadaModal = (reserva) => {
        setReservaRealizadaSeleccionada(reserva);
        setFechaRealizada(reserva.fecha ? dayjs(reserva.fecha) : selectedDay || dayjs());
        setHorarioRealizada(reserva.horario || '');
        setOpenRealizadaModal(true);
    };

    const handleConfirmRealizada = async () => {
        if (!fechaRealizada || !horarioRealizada) {
            alert('Seleccione fecha y horario');
            return;
        }

        const reservaActualizada = {
            ...reservaRealizadaSeleccionada,
            fecha: dayjs(fechaRealizada).format('YYYY-MM-DD'),
            horario: horarioRealizada,
        };

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(
                `https://cooperativaback.up.railway.app/api/reservas/actualizar-reserva?id=${reservaRealizadaSeleccionada._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': token,
                    },
                    body: JSON.stringify(reservaActualizada),
                }
            );

            if (!response.ok) throw new Error('Error al actualizar la reserva');

            await dispatch(markReservaAsRealizada(reservaActualizada));

            refreshReservas();
            setOpenRealizadaModal(false);
            setReservaRealizadaSeleccionada(null);
            mostrarSnackbar('Reserva marcada como realizada', 'success');
        } catch (error) {
            console.error(error);
            mostrarSnackbar('Ocurrió un error al marcar como realizada', 'error');
        }
    };

    const handleMarkAsPendiente = async (reserva) => {
        try {
            await dispatch(handleMarkAsPendienteRedux(reserva));
            refreshReservas();
            mostrarSnackbar('Reserva marcada como pendiente', 'success');
        } catch (error) {
            console.error('Error al marcar como pendiente:', error);
            mostrarSnackbar('Ocurrió un error al marcar como pendiente', 'error');
        }
    };

    const reservasDelDiaSeleccionado = selectedDay ? getReservasPorDia(selectedDay) : [];
    const puedeAgregarEnDiaSeleccionado = selectedDay
        ? !selectedDay.startOf('day').isBefore(dayjs().startOf('day'))
        : false;

    const renderReservaCard = (reserva) => {
        const esPendiente = reserva.estadoCalendario === 'pendiente';
        const esCompletada = reserva.estadoCalendario === 'completada';

        return (
            <Paper
                key={`${reserva.estadoCalendario}-${reserva._id}`}
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${
                        esPendiente
                            ? alpha(theme.palette.warning.main, 0.35)
                            : alpha(theme.palette.success.main, 0.35)
                    }`,
                    backgroundColor: esPendiente
                        ? alpha(theme.palette.warning.main, 0.06)
                        : alpha(theme.palette.success.main, 0.06),
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start' }}>
                    <Box>
                        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                            <Chip
                                size="small"
                                label={esPendiente ? 'Pendiente' : 'Completada'}
                                color={esPendiente ? 'warning' : 'success'}
                                sx={{ fontFamily: 'InterTight', fontWeight: 700 }}
                            />

                            <Chip
                                size="small"
                                label={reserva.esTV ? 'TV' : 'Internet'}
                                variant="outlined"
                                sx={{ fontFamily: 'InterTight' }}
                            />

                            {reserva.terceriazado && (
                                <Chip
                                    size="small"
                                    label="Tercerizado"
                                    color="info"
                                    variant="outlined"
                                    sx={{ fontFamily: 'InterTight' }}
                                />
                            )}
                        </Stack>

                        <Typography sx={{ fontFamily: 'InterTight', fontWeight: 800, fontSize: '16px' }}>
                            {getNombreCompleto(reserva)} {reserva.NumeroUsuario ? `- ${reserva.NumeroUsuario}` : ''}
                        </Typography>

                        <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary', fontSize: '14px' }}>
                            {reserva.direccion?.split(',')[0] || 'Sin dirección'}
                        </Typography>

                        <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary', fontSize: '14px', mt: 0.5 }}>
                            Turno: {formatDate(reserva.fecha)} {reserva.horario || ''}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={0.5}>
                        {esPendiente && (
                            <Tooltip title="Crear usuario">
                                <IconButton size="small" onClick={() => handleCrearUsuario(reserva)}>
                                    <PersonIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        )}

                        <Tooltip title="Editar reserva">
                            <IconButton size="small" color="primary" onClick={() => handleEditClick(reserva)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar reserva">
                            <IconButton size="small" color="secondary" onClick={() => handleDeleteClick(reserva)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                            <strong>Servicio:</strong> {reserva.internet || 'No disponible'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                            <strong>TV:</strong> {reserva.tv || 'No disponible'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                            <strong>Inmueble:</strong> {reserva.tipo || 'No disponible'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                            <strong>Teléfono:</strong> {reserva.telefono || 'No disponible'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                            <strong>DNI:</strong> {reserva.DNI || 'No disponible'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                            <strong>Correo:</strong> {reserva.email || 'No disponible'}
                        </Typography>
                    </Grid>

                    {(reserva.Piso || reserva.Dpto) && (
                        <Grid item xs={12}>
                            <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                                <strong>Piso/Dpto:</strong> {reserva.Piso || '-'} / {reserva.Dpto || '-'}
                            </Typography>
                        </Grid>
                    )}

                    {reserva.observaciones && (
                        <Grid item xs={12}>
                            <Typography sx={{ fontFamily: 'InterTight', fontSize: '14px' }}>
                                <strong>Observaciones:</strong> {reserva.observaciones}
                            </Typography>
                        </Grid>
                    )}
                </Grid>

                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    {esPendiente && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleOpenRealizadaModal(reserva)}
                            sx={{ textTransform: 'capitalize', borderRadius: '50px', fontFamily: 'InterTight' }}
                        >
                            Marcar realizada
                        </Button>
                    )}

                    {esCompletada && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<ReplayIcon />}
                            onClick={() => handleMarkAsPendiente(reserva)}
                            sx={{ textTransform: 'capitalize', borderRadius: '50px', fontFamily: 'InterTight' }}
                        >
                            Marcar pendiente
                        </Button>
                    )}
                </Stack>
            </Paper>
        );
    };

    const renderReservaMiniCard = (reserva) => {
        const esPendiente = reserva.estadoCalendario === 'pendiente';

        return (
            <Paper
                key={`${reserva.estadoCalendario}-${reserva._id}`}
                elevation={0}
                onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(reserva);
                }}
                sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: `1px solid ${
                        esPendiente
                            ? alpha(theme.palette.warning.main, 0.35)
                            : alpha(theme.palette.success.main, 0.35)
                    }`,
                    backgroundColor: esPendiente
                        ? alpha(theme.palette.warning.main, 0.08)
                        : alpha(theme.palette.success.main, 0.08),
                    transition: '0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0.5 }}>
                    <Chip
                        size="small"
                        label={esPendiente ? 'Pendiente' : 'Completada'}
                        color={esPendiente ? 'warning' : 'success'}
                        sx={{
                            height: 20,
                            fontSize: 10,
                            fontFamily: 'InterTight',
                            fontWeight: 800,
                            maxWidth: '100%',
                        }}
                    />

                    <Stack direction="row" spacing={0.2}>
                        <Tooltip title="Editar">
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(reserva);
                                }}
                                sx={{ width: 24, height: 24 }}
                            >
                                <EditIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Eliminar">
                            <IconButton
                                size="small"
                                color="secondary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(reserva);
                                }}
                                sx={{ width: 24, height: 24 }}
                            >
                                <DeleteIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Box>

                <Typography
                    sx={{
                        fontFamily: 'InterTight',
                        fontWeight: 900,
                        fontSize: 12.5,
                        mt: 0.8,
                        lineHeight: 1.2,
                    }}
                >
                    {reserva.horario ? `${reserva.horario} - ` : ''}
                    {getNombreCompleto(reserva)}
                </Typography>

                <Typography
                    sx={{
                        fontFamily: 'InterTight',
                        color: 'text.secondary',
                        fontSize: 11.5,
                        mt: 0.4,
                        lineHeight: 1.2,
                    }}
                >
                    {reserva.direccion?.split(',')[0] || 'Sin dirección'}
                </Typography>

                <Stack direction="row" spacing={0.5} sx={{ mt: 0.8, flexWrap: 'wrap', gap: 0.4 }}>
                    <Chip
                        size="small"
                        label={reserva.esTV ? 'TV' : 'Internet'}
                        variant="outlined"
                        sx={{
                            height: 19,
                            fontSize: 10,
                            fontFamily: 'InterTight',
                        }}
                    />

                    {reserva.terceriazado && (
                        <Chip
                            size="small"
                            label="Tercerizado"
                            color="info"
                            variant="outlined"
                            sx={{
                                height: 19,
                                fontSize: 10,
                                fontFamily: 'InterTight',
                            }}
                        />
                    )}
                </Stack>

                <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                    {esPendiente && (
                        <>
                            <Tooltip title="Crear usuario">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCrearUsuario(reserva);
                                    }}
                                    sx={{
                                        width: 25,
                                        height: 25,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: 15 }} />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Marcar realizada">
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenRealizadaModal(reserva);
                                    }}
                                    sx={{
                                        width: 25,
                                        height: 25,
                                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                                    }}
                                >
                                    <CheckCircleIcon sx={{ fontSize: 15 }} />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}

                    {!esPendiente && (
                        <Tooltip title="Marcar pendiente">
                            <IconButton
                                size="small"
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkAsPendiente(reserva);
                                }}
                                sx={{
                                    width: 25,
                                    height: 25,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                }}
                            >
                                <ReplayIcon sx={{ fontSize: 15 }} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </Paper>
        );
    };

    if (reservasLeer) {
        return (
            <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: 6 }}>
                <Alert severity="info">
                    El calendario está disponible únicamente para usuarios con permiso de gestión de reservas.
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '90%', margin: 'auto', marginTop: '30px', marginBottom: 6 }}>
            <GlobalStyles
                styles={{
                    '.pac-container': {
                        zIndex: '999999 !important',
                    },
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    gap: 2,
                    flexWrap: 'wrap',
                    mb: 1,
                }}
            >
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontFamily: 'InterTight' }}>
                        Calendario de reservas
                    </Typography>

                    <Typography variant="subtitle1" sx={{ fontFamily: 'InterTight', fontWeight: 700 }}>
                        Mostrando {reservasPeriodoVisible.length}{' '}
                        {vistaCalendario === 'semanal'
                            ? 'reservas de la semana visible'
                            : 'reservas del mes visible'}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCambiarVistaCalendario}
                    sx={{
                        textTransform: 'capitalize',
                        borderRadius: '50px',
                        fontFamily: 'InterTight',
                        px: 3,
                    }}
                >
                    {vistaCalendario === 'semanal' ? 'Calendario mensual' : 'Calendario semanal'}
                </Button>
            </Box>

            {/* Resumen */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        }}
                    >
                        <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary' }}>
                            Total {vistaCalendario === 'semanal' ? 'de la semana' : 'del mes'}
                        </Typography>
                        <Typography variant="h5" sx={{ fontFamily: 'InterTight', fontWeight: 900 }}>
                            {reservasPeriodoVisible.length}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            border: `1px solid ${alpha(theme.palette.warning.main, 0.25)}`,
                            backgroundColor: alpha(theme.palette.warning.main, 0.07),
                        }}
                    >
                        <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary' }}>
                            Pendientes
                        </Typography>
                        <Typography variant="h5" sx={{ fontFamily: 'InterTight', fontWeight: 900 }}>
                            {totalPendientesPeriodo}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            border: `1px solid ${alpha(theme.palette.success.main, 0.25)}`,
                            backgroundColor: alpha(theme.palette.success.main, 0.07),
                        }}
                    >
                        <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary' }}>
                            Completadas
                        </Typography>
                        <Typography variant="h5" sx={{ fontFamily: 'InterTight', fontWeight: 900 }}>
                            {totalCompletadasPeriodo}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Filtros */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                    backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : 'background.paper',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 1.5,
                    }}
                >
                    <TextField
                        label="Buscar"
                        variant="outlined"
                        size="small"
                        sx={{ width: 220, backgroundColor: 'background.paper' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        <Button
                            variant={filtroServicio === 'internet' ? 'contained' : 'outlined'}
                            color="info"
                            onClick={() => setFiltroServicio('internet')}
                            sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 3, fontFamily: 'InterTight' }}
                        >
                            Reservas Internet
                        </Button>

                        <Button
                            variant={filtroServicio === 'tv' ? 'contained' : 'outlined'}
                            color="info"
                            onClick={() => setFiltroServicio('tv')}
                            sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 3, fontFamily: 'InterTight' }}
                        >
                            Reservas TV
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleLimpiarFiltros}
                            sx={{ textTransform: 'capitalize', borderRadius: '50px', px: 3, fontFamily: 'InterTight' }}
                        >
                            Limpiar filtros
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {/* Navegación semanal / mensual */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                }}
            >
                {vistaCalendario === 'semanal' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                        <IconButton onClick={handleSemanaAnterior}>
                            <ChevronLeftIcon />
                        </IconButton>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'InterTight',
                                    fontWeight: 800,
                                }}
                            >
                                Semana del {diasSemana[0].format('DD/MM')} al {diasSemana[6].format('DD/MM/YYYY')}
                            </Typography>

                            <Button
                                size="small"
                                onClick={handleIrSemanaActual}
                                sx={{ textTransform: 'capitalize', fontFamily: 'InterTight' }}
                            >
                                Ir a la semana actual
                            </Button>
                        </Box>

                        <IconButton onClick={handleSemanaSiguiente}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                        <IconButton onClick={handleMesAnterior}>
                            <ChevronLeftIcon />
                        </IconButton>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'InterTight',
                                    fontWeight: 900,
                                    textTransform: 'capitalize',
                                }}
                            >
                                {mesActual.format('MMMM YYYY')}
                            </Typography>

                            <Button
                                size="small"
                                onClick={handleIrMesActual}
                                sx={{ textTransform: 'capitalize', fontFamily: 'InterTight' }}
                            >
                                Ir al mes actual
                            </Button>
                        </Box>

                        <IconButton onClick={handleMesSiguiente}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                )}
            </Paper>

            {/* Vista semanal */}
            {vistaCalendario === 'semanal' && (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, minmax(170px, 1fr))',
                            minWidth: 1200,
                        }}
                    >
                        {diasSemana.map((dia) => {
                            const reservasDia = getReservasPorDia(dia);
                            const isToday = dia.isSame(dayjs(), 'day');
                            const puedeAgregar = !dia.startOf('day').isBefore(dayjs().startOf('day'));

                            return (
                                <Box
                                    key={dia.format('YYYY-MM-DD')}
                                    sx={{
                                        minHeight: 560,
                                        borderRight: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
                                        backgroundColor: isToday
                                            ? alpha(theme.palette.primary.main, 0.035)
                                            : theme.palette.background.paper,
                                    }}
                                >
                                    <Box
                                        onClick={() => handleOpenDay(dia)}
                                        sx={{
                                            p: 1.4,
                                            cursor: 'pointer',
                                            borderBottom: `1px solid ${alpha('#fff', 0.18)}`,
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#fff',
                                            transition: '0.2s ease',
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: 'InterTight',
                                                    fontWeight: 800,
                                                    fontSize: { xs: 12, md: 14 },
                                                    lineHeight: 1.2,
                                                    color: '#fff',
                                                }}
                                            >
                                                {capitalizarPrimeraLetra(dia.format('dddd'))} {dia.format('DD/MM')}
                                            </Typography>

                                            {reservasDia.length > 0 && (
                                                <Chip
                                                    size="small"
                                                    label={reservasDia.length}
                                                    sx={{
                                                        height: 22,
                                                        minWidth: 28,
                                                        fontFamily: 'InterTight',
                                                        fontWeight: 900,
                                                        backgroundColor: '#fff',
                                                        color: theme.palette.primary.main,
                                                        '& .MuiChip-label': {
                                                            px: 1,
                                                        },
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Box>

                                    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {reservasDia.length === 0 ? (
                                            <Paper
                                                elevation={0}
                                                onClick={() => handleOpenDay(dia)}
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                    border: `1px dashed ${alpha(theme.palette.divider, 0.9)}`,
                                                    backgroundColor: alpha(theme.palette.grey[500], 0.035),
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontFamily: 'InterTight',
                                                        color: 'text.secondary',
                                                        fontSize: 13,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Día libre
                                                </Typography>

                                                {puedeAgregar && (
                                                    <Button
                                                        size="small"
                                                        startIcon={<AddIcon />}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleOpenCreateModal(dia);
                                                        }}
                                                        sx={{
                                                            mt: 1,
                                                            textTransform: 'capitalize',
                                                            fontFamily: 'InterTight',
                                                        }}
                                                    >
                                                        Agregar
                                                    </Button>
                                                )}
                                            </Paper>
                                        ) : (
                                            <>
                                                {reservasDia.map((reserva) => renderReservaMiniCard(reserva))}

                                                {puedeAgregar && (
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<AddIcon />}
                                                        onClick={() => handleOpenCreateModal(dia)}
                                                        sx={{
                                                            textTransform: 'capitalize',
                                                            borderRadius: '50px',
                                                            fontFamily: 'InterTight',
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        Agregar reserva
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Paper>
            )}


            {/* Vista mensual */}
            {vistaCalendario === 'mensual' && (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                    }}
                >
                    <Grid container columns={7}>
                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dayName) => (
                            <Grid
                                item
                                xs={1}
                                key={dayName}
                                sx={{
                                    p: 1.4,
                                    textAlign: 'center',
                                    backgroundColor: theme.palette.primary.main,
                                    color: '#fff',
                                    borderRight: `1px solid ${alpha('#fff', 0.18)}`,
                                }}
                            >
                                <Typography sx={{ fontFamily: 'InterTight', fontWeight: 800, fontSize: { xs: 12, md: 14 } }}>
                                    {dayName}
                                </Typography>
                            </Grid>
                        ))}

                        {diasCalendario.map((dia) => {
                            const reservasDia = getReservasPorDia(dia);
                            const pendientesDia = reservasDia.filter((r) => r.estadoCalendario === 'pendiente');
                            const completadasDia = reservasDia.filter((r) => r.estadoCalendario === 'completada');

                            const isCurrentMonth = dia.isSame(mesActual, 'month');
                            const isToday = dia.isSame(dayjs(), 'day');
                            const hasPendientes = pendientesDia.length > 0;
                            const hasCompletadas = completadasDia.length > 0;
                            const isMixed = hasPendientes && hasCompletadas;

                            let bgColor = theme.palette.background.paper;
                            let borderColor = alpha(theme.palette.divider, 0.85);

                            if (hasPendientes && !hasCompletadas) {
                                bgColor = alpha(theme.palette.warning.main, 0.1);
                                borderColor = alpha(theme.palette.warning.main, 0.35);
                            }

                            if (hasCompletadas && !hasPendientes) {
                                bgColor = alpha(theme.palette.success.main, 0.1);
                                borderColor = alpha(theme.palette.success.main, 0.35);
                            }

                            if (isMixed) {
                                bgColor = alpha(theme.palette.primary.main, 0.08);
                                borderColor = alpha(theme.palette.primary.main, 0.35);
                            }

                            if (!isCurrentMonth) {
                                bgColor = alpha(theme.palette.grey[500], 0.06);
                            }

                            return (
                                <Grid
                                    item
                                    xs={1}
                                    key={dia.format('YYYY-MM-DD')}
                                    onClick={() => handleOpenDay(dia)}
                                    sx={{
                                        minHeight: { xs: 118, md: 145 },
                                        p: 1,
                                        cursor: 'pointer',
                                        backgroundColor: bgColor,
                                        borderRight: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
                                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.75)}`,
                                        opacity: isCurrentMonth ? 1 : 0.45,
                                        transition: '0.2s ease',
                                        '&:hover': {
                                            transform: 'translateY(-1px)',
                                            boxShadow: `inset 0 0 0 2px ${borderColor}`,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.06),
                                        },
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography
                                            sx={{
                                                width: 28,
                                                height: 28,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontFamily: 'InterTight',
                                                fontWeight: 900,
                                                fontSize: 14,
                                                backgroundColor: isToday ? theme.palette.primary.main : 'transparent',
                                                color: isToday ? '#fff' : 'text.primary',
                                            }}
                                        >
                                            {dia.format('D')}
                                        </Typography>

                                        {reservasDia.length > 0 && (
                                            <Chip
                                                size="small"
                                                label={reservasDia.length}
                                                color={isMixed ? 'primary' : hasPendientes ? 'warning' : 'success'}
                                                sx={{
                                                    height: 22,
                                                    minWidth: 28,
                                                    fontFamily: 'InterTight',
                                                    fontWeight: 800,
                                                }}
                                            />
                                        )}
                                    </Box>

                                    <Box sx={{ mt: 1 }}>
                                        {reservasDia.length === 0 ? (
                                            <Typography
                                                sx={{
                                                    fontFamily: 'InterTight',
                                                    color: 'text.secondary',
                                                    fontSize: 12,
                                                    mt: 1,
                                                }}
                                            >
                                                Día libre
                                            </Typography>
                                        ) : (
                                            <Stack spacing={0.6}>
                                                {pendientesDia.length > 0 && (
                                                    <Chip
                                                        size="small"
                                                        label={`${pendientesDia.length} pendiente${pendientesDia.length > 1 ? 's' : ''}`}
                                                        color="warning"
                                                        sx={{ justifyContent: 'flex-start', fontFamily: 'InterTight', fontSize: 11 }}
                                                    />
                                                )}

                                                {completadasDia.length > 0 && (
                                                    <Chip
                                                        size="small"
                                                        label={`${completadasDia.length} completada${completadasDia.length > 1 ? 's' : ''}`}
                                                        color="success"
                                                        sx={{ justifyContent: 'flex-start', fontFamily: 'InterTight', fontSize: 11 }}
                                                    />
                                                )}

                                                {reservasDia.slice(0, 2).map((reserva) => (
                                                    <Typography
                                                        key={`${reserva.estadoCalendario}-${reserva._id}`}
                                                        sx={{
                                                            fontFamily: 'InterTight',
                                                            fontSize: 12,
                                                            lineHeight: 1.25,
                                                            color: 'text.secondary',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {reserva.horario ? `${reserva.horario} - ` : ''}
                                                        {getNombreCompleto(reserva)}
                                                    </Typography>
                                                ))}

                                                {reservasDia.length > 2 && (
                                                    <Typography
                                                        sx={{
                                                            fontFamily: 'InterTight',
                                                            fontSize: 12,
                                                            fontWeight: 800,
                                                            color: 'primary.main',
                                                        }}
                                                    >
                                                        +{reservasDia.length - 2} más
                                                    </Typography>
                                                )}
                                            </Stack>
                                        )}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Paper>
            )}

            {/* Modal del día */}
            <Dialog open={openDayModal} onClose={handleCloseDay} fullWidth maxWidth="md">
                <DialogTitle sx={{ pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                        <Box>
                            <Typography sx={{ fontFamily: 'InterTight', fontWeight: 900, fontSize: 22 }}>
                                {selectedDay
                                    ? capitalizarPrimeraLetra(selectedDay.format('dddd DD [de] MMMM [de] YYYY'))
                                    : ''}
                            </Typography>

                            <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary', fontSize: 14 }}>
                                {reservasDelDiaSeleccionado.length > 0
                                    ? `${reservasDelDiaSeleccionado.length} reserva${reservasDelDiaSeleccionado.length > 1 ? 's' : ''} en este día`
                                    : 'No hay reservas cargadas para este día'}
                            </Typography>
                        </Box>

                        <IconButton onClick={handleCloseDay}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent dividers>
                    {reservasDelDiaSeleccionado.length === 0 ? (
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                textAlign: 'center',
                                border: `1px dashed ${alpha(theme.palette.primary.main, 0.4)}`,
                                backgroundColor: alpha(theme.palette.primary.main, 0.04),
                            }}
                        >
                            <Typography sx={{ fontFamily: 'InterTight', fontWeight: 800, mb: 1 }}>
                                Día libre
                            </Typography>

                            <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary', mb: 2 }}>
                                Este día no tiene reservas pendientes ni completadas.
                            </Typography>

                            {puedeAgregarEnDiaSeleccionado && (
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleOpenCreateModal(selectedDay)}
                                    sx={{ textTransform: 'capitalize', borderRadius: '50px', fontFamily: 'InterTight', px: 3 }}
                                >
                                    Agregar reserva
                                </Button>
                            )}
                        </Paper>
                    ) : (
                        <Stack spacing={2}>
                            {reservasDelDiaSeleccionado.map((reserva) => renderReservaCard(reserva))}
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions>
                    {reservasDelDiaSeleccionado.length > 0 && puedeAgregarEnDiaSeleccionado && (
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenCreateModal(selectedDay)}
                            sx={{ textTransform: 'capitalize', borderRadius: '50px', fontFamily: 'InterTight' }}
                        >
                            Agregar otra reserva
                        </Button>
                    )}

                    <Button onClick={handleCloseDay} sx={{ textTransform: 'capitalize', fontFamily: 'InterTight' }}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal crear reserva */}
            <Dialog open={openCreateModal} onClose={handleCloseCreateModal} fullWidth maxWidth="md">
                <DialogTitle>
                    <Typography sx={{ fontFamily: 'InterTight', fontWeight: 900, fontSize: 22 }}>
                        Agregar reserva
                    </Typography>

                    <Typography sx={{ fontFamily: 'InterTight', color: 'text.secondary', fontSize: 14 }}>
                        {fechaInstalacion ? `Fecha seleccionada: ${formatDate(fechaInstalacion)}` : 'Completá los datos de la reserva'}
                    </Typography>
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing={1.5}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                required
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleInputChange}
                                error={!!errors.apellido}
                                helperText={errors.apellido}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12} sm={6}>
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
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Correo"
                                variant="outlined"
                                fullWidth
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={onPlaceChanged}
                                options={{
                                    types: ['geocode'],
                                    componentRestrictions: { country: 'ar' },
                                }}
                            >
                                <TextField
                                    label="Dirección"
                                    variant="outlined"
                                    fullWidth
                                    id="direccion"
                                    value={direccion}
                                    onChange={(e) => {
                                        setDireccion(e.target.value);
                                        setDireccionValidada(false);
                                        setZona('');
                                    }}
                                    error={!!errors.direccion}
                                    helperText={errors.direccion}
                                />
                            </Autocomplete>
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    mt: 0.5,
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}
                                >
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

                                <Button
                                    variant="contained"
                                    onClick={verificarCobertura}
                                    sx={{
                                        textTransform: 'capitalize',
                                        borderRadius: '50px',
                                        px: 4,
                                        fontFamily: 'InterTight',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Verificar cobertura
                                </Button>
                            </Box>

                            {errors.tipoInmueble && (
                                <Typography sx={{ color: 'error.main', fontSize: 12, textAlign: 'center', mt: 0.5 }}>
                                    {errors.tipoInmueble}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Piso"
                                name="piso"
                                value={formData.piso}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Departamento"
                                name="departamento"
                                value={formData.departamento}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>

                        {direccionValidada && (
                            <>
                                {((zona ?? '').trim() === '' ||
                                    ((zona ?? '').trim() === 'Direccion en Zona 1' && internetPlan !== 'Ninguna')) && (
                                    <Grid item xs={12} sm={6}>
                                        <Select
                                            displayEmpty
                                            fullWidth
                                            id="internet-plan-select"
                                            value={internetPlan}
                                            onChange={handleInternetChange}
                                            inputProps={{ 'aria-label': 'Plan que solicita de Internet' }}
                                            error={!!errors.internetPlan}
                                        >
                                            <MenuItem disabled value="">
                                                Plan que solicita de Internet
                                            </MenuItem>
                                            <MenuItem value="300 MB">300 megas</MenuItem>
                                            <MenuItem value="600 MB">600 megas</MenuItem>
                                            <MenuItem value="1000 MB">1000 megas</MenuItem>
                                            <MenuItem value="Ninguna">Ninguna</MenuItem>
                                        </Select>

                                        {errors.internetPlan && (
                                            <Typography sx={{ color: 'error.main', fontSize: 12, mt: 0.5 }}>
                                                {errors.internetPlan}
                                            </Typography>
                                        )}
                                    </Grid>
                                )}

                                <Grid item xs={12} sm={6}>
                                    {((zona ?? '').trim() === '' ||
                                        ((zona ?? '').trim() === 'Direccion en Zona 1' && internetPlan !== 'Ninguna')) ? (
                                        <Select
                                            fullWidth
                                            value={planTV}
                                            onChange={(e) => setPlanTV(e.target.value)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Plan que solicita de TV' }}
                                        >
                                            <MenuItem disabled value="">
                                                Plan que solicita de TV
                                            </MenuItem>
                                            <MenuItem value="TV full" disabled={internetPlan === 'Ninguna'}>
                                                TV full + Pack Fútbol + Max gratis
                                            </MenuItem>
                                            <MenuItem value="Pack adicional" disabled={internetPlan === 'Ninguna'}>
                                                Pack TV adicional $10000
                                            </MenuItem>
                                            <MenuItem value="Ninguno" disabled={internetPlan === 'Ninguna'}>
                                                Ninguno
                                            </MenuItem>
                                        </Select>
                                    ) : (
                                        <Select
                                            fullWidth
                                            value={planTV}
                                            onChange={(e) => setPlanTV(e.target.value)}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Plan que solicita de TV' }}
                                        >
                                            <MenuItem disabled value="">
                                                Plan que solicita de TV
                                            </MenuItem>
                                            <MenuItem value="Futbol fuera de zona" disabled={internetPlan === 'Ninguno'}>
                                                TV $12000
                                            </MenuItem>
                                            <MenuItem value="Ninguno">
                                                Ninguno
                                            </MenuItem>
                                        </Select>
                                    )}
                                </Grid>

                                {((zona ?? '').trim() === '' ||
                                    ((zona ?? '').trim() === 'Direccion en Zona 1' && internetPlan !== 'Ninguna')) && (
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={createUsoHorarioPersonalizado}
                                                    onChange={(e) => setCreateUsoHorarioPersonalizado(e.target.checked)}
                                                    color="primary"
                                                />
                                            }
                                            label={createUsoHorarioPersonalizado ? 'Horario personalizado' : 'Horario estándar'}
                                            sx={{ mt: 0.5 }}
                                        />

                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    name="colocacionCaja"
                                                    checked={formData.colocacionCaja}
                                                    onChange={handleSwitchChange}
                                                    color="primary"
                                                />
                                            }
                                            label="Colocación de caja"
                                            sx={{ mt: 2 }}
                                        />

                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    name="ingresoEdificio"
                                                    checked={formData.ingresoEdificio}
                                                    onChange={handleSwitchChange}
                                                    color="primary"
                                                />
                                            }
                                            label="Ingreso a edificio"
                                            sx={{ mt: 2 }}
                                        />

                                        {createUsoHorarioPersonalizado ? (
                                            <FechaPersonalizada
                                                fechaInstalacion={fechaInstalacion}
                                                setFechaInstalacion={setFechaInstalacion}
                                                franjaHoraria={franjaHoraria}
                                                setFranjaHoraria={setFranjaHoraria}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    mt: 1,
                                                    width: '100%',

                                                    '& > div': {
                                                        width: '100% !important',
                                                        maxWidth: '100% !important',
                                                        display: 'flex !important',
                                                        flexDirection: 'column !important',
                                                        gap: '14px !important',
                                                        alignItems: 'stretch !important',
                                                    },

                                                    '& .MuiFormControl-root': {
                                                        width: '100% !important',
                                                        maxWidth: '100% !important',
                                                        minWidth: '0 !important',
                                                        margin: '0 !important',
                                                    },

                                                    '& .MuiTextField-root': {
                                                        width: '100% !important',
                                                        maxWidth: '100% !important',
                                                        minWidth: '0 !important',
                                                        margin: '0 !important',
                                                    },

                                                    '& .MuiInputBase-root': {
                                                        width: '100% !important',
                                                        maxWidth: '100% !important',
                                                        minHeight: '56px !important',
                                                        height: '56px !important',
                                                        overflow: 'hidden !important',
                                                        alignItems: 'center !important',
                                                    },

                                                    '& .MuiOutlinedInput-root': {
                                                        width: '100% !important',
                                                        maxWidth: '100% !important',
                                                        minHeight: '56px !important',
                                                        height: '56px !important',
                                                        overflow: 'hidden !important',
                                                    },

                                                    '& .MuiInputBase-input': {
                                                        height: 'auto !important',
                                                        padding: '16.5px 14px !important',
                                                        overflow: 'hidden !important',
                                                        boxSizing: 'border-box',
                                                    },

                                                    '& .MuiSelect-select': {
                                                        minHeight: 'auto !important',
                                                        padding: '16.5px 14px !important',
                                                        display: 'flex !important',
                                                        alignItems: 'center !important',
                                                        boxSizing: 'border-box',
                                                    },

                                                    '& input': {
                                                        width: '100% !important',
                                                        boxSizing: 'border-box',
                                                    },
                                                }}
                                            >
                                                <BasicDatePicker
                                                    fechaInstalacion={fechaInstalacion}
                                                    setFechaInstalacion={setFechaInstalacion}
                                                    franjaHoraria={franjaHoraria}
                                                    setFranjaHoraria={setFranjaHoraria}
                                                    tipoInmueble={Object.keys(tipoInmueble).find((key) => tipoInmueble[key])}
                                                    sinEstilo={true}
                                                />
                                            </Box>
                                        )}

                                        {(errors.fechaInstalacion || errors.franjaHoraria) && (
                                            <Typography sx={{ color: 'error.main', fontSize: 12, mt: 1 }}>
                                                {errors.fechaInstalacion || errors.franjaHoraria}
                                            </Typography>
                                        )}
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseCreateModal} sx={{ textTransform: 'capitalize', fontFamily: 'InterTight' }}>
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmitCreate}
                        sx={{ textTransform: 'capitalize', borderRadius: '50px', fontFamily: 'InterTight', px: 3 }}
                    >
                        Crear reserva
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal fuera de zona */}
            <Dialog
                open={mostrarPopupFueraZona}
                onClose={() => setMostrarPopupFueraZona(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogContent>
                    <Typography variant="h6" align="center" sx={{ fontFamily: 'InterTight' }}>
                        La dirección se encuentra fuera de la zona de cobertura
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={() => setMostrarPopupFueraZona(false)}
                        sx={{
                            borderRadius: '25px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            px: 4,
                            marginBottom: '20px',
                        }}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal edición */}
            <Modal open={openEditModal} onClose={handleCloseEditModal} sx={modalStyles}>
                <MuiBox sx={modalBoxStyles(theme)}>
                    {selectedReserva && (
                        <>
                            <Typography variant="h6" sx={{ fontFamily: 'InterTight', fontWeight: 900, mb: 1 }}>
                                Editar reserva
                            </Typography>

                            <Chip
                                size="small"
                                label={selectedReserva.estadoCalendario === 'pendiente' ? 'Pendiente' : 'Completada'}
                                color={selectedReserva.estadoCalendario === 'pendiente' ? 'warning' : 'success'}
                                sx={{ mb: 2, fontFamily: 'InterTight', fontWeight: 700 }}
                            />

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, gap: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={!selectedReserva.esTV}
                                            onChange={() =>
                                                setSelectedReserva((prev) => ({
                                                    ...prev,
                                                    esTV: false,
                                                }))
                                            }
                                            color="primary"
                                        />
                                    }
                                    label="Servicio Internet"
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedReserva.esTV}
                                            onChange={() =>
                                                setSelectedReserva((prev) => ({
                                                    ...prev,
                                                    esTV: true,
                                                }))
                                            }
                                            color="primary"
                                        />
                                    }
                                    label="Solo TV"
                                />
                            </Box>

                            <Grid container spacing={1.5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Nombre"
                                        fullWidth
                                        value={selectedReserva.nombre || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, nombre: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Apellido"
                                        fullWidth
                                        value={selectedReserva.apellido || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, apellido: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Número de usuario"
                                        fullWidth
                                        value={selectedReserva.NumeroUsuario || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, NumeroUsuario: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="DNI"
                                        fullWidth
                                        value={selectedReserva.DNI || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, DNI: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Correo"
                                        fullWidth
                                        value={selectedReserva.email || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, email: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Dirección"
                                        fullWidth
                                        value={selectedReserva.direccion || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, direccion: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Piso"
                                        fullWidth
                                        value={selectedReserva.Piso || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, Piso: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Dpto"
                                        fullWidth
                                        value={selectedReserva.Dpto || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, Dpto: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Teléfono"
                                        fullWidth
                                        value={selectedReserva.telefono || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, telefono: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Servicio"
                                        fullWidth
                                        value={selectedReserva.internet || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, internet: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="TV"
                                        fullWidth
                                        value={selectedReserva.tv || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, tv: e.target.value })
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={selectedReserva.terceriazado || false}
                                                onChange={(e) =>
                                                    setSelectedReserva({
                                                        ...selectedReserva,
                                                        terceriazado: e.target.checked,
                                                    })
                                                }
                                                color="primary"
                                            />
                                        }
                                        label="Tercerizado"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={usoHorarioPersonalizado}
                                                onChange={(e) => setUsoHorarioPersonalizado(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={usoHorarioPersonalizado ? 'Horario personalizado' : 'Horario estándar'}
                                    />

                                    {usoHorarioPersonalizado ? (
                                        <FechaPersonalizada
                                            fechaInstalacion={dayjs(selectedReserva?.fecha || null)}
                                            setFechaInstalacion={(nuevaFecha) =>
                                                setSelectedReserva((prev) => ({
                                                    ...prev,
                                                    fecha: nuevaFecha,
                                                    horario: '',
                                                }))
                                            }
                                            franjaHoraria={selectedReserva?.horario || ''}
                                            setFranjaHoraria={(nuevoHorario) =>
                                                setSelectedReserva((prev) => ({
                                                    ...prev,
                                                    horario: nuevoHorario,
                                                }))
                                            }
                                        />
                                    ) : (
                                        <BasicDatePicker
                                            sinEstilo={true}
                                            fechaInstalacion={dayjs(selectedReserva?.fecha || null)}
                                            setFechaInstalacion={(nuevaFecha) =>
                                                setSelectedReserva((prev) => ({
                                                    ...prev,
                                                    fecha: nuevaFecha,
                                                    horario: '',
                                                }))
                                            }
                                            franjaHoraria={selectedReserva?.horario || ''}
                                            setFranjaHoraria={(nuevoHorario) =>
                                                setSelectedReserva((prev) => ({
                                                    ...prev,
                                                    horario: nuevoHorario,
                                                }))
                                            }
                                            tipoInmueble={selectedReserva?.tipo?.toLowerCase()}
                                        />
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Observaciones"
                                        fullWidth
                                        value={selectedReserva.observaciones || ''}
                                        onChange={(e) =>
                                            setSelectedReserva({ ...selectedReserva, observaciones: e.target.value })
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                                <Button variant="outlined" color="secondary" onClick={handleCloseEditModal}>
                                    Cancelar
                                </Button>

                                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                                    Guardar cambios
                                </Button>
                            </Box>
                        </>
                    )}
                </MuiBox>
            </Modal>

            {/* Modal marcar realizada */}
            <Dialog open={openRealizadaModal} onClose={() => setOpenRealizadaModal(false)}>
                <DialogTitle sx={{ mb: -2 }}>Ingresa fecha y hora de instalación</DialogTitle>

                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{ mt: 1 }}
                            label="Fecha"
                            format="DD/MM/YYYY"
                            value={fechaRealizada}
                            onChange={(newDate) => setFechaRealizada(newDate)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>

                    <TextField
                        label="Horario"
                        type="time"
                        value={horarioRealizada}
                        onChange={(e) => setHorarioRealizada(e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenRealizadaModal(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={handleConfirmRealizada}>
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirmación eliminación */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirmar eliminación</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar esta reserva?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
}