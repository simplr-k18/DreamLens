
import React, { useState } from 'react';

interface WelcomeScreenProps {
    onStart: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className="text-center p-4 flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-forest-green mb-4">
                Don't just see the future.
            </h1>
            <h2 className="font-serif text-5xl md:text-6xl text-warm-gold font-extrabold mb-6 animate-pulse">
                See the <span className="italic">spark</span>.
            </h2>
            <p className="text-lg text-stone mb-8 max-w-sm">
                In 5 minutes, turn a photo into a meaningful conversation about your child's unique calling.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col items-center">
                 <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What is your child's name?"
                    className="w-full text-center bg-soft-cream border-b-2 border-warm-gold focus:outline-none focus:border-forest-green text-xl p-2 mb-6 transition-colors"
                    required
                />
                <button
                    type="submit"
                    className="bg-warm-gold text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-forest-green transition-all duration-300 transform hover:scale-105"
                >
                    Start the Spark Quiz
                </button>
            </form>
        </div>
    );
};
