import React from 'react';
import WordList from '../components/Game/WordList/WordList';

/**
 * @fileoverview Storybook stories для компонента WordList.
 * @module WordList.stories
 */

const demoWords = ['МРІЯ', 'НЕБО', 'СЛОВО', 'ЧАС'];

const meta = {
    title: 'Game/WordList',
    component: WordList,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Список слів для пошуку. Знайдені слова відображаються зі стилем "закреслено" (line-through). ' +
                    'Допомагає гравцю відстежувати прогрес.',
            },
        },
    },
    argTypes: {
        wordsToFind: {
            description: 'Масив слів, які потрібно знайти.',
            table: { type: { summary: 'string[]' } },
        },
        foundWords: {
            description: 'Масив уже знайдених слів.',
            table: { type: { summary: 'string[]' } },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 500 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

/**
 * @story AllWords
 * @description Початковий стан — жодне слово ще не знайдено.
 */
export const AllWords = {
    args: {
        wordsToFind: demoWords,
        foundWords: [],
    },
};

/**
 * @story PartiallyFound
 * @description Деякі слова знайдені (МРІЯ, НЕБО).
 */
export const PartiallyFound = {
    args: {
        wordsToFind: demoWords,
        foundWords: ['МРІЯ', 'НЕБО'],
    },
};

/**
 * @story AllFound
 * @description Всі слова знайдені — гра завершена.
 */
export const AllFound = {
    args: {
        wordsToFind: demoWords,
        foundWords: [...demoWords],
    },
};
