
import React from 'react';
import type { Virtue, Calling } from '../types';

interface CallingSelectionProps {
    virtue: Virtue;
    callings: Calling[];
    onSelect: (calling: Calling) => void;
}

export const CallingSelection: React.FC<CallingSelectionProps> = ({ virtue, callings, onSelect }) => {
    return (
        <div className="text-center p-4 animate-fade-in">
            <h2 className="font-serif text-3xl md:text-4xl text-forest-green mb-2">
                For the <span className="text-warm-gold">{virtue.name}</span> spark...
            </h2>
            <p className="text-lg text-stone mb-8">Which path inspires you?</p>
            <div className="space-y-4">
                {callings.map((calling) => (
                    <button
                        key={calling.id}
                        onClick={() => onSelect(calling)}
                        className="w-full group flex items-center bg-white rounded-2xl shadow-lg p-4 text-left transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-warm-gold focus:ring-opacity-50"
                    >
                        <img src={calling.imageUrl} alt={calling.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-forest-green group-hover:text-warm-gold transition-colors">{calling.name}</h3>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
