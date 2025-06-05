// Importaciones
import axios from 'axios';

//URL:
//const url = 'https://cooperativaback.up.railway.app';
//development::
const url = 'http://localhost:8000';

// ==========================
// Tipos de acciones
// ==========================

// Crear registro:
export const CREAR_TECNICA_REQUEST = 'CREAR_TECNICA_REQUEST';
export const CREAR_TECNICA_SUCCESS = 'CREAR_TECNICA_SUCCESS';
export const CREAR_TECNICA_FAIL = 'CREAR_TECNICA_FAIL';

// Obtener registros (pendientes y completados):
export const OBTENER_REGISTROS = 'OBTENER_REGISTROS';
export const OBTENER_REGISTROS_REQUEST = 'OBTENER_REGISTROS_REQUEST';
export const OBTENER_REGISTROS_SUCCESS = 'OBTENER_REGISTROS_SUCCESS';
export const OBTENER_REGISTROS_FAILURE = 'OBTENER_REGISTROS_FAILURE';

// Eliminar registro:
export const ELIMINAR_REGISTRO = 'ELIMINAR_REGISTRO';

// Editar registro:
export const EDITAR_REGISTRO = 'EDITAR_REGISTRO';

// Marcar como realizada:
export const MARCAR_REALIZADA = 'MARCAR_REALIZADA';
//Marcar como pendiente:
export const MARCAR_PENDIENTE = 'MARCAR_PENDIENTE';


// Crear visita pendiente:
export const crearTecnica = (fecha, categoria, descripcion) => async (dispatch) => {
    try {
        dispatch({ type: CREAR_TECNICA_REQUEST });

        const token = localStorage.getItem('token');
        const headers = { 'x-token': token };

        const response = await axios.post(
            `${url}/api/tecnica/crear-tecnica`,
            { fecha, categoria, descripcion },
            { headers }
        );

        dispatch({
            type: CREAR_TECNICA_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CREAR_TECNICA_FAIL,
            payload: error.response?.data?.msg || error.message,
        });
    }
};

// Obtener visitas completadas:
export const obtenerRegistrosCompletados = () => {
    return async (dispatch) => {
        dispatch({ type: OBTENER_REGISTROS_REQUEST });
        try {
            const token = localStorage.getItem('token');
            const headers = { 'x-token': token };
            const response = await axios.get(`${url}/api/tecnica/tecnicas`, { headers });
            const completados = response.data.tecnica.filter((r) => r.estado === true);
            dispatch({ type: OBTENER_REGISTROS_SUCCESS, payload: completados });
        } catch (error) {
            console.error(error);
            dispatch({ type: OBTENER_REGISTROS_FAILURE, payload: error.message });
        }
    };
};

// Obtener visitas pendientes:
export const obtenerRegistros = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const headers = { 'x-token': token };

        const response = await axios.get(`${url}/api/tecnica/tecnicas`, { headers });
        const registrosFiltrados = response.data.tecnica.filter(reg => !reg.estado);

        dispatch({ type: OBTENER_REGISTROS, payload: registrosFiltrados });
    } catch (error) {
        console.error('Error al obtener registros:', error);
    }
};

// Eliminar registro:
export const eliminarRegistro = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const headers = { 'x-token': token };

        await axios.delete(`${url}/api/tecnica/borrar-tecnica?id=${id}`, { headers });
        dispatch({ type: ELIMINAR_REGISTRO, payload: id });
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
    }
};

// Editar registro:
export const editarRegistro = (id, data) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const headers = { 'x-token': token };

        await axios.put(`${url}/api/tecnica/actualizar-tecnica?id=${id}`, data, { headers });
        dispatch({ type: EDITAR_REGISTRO, payload: { id, data } });
    } catch (error) {
        console.error('Error al editar el registro:', error);
    }
};

// Marcar como realizada:
export const marcarComoRealizada = (registro) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const updated = { ...registro, estado: true };

        await axios.put(`${url}/api/tecnica/actualizar-tecnica?id=${registro._id}`, updated, {
            headers: { 'x-token': token },
        });

        dispatch({ type: MARCAR_REALIZADA, payload: registro._id });
    } catch (error) {
        console.error('Error al marcar como realizada:', error);
    }
};

// Marcar como pendiente:
export const marcarRegistroPendiente = (registro) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const updatedRegistro = { ...registro, estado: false };

        await axios.put(
            `${url}/api/tecnica/actualizar-tecnica?id=${registro._id}`,
            updatedRegistro,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token,
                },
            }
        );

        dispatch({ type: MARCAR_PENDIENTE, payload: registro._id });
        dispatch(obtenerRegistrosCompletados());
    } catch (error) {
        console.error('Error al marcar como pendiente:', error);
    }
};
