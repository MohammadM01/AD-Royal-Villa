import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Slideshow = ({ images, title, description, reverse }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [progress, setProgress] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setProgress(0);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setProgress(0);
    };

    // Auto-play functionality with progress bar
    useEffect(() => {
        let interval;
        if (!isHovered) {
            const duration = 4000; // 4 seconds
            const step = 100;

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        nextSlide();
                        return 0;
                    }
                    return prev + (step / duration) * 100;
                });
            }, step);
        }
        return () => clearInterval(interval);
    }, [isHovered, currentIndex]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-16 py-16 ${reverse ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Text Side */}
            <motion.div
                className="w-full md:w-1/2 text-center md:text-left relative z-10"
            >
                <div className="absolute -inset-10 bg-[#D4AF37]/5 blur-[60px] rounded-full opacity-0 md:opacity-100 pointer-events-none"></div>

                <h3 className="text-4xl md:text-6xl font-heading font-medium text-white mb-6 relative">
                    {title}
                    <span className="block h-1 w-20 bg-[#D4AF37] mt-4 md:mx-0 mx-auto"></span>
                </h3>
                <p className="text-gray-300 mb-8 font-light text-xl leading-relaxed relative">
                    {description}
                </p>

                <div className="hidden md:flex items-center gap-4">
                    <div className="h-[1px] flex-grow bg-white/10"></div>
                    <span className="text-[#D4AF37] text-sm uppercase tracking-widest">Explore</span>
                </div>
            </motion.div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 perspective-1000">
                <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-white/10 transform transition-transform duration-500 hover:scale-[1.02]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Golden Highlight Border */}
                    <div className="absolute inset-0 border-2 border-[#D4AF37]/0 group-hover:border-[#D4AF37]/50 transition-colors duration-500 z-20 rounded-2xl pointer-events-none"></div>

                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={title}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] z-30 translate-x-4 group-hover:translate-x-0"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] z-30 -translate-x-4 group-hover:translate-x-0"
                    >
                        <FaChevronRight />
                    </button>

                    {/* Progress Bar & Dots */}
                    <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between">
                        <div className="flex space-x-2">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => { setCurrentIndex(idx); setProgress(0); }}
                                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'bg-[#D4AF37] w-8' : 'bg-white/30 w-2 hover:bg-white'}`}
                                />
                            ))}
                        </div>

                        {/* Timer Line */}
                        <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#D4AF37]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const VideoSection = ({ video, title, description, reverse }) => {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-16 py-24 ${reverse ? 'md:flex-row-reverse' : ''}`}>

            {/* Video Side */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 relative"
            >
                {/* Cinematic Back Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group bg-black">
                    <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        controls
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 pointer-events-none border border-[#D4AF37]/10 rounded-2xl"></div>
                </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
                initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 text-center md:text-left relative z-10"
            >
                <div className="inline-block border-b border-[#D4AF37] pb-2 mb-6">
                    <span className="text-[#D4AF37] text-sm tracking-[0.4em] uppercase font-bold">Cinematic Experience</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-heading text-white mb-6 leading-tight">{title}</h3>
                <p className="text-gray-300 leading-relaxed text-xl font-light">{description}</p>

                <button className="mt-8 px-8 py-3 border border-white/20 rounded-full text-white text-sm uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300">
                    Watch Preview
                </button>
            </motion.div>
        </div>
    )
}

const Activities = () => {
    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-32 pb-20 overflow-hidden relative selection:bg-[#D4AF37] selection:text-black">

            {/* Global Ambient Effects */}
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px]"></div>
            </div>

            {/* Header */}
            <div className="text-center mb-24 px-6 relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-heading font-medium text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] via-[#fff] to-[#D4AF37] mb-8 drop-shadow-2xl"
                >
                    Endless Fun &<br />Adventures
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed"
                >
                    From sizzling barbecues to thrilling water slides, every moment is specifically curated for joy.
                </motion.p>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Slideshows Section */}
                <div className="flex flex-col gap-12 mb-32 max-w-6xl mx-auto">
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
                <div className="flex items-center justify-center gap-6 mb-24 opacity-60">
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
                    <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm font-bold glow-gold">Aquatic Adventures</span>
                    <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
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
                <div className="mt-32 text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#D4AF37]/5 blur-[80px] rounded-full pointer-events-none"></div>
                    <a href="/contact" className="relative group inline-block px-14 py-5 overflow-hidden rounded-full cursor-pointer">
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#D4AF37] to-[#b89628] opacity-100 group-hover:opacity-90 transition-opacity"></span>
                        <span className="relative text-black font-bold uppercase tracking-[0.2em]">Book Your Activity Now</span>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Activities;
