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

        // Force volume to 100%
        audio.volume = 1.0;

        const attemptPlay = async () => {
            try {
                // Try playing immediately
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log("Autoplay blocked, waiting for interaction");
                setIsPlaying(false);
            }
        };

        if (isMusicEnabled) {
            attemptPlay();

            // "reload pr off ho rhi hai" -> If enabled but blocked, play on FIRST interaction
            const handleInteraction = () => {
                if (isMusicEnabled && (audio.paused || audio.muted)) {
                    audio.play()
                        .then(() => setIsPlaying(true))
                        .catch(e => console.log("Interaction play failed:", e));
                }
            };

            // Listen to every possible interaction event to "unlock" audio context
            // Use 'true' for capture to catch it before anything else stops propagation
            window.addEventListener('click', handleInteraction, true);
            window.addEventListener('scroll', handleInteraction, true); // Result of scrolling
            window.addEventListener('wheel', handleInteraction, true); // Actual Mouse Wheel (Trusted Gesture)
            window.addEventListener('keydown', handleInteraction, true);
            window.addEventListener('touchstart', handleInteraction, true); // Mobile support
            window.addEventListener('touchmove', handleInteraction, true); // Mobile scrolling
            window.addEventListener('mousemove', handleInteraction, true);

            return () => {
                window.removeEventListener('click', handleInteraction, true);
                window.removeEventListener('scroll', handleInteraction, true);
                window.removeEventListener('wheel', handleInteraction, true);
                window.removeEventListener('keydown', handleInteraction, true);
                window.removeEventListener('touchstart', handleInteraction, true);
                window.removeEventListener('touchmove', handleInteraction, true);
                window.removeEventListener('mousemove', handleInteraction, true);
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

    // Aggressively try to play periodically if blocked (some browsers unlock after time or minor events)
    useEffect(() => {
        const interval = setInterval(() => {
            if (isMusicEnabled && audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(e => {
                    // Suppress console spam for expected blocking
                });
                setIsPlaying(false);
            } else if (isMusicEnabled && audioRef.current && !audioRef.current.paused) {
                setIsPlaying(true);
                clearInterval(interval); // Stop showing once successful
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [isMusicEnabled]);

    return (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-4">
            <audio
                ref={audioRef}
                src="/nature.mp3"
                loop
                autoPlay
                preload="auto"
            />
            {/* Iframe Workaround */}
            {isMusicEnabled && (
                <iframe
                    src="/nature.mp3"
                    allow="autoplay"
                    style={{ display: 'none' }}
                    id="iframeAudio"
                ></iframe>
            )}

            <button
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer group relative ${isMusicEnabled ? "bg-primary text-white hover:bg-accent" : "bg-gray-400 text-gray-200"
                    }`}
                title={isMusicEnabled ? "Mute Background Music" : "Play Background Music"}
            >
                {isMusicEnabled ? (
                    <FaMusic className="text-lg animate-pulse" />
                ) : (
                    <FaVolumeMute className="text-lg" />
                )}

                {isMusicEnabled && isPlaying && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-20 animate-ping"></span>
                )}
            </button>

            {/* Helper Text if Autoplay Blocked */}
            {isMusicEnabled && !isPlaying && (
                <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-full animate-bounce">
                    Click anywhere to start music 🎵
                </div>
            )}
        </div>
    );
};

export default BackgroundMusic;
