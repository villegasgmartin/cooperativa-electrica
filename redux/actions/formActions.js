//Importaciones:
import axios from 'axios';

//URL:
const url = 'https://panel-cooperativa-back-production.up.railway.app';
//Producción:
//const url = 'http://localhost:8000';

// ==========================
// Tipos de acciones
// ==========================

//Acciones para crear la reserva en el formulario:
export const CREATE_RESERVA_REQUEST = 'CREATE_RESERVA_REQUEST';
export const CREATE_RESERVA_SUCCESS = 'CREATE_RESERVA_SUCCESS';
export const CREATE_RESERVA_FAILURE = 'CREATE_RESERVA_FAILURE';
export const CREATE_RESERVA_TV = 'CREATE_RESERVA_TV';
//Acciones para obtener los horarios disponibles:
export const FETCH_HORARIOS_REQUEST = 'FETCH_HORARIOS_REQUEST';
export const FETCH_HORARIOS_SUCCESS = 'FETCH_HORARIOS_SUCCESS';
export const FETCH_HORARIOS_FAILURE = 'FETCH_HORARIOS_FAILURE';

//Función POST para crear reservas en el formulario:
export const createReservaForm = (dataToSend) => async (dispatch) => {
    dispatch({ type: CREATE_RESERVA_REQUEST });
    try {
        const response = await axios.post(`${url}/api/reservas/crear-reserva`, dataToSend);
        dispatch({ type: CREATE_RESERVA_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
        type: CREATE_RESERVA_FAILURE,
        payload: error.response?.data?.msg || error.message || 'Error al crear la reserva',
        });
    }
};

//Función POST para crear reservas en el formulario:
export const createReservaTV = (dataToSend) => async (dispatch) => {
    dispatch({ type: CREATE_RESERVA_TV });
    try {
        const response = await axios.post(`${url}/api/reservas/conexion-tv`, dataToSend);
        dispatch({ type: CREATE_RESERVA_TV, payload: response.data });
    } catch (error) {
       console.log(error)
    }
};


//Función GET para obtener los horarios disponibles:
export const fetchHorariosDisponibles = (fecha) => async (dispatch) => {
    dispatch({ type: FETCH_HORARIOS_REQUEST });
    try {
        const response = await axios.get(`${url}/api/reservas/horarios-disponibles`, {
        params: { fecha },
        });
        dispatch({ type: FETCH_HORARIOS_SUCCESS, payload: response.data.horariosDisponibles });
    } catch (error) {
        dispatch({ type: FETCH_HORARIOS_FAILURE, payload: error.message });
    }
};