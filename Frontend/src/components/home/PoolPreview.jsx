import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const PoolPreview = () => {
    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image Side */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img
                                src="/Assets/pool_villa_exterior_day.jpg"
                                alt="Luxury Private Pool"
                                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">The Experience</p>
                                <h3 className="text-3xl font-heading font-bold">80ft Private Pool</h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className="w-full lg:w-1/2 space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text">
                            Dive into <span className="text-primary italic">Absolute Luxury</span>
                        </h2>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            Our crown jewel is the massive 80ft x 20ft private swimming pool.
                            Whether you want to race down the slides, relax under the mushroom umbrella,
                            or enjoy a rain dance party, we have something for everyone.
                        </p>

                        <ul className="space-y-4">
                            {['Kids Pool Section (3ft)', 'Adult Pool (4.5-5ft)', 'Family Slides', 'Rain Dance Setup'].map((item, i) => (
                                <li key={i} className="flex items-center space-x-3 text-gray-700">
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/amenities"
                            className="inline-block border-b-2 border-primary text-text font-medium pb-1 hover:text-primary transition-colors mt-4"
                        >
                            Discover More Activities
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default PoolPreview
