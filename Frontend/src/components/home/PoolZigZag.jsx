import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLeaf } from '../../context/LeafContext';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

// 6 Images with longer descriptions (5-6 lines approx)
const poolImages = [
    {
        src: "/New/Home/Pool/pool-1.webp",
        title: "Main Pool",
        punchline: "The Heart of Your Vacation",
        text: "Experience ultimate relaxation in our crystal-clear main pool. Surrounded by lush greenery, it offers the perfect escape. Enjoy a temperature-controlled dip day or night, as vibrant lighting creates a magical evening atmosphere."
    },
    {
        src: "/New/Pool and activities/ball.png",
        title: "Fun Meets Comfort",
        punchline: "Relaxation for All Ages",
        text: "From the playful mushroomfall feature to the spacious pool area, this space is designed for all ages. Safe, clean, and beautifully lit, it’s the ideal spot for families to relax and enjoy together."
    },
    {
        src: "/New/Home/Pool/pool-3.webp",
        title: "Pool & Slide Experience",
        punchline: "Splash, Slide, and Unwind",
        text: "Enjoy a refreshing swim in our beautifully lit pool area, designed for relaxation and light recreation. Featuring smooth water slides, spacious swimming lanes, and a calm evening ambiance, this space offers the perfect balance between fun and comfort. Whether you're cooling off or simply unwinding by the water, the atmosphere remains peaceful and inviting."
    },
    {
        src: "/New/Home/Pool/pool-4.webp",
        title: "Evenings by the Water",
        punchline: "Calmness After Sunset",
        text: "As the lights reflect on the water and the surroundings grow quiet, the poolside becomes a place to slow down. Whether you’re stepping out for a swim or simply enjoying the atmosphere, this space offers a sense of calm that stays with you."
    },
    {
        src: "/New/Home/Pool/raindance.webp",
        title: "Water Activities",
        punchline: "Cool and Energized",
        text: "Dive into a refreshing experience with our exciting water activities. From relaxing showers to lively splash zones, every corner is designed to keep you cool and energized. Whether you're dancing under flowing water or enjoying a casual swim, the atmosphere stays fun, refreshing, and full of good vibes."
    },
    {
        src: "/New/Home/Pool/raindance-2.webp",
        title: "Refresh Under the Rain",
        punchline: "Dance in the Showers",
        text: "Step into a space where water flows freely and the mood stays light. The Rain Dance area offers a refreshing escape, combining open surroundings, flowing showers, and a lively atmosphere for relaxed fun."
    },
];

const PoolZigZag = () => {
    const { theme } = useTheme();
    const { setTarget } = useLeaf();
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const modalRef = useRef(null);
    const firstImageRef = useRef(null); // Ref for the first image
    const [expandedIdx, setExpandedIdx] = useState(null);

    useGSAP(() => {
        const totalWidth = trackRef.current.scrollWidth;
        // Use wrapper width as viewport
        const viewportWidth = trackRef.current.parentElement ? trackRef.current.parentElement.offsetWidth : window.innerWidth;
        // scrollAmount: Distance to move left.
        const scrollAmount = totalWidth - viewportWidth;

        const scrollTween = gsap.to(trackRef.current, {
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

        // Explicit Trigger for First Image (Vertical Scroll Entry)
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center", // When section hits center of viewport
            end: "bottom bottom",
            onEnter: () => {
                if (firstImageRef.current) setTarget(firstImageRef.current, { anchor: 'top-left' });
            },
            onEnterBack: () => {
                // When scrolling back up into this section, target first image again
                if (firstImageRef.current) setTarget(firstImageRef.current, { anchor: 'top-left' });
            }
        });



        // Fold/Unfold Animation
        // Clean previous animations if any (React strict mode safety)
        const poolItems = gsap.utils.toArray('.pool-card-wrapper');
        poolItems.forEach((el, i) => {
            const img = el.querySelector('img');
            const isLast = i === poolItems.length - 1;

            // Leaf Target Trigger
            // Since we want the leaf to "hop" to this image when it becomes active in the horizontal scroll
            ScrollTrigger.create({
                trigger: el,
                containerAnimation: scrollTween, // Link to horizontal scroll
                start: "left center+=100", // Activate when it approaches center
                end: "right center-=100",
                onEnter: () => setTarget(img, { anchor: isLast ? 'bottom-right' : 'top-left' }),
                onEnterBack: () => setTarget(img, { anchor: isLast ? 'bottom-right' : 'top-left' })
            });

            // Unfold entering from right
            gsap.fromTo(el,
                {
                    scaleY: 0.85,
                    scaleX: 0.9,
                    rotationY: 25,
                    transformPerspective: 1000
                },
                {
                    scaleY: 1,
                    scaleX: 1,
                    rotationY: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        containerAnimation: scrollTween,
                        start: "left center+=25%",
                        end: "center center",
                        scrub: true,
                        toggleActions: "play reverse play reverse"
                    }
                }
            );

            // Refold leaving to left
            gsap.to(el, {
                scaleY: 0.85,
                scaleX: 0.9,
                rotationY: -25,
                ease: "power2.in",
                scrollTrigger: {
                    trigger: el,
                    containerAnimation: scrollTween,
                    start: "center center",
                    end: "right center-=25%",
                    scrub: true
                }
            });
        });

    }, { scope: sectionRef });

    useGSAP(() => {
        if (expandedIdx !== null && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { scaleX: 0, opacity: 0, transformOrigin: "center" },
                { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" } // Expanding horizontally
            );
        }
    }, [expandedIdx]);

    return (
        <div ref={sectionRef} className="h-screen w-full overflow-hidden relative flex flex-col justify-center transition-colors duration-300">
            {/* Header Section */}
            <div className="relative w-full pt-20 md:pt-10 pb-4 px-6 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
                <h2
                    className="text-4xl md:text-6xl font-heading mb-4 drop-shadow-lg"
                    style={{ color: theme === 'dark' ? '#ffffff' : '#023e8a' }}
                >
                    Aquatic Paradise
                </h2>
                <div className="w-24 h-1 bg-accent mb-4 mx-auto rounded-full"></div>
                <p
                    className="text-base md:text-xl font-body max-w-3xl mx-auto leading-relaxed"
                    style={{ color: theme === 'dark' ? '#ffffff' : '#023e8a' }}
                >
                    Discover a sanctuary of water and light. From infinite horizons to playful splashes, find your perfect liquid escape.
                </p>
            </div>

            {/* Scroll Container with Vertical Lines (Two standing lines) */}
            <div className="relative w-full max-w-[95vw] md:max-w-[85vw] mx-auto h-[60vh] md:h-[70vh] flex items-center justify-start perspective-[2000px] overflow-hidden">

                {/* Track */}
                <div ref={trackRef} className="flex relative items-center px-4 md:px-10 min-w-max">
                    {poolImages.map((item, index) => (
                        <div
                            key={index}
                            className="pool-card-wrapper relative group shrink-0 w-[85vw] md:w-[65vh] h-[50vh] md:h-[45vh] transition-all duration-500 will-change-transform" // Responsive width/height
                            onClick={() => setExpandedIdx(index)}
                            style={{
                                zIndex: index % 2 === 0 ? 10 : 5,
                                transform: index % 2 === 0 ? 'translateY(0%)' : 'translateY(30%)', // Reduce zigzag slightly
                                marginLeft: index === 0 ? 0 : '-5vw', // More overlap
                                transformStyle: "preserve-3d",
                            }}
                        >
                            {/* Image Card */}
                            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer border-2 border-white/50">
                                <img
                                    ref={index === 0 ? firstImageRef : null}
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-3xl font-heading text-white mb-2">{item.title}</h3>
                                    <p className="text-white/90 text-sm italic">
                                        "{item.punchline}" <span className="text-accent text-xs uppercase font-bold tracking-wider block mt-2 not-italic">Click to read more</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Buffer */}
                    <div className="w-[10vw] shrink-0"></div>
                </div>

            </div>

            {/* Modal Overlay (Click Triggered) */}
            <div
                className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-500 ${expandedIdx !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setExpandedIdx(null)}
            >
                {expandedIdx !== null && (
                    <div
                        ref={modalRef}
                        className="bg-white rounded-3xl w-[80vw] h-[70vh] shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
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
                        <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-white text-left relative overflow-y-auto">
                            <button onClick={() => setExpandedIdx(null)} className="absolute top-4 right-4 text-3xl hover:text-[#00b4d8]">&times;</button>
                            <h3 className="text-4xl font-heading text-primary mb-6">{poolImages[expandedIdx].title}</h3>
                            <div className="w-16 h-1 bg-accent mb-6"></div>
                            <p className="text-base text-gray-700 font-body leading-relaxed whitespace-pre-wrap">
                                {poolImages[expandedIdx].text}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PoolZigZag;
