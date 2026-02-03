import {
    GET_STOCK_REQUEST,
    GET_STOCK_SUCCESS,
    GET_STOCK_FAILURE,
    POST_STOCK_REQUEST,
    POST_STOCK_SUCCESS,
    POST_STOCK_FAILURE,
    PUT_STOCK_REQUEST,
    PUT_STOCK_SUCCESS,
    PUT_STOCK_FAILURE,
    DELETE_STOCK_REQUEST,
    DELETE_STOCK_SUCCESS,
    DELETE_STOCK_FAILURE
} from '../actions/stockAction';

const initialState = {
    items: [],
    loading: false,
    error: null,
    success: false
};

const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STOCK_REQUEST:
        case POST_STOCK_REQUEST:
        case PUT_STOCK_REQUEST:
        case DELETE_STOCK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false
            };

        case GET_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
                success: true
            };

        case POST_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                items: [...state.items, action.payload],
                success: true
            };

        case PUT_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                ),
                success: true
            };

        case DELETE_STOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.filter((item) => item._id !== action.payload),
                success: true
            };

        case GET_STOCK_FAILURE:
        case POST_STOCK_FAILURE:
        case PUT_STOCK_FAILURE:
        case DELETE_STOCK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        default:
            return state;
    }
};

export default stockReducer;