import axios from 'axios';

export const GET_STOCK_REQUEST = 'GET_STOCK_REQUEST'
export const GET_STOCK_SUCCESS = 'GET_STOCK_SUCCESS'
export const GET_STOCK_FAILURE = 'GET_STOCK_FAILURE'
export const POST_STOCK_REQUEST = 'POST_STOCK_REQUEST'
export const POST_STOCK_SUCCESS = 'POST_STOCK_SUCCESS'
export const POST_STOCK_FAILURE = 'POST_STOCK_FAILURE'
export const PUT_STOCK_REQUEST = 'PUT_STOCK_REQUEST'
export const PUT_STOCK_SUCCESS = 'PUT_STOCK_SUCCESS'
export const DELETE_STOCK_REQUEST = 'DELETE_STOCK_REQUEST'
export const DELETE_STOCK_SUCCESS = 'DELETE_STOCK_SUCCESS'
export const DELETE_STOCK_FAILURE = 'DELETE_STOCK_FAILURE'
export const PUT_STOCK_FAILURE = 'PUT_STOCK_FAILURE'
export const GET_RETIROS_SUCCESS = 'GET_RETIROS_SUCCESS'




//URL:
const url = 'https://cooperativaback.up.railway.app';
//Producción:
//const url = 'http://localhost:8000';

export const getStock = () => async (dispatch) => {
    dispatch({ type: GET_STOCK_REQUEST });
    try {
        const response = await axios.get(`${url}/api/stock`, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: GET_STOCK_SUCCESS,
            payload: response.data.stock || response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_STOCK_FAILURE,
            payload: error.response?.data?.msg || 'Error al obtener stock',
        });
    }
};

//get historial
export const getHistorialRetiros = () => async (dispatch) => {
    dispatch({ type: GET_STOCK_REQUEST });
    try {
        const response = await axios.get(`${url}/api/stock/historial`, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: GET_RETIROS_SUCCESS,
            payload: response.data.historial || response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_STOCK_FAILURE,
            payload: error.response?.data?.msg || 'Error al obtener historial',
        });
    }
};

export const postStock = (nuevoItem) => async (dispatch) => {
    dispatch({ type: POST_STOCK_REQUEST });
    try {
        const response = await axios.post(`${url}/api/stock`, nuevoItem, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: POST_STOCK_SUCCESS,
            payload: response.data.stock || response.data,
        });
    } catch (error) {
        dispatch({
            type: POST_STOCK_FAILURE,
            payload: error.response?.data?.msg || 'Error al crear item',
        });
    }
};

export const putStock = (id, dataActualizada) => async (dispatch) => {
    dispatch({ type: PUT_STOCK_REQUEST });
    try {
        const response = await axios.put(`${url}/api/stock/${id}`, dataActualizada, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: PUT_STOCK_SUCCESS,
            payload: response.data.stock || response.data,
        });
    } catch (error) {
        dispatch({
            type: PUT_STOCK_FAILURE,
            payload: error.response?.data?.msg || 'Error al actualizar stock',
        });
    }
};

export const deleteStock = (id) => async (dispatch) => {
    dispatch({ type: DELETE_STOCK_REQUEST });
    try {
        await axios.delete(`${url}/api/stock/${id}`, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: DELETE_STOCK_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_STOCK_FAILURE,
            payload: error.response?.data?.msg || 'Error al eliminar item',
        });
    }
};