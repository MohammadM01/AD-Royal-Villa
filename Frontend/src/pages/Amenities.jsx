import React from 'react'
import { motion } from 'framer-motion'
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

const Amenities = () => {
    return (
        <div className="bg-[#F9F9F4] min-h-screen">
            {/* Header Section */}
            <div className="pt-32 pb-16 text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-heading font-bold text-primary mb-6"
                >
                    Amenities & Experiences
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg text-primary/80 max-w-2xl mx-auto tracking-wide leading-relaxed font-light"
                >
                    Discover a world of privacy, luxury, and comfort crafted exclusively for you.
                </motion.p>
            </div>

            {/* Alternating Sections */}
            <div className="flex flex-col">
                {amenitiesData.map((item, index) => (
                    <div key={index} className="w-full relative min-h-[80vh] flex items-center justify-center overflow-hidden py-12">
                        {/* Alternate Background for visual break */}
                        <div className={`absolute inset-0 z-0 ${index % 2 === 0 ? 'bg-transparent' : 'bg-primary/5'}`}></div>

                        <div className={`container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                            }`}>

                            {/* Media Side */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-full md:w-1/2"
                            >
                                <div className="rounded-2xl overflow-hidden shadow-2xl relative group aspect-[4/3]">
                                    {item.type === 'video' ? (
                                        <video
                                            src={item.image}
                                            autoPlay
                                            loop
                                            muted
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                            </motion.div>

                            {/* Text Side */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                className="w-full md:w-1/2 text-center md:text-left space-y-6"
                            >
                                <div className="inline-block border-b border-accent pb-1">
                                    <span className="text-xs font-bold tracking-[0.3em] text-accent uppercase">
                                        0{index + 1} /// Experience
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-heading font-medium text-primary leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed font-light">
                                    {item.description}
                                </p>

                                {item.features && (
                                    <ul className="space-y-2 mt-4 text-left inline-block">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="text-gray-600 flex items-start text-lg">
                                                <span className="text-accent mr-3 mt-1 text-sm">◆</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Amenities Grid - Dark Theme */}
            <div className="py-24 bg-[#1a1a1a]">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-medium text-[#D4AF37] mb-2">
                            All Property Amenities
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {[
                            "Private Pool (80x20 ft)", "Rain Dance System", "Music System", "Barbeque Station",
                            "Fully Furnished 4BHK", "6 Washrooms", "9 Extra Mattresses (Free)", "Mineral Water (20L Jar)",
                            "Hot & Cold Water", "Power Backup (Inverter/Gen)", "Secure Parking (6-8 Cars)", "Caretaker on Site",
                            "Pet Friendly (Conditions Apply)", "Kitchen for Re-heating", "Kids Pool (3ft depth)", "Adult Pool (4.5-5ft depth)",
                            "Family Slide (14x7ft)", "Single Slide (14ft)", "Mushroom Umbrella", "Smart TVs in All Rooms",
                            "Large Living Room (700 sq.ft)", "Royal Dining Table", "Outdoor Games & Swings", "Cricket & Carrom"
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.02, duration: 0.4 }}
                                className="bg-[#2a2a2a] rounded-lg px-6 py-4 flex items-center space-x-3 border border-white/5 hover:border-[#D4AF37]/50 transition-colors group"
                            >
                                <span className="text-[#D4AF37] text-xl flex-shrink-0">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors">
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action at Bottom */}
            <div className="py-24 bg-primary text-[#F9F9F4] text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="container mx-auto px-6"
                >
                    <h2 className="text-4xl md:text-6xl font-heading mb-8">Ready to Experience Paradise?</h2>
                    <a
                        href="/contact"
                        className="inline-block bg-[#F9F9F4] text-primary px-10 py-4 rounded-full font-medium text-lg uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform hover:scale-105"
                    >
                        Book Your Stay
                    </a>
                </motion.div>
            </div>
        </div>
    )
}

export default Amenities
