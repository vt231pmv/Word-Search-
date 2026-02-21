import React from 'react';
import { fn } from 'storybook/test';
import Button from '../components/UI/Button/Button';

/**
 * @fileoverview Storybook stories для компонента Button.
 * @module Button.stories
 */

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Універсальний компонент кнопки з підтримкою варіантів `primary` та `secondary`. ' +
          'Використовується на всіх сторінках додатку для основних та допоміжних дій.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Текст або дочірні елементи кнопки.',
      table: { type: { summary: 'ReactNode' } },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Візуальний варіант кнопки.',
      table: {
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Вимикає кнопку.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'HTML-атрибут type.',
      table: {
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: 'button' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback при натисканні кнопки.',
    },
  },
  args: { onClick: fn() },
};

export default meta;

/**
 * @story Primary
 * @description Основний варіант кнопки (зелений). Використовується для головних дій.
 */
export const Primary = {
  args: {
    children: 'Почати гру',
    variant: 'primary',
  },
};

/**
 * @story Secondary
 * @description Допоміжний варіант кнопки (сірий). Для другорядних дій.
 */
export const Secondary = {
  args: {
    children: 'На головну',
    variant: 'secondary',
  },
};

/**
 * @story Disabled
 * @description Неактивна кнопка. Не реагує на натискання.
 */
export const Disabled = {
  args: {
    children: 'Недоступно',
    variant: 'primary',
    disabled: true,
  },
};

/**
 * @story SubmitButton
 * @description Кнопка з type="submit" для форм.
 */
export const SubmitButton = {
  args: {
    children: 'Зберегти',
    variant: 'primary',
    type: 'submit',
  },
};
