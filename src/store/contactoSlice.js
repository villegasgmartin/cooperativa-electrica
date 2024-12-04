//Importaciones:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//JSX:
export const enviarFormulario = createAsyncThunk(
    'form/enviarFormulario',
    async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://apiemail-trt0.onrender.com/email-contacto', {
        nombre: formData.nombre,
        correo: formData.correo,
        mensaje: formData.mensaje,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error al enviar el formulario');
    }
    }
    );

    const contactoSlice = createSlice({
    name: 'contacto',
    initialState: {
    loading: false,
    success: false,
    error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(enviarFormulario.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        })
        .addCase(enviarFormulario.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        })
        .addCase(enviarFormulario.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        });
    },
});

export default contactoSlice.reducer;