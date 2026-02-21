import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button/Button';

/**
 * @module components/UI/Modal
 * @description Модальне вікно, що рендериться через React Portal.
 */

/**
 * Компонент Modal — повноекранне модальне вікно з затемненим overlay.
 * Використовує ReactDOM.createPortal для рендерингу в елемент #modal-root.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title — Заголовок модального вікна.
 * @param {React.ReactNode} props.children — Вміст (тіло) модального вікна.
 * @param {Function} props.onClose — Callback при натисканні «На головну».
 * @param {Function} props.onRestartGame — Callback при натисканні «Нова гра».
 * @returns {React.ReactPortal} Портал з модальним вікном.
 *
 * @example
 * <Modal title="Вітаємо!" onClose={handleClose} onRestartGame={handleRestart}>
 *   <p>Ви виграли!</p>
 * </Modal>
 */
const Modal = ({ title, children, onClose, onRestartGame }) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            {/* Вміст модального вікна */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm flex flex-col items-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
                <div className="text-lg text-gray-600 mb-6">
                    {children}
                </div>
                <div className="w-full flex flex-col gap-3">
                    <Button onClick={onRestartGame} variant="primary">
                        Нова гра
                    </Button>
                    <Button onClick={onClose} variant="secondary">
                        На головну
                    </Button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;

