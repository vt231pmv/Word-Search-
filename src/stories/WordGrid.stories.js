import React from 'react';
import { fn } from 'storybook/test';
import WordGrid from '../components/Game/WordGrid/WordGrid';

/**
 * @fileoverview Storybook stories для компонента WordGrid.
 * @module WordGrid.stories
 */

/** Демо-сітка 5×5 */
const demoGrid = [
    'М', 'Р', 'І', 'Я', 'А',
    'Н', 'Е', 'Б', 'О', 'К',
    'С', 'Л', 'О', 'В', 'О',
    'Г', 'Р', 'А', 'Л', 'І',
    'Т', 'О', 'Ч', 'А', 'С',
];

const noop = fn();

const meta = {
    title: 'Game/WordGrid',
    component: WordGrid,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Ігрове поле — CSS Grid-сітка з клітинками LetterTile. Відображає літери та ' +
                    'підтримує виділення клітинок при переміщенні мишею.',
            },
        },
    },
    argTypes: {
        grid: {
            description: 'Масив літер для відображення у сітці.',
            table: { type: { summary: 'string[]' } },
        },
        selection: {
            description: 'Масив індексів виділених клітинок.',
            table: { type: { summary: 'number[]' } },
        },
        eventHandlers: {
            description: 'Об\'єкт з обробниками подій: onMouseDown, onMouseEnter, onMouseUp.',
            table: { type: { summary: '{ onMouseDown, onMouseEnter, onMouseUp }' } },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 400, '--grid-size': 5 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

/**
 * @story Default
 * @description Сітка 5×5 без виділених клітинок.
 */
export const Default = {
    args: {
        grid: demoGrid,
        selection: [],
        eventHandlers: {
            onMouseDown: noop,
            onMouseEnter: noop,
            onMouseUp: noop,
        },
    },
};

/**
 * @story WithSelection
 * @description Сітка з виділеним словом "МРІЯ" (індекси 0–3).
 */
export const WithSelection = {
    args: {
        grid: demoGrid,
        selection: [0, 1, 2, 3],
        eventHandlers: {
            onMouseDown: noop,
            onMouseEnter: noop,
            onMouseUp: noop,
        },
    },
};

/**
 * @story VerticalSelection
 * @description Сітка з вертикальним виділенням (перший стовпець: М, Н, С, Г, Т).
 */
export const VerticalSelection = {
    args: {
        grid: demoGrid,
        selection: [0, 5, 10, 15, 20],
        eventHandlers: {
            onMouseDown: noop,
            onMouseEnter: noop,
            onMouseUp: noop,
        },
    },
};
