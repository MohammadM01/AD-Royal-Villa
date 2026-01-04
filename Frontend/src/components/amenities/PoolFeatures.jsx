import React from 'react'
import { FaTint, FaWater, FaSmile } from 'react-icons/fa'
import { motion } from 'framer-motion'

const PoolFeatures = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary tracking-widest text-sm font-bold uppercase">The Highlight</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mt-2">
                        80ft of <span className="text-primary italic">Aquatic Fun</span>
                    </h2>
                    <p className="text-gray-600 mt-6 text-lg leading-relaxed font-light">
                        Our massive swimming pool is designed for everyone. From racing down the slides to relaxing under the mushroom umbrella, the water awaits.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-xl"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src="/Assets/pool_slides_aerial_view.jpg" alt="Pool Slides" className="w-full h-auto" />
                    </motion.div>

                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0 text-primary">
                                <FaWater size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text">Pool Zones</h3>
                                <p className="text-gray-600 text-sm mt-1">Separate sections for customized safety and fun.</p>
                                <ul className="mt-2 text-gray-700 text-sm list-disc list-inside">
                                    <li>Adult Pool: 4.5 – 5 ft depth</li>
                                    <li>Kids Pool: 3 ft depth for safety</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0 text-primary">
                                <FaSmile size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text">Slides & Rain Dance</h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    Experience the thrill of our family slides or dance to the beats with our integrated rain dance setup.
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
