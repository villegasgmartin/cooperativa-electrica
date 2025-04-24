//Importaciones:
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';

//JSX:
// Localización personalizada
dayjs.locale({
    name: 'es-custom',
    months: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    monthsShort: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ],
    weekdays: dayjs.Ls['es'].weekdays,
    weekdaysShort: dayjs.Ls['es'].weekdaysShort,
    weekdaysMin: dayjs.Ls['es'].weekdaysMin,
    formats: dayjs.Ls['es'].formats,
    ordinal: dayjs.Ls['es'].ordinal,
    weekStart: dayjs.Ls['es'].weekStart,
}, null, true);

dayjs.locale('es-custom');

export default function BasicDatePicker({ fechaInstalacion, setFechaInstalacion, franjaHoraria, setFranjaHoraria }) {
    const [reservasOcupadas, setReservasOcupadas] = React.useState([]);
    const token = localStorage.getItem('token');

    //Estilos:
    const estilos = {
        '& .MuiInputBase-root': {
            color: '#3d116d',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#3d116d',
            },
            '&:hover fieldset': {
                borderColor: '#3d116d',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3d116d',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#3d116d',
            '&.Mui-focused': {
                color: '#3d116d',
            },
        },
        '& .MuiSvgIcon-root': {
            color: '#3d116d',
        },
    };

    // Traer reservas existentes desde la API
    const fetchReservas = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/reservas/reservas', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token,
                },
            });

            const ocupadas = response.data.reservas.map(reserva => ({
                fecha: dayjs(reserva.fecha).format('DD/MM/YYYY'),
                franja: reserva.horario,
            }));
            setReservasOcupadas(ocupadas);
        } catch (error) {
            console.error('Error al obtener las reservas:', error);
        }
    };

    React.useEffect(() => {
        fetchReservas();
    }, []);

    const handleDateChange = (newValue) => {
        setFechaInstalacion(newValue);
        if (!newValue) {
            setFranjaHoraria("");
        }
    };

    const isFechaOcupada = (fecha, franja) => {
        return reservasOcupadas.some(reserva => reserva.fecha === fecha && reserva.franja === franja);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DatePicker
                format="DD/MM/YYYY"
                label="Fecha de instalación"
                value={fechaInstalacion}
                onChange={handleDateChange}
                shouldDisableDate={(date) => {
                    const day = date.day();
                    return day === 0 || day === 6;
                }}
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
                >
                    <InputLabel id="horario-label">Horario de instalación</InputLabel>
                    <Select
                        labelId="horario-label"
                        value={franjaHoraria}
                        label="Horario de instalación"
                        onChange={(e) => setFranjaHoraria(e.target.value)}
                    >
                        {['8 a 10', '10 a 12', '12 a 14', '14 a 16'].map(franja => (
                            <MenuItem
                                key={franja}
                                value={franja}
                                disabled={isFechaOcupada(dayjs(fechaInstalacion).format('DD/MM/YYYY'), franja)}
                            >
                                {franja}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </LocalizationProvider>
    );
}
