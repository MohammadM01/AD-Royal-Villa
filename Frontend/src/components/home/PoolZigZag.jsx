import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [expandedIdx, setExpandedIdx] = useState(null);

    useGSAP(() => {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // scrollAmount: Distance to move left. 
        // "Last card ke baad itni space nahi chahiye jab vo middle me aa jaega..."
        // Reducing the extra push so it stops right when the card is in a good position.
        // totalWidth - viewportWidth = Last card touches right edge.
        // We want it roughly centered. Card width is 75vh (~40-50vw). 
        // So we need to pull it in by ~25vw. Let's use 0.2 * viewportWidth.
        const scrollAmount = totalWidth - viewportWidth + (viewportWidth * 0.2);

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
            <h2 className="absolute top-32 left-8 text-5xl font-heading text-primary z-10">Aquatic Paradise</h2>

            <div ref={trackRef} className="flex relative h-[80vh] items-center px-10 md:px-20 min-w-max pt-20">
                {poolImages.map((item, index) => (
                    <div
                        key={index}
                        className="relative group shrink-0 w-[75vh] h-[45vh] transition-all duration-500"
                        onClick={() => setExpandedIdx(index)} // "on click krdo" for big popup
                        style={{
                            zIndex: index % 2 === 0 ? 10 : 5,
                            // Zig-Zag logic preserved
                            transform: index % 2 === 0 ? 'translateY(0%)' : 'translateY(40%)',
                            // Increased Gap: Changed from negative margin to positive spacing
                            marginLeft: index === 0 ? 0 : '4vw' // "distance thoda kam kro"
                        }}
                    >
                        {/* Image Card */}
                        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative cursor-pointer border-4 border-white transition-transform hover:scale-105 active:scale-95">
                            <img src={item.src} alt={item.title} className="w-full h-full object-cover" />

                            {/* Hover Overlay: Slide up from bottom half way */}
                            {/* "div niche se uppr aaega half of the card tak aur usme thoda text likha hoga" */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end p-6">
                                <h3 className="text-3xl font-heading text-white mb-2">{item.title}</h3>
                                <p className="text-white/90 text-sm line-clamp-3">
                                    {/* Show a preview snippet of the longer text */}
                                    {item.text.substring(0, 80)}... <span className="text-accent text-xs uppercase font-bold tracking-wider block mt-2">Click to read more</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Buffer for scrolling */}
                <div className="w-[10vw] shrink-0"></div>
            </div>

            {/* Modal Overlay (Click Triggered) */}
            <div
                className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-500 ${expandedIdx !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
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
                        <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center bg-white text-left relative overflow-y-auto">
                            <button onClick={() => setExpandedIdx(null)} className="absolute top-4 right-4 text-3xl hover:text-red-500">&times;</button>
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
