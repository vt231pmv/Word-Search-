import React from 'react';
import LetterTile from '../LetterTile/LetterTile';

/**
 * @module components/Game/WordGrid
 * @description Ігрове поле — CSS Grid сітка з клітинками LetterTile.
 */

/**
 * Компонент WordGrid — CSS Grid-сітка з клітинками LetterTile.
 * Відображає ігрове поле та обробляє виділення літер.
 *
 * @component
 * @param {Object} props
 * @param {string[]} props.grid — Масив літер для відображення (flatten 2D-масив).
 * @param {number[]} props.selection — Масив індексів виділених клітинок.
 * @param {Object} props.eventHandlers — Обробники подій миші.
 * @param {Function} props.eventHandlers.onMouseDown — Початок виділення.
 * @param {Function} props.eventHandlers.onMouseEnter — Продовження виділення.
 * @param {Function} props.eventHandlers.onMouseUp — Завершення виділення.
 * @returns {React.ReactElement} Відрендерована сітка.
 */
const WordGrid = ({ grid, selection, eventHandlers }) => {
    return (
        <div
            className="grid gap-1.5 sm:gap-2 p-2 sm:p-3 bg-gray-300 rounded-lg w-full max-w-xl mx-auto"
            style={{
                gridTemplateColumns: `repeat(var(--grid-size, 5), 1fr)`,
                gridTemplateRows: `repeat(var(--grid-size, 5), 1fr)`,
            }}
        >
            {grid.map((letter, index) => (
                <LetterTile
                    key={index}
                    letter={letter}
                    isSelected={selection.includes(index)}
                    onMouseDown={() => eventHandlers.onMouseDown(index)}
                    onMouseEnter={() => eventHandlers.onMouseEnter(index)}
                />
            ))}
        </div>
    );
};

export default WordGrid;

