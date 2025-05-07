import {LOGIN} from '../redux/actions/authActions';
import { CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
} from "../redux/actions/userActions"

let initialState = {
  loggedUser: {},
  loading: false,
  success: false,
  error: null,
};

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

    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };

    case CREATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
