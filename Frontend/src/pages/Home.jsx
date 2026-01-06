import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdmissionModal from '../components/common/AdmissionModal';

const Home = () => {
    return (
        <div className="bg-bg-light">
            <AdmissionModal />

            {/* NEW HERO SECTION - CURVED & MATTE BLACK */}
            <section className="bg-[#000] px-4 pt-20 pb-8 md:px-8">
                <div className="relative h-[85vh] w-full rounded-[40px] overflow-hidden flex items-center justify-center">
                    {/* Background Video */}
                    <div className="absolute inset-0 z-0">
                        <video
                            src="/Assets/WhatsApp Video 2026-01-04 at 13.43.19.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Overlay for Readability */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 text-center text-white px-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-accent uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-bold"
                        >
                            Welcome to Paradise
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium mb-10 leading-tight"
                        >
                            Experience The <br /> <span className="italic font-light">Royal Life</span>
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <Link to="/contact" className="px-10 py-4 bg-accent text-white hover:bg-white hover:text-primary transition-colors duration-300 uppercase tracking-widest text-sm font-bold">
                                Book Your Stay
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* INTRO TEXT */}
            <section className="py-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-heading text-primary mb-8">A Sanctuary of Serenity</h2>
                    <div className="w-24 h-1 bg-accent mx-auto mb-10"></div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Nestled away from the city's chaos, AD Royal Villa offers an exclusive escape for those who seek luxury, privacy, and comfort.
                        Whether it's a family gathering or a weekend retreat, every corner of our property is designed to provide you with an unforgettable experience.
                    </p>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group cursor-pointer">
                            <div className="h-[400px] overflow-hidden relative mb-6">
                                <img src="/Assets/pool_highlight_4.mp4" alt="Private Pool" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                {/* Video Fallback/Image Hack: using video src in img tag works in some browsers as poster, but ideally use video tag. Reverting to video tag for safety */}
                                <video src="/Assets/pool_highlight_4.mp4" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" muted loop onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                            </div>
                            <h3 className="text-2xl font-heading text-primary group-hover:text-accent transition-colors mb-2">Private Pool</h3>
                            <p className="text-gray-500">Dive into crystal clear waters with our signature mushroom rain fountain.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="group cursor-pointer">
                            <div className="h-[400px] overflow-hidden relative mb-6">
                                <img src="/Assets/villa_entrance_facade.jpg" alt="Luxury Villa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <h3 className="text-2xl font-heading text-primary group-hover:text-accent transition-colors mb-2">Luxury Living</h3>
                            <p className="text-gray-500">Spacious bedrooms, modern amenities, and elegant interiors.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="group cursor-pointer">
                            <div className="h-[400px] overflow-hidden relative mb-6">
                                <img src="/Assets/outdoor_lounge_canopy.jpg" alt="Outdoor Lounge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <h3 className="text-2xl font-heading text-primary group-hover:text-accent transition-colors mb-2">Outdoor Lounge</h3>
                            <p className="text-gray-500">Relax under the open sky in our premium patio and garden areas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VIDEO HIGHLIGHT */}
            <section className="h-[60vh] md:h-[80vh] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <video src="/Assets/homepage2video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                <div className="relative z-20 text-center text-white">
                    <h2 className="text-4xl md:text-6xl font-heading mb-6">Unlock The Magic</h2>
                    <button className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white hover:bg-accent hover:border-accent transition-all">
                        <span className="text-2xl">▶</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
