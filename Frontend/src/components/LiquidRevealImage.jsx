import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const LiquidRevealImage = ({ src, alt, title, description, className, index = 0 }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);
    const cardRef = useRef(null);
    const liquidMaskRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            delay: index * 0.25, // Staggered delay
        });

        // Initial state setup
        gsap.set(containerRef.current, { visibility: 'visible' });
        gsap.set(cardRef.current, { autoAlpha: 0, scaleX: 0 }); // Start collapsed horizontally

        // Liquid Reveal Animation
        // Mask starts at 0 (covering the image) and moves to the right (clearing it)
        tl.fromTo(liquidMaskRef.current,
            { xPercent: 0 },
            {
                xPercent: 200,
                duration: 1.4,
                ease: "power2.inOut",
            }
        )
            .from(imageRef.current, {
                scale: 1.4,
                duration: 1.4,
                ease: "power3.out"
            }, "<");

    }, { scope: containerRef });

    const handleMouseEnter = () => {
        gsap.to(imageRef.current, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(cardRef.current, {
            autoAlpha: 1,
            scaleX: 1, // Expand horizontally
            duration: 0.8,
            ease: "elastic.out(1, 0.6)" // Liquid/Elastic feel
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        gsap.to(cardRef.current, {
            autoAlpha: 0,
            scaleX: 0,
            duration: 0.4,
            ease: "power2.in"
        });
    };

    return (
        <div
            ref={containerRef}
            className={`relative rounded-[24px] overflow-hidden shadow-lg cursor-pointer invisible ${className} group`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }} // For 3D feel
        >
            {/* Liquid Mask Layer - The wave that reveals */}
            <div
                ref={liquidMaskRef}
                className="absolute inset-0 bg-background z-20 pointer-events-none"
                style={{
                    // We use a high scale displacement to tear the edge
                    filter: 'url(#liquid-distortion)',
                    transformOrigin: 'right center', // expand from right? no.
                    // If we move it from 0 to 100% (revealing), the trailing edge needs the liquid.
                    width: '150%', // Make it wider so distortion doesn't show edges too early
                    left: '-25%'
                }}
            ></div>

            <div className="w-full h-full overflow-hidden">
                <img
                    ref={imageRef}
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover transform will-change-transform"
                />
            </div>

            {/* Pop-up Overlay Card - Horizontal Expansion */}
            <div className="absolute bottom-6 left-6 right-6 z-30 overflow-hidden rounded-2xl"> {/* Wrapper for clipping if needed, or just apply to card */}
                <div
                    ref={cardRef}
                    className="p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex flex-col justify-end text-white origin-left"
                    style={{
                        transformOrigin: 'left center', // Expand from left
                        width: '100%'
                    }}
                >
                    <h3 className="font-heading text-lg md:text-2xl mb-1 text-white drop-shadow-md whitespace-nowrap">{title}</h3>
                    {description && (
                        <>
                            <div className="h-px w-12 bg-accent/80 mb-2"></div>
                            <p className="font-body text-sm text-gray-100/90 leading-relaxed drop-shadow-sm">{description}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        </div>
    );
};

export default LiquidRevealImage;
