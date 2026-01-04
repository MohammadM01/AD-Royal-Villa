import React from 'react'
import { motion } from 'framer-motion'
import { FaGlassMartiniAlt, FaUtensils } from 'react-icons/fa'

const PoolVibe = () => {
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/Assets/poolside_patio_dining.jpg"
                    alt="Poolside Dining"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/70" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-white"
                    >
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            Poolside <span className="text-primary">Dining</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            After a refreshing swim, relax at our elegant poolside patio. Whether it's a sunny brunch or a starlit dinner,
                            the ambiance is perfect for making memories with your loved ones.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="bg-primary/20 p-3 rounded-full text-primary">
                                    <FaUtensils size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Al Fresco Dining</h4>
                                    <p className="text-sm text-gray-400">Outdoor seating area</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                                <div className="bg-primary/20 p-3 rounded-full text-primary">
                                    <FaGlassMartiniAlt size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Lounge Area</h4>
                                    <p className="text-sm text-gray-400">Relax with drinks</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden md:block" // Image is already bg, maybe show a detail shot or nothing? 
                    // Actually, let's show an overlapping card or another image to make it interesting
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 rounded-2xl rotate-3 blur-sm" />
                            <img
                                src="/Assets/outdoor_lounge_canopy.jpg"
                                alt="Outdoor Lounge"
                                className="relative rounded-2xl shadow-2xl border-4 border-white/10 rotate-0 hover:rotate-2 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default PoolVibe
