import React from 'react';
import type { TimeCapsuleEntry } from '../types';

interface TimeCapsuleModalProps {
    entry: TimeCapsuleEntry;
    onClose: () => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode, icon: string }> = ({ title, children, icon }) => (
    <div className="bg-soft-cream/60 rounded-xl p-4">
        <h2 className="font-serif text-xl text-forest-green font-bold mb-2 flex items-center">
            <span className="text-2xl mr-2">{icon}</span>
            {title}
        </h2>
        <div className="text-sm text-forest-green/80 space-y-2">{children}</div>
    </div>
);


export const TimeCapsuleModal: React.FC<TimeCapsuleModalProps> = ({ entry, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-stone hover:text-forest-green z-10"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="space-y-4">
                    <div className="text-center">
                        <p className="text-sm text-stone">{entry.date}</p>
                        <h1 className="font-serif text-3xl font-bold text-forest-green">
                            {entry.name} as <span className="text-warm-gold">{entry.calling.name}</span>
                        </h1>
                        <p className="text-md text-stone">Spark of {entry.virtue.name}</p>
                    </div>

                    <img src={entry.imageUrl} alt={`${entry.name} as ${entry.calling.name}`} className="w-full object-contain rounded-lg shadow-md" />

                    <InfoCard title="A Glimpse into the Future" icon="📖">
                        <p>{entry.story}</p>
                    </InfoCard>

                    <InfoCard title="Inspired By..." icon="🌟">
                        <h4 className="font-bold">{entry.roleModel.name}</h4>
                        <p>{entry.roleModel.bio}</p>
                    </InfoCard>

                    <InfoCard title={entry.skillPath.title} icon="🛠️">
                        <p>{entry.skillPath.description}</p>
                    </InfoCard>
                    
                    <InfoCard title={entry.firstStep.title} icon="🌱">
                        <p>{entry.firstStep.description}</p>
                    </InfoCard>
                </div>
            </div>
        </div>
    );
};