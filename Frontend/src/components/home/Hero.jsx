import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

const Hero = () => {
    const videoRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline()

        tl.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        )
    }, [])

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full bg-black/40 z-10"></div>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
                poster="/Assets/pool_villa_exterior_day.jpg"
            >
                <source src="/Assets/villa_walkthrough_hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                <div ref={textRef} className="space-y-6">
                    <p className="text-white/90 text-sm md:text-lg tracking-[0.2em] font-light uppercase">
                        Welcome to AD Farms & Resorts
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white drop-shadow-lg">
                        AD Royal <span className="text-primary italic">Private Villa</span>
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                        Experience luxury, privacy, and calm in our 4BHK farmhouse with a private pool.
                    </p>

                    <motion.div
                        className="pt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        <a
                            href="https://wa.me/91XXXXXXXXXX"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primary text-white px-10 py-4 rounded-full font-medium tracking-widest uppercase hover:bg-white hover:text-primary transition-all duration-300 shadow-xl"
                        >
                            Book Your Stay
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="w-px h-16 bg-linear-to-b from-white to-transparent mx-auto"></div>
            </motion.div>
        </div>
    )
}

export default Hero
