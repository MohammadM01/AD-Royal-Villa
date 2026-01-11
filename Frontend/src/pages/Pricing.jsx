import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, X, Star, Crown, Utensils, Infinity as InfinityIcon } from 'lucide-react';

// Pricing Data
const pricingPlans = [
    {
        id: 'weekday',
        title: 'Weekday Escape',
        price: '₹18,000',
        period: 'for 1 night (Mon-Fri)',
        subtitle: 'Weekday Escape',
        description: 'A serene retreat for peace and privacy. Perfect for workcations or small family bondings.',
        features: [
            'Up to 20 Guests',
            'Private Pool Access',
            'Garden & Lounge',
            'High-Speed WiFi',
            'Caretaker On-Call',
            'Fully Air-Conditioned Bedrooms',
            'Smart TV with OTT',
            'Fully Equipped Kitchen',
            'Refrigerator & Microwave',
            'Water Purifier',
            '24/7 Hot Water (Geyser)',
            'Inverter Power Backup',
            'Indoor Games (Carrom, Cards)',
            'Outdoor Badminton Set',
            'Cricket Kit Provided',
            'Spacious Parking Area',
            'Pet Friendly (On Request)',
            'First Aid Kit Available',
            'Basic Toiletries Provided',
            'Extra Mattresses Available',
            'Mountain & Nature View',
            'Outdoor Seating Area',
            'Safe & Secure Gated Property',
            'Self-Check-in Available',
            'Clean & Sanitized Premises'
        ],
        realImage: '/Assets/nice_bedroom_interior.jpg',
        image: '/Assets/outdoor_lounge_canopy.webp',
        highlight: false
    },
    {
        id: 'weekend',
        title: 'Royal Weekend',
        price: '₹20,000',
        period: 'for 1 night (Sat-Sun)',
        subtitle: 'Weekend Celebration',
        description: 'The ultimate celebration experience. Full villa access, loud music allowed, perfect for parties.',
        features: [
            'Up to 20 Guests',
            'Full 4BHK Villa Access',
            'Music System Allowed',
            'BBQ Setup Available',
            'Event Hosting Capable',
            'Large Private Swimming Pool',
            'Projector Setup (On Request)',
            'Premium Sound System Ready',
            'Disco / Party Lights',
            'Live Kitchen Access',
            'Event Decor Permitted',
            'Expansive Lawn Area',
            'Outdoor Gazebo Seating',
            'Bonfire Pit & Setup',
            'Luxury Bedding & Linens',
            'Premium Toiletries Kit',
            'Heavy Generator Backup',
            'Dedicated Security Guard',
            'Valet Parking Assistance',
            'Late Checkout (Subject to Avail)',
            'Exclusive Privacy Guaranteed',
            'Photo-shoot Friendly Spots',
            'Interactive Water Fountains'
        ],
        image: '/Assets/Activites and pool/pool_villa_exterior_day.webp',
        highlight: true
    },

];

const Pricing = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={containerRef} className="min-h-screen font-body overflow-x-hidden selection:bg-accent selection:text-white transition-colors duration-300">

            {/* --- HERO SECTION WITH PARALLAX --- */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/Assets/villa_entrance_facade.webp"
                        alt="Royal Villa Facade"
                        className="w-full h-full object-cover scale-110 brightness-[0.65]"
                    />
                    {/* Golden Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="inline-block py-1 px-4 rounded-full border border-accent/50 text-accent bg-black/30 backdrop-blur-md uppercase text-xs tracking-[0.2em] mb-4">
                            Exclusive & Transparent
                        </span>
                        <h1 className="text-6xl md:text-8xl font-heading text-white leading-tight">
                            Experience <span className="text-accent italic">Royalty.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-lg md:text-xl text-stone-300 font-light max-w-4xl mx-auto leading-relaxed"
                    >
                        Detailed pricing for your private sanctuary. No hidden costs. Just pure luxury.
                    </motion.p>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-accent to-transparent" />
                </motion.div>
            </section>

            {/* --- COMPARISON (BENTO GRID STYLE) --- */}
            <section className="py-32 px-4 relative transition-colors duration-300">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20 space-y-4"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading text-primary">The Royal Difference</h2>
                        <div className="w-24 h-1 bg-accent mx-auto" />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                        {/* 1. The Standard (Negative Space) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-4 bg-white border border-stone-200 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center h-full relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                <X className="w-48 h-48 text-stone-900" />
                            </div>
                            <h3 className="text-2xl font-heading text-stone-400 mb-8 z-10">Ordinary Resorts</h3>
                            <ul className="space-y-6 z-10">
                                {['Crowded shared pools', 'Cramped standard rooms', 'Generic buffet food', 'Strict 10 AM Checkout'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-stone-500 group-hover:text-[#00b4d8] transition-colors">
                                        <X className="w-6 h-6 opacity-60" />
                                        <span className="font-light text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* 2. AD Royal (Positive Highlight) - Bento Large */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-8 bg-primary rounded-3xl p-1 md:p-12 relative overflow-hidden shadow-2xl group text-white"
                        >
                            {/* Background Image Enhancement */}
                            <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
                                <img src="/Assets/outdoor_lounge_canopy.webp" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="Texture" />
                            </div>

                            <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8 p-6 md:p-0">
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-accent rounded-2xl text-primary">
                                            <Crown size={32} />
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-heading text-white">AD Royal Luxury</h3>
                                    </div>
                                    <p className="text-white/80 text-lg leading-relaxed">
                                        Step into a world where the entire estate is yours. No sharing, no compromises. Just you and your loved ones in 5,000 sq.ft of private luxury.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                        {[
                                            '100% Private (Whole 4BHK Villa)',
                                            'Exclusive Pool Access',
                                            'Personal Chef & Caretaker',
                                            'Flexible Check-in/out'
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10 hover:bg-white/20 transition-colors">
                                                <Check className="w-5 h-5 text-white" />
                                                <span className="text-sm font-medium tracking-wide">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 hidden md:block">
                                    {/* Abstract Visual Element */}
                                    <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-accent to-orange-600 p-1 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <img src="/Assets/villa_entrance_facade.webp" className="w-full h-full object-cover rounded-xl" alt="Villa" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- PRICING CARDS --- */}
            <section className="py-20 pb-40 px-4 relative overflow-hidden transition-colors duration-300 bg-[#18181b] text-white">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[128px]" />

                <div className="container mx-auto max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-5xl md:text-6xl font-heading mb-6 text-white">Transparent Rates</h2>
                        <p className="text-stone-400 text-xl font-light">Choose the package that suits your gathering.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className={`relative group backdrop-blur-xl rounded-[2rem] border overflow-hidden flex flex-col h-full transition-all duration-500
                                    ${plan.highlight
                                        ? 'bg-gradient-to-b from-stone-800 to-stone-900 border-accent/50 shadow-2xl shadow-accent/20 z-10 md:scale-110'
                                        : 'bg-stone-800/50 border-white/10 hover:border-white/20'
                                    }
                                `}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_20px_2px_rgba(0,180,216,0.5)]" />
                                )}

                                {/* Image Header */}
                                <div className="h-64 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-stone-900/40 z-10 transition-opacity duration-500 group-hover:opacity-20" />
                                    <img
                                        src={plan.image}
                                        alt={plan.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />
                                    <div className="absolute bottom-0 left-0 z-20 p-6 w-full bg-gradient-to-t from-stone-950 to-transparent">
                                        <h3 className={`text-2xl font-bold font-heading ${plan.highlight ? 'text-accent' : 'text-white'}`}>
                                            {plan.title}
                                        </h3>
                                        <p className="text-stone-300 text-sm uppercase tracking-wider">{plan.subtitle}</p>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="mb-8 flex items-baseline">
                                        <span className="text-4xl md:text-5xl font-bold font-heading tracking-tight text-white">{plan.price}</span>
                                        <span className="text-stone-500 ml-2 font-medium">{plan.period}</span>
                                    </div>

                                    <p className="text-stone-400 mb-8 leading-relaxed text-sm h-12">
                                        {plan.description}
                                    </p>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-stone-300 text-sm">
                                                <div className={`p-1 shrink-0 rounded-full ${plan.highlight ? 'bg-accent text-white' : 'bg-stone-700 text-stone-200'}`}>
                                                    <Check size={16} strokeWidth={3} />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 uppercase text-xs
                                        ${plan.highlight
                                            ? 'bg-accent text-white hover:bg-white hover:text-primary shadow-lg shadow-accent/20'
                                            : 'bg-stone-700 text-white hover:bg-stone-600'
                                        }
                                    `}>
                                        Book This Plan
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center border-t border-white/10 pt-10">
                        <p className="text-stone-500 text-sm max-w-2xl mx-auto">
                            * We also host Weddings, Corporate Off-sites, and Photo Shoots.
                            <span className="text-accent cursor-pointer hover:underline ml-1">Contact us for custom packages.</span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
