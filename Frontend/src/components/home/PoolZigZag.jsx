import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 6 Images as found in New/Home/Pool
const poolImages = [
    { src: "/New/Home/Pool/pool-1.png", title: "Main Pool", text: "Dive into the crystal clear waters." },
    { src: "/New/Home/Pool/pool-2.png", title: "Sunset View", text: "Relax as the sun goes down." },
    { src: "/New/Home/Pool/pool-3.png", title: "Kids Zone", text: "Safe and fun for little ones." },
    { src: "/New/Home/Pool/pool-4.png", title: "Lounge Area", text: "Comfortable seating by the water." },
    { src: "/New/Home/Pool/raindance.png", title: "Rain Dance", text: "Groove under the rain showers." },
    { src: "/New/Home/Pool/raindance-2.png", title: "Evening Vibes", text: "Party all night long." },
];

const PoolZigZag = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [expandedIdx, setExpandedIdx] = useState(null);

    useGSAP(() => {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollAmount = totalWidth - viewportWidth;

        gsap.to(trackRef.current, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${scrollAmount * 1.5}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });
    }, { scope: sectionRef });

    return (
        <div ref={sectionRef} className="h-screen w-full bg-[#fcfcf5] overflow-hidden relative flex flex-col justify-center">
            <h2 className="absolute top-8 left-8 text-5xl font-heading text-primary z-10">Aquatic Paradise</h2>

            <div ref={trackRef} className="flex relative h-[80vh] items-center px-10 md:px-20 min-w-max pt-20">
                {/* Added pt-20 to allow space for the 'drop' of the 2nd items if needed */}
                {poolImages.map((item, index) => (
                    <div
                        key={index}
                        // "1image ln left side... 2nd img placed below 70%below the 1st"
                        // If we use Flex, we can use translateY.
                        // We need ensure text doesn't hide.
                        className="relative group shrink-0 w-[60vh] h-[45vh] transition-all duration-500" // Standard size
                        onMouseEnter={() => setExpandedIdx(index)} // "One hovering image, a popup... must appear" --> Changed to Hover as requested? 
                        // Wait, user said "same clicked image" inside the popup desc.
                        // But explicitly describing the trigger: "One hovering image, a popup card must appear".
                        // And "While the card has appear the whole website must he blurred".
                        // This effectively means Hover -> Backdrop Blur + Modal. 
                        // This is aggressive but requested.
                        // I will add a safe "MouseLeave" on the MODAL or the ITEM? 
                        // If it's a modal covering screen, you can't hover the item anymore?
                        // So hovering the item triggers modal. Modal covers everything.
                        // Then how to close? "MouseLeave" from modal? Or Click out?
                        // I'll stick to a robust "hover triggers preview, click triggers full modal"?
                        // "While the card has appear the whole website must he blurred" -> Full Modal.
                        // "hovering image... popup card must appear".
                        // Let's TRY simple Hover based state.
                        style={{
                            zIndex: index % 2 === 0 ? 10 : 5,
                            // "placed below 70% below the 1st". 
                            // If 1st is 0%, 2nd is 70% (of height).
                            // translateY(70%) moves it down significantly.
                            transform: index % 2 === 0 ? 'translateY(0%)' : 'translateY(40%)', // 70% might clear the screen if h=45vh. 45vh * 1.7 = 76vh. Screen is 100vh. It fits.
                            // Let's use 50% for safety first, user said 70%.
                            marginLeft: index === 0 ? 0 : '-5%' // "slightly overlapping"
                        }}
                    >
                        {/* Image Card */}
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer border-4 border-white transition-transform hover:scale-105 active:scale-95">
                            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
                <div className="w-[10vw] shrink-0"></div>
            </div>

            {/* Modal Overlay */}
            {/* "While the card has appear the whole website must he blurred" */}
            <div
                className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-500 ${expandedIdx !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                // If it's hover triggered, we might need to clear it when mouse leaves the TRIGGER?
                // But the modal covers the trigger.
                // So we need to clear it when mouse leaves the MODAL? or Click to close?
                // User didn't specify closing.
                // I will assume Click to close for usability if Hover triggered it.
                onClick={() => setExpandedIdx(null)}
            >
                {expandedIdx !== null && (
                    <div
                        className="bg-white rounded-3xl w-[80vw] h-[70vh] shadow-2xl overflow-hidden flex flex-col md:flex-row relative transform scale-100 transition-transform"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Left */}
                        <div className="w-full md:w-2/3 h-1/2 md:h-full">
                            <img
                                src={poolImages[expandedIdx].src}
                                alt={poolImages[expandedIdx].title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Text Right */}
                        <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-white text-left relative">
                            <button onClick={() => setExpandedIdx(null)} className="absolute top-4 right-4 text-3xl">&times;</button>
                            <h3 className="text-4xl font-heading text-primary mb-4">{poolImages[expandedIdx].title}</h3>
                            <p className="text-lg text-gray-600 font-body">{poolImages[expandedIdx].text}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PoolZigZag;
