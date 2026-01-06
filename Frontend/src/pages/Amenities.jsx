import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const amenitiesData = [
    {
        title: "Exclusive Dining Experience",
        description: "Savor your meals in our premium dining area, designed for both intimate family dinners and grand feasts. The ambient lighting and plush seating make every meal a royal affair.",
        image: "/Assets/ameneties/dinningexp.png",
        type: "image"
    },
    {
        title: "Royal 4 Bedroom Villa",
        description: "Experience the epitome of luxury with our spacious and well-appointed sleeping quarters, designed to accommodate large gatherings with ease.",
        image: "/Assets/ameneties/luxury_bedroom_king_tv.jpg",
        type: "image",
        features: [
            "Fully furnished bedrooms with king sized bed",
            "Fully air-conditioned rooms",
            "All 4 bedrooms with Pool View & balcony",
            "All 4 bedrooms with 32 Inch Smart TVs",
            "6 Washrooms to accommodate a big gathering",
            "WC + Indian toilet"
        ]
    },
    {
        title: "Poolside Evening Glow",
        description: "As the sun sets, our pool area transforms into a magical oasis. The ambient lighting sets the perfect mood for a serene evening dip or a lively poolside party.",
        image: "/Assets/ameneties/pool_rooms_evening_glow.jpg",
        type: "image"
    },
    {
        title: "Al Fresco Patio Dining",
        description: "Enjoy the fresh air and scenic views with our poolside patio dining. Perfect for breakfast under the sun or a romantic dinner under the stars.",
        image: "/Assets/ameneties/poolside_patio_dining.jpg",
        type: "image"
    },
    {
        title: "Grand Living Spaces",
        description: "Our expansive living room is the heart of the villa. With ample seating and sophisticated decor, it's the ideal spot for family gatherings and making memories.",
        image: "/Assets/ameneties/spacious living room.png",
        type: "image"
    },
    {
        title: "Villa Tour Experience",
        description: "Take a virtual walk through the magnificence of AD Royal Private Villa. Witness the scale, the beauty, and the privacy that awaits you.",
        image: "/Assets/ameneties/villa_walkthrough_hero_backup.mp4",
        type: "video"
    },
    {
        title: "Serene Villa Vibes",
        description: "Experience the tranquility of our carefully landscaped surroundings. A perfect blend of modern luxury and natural beauty.",
        image: "/Assets/ameneties/image.png",
        type: "image"
    }
]

const AmenitySection = ({ item, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="w-full relative min-h-[90vh] flex items-center justify-center py-24 overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none z-0`}></div>

            <div className={`container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                {/* Media Side with Parallax */}
                <motion.div
                    style={{ y, opacity }}
                    className="w-full md:w-1/2"
                >
                    <div className="relative group">
                        {/* Golden Border Frame */}
                        <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-2xl z-0 transform group-hover:scale-105 transition-transform duration-700"></div>

                        <div className="rounded-xl overflow-hidden shadow-2xl relative z-10 aspect-[4/3] border border-white/10">
                            {item.type === 'video' ? (
                                <video
                                    src={item.image}
                                    autoPlay
                                    loop
                                    muted
                                    className="w-full h-full object-cover transform scale-110"
                                />
                            ) : (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform scale-110 transition-transform duration-1000 group-hover:scale-100"
                                />
                            )}
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Text Side with Glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2 relative"
                >
                    <div className="absolute -inset-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 -z-10 opacity-0 md:opacity-100 shadow-2xl"></div>

                    <div className="space-y-8 p-0 md:p-8">
                        <div className="inline-flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
                            <span className="text-xs font-bold tracking-[0.4em] text-[#D4AF37] uppercase">
                                0{index + 1} /// Collection
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-heading font-medium text-white leading-tight">
                            {item.title.split(' ').map((word, i) => (
                                <span key={i} className="inline-block mr-3 opacity-90 hover:opacity-100 hover:text-[#D4AF37] transition-colors cursor-default">
                                    {word}
                                </span>
                            ))}
                        </h2>

                        <p className="text-lg text-gray-300 leading-relaxed font-light tracking-wide">
                            {item.description}
                        </p>

                        {item.features && (
                            <ul className="grid grid-cols-1 gap-3 mt-6">
                                {item.features.map((feature, idx) => (
                                    <li key={idx} className="text-gray-400 flex items-center text-base font-light border-b border-white/5 pb-2 last:border-0">
                                        <span className="text-[#D4AF37] mr-4 text-xs">◆</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const Amenities = () => {
    return (
        <div className="bg-[#1a1a1a] min-h-screen overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
            {/* Ambient Background Bloom */}
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[150px]"></div>
            </div>

            {/* Header Section */}
            <div className="relative pt-40 pb-20 text-center px-6 z-10">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9F9F4] to-[#D4AF37] mb-8 drop-shadow-lg"
                >
                    Amenities &<br />Experiences
                </motion.h1>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-8"></div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto tracking-wide leading-relaxed font-light italic"
                >
                    "Where every detail is crafted for your absolute comfort and pleasure."
                </motion.p>
            </div>

            {/* Alternating Sections */}
            <div className="relative z-10 flex flex-col gap-0">
                {amenitiesData.map((item, index) => (
                    <AmenitySection key={index} item={item} index={index} />
                ))}
            </div>

            {/* Detailed Amenities Grid - Premium Dark */}
            <div className="relative py-32 bg-black/40 backdrop-blur-sm z-10 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-medium text-[#D4AF37] mb-4 tracking-wide">
                            Complete Royal Inventory
                        </h2>
                        <p className="text-gray-500 font-light uppercase tracking-widest text-sm">Everything you need for a perfect stay</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {[
                            "Private Pool (80x20 ft)", "Rain Dance System", "Hi-Fi Music System", "Pro Barbeque Station",
                            "Luxury 4BHK Villa", "6 Premium Washrooms", "9 Extra Comfort Mattresses", "Comp. Mineral Water",
                            "24/7 Hot & Cold Water", "100% Power Backup", "Secure Parking (8 Cars)", "Dedicated Caretaker",
                            "Pet Friendly Stays", "Re-heating Kitchenette", "Safe Kids Pool (3ft)", "Deep Adult Pool (5ft)",
                            "Family Mega Slide", "Adrenaline Single Slide", "Mushroom Waterfall", "55\" Smart TVs",
                            "Grand Living Hall", "Royal 12-Seater Dining", "Lush Outdoor Lawns", "Indoor Games Arena"
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03, duration: 0.4 }}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                                className="bg-[#1e1e1e] rounded-xl px-6 py-5 flex items-center space-x-4 border border-white/5 shadow-lg group cursor-default"
                            >
                                <span className="text-[#D4AF37] group-hover:text-white transition-colors duration-300">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="text-gray-300 text-sm font-medium tracking-wide group-hover:text-white transition-colors">
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium CTA */}
            <div className="relative py-32 bg-gradient-to-b from-[#1a1a1a] to-black text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6 relative z-10"
                >
                    <h2 className="text-5xl md:text-7xl font-heading text-white mb-10 leading-tight">
                        Your Throne <span className="text-[#D4AF37] italic">Awaits</span>
                    </h2>
                    <a
                        href="/contact"
                        className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-white transition-all duration-300 bg-transparent border-2 border-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37]"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                        <span className="relative text-lg tracking-[0.2em] uppercase group-hover:text-black transition-colors">Book Your Stay</span>
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default Amenities
