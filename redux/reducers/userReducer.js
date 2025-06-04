// Importaciones de acciones
import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    FETCH_USERDATA_REQUEST,
    FETCH_USERDATA_SUCCESS,
    FETCH_USERDATA_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    FETCH_INACTIVE_USERS_REQUEST,
    FETCH_INACTIVE_USERS_SUCCESS,
    FETCH_INACTIVE_USERS_FAIL,
    REACTIVATE_USER_REQUEST,
    REACTIVATE_USER_SUCCESS,
    REACTIVATE_USER_FAIL,
} from '../actions/userActions';

// Estado inicial
const initialState = {
    user: null,
    loading: false,
    error: null,
    nombre: '',
    reservasLeer: false,
    loadingUserData: false,
    errorUserData: null,
    createUser: {
        loading: false,
        success: false,
        error: null,
    },
    users: [],           
    loadingUsers: false, 
    errorUsers: null,
};

// Reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Manejo de acciones para obtener el perfil de usuario
        case FETCH_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false };
        case FETCH_USER_FAIL:
            return { ...state, loading: false, error: action.payload };

        // Manejo de acciones para obtener datos adicionales del usuario
        case FETCH_USERDATA_REQUEST:
            return { ...state, loadingUserData: true, errorUserData: null };
        case FETCH_USERDATA_SUCCESS:
            return {
                ...state,
                loadingUserData: false,
                nombre: action.payload.nombre,
                reservasLeer: action.payload.reservasLeer,
            };
        case FETCH_USERDATA_FAILURE:
            return {
                ...state,
                loadingUserData: false,
                errorUserData: action.payload,
            };

        //Manejo de acciones para crear usuarios:
        case CREATE_USER_REQUEST:
            return {
                ...state,
                createUser: { loading: true, success: false, error: null },
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUser: { loading: false, success: true, error: null },
            };
        case CREATE_USER_FAIL:
            return {
                ...state,
                createUser: { loading: false, success: false, error: action.payload },
            };

        // Acciones para obtener lista de usuarios activos:
        case FETCH_USERS_REQUEST:
            return { ...state, loadingUsers: true, errorUsers: null };
        case FETCH_USERS_SUCCESS:
            return { ...state, loadingUsers: false, users: action.payload };
        case FETCH_USERS_FAIL:
            return { ...state, loadingUsers: false, errorUsers: action.payload };

        //Acciones para dar de baja un usuario:
        case DELETE_USER_REQUEST:
            return { ...state, loading: true };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.filter(user => user.uid !== action.payload),
            };
        case DELETE_USER_FAIL:
            return { ...state, loading: false, error: action.payload };

        //Acciones para editar usuarios:
        case UPDATE_USER_REQUEST:
            return { ...state, loading: true };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: state.users.map(user =>
                user.uid === action.payload.userId
                    ? { ...user, ...action.payload.data }
                    : user
                ),
            };
        case UPDATE_USER_FAIL:
            return { ...state, loading: false, error: action.payload };
        
        //Acciones para obtener usuarios inactivos:
        case FETCH_INACTIVE_USERS_REQUEST:
            return { ...state, loadingUsers: true, errorUsers: null };
        case FETCH_INACTIVE_USERS_SUCCESS:
            return { ...state, loadingUsers: false, users: action.payload };
        case FETCH_INACTIVE_USERS_FAIL:
            return { ...state, loadingUsers: false, errorUsers: action.payload };

        //Acciones para reactivar usuario:
        case REACTIVATE_USER_REQUEST:
            return { ...state }; 
        case REACTIVATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter((user) => user.uid !== action.payload),
            };
        case REACTIVATE_USER_FAIL:
            return {
                ...state,
                errorUsers: action.payload,
            };

        // Estado por defecto
        default:
        return state;
    }
};

export default userReducer;
