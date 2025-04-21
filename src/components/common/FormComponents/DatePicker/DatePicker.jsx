// Importaciones:
import * as React from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// JSX:
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

export default function BasicDatePicker() {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState('');

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
        },
        '& .Mui-focused': {
        color: '#3d116d',
        },
        '& .MuiSvgIcon-root': {
        color: '#3d116d',
        },
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
            <DatePicker
            label="Fecha de instalación"
            value={fechaSeleccionada}
            onChange={(newValue) => setFechaSeleccionada(newValue)}
            sx={estilos}
            />
        </DemoContainer>

        {fechaSeleccionada && (
            <FormControl fullWidth sx={{ mt: 2, ...estilos,
                width: 260,
                margin: '0 auto',
                mt: 2,
                }}>
            <InputLabel id="horario-label">Horario de instalación</InputLabel>
            <Select
                labelId="horario-label"
                value={horarioSeleccionado}
                label="Horario de instalación"
                onChange={(e) => setHorarioSeleccionado(e.target.value)}
            >
                <MenuItem value="8 a 10">8:00 a 10:00</MenuItem>
                <MenuItem value="10 a 12">10:00 a 12:00</MenuItem>
                <MenuItem value="12 a 14">12:00 a 14:00</MenuItem>
                <MenuItem value="14 a 16">14:00 a 16:00</MenuItem>
            </Select>
        </FormControl>
        )}
    </LocalizationProvider>
    );
}
