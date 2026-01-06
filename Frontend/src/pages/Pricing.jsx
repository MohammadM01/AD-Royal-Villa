import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PackageCard = ({ title, price, features, recommended }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`relative p-8 rounded-2xl border ${recommended ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/10 bg-white/5'} flex flex-col`}
    >
        {recommended && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                Most Popular
            </div>
        )}
        <h3 className="text-2xl font-heading text-white mb-2">{title}</h3>
        <div className="text-4xl font-bold text-[#D4AF37] mb-6">
            {price} <span className="text-sm text-gray-400 font-normal">/ night</span>
        </div>

        <ul className="space-y-4 mb-8 flex-grow">
            {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <FaCheck className="text-[#D4AF37] mt-1 flex-shrink-0" />
                    <span className="font-light">{feature}</span>
                </li>
            ))}
        </ul>

        <a
            href="/contact"
            className={`w-full py-4 rounded-full text-center font-bold uppercase tracking-widest transition-all ${recommended ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-[#D4AF37] hover:text-black'}`}
        >
            Book Now
        </a>
    </motion.div>
);

const Pricing = () => {
    return (
        <div className="bg-[#1a1a1a] min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-medium text-[#D4AF37] mb-6"
                    >
                        Exclusive Rates
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto"
                    >
                        Experience luxury at an unbeatable value. Choose the package that suits your getaway.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <PackageCard
                        title="Weekday Escape"
                        price="₹15,000"
                        features={[
                            "Valid Monday - Thursday",
                            "Access to all amenities",
                            "Private Pool Access",
                            "Complementary Breakfast",
                            "Check-in: 1:00 PM",
                            "Check-out: 11:00 AM"
                        ]}
                    />

                    <PackageCard
                        title="Weekend Retreat"
                        price="₹25,000"
                        recommended={true}
                        features={[
                            "Valid Friday - Sunday",
                            "Access to all amenities",
                            "Private Pool & Jacuzzi",
                            "BBQ Station Access",
                            "Complementary Breakfast",
                            "Late Check-out option"
                        ]}
                    />

                    <PackageCard
                        title="Event Package"
                        price="Custom"
                        features={[
                            "Perfect for Weddings & Parties",
                            "Access for 50+ Guests",
                            "Full Property Access",
                            "Catering Space Setup",
                            "Decor Assistance",
                            "Dedicated Staff"
                        ]}
                    />
                </div>

                <div className="mt-20 text-center text-gray-500 font-light text-sm">
                    * Prices are subject to change. Please contact us for the latest seasonal offers.
                </div>
            </div>
        </div>
    );
};

export default Pricing;
