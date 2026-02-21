import React from 'react';

/**
 * @module components/Game/LetterTile
 * @description Клітинка з літерою на ігровому полі.
 */

/**
 * Компонент LetterTile — окрема клітинка з літерою у сітці Word Search.
 * Підтримує два стани: звичайний та виділений (зелений фон).
 *
 * @component
 * @param {Object} props
 * @param {string} props.letter — Літера, що відображається.
 * @param {boolean} props.isSelected — Чи виділена клітинка.
 * @param {Function} props.onMouseDown — Callback при натисканні миші (початок виділення).
 * @param {Function} props.onMouseEnter — Callback при наведенні миші (продовження виділення).
 * @returns {React.ReactElement} Відрендерений елемент div з літерою.
 */
const LetterTile = ({ letter, isSelected, onMouseDown, onMouseEnter }) => {

    const baseClasses = "flex justify-center items-center w-full aspect-square rounded-md cursor-pointer transition-all duration-100 select-none";

    const dynamicStyles = {
        fontSize: 'calc(35px / (var(--grid-size) / 4))',
        borderWidth: 'calc(2px / (var(--grid-size) / 5))'
    };

    const selectedClasses = "bg-green-400 text-white transform scale-105 border-green-600";
    const defaultClasses = "bg-white text-gray-800 border-gray-300 hover:bg-gray-100";

    return (
        <div
            className={`${baseClasses} ${isSelected ? selectedClasses : defaultClasses}`}
            style={dynamicStyles}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
        >
            {letter}
        </div>
    );
};

export default LetterTile;

