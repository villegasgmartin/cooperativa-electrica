import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';

const horariosDisponibles = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
];

const DatePicker = ({ onFechaConfirmada }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState();
  const [franjaHoraria, setFranjaHoraria] = useState('');

  const handleFranjaChange = (event) => {
    setFranjaHoraria(event.target.value);
  };

  const handleSubmit = () => {
    if (fechaSeleccionada && franjaHoraria && onFechaConfirmada) {
      onFechaConfirmada(fechaSeleccionada, franjaHoraria);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Seleccioná una fecha</h2>

      <DayPicker
        mode="single"
        selected={fechaSeleccionada}
        onSelect={setFechaSeleccionada}
        fromDate={new Date()} // Bloquea días anteriores
      />

      {fechaSeleccionada && (
        <div className="mt-4">
          <FormControl fullWidth>
            <InputLabel id="franja-label">Franja horaria</InputLabel>
            <Select
              labelId="franja-label"
              value={franjaHoraria}
              label="Franja horaria"
              onChange={handleFranjaChange}
            >
              {horariosDisponibles.map((franja) => (
                <MenuItem key={franja} value={franja}>
                  {franja}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {fechaSeleccionada && franjaHoraria && (
        <div className="mt-6">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enviar solicitud
          </Button>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
