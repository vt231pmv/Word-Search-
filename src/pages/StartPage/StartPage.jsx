import React from 'react';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';

const StartPage = () => {
    return (
        <>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Пошук слова</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xs">
                Знайдіть усі слова, заховані в сітці з літер!
            </p>

            <div className="w-full max-w-xs flex flex-col gap-4">
                <Link to="/game">
                    <Button variant="primary">Почати гру</Button>
                </Link>
                {/* Додаємо нову кнопку для таблиці результатів */}
                <Link to="/leaderboard">
                    <Button variant="secondary">Таблиця Результатів</Button>
                </Link>
                <Link to="/settings">
                    <Button variant="secondary">Налаштування</Button>
                </Link>
            </div>
        </>
    );
};

export default StartPage;

