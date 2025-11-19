import React, { useState } from 'react';
import type { Calling, GeneratedCallingDetails } from '../types';
import { editStorybookImage } from '../services/geminiService';

interface ActionStepProps {
    calling: Calling;
    dream: { imageUrl: string } & GeneratedCallingDetails;
    onSave: () => void;
    onUpdateDream: (dream: { imageUrl: string } & GeneratedCallingDetails) => void;
}

const InfoCard: React.FC<{ title: string; children: React.ReactNode, icon: string }> = ({ title, children, icon }) => (
    <div className="bg-white/80 rounded-2xl p-6 backdrop-blur-sm shadow-md">
        <h2 className="font-serif text-2xl text-forest-green font-bold mb-3 flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            {title}
        </h2>
        <div className="text-base text-forest-green/80 space-y-2">{children}</div>
    </div>
);

export const ActionStep: React.FC<ActionStepProps> = ({ calling, dream, onSave, onUpdateDream }) => {
    const [editPrompt, setEditPrompt] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const handleShare = async () => {
        if (!navigator.share || !dream.imageUrl) {
            alert("Web Share is not supported on this browser. Try downloading the image!");
            return;
        }

        try {
            const response = await fetch(dream.imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'spark-portrait.png', { type: blob.type });

            const shareData = {
                title: 'DreamLens Spark',
                text: `We discovered my child's spark! Look at this portrait of them as ${calling.name}. #DreamLens`,
                files: [file],
            };

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share(shareData);
            } else {
                 await navigator.share({ title: shareData.title, text: shareData.text });
            }
        } catch (error) {
            console.error('Error sharing:', error);
            if (error instanceof Error && error.name !== 'AbortError') {
              alert('Could not share the image.');
            }
        }
    };

    const handleMagicEdit = async () => {
        if (!editPrompt.trim()) return;
        setIsEditing(true);
        setEditError(null);

        try {
            const newImageUrl = await editStorybookImage(dream.imageUrl, editPrompt);
            onUpdateDream({ ...dream, imageUrl: newImageUrl });
            setEditPrompt('');
        } catch (error) {
            console.error("Failed to edit image:", error);
            setEditError("Magical interference! Could not edit the image. Please try again.");
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <div className="p-4 animate-fade-in-slow space-y-6" id="printable-dream">
            <style>
                {`@media print {
                    body * { visibility: hidden; }
                    #printable-dream, #printable-dream * { visibility: visible; }
                    #printable-dream { position: absolute; left: 0; top: 0; width: 100%; }
                    .no-print { display: none; }
                    .print-image { max-height: 40vh; width: auto; margin: 0 auto;}
                }`}
            </style>
            <div className="text-center">
                 <div className="bg-white rounded-2xl shadow-2xl p-4 mb-6 inline-block relative">
                    <img src={dream.imageUrl} alt={`Child as ${calling.name}`} className="w-full max-w-md object-contain rounded-lg print-image" />
                    {isEditing && (
                         <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                             <div className="w-12 h-12 border-4 border-warm-gold border-t-transparent rounded-full animate-spin"></div>
                         </div>
                    )}
                 </div>
                 <h3 className="font-serif text-4xl font-bold text-warm-gold">Behold, {calling.name}!</h3>
            </div>

            <div className="bg-white/90 rounded-2xl p-6 shadow-lg no-print">
                <h3 className="font-serif text-xl text-forest-green font-bold mb-3 flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    Refine the Dream
                </h3>
                <p className="text-sm text-stone mb-3">
                    Want to change something? Just ask the magic mirror.
                    <br/><span className="text-xs italic">(e.g., "Add a retro filter", "Make it winter", "Remove the background")</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                        type="text" 
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                        placeholder="How should we change the image?" 
                        className="flex-1 border border-stone/30 rounded-full px-4 py-2 focus:outline-none focus:border-warm-gold bg-soft-cream"
                        onKeyDown={(e) => e.key === 'Enter' && handleMagicEdit()}
                    />
                    <button 
                        onClick={handleMagicEdit}
                        disabled={isEditing || !editPrompt.trim()}
                        className="bg-forest-green text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-forest-green/90 transition-all disabled:bg-stone disabled:cursor-not-allowed"
                    >
                        {isEditing ? 'Transforming...' : 'Magic Edit'}
                    </button>
                </div>
                {editError && <p className="text-red-500 text-sm mt-2">{editError}</p>}
            </div>

            <InfoCard title="A Glimpse into the Future" icon="📖">
                <p>{dream.story}</p>
            </InfoCard>

            <InfoCard title="Inspired By..." icon="🌟">
                <h4 className="font-bold">{dream.roleModel.name}</h4>
                <p>{dream.roleModel.bio}</p>
            </InfoCard>

            <InfoCard title={dream.skillPath.title} icon="🛠️">
                <p>{dream.skillPath.description}</p>
            </InfoCard>
            
            <InfoCard title={dream.firstStep.title} icon="🌱">
                <p>{dream.firstStep.description}</p>
            </InfoCard>
            
            <div className="space-y-4 no-print">
                <button onClick={onSave} className="w-full bg-warm-gold text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-forest-green transition-all duration-300 transform hover:scale-105">
                    Save to Spark Time-Capsule
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button onClick={handleShare} className="flex items-center justify-center bg-sky-blue text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-sky-blue/80 transition-all duration-300 transform hover:scale-105">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z" /></svg>
                        Share
                    </button>
                    <a href={dream.imageUrl} download={`dreamlens-${calling.id}.png`} className="flex items-center justify-center bg-terracotta text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-terracotta/80 transition-all duration-300 transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download
                    </a>
                    <button onClick={() => window.print()} className="flex items-center justify-center bg-stone text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-stone/80 transition-all duration-300 transform hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v-2a1 1 0 011-1h8a1 1 0 011 1v2h1a2 2 0 002-2v-3a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
                        Print
                    </button>
                </div>
            </div>
        </div>
    );
};
