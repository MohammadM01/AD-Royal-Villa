import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Kingfisher = ({ sizeClasses = "w-52 h-52" }) => {
    const containerRef = useRef(null);
    const innerWrapperRef = useRef(null);
    const imgRef = useRef(null);

    // Animation state in refs
    const frameRef = useRef(1);
    const frameDirectionRef = useRef(1); // 1 = increasing, -1 = decreasing
    const directionRef = useRef('right'); // 'right' or 'left'
    const isFlying = useRef(true);
    const animLoopRef = useRef(null);

    // We have 9 frames.
    const TOTAL_FRAMES = 9;

    // Preload images
    useEffect(() => {
        const preload = async () => {
            const promises = [];
            for (let i = 1; i <= TOTAL_FRAMES; i++) {
                const img = new Image();
                img.src = `/New/images/kingfisher/${i}.svg`;
                promises.push(img.decode().catch(() => { }));
            }
            await Promise.all(promises);
        };
        preload();
    }, []);

    const updateImage = () => {
        if (!imgRef.current) return;
        const currentFrame = frameRef.current;
        // Check direction for flipping
        const dir = directionRef.current;

        // Update Source
        imgRef.current.src = `/New/images/kingfisher/${currentFrame}.svg`;

        // CSS Flip for Left
        if (dir === 'left') {
            imgRef.current.style.transform = 'scaleX(-1)';
        } else {
            imgRef.current.style.transform = 'scaleX(1)';
        }
    };

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
            // Check if component is unmounted or refs missing
            if (!imgRef.current) return;

            if (isFlying.current) {
                let next = frameRef.current + frameDirectionRef.current;

                // Ping Pong Logic
                if (next > TOTAL_FRAMES) {
                    frameDirectionRef.current = -1;
                    next = TOTAL_FRAMES - 1;
                } else if (next < 1) {
                    frameDirectionRef.current = 1;
                    next = 2;
                }

                frameRef.current = next;
                updateImage();

                // Flap speed
                animLoopRef.current = gsap.delayedCall(0.08, animateFrames);
            } else {
                // If paused, check again soon
                animLoopRef.current = gsap.delayedCall(0.2, animateFrames);
            }
        };

        // Start animation loop
        animateFrames();

        // --- Enhanced Movement Logic ---
        const wander = () => {
            if (!containerRef.current) return;
            isFlying.current = true;

            const currentX = gsap.getProperty(containerRef.current, "x");
            const currentY = gsap.getProperty(containerRef.current, "y");

            // Random destination
            const dist = gsap.utils.random(400, 900); // Longer flights
            const angle = gsap.utils.random(0, Math.PI * 2);

            let nextX = currentX + Math.cos(angle) * dist;
            let nextY = currentY + Math.sin(angle) * dist;

            // Screen Boundaries
            const margin = 150;
            const w = window.innerWidth;
            const h = window.innerHeight;

            if (nextX < margin) nextX = margin + gsap.utils.random(0, 200);
            if (nextX > w - margin) nextX = w - margin - gsap.utils.random(0, 200);
            if (nextY < margin) nextY = margin + gsap.utils.random(0, 200);
            if (nextY > h - margin) nextY = h - margin - gsap.utils.random(0, 200);

            // Physics Stats
            const dx = nextX - currentX;
            const dy = nextY - currentY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Direction Logic
            const isMovingRight = dx > 0;
            const newDirection = isMovingRight ? 'right' : 'left';
            if (directionRef.current !== newDirection) {
                directionRef.current = newDirection;
                updateImage();
            }

            // --- REALISM: Speed & Tilt ---
            // Dive = Faster, Climb = Slower
            // dy > 0 is down (dive), dy < 0 is up (climb)
            const verticalFactor = dy / distance; // -1 to 1

            // Base speed (px/sec)
            let speed = 250;
            // Add speed if diving, remove if climbing
            speed += verticalFactor * 100;

            const duration = distance / speed;

            // Tilt based on climb/dive
            const tiltMax = 25;
            let rotation = verticalFactor * tiltMax;

            // If facing left, rotation is reversed visually?
            // Element rotation is clockwise.
            // Facing Right: Nose Right. Dive (CW) = Nose Down. Climb (CCW) = Nose Up.
            // Facing Left (ScaleX -1): Nose Left. Dive (CW) -> Nose Up? No.
            // A rotated element that is flipped:
            // visual_angle = angle * scaleX * scaleY
            // If scaleX is -1, visual rotation is inverted.
            // So if we want nose down (dive) for left-facing bird:
            // We need visual CCW rotation? 
            // Let's stick to standard logic and let CSS flip handle the mirroring.
            // Actually, if we rotate the container, the flip inside innerWrapper handles the bird facing.
            // IF we rotate innerWrapper:
            // Right: Rot 45deg = Nose Down.
            // Left (Flipped): Rot 45deg = Nose Down? 
            // Let's visualize: 
            // image -> scaleX(-1) -> rotate(45deg)
            // Original: >  Flipped: <
            // Rotate Flipped 45: Beak points UP-LEFT.
            // We want Beak points DOWN-LEFT for dive.
            // So for Left facing, we need NEGATIVE rotation to dive.

            if (!isMovingRight) {
                rotation = -rotation;
            }

            // Animate 
            gsap.to(innerWrapperRef.current, {
                rotation: rotation,
                duration: duration * 0.5,
                ease: "sine.inOut"
            });

            gsap.to(containerRef.current, {
                x: nextX,
                y: nextY,
                duration: duration,
                ease: "sine.inOut",
                onComplete: wander
            });
        };

        // Initialize movement
        wander();

        return () => {
            if (animLoopRef.current) animLoopRef.current.kill();
            gsap.killTweensOf(containerRef.current);
            gsap.killTweensOf(innerWrapperRef.current);
        };

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 z-50 pointer-events-none will-change-transform"
        >
            <div ref={innerWrapperRef} className={`${sizeClasses} relative`}>
                <img
                    ref={imgRef}
                    src="/New/images/kingfisher/1.svg"
                    alt="Kingfisher"
                    className="w-full h-full object-contain drop-shadow-2xl"
                    style={{ transition: 'none' }} // Important for instant frame switch
                />
            </div>
        </div>
    );
};

export default Kingfisher;
