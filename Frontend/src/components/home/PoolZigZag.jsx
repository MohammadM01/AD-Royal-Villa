import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLeaf } from '../../context/LeafContext';

gsap.registerPlugin(ScrollTrigger);

// 6 Images with longer descriptions (5-6 lines approx)
const poolImages = [
    {
        src: "/New/Home/Pool/pool-1.png",
        title: "Main Pool",
        text: "Experience the ultimate relaxation in our crystal-clear main pool, designed to be the heart of your vacation. Surrounded by lush greenery and comfortable loungers, it offers the perfect escape from the daily grind. Whether you want to swim laps to start your day or simply float around and soak up the sun, this pool caters to all your needs. The water is temperature-controlled, ensuring a pleasant dip regardless of the weather outside. At night, the pool lights up with vibrant colors, creating a magical atmosphere for unmatched evening vibes."
    },
    {
        src: "/New/Home/Pool/pool-2.png",
        title: "Sunset View",
        text: "There is nothing quite like watching the sun dip below the horizon while submerged in the cool waters of our infinity pool. Positioned perfectly to capture the golden hour, this spot offers panoramic views of the surrounding landscape. As the sky turns into a canvas of oranges, pinks, and purples, you can enjoy a refreshing cocktail from the poolside bar. It is the ideal setting for romantic moments or reflective solitude. Let the beauty of nature wash over you as you witness the day transitioning into a starry night."
    },
    {
        src: "/New/Home/Pool/pool-3.png",
        title: "Kids Zone",
        text: "Our dedicated Kids Zone is a safe haven for your little ones to splash and play to their hearts' content. Featuring shallow waters, fun water slides, and interactive sprayers, it promises hours of entertainment. Parents can relax nearby with full visibility, knowing their children are in a secure environment. We also organize supervised pool games and activities during the weekends, ensuring that the kids make new friends and unforgettable memories. It is family fun redefined, where safety meets excitement."
    },
    {
        src: "/New/Home/Pool/pool-4.png",
        title: "Lounge Area",
        text: "Adjacent to the water is our sophisticated Lounge Area, offering a blend of comfort and style. Sink into our plush daybeds or private cabanas, equipped with soft towels and charging stations for your devices. It is the perfect place to catch up on reading, enjoy a nap, or chat with friends. Waiters are on standby to serve delicious snacks and beverages right to your seat. Whether you are drying off after a swim or just enjoying the poolside ambiance, our lounge area provides the luxury you deserve."
    },
    {
        src: "/New/Home/Pool/raindance.png",
        title: "Rain Dance",
        text: "Get ready to groove under the open sky with our exhilarating Rain Dance setup. Featuring high-quality sound systems and rhythmic water showers, it brings the party to life. It is a favorite among groups and families looking to add a high-energy twist to their pool day. Dance to the latest beats while the cool water sprays keep you refreshed and energized. Perfect for celebrations or just letting loose, the Rain Dance area guarantees laughter, movement, and a unique aquatic experience."
    },
    {
        src: "/New/Home/Pool/raindance-2.png",
        title: "Evening Vibes",
        text: "As night falls, the pool area transforms into a vibrant social hub with our 'Evening Vibes' experience. Ambient lighting, upbeat music, and a lively crowd set the tone for an unforgettable night. The reflective waters enhance the mood, making it a picturesque setting for evening gatherings. Enjoy themed pool parties, barbecue nights, or simply lounging under the stars. It is where luxury meets nightlife, offering a sophisticated yet fun way to end your day at the villa."
    },
];

const PoolZigZag = () => {
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
            <div className="absolute top-0 left-0 w-full pt-20 md:pt-16 pb-12 px-6 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-heading text-primary dark:text-[#EAEAEA] mb-4 drop-shadow-lg">
                    Aquatic Paradise
                </h2>
                <div className="w-24 h-1 bg-accent mb-4 mx-auto rounded-full"></div>
                <p className="text-base md:text-xl font-body text-[#023e8a] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Discover a sanctuary of water and light. From infinite horizons to playful splashes, find your perfect liquid escape.
                </p>
            </div>

            {/* Scroll Container with Vertical Lines (Two standing lines) */}
            <div className="relative w-full max-w-[95vw] md:max-w-[85vw] mx-auto h-[70vh] md:h-[80vh] flex items-center justify-start perspective-[2000px] overflow-hidden">

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
                                    <p className="text-white/90 text-sm line-clamp-3">
                                        {item.text.substring(0, 80)}... <span className="text-accent text-xs uppercase font-bold tracking-wider block mt-2">Click to read more</span>
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
