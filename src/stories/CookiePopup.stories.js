import React from 'react';
import CookiePopup from '../components/UI/CookiePopup/CookiePopup';

/**
 * @fileoverview Storybook stories для компонента CookiePopup.
 * Демонструє різні візуальні стани банера Cookie відповідно до вимог GDPR.
 *
 * @module CookiePopup.stories
 * @see {@link file://./../../PRIVACY.md} — Політика конфіденційності.
 */

const meta = {
    title: 'UI/CookiePopup',
    component: CookiePopup,
    tags: ['autodocs'],
    argTypes: {
        message: {
            control: 'text',
            description: 'Текст повідомлення про використання cookie/localStorage.',
            table: {
                type: { summary: 'string' },
            },
        },
        theme: {
            control: { type: 'select' },
            options: ['light', 'dark', 'minimalist'],
            description: 'Тема оформлення банера.',
            table: {
                type: { summary: "'light' | 'dark' | 'minimalist'" },
                defaultValue: { summary: 'light' },
            },
        },
        onAccept: {
            action: 'accepted',
            description:
                'Callback-функція, що викликається при натисканні кнопки "Прийняти". ' +
                'Зберігає стан згоди у localStorage (ключ: cookieConsent).',
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    'GDPR-compliant компонент Cookie Popup. Інформує користувача про використання ' +
                    'LocalStorage для збереження налаштувань гри та стану згоди. ' +
                    'Відповідає вимогам PRIVACY.md щодо прозорості збору даних.',
            },
        },
        layout: 'fullscreen',
    },
    /**
     * Декоратор: очищаємо localStorage перед кожним рендером,
     * щоб банер завжди відображався у Storybook.
     */
    decorators: [
        (Story) => {
            localStorage.removeItem('cookieConsent');
            return <Story />;
        },
    ],
};

export default meta;

const Template = (args) => <CookiePopup {...args} />;

/**
 * @story InitialView
 * @description Початковий вигляд банера при першому відвідуванні. Світла тема.
 */
export const InitialView = Template.bind({});
InitialView.args = {
    message:
        'Цей сайт використовує LocalStorage для збереження ваших налаштувань гри та результатів. ' +
        'Дані зберігаються лише на вашому пристрої та не передаються третім сторонам.',
    theme: 'light',
};
InitialView.parameters = {
    docs: {
        description: {
            story:
                'Початковий вигляд Cookie Popup (світла тема). Відображається при першому відвідуванні сайту.',
        },
    },
};

/**
 * @story DarkMode
 * @description Банер у темній темі.
 */
export const DarkMode = Template.bind({});
DarkMode.args = {
    message:
        'Ми використовуємо локальне сховище браузера для покращення вашого досвіду. ' +
        'Ваші дані залишаються на вашому пристрої.',
    theme: 'dark',
};
DarkMode.parameters = {
    docs: {
        description: {
            story: 'Cookie Popup у темній темі (dark mode).',
        },
    },
    backgrounds: { default: 'dark' },
};

/**
 * @story Minimalist
 * @description Мінімалістичний варіант банера.
 */
export const Minimalist = Template.bind({});
Minimalist.args = {
    message: 'Сайт використовує LocalStorage. Детальніше: PRIVACY.md',
    theme: 'minimalist',
};
Minimalist.parameters = {
    docs: {
        description: {
            story: 'Мінімалістичний варіант Cookie Popup. Компактний дизайн з мінімумом тексту.',
        },
    },
};
