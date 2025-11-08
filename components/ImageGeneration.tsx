import React, { useState, useRef, useEffect } from 'react';
import type { Calling, ImageStyle, Virtue, GeneratedCallingDetails } from '../types';
import { generateStorybookImage, generateCallingDetails } from '../services/geminiService';

interface ImageGenerationProps {
    calling: Calling;
    virtue: Virtue;
    childsName: string;
    onDreamGenerated: (dream: { imageUrl: string } & GeneratedCallingDetails) => void;
}

const loadingMessages = [
    "Mixing paints and magic...",
    "Consulting with forest sprites...",
    "Writing your unique story...",
    "Capturing the dream...",
    "Finding an inspiring role model...",
    "Adding a touch of starlight...",
    "Almost there, the vision is clearing..."
];

const imageStyleOptions: { id: ImageStyle; label: string }[] = [
    { id: 'artistic', label: 'Artistic' },
    { id: 'photorealistic', label: 'Photorealistic' },
    { id: 'comic', label: 'Comic Book' },
];

export const ImageGeneration: React.FC<ImageGenerationProps> = ({ calling, virtue, childsName, onDreamGenerated }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<ImageStyle>('artistic');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError(null);
        }
    };

    const handleGenerateClick = async () => {
        if (!imageFile) {
            setError("Please upload a photo first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Run both API calls in parallel
            const [imageUrl, details] = await Promise.all([
                generateStorybookImage(imageFile, calling.name, selectedStyle),
                generateCallingDetails(childsName, virtue, calling)
            ]);
            onDreamGenerated({ imageUrl, ...details });
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
            setIsLoading(false);
        }
    };

    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = loadingMessages.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingMessages.length;
                    return loadingMessages[nextIndex];
                });
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    return (
        <div className="text-center p-4 flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
            {isLoading ? (
                <div className="flex flex-col items-center">
                     <div className="w-16 h-16 border-4 border-warm-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                     <p className="font-serif text-2xl text-forest-green">{loadingMessage}</p>
                </div>
            ) : (
                <>
                    <h2 className="font-serif text-3xl md:text-4xl text-forest-green mb-2">
                        Let's create the dream for your...
                    </h2>
                    <h1 className="font-serif text-5xl text-warm-gold font-extrabold mb-8">
                        {calling.name}
                    </h1>
                    
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
                    
                    <button onClick={() => fileInputRef.current?.click()} className="w-full max-w-sm h-64 border-4 border-dashed border-stone/50 rounded-2xl flex items-center justify-center mb-6 bg-white hover:border-warm-gold transition-colors">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-xl"/>
                        ) : (
                            <div className="text-stone">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span className="font-semibold">Click to upload photo</span>
                            </div>
                        )}
                    </button>
                    
                    <div className="mb-6">
                        <label className="font-serif text-xl text-forest-green mb-3 block">Choose a visual style:</label>
                        <div className="flex justify-center space-x-2 bg-stone/10 p-1 rounded-full">
                            {imageStyleOptions.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => setSelectedStyle(option.id)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${selectedStyle === option.id ? 'bg-forest-green text-white' : 'text-stone hover:bg-stone/20'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    
                    <button onClick={handleGenerateClick} disabled={!imageFile || isLoading} className="bg-warm-gold text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-forest-green transition-all duration-300 transform hover:scale-105 disabled:bg-stone disabled:scale-100">
                        Weave the Dream
                    </button>
                </>
            )}
        </div>
    );
};