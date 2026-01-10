import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLeaf } from '../../context/LeafContext';

gsap.registerPlugin(ScrollTrigger);

const villaFeatures = [
    { src: "/Assets/villa_entrance_facade.jpg", title: "The Grand Estate" },
    { src: "/Assets/outdoor_lounge_canopy.jpg", title: "Outdoor Lounge" },
    { src: "/Assets/kids_play_zone_overview.jpg", title: "Gardens" },
];

const VillaVerticalTour = () => {
    const { setTarget } = useLeaf();
    const containerRef = useRef(null);
    const triggerRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        // Initial target: First Inner Card
        if (cardsRef.current[0] && cardsRef.current[0].firstElementChild) {
            setTarget(cardsRef.current[0].firstElementChild, { anchor: 'top-left' });
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                start: "top top",
                end: "+=4000",
                scrub: 1,
                snap: {
                    snapTo: "labels",
                    duration: { min: 0.2, max: 0.8 },
                    delay: 0.1,
                    ease: "power1.inOut"
                }
            }
        });

        cardsRef.current.forEach((card, index) => {
            if (index === cardsRef.current.length - 1) return;

            tl.to(card, {
                yPercent: -120, // Move up and out
                opacity: 0,
                scale: 0.9,
                rotationX: 5,
                duration: index <= 1 ? 0.5 : 1,
                ease: "power2.inOut",
                onStart: () => {
                    const nextCard = cardsRef.current[index + 1];
                    if (nextCard && nextCard.firstElementChild) {
                        setTarget(nextCard.firstElementChild, { anchor: 'top-left' });
                    }
                },
                onReverseComplete: () => {
                    if (card.firstElementChild) {
                        setTarget(card.firstElementChild, { anchor: 'top-left' });
                    }
                }
            })
                .addLabel(`card-${index}`);
        });

        // Header Transformation Animation
        gsap.fromTo(headerRef.current,
            {
                backgroundColor: "rgba(255, 252, 245, 0)",
                backdropFilter: "blur(0px)",
                padding: "0px 0px",
                borderRadius: "0px",
                boxShadow: "none",
                scale: 1,
                y: 0
            },
            {
                backgroundColor: "rgba(255, 252, 245, 0.8)",
                backdropFilter: "blur(12px)",
                padding: "8px 24px",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                scale: 0.8,
                y: -20,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=500",
                    scrub: 1
                }
            }
        );

    }, { scope: triggerRef });

    return (
        <div ref={triggerRef} className="relative h-screen overflow-hidden transition-colors duration-300">
            {/* Sticky Header */}
            <div className="absolute top-16 md:top-24 left-0 w-full z-20 flex justify-center pointer-events-none px-4">
                <h2
                    ref={headerRef}
                    className="text-4xl md:text-5xl font-heading text-primary origin-top text-center"
                >
                    Villa Tour
                </h2>
            </div>
            {/* Stacking Container */}
            <div className="h-full w-full relative flex items-center justify-center perspective-1000">
                {villaFeatures.map((item, index) => (
                    <div
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        className="absolute w-full h-full flex items-center justify-center p-8 pt-32 will-change-transform"
                        style={{
                            zIndex: villaFeatures.length - index,
                        }}
                    >
                        <div className="relative w-[90vw] md:w-[70vw] h-[70vh] rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
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
