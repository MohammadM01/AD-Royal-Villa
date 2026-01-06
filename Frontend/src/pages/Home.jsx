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

            {/* INTRO TITLE - DARK THEME */}
            <section className="pt-24 px-6 text-center bg-black">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-heading text-accent mb-8">A Sanctuary of Serenity</h2>
                    <div className="w-24 h-1 bg-accent/50 mx-auto"></div>
                </div>
            </section>

            {/* CURVED CARDS SECTION (FANNED LAYOUT) */}
            <section className="pt-12 pb-12 bg-black overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 h-auto md:h-[600px]">

                        {/* Left Card */}
                        <div className="w-full md:w-[385px] h-[330px] md:h-[500px] relative md:transform md:-rotate-12 md:translate-y-12 md:translate-x-12 z-0 rounded-[30px] border-4 border-gray-800 overflow-hidden shadow-2xl transition-all duration-500 hover:z-20 hover:scale-105 hover:rotate-0 hover:border-accent">
                            <video src="/Assets/pool_highlight_4.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute bottom-6 left-6 text-white font-heading text-xl">Private Pool</div>
                        </div>

                        {/* Center Card */}
                        <div className="w-full md:w-[440px] h-[385px] md:h-[550px] relative z-10 rounded-[30px] border-4 border-accent overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-transform duration-500 hover:scale-105">
                            <video src="/Assets/ameneties/villa_walkthrough_hero_backup.mp4" className="w-full h-full object-cover" autoPlay muted loop playsInline />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-8 left-8">
                                <h3 className="text-white font-heading text-3xl mb-2">Luxury Living</h3>
                                <p className="text-gray-300 text-sm">Experience the finest comforts.</p>
                            </div>
                        </div>

                        {/* Right Card */}
                        <div className="w-full md:w-[385px] h-[330px] md:h-[500px] relative md:transform md:rotate-12 md:translate-y-12 md:-translate-x-12 z-0 rounded-[30px] border-4 border-gray-800 overflow-hidden shadow-2xl transition-all duration-500 hover:z-20 hover:scale-105 hover:rotate-0 hover:border-accent">
                            <img src="/Assets/outdoor_lounge_canopy.jpg" alt="Outdoor Lounge" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="absolute bottom-6 left-6 text-white font-heading text-xl">Outdoor Lounge</div>
                        </div>

                    </div>
                </div>
            </section>

            {/* INTRO TEXT BODY - DARK THEME */}
            <section className="pb-24 px-6 text-center bg-black">
                <div className="container mx-auto max-w-4xl">
                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                        Nestled away from the city's chaos, AD Royal Villa offers an exclusive escape for those who seek luxury, privacy, and comfort.
                        Whether it's a family gathering or a weekend retreat, every corner of our property is designed to provide you with an unforgettable experience.
                    </p>
                </div>
            </section>

            {/* AQUATIC PARADISE SECTION - REDESIGNED FOR VISIBILITY */}
            <section className="py-24 pb-40 bg-black relative">
                <div className="container mx-auto px-6">
                    {/* Section Title */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-heading text-[#D4AF37] mb-4">Aquatic Paradise</h2>
                        <div className="w-24 h-1 bg-[#D4AF37]/50 mx-auto"></div>
                    </div>

                    {/* New Layout: Grand Showcase (1 Top, 2 Bottom) */}
                    <div className="flex flex-col gap-8">

                        {/* Main Hero Video (Full Width) */}
                        <div className="w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl relative group">
                            <video src="/Assets/pool_highlight_4.mp4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" autoPlay muted loop playsInline />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        </div>

                        {/* Secondary Videos (Side by Side) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px] md:h-[500px]">

                            {/* Video 2 */}
                            <div className="w-full h-full rounded-3xl overflow-hidden border border-[#D4AF37]/20 relative group">
                                <video src="/Assets/pool_highlight_5.mp4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" autoPlay muted loop playsInline />
                            </div>

                            {/* Video 3 */}
                            <div className="w-full h-full rounded-3xl overflow-hidden border border-[#D4AF37]/20 relative group">
                                <video src="/Assets/pool_highlight_6.mp4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" autoPlay muted loop playsInline />
                            </div>

                        </div>

                    </div>

                    {/* Spacer for Footer */}
                    <div className="h-20"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
