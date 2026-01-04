import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaWater } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const PoolHero = () => {
    const videoRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        gsap.to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.5
        })

        gsap.to(videoRef.current, {
            scrollTrigger: {
                trigger: videoRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: 100,
            scale: 1.1
        })
    }, [])

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Video */}
            <div ref={videoRef} className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster="/Assets/pool_villa_exterior_day.jpg"
                >
                    <source src="/Assets/villa_walkthrough_hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
                <div ref={textRef} className="opacity-0 translate-y-10">
                    <div className="flex items-center justify-center gap-3 mb-4 text-primary">
                        <FaWater size={24} />
                        <span className="uppercase tracking-[0.2em] text-sm font-medium">80ft Private Lap Pool</span>
                        <FaWater size={24} />
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight">
                        The Ultimate <br />
                        <span className="text-primary">Pool Experience</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide text-gray-200 mb-8">
                        Dive into luxury with our massive 80ft lap pool, exciting water slides, and mesmerizing rain dance.
                        Your private aquatic paradise awaits.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors"
                        onClick={() => document.getElementById('pool-showcase').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Explore the Pool
                    </motion.button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <span className="text-xs uppercase tracking-widest opacity-70">Scroll to Dive In</span>
                <div className="w-0.5 h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-movedown" />
                </div>
            </motion.div>
        </div>
    )
}

export default PoolHero
