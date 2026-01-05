import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

const Hero = () => {
    const videoRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline()
        // Content appears after 12 seconds
        tl.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 2, ease: 'power3.out', delay: 12 }
        )
    }, [])

    return (
        <div className="relative h-screen w-full overflow-hidden bg-primary">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full bg-linear-to-b from-primary/90 via-primary/30 to-transparent z-10"></div>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                poster="/Assets/pool_villa_exterior_day.jpg"
            >
                <source src="/Assets/villa_walkthrough_hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Floating Particles/Motes for Relaxation */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/20 rounded-full blur-xl"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, 50, 0],
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                <div ref={textRef} className="space-y-8 opacity-0"> {/* Initial opacity 0 governed by GSAP */}
                    <p className="text-[#F9F9F4]/90 text-sm md:text-lg tracking-[0.3em] font-light uppercase">
                        Welcome to AD Farms & Resorts
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-[#F9F9F4] drop-shadow-2xl">
                        Your Private Villa. <br />
                        <span className="text-accent italic font-serif">Your Own World.</span>
                    </h1>
                    <p className="text-[#F9F9F4]/90 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
                        AD Royal Private Villa — a fully enclosed 4 BHK private farmhouse, where privacy comes first.
                    </p>

                    <div className="pt-8">
                        <a
                            href="#stay"
                            className="inline-block bg-[#F9F9F4] text-primary px-12 py-4 rounded-full font-medium tracking-[0.2em] uppercase hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl hover:scale-105"
                        >
                            Explore the Villa
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 13, duration: 2, repeat: Infinity }}
            >
                <div className="text-[10px] uppercase tracking-widest mb-2">Scroll to Relax</div>
                <div className="w-px h-16 bg-linear-to-b from-white/50 to-transparent mx-auto"></div>
            </motion.div>
        </div>
    )
}

export default Hero
