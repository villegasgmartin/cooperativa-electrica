//Redux
import { configureStore } from '@reduxjs/toolkit';
import titleReducer from './titleSlice';
import contactoReducer from "./contactoSlice"
import mutualReducer from "./mutualSlice"

const store = configureStore({
  reducer: {
    title: titleReducer,
    contacto: contactoReducer,
    mutual: mutualReducer
  },
});

export default store;