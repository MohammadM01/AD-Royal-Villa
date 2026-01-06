import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Slideshow = ({ images, title, description, reverse }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000); // Change slide every 3 seconds
            return () => clearInterval(interval);
        }
    }, [isHovered, currentIndex]);

    return (
        <div className={`flex flex-col md:flex-row items-center gap-12 py-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <motion.div
                initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2 text-center md:text-left"
            >
                <h3 className="text-4xl font-heading text-[#D4AF37] mb-6">{title}</h3>
                <p className="text-gray-300 mb-8 font-light text-lg">{description}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2"
            >
                <div
                    className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group border border-white/5"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={title}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#D4AF37] hover:text-black z-10"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#D4AF37] hover:text-black z-10"
                    >
                        <FaChevronRight />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#D4AF37] w-6' : 'bg-white/50 w-2'}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const VideoSection = ({ video, title, description, reverse }) => {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-12 py-16 ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/2"
            >
                <div className="rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 relative group">
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        controls
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full md:w-1/2 text-center md:text-left"
            >
                <div className="inline-block border-b border-[#D4AF37] pb-2 mb-4">
                    <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase">Adventure</span>
                </div>
                <h3 className="text-4xl font-heading text-white mb-6">{title}</h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light">{description}</p>
            </motion.div>
        </div>
    )
}

const Activities = () => {
    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-32 pb-20">
            {/* Header */}
            <div className="text-center mb-20 px-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-heading font-medium text-[#D4AF37] mb-6"
                >
                    Endless Fun & Activities
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-xl max-w-3xl mx-auto"
                >
                    From sizzling barbecues to thrilling water slides, every moment is packed with joy.
                </motion.p>
            </div>

            <div className="container mx-auto px-6">

                {/* Slideshows Section (BBQ & Kids) */}
                {/* Slideshows Section */}
                <div className="flex flex-col gap-24 mb-24 max-w-5xl mx-auto">
                    <Slideshow
                        title="Gourmet BBQ Station"
                        description="Fire up the grill at our dedicated barbecue station. Perfect for evening parties, featuring ample space and premium equipment for your culinary adventures."
                        images={[
                            "/Assets/Activites and pool/bbq1.jpeg",
                            "/Assets/Activites and pool/bbq2.png"
                        ]}
                    />

                    <Slideshow
                        title="Kids Play Zone"
                        description="A secure and exciting playground for our little guests. Featuring swings, slides, and lush green grass for safe outdoor fun."
                        images={[
                            "/Assets/Activites and pool/kidplayingevening.jpg",
                            "/Assets/Activites and pool/kids_swings_garden.jpg"
                        ]}
                        reverse={true}
                    />

                    <Slideshow
                        title="Grand Pool & Slides"
                        description="Experience the thrill of our massive water slides and crystal clear private pool. The perfect spot for aquatic fun and relaxation."
                        images={[
                            "/Assets/Activites and pool/pool_slides_aerial_view.jpg",
                            "/Assets/Activites and pool/pool_villa_exterior_day.jpg"
                        ]}
                    />
                </div>

                {/* Heading Divider */}
                <div className="flex items-center justify-center gap-4 mb-16 opacity-50">
                    <div className="h-[1px] w-24 bg-[#D4AF37]"></div>
                    <span className="text-[#D4AF37] uppercase tracking-widest text-sm">Aquatic Adventures</span>
                    <div className="h-[1px] w-24 bg-[#D4AF37]"></div>
                </div>

                {/* Video Sections */}
                <VideoSection
                    title="Rain Dance Party"
                    description="Dance away your worries with our integrated Rain Dance system. Complete with high-quality audio, it's the ultimate party starter for groups of all sizes."
                    video="/Assets/Activites and pool/raindancex.mp4"
                />

                <VideoSection
                    title="Thrilling Bucket Splash"
                    description="Experience the thrill of our tipping water bucket! A favorite among kids and adults alike, adding a splash of excitement to your pool time."
                    video="/Assets/Activites and pool/xtipiing water bucket.mp4"
                    reverse={true}
                />

                <VideoSection
                    title="Magic Mushroom Fountain"
                    description="Step under the magical mushroom fountain for a gentle and refreshing cascade. A perfect playful spot for children to enjoying the cooling waters."
                    video="/Assets/mushroom water fountain.mp4"
                />

                {/* Final CTA */}
                <div className="mt-20 text-center">
                    <a href="/contact" className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-12 py-4 rounded-full transition-all duration-300 uppercase tracking-widest font-medium">
                        Book Your Activity Now
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Activities;
