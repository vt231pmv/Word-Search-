import React, { useState, useEffect } from 'react';

/**
 * @component CookiePopup
 * @description GDPR-compliant банер, що інформує користувача про використання
 *              LocalStorage. Стан згоди зберігається у localStorage ('cookieConsent').
 *
 * @param {Object} props
 * @param {string} [props.message] — Текст повідомлення.
 * @param {string} [props.theme='light'] — Тема: 'light' | 'dark' | 'minimalist'.
 * @param {Function} [props.onAccept] — Додатковий callback після прийняття.
 */
const CookiePopup = ({
    message = 'Цей сайт використовує LocalStorage для збереження ваших налаштувань гри та результатів. Дані зберігаються лише на вашому пристрої.',
    theme = 'light',
    onAccept,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent !== 'accepted') {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
        if (onAccept) onAccept();
    };

    if (!isVisible) return null;

    const themes = {
        light: {
            container: 'bg-white border-t border-gray-200 shadow-2xl',
            text: 'text-gray-700',
            button: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400',
        },
        dark: {
            container: 'bg-gray-900 border-t border-gray-700 shadow-2xl',
            text: 'text-gray-100',
            button: 'bg-green-400 text-gray-900 hover:bg-green-500 focus:ring-green-300',
        },
        minimalist: {
            container: 'bg-gray-50 border-t border-gray-300',
            text: 'text-gray-600 text-sm',
            button: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500 text-sm',
        },
    };

    const t = themes[theme] || themes.light;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${t.container}`}
            role="dialog"
            aria-label="Cookie consent banner"
        >
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className={t.text}>{message}</p>
                <button
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${t.button}`}
                    onClick={handleAccept}
                >
                    Прийняти
                </button>
            </div>
        </div>
    );
};

export default CookiePopup;
