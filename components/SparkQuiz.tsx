
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import type { QuizQuestion } from '../types';

interface SparkQuizProps {
    onComplete: (answers: string[]) => void;
}

export const SparkQuiz: React.FC<SparkQuizProps> = ({ onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnswer = (virtue: string) => {
        setIsAnimating(true);
        setTimeout(() => {
            const newAnswers = [...answers, virtue];
            setAnswers(newAnswers);
            if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setIsAnimating(false);
            } else {
                onComplete(newAnswers);
            }
        }, 500); // Animation duration
    };

    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
        <div className={`text-center p-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-full bg-stone/20 rounded-full h-2.5 mb-6">
                 <div className="bg-warm-gold h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-forest-green mb-8">{question.text}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option.virtue)}
                        className="group bg-white rounded-2xl shadow-lg p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-warm-gold focus:ring-opacity-50"
                    >
                        <img src={option.image} alt={option.text} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <p className="text-lg font-semibold text-forest-green group-hover:text-warm-gold transition-colors">{option.text}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};
