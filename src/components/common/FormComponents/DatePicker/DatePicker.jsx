//Importaciones:
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHorariosDisponibles } from '../../../../../redux/actions/formActions';

//JSX:
dayjs.locale({
    name: 'es-custom',
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: dayjs.Ls['es'].weekdays,
    weekdaysShort: dayjs.Ls['es'].weekdaysShort,
    weekdaysMin: dayjs.Ls['es'].weekdaysMin,
    formats: dayjs.Ls['es'].formats,
    ordinal: dayjs.Ls['es'].ordinal,
    weekStart: dayjs.Ls['es'].weekStart,
}, null, true);

dayjs.locale('es-custom');

export default function BasicDatePicker({ fechaInstalacion, setFechaInstalacion, franjaHoraria, setFranjaHoraria, tipoInmueble , sinEstilo = false}) {
    const dispatch = useDispatch();
    const { horariosDisponibles, loading, error } = useSelector((state) => state.form);

    
    // Establecemos el número de días a bloquear según el tipo de inmueble
    const diasBloqueados = tipoInmueble === 'edificio' ? 5 : tipoInmueble === 'casa' || tipoInmueble === 'ph' ? 2 : 0;

    const estilos = sinEstilo
    ? {}
    : {
        backgroundColor: "#edeaff",
        borderRadius: "25px",
        '& .MuiOutlinedInput-root': {
            borderRadius: "25px",
            backgroundColor: "#edeaff",
            '& fieldset': {
            borderColor: '#ccc',
            },
            '&:hover fieldset': {
            borderColor: '#8048ff',
            },
            '&.Mui-focused fieldset': {
            borderColor: '#8048ff',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#161616',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#8048ff',
        },
        };

    // Función para calcular días hábiles
    const calcularDiasHabiles = (fechaInicio, diasAHabilitar) => {
        let diasContados = 0;
        let fecha = dayjs(fechaInicio);

        while (diasContados < diasAHabilitar) {
            fecha = fecha.add(1, 'day'); // Avanzar al siguiente día
            // Si el día no es sábado (6) ni domingo (0), contamos el día
            if (fecha.day() !== 0 && fecha.day() !== 6) {
                diasContados++;
            }
        }
        return fecha;
    };

    // Función para deshabilitar los días no permitidos
    const shouldDisableDate = (date) => {
        const today = dayjs();
        const diasHabiles = diasBloqueados; 
        const disableFrom = calcularDiasHabiles(today, diasHabiles);

        // Deshabilitar fechas antes de "disableFrom" y también deshabilitar fines de semana (sábado y domingo)
        return date.isBefore(disableFrom, 'day') || date.day() === 0 || date.day() === 6;
    };

useEffect(() => {
        if (fechaInstalacion) {
        const fechaFormateada = dayjs(fechaInstalacion).format('YYYY-MM-DD');
        dispatch(fetchHorariosDisponibles(fechaFormateada));
        }
    }, [fechaInstalacion, dispatch]);

    const handleDateChange = (newValue) => {
        setFechaInstalacion(newValue);
        setFranjaHoraria("");
        if (newValue) {
            fetchHorariosDisponibles(newValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{marginBottom:2}}>
                <DatePicker
                    format="DD/MM/YYYY"
                    label="Fecha de instalación"
                    value={fechaInstalacion}
                    onChange={handleDateChange}
                    shouldDisableDate={shouldDisableDate}
                    sx={estilos}
                />
            </DemoContainer>

            {fechaInstalacion && (
                <FormControl
                    fullWidth
                    sx={{
                        mt: 2,
                        ...estilos,
                        width: 260,
                        margin: '0 auto',
                    }}
                    disabled={horariosDisponibles.length === 0}
                >
                    <InputLabel id="horario-label">Horario de instalación</InputLabel>
                    <Select
                        labelId="horario-label"
                        value={franjaHoraria}
                        label="Horario de instalación"
                        onChange={(e) => setFranjaHoraria(e.target.value)}
                    >
                        {horariosDisponibles.length > 0 ? (
                            horariosDisponibles.map((franja) => (
                                <MenuItem key={franja} value={franja}>
                                    {franja}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="" disabled>
                                No hay horarios disponibles
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
            )}
        </LocalizationProvider>
    );
}
