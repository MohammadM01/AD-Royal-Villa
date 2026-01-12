import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const FloatingLeaf = () => {
    const containerRef = useRef(null);
    const leafRef = useRef(null);
    const lastSideRef = useRef('right'); // Start ensuring first is left

    useGSAP(() => {
        const leaf = leafRef.current;
        if (!leaf) return;

        const startFall = () => {
            const h = window.innerHeight;
            const w = window.innerWidth;

            // Kill all previous tweens (important because of infinite sway)
            gsap.killTweensOf(leaf);

            // 1. Reset State
            // Alternate side
            const side = lastSideRef.current === 'left' ? 'right' : 'left';
            lastSideRef.current = side;

            // Safe margins to prevent going out of screen
            // Left: 10px to 20% width
            // Right: 80% width to Width - 50px (leaf size approx)
            const margin = 20;
            const leafWidth = 50; // approx max width

            const startX = side === 'left'
                ? gsap.utils.random(margin, w * 0.2)
                : gsap.utils.random(w * 0.8, w - leafWidth - margin);

            gsap.set(leaf, {
                x: startX,
                y: -100,
                rotation: gsap.utils.random(0, 360),
                rotationX: 0, // Ensure flat
                rotationY: 0, // Ensure flat
                opacity: 0,
                scale: gsap.utils.random(0.8, 1.2)
            });

            // 2. Main Fall Tween
            gsap.to(leaf, {
                y: h + 150,
                duration: gsap.utils.random(20, 30), // Slower fall (was 10-15)
                ease: "none",
                onComplete: startFall
            });

            // 3. Sway (X-axis) - Reduced sway to keep in bounds
            gsap.to(leaf, {
                x: `+=${gsap.utils.random(-30, 30)}`,
                duration: gsap.utils.random(5, 8), // Slower sway
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 4. Rotation - Continuous spin (2D only)
            gsap.to(leaf, {
                rotation: `+=${gsap.utils.random(180, 360)}`, // Slower rotation
                duration: gsap.utils.random(20, 30), // Match fall duration
                ease: "none"
            });

            // 5. Opacity - Fade in then stay
            gsap.to(leaf, {
                opacity: 0.8,
                duration: 1
            });
        };

        startFall();

        return () => {
            gsap.killTweensOf(leaf);
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            <img
                ref={leafRef}
                src="/New/svg/leaf-2.svg"
                alt="Floating Leaf"
                className="absolute w-10 h-10 md:w-14 md:h-14 object-contain drop-shadow-xl"
            />
        </div>
    );
};

export default FloatingLeaf;
