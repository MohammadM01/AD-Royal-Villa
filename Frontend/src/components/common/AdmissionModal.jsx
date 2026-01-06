import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdmissionModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black z-10"
                        >
                            ✕
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image Side (Hidden on mobile) */}
                            <div className="hidden md:block w-1/3 bg-primary relative">
                                <img src="/Assets/pool_highlight_4.mp4" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white font-heading text-2xl -rotate-90">EXCLUSIVE</h3>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-2/3 p-8">
                                <h2 className="text-2xl font-heading text-primary mb-2">Book Your Escape</h2>
                                <p className="text-sm text-gray-500 mb-6">Get 10% off your first booking when you sign up for our newsletter.</p>

                                <form className="space-y-4">
                                    <input type="text" placeholder="Your Name" className="w-full border-b border-gray-300 py-2 outline-none focus:border-accent" />
                                    <input type="text" placeholder="Your Phone Number" className="w-full border-b border-gray-300 py-2 outline-none focus:border-accent" />
                                    <button className="w-full py-3 bg-accent text-white uppercase font-bold text-xs tracking-widest hover:bg-primary transition-colors">
                                        Claim Offer
                                    </button>
                                </form>
                                <p className="text-xs text-center text-gray-400 mt-4 cursor-pointer hover:text-primary" onClick={() => setIsOpen(false)}>No thanks, I hate discounts.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdmissionModal;
