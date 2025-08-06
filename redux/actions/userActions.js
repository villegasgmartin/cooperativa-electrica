//Importaciones:
import axios from 'axios';

//URL:

const url = 'https://cooperativaback.up.railway.app';
//Producción:
//const url = 'http://localhost:8000';
// ==========================
// Tipos de acciones
// ==========================

//Acciones usuario por ID:
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';
//Acciónes para verificar si el ususario es admin o solo lectura:
export const FETCH_USERDATA_REQUEST = 'FETCH_USERDATA_REQUEST';
export const FETCH_USERDATA_SUCCESS = 'FETCH_USERDATA_SUCCESS';
export const FETCH_USERDATA_FAILURE = 'FETCH_USERDATA_FAILURE';
//Acciónes para crear usuarios:
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
//Acciones para obtener usuarios inactivos:
export const FETCH_INACTIVE_USERS_REQUEST = 'FETCH_INACTIVE_USERS_REQUEST';
export const FETCH_INACTIVE_USERS_SUCCESS = 'FETCH_INACTIVE_USERS_SUCCESS';
export const FETCH_INACTIVE_USERS_FAIL = 'FETCH_INACTIVE_USERS_FAIL';
//Acciones para activar un usuario inactivo:
export const REACTIVATE_USER_REQUEST = 'REACTIVATE_USER_REQUEST';
export const REACTIVATE_USER_SUCCESS = 'REACTIVATE_USER_SUCCESS';
export const REACTIVATE_USER_FAIL = 'REACTIVATE_USER_FAIL';
// Acciones para obtener todos los usuarios activos:
export const FETCH_ACTIVE_USERS_REQUEST = 'FETCH_ACTIVE_USERS_REQUEST';
export const FETCH_ACTIVE_USERS_SUCCESS = 'FETCH_ACTIVE_USERS_SUCCESS';
export const FETCH_ACTIVE_USERS_FAIL = 'FETCH_ACTIVE_USERS_FAIL';
//Acciones para desactuvar usuarios activos:
export const DEACTIVATE_USER_REQUEST = 'DEACTIVATE_USER_REQUEST';
export const DEACTIVATE_USER_SUCCESS = 'DEACTIVATE_USER_SUCCESS';
export const DEACTIVATE_USER_FAIL = 'DEACTIVATE_USER_FAIL';
//Acciones para editar usuarios:
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAIL = 'EDIT_USER_FAIL';

//Función GET para traer usuario por ID:
export const fetchUserProfile = () => {
    return async (dispatch) => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
        return dispatch({ type: FETCH_USER_FAIL, payload: 'Faltan credenciales' });
        }

        dispatch({ type: FETCH_USER_REQUEST });

        try {
        const { data } = await axios.get(
            `${url}/api/perfil?id=${userId}`,
            { headers: { 'x-token': token } }
        );
        dispatch({ type: FETCH_USER_SUCCESS, payload: data });
        } catch (error) {
        dispatch({
            type: FETCH_USER_FAIL,
            payload: error.response?.data?.msg || 'Error al cargar perfil',
        });
        }
    };
};

//Función GET para determinar si el usuario es admin o solo lectura:
export const fetchUserData = () => async (dispatch) => {
    dispatch({ type: FETCH_USERDATA_REQUEST });

    try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
        throw new Error('Faltan credenciales');
        }

        const { data } = await axios.get(`${url}/api/perfil?id=${userId}`, {
        headers: {
            'x-token': token,
        },
        });

        dispatch({
        type: FETCH_USERDATA_SUCCESS,
        payload: {
            nombre: data.nombre,
            reservasLeer: data.reservasLeer ?? false,
        },
        });
    } catch (error) {
        dispatch({
        type: FETCH_USERDATA_FAILURE,
        payload: error.message || 'Error al obtener el perfil del usuario',
        });
    }
};

//Función POST para crear usuarios:
export const createUser = (payload) => async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const headers = { 'x-token': token };

        await axios.post(`${url}/api/login`, payload, { headers });

        dispatch({ type: CREATE_USER_SUCCESS });
    } catch (error) {
        dispatch({
        type: CREATE_USER_FAIL,
        payload: error.response?.data?.msg || 'Error al crear el usuario. Verificá los datos.',
        });
    }
};

//Función GET para obtener lista de usuarios inactivos:
export const fetchInactiveUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_INACTIVE_USERS_REQUEST });

    try {
        const response = await axios.get(`${url}/api/usuarios-suspendidos`, {
        headers: { 'x-token': localStorage.getItem('token') },
        });

        const usuariosInactivos = response.data.usuarios?.filter(user => user.estado === false) || [];

        dispatch({
        type: FETCH_INACTIVE_USERS_SUCCESS,
        payload: usuariosInactivos,
        });
    } catch (error) {
        dispatch({
        type: FETCH_INACTIVE_USERS_FAIL,
        payload: error.response?.data?.msg || error.message,
        });
    }
};

//Función PUT para reactivar un usuario inactivo:
export const reactivateUser = (userId) => async (dispatch) => {
    dispatch({ type: REACTIVATE_USER_REQUEST });

    try {
        const payload = { estado: true };

        await axios.put(
        `${url}/api?id=${userId}`,
        payload,
        {
            headers: { 'x-token': localStorage.getItem('token') },
        }
        );

        dispatch({
        type: REACTIVATE_USER_SUCCESS,
        payload: userId,
        });
    } catch (error) {
        dispatch({
        type: REACTIVATE_USER_FAIL,
        payload: error.response?.data?.msg || error.message,
        });
    }
};

//Función PUT para obtener lista de usuarios activos:
export const fetchActiveUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_ACTIVE_USERS_REQUEST });

    try {
        const response = await axios.get(`${url}/api/usuarios`, {
        headers: { 'x-token': localStorage.getItem('token') },
        });

        const usuariosActivos = response.data.usuarios?.filter(user => user.estado !== false) || [];

        dispatch({
        type: FETCH_ACTIVE_USERS_SUCCESS,
        payload: usuariosActivos,
        });
    } catch (error) {
        dispatch({
        type: FETCH_ACTIVE_USERS_FAIL,
        payload: error.response?.data?.msg || error.message,
        });
    }
};

//Función PUT para desactivar usuarios inactivos:
export const deactivateUser = (userId) => async (dispatch) => {
    dispatch({ type: DEACTIVATE_USER_REQUEST });

    try {
        const payload = { estado: false };
        const response = await axios.put(`${url}/api?id=${userId}`,
        payload,
        {
            headers: { 'x-token': localStorage.getItem('token') },
        }
        );

        dispatch({ type: DEACTIVATE_USER_SUCCESS, payload: userId });
    } catch (error) {
        dispatch({
        type: DEACTIVATE_USER_FAIL,
        payload: error.response?.data?.msg || 'Error al desactivar el usuario',
        });
    }
};

//Función PUT para editar usuarios:
export const editUser = (userId, updatedData) => {
    return async (dispatch) => {
        dispatch({ type: EDIT_USER_REQUEST });

        try {
        await axios.put(
            `${url}/api?id=${userId}`,
            updatedData,
            {
            headers: { 'x-token': localStorage.getItem('token') }
            }
        );

        dispatch({ type: EDIT_USER_SUCCESS, payload: { userId, updatedData } });
        } catch (error) {
        dispatch({ type: EDIT_USER_FAIL, payload: error.message });
        console.error('Error al editar el usuario:', error);
        }
    };
};