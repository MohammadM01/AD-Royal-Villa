import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const amenities = [
    {
        id: 1,
        type: 'image',
        title: '4 Luxury Bedrooms',
        description: 'Indulge in the ultimate comfort with our four spacious, fully air conditioned bedrooms. Each room features a plush king size bed wrapped in premium linens to ensure a restful sleep. Large pool view balconies let you wake up to serene water vistas every morning. Equipped with large 32 inch Smart TVs, wardrobe storage, and modern attached washrooms, our bedrooms provide a private sanctuary within the villa.',
        src: '/Assets/ameneties/luxury_bedroom_king_tv.webp',
        highlight: 'King Size Beds & Pool View'
    },
    {
        id: 2,
        type: 'image',
        title: 'Private Living Hall',
        description: 'Step into a grand 700 sq.ft. living hall designed for togetherness and entertainment. The open plan layout features expansive seating arrangements, perfect for the whole family to gather. Complete with a massive 65 inch flat screen TV and a high fidelity sound system, it is the ideal spot for movie nights or lively conversations.',
        src: '/Assets/ameneties/spacious living room.webp',
        highlight: '65 inch TV & Sound System'
    },
    {
        id: 3,
        type: 'video',
        title: 'Rain Dance Arena',
        description: 'Get ready to groove under the open sky with our exhilarating Rain Dance setup. Featuring high quality sound systems and rhythmic water showers, it brings the party to life. It is the perfect blend of music, dance, and refreshing splashes, a favorite attraction for guests seeking a high energy aquatic experience.',
        src: '/Assets/Activites and pool/raindancex.mp4',
        highlight: 'Music & Water Jets'
    },
    {
        id: 4,
        type: 'image',
        title: 'Live BBQ Nights',
        description: 'Ignite your senses with our dedicated poolside BBQ station. Indulge in a culinary journey under the stars where you can grill your favorites while enjoying the cool evening breeze. It is the perfect setting for memorable evening gatherings, laughter, and gourmet delights shared with loved ones.',
        src: '/Assets/Activites and pool/bbq1.webp',
        highlight: 'Gourmet Grilling under Stars'
    }
];

const AmenitiesShowcase = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % amenities.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? amenities.length - 1 : prev - 1));
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.2
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.2
        })
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
        exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
    };

    return (
        <section className="relative h-auto md:h-[800px] bg-[#0F172A] overflow-hidden flex flex-col md:flex-row text-white">
            {/* Left Content Panel */}
            <div className="w-full md:w-[40%] relative z-20 flex flex-col justify-center px-8 md:px-16 py-6 md:py-12 bg-[#0F172A]">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-primary to-accent"></div>

                <span className="text-secondary/80 uppercase tracking-[0.2em] text-sm font-bold mb-6">
                    Exclusive Amenities
                </span>

                <div className="relative h-[450px] md:h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={textVariants}
                            className="absolute top-0 left-0 w-full flex flex-col items-start justify-start md:justify-center h-full"
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                                {amenities[currentIndex].title}
                            </h2>
                            <div className="w-20 h-1 bg-accent mb-6"></div>
                            <p className="text-gray-300 text-lg leading-relaxed font-light mb-2 text-justify hyphens-none">
                                {amenities[currentIndex].description}
                            </p>
                            <div className="inline-flex items-center space-x-2 text-accent uppercase tracking-widest text-xs font-bold border border-accent/30 px-4 py-2 rounded-full mt-6">
                                <span>✦</span>
                                <span>{amenities[currentIndex].highlight}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls & Actions */}
                <div className="flex flex-col space-y-6 mt-4 z-30">
                    {/* Slider Nav */}
                    <div className="flex items-center space-x-6 md:space-x-8">
                        <button
                            onClick={prevSlide}
                            className="p-5 md:p-4 rounded-full border border-white/20 hover:bg-white hover:text-[#0F172A] transition-all duration-300 group active:scale-95"
                        >
                            <ChevronLeft size={28} className="md:w-6 md:h-6" />
                        </button>
                        <div className="flex space-x-3">
                            {amenities.map((_, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        setDirection(idx > currentIndex ? 1 : -1);
                                        setCurrentIndex(idx);
                                    }}
                                    className={`h-1.5 md:h-1 transition-all duration-500 cursor-pointer rounded-full ${idx === currentIndex ? 'w-12 bg-accent' : 'w-4 bg-white/20 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={nextSlide}
                            className="p-5 md:p-4 rounded-full border border-white/20 hover:bg-white hover:text-[#0F172A] transition-all duration-300 group active:scale-95"
                        >
                            <ChevronRight size={28} className="md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link
                            to="/activities"
                            className="px-8 py-3 rounded-full bg-accent text-[#0F172A] hover:bg-white hover:text-[#0F172A] font-bold text-xs uppercase tracking-widest transition-all duration-300"
                        >
                            View Pool & Activities
                        </Link>
                        <Link
                            to="/stay"
                            className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-[#0F172A] font-bold text-xs uppercase tracking-widest transition-all duration-300"
                        >
                            View All Amenities
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Image/Video Panel */}
            <div className="w-full md:w-[60%] relative h-[400px] md:h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.5 },
                            scale: { duration: 8 } // Slow zoom effect
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {amenities[currentIndex].type === 'video' ? (
                            <video
                                src={amenities[currentIndex].src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <img
                                src={amenities[currentIndex].src}
                                alt={amenities[currentIndex].title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Overlay Gradient for seamless blend */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-transparent to-transparent z-10 w-32"></div>
                <div className="absolute inset-0 bg-black/20 z-0"></div>
            </div>
        </section>
    );
};

export default AmenitiesShowcase;
