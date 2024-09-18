import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTitle: '',
};

const titleSlice = createSlice({
    name: 'title',
    initialState,
    reducers: {
    setTitle: (state, action) => {
        state.currentTitle = action.payload;
    },
    },
});

export const { setTitle } = titleSlice.actions;

export default titleSlice.reducer;
