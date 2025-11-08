import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SparkQuiz } from './components/SparkQuiz';
import { VirtueReveal } from './components/VirtueReveal';
import { CallingSelection } from './components/CallingSelection';
import { ImageGeneration } from './components/ImageGeneration';
import { ActionStep } from './components/ActionStep';
import { TimeCapsule } from './components/TimeCapsule';
import type { Virtue, Calling, TimeCapsuleEntry, GeneratedCallingDetails } from './types';
import { VIRTUES, CALLINGS } from './constants';
import { IntroScreen } from './components/IntroScreen';
import { TimeCapsuleModal } from './components/TimeCapsuleModal';

type AppState = 'intro' | 'welcome' | 'quiz' | 'reveal' | 'calling' | 'generate' | 'action' | 'capsule';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('intro');
    const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
    const [revealedVirtue, setRevealedVirtue] = useState<Virtue | null>(null);
    const [selectedCalling, setSelectedCalling] = useState<Calling | null>(null);
    const [generatedDream, setGeneratedDream] = useState<Omit<TimeCapsuleEntry, 'id' | 'date' | 'name' | 'virtue' | 'calling'> | null>(null);
    const [timeCapsule, setTimeCapsule] = useState<TimeCapsuleEntry[]>([]);
    const [childsName, setChildsName] = useState<string>('');
    const [viewingCapsuleEntry, setViewingCapsuleEntry] = useState<TimeCapsuleEntry | null>(null);


    const handleStartQuiz = (name: string) => {
        setChildsName(name);
        setAppState('quiz');
    };

    const handleQuizComplete = (answers: string[]) => {
        setQuizAnswers(answers);
        const compassionCount = answers.filter(a => a === 'compassion').length;
        const creativityCount = answers.filter(a => a === 'creativity').length;
        const courageCount = answers.filter(a => a === 'courage').length;
        const curiosityCount = answers.filter(a => a === 'curiosity').length;

        const counts = { compassion: compassionCount, creativity: creativityCount, courage: courageCount, curiosity: curiosityCount };
        const maxVirtue = Object.keys(counts).reduce((a, b) => counts[a as keyof typeof counts] >= counts[b as keyof typeof counts] ? a : b) as keyof typeof VIRTUES;
        
        setRevealedVirtue(VIRTUES[maxVirtue]);
        setAppState('reveal');
    };

    const handleCallingSelect = (calling: Calling) => {
        setSelectedCalling(calling);
        setAppState('generate');
    };
    
    const handleDreamGenerated = (dream: { imageUrl: string } & GeneratedCallingDetails) => {
        setGeneratedDream(dream);
        setAppState('action');
    };
    
    const handleSaveToCapsule = () => {
        if (revealedVirtue && selectedCalling && generatedDream && childsName) {
            const newEntry: TimeCapsuleEntry = {
                id: Date.now(),
                name: childsName,
                virtue: revealedVirtue,
                calling: selectedCalling,
                ...generatedDream,
                date: new Date().toLocaleDateString(),
            };
            setTimeCapsule(prev => [...prev, newEntry]);
            setAppState('capsule');
        }
    };
    
    const handleRestart = () => {
        setAppState('welcome');
        setQuizAnswers([]);
        setRevealedVirtue(null);
        setSelectedCalling(null);
        setGeneratedDream(null);
        setChildsName('');
    };

    const handleShowCapsule = () => {
        setAppState('capsule');
    };

    const renderContent = () => {
        switch (appState) {
            case 'intro':
                return <IntroScreen onComplete={() => setAppState('welcome')} />;
            case 'welcome':
                return <WelcomeScreen onStart={handleStartQuiz} />;
            case 'quiz':
                return <SparkQuiz onComplete={handleQuizComplete} />;
            case 'reveal':
                return revealedVirtue && <VirtueReveal virtue={revealedVirtue} onContinue={() => setAppState('calling')} childsName={childsName} />;
            case 'calling':
                const filteredCallings = revealedVirtue ? Object.values(CALLINGS).filter(c => c.virtue === revealedVirtue.id) : [];
                return revealedVirtue && <CallingSelection virtue={revealedVirtue} callings={filteredCallings} onSelect={handleCallingSelect} />;
            case 'generate':
                return selectedCalling && revealedVirtue && <ImageGeneration calling={selectedCalling} virtue={revealedVirtue} childsName={childsName} onDreamGenerated={handleDreamGenerated} />;
            case 'action':
                return selectedCalling && generatedDream && <ActionStep calling={selectedCalling} dream={generatedDream} onSave={handleSaveToCapsule} />;
            case 'capsule':
                return <TimeCapsule entries={timeCapsule} onRestart={handleRestart} onViewEntry={setViewingCapsuleEntry} />;
            default:
                return <WelcomeScreen onStart={handleStartQuiz} />;
        }
    };

    return (
        <div className="min-h-screen bg-soft-cream text-forest-green flex flex-col items-center justify-center p-4 transition-all duration-500">
            <div className="w-full max-w-2xl mx-auto relative">
                {appState !== 'welcome' && appState !== 'intro' && (
                    <button 
                        onClick={handleRestart} 
                        className="absolute -top-2 left-0 text-stone hover:text-forest-green transition-colors z-10 p-2 bg-white/50 rounded-full shadow-sm hover:shadow-md"
                        aria-label="Start Over"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </button>
                )}
                 {timeCapsule.length > 0 && appState !== 'capsule' && appState !== 'intro' && (
                    <button 
                        onClick={handleShowCapsule} 
                        className="absolute -top-2 right-0 text-stone hover:text-forest-green transition-colors z-10 p-2 bg-white/50 rounded-full shadow-sm hover:shadow-md"
                        aria-label="Time Capsule"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                    </button>
                )}
                {renderContent()}
                 {viewingCapsuleEntry && (
                    <TimeCapsuleModal entry={viewingCapsuleEntry} onClose={() => setViewingCapsuleEntry(null)} />
                )}
            </div>
        </div>
    );
};

export default App;