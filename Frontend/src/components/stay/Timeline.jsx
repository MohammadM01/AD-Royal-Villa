import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 1,
        title: '4 Luxury Bedrooms',
        desc: 'Indulge in the ultimate comfort with our four spacious, fully air-conditioned bedrooms. Each room features a plush king-size bed wrapped in premium linens to ensure a restful sleep. Large pool-view balconies let you wake up to serene water vistas every morning. Equipped with large 32-inch Smart TVs, wardrobe storage, and modern attached washrooms, our bedrooms provide a private sanctuary within the villa.',
        features: ['King-size Beds', 'AC', 'Pool-view', 'Smart TVs'],
        image: '/Assets/ameneties/luxury_bedroom_king_tv.jpg',
    },
    {
        id: 2,
        title: 'Private Living Hall',
        desc: 'Step into a grand 700 sq.ft. living hall designed for togetherness and entertainment. The open-plan layout features expansive seating arrangements, perfect for the whole family to gather. Complete with a massive 75-inch flat-screen TV and a high-fidelity sound system, it’s the ideal spot for movie nights or lively conversations. The aesthetic lighting and artistic decor create a warm, inviting atmosphere for everyone.',
        features: ['Plush Seating', '75" TV', 'Sound System', 'Open Layout'],
        image: '/Assets/ameneties/spacious%20living%20room.png',
    },
    {
        id: 3,
        title: 'Exquisite Dining',
        desc: 'Experience dining like never before in our dedicated dining area. Centered around a contemporary 8-seater table, this space is perfect for enjoying home-cooked meals or lavish spreads. The area overlooks the shimmering pool, adding a touch of tranquility to your breakfast or dinner. With elegant tableware and modern decor, every meal feels like a special occasion.',
        features: ['8-Seater Table', 'Modern Decor', 'Poolside View'],
        image: '/Assets/ameneties/dinningexp.png',
    },
    {
        id: 4,
        title: 'Poolside Patio',
        desc: 'Embrace the outdoors on our stunning poolside patio. Whether you are sipping your morning coffee while listening to the birds or enjoying a sunset cocktail, this space offers the perfect blend of relaxation and nature. Comfortable outdoor seating and ambient lighting make it a versatile spot for both sunbathing during the day and stargazing at night.',
        features: ['Outdoor Seating', 'Scenic Views', 'Evening Vibe'],
        image: '/Assets/ameneties/poolside_patio_dining.jpg',
    },
    {
        id: 5,
        title: 'Comfort & Style',
        desc: 'Every corner of the AD Royal Private Villa is thoughtfully crafted to blend modern luxury with homelike comfort. From cozy reading nooks to artistic interior flourishes, we ensure a premium experience. Natural light floods the interiors through large windows, highlighting the high-quality upholstery and curated design elements that define our unique style.',
        features: ['Cozy Corners', 'Artistic Interiors', 'Natural Light'],
        image: '/Assets/ameneties/comfort_bedroom_interior.jpg',
    },
    {
        id: 6,
        title: 'Evening Ambiance',
        desc: 'As the sun sets, the villa undergoes a magical transformation. Warm, ambient lighting illuminates the pathways and pool area, creating an enchanting evening atmosphere. It’s the perfect time for a night swim under the stars or a quiet walk through the lush surroundings. The peaceful vibe ensures that your nights are as memorable and rejuvenating as your days.',
        features: ['Mood Lighting', 'Starry Skies', 'Peaceful'],
        image: '/Assets/ameneties/pool_rooms_evening_glow.jpg',
    },
];

const BackgroundOrbs = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-primary/15 dark:bg-accent/10 rounded-full blur-[100px] dark:hidden"
                    style={{
                        width: Math.random() * 300 + 100,
                        height: Math.random() * 300 + 100,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 50 - 25, 0],
                        y: [0, Math.random() * 50 - 25, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

const FloatingBubbles = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(15)].map((_, i) => {
                const size = Math.random() * 20 + 10;
                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-[#8B7E66]/20 bg-[#8B7E66]/5 dark:border-[#C2B280]/20 dark:bg-[#C2B280]/5 backdrop-blur-[1px]"
                        style={{
                            width: size,
                            height: size,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 110}%`,
                        }}
                        animate={{
                            y: [0, -window.innerHeight * 1.2],
                            x: [0, (Math.random() - 0.5) * 100],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 10
                        }}
                    />
                )
            })}
        </div>
    )
}

const Slide = ({ slide, index, total, scrollYProgress }) => {
    // Calculate the range where this slide is visible/active
    // Total range 0..1.
    // There are 'total' slides. We move through them using a window.
    // When scroll=0, index=0 is active.
    // When scroll=1, index=total-1 is active.

    // Each slide 'peak' is at index / (total - 1).
    const step = 1 / (total - 1);
    const peak = index * step;

    // Define the start and end of the animation influence
    // Overlap slightly for smoothness
    const start = Math.max(0, peak - step);
    const end = Math.min(1, peak + step);

    // Scale: 0.85 -> 1 -> 0.85
    const scale = useTransform(scrollYProgress, [start, peak, end], [0.85, 1, 0.85]);

    // Opacity: 0.3 -> 1 -> 0.3
    const opacity = useTransform(scrollYProgress, [start, peak, end], [0.3, 1, 0.3]);

    // Blur: 5px -> 0px -> 5px (optional, but requested "same effect")
    const blurVal = useTransform(scrollYProgress, [start, peak, end], [5, 0, 5]);
    const filter = useTransform(blurVal, v => `blur(${v}px)`);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <motion.div
            className="h-[70vh] w-full flex items-center justify-center p-4 relative shrink-0"
            style={{
                scale,
                opacity,
                filter: isMobile ? 'none' : filter,
                zIndex: 10 // Ensure slides are above background but below timeline markers if needed
            }}
        >
            <div className="container max-w-[95%] md:max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-32 items-center px-4 relative z-10">
                {/* Image Side - Left */}
                <div className="relative w-full flex justify-center md:justify-start">
                    <div className="relative p-6 group">
                        <div className="absolute inset-0 bg-primary/5 dark:bg-accent/5 rounded-4xl -z-10 group-hover:bg-primary/10 transition-all duration-700" />
                        <div className="absolute inset-0 border border-primary dark:border-accent/30 rounded-tl-[3rem] rounded-br-[3rem] transform translate-x-3 translate-y-3 z-0" />

                        <div className="relative z-10 h-48 md:h-[50vh] w-full max-w-xl rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden shadow-2xl bg-white dark:bg-neutral-800 border-4 border-white dark:border-neutral-700">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover transform transition-transform duration-2000 ease-out hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-tr from-black/10 to-transparent pointer-events-none" />
                        </div>

                        <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-primary dark:border-accent rounded-tl-xl z-20" />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-primary dark:border-accent rounded-br-xl z-20" />
                    </div>
                </div>

                {/* Text Side - Right */}
                <div className="flex flex-col justify-center space-y-4 md:space-y-6 pl-0 md:pl-12">
                    <h3 className="text-2xl md:text-5xl lg:text-6xl font-serif text-[#800000] dark:text-[#D4AF37]">
                        {slide.title}
                    </h3>
                    <p className="text-sm md:text-xl leading-relaxed font-normal text-black dark:text-red-600" style={{ opacity: 1 }}>
                        {slide.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                        {slide.features.map((f, i) => (
                            <span key={i} className="px-3 py-1 md:px-5 md:py-2 border border-[#800000]/30 dark:border-[#C2B280]/30 rounded-full text-xs md:text-sm font-medium text-oxford-blue dark:text-neutral-300 tracking-wide bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                                {f}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const activeIndex = useTransform(scrollYProgress, (v) => {
        const idx = Math.floor(v * slides.length);
        if (idx < 0) return 1;
        if (idx >= slides.length) return slides.length;
        return idx + 1;
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // We want to scroll the slides UP as we scroll down.
    // The sequence is linear movement.
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", `-${(slides.length - 1) * 100}%`]);

    return (
        <div ref={containerRef} className="relative min-h-[500vh]"> {/* Tall track for scrolling duration */}

            <BackgroundOrbs />
            <FloatingBubbles />

            {/* Container for the Sticky Viewport */}
            <div className="sticky top-[15vh] h-[70vh] w-full flex items-center justify-center px-4">

                {/* The VISIBLE RECTANGLE */}
                <div className="relative w-full max-w-[95vw] h-full overflow-hidden rounded-3xl">

                    {/* Main Center Line & Box */}
                    <div
                        className="hidden md:block absolute left-1/2 top-1/2 h-[90%] w-0.5 bg-black/40 dark:bg-[#D4AF37]/30 z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black/60 dark:bg-[#D4AF37]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-black/60 dark:bg-[#D4AF37]" />

                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary dark:bg-accent text-background dark:text-black text-sm font-bold px-4 py-1.5 rounded-full shadow-2xl whitespace-nowrap border-2 border-background dark:border-black"
                            style={{
                                top: useTransform(springProgress, [0, 1], ["0%", "100%"]), // Moves full height of container
                                zIndex: 60
                            }}
                        >
                            <motion.span>{activeIndex}</motion.span>
                            <span className="text-xs opacity-70 ml-1">/ 6</span>
                        </motion.div>
                    </div>

                    {/* Slides Moving Track */}
                    <motion.div
                        className="h-full w-full"
                        style={{ y: yTransform }}
                    >
                        {slides.map((slide, index) => (
                            <Slide
                                key={slide.id}
                                slide={slide}
                                index={index}
                                total={slides.length}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </motion.div>

                </div>
            </div>

            {/* Spacer to show "Next" content after scrolling is done */}
            <div className="h-[20vh] w-full" />

        </div>
    );
};

export default Timeline;
