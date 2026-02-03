//Importaciones:
import { configureStore } from '@reduxjs/toolkit';
import titleReducer from './titleSlice';
import contactoReducer from './contactoSlice';
import mutualReducer from './mutualSlice';
import blogReducer from '../../redux/reducers/blogReducer';
import authReducer from '../../redux/reducers/authReducer'; 
import userReducer from "../../redux/reducers/userReducer"
import tecnicaReducer from '../../redux/reducers/tecnicaReducer';
import reservasReducer from '../../redux/reducers/reservasReducer';
import formReducer from '../../redux/reducers/formReducers';
import stockReducer from '../../redux/reducers/stockReducer';

const store = configureStore({
  reducer: {
    title: titleReducer,
    contacto: contactoReducer,
    mutual: mutualReducer,
    blogs: blogReducer,
    auth: authReducer,
    user: userReducer,
    tecnica: tecnicaReducer,
    reservas: reservasReducer,
    form: formReducer,
    stock: stockReducer
  },
});

export default store;
