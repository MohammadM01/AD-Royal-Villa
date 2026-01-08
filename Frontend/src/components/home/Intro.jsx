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
                <span className="text-primary tracking-[0.3em] text-sm font-bold uppercase">100% Private Property</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-text leading-tight">
                    Your Exclusive <span className="text-primary italic">Family Sanctuary</span>
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto"></div>
                <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
                    Nestled near the serene Coral School in Padgha, AD Royal Private Villa offers absolute privacy.
                    With no outsiders and a fully enclosed property, enjoy our sprawling lawns, massive private pool, and premium amenities in complete peace.
                    Safe for women, children, and families.
                </p>
            </div>
        </section>
    )
}

export default Intro
