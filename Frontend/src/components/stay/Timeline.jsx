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
                    className="absolute bg-[#800000]/15 dark:bg-[#C2B280]/10 rounded-full blur-[100px]"
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



const Slide = ({ slide, index, globalProgress }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Scale: GENTLE breathe effect (Stronger start/end for visibility)
    // Enter (0-0.4): 0.85 -> 1 (Expand)
    // Center (0.4-0.6): 1 (Hold)
    // Exit (0.6-1.0): 1 -> 0.85 (Shrink)
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);

    // Opacity: Fade in/out (Higher start opacity so expansion is visible)
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.4, 1, 1, 0]);

    // Blur: Only on Exit
    const blurValue = useTransform(scrollYProgress, [0.9, 1], [0, 8]);
    const blurFilter = useTransform(blurValue, (v) => v > 0 ? `blur(${v}px)` : "none");

    const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={ref} className="min-h-screen w-full flex items-center justify-center py-24 relative snap-center">
            <div className="container max-w-[95%] md:max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center px-4 relative z-10">

                {/* Image Side - Left */}
                <motion.div
                    style={{ scale, opacity, y: yContent, filter: blurFilter }}
                    className="relative w-full flex justify-center md:justify-start"
                >
                    <div className="relative p-6">
                        {/* Removed blur-xl to ensure clarity */}
                        <div className="absolute inset-0 bg-[#800000]/5 dark:bg-[#C2B280]/5 rounded-[2rem] -z-10 group-hover:bg-[#800000]/10 transition-all duration-700" />
                        <div className="absolute inset-0 border border-[#800000] dark:border-[#C2B280]/30 rounded-tl-[3rem] rounded-br-[3rem] transform translate-x-3 translate-y-3 z-0" />

                        <div className="relative z-10 h-[50vh] md:h-[65vh] w-full max-w-2xl rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden shadow-2xl bg-white dark:bg-neutral-800 border-4 border-white dark:border-neutral-700">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-out hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                        </div>

                        <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-[#800000] dark:border-[#C2B280] rounded-tl-xl z-20" />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-[#800000] dark:border-[#C2B280] rounded-br-xl z-20" />
                    </div>
                </motion.div>

                {/* Text Side - Right */}
                <motion.div
                    style={{
                        scale,
                        opacity,
                        y: useTransform(yContent, v => -v * 0.5),
                        filter: "none" // Keep text sharp
                    }}
                    className="flex flex-col justify-center space-y-6 pl-4 md:pl-12"
                >
                    {/* Progress Line */}
                    <div className="relative w-full max-w-[120px] h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#8B7E66] dark:bg-[#C2B280]"
                            style={{ width: useSpring(useTransform(globalProgress, [0, 1], ["0%", "100%"]), { stiffness: 40, damping: 20 }) }}
                        />
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C2C2C] dark:text-[#EAEAEA]">
                        {slide.title}
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed font-normal text-black dark:text-neutral-300">
                        {slide.desc}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {slide.features.map((f, i) => (
                            <span key={i} className="px-5 py-2 border border-[#800000]/40 dark:border-[#C2B280]/30 rounded-full text-sm font-medium text-black dark:text-neutral-300 tracking-wide bg-white/40 dark:bg-black/20 backdrop-blur-0">
                                {f}
                            </span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

const Timeline = () => {
    const containerRef = useRef(null);
    const footerSentinelRef = useRef(null);

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

    const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

    const [isFooterInView, setIsFooterInView] = useState(false);
    const isFooterInViewRaw = useInView(footerSentinelRef, { margin: "0px 0px 200px 0px" });

    useEffect(() => {
        setIsFooterInView(isFooterInViewRaw);
    }, [isFooterInViewRaw]);

    return (
        <div className="relative overflow-hidden min-h-screen transition-colors duration-500">

            <BackgroundOrbs />
            <FloatingBubbles />

            {/* Hero Header Space */}
            <div className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden z-20">
                {/* RESTORED HERO BLUR CIRCLE */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#800000]/20 dark:bg-[#D4AF37]/10 rounded-full blur-[100px]" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative z-10 text-center px-4"
                >
                    <h1 className="text-6xl md:text-8xl font-serif text-[#800000] dark:text-[#D4AF37] mb-6 drop-shadow-lg">
                        Stay & Comfort
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-[#2C2C2C] dark:text-[#F5E6C8] max-w-2xl mx-auto">
                        Experience the height of luxury living.
                    </p>
                </motion.div>
            </div>

            {/* Main Center Line & Box */}
            <motion.div
                className="fixed top-0 left-1/2 w-[2px] h-full bg-black dark:bg-[#D4AF37]/50 z-50 -translate-x-1/2 pointer-events-none"
                style={{ opacity: isFooterInView ? 0 : lineOpacity }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#800000] dark:bg-[#D4AF37] text-white dark:text-black text-sm font-bold px-4 py-1.5 rounded-full shadow-2xl whitespace-nowrap border-2 border-white dark:border-black"
                    style={{
                        top: useTransform(springProgress, [0, 1], ["20vh", "80vh"]),
                        zIndex: 60
                    }}
                >
                    <motion.span>{activeIndex}</motion.span>
                    <span className="text-xs opacity-70 ml-1">/ 6</span>
                </motion.div>
            </motion.div>

            {/* Slides Container */}
            <div ref={containerRef} className="relative pb-40 z-10">
                {slides.map((slide, index) => (
                    <Slide
                        key={slide.id}
                        slide={slide}
                        index={index}
                        globalProgress={scrollYProgress}
                    />
                ))}
            </div>

            <div ref={footerSentinelRef} className="h-px w-full" />
        </div>
    );
};

export default Timeline;
