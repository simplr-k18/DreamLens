
import React from 'react';
import type { Virtue } from '../types';

interface VirtueRevealProps {
    virtue: Virtue;
    childsName: string;
    onContinue: () => void;
}

export const VirtueReveal: React.FC<VirtueRevealProps> = ({ virtue, childsName, onContinue }) => {
    return (
        <div className="text-center p-4 flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
            <h2 className="font-serif text-2xl text-stone mb-4">{childsName}'s spark is...</h2>
            <div className="text-8xl mb-6 transform scale-150">{virtue.icon}</div>
            <h1 className="font-serif text-6xl text-warm-gold font-extrabold mb-6">
                {virtue.name}!
            </h1>
            <p className="text-lg text-forest-green mb-10 max-w-md">
                {virtue.description}
            </p>
            <button
                onClick={onContinue}
                className="bg-warm-gold text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-forest-green transition-all duration-300 transform hover:scale-105"
            >
                Discover the Path
            </button>
        </div>
    );
};
