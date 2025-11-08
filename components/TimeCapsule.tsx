import React from 'react';
import type { TimeCapsuleEntry } from '../types';

interface TimeCapsuleProps {
    entries: TimeCapsuleEntry[];
    onRestart: () => void;
    onViewEntry: (entry: TimeCapsuleEntry) => void;
}

export const TimeCapsule: React.FC<TimeCapsuleProps> = ({ entries, onRestart, onViewEntry }) => {
    return (
        <div className="p-4 w-full animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-center text-forest-green mb-8">
                Your Spark Time-Capsule
            </h1>
            {entries.length === 0 ? (
                <div className="text-center text-stone py-16">
                    <p className="text-lg mb-4">Your child's Time-Capsule is waiting.</p>
                    <p className="text-lg">Their dreams are ready to be captured.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {entries.slice().reverse().map(entry => (
                        <button 
                            key={entry.id} 
                            onClick={() => onViewEntry(entry)}
                            className="group aspect-w-1 aspect-h-1 block bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-warm-gold focus:ring-opacity-50"
                        >
                            <img src={entry.imageUrl} alt={`${entry.name} as ${entry.calling.name}`} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 p-2 text-white">
                                    <p className="font-bold text-sm">{entry.calling.name}</p>
                                    <p className="text-xs">{entry.date}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
             <div className="text-center mt-12">
                <button
                    onClick={onRestart}
                    className="bg-forest-green text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-warm-gold transition-all duration-300 transform hover:scale-105"
                >
                   {entries.length > 0 ? "Discover a New Spark" : "Start a New Journey"}
                </button>
            </div>
        </div>
    );
};