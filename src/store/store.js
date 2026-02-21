import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import leaderboardReducer from './slices/leaderboardSlice';

/**
 * @module store/store
 * @description Конфігурація Redux Store з підтримкою персистентності через localStorage.
 *              Автоматично зберігає та відновлює стан при перезавантаженні сторінки.
 */

/**
 * Завантажує збережений стан з localStorage.
 *
 * @function loadState
 * @returns {Object|undefined} Десеріалізований стан або undefined.
 */
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('wordSearchState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn("Could not load state from localStorage", err);
        return undefined;
    }
};

/**
 * Зберігає поточний стан у localStorage.
 *
 * @function saveState
 * @param {Object} state — Поточний стан Redux Store.
 */
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('wordSearchState', serializedState);
    } catch (err) {
        console.warn("Could not save state to localStorage", err);
    }
};

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        leaderboard: leaderboardReducer,
    },
    preloadedState: preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

