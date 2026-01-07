import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const villaFeatures = [
    { src: "/Assets/villa_entrance_facade.jpg", title: "The Grand Estate" },
    { src: "/Assets/outdoor_lounge_canopy.jpg", title: "Outdoor Lounge" },
    { src: "/Assets/nice_bedroom_interior.jpg", title: "Master Suite" },
    { src: "/Assets/Activites and pool/bbq1.jpeg", title: "Dining Area" },
    { src: "/Assets/kids_play_zone_overview.jpg", title: "Gardens" },
];

const VillaVerticalTour = () => {
    const containerRef = useRef(null);
    const triggerRef = useRef(null);
    const headerRef = useRef(null);

    useGSAP(() => {
        // "Animation lagao matlab ek baar scoll krne pr direclty new img on the screen"
        // Sticky Header Concept: Pin the entire section.
        // Horizontal or Vertical Scroll inside?
        // User asked for "Vertical Tour" in previous context, but snap scoll is often cleaner horizontally or stacked vertically with Pin.
        // Let's keep it Vertical Stack but PINNED container, moving content up.

        const sections = gsap.utils.toArray(".tour-card");
        const totalScroll = sections.length * 100; // 100vh per section move

        // Main Card Scroll Animation
        gsap.to(sections, {
            yPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                start: "top top",
                end: `+=${sections.length * 100}vh`, // duration based on number of cards
                scrub: 1,
                // "ease in animation... directly new img" -> SNAP logic
                snap: {
                    snapTo: 1 / (sections.length - 1),
                    duration: { min: 0.2, max: 0.5 },
                    delay: 0.1,
                    ease: "power2.inOut" // Smooth Ease
                }
            }
        });

        // Header Transformation Animation
        // "jab ye wale scren pr hu tab usko page me hi batao... aage scroll kro fir usko dound div me"
        gsap.fromTo(headerRef.current,
            {
                backgroundColor: "rgba(255, 252, 245, 0)", // Transparent initial
                backdropFilter: "blur(0px)",
                padding: "0px 0px",
                borderRadius: "0px",
                boxShadow: "none",
                scale: 1,
                y: 0
            },
            {
                backgroundColor: "rgba(255, 252, 245, 0.8)", // Target: Pill style
                backdropFilter: "blur(12px)",
                padding: "8px 24px",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                scale: 0.8, // Make it slightly smaller/compact
                y: -20, // Move it up a bit slightly
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=50vh",
                    scrub: 1
                }
            }
        );
    }, { scope: triggerRef });

    return (
        // Wrapper for Pinning
        <div ref={triggerRef} className="relative h-screen overflow-hidden bg-[#fffcf5]">

            {/* Sticky Header */}
            {/* "Villa Tour text top me dikhna chaiye constant" - shifted down to avoid navbar overlap */}
            <div className="absolute top-24 left-0 w-full z-20 flex justify-center pointer-events-none">
                <h2
                    ref={headerRef}
                    className="text-5xl font-heading text-primary origin-top" // origin-top for scaling
                >
                    Villa Tour
                </h2>
            </div>

            {/* Container moving up */}
            <div className="h-full w-full relative">
                {villaFeatures.map((item, index) => (
                    <div
                        key={index}
                        className={`tour-card absolute top-0 left-0 w-full h-full flex items-center justify-center p-8 pt-32`}
                        style={{
                            transform: `translateY(${index * 100}%)`, // Initial stack positions (0, 100%, 200%...)
                            // We are animating ALL of them. 
                            // Wait, typical stack scroll moves the WRAPPER?
                            // No, let's stack them visually 100vh apart and translate the whole group?
                            // My GSAP logic above moves each '.tour-card' by yPercent. 
                            // If they start stacked (top: 0, translateY: index*100%), 
                            // moving yPercent: -100 * (length-1) will move the last one to 0. 
                            // Correct.
                        }}
                    >
                        <div className="relative w-[90vw] md:w-[70vw] h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <h3 className="text-4xl md:text-6xl text-white font-heading drop-shadow-xl">{item.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VillaVerticalTour;
