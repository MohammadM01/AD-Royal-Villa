import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// The images requested
const leaves = [
    "/New/svg/leaf-1.svg",
    "/New/svg/leaf-2.svg",
    "/New/svg/image2vector (2).svg",
];

// Replicate them X times to assume "multiply their number by 2" (or more for a better effect)
const allLeaves = [...leaves, ...leaves];

const BackgroundLeaves = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const leafElements = gsap.utils.toArray(".bg-leaf");

            leafElements.forEach((leaf) => {
                // Random Start Positions
                gsap.set(leaf, {
                    x: gsap.utils.random(0, window.innerWidth),
                    y: gsap.utils.random(0, window.innerHeight),
                    rotation: gsap.utils.random(0, 360),
                    scale: gsap.utils.random(0.5, 1.2),
                    opacity: gsap.utils.random(0.3, 0.6)
                });

                // Continuous Wavy Motion
                // We'll move them around randomly in a loop
                animateLeaf(leaf);
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const animateLeaf = (element) => {
        // Create a random path for each leaf
        const duration = gsap.utils.random(10, 20);
        const xDir = gsap.utils.random(-100, 100);
        const yDir = gsap.utils.random(-100, 100);
        const rot = gsap.utils.random(-180, 180);

        const tl = gsap.timeline({
            onComplete: () => animateLeaf(element) // Loop with new random values
        });

        tl.to(element, {
            x: `+=${xDir}`,
            y: `+=${yDir}`,
            rotation: `+=${rot}`,
            duration: duration,
            ease: "sine.inOut"
        });
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
        >
            {allLeaves.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt=""
                    className="bg-leaf absolute w-24 h-24 md:w-32 md:h-32 object-contain opacity-50"
                />
            ))}
        </div>
    );
};

export default BackgroundLeaves;
