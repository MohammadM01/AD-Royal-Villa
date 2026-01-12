import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const FloatingLeaf = () => {
    const containerRef = useRef(null);
    const leafRef = useRef(null);

    useGSAP(() => {
        const leaf = leafRef.current;
        if (!leaf) return;

        const animateLeaf = () => {
            const h = window.innerHeight;
            const w = window.innerWidth;

            // Reset to top with random X
            gsap.set(leaf, {
                x: gsap.utils.random(0, w),
                y: -100,
                rotation: gsap.utils.random(0, 360),
                opacity: 0,
                scale: gsap.utils.random(0.8, 1.2)
            });

            // Fade in
            gsap.to(leaf, { opacity: 1, duration: 1 });

            // Swallow any previous tweens on the leaf ensuring a fresh start
            gsap.killTweensOf(leaf);

            // Re-apply fade in after kill (bad order above? no, killTweensOf kills everything)
            // Let's structure better.
        };

        const startFall = () => {
            const h = window.innerHeight;
            const w = window.innerWidth;

            // 1. Reset State
            gsap.set(leaf, {
                x: gsap.utils.random(10, w - 50),
                y: -100,
                rotation: gsap.utils.random(0, 360),
                opacity: 0,
                scale: gsap.utils.random(0.8, 1.2)
            });

            // 2. Main Fall Tween
            gsap.to(leaf, {
                y: h + 100,
                duration: gsap.utils.random(15, 25), // Slow, relaxing fall
                ease: "none",
                onComplete: startFall // Loop
            });

            // 3. Sway (X-axis)
            gsap.to(leaf, {
                x: `+=${gsap.utils.random(-150, 150)}`, // Drift left/right
                duration: gsap.utils.random(3, 6),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 4. Rotation
            gsap.to(leaf, {
                rotation: `+=${gsap.utils.random(180, 540)}`,
                duration: gsap.utils.random(15, 25), // Match fall duration approx
                ease: "linear"
            });

            // 5. Opacity - Fade in then stay
            gsap.to(leaf, {
                opacity: 1,
                duration: 2
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
