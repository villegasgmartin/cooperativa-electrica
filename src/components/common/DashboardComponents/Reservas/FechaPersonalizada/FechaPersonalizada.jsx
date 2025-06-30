//Importaciones:
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { FormControl, TextField} from '@mui/material';

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

export default function FechaPersonalizada({ fechaInstalacion, setFechaInstalacion, franjaHoraria, setFranjaHoraria}) {

    const handleDateChange = (newValue) => {
        setFechaInstalacion(newValue);
        setFranjaHoraria("");
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} sx={{marginBottom:2}}>
                <DatePicker
                    format="DD/MM/YYYY"
                    label="Fecha de instalación"
                    value={fechaInstalacion}
                    onChange={handleDateChange}
                />
            </DemoContainer>

            {fechaInstalacion && (
                <FormControl
                    fullWidth
                    sx={{
                        mt: 2,
                        width: 260,
                        margin: '0 auto',
                    }}
                >
                    <TextField
                        label="Horario de instalación"
                        type='time'
                        value={franjaHoraria}
                        onChange={(e) => setFranjaHoraria(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        placeholder="Ej: 14:30"
                    />
                </FormControl>
            )}
        </LocalizationProvider>
    );
}
