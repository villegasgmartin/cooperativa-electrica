import {
  GET_STOCK_CONFIG_REQUEST,
  GET_STOCK_CONFIG_SUCCESS,
  GET_STOCK_CONFIG_FAILURE,

  PUT_STOCK_CONFIG_REQUEST,
  PUT_STOCK_CONFIG_SUCCESS,
  PUT_STOCK_CONFIG_FAILURE,

  POST_PRECIO_REQUEST,
  POST_PRECIO_SUCCESS,
  POST_PRECIO_FAILURE,

  PUT_PRECIO_REQUEST,
  PUT_PRECIO_SUCCESS,
  PUT_PRECIO_FAILURE,

  DELETE_PRECIO_REQUEST,
  DELETE_PRECIO_SUCCESS,
  DELETE_PRECIO_FAILURE,

  GET_STOCK_SUGERENCIAS_REQUEST,
  GET_STOCK_SUGERENCIAS_SUCCESS,
  GET_STOCK_SUGERENCIAS_FAILURE,

  GET_CONSUMO_REQUEST,
  GET_CONSUMO_SUCCESS,
  GET_CONSUMO_FAILURE,

  ADD_CATEGORIA_REQUEST,
ADD_CATEGORIA_SUCCESS,
ADD_CATEGORIA_FAILURE,

DELETE_CATEGORIA_REQUEST,
DELETE_CATEGORIA_SUCCESS,
DELETE_CATEGORIA_FAILURE,

ADD_ITEM_CATEGORIA_REQUEST,
ADD_ITEM_CATEGORIA_SUCCESS,
ADD_ITEM_CATEGORIA_FAILURE,

DELETE_ITEM_CATEGORIA_REQUEST,
DELETE_ITEM_CATEGORIA_SUCCESS,
DELETE_ITEM_CATEGORIA_FAILURE
} from "../actions/stockAction";

const initialState = {
  config: null,
  loading: false,
  error: null,
  success: false
};

const stockConfigReducer = (state = initialState, action) => {

  switch (action.type) {

    // CONFIG

    case GET_STOCK_CONFIG_REQUEST:
    case PUT_STOCK_CONFIG_REQUEST:
    case POST_PRECIO_REQUEST:
    case PUT_PRECIO_REQUEST:
    case DELETE_PRECIO_REQUEST:
    case GET_STOCK_SUGERENCIAS_REQUEST:
    case GET_CONSUMO_REQUEST:
      case ADD_CATEGORIA_REQUEST:
case DELETE_CATEGORIA_REQUEST:
case ADD_ITEM_CATEGORIA_REQUEST:
case DELETE_ITEM_CATEGORIA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false
      };


    case ADD_CATEGORIA_SUCCESS:
case DELETE_CATEGORIA_SUCCESS:
case ADD_ITEM_CATEGORIA_SUCCESS:
case DELETE_ITEM_CATEGORIA_SUCCESS:

return {
  ...state,
  loading:false,
  config:action.payload,
  success:true
}
    case GET_STOCK_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        config: action.payload,
        success: true
      };
    case GET_CONSUMO_SUCCESS:
       return {
        ...state,
        loading: false,
        config: action.payload,
        success: true
      };
    case GET_STOCK_SUGERENCIAS_SUCCESS:
      return {
        ...state,
        loading: false,
        totalItems: action.payload.totalItems,
        costoTotalCompra: action.payload.costoTotalCompra,
        compras: action.payload.compras,
        success: true
      };

    case PUT_STOCK_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        config: action.payload,
        success: true
      };

    // PRECIOS

    case POST_PRECIO_SUCCESS:
      return {
        ...state,
        loading: false,
        config: {
          ...state.config,
          preciosItems: action.payload
        },
        success: true
      };

   case PUT_PRECIO_SUCCESS:
  return {
    ...state,
    loading: false,
    config: {
      ...state.config,
      preciosItems: state.config.preciosItems.map((item) =>
        item._id === action.payload._id ? action.payload : item
      )
    },
    success: true
  };

    case DELETE_PRECIO_SUCCESS:
      return {
        ...state,
        loading: false,
        config: {
          ...state.config,
          preciosItems: state.config.preciosItems.filter(
            (item) => item._id !== action.payload
          )
        },
        success: true
      };

    case GET_STOCK_CONFIG_FAILURE:
    case PUT_STOCK_CONFIG_FAILURE:
    case POST_PRECIO_FAILURE:
    case PUT_PRECIO_FAILURE:
    case DELETE_PRECIO_FAILURE:
    case GET_STOCK_SUGERENCIAS_FAILURE:
    case GET_CONSUMO_FAILURE:
      case ADD_CATEGORIA_FAILURE:
case DELETE_CATEGORIA_FAILURE:
case ADD_ITEM_CATEGORIA_FAILURE:
case DELETE_ITEM_CATEGORIA_FAILURE:
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

export default stockConfigReducer;