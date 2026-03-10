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

export const GET_STOCK_CONFIG_REQUEST = 'GET_STOCK_CONFIG_REQUEST'
export const GET_STOCK_CONFIG_SUCCESS = 'GET_STOCK_CONFIG_SUCCESS'
export const GET_STOCK_CONFIG_FAILURE = 'GET_STOCK_CONFIG_FAILURE'
export const PUT_STOCK_CONFIG_REQUEST = 'PUT_STOCK_CONFIG_REQUEST'
export const PUT_STOCK_CONFIG_SUCCESS = 'PUT_STOCK_CONFIG_SUCCESS'
export const PUT_STOCK_CONFIG_FAILURE = 'PUT_STOCK_CONFIG_FAILURE'
export const POST_PRECIO_REQUEST = 'POST_PRECIO_REQUEST'
export const POST_PRECIO_SUCCESS = 'POST_PRECIO_SUCCESS'
export const POST_PRECIO_FAILURE = 'POST_PRECIO_FAILURE'
export const PUT_PRECIO_SUCCESS = 'PUT_PRECIO_SUCCESS'
export const PUT_PRECIO_FAILURE = 'PUT_PRECIO_FAILURE'
export const DELETE_PRECIO_REQUEST = 'DELETE_PRECIO_REQUEST'
export const DELETE_PRECIO_SUCCESS = 'DELETE_PRECIO_SUCCESS'
export const DELETE_PRECIO_FAILURE = 'DELETE_PRECIO_FAILURE'
export const PUT_PRECIO_REQUEST = 'PUT_PRECIO_REQUEST'

export const GET_STOCK_SUGERENCIAS_REQUEST  = 'GET_STOCK_SUGERENCIAS_REQUEST'
export const GET_STOCK_SUGERENCIAS_SUCCESS = 'GET_STOCK_SUGERENCIAS_SUCCESS'
export const GET_STOCK_SUGERENCIAS_FAILURE = 'GET_STOCK_SUGERENCIAS_FAILURE'



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


//config stock

export const getStockConfig = () => async (dispatch) => {
    dispatch({ type: GET_STOCK_CONFIG_REQUEST });
    try {
        const response = await axios.get(`${url}/api/stock/config`, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: GET_STOCK_CONFIG_SUCCESS,
            payload: response.data.config || response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_STOCK_CONFIG_FAILURE,
            payload: error.response?.data?.msg || 'Error al obtener stock config',
        });
    }
};

export const updateStockConfig = (id, dataActualizada) => async (dispatch) => {
    dispatch({ type: PUT_STOCK_CONFIG_REQUEST });
    try {
        const response = await axios.put(`${url}/api/stock/config/${id}`, dataActualizada, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: PUT_STOCK_CONFIG_SUCCESS,
            payload: response.data.config || response.data,
        });
    } catch (error) {
        dispatch({
            type: PUT_STOCK_CONFIG_FAILURE,
            payload: error.response?.data?.msg || 'Error al actualizar stock',
        });
    }
};


//precios

export const addPrecioItem = (nuevoItem) => async (dispatch) => {
    dispatch({ type: POST_PRECIO_REQUEST });
    try {
        const response = await axios.post(`${url}/api/stock/precio`, nuevoItem, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: POST_PRECIO_SUCCESS,
            payload: response.data.precios || response.data,
        });
    } catch (error) {
        dispatch({
            type: POST_PRECIO_FAILURE,
            payload: error.response?.data?.msg || 'Error al crear item',
        });
    }
};

export const updatePrecioItem = (id, dataActualizada) => async (dispatch) => {
    dispatch({ type: PUT_PRECIO_REQUEST });
    try {
        const response = await axios.put(`${url}/api/stock/precio/${id}`, dataActualizada, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: PUT_PRECIO_SUCCESS,
            payload: response.data.item || response.data,
        });
    } catch (error) {
        dispatch({
            type: PUT_PRECIO_FAILURE,
            payload: error.response?.data?.msg || 'Error al actualizar stock',
        });
    }
};

export const deletePrecioItem = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRECIO_REQUEST });
    try {
        await axios.delete(`${url}/api/stock/precio/${id}`, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: DELETE_PRECIO_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRECIO_FAILURE,
            payload: error.response?.data?.msg || 'Error al eliminar item',
        });
    }
};

//compras sugeridas get
export const getComprasSugeridas = () => async (dispatch) => {
    dispatch({ type: GET_STOCK_SUGERENCIAS_REQUEST });
    try {
        const response = await axios.get(`${url}/api/stock/compras-sugeridas`, {
            headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({
            type: GET_STOCK_SUGERENCIAS_SUCCESS,
            payload: response.data || response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_STOCK_SUGERENCIAS_FAILURE,
            payload: error.response?.data?.msg || 'Error al obtener stock config',
        });
    }
};
