import{
    LOGIN
}from '.actions';
let initialState={
    loggedUser: {},
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
      default:
        return state;
    }
}

export default rootReducer;
