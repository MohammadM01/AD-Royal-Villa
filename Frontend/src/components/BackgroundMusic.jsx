import React, { useState, useRef, useEffect } from 'react';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

const BackgroundMusic = () => {
    // "hamesha on rehni cahiyte jab tak user khud off naih kr deta"
    // Use localStorage to remember user preference. Default to 'true' (enabled).
    const [isMusicEnabled, setIsMusicEnabled] = useState(() => {
        const saved = localStorage.getItem('musicEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    });

    // Track actual audio playing state for UI (optional, but good for syncing)
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Toggle User Preference
    const togglePlay = () => {
        const newState = !isMusicEnabled;
        setIsMusicEnabled(newState);
        localStorage.setItem('musicEnabled', JSON.stringify(newState));

        if (newState) {
            audioRef.current?.play().catch(e => console.log("Play failed:", e));
        } else {
            audioRef.current?.pause();
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const attemptPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Autoplay blocked, waiting for interaction");
                setIsPlaying(false);
            }
        };

        if (isMusicEnabled) {
            attemptPlay();

            // "reload pr off ho rhi hai" -> If enabled but blocked, play on FIRST click
            const handleInteraction = () => {
                if (isMusicEnabled && audio.paused) {
                    audio.play().catch(e => console.log(e));
                    setIsPlaying(true);
                }
            };

            document.addEventListener('click', handleInteraction);
            document.addEventListener('scroll', handleInteraction); // Scroll is also interaction
            document.addEventListener('keydown', handleInteraction);

            return () => {
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('scroll', handleInteraction);
                document.removeEventListener('keydown', handleInteraction);
            };
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    }, [isMusicEnabled]);

    // Sync state with audio events (in case of external interruptions)
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);

        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
        };
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <audio
                ref={audioRef}
                src="/New/music/nature-birds-singing.mp3"
                loop
                preload="auto"
            />
            <button
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer group ${isMusicEnabled ? "bg-primary text-white hover:bg-accent" : "bg-gray-400 text-gray-200"
                    }`}
                title={isMusicEnabled ? "Mute Background Music" : "Play Background Music"}
            >
                {isMusicEnabled ? (
                    <FaMusic className="text-lg animate-pulse" />
                ) : (
                    <FaVolumeMute className="text-lg" />
                )}

                {/* Visual sound wave effect when playing */}
                {isMusicEnabled && isPlaying && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-20 animate-ping"></span>
                )}
            </button>
        </div>
    );
};

export default BackgroundMusic;
