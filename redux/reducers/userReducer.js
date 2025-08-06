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
    FETCH_INACTIVE_USERS_REQUEST,
    FETCH_INACTIVE_USERS_SUCCESS,
    FETCH_INACTIVE_USERS_FAIL,
    REACTIVATE_USER_REQUEST,
    REACTIVATE_USER_SUCCESS,
    REACTIVATE_USER_FAIL,
    FETCH_ACTIVE_USERS_REQUEST,
    FETCH_ACTIVE_USERS_SUCCESS,
    FETCH_ACTIVE_USERS_FAIL,
    DEACTIVATE_USER_REQUEST,
    DEACTIVATE_USER_SUCCESS,
    DEACTIVATE_USER_FAIL,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
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

        // Acciones para obtener usuarios activos
        case FETCH_ACTIVE_USERS_REQUEST:
            return { ...state, loadingUsers: true, errorUsers: null };
        case FETCH_ACTIVE_USERS_SUCCESS:
            return { ...state, loadingUsers: false, users: action.payload };
        case FETCH_ACTIVE_USERS_FAIL:
            return { ...state, loadingUsers: false, errorUsers: action.payload };

        //Acciones para desactivar un usuario activo:
        case DEACTIVATE_USER_REQUEST:
            return { ...state }; 
        case DEACTIVATE_USER_SUCCESS:
            return { ...state, users: state.users.filter((user) => user.uid !== action.payload),};
        case DEACTIVATE_USER_FAIL:
            return { ...state, errorUsers: action.payload,};

        //Acciones para editar un usuario:
        case EDIT_USER_REQUEST:
            return { ...state }; 
        case EDIT_USER_SUCCESS:
            return { ...state, users: state.users.map(user => user.uid === action.payload.userId ? { ...user, ...action.payload.updatedData } : user),};
        case EDIT_USER_FAIL:
            return { ...state, errorUsers: action.payload };

        // Estado por defecto
        default:
        return state;
    }
};

export default userReducer;
