import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const villaFeatures = [
    { src: "/Assets/villa_entrance_facade.jpg", title: "The Grand Estate" },
    { src: "/Assets/outdoor_lounge_canopy.jpg", title: "Outdoor Lounge" },
    { src: "/Assets/nice_bedroom_interior.jpg", title: "Master Suite" }, // Placeholder fallback
    { src: "/Assets/Activites and pool/bbq1.jpeg", title: "Dining Area" },
    { src: "/Assets/kids_play_zone_overview.jpg", title: "Gardens" },
];

const VillaVerticalTour = () => {
    const containerRef = useRef(null);
    const itemsRef = useRef([]);

    useGSAP(() => {
        itemsRef.current.forEach((el, i) => {
            gsap.fromTo(el,
                { scale: 0.8, opacity: 0.5, filter: "blur(4px)" },
                {
                    scale: 1.2,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top center+=20%",
                        end: "bottom center-=20%",
                        scrub: true,
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="py-32 bg-[#fffcf5] min-h-screen">
            <h2 className="text-center text-5xl font-heading text-primary mb-24">Villa Tour</h2>
            <div className="flex flex-col items-center space-y-32">
                {villaFeatures.map((item, index) => (
                    <div
                        key={index}
                        ref={el => itemsRef.current[index] = el}
                        className="relative w-[80vw] md:w-[60vw] aspect-video rounded-3xl overflow-hidden shadow-2xl transition-transform"
                    >
                        <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <h3 className="text-4xl md:text-6xl text-white font-heading drop-shadow-xl">{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VillaVerticalTour;
