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
    const [horariosDisponibles, setHorariosDisponibles] = React.useState([]);

    const estilos = { /* tu objeto estilos como ya lo tenías */ };

    const fetchHorariosDisponibles = async (fecha) => {
        try {
            const response = await axios.get('http://localhost:8000/api/reservas/horarios-disponibles', {
                params: { fecha: dayjs(fecha).format('YYYY-MM-DD') }
            });

            if (response.data.horariosDisponibles) {
                setHorariosDisponibles(response.data.horariosDisponibles);
            } else {
                setHorariosDisponibles([]);
            }
        } catch (error) {
            console.error('Error al obtener los horarios disponibles:', error);
            setHorariosDisponibles([]);
        }
    };

    const handleDateChange = (newValue) => {
        setFechaInstalacion(newValue);
        setFranjaHoraria(""); // Reiniciamos franja si cambia la fecha
        if (newValue) {
            fetchHorariosDisponibles(newValue);
        }
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
                        return day === 0 || day === 6; // No permitir sábados ni domingos
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

