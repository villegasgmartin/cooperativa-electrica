// Importaciones
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//JSX:
export const enviarFormularioVittal = createAsyncThunk(
    'mutual/enviarFormularioVittal',
    async (formData, { rejectWithValue }) => {
        try {
        const response = await axios.post('https://apiemail-trt0.onrender.com/email-vittal', {
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

    const vittalSlice = createSlice({
    name: 'vittal',
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(enviarFormularioVittal.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        .addCase(enviarFormularioVittal.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(enviarFormularioVittal.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    },
    });

    export default vittalSlice.reducer;