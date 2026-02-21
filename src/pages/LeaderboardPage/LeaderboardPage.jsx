import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearScores } from '../../store/slices/leaderboardSlice';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';

const LeaderboardPage = () => {
    const dispatch = useDispatch();
    const scores = useSelector((state) => state.leaderboard.scores);

    const sortedScores = [...scores].sort((a, b) => {
        if (a.gridSize !== b.gridSize) {
            return b.gridSize - a.gridSize;
        }
        if (a.wordCount !== b.wordCount) {
            return b.wordCount - a.wordCount;
        }
        const timeToSeconds = (time) => {
            const [min, sec] = time.split(':').map(Number);
            return min * 60 + sec;
        };
        return timeToSeconds(a.time) - timeToSeconds(b.time);
    });

    const handleClear = () => {
        if (window.confirm('Ви впевнені, що хочете очистити таблицю результатів?')) {
            dispatch(clearScores());
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Таблиця Результатів</h2>

            <div className="w-full max-w-lg mb-6">
                {sortedScores.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                        {/* Заголовок таблиці */}
                        <li className="grid grid-cols-3 gap-2 text-sm font-semibold text-gray-600 px-3 py-2 bg-gray-100 rounded">
                            <span>Час</span>
                            <span>Розмір поля</span>
                            <span>К-сть слів</span>
                        </li>
                        {/* Cписок результатів */}
                        {sortedScores.map((score) => (
                            <li
                                key={score.id}
                                className="grid grid-cols-3 gap-2 text-base font-medium text-gray-800 px-3 py-3 bg-white shadow rounded-lg"
                            >
                                <span className="font-bold text-green-600">{score.time}</span>
                                <span>{score.gridSize} x {score.gridSize}</span>
                                <span>{score.wordCount}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lg text-gray-500">
                        Ви ще не зіграли жодної гри. Ваш перший результат буде тут!
                    </p>
                )}
            </div>

            <div className="w-full max-w-xs flex flex-col gap-3">
                {scores.length > 0 && (
                    <Button onClick={handleClear} variant="secondary">
                        Очистити
                    </Button>
                )}
                <Link to="/">
                    <Button variant="secondary">На головну</Button>
                </Link>
            </div>
        </>
    );
};

export default LeaderboardPage;

