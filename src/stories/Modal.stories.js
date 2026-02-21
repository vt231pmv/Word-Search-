import React from 'react';
import { fn } from 'storybook/test';
import Modal from '../components/UI/Modal/Modal';

/**
 * @fileoverview Storybook stories для компонента Modal.
 * @module Modal.stories
 */

const meta = {
    title: 'UI/Modal',
    component: Modal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Модальне вікно з затемненим фоном (overlay). Використовується для відображення ' +
                    'результатів гри після перемоги. Рендериться через React Portal у `#modal-root`.',
            },
        },
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Заголовок модального вікна.',
            table: { type: { summary: 'string' } },
        },
        children: {
            control: 'text',
            description: 'Вміст модального вікна.',
            table: { type: { summary: 'ReactNode' } },
        },
        onClose: {
            action: 'closed',
            description: 'Callback при натисканні "На головну".',
        },
        onRestartGame: {
            action: 'restarted',
            description: 'Callback при натисканні "Нова гра".',
        },
    },
    args: {
        onClose: fn(),
        onRestartGame: fn(),
    },
    /**
     * Декоратор: додає #modal-root для ReactDOM.createPortal.
     */
    decorators: [
        (Story) => {
            if (!document.getElementById('modal-root')) {
                const div = document.createElement('div');
                div.id = 'modal-root';
                document.body.appendChild(div);
            }
            return <Story />;
        },
    ],
};

export default meta;

/**
 * @story WinModal
 * @description Модальне вікно перемоги — відображається коли гравець знайшов усі слова.
 */
export const WinModal = {
    args: {
        title: '🎉 Вітаємо! 🎉',
        children: (
            <div>
                <p>Ви знайшли всі 4 слова!</p>
                <p>Ваш час: <strong style={{ fontSize: '1.25rem' }}>01:23</strong></p>
            </div>
        ),
    },
};

/**
 * @story CustomContent
 * @description Модальне вікно з довільним контентом.
 */
export const CustomContent = {
    args: {
        title: 'Інформація',
        children: (
            <p>Це модальне вікно може містити будь-який контент.</p>
        ),
    },
};
