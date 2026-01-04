import React from 'react'
import { FaMusic, FaFire, FaWifi, FaCar, FaTint, FaUmbrellaBeach } from 'react-icons/fa'
import { motion } from 'framer-motion'

const AmenitiesPreview = () => {
    const amenities = [
        { icon: FaMusic, label: 'Music System' },
        { icon: FaFire, label: 'Barbeque Station' },
        { icon: FaWifi, label: 'Smart Connectivity' },
        { icon: FaCar, label: 'Ample Parking' },
        { icon: FaTint, label: 'Hot & Cold Water' },
        { icon: FaUmbrellaBeach, label: 'Outdoor Patio' },
    ]

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 text-center">
                <div className="mb-16">
                    <span className="text-primary tracking-widest text-sm font-bold uppercase block mb-4">Everything You Need</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-text">Premium Amenities</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {amenities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:shadow-lg transition-all duration-300">
                                <item.icon size={32} className="text-text group-hover:text-white transition-colors duration-300" weight="light" />
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AmenitiesPreview
