import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null)
    const textRef = useRef(null)
    const subTextRef = useRef(null)
    const lineRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => onComplete()
        })

        // Initial State
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" })

        // 1. Text fades in / moves up (Luxury Entry)
        tl.fromTo(textRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
            // 2. Underline animates middle -> left/right (scaleX 0 -> 1)
            .to(lineRef.current, {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.inOut"
            })
            // 3. Subtext fades in below
            .fromTo(subTextRef.current,
                { y: 20, opacity: 0, letterSpacing: "0.2em" },
                { y: 0, opacity: 1, letterSpacing: "0.5em", duration: 1, ease: "power2.out" },
                "-=0.4"
            )
            // Hold for a moment to let user see opacity
            .to({}, { duration: 0.5 })
            // 4. Exit
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            })
    }, [onComplete])

    // "auto click laga dete hai... possible hai to krdo"
    // Attempting to simulate a click to unlock audio context (Note: Modern browsers often block this for audio, but worth a try as requested)
    const paddingRef = useRef(null);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (paddingRef.current) {
                paddingRef.current.click();
                // Also try dispatching a real event to body
                document.body.click();
            }
        }, 500); // Small delay to ensure render
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center cursor-pointer" // cursor-pointer to encourage real clicks too
            onClick={() => { }} // Empty handler to catch bubbles
        >
            {/* Hidden Trigger for Auto-Click Attempt */}
            <button ref={paddingRef} className="hidden" aria-hidden="true" />

            <div className="flex flex-col items-center">
                {/* Main Title - Italic/Serif for that Royal Look in Image */}
                {/* "Text me golden white ka effect do" - Gradient Text */}
                <h1
                    ref={textRef}
                    className="font-heading italic text-4xl md:text-7xl mb-4 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#bf953f] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-slow"
                >
                    AD Royal Villa
                </h1>

                {/* Underline - Animated width */}
                <div
                    ref={lineRef}
                    className="h-[1px] bg-[#D4AF37] w-full md:w-2/3 mb-4"
                ></div>

                {/* Subtext */}
                <p
                    ref={subTextRef}
                    className="text-[#D4AF37] text-xs md:text-sm font-body uppercase tracking-[0.5em]"
                >
                    Experience Luxury
                </p>
            </div>
        </div>
    )
}

export default Loader
