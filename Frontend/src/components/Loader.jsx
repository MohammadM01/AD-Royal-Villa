import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Loader = ({ onComplete }) => {
    const containerRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => onComplete()
        })

        tl.to(textRef.current, {
            opacity: 1,
            duration: 1.5,
            scale: 1.1,
            ease: 'power2.out'
        })
            .to(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                delay: 0.5
            })
    }, [onComplete])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-100 bg-text flex items-center justify-center"
        >
            <h1
                ref={textRef}
                className="text-primary font-heading text-3xl md:text-5xl font-bold opacity-0 text-center px-4 leading-relaxed"
            >
                AD Royal Villa <br />
                <span className="text-white text-lg md:text-2xl font-body font-light tracking-widest mt-4 block">
                    A Royal Private Farm Experience
                </span>
            </h1>
        </div>
    )
}

export default Loader
