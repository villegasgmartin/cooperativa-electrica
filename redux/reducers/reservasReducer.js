//Acciones importadas:
import {
    GET_RESERVAS_REQUEST,
    GET_RESERVAS_SUCCESS,
    GET_RESERVAS_FAILURE,
    UPDATE_RESERVA_REQUEST,
    UPDATE_RESERVA_SUCCESS,
    UPDATE_RESERVA_FAILURE,
    MARK_RESERVA_REALIZADA_REQUEST,
    MARK_RESERVA_REALIZADA_SUCCESS,
    MARK_RESERVA_REALIZADA_FAILURE,
    DELETE_RESERVA_REQUEST,
    DELETE_RESERVA_SUCCESS,
    DELETE_RESERVA_FAILURE,
    FETCH_RESERVAS_REALIZADAS_REQUEST,
    FETCH_RESERVAS_REALIZADAS_SUCCESS,
    FETCH_RESERVAS_REALIZADAS_FAIL,
    FETCH_RESERVAS_ELIMINADAS_REQUEST,
    FETCH_RESERVAS_ELIMINADAS_SUCCESS,
    FETCH_RESERVAS_ELIMINADAS_FAIL,
    MARCAR_RESERVA_PENDIENTE_REQUEST,
    MARCAR_RESERVA_PENDIENTE_SUCCESS,
    MARCAR_RESERVA_PENDIENTE_FAILURE,
    HANDLE_MARK_AS_PENDIENTE_REQUEST,
    HANDLE_MARK_AS_PENDIENTE_SUCCESS,
    HANDLE_MARK_AS_PENDIENTE_FAILURE,
    DELETE_RESERVA_COMPLETADA_SUCCESS,
    DELETE_RESERVA_COMPLETADA_REQUEST,
    DELETE_RESERVA_COMPLETADA_FAILURE
} from '../actions/reservasActions';

//Estado inicial:
const initialState = {
    reservas: [],
    realizadas: [],
    reservasEliminadas: [],
    loading: false,
    loadingEliminadas: false,
    error: null,
    errorEliminadas: null,
};

//Reducers:
const reservasReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESERVAS_REQUEST:
        case FETCH_RESERVAS_REALIZADAS_REQUEST:
        case UPDATE_RESERVA_REQUEST:
        case MARK_RESERVA_REALIZADA_REQUEST:
        case DELETE_RESERVA_REQUEST:
        case MARCAR_RESERVA_PENDIENTE_REQUEST:
        case HANDLE_MARK_AS_PENDIENTE_REQUEST:
        case DELETE_RESERVA_COMPLETADA_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_RESERVAS_ELIMINADAS_REQUEST:
            return { ...state, loadingEliminadas: true, errorEliminadas: null };

        case GET_RESERVAS_SUCCESS:
            return { ...state, loading: false, reservas: action.payload };

        case FETCH_RESERVAS_REALIZADAS_SUCCESS:
            return { ...state, loading: false, realizadas: action.payload };

        case FETCH_RESERVAS_ELIMINADAS_SUCCESS:
            return { ...state, loadingEliminadas: false, reservasEliminadas: action.payload };

        case MARCAR_RESERVA_PENDIENTE_SUCCESS:
            return {
                ...state,
                loading: false,
                reservasEliminadas: state.reservasEliminadas.filter(r => r._id !== action.payload),
            };

        case UPDATE_RESERVA_SUCCESS:
        case MARK_RESERVA_REALIZADA_SUCCESS:
            return {
                ...state,
                loading: false,
                reservas: state.reservas.map(r =>
                    r._id === action.payload._id ? action.payload : r
                ),
            };

        case DELETE_RESERVA_SUCCESS:
            return {
                ...state,
                loading: false,
                reservas: state.reservas.filter(r => r._id !== action.payload),
            };

        case HANDLE_MARK_AS_PENDIENTE_SUCCESS:
            return {
                ...state,
                loading: false,
                reservas: state.reservas.map(r =>
                    r._id === action.payload._id ? action.payload : r
                ),
            };

            case DELETE_RESERVA_COMPLETADA_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    reservas: state.reservas.filter(r => r._id !== action.payload),
                };

        case GET_RESERVAS_FAILURE:
        case FETCH_RESERVAS_REALIZADAS_FAIL:
        case UPDATE_RESERVA_FAILURE:
        case MARK_RESERVA_REALIZADA_FAILURE:
        case DELETE_RESERVA_FAILURE:
        case MARCAR_RESERVA_PENDIENTE_FAILURE:
        case HANDLE_MARK_AS_PENDIENTE_FAILURE:
        case DELETE_RESERVA_COMPLETADA_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_RESERVAS_ELIMINADAS_FAIL:
            return { ...state, loadingEliminadas: false, errorEliminadas: action.payload };

        default:
            return state;
    }
};

export default reservasReducer;
