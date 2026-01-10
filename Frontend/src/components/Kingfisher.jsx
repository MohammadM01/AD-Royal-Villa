import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Kingfisher = ({ sizeClasses = "w-52 h-52" }) => {
    const containerRef = useRef(null);
    const innerWrapperRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [direction, setDirection] = useState('right'); // 'right' or 'left'
    const isFlying = useRef(true);
    const frameDirection = useRef(1); // 1 = increasing, -1 = decreasing

    // We have 9 frames generated.
    // Cycle: 1 -> 9 -> 1 (Ping Pong for smooth up/down transition)
    const TOTAL_FRAMES = 9;

    useGSAP(() => {
        if (!containerRef.current || !innerWrapperRef.current) return;

        // --- Setup ---
        const PAD = 50;
        const startX = gsap.utils.random(PAD, window.innerWidth - PAD);
        const startY = gsap.utils.random(PAD, window.innerHeight - PAD);

        gsap.set(containerRef.current, {
            x: startX,
            y: startY,
            scale: 0,
            transformOrigin: "center center"
        });

        // Intro
        gsap.to(containerRef.current, { scale: 1, duration: 2.0, ease: "power2.out" });

        // --- Animation Loop for Frames ---
        const animateFrames = () => {
            if (isFlying.current) {
                setCurrentFrame(prev => {
                    let next = prev + frameDirection.current;

                    // Ping Pong Logic
                    if (next > TOTAL_FRAMES) {
                        frameDirection.current = -1;
                        return TOTAL_FRAMES - 1;
                    }
                    if (next < 1) {
                        frameDirection.current = 1;
                        return 2;
                    }

                    return next;
                });
                // Slightly faster for fluidity
                gsap.delayedCall(0.09, animateFrames);
            } else {
                // If we paused (though currently continuous), just resume
                gsap.delayedCall(0.2, animateFrames);
            }
        };
        animateFrames();

        // --- Movement Logic ---
        const wander = () => {
            if (!containerRef.current) return;
            isFlying.current = true;

            const currentX = gsap.getProperty(containerRef.current, "x");
            const currentY = gsap.getProperty(containerRef.current, "y");

            // Longer, smoother paths
            const dist = gsap.utils.random(300, 700);
            const angle = gsap.utils.random(0, Math.PI * 2);

            let nextX = currentX + Math.cos(angle) * dist;
            let nextY = currentY + Math.sin(angle) * dist;

            // Soft Boundaries
            const margin = 100;
            const w = window.innerWidth;
            const h = window.innerHeight;

            if (nextX < margin) nextX = margin + 150;
            if (nextX > w - margin) nextX = w - margin - 150;
            if (nextY < margin) nextY = margin + 150;
            if (nextY > h - margin) nextY = h - margin - 150;

            // Physics Calculation
            const dx = nextX - currentX;
            const dy = nextY - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Reduced Speed for "Soft Swing" feel (was 300)
            const speed = 130;
            const duration = distance / speed;

            // Direction
            const isMovingRight = dx > 0;
            setDirection(isMovingRight ? 'right' : 'left');

            // --- Rotation / Swing Logic ---
            // Tilt based on vertical trajectory ratio
            const verticalRatio = dy / distance; // -1 (Direct Up) to 1 (Direct Down)
            const tiltStrength = 20; // Degrees

            let targetRotation = 0;
            if (isMovingRight) {
                // Right Facing: Nose right.
                // Moving Down (dy>0) -> Nose points down (Positive Rotation)
                // Moving Up (dy<0) -> Nose points up (Negative Rotation)
                targetRotation = verticalRatio * tiltStrength;
            } else {
                // Left Facing: Nose left.
                // Moving Down (dy>0) -> Nose points down (Negative Rotation for left facing? No, Nose Left is mirrored)
                // Let's visualize: 
                // Element isn't flipped via CSS transform scaleX anymore. We load a different image.
                // So 'innerWrapper' rotation is standard CW.
                // If Facing Left (Normal Image):
                // Beak is Left.
                // To point beak Down (CW rotation): Head goes up? No.
                // Beak Left. Rotate CW -> Beak goes Up.
                // Beak Left. Rotate CCW -> Beak goes Down.

                // So for Left Facing:
                // Moving Down (dy>0) -> Need Beak Down -> Rotate CCW (-)
                // Moving Up (dy<0) -> Need Beak Up -> Rotate CW (+)
                targetRotation = -verticalRatio * tiltStrength;
            }

            // Animate Rotation
            gsap.to(innerWrapperRef.current, {
                rotation: targetRotation,
                duration: duration * 0.3,
                ease: "power2.out"
            });

            // Move
            gsap.to(containerRef.current, {
                x: nextX,
                y: nextY,
                duration: duration,
                ease: "power1.inOut", // Soft ease
                onComplete: () => {
                    // Immediately wander again for continuous flight
                    wander();
                }
            });
        };

        // Initialize
        wander();

        return () => {
            gsap.killTweensOf(containerRef.current);
            gsap.killTweensOf(innerWrapperRef.current);
            gsap.killTweensOf(animateFrames);
        };

    }, { scope: containerRef });

    // Construct Image Path
    const imagePath = direction === 'left'
        ? `/New/images/kingfisher/${currentFrame}_left.png`
        : `/New/images/kingfisher/${currentFrame}.png`;

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform"
        >
            <div ref={innerWrapperRef} className={`${sizeClasses} relative`}>
                <img
                    src={imagePath}
                    alt="Kingfisher"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{ transition: 'none' }}
                />
            </div>
        </div>
    );
};

export default Kingfisher;
