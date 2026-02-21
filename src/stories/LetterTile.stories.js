import React from 'react';
import { fn } from 'storybook/test';
import LetterTile from '../components/Game/LetterTile/LetterTile';

/**
 * @fileoverview Storybook stories для компонента LetterTile.
 * @module LetterTile.stories
 */

const meta = {
    title: 'Game/LetterTile',
    component: LetterTile,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Клітинка з літерою на ігровому полі. Підтримує стани: звичайний та виділений. ' +
                    'Реагує на події миші для виділення слів.',
            },
        },
    },
    argTypes: {
        letter: {
            control: 'text',
            description: 'Літера, що відображається у клітинці.',
            table: { type: { summary: 'string' } },
        },
        isSelected: {
            control: 'boolean',
            description: 'Чи виділена клітинка.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        onMouseDown: {
            action: 'mouseDown',
            description: 'Callback при натисканні миші.',
        },
        onMouseEnter: {
            action: 'mouseEnter',
            description: 'Callback при наведенні миші.',
        },
    },
    args: {
        onMouseDown: fn(),
        onMouseEnter: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ width: 60, height: 60, '--grid-size': 5 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

/**
 * @story Default
 * @description Звичайна клітинка з літерою (не виділена).
 */
export const Default = {
    args: {
        letter: 'М',
        isSelected: false,
    },
};

/**
 * @story Selected
 * @description Виділена клітинка (зелений фон).
 */
export const Selected = {
    args: {
        letter: 'Р',
        isSelected: true,
    },
};

/**
 * @story MultipleLetters
 * @description Декілька клітинок поруч для демонстрації сітки.
 */
export const MultipleLetters = {
    render: () => (
        <div style={{ display: 'flex', gap: 4, '--grid-size': 5 }}>
            {['М', 'Р', 'І', 'Я'].map((letter, i) => (
                <div key={i} style={{ width: 60, height: 60 }}>
                    <LetterTile
                        letter={letter}
                        isSelected={i < 2}
                        onMouseDown={() => { }}
                        onMouseEnter={() => { }}
                    />
                </div>
            ))}
        </div>
    ),
};
