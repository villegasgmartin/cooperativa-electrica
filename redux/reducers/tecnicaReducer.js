// Importaciones:
import {
    CREAR_TECNICA_REQUEST,
    CREAR_TECNICA_SUCCESS,
    CREAR_TECNICA_FAIL,
    OBTENER_REGISTROS,
    OBTENER_REGISTROS_REQUEST,
    OBTENER_REGISTROS_SUCCESS,
    OBTENER_REGISTROS_FAILURE,
    ELIMINAR_REGISTRO,
    EDITAR_REGISTRO,
    MARCAR_REALIZADA,
    MARCAR_PENDIENTE,
    BUSCAR_USUARIO_REQUEST,
    BUSCAR_USUARIO_SUCCESS,
    BUSCAR_USUARIO_FAIL,
} from '../actions/tecnicaActions';

// Estado inicial:
const initialState = {
    loading: false,
    success: false,
    error: null,
    data: null,
    registros: [],
    completados: [],
    usuario: null,
    notFound: false
};

// Reducer:
const tecnicaReducer = (state = initialState, action) => {
    switch (action.type) {
        // Crear técnica
        case CREAR_TECNICA_REQUEST:
            return { ...state, loading: true, success: false, error: null };

        case CREAR_TECNICA_SUCCESS:
            return {
                ...state,
                loading: false,
                loadingUsuario: false,
                success: true,
                data: action.payload,
                registros: [...state.registros, action.payload.tecnica],
            };

        case CREAR_TECNICA_FAIL:
            return { ...state, loading: false, error: action.payload, success: false };

        // Obtener registros pendientes
        case OBTENER_REGISTROS:
            return { ...state, registros: action.payload };

        // Obtener registros completados
        case OBTENER_REGISTROS_REQUEST:
            return { ...state, loading: true, error: null };

        case OBTENER_REGISTROS_SUCCESS:
            return {
                ...state,
                loading: false,
                completados: action.payload,
            };

        case OBTENER_REGISTROS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Eliminar registro
        case ELIMINAR_REGISTRO:
            return {
                ...state,
                registros: state.registros.filter(reg => reg._id !== action.payload),
                completados: state.completados.filter(reg => reg._id !== action.payload),
            };

        // Editar registro
        case EDITAR_REGISTRO:
            return {
                ...state,
                registros: state.registros.map(reg =>
                    reg._id === action.payload.id ? { ...reg, ...action.payload.data } : reg
                ),
                completados: state.completados.map(reg =>
                    reg._id === action.payload.id ? { ...reg, ...action.payload.data } : reg
                ),
            };

        // Marcar como realizada
        case MARCAR_REALIZADA:
            const marcado = state.registros.find(reg => reg._id === action.payload);
            return {
                ...state,
                registros: state.registros.filter(reg => reg._id !== action.payload),
                completados: marcado ? [...state.completados, { ...marcado, estado: true }] : state.completados,
            };

        // Marcar como pendiente
                case MARCAR_PENDIENTE:
                    const pendiente = state.completados.find(reg => reg._id === action.payload);
                    return {
                        ...state,
                        completados: state.completados.filter(reg => reg._id !== action.payload),
                        registros: pendiente ? [...state.registros, { ...pendiente, estado: false }] : state.registros,
                    };

        // Obtener datos de usuario por su número:
                case BUSCAR_USUARIO_REQUEST:
                    return { ...state, loadingUsuario: true, error: null, notFound: false };
            case BUSCAR_USUARIO_SUCCESS:
                return { ...state, loadingUsuario: false, usuario: action.payload, error: null, notFound: false };
            case BUSCAR_USUARIO_FAIL:
                return { ...state, loadingUsuario: false, usuario: null, error: action.payload, notFound: true };

        default:
            return state;
    }
};

export default tecnicaReducer;
