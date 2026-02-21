import { createSlice } from '@reduxjs/toolkit';

/**
 * @module store/slices/settingsSlice
 * @description Redux slice для налаштувань гри (розмір поля, кількість слів).
 */

/**
 * Початковий стан налаштувань.
 * @type {{gridSize: number, wordCount: number}}
 */
const initialState = {
    gridSize: 5,
    wordCount: 4,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setSettings: (state, action) => {
            state.gridSize = action.payload.gridSize;
            state.wordCount = action.payload.wordCount;
        },
    },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;

