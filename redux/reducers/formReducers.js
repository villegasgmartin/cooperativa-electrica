//Acciones importadas:
import {
    FETCH_HORARIOS_REQUEST,
    FETCH_HORARIOS_SUCCESS,
    FETCH_HORARIOS_FAILURE,
    CREATE_RESERVA_REQUEST,
    CREATE_RESERVA_SUCCESS,
    CREATE_RESERVA_FAILURE,
} from '../actions/formActions';

//Estado inicial:
    const initialState = {
    reservaCreada: false,
    horariosDisponibles: [],
    loading: false,
    error: null,
};

//Reducers:
const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RESERVA_REQUEST:
        case FETCH_HORARIOS_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_RESERVA_SUCCESS:
            return { ...state, loading: false ,reservaCreada: true};

        case FETCH_HORARIOS_SUCCESS:
            return { ...state, loading: false, horariosDisponibles: action.payload };

        case CREATE_RESERVA_FAILURE:
        case FETCH_HORARIOS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            
        return state;
    }
};

export default formReducer;
