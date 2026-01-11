import React from 'react'
import { motion } from 'framer-motion'

const KidsZone = () => {
    const images = [
        { src: '/Assets/kids_swings_garden.jpg', label: 'Garden Swings' },
        { src: '/Assets/kids_play_slide_seesaw.webp', label: 'Slides & See-saw' },
        { src: '/Assets/kids_play_zone_overview.webp', label: 'Play Area' },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16">
                    <div>
                        <span className="text-primary tracking-[0.2em] text-xs font-bold uppercase block mb-2">Safe & Secure</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text">
                            Children’s Play & <span className="text-primary italic">Garden Area</span>
                        </h2>
                    </div>
                    <p className="md:w-1/3 text-gray-600 mt-6 md:mt-0 font-light leading-relaxed">
                        A fully enclosed, safe garden area visible from the patio, so you can relax while the kids play.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className="relative group rounded-2xl overflow-hidden h-64 shadow-lg cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <img
                                src={img.src}
                                alt={img.label}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-end p-6">
                                <h3 className="text-white font-bold text-lg">{img.label}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-wrap justify-center gap-8 text-center">
                    {['Cricket Kit Available', 'Carrom Board', 'Badminton', 'Board Games'].map((game, i) => (
                        <span key={i} className="text-lg font-medium text-gray-700 font-heading">• {game}</span>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default KidsZone
