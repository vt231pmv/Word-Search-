import React from 'react';

/**
 * @module components/Game/WordList
 * @description Список слів для пошуку на ігровому полі.
 */

/**
 * Компонент WordList — відображає список слів, які потрібно знайти.
 * Знайдені слова закреслюються (line-through) та стають сірими.
 *
 * @component
 * @param {Object} props
 * @param {string[]} props.wordsToFind — Масив слів для пошуку.
 * @param {string[]} props.foundWords — Масив вже знайдених слів.
 * @returns {React.ReactElement} Відрендерований список слів.
 */
const WordList = ({ wordsToFind, foundWords }) => {
    return (
        <div className="w-full max-w-xl mx-auto mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">
                Слова для пошуку:
            </h3>
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {wordsToFind.map((word, index) => (
                    <li
                        key={index}
                        className={`py-1 px-4 rounded-full text-base sm:text-lg font-medium transition-all duration-200
                            ${foundWords.includes(word)
                                ? 'bg-gray-400 text-white line-through'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                    >
                        {word}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WordList;

