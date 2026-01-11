import React from 'react'
import { motion } from 'framer-motion'
import { FaUmbrellaBeach, FaCloudRain, FaSwimmingPool, FaMoon } from 'react-icons/fa'

const PoolShowcase = () => {
    const popupVariants = {
        hidden: { scaleX: 0, originX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            originX: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 1.2
            }
        }
    }

    const features = [
        {
            title: "80ft Lap Pool",
            desc: "Olympic-length style pool for swimming enthusiasts.",
            img: "/Assets/pool_villa_exterior_day.jpg",
            icon: FaSwimmingPool,
            span: "md:col-span-2 md:row-span-2"
        },
        {
            title: "Exciting Slides",
            desc: "Twisting water slides for endless family fun.",
            img: "/Assets/pool_slides_aerial_view.jpg",
            icon: FaUmbrellaBeach,
            span: "md:col-span-1 md:row-span-1"
        },
        {
            title: "Rain Dance",
            desc: "Groove to music under the open sky showers.",
            img: "/Assets/kids_play_zone_overview.webp", // Using as placeholder/context if specific rain dance element isn't clear, or generic pool shot
            icon: FaCloudRain,
            span: "md:col-span-1 md:row-span-1"
        },
        {
            title: "Evening GLow",
            desc: "Magical ambient lighting for night swims.",
            img: "/Assets/pool_rooms_evening_glow.jpg",
            icon: FaMoon,
            span: "md:col-span-2 md:row-span-1"
        }
    ]

    return (
        <section id="pool-showcase" className="py-20 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                        Aquatic <span className="text-primary">Paradise</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Designed for both relaxation and thrill, our pool area is the centerpiece of the AD Royal Villa experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-0 md:-space-x-2 h-auto md:h-[800px]">
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`relative group overflow-hidden rounded-2xl ${item.span} transition-all duration-300 hover:z-10`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <motion.div
                                className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end"
                                initial="hidden"
                                whileHover="visible"
                                variants={popupVariants}
                            >
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                    <div className="flex items-center gap-2 text-primary mb-2">
                                        <item.icon size={20} />
                                        <span className="uppercase text-xs font-bold tracking-widest">{item.title}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-300 text-sm">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PoolShowcase
