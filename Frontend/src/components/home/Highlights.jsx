import React from 'react'
import { FaBed, FaUsers, FaSwimmingPool, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Highlights = () => {
    const highlights = [
        { icon: FaBed, label: '4 BHK Luxury', sub: 'Fully Furnished' },
        { icon: FaUsers, label: '20 Guests', sub: 'Capacity' },
        { icon: FaSwimmingPool, label: 'Private Pool', sub: '80ft x 20ft' },
        { icon: FaMapMarkerAlt, label: 'Padgha', sub: '32km from Thane' },
    ]

    return (
        <div className="bg-white py-12 relative z-30 -mt-20 container mx-auto px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 border-b-4 border-primary">
                {highlights.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex flex-col items-center text-center space-y-3 group cursor-default"
                    >
                        <div className="bg-gray-50 p-4 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                            <item.icon size={36} weight="light" className="text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">{item.label}</h3>
                            <p className="text-sm text-gray-500 font-light">{item.sub}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Highlights
