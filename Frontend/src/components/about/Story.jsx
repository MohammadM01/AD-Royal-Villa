import React from 'react'
import { motion } from 'framer-motion'

const Story = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image */}
                    <motion.div
                        className="w-full md:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/Assets/villa_entrance_facade.webp"
                                alt="Entrance of AD Royal Villa"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-2xl z-0 hidden md:block"></div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        className="w-full md:w-1/2 space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary tracking-widest text-sm font-bold uppercase">Our Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text leading-tight">
                            Indian Hospitality <br /> <span className="text-primary italic">At Its Finest</span>
                        </h2>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            At AD Farms & Resorts, we believe in the ancient Indian tradition of "Atithi Devo Bhava" — Guest is God.
                            Our mission is to provide a sanctuary where families and friends can reconnect with nature and each other,
                            away from the distractions of modern life.
                        </p>
                        <p className="text-gray-600 text-lg font-light leading-relaxed">
                            AD Royal Private Villa is designed to offer the warmth of a home with the luxury of a resort.
                            Whether it's the home-cooked style meals on request, the spacious open lawns for children to run free,
                            or the private pool that becomes the heart of your celebration, every detail is curated for your comfort.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Story
