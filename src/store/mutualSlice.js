// Importaciones
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//JSX:
export const enviarFormularioMutual = createAsyncThunk(
    'mutual/enviarFormularioMutual',
    async (formData, { rejectWithValue }) => {
        try {
        const response = await axios.post('https://apiemail-trt0.onrender.com/email-mutual', {
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

    const mutualSlice = createSlice({
    name: 'mutual',
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(enviarFormularioMutual.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(enviarFormularioMutual.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(enviarFormularioMutual.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    },
    });

    export default mutualSlice.reducer;