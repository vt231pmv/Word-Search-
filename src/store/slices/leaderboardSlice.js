import { createSlice } from '@reduxjs/toolkit';

/**
 * @module store/slices/leaderboardSlice
 * @description Redux slice для таблиці результатів (leaderboard).
 *              Зберігає історію ігор з часом, розміром поля та кількістю слів.
 */

/**
 * Початковий стан таблиці результатів.
 * @type {{scores: Array<{id: string, time: string, gridSize: number, wordCount: number}>}}
 */
const initialState = {
    scores: [],
};

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: initialState,
    reducers: {
        addScore: (state, action) => {
            const newScore = {
                ...action.payload,
                id: new Date().toISOString(),
            };
            state.scores.push(newScore);
        },
        clearScores: (state) => {
            state.scores = [];
        },
    },
});

export const { addScore, clearScores } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;

