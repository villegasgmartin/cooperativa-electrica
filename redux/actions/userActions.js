//Importaciones:
import axios from 'axios';

//URL:

//const url = 'https://cooperativaback.up.railway.app';
//Producción:
const url = 'http://localhost:8000';
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
//Acciones para ontener la lista de usuarios activos:
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';
//Acciones para dar de baja un usuario:
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
//Acciones para editar usuarios:
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
//Acciones para obtener usuarios inactivos:
export const FETCH_INACTIVE_USERS_REQUEST = 'FETCH_INACTIVE_USERS_REQUEST';
export const FETCH_INACTIVE_USERS_SUCCESS = 'FETCH_INACTIVE_USERS_SUCCESS';
export const FETCH_INACTIVE_USERS_FAIL = 'FETCH_INACTIVE_USERS_FAIL';
//Acciones para activar un usuario inactivo:
export const REACTIVATE_USER_REQUEST = 'REACTIVATE_USER_REQUEST';
export const REACTIVATE_USER_SUCCESS = 'REACTIVATE_USER_SUCCESS';
export const REACTIVATE_USER_FAIL = 'REACTIVATE_USER_FAIL';

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

//Función GET para obtener la lista de ususarios activos:
export const fetchUsers = () => async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${url}/api/usuarios`, {
        headers: { 'x-token': token }
        });
        dispatch({ type: FETCH_USERS_SUCCESS, payload: data.usuarios || [] });
    } catch (error) {
        dispatch({
        type: FETCH_USERS_FAIL,
        payload: error.response?.data?.msg || 'Error al obtener los usuarios',
        });
    }
};

//Función PUT para dar de baja un usuario:
export const deleteUser = (userId) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

    try {
        const payload = { estado: false };

        await axios.put(
        `${url}/api?id=${userId}`,
        payload,
        {
            headers: { 'x-token': localStorage.getItem('token') },
        }
        );

        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });

    } catch (error) {
        dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response?.data?.msg || error.message,
        });
    }
};

//Función PUT para editar usuarios:
export const updateUser = (userId, userData) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });

    try {
        const payload = {
        nombre: userData.nombre,
        telefono: userData.telefono,
        rol: userData.rol === 'Administrador' ? 'USER_ADMIN' : 'USER_EMPLOYE',
        usuarios: userData.rol === 'Administrador' ? true : userData.usuarios,
        reservas: userData.rol === 'Administrador' ? true : userData.reservas,
        tecnica: userData.rol === 'Administrador' ? true : userData.tecnica,
        blog: userData.rol === 'Administrador' ? true : userData.blog,
        };

        await axios.put(`${url}/api?id=${userId}`, payload, {
        headers: { 'x-token': localStorage.getItem('token') },
        });

        dispatch({ type: UPDATE_USER_SUCCESS, payload: { userId, data: payload } });

    } catch (error) {
        dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response?.data?.msg || error.message,
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