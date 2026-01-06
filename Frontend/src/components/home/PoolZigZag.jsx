import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const poolImages = [
    { src: "/Assets/Activites and pool/pool_villa_exterior_day.jpg", title: "Day Swim", text: "Soak in the sun." },
    { src: "/Assets/Activites and pool/pool_slides_aerial_view.jpg", title: "Slide Fun", text: "Thrills for everyone." },
    { src: "/Assets/Activites and pool/bbq1.jpeg", title: "Poolside BBQ", text: "Feast with friends." },
    { src: "/Assets/kids_play_zone_overview.jpg", title: "Play Area", text: "Safe & Fun." },
    { src: "/Assets/outdoor_lounge_canopy.jpg", title: "Lounging", text: "Relax in style." },
];

const PoolZigZag = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [expandedIdx, setExpandedIdx] = useState(null);

    useGSAP(() => {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Improve scroll calc: Ensure totalWidth includes the viewport padding or extra space
        // Using `totalWidth - viewportWidth` works if there's no right-padding.
        // We added a spacer div, so totalWidth is correct.
        const scrollAmount = totalWidth - viewportWidth;

        gsap.to(trackRef.current, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${scrollAmount * 1.5}`, // Slower, smoother scroll
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });
    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} className="h-screen w-full bg-[#fcfcf5] overflow-hidden relative flex flex-col justify-center">
            <h2 className="absolute top-8 left-8 text-5xl font-heading text-primary z-10">Aquatic Paradise</h2>

            <div ref={trackRef} className="flex relative h-[80vh] items-center px-10 md:px-20 min-w-max">
                {poolImages.map((item, index) => (
                    <div
                        key={index}
                        className="relative group shrink-0 w-[80vh] h-[60vh] transition-all duration-500" // Reverted to larger size
                        onClick={() => setExpandedIdx(expandedIdx === index ? null : index)}
                        style={{
                            // Zig-Zag Overlap Logic
                            zIndex: index % 2 === 0 ? 10 : 5,
                            transform: index % 2 === 0 ? 'translateY(-20%)' : 'translateY(20%)',
                            marginLeft: index === 0 ? 0 : '-15%'
                        }}
                    >
                        {/* Image Card */}
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer border border-white transition-transform hover:scale-105 active:scale-95">
                            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                            {/* Hint Text */}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                                <h3 className="text-3xl font-heading">{item.title}</h3>
                                <p className="text-sm opacity-80 mt-1">Click to expand</p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Scroll Buffer for proper end visibility */}
                <div className="w-[20vw] shrink-0"></div>
            </div>

            {/* Expanded Modal (Click Interaction) */}
            <div
                className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 ${expandedIdx !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setExpandedIdx(null)}
            >
                {expandedIdx !== null && (
                    <div
                        className="bg-white rounded-3xl w-[95vw] h-[90vh] shadow-2xl overflow-hidden flex flex-col md:flex-row relative transform scale-100 transition-transform"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Left */}
                        <div className="w-full md:w-3/4 h-1/2 md:h-full">
                            <img
                                src={poolImages[expandedIdx].src}
                                alt={poolImages[expandedIdx].title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Text Right */}
                        <div className="w-full md:w-1/4 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-white text-left relative">
                            <button
                                onClick={() => setExpandedIdx(null)}
                                className="absolute top-4 right-4 text-4xl text-gray-400 hover:text-red-500 transition-colors"
                            >
                                &times;
                            </button>
                            <h3 className="text-5xl font-heading text-primary mb-6">{poolImages[expandedIdx].title}</h3>
                            <div className="w-16 h-2 bg-accent mb-8"></div>
                            <p className="text-xl text-gray-600 font-body leading-relaxed">{poolImages[expandedIdx].text}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PoolZigZag;
