
import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
    onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
    const [animationState, setAnimationState] = useState('start');

    useEffect(() => {
        const timer1 = setTimeout(() => setAnimationState('forming'), 100);
        const timer2 = setTimeout(() => setAnimationState('revealing'), 3000);
        const timer3 = setTimeout(() => {
            setAnimationState('finished');
            onComplete();
        }, 4500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onComplete]);

    const dots = Array.from({ length: 15 });

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <style>
                {`
                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: absolute;
                    transition: all 1.5s cubic-bezier(0.25, 1, 0.5, 1);
                    transform: scale(0) rotate(0deg);
                }
                .forming .dot {
                    transform: scale(1) rotate(360deg);
                }
                .revealing .dot {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                `}
            </style>
            <div className={`relative w-48 h-48 mb-8 transition-opacity duration-1000 ${animationState === 'revealing' ? 'opacity-0' : 'opacity-100'}`}>
                <div className={animationState}>
                    {dots.map((_, i) => {
                        const angle = (i / dots.length) * 2 * Math.PI;
                        const radius1 = 70; // Outer circle
                        const radius2 = 40; // Inner circle
                        const isOuter = i % 2 === 0;
                        const radius = isOuter ? radius1 : radius2;

                        return (
                            <div
                                key={i}
                                className="dot bg-warm-gold"
                                style={{
                                    top: `calc(50% - 4px + ${-Math.cos(angle) * radius}px)`,
                                    left: `calc(50% - 4px + ${Math.sin(angle) * radius}px)`,
                                    transitionDelay: `${i * 50}ms`,
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={`transition-opacity duration-1000 ${animationState === 'revealing' ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="font-serif text-6xl text-forest-green">DreamLens</h1>
                <p className="text-stone text-center mt-2">Find your child's spark.</p>
            </div>
        </div>
    );
};
