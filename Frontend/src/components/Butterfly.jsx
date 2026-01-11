import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Butterfly = ({ id = 1, sizeClasses = "w-16 h-16", startFar = false }) => {
    const containerRef = useRef(null);
    const innerWrapperRef = useRef(null); // Controls wing flapping

    // Refs for image elements to toggle opacity
    const imageLeftRef = useRef(null);
    const imageRightRef = useRef(null);

    // Using refs for animation timelines to access/kill them easily
    const wingTimelineRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current || !innerWrapperRef.current) return;

        // --- 1. CONFIGURATION for REALISM ---
        const PAD = 50;

        // Initial setup
        const startX = gsap.utils.random(PAD, window.innerWidth - PAD);
        const startY = gsap.utils.random(PAD, window.innerHeight - PAD);

        // SIZE: Small + 20% Increase (Tuned)
        // Close=0.30, Far=0.18
        const initialScale = startFar ? 0.18 : 0.30;

        gsap.set(containerRef.current, {
            x: startX,
            y: startY,
            scale: 0, // Start hidden
            rotation: gsap.utils.random(-15, 15),
            transformOrigin: "center center"
        });

        // Appear
        gsap.to(containerRef.current, { scale: initialScale, duration: 1.5, ease: "power2.out" });

        // --- 2. FLAPPING (The "Engine") ---
        const flapWings = () => {
            if (!wingTimelineRef.current) return;

            // Flap speed varies: Mostly cruising (slower)
            const isPanic = Math.random() > 0.85;
            const duration = isPanic ? gsap.utils.random(0.06, 0.1) : gsap.utils.random(0.15, 0.25);
            const scaleY = isPanic ? 0.1 : 0.35;

            gsap.to(innerWrapperRef.current, {
                scaleY: scaleY,
                duration: duration,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut",
                onComplete: flapWings
            });
        };

        // Start flapping flag
        wingTimelineRef.current = true;
        flapWings();

        // --- 3. TURBULENCE ---
        gsap.to(containerRef.current, {
            y: "+=15",
            duration: 0.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            modifiers: {
                y: gsap.utils.unitize((y) => parseFloat(y) + (Math.random() * 3))
            }
        });

        // Rotation
        gsap.to(containerRef.current, {
            rotation: "random(-20, 20)",
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });


        // --- 4. PATHING (Erratic Wandering) ---
        const wander = () => {
            if (!containerRef.current) return;

            // Ensure flap loop is running if taking off
            if (!wingTimelineRef.current) {
                wingTimelineRef.current = true;
                flapWings();
            }

            const currentX = gsap.getProperty(containerRef.current, "x");
            const currentY = gsap.getProperty(containerRef.current, "y");

            // Look ahead: Longer paths for smoother realism
            const dist = gsap.utils.random(150, 400);
            const angle = gsap.utils.random(0, Math.PI * 2);

            // Calculate next position
            let nextX = currentX + Math.cos(angle) * dist;
            let nextY = currentY + Math.sin(angle) * dist;

            // Round values to prevent sub-pixel weirdness
            nextX = Math.round(nextX);
            nextY = Math.round(nextY);

            // Boundaries
            const margin = 100;
            if (nextX < margin) nextX = margin + gsap.utils.random(0, 100);
            if (nextX > window.innerWidth - margin) nextX = window.innerWidth - margin - gsap.utils.random(0, 100);
            if (nextY < margin) nextY = margin + gsap.utils.random(0, 100);
            if (nextY > window.innerHeight - margin) nextY = window.innerHeight - margin - gsap.utils.random(0, 100);

            // Duration
            const speed = gsap.utils.random(80, 160);
            const duration = dist / speed;

            // Direction Logic -> Toggle Opacity (Left vs Right) to avoid flicker
            const isMovingRight = nextX > currentX;

            if (imageLeftRef.current && imageRightRef.current) {
                if (isMovingRight) {
                    // Show Right (5.png), Hide Left (3.png)
                    gsap.set(imageRightRef.current, { opacity: 1 });
                    gsap.set(imageLeftRef.current, { opacity: 0 });
                } else {
                    // Show Left (3.png), Hide Right (5.png)
                    gsap.set(imageLeftRef.current, { opacity: 1 });
                    gsap.set(imageRightRef.current, { opacity: 0 });
                }
            }

            // Move
            gsap.to(containerRef.current, {
                x: nextX,
                y: nextY,
                duration: duration,
                ease: "sine.inOut",
                onComplete: () => {
                    // 35% Chance to sit/land
                    if (Math.random() < 0.35) {
                        sit();
                    } else {
                        wander();
                    }
                }
            });

            // Depth/Scale Drift (Slow independent drift)
            const randomScale = gsap.utils.random(startFar ? 0.15 : 0.26, startFar ? 0.22 : 0.34);
            gsap.to(containerRef.current, {
                scale: randomScale,
                duration: duration + 1,
                ease: "sine.inOut"
            });
        };

        const sit = () => {
            if (!containerRef.current || !innerWrapperRef.current) return;

            // 1. Stop flapping loop
            wingTimelineRef.current = false;

            // 2. Animate wings to "Parked" state
            gsap.to(innerWrapperRef.current, {
                scaleY: 0.85,
                duration: 0.5,
                ease: "power2.out",
                overwrite: true
            });

            // 3. Wait random time (0.5 to 5s)
            const restDuration = gsap.utils.random(0.5, 5);

            // 4. Takeoff
            gsap.delayedCall(restDuration, wander);
        };

        wander();

        return () => {
            wingTimelineRef.current = false;
            gsap.killTweensOf(containerRef.current);
            gsap.killTweensOf(innerWrapperRef.current);
        };

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 z-40 pointer-events-none will-change-transform"
        >
            <div ref={innerWrapperRef} className={`${sizeClasses} origin-center relative`}>
                {/* Two images stacked: Left and Right. We toggle opacity. */}

                {/* Left Facing (3.png) */}
                <img
                    ref={imageLeftRef}
                    src="/New/svg/butterfly/3.webp"
                    alt="Butterfly Left"
                    className="w-full h-full object-contain drop-shadow-xl absolute top-0 left-0 transition-none"
                    style={{ opacity: 0 }} // Start hidden (or 1 depending on initial)
                />

                {/* Right Facing (5.png) */}
                <img
                    ref={imageRightRef}
                    src="/New/svg/butterfly/5.webp"
                    alt="Butterfly Right"
                    className="w-full h-full object-contain drop-shadow-xl absolute top-0 left-0 transition-none"
                    style={{ opacity: 1 }} // Start visible (Default)
                />
            </div>
        </div>
    );
};

export default Butterfly;
