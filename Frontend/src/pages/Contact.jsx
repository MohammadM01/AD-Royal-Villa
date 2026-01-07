import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUpRight, Instagram, Facebook } from 'lucide-react';

// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct * 20);
        y.set(yPct * 20);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: mouseY, rotateY: mouseX, transformStyle: "preserve-3d" }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};

const Contact = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <div ref={containerRef} className="min-h-screen bg-stone-50 font-body overflow-x-hidden selection:bg-accent selection:text-white">

            {/* --- VIDEO HERO SECTION --- */}
            <section className="relative h-screen flex items-end pb-24 md:pb-32 justify-center overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover scale-105 filter brightness-[0.6]"
                    >
                        {/* Using REAL ASSET for maximum realism */}
                        <source src="/Assets/villa_walkthrough_hero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
                </motion.div>

                <div className="relative z-10 w-full px-6 md:px-12 max-w-[1400px] flex flex-col md:flex-row items-end justify-between gap-8">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-[2px] bg-accent mb-6"
                        />
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-7xl md:text-9xl font-heading text-white leading-[0.85] tracking-tighter"
                        >
                            Contact<br />
                            <span className="text-accent/90 italic ml-4">Us</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-stone-300 max-w-sm text-lg font-light leading-relaxed backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10"
                    >
                        Ready to elevate your experience? Connect with us to reserve your private sanctuary in the lap of luxury.
                    </motion.div>
                </div>
            </section>

            {/* --- INTERACTIVE INFO SECTION --- */}
            <section className="relative z-20 py-32 px-4 md:px-12 rounded-t-[3rem] -mt-10 bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left: Introduction & Socials */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-heading text-primary mb-6">Let's start the<br />conversation.</h2>
                                <p className="text-stone-500 text-lg leading-relaxed">
                                    Whether you're planning a grand wedding, a corporate retreat, or a quiet family weekend, our concierge team is at your service 24/7.
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-widest text-stone-400 mb-4">Follow our journey</p>
                                <div className="flex gap-4">
                                    <a href="#" className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 group">
                                        <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    </a>
                                    <a href="#" className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group">
                                        <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            {/* Real Image Accent */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg mt-12"
                            >
                                <img src="/Assets/villa_entrance_facade.jpg" className="w-full h-full object-cover" alt="Villa Entrance" />
                                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                            </motion.div>
                        </div>

                        {/* Right: 3D Magnetic Cards */}
                        <div className="space-y-6 lg:mt-20">
                            {[
                                {
                                    icon: <MapPin className="text-accent" size={32} />,
                                    title: "Visit Us",
                                    content: "Near Coral School, Padgha – 421101, 32 km from Thane",
                                    action: "Get Directions",
                                    link: "https://maps.google.com" // Placeholder
                                },
                                {
                                    icon: <Phone className="text-accent" size={32} />,
                                    title: "Call Us",
                                    content: "+91 98000 98000",
                                    sub: "Available 24/7",
                                    action: "Call Now"
                                },
                                {
                                    icon: <Mail className="text-accent" size={32} />,
                                    title: "Email Us",
                                    content: "bookings@adroyalvilla.com",
                                    action: "Send Email"
                                }
                            ].map((item, i) => (
                                <TiltCard key={i} className="group cursor-pointer">
                                    <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-500 relative overflow-hidden">
                                        <div className="absolute right-0 top-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                                            <ArrowUpRight size={24} className="text-stone-300" />
                                        </div>

                                        <div className="flex items-start gap-6">
                                            <div className="p-4 bg-white shadow-sm rounded-2xl border border-stone-100 group-hover:scale-110 transition-transform duration-500">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-heading text-stone-800 mb-2">{item.title}</h3>
                                                <p className="text-stone-600 font-medium text-lg">{item.content}</p>
                                                {item.sub && <p className="text-stone-400 text-sm mt-1">{item.sub}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FULL WIDTH MAP --- */}
            <section className="h-[50vh] w-full bg-stone-200 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15064.096644131584!2d73.089856!3d19.281864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bd7ed3dfc32d%3A0x6b4c375107e3e9d8!2sPadgha%2C%20Maharashtra%20421101!5e0!3m2!1sen!2sin!4v1714838400000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Map"
                    className="hover:filter-none transition-all duration-700"
                />
                <div className="absolute bottom-10 left-10 py-3 px-6 bg-white shadow-2xl rounded-full z-10 pointer-events-none">
                    <span className="flex items-center gap-2 font-bold text-primary">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Open for Visits
                    </span>
                </div>
            </section>
        </div>
    );
};

export default Contact;
