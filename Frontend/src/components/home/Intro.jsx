import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Intro = () => {
    const sectionRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        gsap.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        )
    }, [])

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-white text-center px-6">
            <div ref={textRef} className="container mx-auto max-w-4xl space-y-8">
                <span className="text-primary tracking-widest text-sm font-bold uppercase">Discover Peace</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-text leading-tight">
                    Escape to a world where <span className="text-primary italic">luxury meets nature.</span>
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto"></div>
                <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
                    Nestled near the serene Coral School in Padgha, AD Royal Private Villa is your exclusive sanctuary away from the city chaos.
                    With sprawling lawns, a massive private pool, and premium amenities, we offer the perfect setting for families, corporate outings, and celebrations.
                </p>
            </div>
        </section>
    )
}

export default Intro
