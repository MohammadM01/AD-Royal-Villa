import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Butterfly = ({ id = 1, sizeClasses = "w-16 h-16" }) => {
    const containerRef = useRef(null);
    const innerWrapperRef = useRef(null); // Controls wing flapping

    // Using refs for animation timelines to access/kill them easily
    const wingTimelineRef = useRef(null);
    const wobbleTimelineRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current || !innerWrapperRef.current) return;

        // --- 1. SETUP ---
        // Initial random position
        const startX = Math.random() * (window.innerWidth - 100) + 50;
        const startY = Math.random() * (window.innerHeight - 100) + 50;

        gsap.set(containerRef.current, {
            x: startX,
            y: startY,
            scale: 0,
            rotation: "random(-15, 15)"
        });

        // Appear animation
        gsap.to(containerRef.current, { scale: 1, duration: 1, ease: "back.out(1.7)" });

        // --- 2. ANIMATION TIMELINES (Initially Paused or Active) ---

        // Wing Flapping (High speed flapping)
        wingTimelineRef.current = gsap.to(innerWrapperRef.current, {
            scaleY: 0.25, // Fold wings in
            yoyo: true,
            repeat: -1,
            duration: 0.12,
            ease: "sine.inOut",
            paused: true // Start paused, fly() will play it
        });

        // Wobble (Subtle rotation drift while flying)
        wobbleTimelineRef.current = gsap.to(containerRef.current, {
            rotation: "random(-20, 20)",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            paused: true // Start paused
        });


        // --- 3. CORE FUNCTIONS ---

        const sit = () => {
            // STATE: SITTING
            // CRITICAL: Side View (Wings folded up)

            // 1. Pause flapping timeline
            wingTimelineRef.current.pause();

            // 2. Animate to "resting" (Wings open)
            // Folding them creates a "line" artifact with top-down SVGs.
            // Keeping them open looks better for these assets.
            gsap.to(innerWrapperRef.current, {
                scaleY: 0.9, // Slightly relaxed, nearly full open
                duration: 0.4,
                ease: "power2.out"
            });

            // 3. Kill/Pause wobble
            wobbleTimelineRef.current.pause();
            // Reset rotation to 0 for a stable sit? Or keep last angle?
            // "Butterfly stays frozen in last position" -> Keep last angle.

            // 4. Wait 3 seconds -> Fly
            gsap.delayedCall(3, fly);
        };

        const fly = () => {
            // STATE: FLYING

            // 1. Resume animations
            // Restart flapping - this will reset scaleY to start of tween
            wingTimelineRef.current.restart();
            wobbleTimelineRef.current.resume(); // Resume wobble

            // 2. Pick Destination
            const nextX = Math.random() * (window.innerWidth - 100) + 50;
            const nextY = Math.random() * (window.innerHeight - 100) + 50;
            const flightDuration = 1 + Math.random(); // 1-2 seconds

            // 3. Direction & Flipping
            const currentX = gsap.getProperty(containerRef.current, "x");
            const isMovingRight = nextX > currentX;

            // Smooth flip
            gsap.to(containerRef.current, {
                scaleX: isMovingRight ? -1 : 1, // -1 flips horizontally
                duration: 0.3
            });

            // 4. Move
            gsap.to(containerRef.current, {
                x: nextX,
                y: nextY,
                duration: flightDuration,
                ease: "power1.inOut",
                onComplete: sit
            });
        };

        // --- 4. START SEQUENCE ---
        fly(); // Start flying immediately

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform"
        >
            {/* Inner Wrapper for independent wing transform */}
            <div ref={innerWrapperRef} className={`${sizeClasses} origin-center`}>
                <img
                    src={`/New/svg/butterfly/${id}.svg`}
                    alt="Butterfly"
                    className="w-full h-full object-contain drop-shadow-lg"
                />
            </div>
        </div>
    );
};

export default Butterfly;
