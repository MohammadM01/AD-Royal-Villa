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
    const containerRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Slideshow Logic
    useEffect(() => {
        // "delay for 0.3sec swipe the image pic". 
        // This might mean a very fast initial switch, or a repeating switch?
        // Assuming standard slideshow but maybe faster transition?
        // Defaulting to 3s interval for usability, with 0.3s transition?
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Pin the container and animate the clip-path
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%", // Distance to scroll to complete animation
                pin: true,
                scrub: 0, // "Shrinking must the speed of scrolling" -> direct coupling (0 latency)
                animation: gsap.to(containerRef.current, {
                    clipPath: "circle(30% at 50% 50%)", // "Medium size... image puri gayab nhi chahiye"
                    ease: "none",
                    immediateRender: false
                })
            });
        });

    }, { scope: containerRef });

    return (
        // Initial clip-path: full circle (covering corners)
        <div
            ref={containerRef}
            className="w-full h-screen relative bg-black overflow-hidden"
            style={{ clipPath: 'circle(100% at 50% 50%)' }}
        >
            {/* Background Images with Swipe Effect */}
            {heroImages.map((src, index) => (
                <div
                    key={src}
                    className="absolute inset-0 transition-transform duration-300 ease-in-out" // "swipe the image pic"? 
                    // Let's use opacity for cleaner feel, or slide?
                    // User said "swipe". Slide is better.
                    // But if they are just 2 images, maybe just fading is safer for "High End".
                    // "swipe" usually implies slide.
                    // Let's try simple opacity first as it's cleaner with the circular mask.
                    style={{
                        opacity: index === currentImageIndex ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out' // "0.3sec"
                    }}
                >
                    <img src={src} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            ))}

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 z-10 pointer-events-none">
                <h1 className="text-5xl md:text-8xl font-heading mb-4 drop-shadow-lg font-light tracking-wide">
                    {/* "Text over it but not to bold" */}
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
    );
};

export default HeroCircular;
