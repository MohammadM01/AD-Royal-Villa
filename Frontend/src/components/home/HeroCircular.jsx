import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLeaf } from '../../context/LeafContext';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
    "/New/Home/home-views/front-view.webp",
    "/New/Home/home-views/side-view.webp"
];

const HeroCircular = () => {
    const { setTarget } = useLeaf();
    const wrapperRef = useRef(null);
    const heroRef = useRef(null);
    // Ref for text target
    const textTitleRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slideshow Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 3000);

        // Ensure leaf targets text on mount (fallback for ScrollTrigger)
        const timer = setTimeout(() => {
            if (textTitleRef.current) setTarget(textTitleRef.current, { anchor: 'center' });
        }, 500);

        return () => {
            clearInterval(interval);
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
                {/* Background Images with Swipe Effect */}
                {heroImages.map((src, index) => (
                    <div
                        key={src}
                        className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                        style={{
                            opacity: index === currentImageIndex ? 1 : 0,
                            // kept opacity transition logic
                        }}
                    >
                        <img src={src} alt="Hero" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                ))}

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 z-10 pointer-events-none">
                    <h1 ref={textTitleRef} className="text-4xl md:text-8xl font-heading mb-4 drop-shadow-lg font-light tracking-wide">
                        The Ultimate <br /> <span className="font-normal">Pool Experience</span>
                    </h1>
                    <p className="text-lg md:text-xl font-body font-thin tracking-widest uppercase opacity-90">
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
