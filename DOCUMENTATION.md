# 📘 Технічна документація — Word Search

**Проєкт:** Word Search  
**Автор:** Патлай Максим  
**Версія:** 0.1.0  
**Дата:** 2026-02-20

---

## Зміст

1. [Огляд архітектури](#1-огляд-архітектури)
2. [Модуль 1: Data Persistence Layer (LocalStorage API)](#2-модуль-1-data-persistence-layer-localstorage-api)
3. [Модуль 2: UI Component Rendering Logic](#3-модуль-2-ui-component-rendering-logic)
4. [Redux Store](#4-redux-store)
5. [Утиліти](#5-утиліти)

---

## 1. Огляд архітектури

```
┌─────────────────────────────────────────────────────────┐
│                     React Application                   │
├─────────────┬─────────────┬─────────────┬───────────────┤
│   Pages     │  Components │    Hooks    │    Store      │
│  (Router)   │  (UI/Game)  │             │  (Redux TK)   │
├─────────────┴─────────────┴─────────────┼───────────────┤
│              Application Logic          │  Persistence  │
│         (useWordSearch, gridGenerator)  │ (LocalStorage)│
└─────────────────────────────────────────┴───────────────┘
```

Додаток побудовано на основі **React 19** з використанням:

- **Redux Toolkit** — централізоване управління станом.
- **React Router DOM** — маршрутизація сторінок.
- **LocalStorage** — персистентність даних між сесіями.
- **Tailwind CSS** — утилітарна CSS-стилізація.

---

## 2. Модуль 1: Data Persistence Layer (LocalStorage API)

### Опис

Модуль забезпечує серіалізацію та десеріалізацію стану Redux у `localStorage` браузера. Реалізовано у файлі `src/store/store.js`.

### API Reference

---

#### `loadState()`

```javascript
/**
 * @function loadState
 * @description Завантажує серіалізований стан додатку з localStorage.
 *              Використовується для ініціалізації Redux store при запуску додатку.
 *              Забезпечує відновлення попередньої сесії користувача.
 *
 * @returns {Object|undefined} Десеріалізований об'єкт стану Redux, або undefined
 *                             якщо стан відсутній або пошкоджений.
 *
 * @example
 * const previousState = loadState();
 * // previousState = { settings: { gridSize: 5, wordCount: 4 }, leaderboard: { scores: [...] } }
 *
 * @throws {void} Помилки перехоплюються внутрішньо та логуються у console.warn.
 *
 * @see {@link saveState} — функція збереження стану.
 * @since 0.1.0
 */
```

**Деталі реалізації:**

- Ключ localStorage: `'wordSearchState'`
- Метод серіалізації: `JSON.parse()`
- Обробка помилок: `try/catch` з виведенням у `console.warn`

---

#### `saveState(state)`

```javascript
/**
 * @function saveState
 * @description Серіалізує та зберігає поточний стан Redux у localStorage.
 *              Викликається автоматично при кожній зміні стану через
 *              підписку store.subscribe().
 *
 * @param {Object} state — Повний об'єкт стану Redux store.
 * @param {Object} state.settings — Налаштування гри.
 * @param {number} state.settings.gridSize — Розмір ігрової сітки (за замовчуванням: 5).
 * @param {number} state.settings.wordCount — Кількість слів для пошуку (за замовчуванням: 4).
 * @param {Object} state.leaderboard — Дані таблиці лідерів.
 * @param {Array<Object>} state.leaderboard.scores — Масив результатів.
 *
 * @returns {void}
 *
 * @example
 * saveState({
 *   settings: { gridSize: 8, wordCount: 6 },
 *   leaderboard: { scores: [{ id: '2026-02-20T...', name: 'Player', time: 45 }] }
 * });
 *
 * @throws {void} Помилки перехоплюються внутрішньо та логуються у console.warn.
 *
 * @see {@link loadState} — функція завантаження стану.
 * @since 0.1.0
 */
```

**Деталі реалізації:**

- Метод серіалізації: `JSON.stringify()`
- Підписка: `store.subscribe(() => saveState(store.getState()))`
- Виконується **синхронно** при кожній dispatch-операції

---

### Структура збережених даних

```json
{
  "settings": {
    "gridSize": 5,
    "wordCount": 4
  },
  "leaderboard": {
    "scores": [
      {
        "id": "2026-02-20T19:54:14.000Z",
        "name": "Гравець",
        "time": 120,
        "wordsFound": 4
      }
    ]
  }
}
```

---

### Redux Slices (Persistence Layer)

#### `settingsSlice`

```javascript
/**
 * @module settingsSlice
 * @description Redux slice для управління налаштуваннями гри.
 *              Зберігається в localStorage через Data Persistence Layer.
 *
 * @property {Object} initialState
 * @property {number} initialState.gridSize — Розмір сітки (за замовчуванням: 5).
 * @property {number} initialState.wordCount — Кількість слів (за замовчуванням: 4).
 */

/**
 * @function setSettings
 * @description Reducer для оновлення налаштувань гри.
 *
 * @param {Object} state — Поточний стан налаштувань.
 * @param {Object} action.payload — Нові налаштування.
 * @param {number} action.payload.gridSize — Новий розмір сітки.
 * @param {number} action.payload.wordCount — Нова кількість слів.
 *
 * @since 0.1.0
 */
```

#### `leaderboardSlice`

```javascript
/**
 * @module leaderboardSlice
 * @description Redux slice для управління таблицею лідерів.
 *              Зберігається в localStorage через Data Persistence Layer.
 *
 * @property {Object} initialState
 * @property {Array<Object>} initialState.scores — Масив результатів (за замовчуванням: []).
 */

/**
 * @function addScore
 * @description Reducer для додавання нового результату до таблиці лідерів.
 *              Автоматично генерує унікальний ідентифікатор (ISO timestamp).
 *
 * @param {Object} state — Поточний стан таблиці лідерів.
 * @param {Object} action.payload — Дані нового результату.
 *
 * @since 0.1.0
 */

/**
 * @function clearScores
 * @description Reducer для очищення всієї таблиці лідерів.
 *
 * @param {Object} state — Поточний стан таблиці лідерів.
 *
 * @since 0.1.0
 */
```

---

## 3. Модуль 2: UI Component Rendering Logic

### Опис

Модуль включає UI-компоненти для побудови інтерфейсу додатку. Основні компоненти розміщені у `src/components/UI/`.

---

### `Button`

**Шлях:** `src/components/UI/Button/Button.jsx`

```javascript
/**
 * @component Button
 * @description Універсальний компонент кнопки з підтримкою варіантів стилізації.
 *              Використовує Tailwind CSS для динамічної стилізації.
 *
 * @param {Object} props — Властивості компонента.
 * @param {React.ReactNode} props.children — Вміст кнопки (текст або JSX).
 * @param {Function} [props.onClick] — Обробник події натискання.
 * @param {string} [props.type='button'] — HTML-тип кнопки ('button' | 'submit' | 'reset').
 * @param {string} [props.variant='primary'] — Варіант стилізації ('primary' | 'secondary').
 * @param {boolean} [props.disabled=false] — Стан неактивності кнопки.
 *
 * @returns {React.ReactElement} Рендерить HTML <button> елемент.
 *
 * @example
 * // Primary кнопка
 * <Button onClick={handleStart} variant="primary">
 *   Почати гру
 * </Button>
 *
 * @example
 * // Неактивна secondary кнопка
 * <Button variant="secondary" disabled={true}>
 *   Зберегти
 * </Button>
 *
 * @since 0.1.0
 */
```

**Варіанти стилізації:**

| Варіант     | Фон            | Текст       | Hover            | Disabled          |
|-------------|----------------|-------------|------------------|-------------------|
| `primary`   | `bg-green-500` | Білий       | `bg-green-600`   | `bg-green-300`    |
| `secondary` | `bg-gray-300`  | Темно-сірий | `bg-gray-400`    | `bg-gray-200`     |

---

### `Modal`

**Шлях:** `src/components/UI/Modal/Modal.jsx`

```javascript
/**
 * @component Modal
 * @description Компонент модального вікна для відображення контенту
 *              поверх основного інтерфейсу з фоновим затемненням.
 *
 * @param {Object} props — Властивості компонента.
 * @param {React.ReactNode} props.children — Вміст модального вікна.
 * @param {boolean} props.isOpen — Стан видимості модального вікна.
 * @param {Function} [props.onClose] — Обробник закриття модального вікна.
 *
 * @returns {React.ReactElement|null} Рендерить модальне вікно або null.
 *
 * @since 0.1.0
 */
```

---

### Ігрові компоненти

#### `WordGrid`

**Шлях:** `src/components/Game/WordGrid/WordGrid.jsx`

```javascript
/**
 * @component WordGrid
 * @description Компонент ігрової сітки, що відображає двовимірне поле
 *              з літерами та обробляє виділення слів мишею.
 *
 * @param {Object} props — Властивості компонента.
 * @param {Array<string>} props.grid — Одновимірний масив літер для відображення.
 * @param {number} props.gridSize — Розмір сітки (кількість рядків/стовпців).
 * @param {Array<number>} props.selection — Індекси виділених клітинок.
 * @param {Array<number>} props.foundIndices — Індекси знайдених слів.
 * @param {Object} props.eventHandlers — Обробники подій миші.
 *
 * @since 0.1.0
 */
```

#### `LetterTile`

**Шлях:** `src/components/Game/LetterTile/LetterTile.jsx`

```javascript
/**
 * @component LetterTile
 * @description Компонент окремої клітинки з літерою на ігровому полі.
 *              Відповідає за візуальне відображення стану клітинки
 *              (звичайна, виділена, знайдена).
 *
 * @param {Object} props — Властивості компонента.
 * @param {string} props.letter — Літера для відображення.
 * @param {boolean} props.isSelected — Чи виділено клітинку.
 * @param {boolean} props.isFound — Чи належить клітинка до знайденого слова.
 * @param {Function} props.onMouseDown — Обробник початку виділення.
 * @param {Function} props.onMouseEnter — Обробник руху миші над клітинкою.
 *
 * @since 0.1.0
 */
```

#### `WordList`

**Шлях:** `src/components/Game/WordList/WordList.jsx`

```javascript
/**
 * @component WordList
 * @description Компонент списку слів для пошуку. Відображає перелік
 *              слів із візуальним маркуванням знайдених.
 *
 * @param {Object} props — Властивості компонента.
 * @param {Array<string>} props.words — Масив слів для пошуку.
 * @param {Array<string>} props.foundWords — Масив знайдених слів.
 *
 * @since 0.1.0
 */
```

---

## 4. Redux Store

**Шлях:** `src/store/store.js`

```javascript
/**
 * @module store
 * @description Конфігурація Redux store із підтримкою персистентності через
 *              LocalStorage. Об'єднує settingsSlice та leaderboardSlice.
 *
 * @property {Object} reducer — Кореневий reducer.
 * @property {Function} reducer.settings — Reducer налаштувань гри.
 * @property {Function} reducer.leaderboard — Reducer таблиці лідерів.
 * @property {Object} preloadedState — Стан, завантажений з LocalStorage.
 *
 * @fires store#subscribe — Підписка на зміни стану для збереження в LocalStorage.
 *
 * @see {@link loadState}
 * @see {@link saveState}
 * @since 0.1.0
 */
```

---

## 5. Утиліти

### `gridGenerator`

**Шлях:** `src/utils/gridGenerator.js`

#### `generateGrid(words, size)`

```javascript
/**
 * @function generateGrid
 * @description Генерує ігрове поле заданого розміру зі випадково розміщеними словами.
 *              Незайняті клітинки заповнюються випадковими літерами українського алфавіту.
 *
 * @param {Array<string>} words — Масив слів для розміщення на сітці.
 * @param {number} [size=5] — Розмір сітки (кількість рядків та стовпців).
 *
 * @returns {Object} result — Результат генерації.
 * @returns {Array<string>} result.grid — Одновимірний масив літер (розмір: size × size).
 * @returns {Array<string>} result.placedWords — Масив успішно розміщених слів.
 *
 * @example
 * const { grid, placedWords } = generateGrid(['СОНЦЕ', 'ДЕНЬ'], 8);
 * // grid = ['С', 'О', 'Н', 'Ц', 'Е', 'К', 'Л', 'М', ...]
 * // placedWords = ['СОНЦЕ', 'ДЕНЬ']
 *
 * @since 0.1.0
 */
```

#### `placeWords(grid, words, size)` (internal)

```javascript
/**
 * @function placeWords
 * @access private
 * @description Розміщує слова на сітці у випадкових позиціях та напрямках
 *              (горизонтально або вертикально). Виконує до 50 спроб
 *              розміщення для кожного слова.
 *
 * @param {Array<Array<string|null>>} grid — Двовимірний масив сітки.
 * @param {Array<string>} words — Слова для розміщення.
 * @param {number} size — Розмір сітки.
 *
 * @returns {Object} result
 * @returns {Array<Array<string|null>>} result.grid — Оновлена сітка.
 * @returns {Array<string>} result.placedWords — Успішно розміщені слова.
 *
 * @since 0.1.0
 */
```

#### `getRandomLetter()` (internal)

```javascript
/**
 * @function getRandomLetter
 * @access private
 * @description Повертає випадкову літеру українського алфавіту.
 *              Використовується для заповнення порожніх клітинок сітки.
 *
 * @returns {string} Одна випадкова літера (А-Я, включаючи Ґ, Є, І, Ї).
 *
 * @since 0.1.0
 */
```

---

### `useWordSearch` (Custom Hook)

**Шлях:** `src/hooks/useWordSearch.js`

```javascript
/**
 * @hook useWordSearch
 * @description Кастомний React-хук, який інкапсулює всю ігрову логіку:
 *              генерацію поля, обробку виділення, перевірку знайдених слів,
 *              таймер та визначення перемоги.
 *
 * @param {Object} options — Параметри конфігурації.
 * @param {number} [options.gridSize=5] — Розмір ігрової сітки.
 * @param {number} [options.wordCount=4] — Кількість слів для пошуку.
 *
 * @returns {Object} gameState — Стан та методи гри.
 * @returns {Array<string>} gameState.grid — Одновимірний масив літер сітки.
 * @returns {Array<string>} gameState.words — Слова для пошуку.
 * @returns {Array<string>} gameState.foundWords — Знайдені слова.
 * @returns {Array<number>} gameState.selection — Поточні виділені індекси.
 * @returns {string} gameState.formattedTime — Час гри у форматі "ММ:СС".
 * @returns {boolean} gameState.isGameWon — Чи завершена гра перемогою.
 * @returns {Function} gameState.startGame — Ініціалізує нову гру.
 * @returns {Object} gameState.eventHandlers — Обробники подій миші.
 * @returns {Function} gameState.eventHandlers.onMouseDown — Початок виділення.
 * @returns {Function} gameState.eventHandlers.onMouseEnter — Продовження виділення.
 * @returns {Function} gameState.eventHandlers.onMouseUp — Завершення виділення.
 *
 * @example
 * const { grid, words, foundWords, startGame, eventHandlers } = useWordSearch({
 *   gridSize: 8,
 *   wordCount: 6,
 * });
 *
 * @since 0.1.0
 */
```

---

*Документацію створено: 2026-02-20. Автор: Патлай Максим.*
