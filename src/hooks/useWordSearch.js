import { useState, useEffect, useMemo, useCallback } from 'react';
import { generateGrid } from '../utils/gridGenerator';
import { ALL_WORDS } from '../data/word';

/**
 * @module hooks/useWordSearch
 * @description Кастомний хук, що інкапсулює всю логіку гри Word Search:
 *              генерацію поля, виділення літер, перевірку слів, таймер та стан перемоги.
 */

/**
 * Хук useWordSearch — головна логіка гри «Пошук слів».
 *
 * @function useWordSearch
 * @param {Object} options — Параметри гри.
 * @param {number} [options.gridSize=5] — Розмір сітки (gridSize × gridSize).
 * @param {number} [options.wordCount=4] — Кількість слів для розміщення.
 * @returns {Object} Стан гри та обробники подій.
 * @returns {string[]} returns.grid — Масив літер (flatten-сітка).
 * @returns {string[]} returns.words — Розміщені слова.
 * @returns {string[]} returns.foundWords — Знайдені слова.
 * @returns {number[]} returns.selection — Індекси виділених клітинок.
 * @returns {string} returns.formattedTime — Час у форматі MM:SS.
 * @returns {boolean} returns.isGameWon — Чи виграна гра.
 * @returns {Function} returns.startGame — Функція для (пере)запуску гри.
 * @returns {Object} returns.eventHandlers — Обробники подій миші.
 */
export const useWordSearch = ({ gridSize = 5, wordCount = 4 }) => {
    const [grid, setGrid] = useState([]);
    const [words, setWords] = useState([]);
    const [foundWords, setFoundWords] = useState([]);

    const [selection, setSelection] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectionDirection, setSelectionDirection] = useState(null);

    const getCoords = useCallback((index) => ({
        row: Math.floor(index / gridSize),
        col: index % gridSize,
    }), [gridSize]);

    const [time, setTime] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);

    const startGame = useCallback(() => {
        const newWordsPool = [...ALL_WORDS].sort(() => 0.5 - Math.random());

        const wordsToPlace = newWordsPool.slice(0, wordCount);
        const { grid: newGrid, placedWords } = generateGrid(wordsToPlace, gridSize, wordCount);

        setWords(placedWords);
        setGrid(newGrid);

        setFoundWords([]);
        setSelection([]);
        setTime(0);
        setIsGameWon(false);
        setIsGameActive(true);
        setSelectionDirection(null);
    }, [gridSize, wordCount]);

    useEffect(() => {
        let interval;
        if (isGameActive) {
            interval = setInterval(() => {
                setTime(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isGameActive]);

    useEffect(() => {
        if (words.length > 0 && foundWords.length === words.length) {
            setIsGameWon(true);
            setIsGameActive(false);
        }
    }, [foundWords, words]);


    const handleMouseDown = (index) => {
        setIsSelecting(true);
        setSelection([index]);
        setSelectionDirection(null);
    };

    const handleMouseEnter = (index) => {
        if (!isSelecting || selection.includes(index)) return;

        const lastIndex = selection[selection.length - 1];
        const coordsLast = getCoords(lastIndex);
        const coordsNew = getCoords(index);

        const diffRow = coordsNew.row - coordsLast.row;
        const diffCol = coordsNew.col - coordsLast.col;

        const isH_Adjacent = Math.abs(diffCol) === 1 && diffRow === 0;
        const isV_Adjacent = Math.abs(diffRow) === 1 && diffCol === 0;

        if (!isH_Adjacent && !isV_Adjacent) return;

        if (selection.length === 1) {
            if (isH_Adjacent) setSelectionDirection('horizontal');
            if (isV_Adjacent) setSelectionDirection('vertical');
            setSelection([...selection, index]);
        } else {
            if (selectionDirection === 'horizontal' && isH_Adjacent) {
                setSelection([...selection, index]);
            } else if (selectionDirection === 'vertical' && isV_Adjacent) {
                setSelection([...selection, index]);
            }
        }
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        setSelectionDirection(null);

        const selectedWord = selection.map(index => grid[index]).join('');

        if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            setFoundWords(prev => [...prev, selectedWord]);
        }

        setSelection([]);
    };

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }, [time]);

    return {
        grid,
        words,
        foundWords,
        selection,
        formattedTime,
        isGameWon,
        startGame,
        eventHandlers: {
            onMouseDown: handleMouseDown,
            onMouseEnter: handleMouseEnter,
            onMouseUp: handleMouseUp,
        }
    };
};