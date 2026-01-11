import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const subTextRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => onComplete()
        });

        // Set initial states
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });

        // Animation Sequence
        // 1. Logo fades in and moves up slightly
        tl.fromTo(logoRef.current,
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
            // 2. Text fades in / moves up (Overlapping with Logo)
            .fromTo(textRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.4"
            )
            // 3. Underline expands
            .to(lineRef.current, {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut"
            }, "-=0.6")
            // 4. Subtext fades in
            .fromTo(subTextRef.current,
                { y: 20, opacity: 0, letterSpacing: "0.2em" },
                { y: 0, opacity: 1, letterSpacing: "0.5em", duration: 0.8, ease: "power2.out" },
                "-=0.4"
            )
            // Hold briefly
            .to({}, { duration: 0.5 })
            // 5. Exit (Fade out container)
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });

    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Logo Section */}
            <div className="mb-6 overflow-hidden">
                <img
                    ref={logoRef}
                    src="/New/logo/logo.webp"
                    alt="AD Royal Villa"
                    className="w-24 md:w-32 h-auto object-contain brightness-0 invert drop-shadow-2xl"
                />
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center">
                <h1
                    ref={textRef}
                    className="font-heading italic text-3xl md:text-6xl mb-4 bg-gradient-to-r from-[#00b4d8] via-[#a0e2f3] to-[#00b4d8] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-slow text-center px-4"
                >
                    AD Royal Villa
                </h1>

                {/* Golden Line */}
                <div
                    ref={lineRef}
                    className="h-[1px] bg-[#00b4d8] w-48 md:w-96 mb-4"
                ></div>

                {/* Subtext */}
                <p
                    ref={subTextRef}
                    className="text-[#00b4d8] text-[10px] md:text-sm font-body uppercase tracking-[0.5em] text-center"
                >
                    Experience Luxury
                </p>
            </div>

            {/* Optional Glow */}
            <div className="absolute inset-0 bg-[#00b4d8]/5 blur-3xl -z-10 rounded-full pointer-events-none" />
        </div>
    );
};

export default Preloader;
