import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLeaf } from '../context/LeafContext';

const FloatingLeaf = () => {
    const { currentLeafTarget } = useLeaf();
    const leafRef = useRef(null);
    const leafImageRef = useRef(null);

    // Position state to smooth movement
    const xSet = useRef(null);
    const ySet = useRef(null);

    useGSAP(() => {
        // Initial position: Center Top (offscreen)
        gsap.set(leafRef.current, { x: window.innerWidth / 2, y: -150 });

        // Setup "QuickTo" for high performance tracking
        // Slower duration for "falling" feel
        xSet.current = gsap.quickTo(leafRef.current, "x", { duration: 1.5, ease: "power3.out" });
        ySet.current = gsap.quickTo(leafRef.current, "y", { duration: 1.5, ease: "power3.out" });

        // Continuous Waving (Sleeping Position - 90deg)
        gsap.to(leafImageRef.current, {
            rotation: 95,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            startAt: { rotation: 85 }
        });
    }, { scope: leafRef });

    // Tracking Logic
    useEffect(() => {
        const updatePosition = () => {
            // Check if currentLeafTarget is an object with element (new structure) or just element (old structure fallback)
            let targetEl = null;
            let anchor = 'top-left';

            if (currentLeafTarget) {
                if (currentLeafTarget.element) {
                    targetEl = currentLeafTarget.element;
                    anchor = currentLeafTarget.config?.anchor || 'top-left';
                } else if (currentLeafTarget.nodeType) {
                    targetEl = currentLeafTarget;
                }
            }

            if (targetEl && leafRef.current) {
                const rect = targetEl.getBoundingClientRect();

                let targetX = rect.left;
                let targetY = rect.top;

                if (anchor === 'bottom-right') {
                    // Position at bottom right of the target
                    targetX = rect.right - 40;
                    targetY = rect.bottom - 40;
                } else {
                    // Default Top-Left
                    targetX = rect.left - 20;
                    targetY = rect.top - 20;
                }

                // Apply to GSAP
                if (xSet.current && ySet.current) {
                    xSet.current(targetX);
                    ySet.current(targetY);
                }
            }
        };

        // Run on every GSAP tick
        gsap.ticker.add(updatePosition);
        return () => gsap.ticker.remove(updatePosition);
    }, [currentLeafTarget]);

    // Initial visible state
    useEffect(() => {
        if (currentLeafTarget) {
            gsap.to(leafRef.current, { opacity: 1, duration: 0.5 });
        }
    }, [currentLeafTarget]);

    return (
        <div
            ref={leafRef}
            className="fixed top-0 left-0 z-[100] pointer-events-none opacity-0 w-10 h-10 md:w-14 md:h-14"
        >
            <img
                ref={leafImageRef}
                src="/New/svg/leaf-2.svg"
                alt="Floating Leaf"
                className="w-full h-full object-contain drop-shadow-2xl"
            />
        </div>
    );
};

export default FloatingLeaf;
