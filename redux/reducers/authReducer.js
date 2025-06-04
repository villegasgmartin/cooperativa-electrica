//Importaciones:
import {
  LOGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  LOGOUT,
} from '../actions/authActions';

//Estado inicial:
let initialState = {
  loggedUser: {},
  resetPasswordStatus: null,
  resetPasswordError: null,
};

//Reducers:
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.usuario.nombre);
      localStorage.setItem("userId", action.payload.usuario.uid);
      localStorage.setItem("rol", action.payload.usuario.rol);
      return {
        ...state,
        loggedUser: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStatus: 'success',
        resetPasswordError: null,
      };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetPasswordStatus: 'fail',
        resetPasswordError: action.payload,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordStatus: 'email_sent',
        resetPasswordError: null,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        resetPasswordStatus: 'email_failed',
        resetPasswordError: action.payload,
      };

      case LOGOUT:
        return {
          ...state,
          loggedUser: {},
          resetPasswordStatus: null,
          resetPasswordError: null,
        };

    default:
      return state;
  }
}

export default rootReducer;