import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Pricing = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardHover = {
        hover: { y: -10, transition: { duration: 0.3 } }
    };

    return (
        <div className="min-h-screen bg-[#FFFFF0] overflow-x-hidden pt-20">
            {/* 1. Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/Assets/generated_pricing/pool_luxury.png"
                        alt="Royal Villa Pool"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-heading mb-6 text-accent"
                    >
                        Transparent Luxury
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl font-light tracking-wide text-gray-200"
                    >
                        Detailed rates for your exclusive getaway at AD Royal Private Villa.
                    </motion.p>
                </div>
            </section>

            {/* 2. Why Choose Us (Comparison) */}
            <section className="py-24 px-4 container mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                    className="max-w-6xl mx-auto"
                >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <span className="text-accent uppercase tracking-widest font-semibold text-sm">The Royal Difference</span>
                        <h2 className="text-4xl md:text-5xl font-heading text-primary mt-4">Why Choose AD Royal Villa?</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                        {/* Comparison Table / Cards */}

                        {/* Left: Others */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 opacity-80 backdrop-blur-sm"
                        >
                            <h3 className="text-2xl font-heading text-gray-500 mb-6 border-b pb-4">Standard Resorts</h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <X className="w-5 h-5 text-red-400" />
                                    <span>Shared pools with strangers</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <X className="w-5 h-5 text-red-400" />
                                    <span>Hidden service charges</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <X className="w-5 h-5 text-red-400" />
                                    <span>Small, cramped hotel rooms</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <X className="w-5 h-5 text-red-400" />
                                    <span>Strict checkout timings</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <X className="w-5 h-5 text-red-400" />
                                    <span>Generic buffet food</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Right: Us (Highlight) */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-primary text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden transform md:scale-105 z-10 border-2 border-accent"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <img src="/Assets/villa_entrance_facade.jpg" className="w-64 h-64 object-cover rounded-full" alt="Icon" />
                            </div>

                            <h3 className="text-3xl font-heading text-accent mb-6 border-b border-accent/30 pb-4">AD Royal Private Villa</h3>
                            <ul className="space-y-5">
                                <li className="flex items-center gap-3 text-lg">
                                    <Check className="w-6 h-6 text-accent" />
                                    <span>100% Private (Whole Villa to Yourself)</span>
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <Check className="w-6 h-6 text-accent" />
                                    <span>All-Inclusive Transparent Pricing</span>
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <Check className="w-6 h-6 text-accent" />
                                    <span>Luxury 5BHK with Private Living Hall</span>
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <Check className="w-6 h-6 text-accent" />
                                    <span>Flexible Check-in/out (on request)</span>
                                </li>
                                <li className="flex items-center gap-3 text-lg">
                                    <Check className="w-6 h-6 text-accent" />
                                    <span>Personal Chef & Fresh Home-Cooked Meals</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* 3. Pricing Packages */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Decorative Background Image */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <img src="/Assets/generated_pricing/garden_party.png" className="w-full h-full object-cover" alt="Background" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-heading text-primary">Exclusive Packages</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Choose the perfect getaway for your family and friends.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

                        {/* Card 1: Weekday */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover="hover"
                            className="bg-[#FFFFF0] rounded-xl overflow-hidden shadow-xl flex flex-col group"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src="/Assets/generated_pricing/bedroom_luxury.png"
                                    alt="Luxury Bedroom"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                    <h3 className="text-2xl font-bold text-white font-heading">Weekday Bliss</h3>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Monday - Thursday</p>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-primary">₹12,000</span>
                                    <span className="text-gray-500">/ night</span>
                                </div>
                                <p className="text-gray-600 mb-6 flex-1">
                                    Perfect for a quiet family retreat or a remote work escape. Enjoy the full villa with complete privacy.
                                </p>
                                <ul className="space-y-2 mb-8 text-sm text-gray-700">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Up to 15 Guests</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Access to Pool & Garden</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Caretaker Support</li>
                                </ul>
                                <button className="w-full py-4 border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors rounded-lg">
                                    Book Weekday
                                </button>
                            </div>
                        </motion.div>

                        {/* Card 2: Weekend (Featured) */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover="hover"
                            className="bg-primary rounded-xl overflow-hidden shadow-2xl flex flex-col transform md:-translate-y-4 md:border-4 md:border-accent group"
                        >
                            <div className="bg-accent text-primary text-center py-2 font-bold text-sm tracking-widest uppercase">
                                Most Popular
                            </div>
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src="/Assets/generated_pricing/pool_luxury.png"
                                    alt="Weekend Pool Party"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-6">
                                    <h3 className="text-2xl font-bold text-accent font-heading">Weekend Royal</h3>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col text-white">
                                <p className="text-sm text-gray-200 uppercase tracking-widest mb-2">Friday - Sunday</p>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-5xl font-bold text-accent">₹25,000</span>
                                    <span className="text-gray-200">/ night</span>
                                </div>
                                <p className="text-gray-100 mb-6 flex-1">
                                    The ultimate celebration experience. Ideal for get-togethers, birthdays, and big family reunions.
                                </p>
                                <ul className="space-y-2 mb-8 text-sm text-gray-200">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Up to range of Guests</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Full Villa + Event Space</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Music & Party Setup Allowed</li>
                                </ul>
                                <button className="w-full py-4 bg-accent text-primary font-bold hover:bg-white transition-colors rounded-lg shadow-lg">
                                    Book Weekend
                                </button>
                            </div>
                        </motion.div>

                        {/* Card 3: Food & Additional */}
                        <motion.div
                            variants={fadeInUp}
                            whileHover="hover"
                            className="bg-[#FFFFF0] rounded-xl overflow-hidden shadow-xl flex flex-col group"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src="/Assets/Activites and pool/bbq1.jpeg"
                                    alt="BBQ"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                    <h3 className="text-2xl font-bold text-white font-heading">Culinary Delights</h3>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Meal Packages</p>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold text-primary">₹800</span>
                                    <span className="text-gray-500">/ head</span>
                                </div>
                                <p className="text-gray-600 mb-6 flex-1">
                                    Authentic, fresh home-cooked meals prepared by our in-house chef. Veg & Non-Veg options available.
                                </p>
                                <ul className="space-y-2 mb-8 text-sm text-gray-700">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Breakfast, Lunch, Dinner, High tea</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Barbecue Setup (Extra)</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-accent" /> Custom Menu Planning</li>
                                </ul>
                                <button className="w-full py-4 border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors rounded-lg">
                                    View Menu
                                </button>
                            </div>
                        </motion.div>

                    </div>

                    {/* Call to Action Note */}
                    <div className="mt-16 text-center">
                        <p className="text-gray-500 italic">* Prices may vary during festive seasons and long weekends. Contact us for custom wedding or corporate packages.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
