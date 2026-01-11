import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLeaf } from '../../context/LeafContext';

gsap.registerPlugin(ScrollTrigger);



const HeroCircular = () => {
    const { setTarget } = useLeaf();
    const wrapperRef = useRef(null);
    const heroRef = useRef(null);
    // Ref for text target
    const textTitleRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slideshow Logic
    useEffect(() => {
        // Ensure leaf targets text on mount (fallback for ScrollTrigger)
        const timer = setTimeout(() => {
            if (textTitleRef.current) setTarget(textTitleRef.current, { anchor: 'center' });
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Leaf Target Logic - Target specific text on 'T' (Top Left --> Center now)
        ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom center",
            onEnter: () => setTarget(textTitleRef.current, { anchor: 'center' }),
            onEnterBack: () => setTarget(textTitleRef.current, { anchor: 'center' })
        });

        mm.add("(min-width: 768px)", () => {
            // ... existing
            // Copying existing timeline logic to prevent deletion errors during replacement
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "+=100%",
                    pin: true,
                    scrub: 0,
                }
            });

            tl.to(heroRef.current, {
                clipPath: "circle(30% at 50% 50%)",
                ease: "none"
            }, 0);
        });

    }, { scope: wrapperRef });

    return (
        <div
            ref={wrapperRef}
            className="relative w-full h-screen overflow-hidden bg-[var(--bg-color)] transition-colors duration-300"
        >
            {/* Background Trees - Removed as per request */}

            {/* Inner Hero with Clip Path */}
            <div
                ref={heroRef}
                className="absolute inset-0 w-full h-full bg-black overflow-hidden z-10"
                style={{ clipPath: 'circle(100% at 50% 50%)' }}
            >
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                >
                    <source src="/New/Home/hero/hero.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 md:p-4 z-10 pointer-events-none">
                    <h1 ref={textTitleRef} className="text-3xl sm:text-4xl md:text-8xl font-heading mb-6 md:mb-4 drop-shadow-lg font-light tracking-wide leading-tight">
                        The Ultimate <br /> <span className="font-normal block mt-2 md:mt-0">Villa Experience</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl font-body font-thin tracking-[0.2em] md:tracking-widest uppercase opacity-90">
                        Dive into luxury
                    </p>
                </div>

                <div className="absolute bottom-10 inset-x-0 text-center animate-bounce z-20 pointer-events-none text-white/70">
                    <span className="text-sm uppercase tracking-widest">Scroll</span>
                </div>
            </div>
        </div>
    );
};

export default HeroCircular;
