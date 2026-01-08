import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
    "/New/Home/home-views/front-view.png",
    "/New/Home/home-views/side-view.png"
];

const HeroCircular = () => {
    const wrapperRef = useRef(null);
    const heroRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slideshow Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Pin the wrapper and animate the inner hero's clip-path
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: "+=100%", // Distance to scroll to complete animation
                pin: true,
                scrub: 0,
                animation: gsap.to(heroRef.current, {
                    clipPath: "circle(30% at 50% 50%)", // Shrink to circle
                    ease: "none",
                    immediateRender: false
                })
            });
        });

    }, { scope: wrapperRef });

    return (
        <div
            ref={wrapperRef}
            className="relative w-full h-screen overflow-hidden bg-[#f4f1ea] dark:bg-black"
        >
            {/* Background Trees - Visible when hero shrinks */}
            <img
                src="/New/svg/tree-left.png"
                alt="Tree Left"
                className="absolute left-0 top-0 h-full w-auto object-cover z-0 pointer-events-none"
            />
            <img
                src="/New/svg/tree-right.png"
                alt="Tree Right"
                className="absolute right-0 top-0 h-full w-auto object-cover z-0 pointer-events-none"
            />

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
                    <h1 className="text-5xl md:text-8xl font-heading mb-4 drop-shadow-lg font-light tracking-wide">
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
