import React from 'react'
import { FaTint, FaWater, FaSmile } from 'react-icons/fa'
import { motion } from 'framer-motion'

const PoolFeatures = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary tracking-[0.3em] text-xs font-bold uppercase">Exclusive Access</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mt-4">
                        Private Poolside <span className="text-primary italic">Relaxation</span>
                    </h2>
                    <p className="text-gray-600 mt-6 text-lg leading-relaxed font-light">
                        Enjoy your own private oasis. Whether it's a refreshing dip or lounging by the water,
                        the entire pool area is exclusively yours. No outsiders, just you and your family.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src="/Assets/poolside_patio_dining.jpg" alt="Poolside Patio Dining" className="w-full h-auto transform hover:scale-105 transition-transform duration-700" />
                    </motion.div>

                    <motion.div
                        className="space-y-10"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex gap-6">
                            <div className="w-16 h-16 bg-[#F9F9F4] rounded-full flex items-center justify-center shadow-lg shrink-0 text-primary border border-primary/10">
                                <FaWater size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text font-heading">Private Pool & Slides</h3>
                                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                                    Complete privacy with high walls. Includes a 3ft Kids Pool and 4.5ft Adult Pool with exciting slides.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <div className="w-16 h-16 bg-[#F9F9F4] rounded-full flex items-center justify-center shadow-lg shrink-0 text-primary border border-primary/10">
                                <FaSmile size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text font-heading">Shaded Patio & Dining</h3>
                                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                                    Relax in the shade while supervising the kids. Enjoy meals poolside in our covered dining area.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default PoolFeatures
